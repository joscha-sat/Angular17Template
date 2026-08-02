# Project Guidelines

This AGENTS.md must reflect the current state of the project at all times. Update/Synchronize it if you spot differences!

## Scripts
Always run these scripts at the end of your work to ensure code quality and consistency:

- `npm run eslint`
- `npx prettier --write "src/**/*.{html,ts,scss}"`

## Tech Stack
- Angular: `^21.1.1`
- PrimeNG: `^21.1.6`
- TypeScript: `~5.9.3`
- RxJS: `~7.8.2`
- ESLint: `^9.39.2`
- Prettier: `^3.8.1`

## Project Structure
```
src/
├── app/
│   ├── api/                          # Services for API calls
│   ├── components/                   # Reusable UI components
│   │   ├── customers/
│   │   ├── login/
│   │   ├── map/
│   │   ├── navigation/
│   │   ├── settings/
│   │   ├── tenant/
│   │   ├── tenant-dashboard/
│   │   └── user/
│   ├── models/                       # TypeScript models
│   ├── other/                        # Utilities, guards, interceptors
│   │   ├── abstract-classes/
│   │   ├── enums/
│   │   ├── environments/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── layouts/
│   ├── shared/                       # Shared components (templates)
│   ├── stores/                       # State management
│   ├── views/                        # Page-level components
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   └── scss/                         # Global styles
├── index.html
├── main.ts
└── styles.scss
```

## 🅰️ Angular Modern Practices

Always prefer the most current Angular APIs and patterns. Avoid legacy approaches even if they still work — newer
equivalents are more performant, more readable, and better aligned with Angular's direction.

---

### Explicit Type Annotations on All Signals and Reactive Primitives

Every signal, computed, input, output, and query declaration must carry an explicit TypeScript type annotation on both
sides of the assignment — the declared type on the left and the generic parameter on the right. This makes the intent
immediately clear and prevents TypeScript from silently widening or narrowing inferred types.

This rule applies to: `signal()`, `computed()`, `input()`, `input.required()`, `output()`, `viewChild()`,
`viewChild.required()`, `contentChild()`, `toSignal()`, `linkedSignal()`, `resource()`, `rxResource()`,
`httpResource()`, and injected services.

#### ❌ BAD - Type is only inferred, never declared

```typescript
readonly userId = input.required<string>();
readonly count = signal(0);
readonly fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
readonly userList = toSignal(this.userService.getAllUsers(), { initialValue: [] });
readonly userSelected = output<string>();
readonly modalReference = viewChild.required<ElementRef>('modalRef');
private readonly userService = inject(UserService);
```

#### ✅ GOOD - Explicit type on both sides of the assignment

```typescript
readonly userId: InputSignal<string> = input.required<string>();
readonly count: WritableSignal<number> = signal(0);
readonly fullName: Signal<string> = computed(() => `${this.firstName()} ${this.lastName()}`);
readonly userList: Signal<User[]> = toSignal(this.userService.getAllUsers(), { initialValue: [] });
readonly userSelected: OutputEmitterRef<string> = output<string>();
readonly modalReference: Signal<ElementRef> = viewChild.required<ElementRef>('modalRef');
private readonly userService: UserService = inject(UserService);
```

---

### `readonly` Convention for All Class-Level Reactive Primitives

Every signal, computed, resource, `toSignal`, `linkedSignal`, injected service, and `output` declared at the class
level must be marked `readonly`. This communicates that the reference itself is never reassigned and prevents
accidental overwrite of the reactive primitive.

The only exception is a `WritableSignal` that must be reassigned entirely — which should be extremely rare. Prefer
`.set()` and `.update()` over reassignment.

#### ❌ BAD - Mutable references to reactive primitives

```typescript
@Component({ ... })
export class UserCardComponent {
  count = signal(0);
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);
  private userService = inject(UserService);
  userSelected = output<string>();
}
```

#### ✅ GOOD - All class-level primitives are readonly

```typescript
@Component({ ... })
export class UserCardComponent {
  readonly count: WritableSignal<number> = signal(0);
  readonly fullName: Signal<string> = computed(() => `${this.firstName()} ${this.lastName()}`);
  private readonly userService: UserService = inject(UserService);
  readonly userSelected: OutputEmitterRef<string> = output<string>();
}
```

---

### Signals Over RxJS for Local State

