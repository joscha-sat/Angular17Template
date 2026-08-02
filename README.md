# 🅰️ Angular Template (v20+)

<div align="center">

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Angular Material](https://img.shields.io/badge/Material-3f51b5?style=for-the-badge&logo=material-design&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

</div>

A comprehensive Angular template with built-in features for rapid application development.

## 📋 Table of Contents

1. [✨ Overview](#-overview)
2. [🏗️ Project Structure](#️-project-structure)
3. [🎨 Styling](#-styling)
4. [🧩 Components](#-components)
5. [🔌 Services](#-services)
6. [📊 Models and Type Definitions](#-models-and-type-definitions)
7. [🔄 State Management](#-state-management)
8. [📑 Tables](#-tables)
9. [💬 Dialogs](#-dialogs)
10. [👨‍💻 Development](#-development)
11. [📞 Contact](#-contact)
12. [📦 Shared Components UI Docs](#-shared-components-ui-docs)

## ✨ Overview

This Angular template provides a solid foundation for building modern web applications with Angular 20+. It includes:

- ✅ Comprehensive API service architecture
- ✅ Model-based data handling
- ✅ Reusable UI components
- ✅ Table components with advanced features
- ✅ Dialog system
- ✅ State management with @ngrx/signals
- ✅ Internationalization with ngx-translate
- ✅ Code quality tools (ESLint, Prettier, Husky)

## 🏗️ Project Structure

The project follows a modular structure:

| Directory            | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `src/app/api`        | API services for HTTP requests               |
| `src/app/components` | Feature-specific components                  |
| `src/app/models`     | Data models                                  |
| `src/app/other`      | Types, enums, and environment configurations |
| `src/app/services`   | Helper services                              |
| `src/app/shared`     | Reusable UI components                       |
| `src/app/stores`     | State management                             |
| `src/app/views`      | Page components used in routing              |

## 🎨 Styling

### 📁 Global SCSS Files

Global SCSS files are located in the `assets/scss` folder:

| File              | Purpose                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| `_mixins.scss`    | Custom global utility classes (directly usable as HTML class, no imports needed) |
| `_colors.scss`    | Repeating color values (import them into styles.scss as CSS variables)           |
| `_variables.scss` | Custom repeating SCSS values                                                     |

### 🧰 UI Library

This template uses **Angular Material** for UI components. You can customize Material themes in the `styles.scss` file.

### 📱 Responsive Design

Media queries and breakpoints are defined in `src/assets/variables`:

- ✅ Values for common device breakpoints are predefined
- ✅ Globally usable @media queries for desktop, laptop, tablet, and mobile

#### Example

```scss
@use 'index' as *;

/*desktop-view >> default */
.grid {
  grid-template-columns: 2fr 5fr;
}

/* tablet-view and below using the @media query mixin */
@include tablet-view {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

## 🧩 Components

The project uses a component-based architecture:

### 🔄 Shared Components

Located in `src/app/shared`, these are reusable components that can be used across the application:

- ✅ Base components that can be reused with different data/style via `@Input()` and `@Output()`
- ✅ UI elements like buttons, cards, inputs, etc.
- ✅ Complex components like tables, dialogs, etc.

<details>
<summary>💡 Best Practices</summary>

- Keep shared components small and focused on a single responsibility
- Use strong typing with interfaces for inputs and outputs
- Document usage examples in component comments

</details>

### 📄 View Components

Located in `src/app/views`, these are page-level components used in routing:

- ✅ Views use the shared components to display the full UI
- ✅ Act as "Layout Components" for different component blocks
- ✅ Handle page-level logic and data fetching

## 🔌 Services

### 🌐 API Services

Located in `src/app/api`, these services handle HTTP requests:

- ✅ Each service extends the `GenericHttpService` for common CRUD operations
- ✅ Provides type-safe methods for interacting with the backend
- ✅ Handles error handling and notifications

| Method           | Purpose                                                     |
| ---------------- | ----------------------------------------------------------- |
| `getAll<T>()`    | Fetches all records with pagination, sorting, and filtering |
| `getOne<T>()`    | Fetches a single record by ID                               |
| `createOne<T>()` | Creates a new record                                        |
| `updateOne<T>()` | Updates an existing record                                  |
| `deleteOne()`    | Deletes a record                                            |

### 🛠️ Helper Services

Located in `src/app/services`, these services provide utility functions:

- ✅ Centralized and reusable methods
- ✅ Shared data and state
- ✅ Application-wide functionality

## 📊 Models and Type Definitions

### 📋 Models

Located in `src/app/models`, these are TypeScript classes that represent data entities:

- ✅ All models extend the `BaseModel<T>` class
- ✅ Provide type safety and intellisense
- ✅ Can include business logic and computed properties

<details>
<summary>📝 Example Model</summary>

```typescript
export class User extends BaseModel<User> {
  firstName!: string;
  lastName!: string;
  email!: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
```

</details>

### 🏷️ Types and Enums

| Category  | Location              | Purpose                                               |
| --------- | --------------------- | ----------------------------------------------------- |
| **Types** | `src/app/other/types` | Type definitions using TypeScript's type syntax       |
| **Enums** | `src/app/other/enums` | Enumeration values for consistent data representation |

<details>
<summary>💡 Best Practices</summary>

- Use interfaces for object shapes and types for unions/intersections
- Keep enums for values that won't change frequently
- Consider using string literal unions for more flexible enums

</details>

## 🔄 State Management

The template includes state management using **@ngrx/signals**:

- 📍 Located in `src/app/stores`
- 🔄 Provides a centralized store for application state
- ⚡ Uses a reactive approach with signals
- 🛠️ Includes methods for CRUD operations that update the state

<details>
<summary>📝 Example Store</summary>

```typescript
export const CustomersStore = signalStore(
  { providedIn: 'root' },
  withState(signalState<CustomersState>(INITIAL_STATE)),
  withMethods((store, customerService = inject(CustomerService)) => {
    return {
      async getAllCustomers(queryParams?: BaseQueryParams): Promise<ResponseWithRecords<Customer>> {
        // Implementation
      },
      async createOneCustomer(customer: Customer): Promise<Customer> {
        // Implementation
      },
      // Other methods
    };
  }),
);
```

</details>

## 📑 Tables

The template includes a powerful table component system for displaying and managing data.

### 📊 Basic Table Example

```html
<app-template-table-fetch [columns]="columns()" [fetchData]="fetchDataFn" [headers]="headers()" />
```

### 🧩 Table Component Implementation

For type safety and full functionality, extend the `BaseTableComponent`:

<details>
<summary>📝 Example Implementation</summary>

```typescript
export class UserTableComponent extends BaseTableComponent<User> implements Table<User>, OnInit {
  // Inject the service responsible for the API call
  userService = inject(UserService);

  // Data columns from the model
  columns: WritableSignal<(keyof User | 'delete' | 'edit')[]> = signal(['firstName']);

  // Translated headers (i18n keys)
  headers: WritableSignal<string[]> = signal(['general.firstName']);

  // Method name which calls the GET All endpoint
  setTableRefreshMethodName(): string {
    return 'getAllUsers';
  }

  // Service responsible for the API call
  setTableRefreshService() {
    return this.userService;
  }

  // Initialize with translations
  override ngOnInit() {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }
}
```

</details>

### 🔔 Table Events

| Event                                  | Description                              |
| -------------------------------------- | ---------------------------------------- |
| `(rowClickEvent)="rowClicked($event)"` | Emits the full object of the clicked row |

### 🎨 Custom Table Columns

You can customize table columns using templates:

<details>
<summary>📝 Example Custom Columns</summary>

```html
<app-template-table [fetchData]="fetchDataFn" [headers]="headers()" [columns]="columns()" [cellTemplatesMap]="{ name }" />

<!-- Custom column template -->
<ng-template #name let-value let-item="object">
  {{ value }}
  <app-delete-icon (click)="deleteItem(item)" />
</ng-template>
```

</details>

### 🔄 Table Refresh

Tables automatically refresh after HTTP operations (POST, PATCH, DELETE) when extending `BaseTableComponent<Model>`:

<details>
<summary>📝 Example Refresh Implementation</summary>

```typescript
export class TenantTableComponent extends BaseTableComponent<Tenant> {
  // Required methods
  setTableRefreshService() {
    return this.tenantService;
  }

  setTableRefreshMethodName() {
    return 'getAllTenants';
  }

  // Optional methods
  override setAdditionalParams(): any {
    return { name: 'John' }; // Adds &name=John to query params
  }

  override noParams = true; // Removes all params from the request
}
```

</details>

### 🔍 Table Search

The template includes built-in search functionality:

<details>
<summary>📝 Search Example</summary>

```html
<!-- Search component -->
<app-template-search [service]="userService" />

<!-- Table with search -->
<app-template-table [search]="userService.search()"></app-template-table>
```

This triggers a request like: `/users?search=searchTerm`

</details>

### 📅 Date Search

For date-based filtering:

<details>
<summary>📝 Date Search Example</summary>

```html
<!-- In your header component -->
<app-template-date-search [service]="customerService" />

<!-- In your table component -->
<app-template-table-fetch [headers]="headers()" [displayedColumns]="columns()" [fetchData]="fetchDataFn" [searchDate]="customerService.searchDate()" />
```

This triggers a request like: `/customers?searchDate=2024-06-12T00:00:00.000Z`

To implement this in your service:

```typescript
// In your service class
export class CustomerService {
  // Create a signal for the date search
  searchDate: WritableSignal<string> = signal('');

  // Use it in your API calls
  getAllCustomers(params?: BaseQueryParams): Promise<ResponseWithRecords<Customer>> {
    // The searchDate will be automatically added to the query params
    return this.httpService.getAll<Customer>('customers', params);
  }
}
```

You can use both regular search and date search together:

```html
<!-- In your header component -->
<app-template-table-search [service]="customerService" />
<app-template-date-search [service]="customerService" />

<!-- In your table component -->
<app-template-table-fetch [headers]="headers()" [displayedColumns]="columns()" [fetchData]="fetchDataFn" [search]="customerService.search()" [searchDate]="customerService.searchDate()" />
```

This will trigger a request like: `/customers?search=searchTerm&searchDate=2024-06-12T00:00:00.000Z`

</details>

## 💬 Dialogs

The template includes a dialog system for user interactions.

### 🗑️ Delete Dialog Example

<details>
<summary>📝 Delete Dialog Implementation</summary>

```typescript
// Create dialog data
const deleteContextData: DeleteContextData = {
  model: user,
  service: this.userService,
  deleteMethod: 'deleteUserById',
};

// Open the dialog
this.dialogService.openDialog(BaseDeleteDialogComponent, deleteContextData);
```

</details>

This handles:

- ✅ Displaying a confirmation dialog
- ✅ Calling the delete method if confirmed
- ✅ Refreshing the table after deletion
- ✅ Showing success/error notifications

### 🧩 Custom Dialogs

You can create custom dialogs by:

1. Creating a component that extends `BaseDialogComponent`
2. Using the `dialogService.openDialog()` method to open it
3. Handling the dialog result in the callback

<details>
<summary>💡 Dialog Best Practices</summary>

- Keep dialogs focused on a single task
- Use consistent styling across all dialogs
- Handle loading states and errors gracefully
- Provide clear feedback on actions

</details>

## 👨‍💻 Development

### 🚀 Getting Started

```bash
# Install dependencies
npm install

# Standard development server
npm start

# Development with local configuration
npm run start:local

# Development with mocked backend (no backend required)
npm run start:mock
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change any source files.

### 🧪 Mock Mode

The `mock` configuration starts the application without a running backend. A dedicated HTTP interceptor
(`src/app/other/interceptors/mock.interceptor.ts`) intercepts all API requests and simulates the backend with an
in-memory database:

- Three seeded records for each major object (tenants, roles, users, customers)
- Full CRUD simulation (create, read, update, delete, delete all) — changes live in memory for the session
- **No authentication required** — routes are accessible without logging in, and the navigation is shown right away; login and token refresh are still simulated (any credentials work, e.g. `admin@acme-gmbh.de` / `MockPasswort123!`)
- Search, sorting, pagination, and the active-tab filter are honored exactly like the real backend
- Requests are delayed by ~400 ms to make loading states visible

To enable mock mode for a build, use `ng build --configuration=mock`.

### ✅ Code Quality

The template includes:

| Tool         | Purpose         | Command                      |
| ------------ | --------------- | ---------------------------- |
| **ESLint**   | Code linting    | `npm run lint`               |
| **Prettier** | Code formatting | `npm run format`             |
| **Husky**    | Git hooks       | Runs automatically on commit |

<details>
<summary>🔧 Configuration Files</summary>

- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.husky/pre-commit` - Pre-commit hook configuration

</details>

## 📞 Contact

For questions or support, contact:

| Name               | Email                                        |
| ------------------ | -------------------------------------------- |
| **Joscha Sattler** | j.sattler@28apps.de or joscha.sattler@web.de |

## 📦 Shared Components UI Docs

This section serves as a compact UI documentation for the reusable Shared Components. Each component is briefly explained and shows at least two usage examples. Expansion panels (details/summary) are used to keep the view concise.

<details>
<summary>app-delete-icon — DeleteIconComponent</summary>

Short description

- Displays a Material icon (delete) and emits an event on click. Useful e.g. in table rows.

API

- Selector: app-delete-icon
- Inputs:
  - color?: string — CSS color (Default: var(--mat-sys-error))
- Outputs:
  - clickEvent: void — Emitted on click

Examples

1. Simple usage inside a card

```html
<div class="user-card">
  {{ selectedUser.fullName }}
  <app-delete-icon (clickEvent)="deleteUser(selectedUser)" />
</div>
```

2. Custom color and used as a table cell action

```html
<!-- Table with custom color -->
<ng-template #actions let-item>
  <app-delete-icon color="crimson" (clickEvent)="onDelete(item)" />
</ng-template>
```

</details>

<details>
<summary>app-edit-icon — EditIconComponent</summary>

Short description

- Displays a Material icon (edit) and emits an event on click. Ideal for edit actions.

API

- Selector: app-edit-icon
- Inputs:
  - color?: string — CSS color
- Outputs:
  - clickEvent: void — Emitted on click

Examples

1. Next to a title

```html
<h3 class="flex items-center gap-8">
  {{ title }}
  <app-edit-icon (clickEvent)="openEditDialog()" />
</h3>
```

2. Together with the delete icon in an action bar

```html
<div class="flex gap-8">
  <app-edit-icon color="#1565c0" (clickEvent)="onEdit(item)" />
  <app-delete-icon (clickEvent)="onDelete(item)" />
</div>
```

</details>

<details>
<summary>app-template-datepicker — TemplateDatepickerComponent</summary>

Short description

- Wraps the Angular Material Datepicker including label and form binding. Emits the selected date as an ISO string via dateChange. Optionally supports min/max date as well as label/field name. Can be used with a service that has a searchDate signal property.

API

- Selector: app-template-datepicker
- Inputs:
  - minDate?: Date
  - maxDate?: Date
  - label?: string — i18n key (Default: "general.select-date")
  - fControlName?: string — Name of the FormControl (Default: "date")
  - service?: { searchDate: WritableSignal<string> }
- Outputs:
  - dateChange: string — ISO date when changed

Examples

1. Standalone with handler (writes date to service signal)

```ts
// component.ts
import { WritableSignal, signal } from '@angular/core';
class DummyService {
  searchDate: WritableSignal<string> = signal('');
}
const service = new DummyService();

function onDateChange(iso: string) {
  service.searchDate.set(iso);
}
```

```html
<!-- component.html -->
<app-template-datepicker [service]="service" (dateChange)="onDateChange($event)" />
```

2. With min/max and custom label/field name

```html
<app-template-datepicker [minDate]="min" [maxDate]="max" label="filters.order-date" fControlName="orderDate" [service]="service" (dateChange)="onDateChange($event)" />
```

</details>

<details>
<summary>app-template-date-search — TemplateDateSearchComponent</summary>

Short description

- Provides a datepicker search field and writes the selected date directly into service().searchDate (WritableSignal<string>). Clearing the selection removes the filter.

API

- Selector: app-template-date-search
- Inputs:
  - service: { searchDate: WritableSignal<string> } — required

Examples

1. In a header bar for table filters

```html
<header class="flex gap-16 items-center">
  <app-template-date-search [service]="customerService" />
</header>
```

2. Together with a table component (date is automatically used as a query param)

```html
<!-- Header -->
<app-template-date-search [service]="customerService" />

<!-- Table -->
<app-template-table-fetch [headers]="headers()" [columns]="columns()" [fetchData]="fetchDataFn" [searchDate]="customerService.searchDate()" />
```

Note

- Combining regular search and date search is possible (see the “📅 Date Search” section above).

</details>

<details>
<summary>app-template-input — TemplateInputComponent</summary>

Short description

- Input field based on Angular Material, directly usable in Reactive Forms (automatically binds to the surrounding FormGroup via FormGroupDirective).

API

- Selector: app-template-input
- Inputs:
  - label?: string — i18n key or text (Default: "label")
  - fControlName: string — Name of the FormControl (required)
  - appearance?: 'fill' | 'outline' (Default: 'outline')
  - type?: 'text' | 'password' (Default: 'text')
  - subscriptSizing?: 'dynamic' | 'fixed' (Default: 'dynamic')

Examples

1. Simple search field in a toolbar (Reactive Form)

```ts
// component.ts
form = this.fb.group({ search: [''] });
```

```html
<form [formGroup]="form" class="flex items-center gap-12">
  <app-template-input label="general.search" fControlName="search" />
</form>
```

2. Password field with appearance "fill"

```ts
// component.ts
form = this.fb.group({ password: [''] });
```

```html
<form [formGroup]="form">
  <app-template-input label="auth.password" fControlName="password" appearance="fill" type="password" />
</form>
```

</details>

<details>
<summary>app-template-spinner — TemplateSpinnerComponent</summary>

Short description

- Simple loading indicator (MatProgressSpinner). Ideal for loading states in lists, dialogs, or cards.

API

- Selector: app-template-spinner
- Inputs/Outputs: —

Examples

1. Display during an HTTP loading process

```html
<section class="min-h-200 flex-center">
  <app-template-spinner *ngIf="loading; else content" />
  <ng-template #content>
    <!-- actual content -->
  </ng-template>
</section>
```

2. Inline spinner in a button bar

```html
<button mat-flat-button color="primary" [disabled]="loading">
  {{ 'general.save' | transloco }}
  <app-template-spinner *ngIf="loading" />
</button>
```

</details>

<details>
<summary>app-template-table — TemplateTableComponent</summary>

Short description

- Table component for local data (Array<T>) with pagination and sorting via Angular Material. Supports custom cells via a template map.

API

- Selector: app-template-table
- Inputs:
  - headers: string[] — Headers (i18n keys), required
  - displayedColumns: string[] — Column keys (supports nested keys via "."), required
  - tableData: T[] — Data source, required
  - cellTemplatesMap?: { [key: string]: TemplateRef } — Map for custom cells
  - pageSizes?: number[] (Default: [5,10,25,100])
  - initialPageSize?: number (Default: 10)
  - totalItems?: number — Total count (for paginator display)
- Outputs:
  - paginationChange: { skip: number; limit: number }

Examples

1. Simple table

```ts
// component.ts
headers = signal(['general.name', 'general.email']);
columns = signal(['name', 'email']);
users = signal<User[]>([]);

total = computed(() => users().length); // optional
```

```html
<app-template-table [headers]="headers()" [displayedColumns]="columns()" [tableData]="users()" [totalItems]="total()" (paginationChange)="onPage($event)" />
```

2. Custom cell via template

```html
<ng-template #actions let-item>
  <app-edit-icon (clickEvent)="edit(item)" />
  <app-delete-icon (clickEvent)="remove(item)" />
</ng-template>

<app-template-table [headers]="['general.name','general.actions']" [displayedColumns]="['name','actions']" [tableData]="users()" [cellTemplatesMap]="{ actions }" />
```

</details>

<details>
<summary>app-template-table-search — TemplateTableSearchComponent</summary>

Short description

- Lightweight search field for tables. Reads and writes directly to service().search (WritableSignal<string>) with debouncing in the table.

API

- Selector: app-template-table-search
- Inputs:
  - service: { search: WritableSignal<string> } — required

Examples

1. Search in the table header

```html
<header class="flex gap-12 items-center">
  <app-template-table-search [service]="userService" />
</header>
```

2. Combination of search and date search

```html
<header class="flex gap-12 items-center">
  <app-template-table-search [service]="customerService" />
  <app-template-date-search [service]="customerService" />
</header>
```

</details>

<details>
<summary>app-template-table-fetch — TemplateTableEnterFetchComponent</summary>

Short description

- Powerful table that loads data from the server via a fetchData function (Observable). Supports pagination, sorting, search, date search, and custom cells.

API

- Selector: app-template-table-fetch
- Inputs:
  - fetchData: (params: BaseGetQueryParams) => Observable<ResponseWithRecords<T>> — required
  - headers: string[] — i18n keys, required
  - displayedColumns: string[] — Column keys, required
  - cellTemplatesMap?: Record<string, TemplateRef>
  - search?: string — Current search value (e.g. service.search())
  - searchDate?: string — ISO date (e.g. service.searchDate())
  - initialSort?: string — Format "field,ASC" | "field,DESC"
  - tabValueActive?: boolean — Optional additional filter
  - pageSizes?: number[] (Default: [5,10,25,100])
  - initialPageSize?: number (Default: 10)
- Outputs: —

Examples

1. Basic usage with a service function

```ts
// component.ts
fetchDataFn = (params: BaseGetQueryParams) => this.userService.getAllUsers(params);
headers = signal(['general.name', 'general.email']);
columns = signal(['name', 'email']);
```

```html
<app-template-table-fetch [headers]="headers()" [displayedColumns]="columns()" [fetchData]="fetchDataFn" />
```

2. With search, date, sorting and custom cells

```html
<header class="flex gap-12 items-center">
  <app-template-table-search [service]="userService" />
  <app-template-date-search [service]="userService" />
</header>

<ng-template #actions let-item>
  <app-edit-icon (clickEvent)="edit(item)" />
  <app-delete-icon (clickEvent)="remove(item)" />
</ng-template>

<app-template-table-fetch [headers]="['general.name','general.actions']" [displayedColumns]="['name','actions']" [cellTemplatesMap]="{ actions }" [fetchData]="fetchDataFn" [search]="userService.search()" [searchDate]="userService.searchDate()" initialSort="name,ASC" />
```

Notes

- Nested keys in displayedColumns are supported (e.g. "address.city").
- initialSort must have the format "field,ASC" or "field,DESC".

</details>