Use Angular Signals (`signal`, `computed`, `effect`) for component-level reactive state. Reserve RxJS for async
streams, HTTP, or cross-component event buses.

#### ❌ BAD - RxJS Subject for simple local state

```typescript
@Component({ ... })
export class CounterComponent {
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();

  incrementCount(): void {
    this.countSubject.next(this.countSubject.getValue() + 1);
  }
}
```

#### ✅ GOOD - Signal for local reactive state

```typescript
@Component({ ... })
export class CounterComponent {
  protected readonly count: WritableSignal<number> = signal(0);

  incrementCount(): void {
    this.count.update((currentCount) => currentCount + 1);
  }
}
```

---

### Computed Signals Over Derived Observables

Derive state using `computed()` instead of chaining RxJS operators for values that depend on other signals.

#### ❌ BAD - combineLatest for derived local state

```typescript
readonly fullName$ = combineLatest([this.firstName$, this.lastName$]).pipe(
  map(([firstName, lastName]) => `${firstName} ${lastName}`)
);
```

#### ✅ GOOD - computed signal

```typescript
protected readonly firstName: WritableSignal<string> = signal('Jane');
protected readonly lastName: WritableSignal<string> = signal('Doe');
protected readonly fullName: Signal<string> = computed(() => `${this.firstName()} ${this.lastName()}`);
```

---

### `linkedSignal` for Derived Writable State

Use `linkedSignal()` when a signal's default value is derived from another signal, but the user can also override it
locally. This replaces the common pattern of an `effect()` that resets a `WritableSignal` whenever a source changes —
which is error-prone and creates update cycles.

Import from `@angular/core`.

#### ❌ BAD - effect() used to reset a writable signal when a source changes

```typescript
readonly selectedTenantId: InputSignal<string> = input.required<string>();
readonly selectedPageIndex: WritableSignal<number> = signal(0);

constructor() {
  effect(() => {
    this.selectedTenantId(); // track the dependency
    this.selectedPageIndex.set(0); // reset on change — fragile
  });
}
```

#### ✅ GOOD - linkedSignal resets automatically but stays writable

```typescript
readonly selectedTenantId: InputSignal<string> = input.required<string>();

// Resets to 0 whenever selectedTenantId changes, but the user can still change the page locally
readonly selectedPageIndex: WritableSignal<number> = linkedSignal({
  source: this.selectedTenantId,
  computation: () => 0,
});
```

---

### `resource()` for Async Reactive Data (Non-HTTP)

Use `resource()` for any async data fetching that is driven by signal state but does not go through Angular's
`HttpClient` — for example, browser APIs, IndexedDB, third-party SDKs, or `fetch()` calls that are not managed by
the HTTP interceptor stack.

`resource()` exposes `.value()`, `.isLoading()`, `.error()`, and `.status()` signals automatically. Import from
`@angular/core`.

#### ❌ BAD - Manual async loading with separate loading/error signals

```typescript
readonly selectedUserId: InputSignal<string> = input.required<string>();
readonly userProfile: WritableSignal<UserProfile | null> = signal(null);
readonly isLoadingUserProfile: WritableSignal<boolean> = signal(false);
readonly userProfileLoadError: WritableSignal<string | null> = signal(null);

constructor() {
  effect(async () => {
    const userId = this.selectedUserId();
    this.isLoadingUserProfile.set(true);
    this.userProfileLoadError.set(null);
    try {
      this.userProfile.set(await fetchUserProfileFromSdk(userId));
    } catch (error) {
      this.userProfileLoadError.set('Failed to load profile.');
    } finally {
      this.isLoadingUserProfile.set(false);
    }
  });
}
```

#### ✅ GOOD - resource() manages value, loading, and error automatically

```typescript
readonly selectedUserId: InputSignal<string> = input.required<string>();

readonly userProfileResource: ResourceRef<UserProfile> = resource<UserProfile, string>({
  request: () => this.selectedUserId(),
  loader: async ({ request: userId }) => {
    return await fetchUserProfileFromSdk(userId);
  },
});

// In template:
// userProfileResource.isLoading() — boolean
// userProfileResource.value()     — UserProfile | undefined
// userProfileResource.error()     — unknown
```

---

### `rxResource()` for RxJS-Based Async Data

Use `rxResource()` when the loader naturally returns an `Observable` rather than a `Promise` — for example, when
using an existing RxJS-based service method that is not backed by `HttpClient`. It has the same signal-based API as
`resource()` but accepts an Observable loader. Import from `@angular/core/rxjs-interop`.

#### ❌ BAD - toSignal wrapping an observable that depends on another signal

```typescript
readonly selectedTenantId: InputSignal<string> = input.required<string>();

// toSignal cannot re-run when selectedTenantId changes
readonly tenantUsers: Signal<User[]> = toSignal(
  this.userService.getUsersByTenantId(this.selectedTenantId()),
  { initialValue: [] }
);
```

#### ✅ GOOD - rxResource re-runs the observable loader when the signal changes

```typescript
readonly selectedTenantId: InputSignal<string> = input.required<string>();

readonly tenantUsersResource: ResourceRef<User[]> = rxResource<User[], string>({
  request: () => this.selectedTenantId(),
  loader: ({ request: tenantId }) => this.userService.getUsersByTenantId(tenantId),
});

// In template:
// tenantUsersResource.isLoading()
// tenantUsersResource.value() ?? []
// tenantUsersResource.error()
```

---

### `httpResource()` for HttpClient-Backed Data

Use `httpResource()` for any data fetched via Angular's `HttpClient`. It is the signal-native replacement for
`toSignal(this.http.get(...))` and integrates fully with Angular's interceptor stack, request cancellation, and
`DevTools`. Import from `@angular/common/http`.

Prefer `httpResource()` over `resource()` / `rxResource()` whenever `HttpClient` is the transport layer.

#### ❌ BAD - toSignal with a one-shot HTTP call that cannot react to signal changes

```typescript
readonly selectedTenantId: InputSignal<string> = input.required<string>();

// Fires once on init; does not re-fetch when selectedTenantId changes
readonly tenantDetails: Signal<Tenant | undefined> = toSignal(
  this.http.get<Tenant>(`/api/tenants/${this.selectedTenantId()}`)
);
```

#### ✅ GOOD - httpResource re-fetches automatically when any tracked signal changes

```typescript
readonly selectedTenantId: InputSignal<string> = input.required<string>();

readonly tenantDetailsResource: HttpResourceRef<Tenant> = httpResource<Tenant>(() =>
  `/api/tenants/${this.selectedTenantId()}`
);

// In template:
// tenantDetailsResource.isLoading()
// tenantDetailsResource.value()
// tenantDetailsResource.error()
// tenantDetailsResource.status()
```

#### Choosing between resource APIs

| Scenario | Use |
|---|---|
| `HttpClient` GET (JSON response) | `httpResource()` |
| `HttpClient` POST / mutation | `HttpClient` directly in a service method |
| RxJS Observable loader, not HttpClient | `rxResource()` |
| Promise-based loader (fetch, SDK, browser API) | `resource()` |
| Value derived from a signal but user-overridable | `linkedSignal()` |

---

### Signal-Based Inputs, Outputs and Queries

Use `input()`, `output()`, and `viewChild()` / `contentChild()` instead of decorator-based `@Input`, `@Output`, and `@ViewChild`.

#### ❌ BAD - Decorator-based component API

```typescript
@Input() userId!: string;
@Input() isDisabled = false;
@Output() userSelected = new EventEmitter<string>();
@ViewChild('modalRef') modalReference!: ElementRef;
```

#### ✅ GOOD - Signal-based component API

```typescript
readonly userId: InputSignal<string> = input.required<string>();
readonly isDisabled: InputSignal<boolean> = input(false);
readonly userSelected: OutputEmitterRef<string> = output<string>();
readonly modalReference: Signal<ElementRef> = viewChild.required<ElementRef>('modalRef');
```

---

### Control Flow Syntax Over Structural Directives

Use the built-in template control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, and `*ngSwitch`.

#### ❌ BAD - Structural directives

```html
<div *ngIf="isUserAuthenticated">
  <ul>
    <li *ngFor="let user of userList; trackBy: trackByUserId">{{ user.name }}</li>
  </ul>
</div>
<ng-container *ngIf="!isUserAuthenticated">
  <app-login-prompt />
</ng-container>
```

#### ✅ GOOD - Built-in control flow

```html
@if (isUserAuthenticated()) {
  <ul>
    @for (user of userList(); track user.id) {
      <li>{{ user.name }}</li>
    }
  </ul>
} @else {
  <app-login-prompt />
}
```

---

### Standalone Components Over NgModules

All new components, directives, and pipes must be `standalone: true`. Do not create new NgModules.

#### ❌ BAD - Module-based component

```typescript
@NgModule({
  declarations: [UserCardComponent],
  imports: [CommonModule],
  exports: [UserCardComponent],
})
export class UserCardModule {}
```

#### ✅ GOOD - Standalone component

```typescript
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent { ... }
```

---

### `inject()` Over Constructor Injection

Use the `inject()` function to declare dependencies instead of constructor parameter injection.

#### ❌ BAD - Constructor injection

```typescript
@Component({ ... })
export class UserProfileComponent {
  private readonly userService: UserService;
  private readonly router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }
}
```

#### ✅ GOOD - inject() function

```typescript
@Component({ ... })
export class UserProfileComponent {
  private readonly userService: UserService = inject(UserService);
  private readonly router: Router = inject(Router);
}
```

---

### `toSignal` and `toObservable` for Interop

When bridging Signals and RxJS (e.g., for HTTP requests), use `toSignal()` and `toObservable()` from
`@angular/core/rxjs-interop` rather than manually subscribing.

Prefer `httpResource()` or `rxResource()` over `toSignal()` when the observable depends on signal state and needs to
re-run reactively — `toSignal()` is best suited for observables that are created once and do not need to re-execute.

#### ❌ BAD - Manual subscription in component

```typescript
@Component({ ... })
export class UserListComponent implements OnInit, OnDestroy {
  protected userList: User[] = [];
  private readonly subscriptionRef = new Subscription();

  ngOnInit(): void {
    this.subscriptionRef.add(
      this.userService.getAllUsers().subscribe((users) => {
        this.userList = users;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionRef.unsubscribe();
  }
}
```

#### ✅ GOOD - toSignal handles subscription lifecycle automatically

```typescript
@Component({ ... })
export class UserListComponent {
  private readonly userService: UserService = inject(UserService);

  protected readonly userList: Signal<User[]> = toSignal(this.userService.getAllUsers(), {
    initialValue: [],
  });
}
```

---

### `effect()` for Reactive Side Effects

Use `effect()` to react to signal changes instead of manually subscribing to observables or relying on lifecycle
hooks for signal-driven side effects.

#### ❌ BAD - ngOnChanges watching an input manually

```typescript
ngOnChanges(changes: SimpleChanges): void {
  if (changes['selectedUserId']) {
    this.loadUserDetails(changes['selectedUserId'].currentValue);
  }
}
```

#### ✅ GOOD - effect() reacts to signal input automatically

```typescript
readonly selectedUserId: InputSignal<string> = input.required<string>();

constructor() {
  effect(() => {
    this.loadUserDetails(this.selectedUserId());
  });
}
```

## ⚙️ Refactoring Criteria & Examples

### Guard Clauses

Avoid deep nesting; return early for error states.

❌ **BAD** - Deep nesting makes logic hard to follow:

```typescript
function processOrder(order: Order | null) {
  if (order) {
    if (order.isPaid) {
      if (order.items.length > 0) {
        shipOrder(order);
      }
    }
  }
}
```

✅ **GOOD** - Early returns flatten the logic:

```typescript
function processOrder(order: Order | null): void {
  if (!order) return;
  if (!order.isPaid) return;
  if (order.items.length === 0) return;

  shipOrder(order);
}
```

### DRY (Don't Repeat Yourself)

Extract repeated logic into reusable functions or shared modules.

❌ **BAD** - Repeated formatting logic:

```typescript
const displayUserName = `User: ${user.firstName} ${user.lastName}`;
const displayGuestName = `Guest: ${guest.firstName} ${guest.lastName}`;
const displayAdminName = `Admin: ${admin.firstName} ${admin.lastName}`;
```

✅ **GOOD** - Single source of truth:

```typescript
const formatPersonName = (person: { firstName: string; lastName: string }): string =>
  `${person.firstName} ${person.lastName}`;
```

### KISS (Keep It Simple, Stupid)

Simple, obvious code beats clever, compact code.

❌ **BAD** - Clever but unreadable:

```typescript
const calculateDiscount = (p: number, a: number) => p > 100 ? a * 0.1 : p > 50 ? a * 0.05 : a > 1000 ? 25 : 0;
```

✅ **GOOD** - Simple and obvious:

```typescript
function calculateDiscount(price: number, accountAge: number): number {
  if (price > 100) {
    return accountAge * 0.1;
  }

  if (price > 50) {
    return accountAge * 0.05;
  }

  if (accountAge > 1000) {
    return 25;
  }

  return 0;
}
```

### YAGNI (You Ain't Gonna Need It)

Don't add functionality until it's actually required.

❌ **BAD** - Speculative features:

```typescript
type Product = {
  id: string;
  name: string;
  price: number;
  discountEligible: boolean; // Not used anywhere
  seasonalTag?: string; // Maybe someday?
  warehouseLocation: string; // No warehouse system exists
  metadata: Record<string, unknown>; // "Just in case"
};
```

✅ **GOOD** - Only what's needed now:

```typescript
type Product = {
  id: string;
  name: string;
  price: number;
};
```

---

## Coding Standards

### 1. Single Responsibility Principle (SRP)

Each function or method must have exactly one logical job. If a function's name requires the word "and", it should
likely be split. This ensures that simply by looking at a method name, the caller knows exactly what is happening
without hidden side effects.

#### ❌ BAD - Mixing Concerns

```typescript
// Mixing validation, database logic, and response formatting
async function saveUser(userData: any) {
  if (!userData.email.includes('@')) throw new Error('Invalid email');
  const user = await db.users.upsert(userData);
  return { id: user.id, success: true, timestamp: Date.now() };
}
```

#### ✅ GOOD - Single Logical Responsibility

```typescript
const validateUserEmailAddress = (emailAddress: string): void => {
  const emailContainsAtSymbol = emailAddress.includes('@');
  if (!emailContainsAtSymbol) {
    throw new Error(`The provided email address "${emailAddress}" is invalid.`);
  }
};

const persistUserToDatabase = async (userInformation: UserData): Promise<User> => {
  return await database.users.save(userInformation);
};

const createApiResponseForUserSave = (savedUser: User) => ({
  savedUserId: savedUser.id,
  isOperationSuccessful: true,
  operationTimestamp: Date.now(),
});
```

---

### 2. Explicit Naming (No Shortcuts)

Variable and function names must be fully descriptive. Avoid all abbreviations (e.g., `err`, `req`, `idx`, `val`).
Long names are preferred over ambiguous ones. Only widely established abbreviations are acceptable (e.g., `id`, `db`).
The goal is that the code explains itself without needing a dictionary.

#### ❌ BAD - Cryptic and Short

```typescript
const d = new Date();
const t = d.getTime();

function handle(r: Req) {
  const u = r.body.user;
  const isAdmin = u.role === 'admin';
  return isAdmin;
}
```

#### ✅ GOOD - Descriptive and Long

```typescript
const currentSystemDateTime = new Date();
const currentSystemTimeInMilliseconds = currentSystemDateTime.getTime();

function checkIfUserHasAdministratorPrivileges(incomingWebRequest: WebRequest): boolean {
  const authenticatedUser = incomingWebRequest.body.user;
  const hasAdministratorRole = authenticatedUser.role === 'administrator';
  return hasAdministratorRole;
}
```

---

### 3. Pronounceable Names

Names must be pronounceable so that they can be discussed out loud without confusion. If you cannot say the name in a
conversation, rename it.

#### ❌ BAD - Unpronounceable

```typescript
const yyyymmdd = new Date();
const usrCfgMgr = new ConfigManager();
```

#### ✅ GOOD - Pronounceable

```typescript
const currentDateFormatted = new Date();
const userConfigurationManager = new ConfigManager();
```

---

### 4. Consistent Naming

The same concept must always use the same name throughout the codebase. Mixing synonyms for the same thing creates
confusion and makes code harder to search and reason about.

#### ❌ BAD - Inconsistent synonyms for the same concept

```typescript
function getUser(userId: string) { ... }
function fetchAccount(accountId: string) { ... }
function loadMemberData(memberId: string) { ... }
```

#### ✅ GOOD - One name, one concept

```typescript
function getUserById(userId: string) { ... }
function getUserPermissions(userId: string) { ... }
function deleteUserAccount(userId: string) { ... }
```

---

### 5. Functions Named as Verbs / Actions

Functions and methods must be named with a verb that describes the action they perform. A function name should answer
the question: "what does this do?"

#### ❌ BAD - Noun-based or vague names

```typescript
const userData = () => { ... };
const discount = (price: number) => { ... };
const emailAddress = (user: User) => { ... };
```

#### ✅ GOOD - Verb-based, action-oriented names

```typescript
const getUserData = () => { ... };
const calculateDiscount = (price: number) => { ... };
const formatUserEmailAddress = (user: User) => { ... };
```

---

### 6. Boolean Naming

Booleans must be named so their meaning is immediately clear when read as a statement. Prefer positive phrasings and
avoid negations in names — negate at the usage site if needed.

#### ❌ BAD - Ambiguous or negated boolean names

```typescript
const active = true;
const notAdmin = false;
const flag = true;
const isNotValid = false;
```

#### ✅ GOOD - Clear, positive boolean names

```typescript
const isActive = true;
const isAdministrator = false;
const hasPermission = true;
const isValid = true;
```

---

### 7. Readability Over Cleverness

Avoid "fancy" syntax, nested ternaries, or complex one-liners. If a junior developer cannot understand the logic at
first glance, it is too complex. Use explicit control structures (`if`/`else`) instead of clever operators.

#### ❌ BAD - "Clever" but hard to read

```typescript
// Nested ternary
const userStatus = isLoggedIn ? (isAdmin ? 'Admin_Dashboard' : 'User_Profile') : 'Login_Page';

// Complex chain with implicit truthiness
const getActiveIds = (list) => list?.map((i) => i.id).filter(Boolean) ?? [];
```

#### ✅ GOOD - Readable and Maintainable

```typescript
let navigationTargetRoute: string;

if (!isUserAuthenticatedWithSystem) {
  navigationTargetRoute = 'Login_Page';
} else if (isUserAccountAdministrator) {
  navigationTargetRoute = 'Admin_Dashboard';
} else {
  navigationTargetRoute = 'User_Profile';
}

function extractActiveIdentitiesFromList(rawAccountList: Account[]): string[] {
  if (rawAccountList === null || rawAccountList === undefined) {
    return [];
  }

  const accountIdentities = rawAccountList.map((account) => account.id);

  const validAccountIdentities = accountIdentities.filter((identity) => {
    const isIdentityPopulated = identity !== null && identity !== '';
    return isIdentityPopulated;
  });

  return validAccountIdentities;
}
```

---

### 8. Function Length

Functions should be short and focused. Long functions are a signal that the function is doing too much and should be
split into smaller, well-named helpers.

- **Ideal:** fewer than 10–15 lines
- **Maximum:** 25 lines — if a function exceeds this, strongly consider breaking it up

#### ❌ BAD - Overlong function doing too much

```typescript
function handleUserRegistration(formData: RegistrationForm): void {
  if (!formData.email.includes('@')) throw new Error('Invalid email');
  if (formData.password.length < 8) throw new Error('Password too short');
  if (!formData.acceptedTerms) throw new Error('Terms not accepted');

  const normalizedEmail = formData.email.toLowerCase().trim();
  const hashedPassword = hashPassword(formData.password);

  const newUser = { email: normalizedEmail, password: hashedPassword };
  database.users.save(newUser);

  emailService.sendWelcomeEmail(normalizedEmail);
  analyticsService.trackRegistration(normalizedEmail);
}
```

#### ✅ GOOD - Composed from short, focused functions

```typescript
function handleUserRegistration(formData: RegistrationForm): void {
  validateRegistrationForm(formData);
  const normalizedUserData = normalizeRegistrationFormData(formData);
  const savedUser = persistNewUserToDatabase(normalizedUserData);
  notifyServicesOfNewUserRegistration(savedUser.email);
}
```

---

### 9. No Side Effects

A function should primarily return its result and not secretly mutate external state. When a function must produce a
side effect (e.g., writing to a database, sending an email), its name must make that explicit.

#### ❌ BAD - Hidden side effect inside a seemingly pure function

```typescript
function calculateOrderTotal(order: Order): number {
  order.status = 'processing'; // hidden mutation — caller does not expect this
  return order.items.reduce((sum, item) => sum + item.price, 0);
}
```

#### ✅ GOOD - Pure calculation; side effect in a clearly named separate function

```typescript
function calculateOrderTotal(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.price, 0);
}

function markOrderAsProcessing(order: Order): void {
  order.status = 'processing';
}
```

---

### 10. Avoid Flag Arguments (Boolean Parameters)

A boolean parameter passed into a function is a code smell. It usually means the function handles two distinct
behaviours — split it into two clearly named functions instead.

#### ❌ BAD - Boolean flag controls branching behaviour

```typescript
function renderUserCard(user: User, isCompact: boolean): string {
  if (isCompact) {
    return `<span>${user.name}</span>`;
  }
  return `<div class="card"><h2>${user.name}</h2><p>${user.email}</p></div>`;
}
```

#### ✅ GOOD - Two separate, clearly named functions

```typescript
function renderCompactUserCard(user: User): string {
  return `<span>${user.name}</span>`;
}

function renderFullUserCard(user: User): string {
  return `<div class="card"><h2>${user.name}</h2><p>${user.email}</p></div>`;
}
```

---

### 11. Maximum Nesting Depth

Limit nesting to **2–3 levels** for `if`, `else`, `for`, and `while` constructs. Deeper nesting hurts readability and
is usually a sign that logic should be extracted or guard clauses should be used.

#### ❌ BAD - Four levels of nesting

```typescript
function processItems(items: Item[]): void {
  if (items) {
    for (const item of items) {
      if (item.isActive) {
        if (item.stock > 0) {
          shipItem(item);
        }
      }
    }
  }
}
```

#### ✅ GOOD - Flat with guard clauses and extracted helpers

```typescript
function processItems(items: Item[]): void {
  if (!items) return;
  items.forEach(processItemIfEligible);
}

function processItemIfEligible(item: Item): void {
  if (!item.isActive) return;
  if (item.stock <= 0) return;
  shipItem(item);
}
```

---

### 12. Consistent Formatting

All code must be formatted using a shared, project-wide formatter and linter configuration. Manual formatting
decisions should never vary between contributors — the tooling enforces consistency automatically.

- Use the project's configured **formatter** (e.g., Prettier) for all files on save
- Use the project's configured **linter** (e.g., ESLint) to catch style and quality violations
- Never commit code that has outstanding linter errors or bypasses formatter rules

#### ❌ BAD - Inconsistent style across files

```typescript
// File A
const getUserData=()=>{ return fetch('/api/user') }

// File B
const getUserData = () => {
  return fetch('/api/user');
};
```

#### ✅ GOOD - Formatter enforces a single consistent style everywhere

```typescript
const getUserData = () => {
  return fetch('/api/user');
};
```

---

### 13. Error Handling

Errors are not edge cases — they are part of the expected flow. Never swallow errors silently, never use error codes
in place of exceptions, and never return `null` or `undefined` to signal failure. Handle errors explicitly, at the
right level, and always leave a meaningful trace.

- **Do not swallow errors** — a caught error that is never logged or rethrown makes bugs invisible
- **Throw, don't return `null`** — when a function cannot fulfil its contract, throw a descriptive error instead of returning `null` and forcing every caller to defensively check
- **Handle errors at the right level** — low-level functions throw, high-level orchestrators catch and decide what to do
- **Use descriptive error messages** — the message should tell a developer exactly what went wrong and where

#### ❌ BAD - Swallowed error, silent failure

```typescript
async function loadUserProfile(userId: string): Promise<User | null> {
  try {
    return await userRepository.findById(userId);
  } catch {
    return null; // caller has no idea what went wrong
  }
}
```

#### ❌ BAD - Error code instead of exception

```typescript
function divideValues(dividend: number, divisor: number): number | string {
  if (divisor === 0) {
    return 'ERROR_DIVISION_BY_ZERO'; // caller must remember to check for this string
  }
  return dividend / divisor;
}
```

#### ✅ GOOD - Throw a descriptive error; catch only where recovery is possible

```typescript
async function loadUserProfile(userId: string): Promise<User> {
  const foundUser = await userRepository.findById(userId);

  if (!foundUser) {
    throw new Error(`User with id "${userId}" could not be found.`);
  }

  return foundUser;
}

// Only the top-level caller decides how to handle the failure:
async function handleUserProfileRequest(userId: string): Promise<void> {
  try {
    const userProfile = await loadUserProfile(userId);
    renderUserProfile(userProfile);
  } catch (error) {
    logger.error('Failed to load user profile', { userId, error });
    renderErrorState('User profile could not be loaded.');
  }
}
```

---

### 14. No Dead Code

Code that is never executed is a liability — it creates confusion, increases maintenance overhead, and can mislead
future developers into thinking it is used. Delete it. Version control exists precisely so that nothing is ever truly
lost.

Dead code includes:

- Unused variables, parameters, and imports
- Commented-out code blocks left behind after refactoring
- Unreachable branches (e.g., code after a `return` statement)
- Functions, components, or modules that are no longer called anywhere

#### ❌ BAD - Commented-out code and unused variables

```typescript
import { formatDate } from './utils/formatDate'; // no longer used

function calculateInvoiceTotal(items: InvoiceItem[], discountRate: number): number {
  // const legacyTotal = items.reduce((sum, item) => sum + item.basePrice, 0);
  // const adjustedTotal = legacyTotal - legacyTotal * discountRate;
  // return adjustedTotal;

  const invoiceTotal = items.reduce((sum, item) => sum + item.finalPrice, 0);
  const unusedTaxRate = 0.19; // was needed for an old feature
  return invoiceTotal - invoiceTotal * discountRate;
}
```

#### ✅ GOOD - Only living, used code remains

```typescript
function calculateInvoiceTotal(items: InvoiceItem[], discountRate: number): number {
  const invoiceTotal = items.reduce((sum, item) => sum + item.finalPrice, 0);
  return invoiceTotal - invoiceTotal * discountRate;
}
```

---

## Limits & Warnings

### Keep Lifecycle Hooks Simple

Lifecycle hooks (e.g., `ngOnInit`, `useEffect`, `onMounted`, `connectedCallback`) must remain short and focused.
They should read like a table of contents — calling named methods — not contain inline business logic.

- **Ideal:** fewer than 10 lines per hook
- Extract any non-trivial logic into clearly named private methods or composables

#### ❌ BAD - Business logic crammed directly into a lifecycle hook

```typescript
ngOnInit(): void {
  this.isLoading = true;
  this.http.get('/api/users').subscribe((response: any) => {
    this.users = response.data.filter((user: User) => user.isActive);
    this.userCount = this.users.length;
    this.isLoading = false;
    if (this.userCount === 0) {
      this.router.navigate(['/empty-state']);
    }
  });
}
```

#### ✅ GOOD - Hook delegates to clearly named methods

```typescript
ngOnInit(): void {
  this.loadActiveUsers();
}

private loadActiveUsers(): void {
  this.isLoading = true;
  this.http.get('/api/users').subscribe((response: any) => {
    this.users = this.filterActiveUsers(response.data);
    this.userCount = this.users.length;
    this.isLoading = false;
    this.redirectToEmptyStateIfNoUsers();
  });
}

private filterActiveUsers(allUsers: User[]): User[] {
  return allUsers.filter((user) => user.isActive);
}

private redirectToEmptyStateIfNoUsers(): void {
  if (this.userCount === 0) {
    this.router.navigate(['/empty-state']);
  }
}
```

---

## Prefer

- `type` over `interface`
- Avoid using `any` as a type
- Use TypeScript's `satisfies` operator for configurations and constants to ensure type-safety while preserving specific literal types
- Use single-line comments: `//` over `/* */` multi-line comments
- On generating a commit message, use the branch name as a prefix in front of the message

---

## API Request Comments

Use comments for API requests following this syntax: `{REQUEST TYPE} {AMOUNT} > {OBJECT}`
If the object is not clear from context, leave it out.

```typescript
class TenantRepository {
  // GET ALL > Tenants
  getAllTenants(queryParams?: TenantQueryParams): Promise<ResponseWithRecords<Tenant>> { ... }

  // GET ONE > Tenant
  getTenantById(id: string): Promise<Tenant> { ... }

  // CREATE ONE > Tenant
  createOneTenant(tenant: Tenant): Promise<Tenant> { ... }

  // PATCH / UPDATE ONE > Tenant
  updateTenantById(id: string, tenant: Tenant): Promise<Tenant> { ... }

  // DELETE ONE > Tenant
  deleteTenantById(id: string): Promise<void> { ... }

  // DELETE ALL > Tenants
  deleteAllTenants(): Promise<void> { ... }
}
```

---

## HTML / Template Comments & Formatting

Use comments for HTML/template blocks in ALL CAPS. A comment must never exceed 5 words and should describe the
following block or section.

```html
<!-- PAGE HEADER -->
<header>
  <!-- NAVIGATION LINKS -->
  <nav>...</nav>
</header>

<!-- USER TABLE -->
<table>...</table>

<!-- NEW USER BUTTON -->
<button type="button">Create User</button>
```
