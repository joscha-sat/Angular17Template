# 🅰️ Angular Template (v21+)

<div align="center">

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![SCSS](https://img.shields.io/badge/SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-DD0031?style=for-the-badge&logo=primeng&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)

</div>

A comprehensive Angular template with built-in features for rapid application development.

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">✨ Overview</h2></summary>

This Angular template provides a solid foundation for building modern web applications with Angular 21+. It includes:

- ✅ Comprehensive API service architecture
- ✅ Model-based data handling
- ✅ Reusable UI components
- ✅ Table components with advanced features
- ✅ Dialog system
- ✅ State management with @ngrx/signals
- ✅ Internationalization with Transloco
- ✅ Code quality tools (ESLint, Prettier, Husky)

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">🏗️ Project Structure</h2></summary>

The project follows a modular structure:

| Directory            | Purpose                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| `src/app/api`        | API services for HTTP requests                                                     |
| `src/client`         | Auto-generated API client from OpenAPI spec (via `@hey-api/openapi-ts`)            |
| `src/app/components` | Feature-specific components                                                        |
| `src/app/models`     | Data models                                                                        |
| `src/app/other`      | Abstract classes, types, enums, guards, interceptors, layouts, pipes, environments |
| `src/app/services`   | Helper services                                                                    |
| `src/app/shared`     | Reusable UI components                                                             |
| `src/app/stores`     | State management                                                                   |
| `src/app/views`      | Page components used in routing                                                    |

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">🎨 Styling</h2></summary>

### 📁 Global SCSS Files

Global SCSS files are located in the `assets/scss` folder:

| File              | Purpose                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| `_index.scss`     | Forward file that re-exports all partials (use `@use 'index' as *` to import)    |
| `_mixins.scss`    | Custom global utility classes (directly usable as HTML class, no imports needed) |
| `_variables.scss` | Breakpoints, media-query mixins, and custom repeating SCSS values                |

### 🧰 UI Library

This template uses **PrimeNG** for UI components. You can customize PrimeNG themes in the `styles.scss` file.

### 📱 Responsive Design

Media queries and breakpoints are defined in `src/assets/scss/`:

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

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">🧩 Components</h2></summary>

The project uses a component-based architecture:

### 🔄 Shared Components

Located in `src/app/shared`, these are reusable components that can be used across the application:

- ✅ Base components that can be reused with different data/style via `@Input()` and `@Output()`
- ✅ UI elements like buttons, cards, inputs, etc.
- ✅ Complex components like tables, dialogs, etc.

<details>
<summary><h3 style="display: inline">💡 Best Practices</h3></summary>

- Keep shared components small and focused on a single responsibility
- Use strong typing with interfaces for inputs and outputs
- Document usage examples in component comments

</details>

### 📄 View Components

Located in `src/app/views`, these are page-level components used in routing:

- ✅ Views use the shared components to display the full UI
- ✅ Act as "Layout Components" for different component blocks
- ✅ Handle page-level logic and data fetching

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">🔌 Services</h2></summary>

### 🌐 API Services

Located in `src/app/api`, these services handle HTTP requests:

- ✅ Each service extends the `GenericHttpService` for common CRUD operations
- ✅ Provides type-safe methods for interacting with the backend
- ✅ Handles error handling and notifications

| Method                | Purpose                                                     |
| --------------------- | ----------------------------------------------------------- |
| `getAll<T>()`         | Fetches all records with pagination, sorting, and filtering |
| `getOne<T>()`         | Fetches a single record by ID                               |
| `createOne<T>()`      | Creates a new record                                        |
| `createMultiple<T>()` | Creates multiple records                                    |
| `updateOne<T>()`      | Updates an existing record                                  |
| `updateMultiple<T>()` | Updates multiple records                                    |
| `deleteOne()`         | Deletes a record                                            |
| `deleteAll<T>()`      | Deletes all records                                         |

### 🛠️ Helper Services

Located in `src/app/services`, these services provide utility functions:

- ✅ Centralized and reusable methods
- ✅ Shared data and state
- ✅ Application-wide functionality

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">📊 Models and Type Definitions</h2></summary>

### 📋 Models

Located in `src/app/models`, these are TypeScript classes that represent data entities:

- ✅ All models extend the `BaseModel<T>` class
- ✅ Provide type safety and intellisense
- ✅ Can include business logic and computed properties

<details>
<summary><h3 style="display: inline">📝 Example Model</h3></summary>

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
<summary><h3 style="display: inline">💡 Best Practices</h3></summary>

- Use interfaces for object shapes and types for unions/intersections
- Keep enums for values that won't change frequently
- Consider using string literal unions for more flexible enums

</details>

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">🔄 State Management</h2></summary>

The template includes state management using **@ngrx/signals**:

- 📍 Located in `src/app/stores`
- 🔄 Provides a centralized store for application state
- ⚡ Uses a reactive approach with signals
- 🛠️ Includes methods for CRUD operations that update the state

<details>
<summary><h3 style="display: inline">📝 Example Store</h3></summary>

```typescript
import { computed, inject, type Signal } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { type CustomerQueryParams, CustomerService } from '../api/customer.service';
import { type ResponseWithRecords } from '../api/base-http-service/base-http.service';
import { createRxMethod } from './signal-store-utility-service/signal-store-utility.service';

type CustomerState = {
  loading: boolean;
};

const initialState: CustomerState = {
  loading: false,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },

  // ENTITIES
  withEntities<Customer>(),

  // STATE
  withState(initialState),

  // COMPUTED
  withComputed(({ entities }: { entities: Signal<Customer[]> }) => ({
    totalCount: computed(() => entities().length),
  })),

  // METHODS
  withMethods((store, service: CustomerService = inject(CustomerService)) => ({
    getAllCustomers: createRxMethod<CustomerQueryParams | undefined, ResponseWithRecords<Customer>>(
      store,
      (queryParams) => service.getAllCustomers(queryParams),
      (result) => patchState(store, setAllEntities(result.records), { loading: false }),
    ),
  })),
);
```

</details>

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">👨‍💻 Development</h2></summary>

### 🚀 Getting Started

```bash
# Install dependencies
npm install

# Standard development server
npm start

# Development with local configuration
npm run start:local
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change any source files.

### ✅ Code Quality

The template includes:

| Tool         | Purpose         | Command                           |
| ------------ | --------------- | --------------------------------- |
| **ESLint**   | Code linting    | `npm run lint`                    |
| **Prettier** | Code formatting | `npm run prettier:write`          |
| **Vitest**   | Unit testing    | `npm run run-unit-tests:terminal` |
| **Husky**    | Git hooks       | Runs automatically on commit      |

<details>
<summary><h3 style="display: inline">🔧 Configuration Files</h3></summary>

- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.husky/pre-commit` - Pre-commit hook configuration

</details>

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">📑 Tables</h2></summary>

The template includes a powerful server-driven table component system. It is built from three layers that work together:

| Layer                     | File                                                 | Purpose                                                                    |
| ------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| **1. Signal Store**       | `src/app/stores/*.store.ts`                          | Holds data in memory, provides `entities`, `totalCount`, `loading` signals |
| **2. Abstract Component** | `src/app/other/abstract-classes/SignalStoreTable.ts` | Base class that connects a store to the table component                    |
| **3. Table Component**    | `src/app/shared/template-table-enter-fetch-method/`  | The actual PrimeNG table with pagination, search, sorting                  |

### 🧱 Step-by-Step Guide

#### Step 1: Create a Signal Store

The store holds the data and provides CRUD methods. Follow the standard store pattern from [State Management](#-state-management).

```typescript
// src/app/stores/customer.store.ts
import { signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { inject } from '@angular/core';
import { patchState } from '@ngrx/signals';
import { CustomerService } from '../api/customer.service';
import { createRxMethod } from './signal-store-utility-service/signal-store-utility.service';

type CustomerState = {
  loading: boolean;
};

const initialState: CustomerState = {
  loading: false,
};

export const CustomerStore = signalStore(
  { providedIn: 'root' },

  withEntities<Customer>(),
  withState(initialState),

  withMethods((store, service: CustomerService = inject(CustomerService)) => ({
    getAllCustomers: createRxMethod<CustomerQueryParams | undefined, ResponseWithRecords<Customer>>(
      store,
      (queryParams) => service.getAllCustomers(queryParams),
      (result) => patchState(store, setAllEntities(result.records), { tenant: result }),
    ),
  })),

  withHooks({
    onInit({ getAllCustomers }) {
      getAllCustomers(undefined);
    },
  }),
);
```

> **Important**: The store must have a `loading: boolean` property in its state so the table can show a loading indicator.

#### Step 2: Use a Service that extends GenericHttpService

Services that extend `GenericHttpService` already include the `search` and `searchDate` signals needed for filtering.

```typescript
// src/app/api/customer.service.ts
@Injectable({ providedIn: 'root' })
export class CustomerService extends GenericHttpService<Customer> {
  constructor() {
    super();
  }

  getAllCustomers(queryParams?: CustomerQueryParams): Observable<ResponseWithRecords<Customer>> {
    return this.getAll<Customer>('', queryParams);
  }
}
```

#### Step 3: Create a Table Component

Create a component that extends `SignalStoreTable<T>`. The base class handles `ngOnInit`, header translation, and refresh subscription — you only provide the store connection, service, and column config.

```typescript
// src/app/components/customer/customer-table/customer-table.ts
import { Component, inject } from '@angular/core';
import { SignalStoreTable, type TableColumnConfig } from '../../../other/abstract-classes/SignalStoreTable';
import {
  type TableDataSource,
  TemplateTableEnterFetch,
} from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { type CustomerQueryParams, CustomerService } from '../../../api/customer.service';
import { type Customer } from '../../../models/Customer';
import { CustomerStore } from '../../../stores/customer.store';

const COLUMN_CONFIG: TableColumnConfig = {
  displayedColumns: ['name', 'email', 'createdAt', 'updatedAt'],
  headers: ['customer.name', 'customer.email', 'general.createdAt', 'general.updatedAt'],
};

@Component({
  selector: 'app-customer-table',
  imports: [TemplateTableEnterFetch],
  templateUrl: './customer-table.html',
})
export class CustomerTable extends SignalStoreTable<Customer> {
  private readonly customerStore: InstanceType<typeof CustomerStore> = inject(CustomerStore);

  // The service provides refreshObservable$ — SignalStoreTable auto-subscribes
  protected override readonly service: CustomerService = inject(CustomerService);
  protected override readonly columnConfig: TableColumnConfig = COLUMN_CONFIG;
  // createTableDataSource builds the data source from store signals + load callback
  protected override readonly tableDataSource: TableDataSource<Customer> = this.createTableDataSource(
    this.customerStore,
    (parameters: unknown) => this.customerStore.getAllCustomers(parameters as CustomerQueryParams | undefined),
  );
}
```

#### Step 4: Wire Everything in the Template

```html
<!-- src/app/components/customer/customer-table/customer-table.html -->
<app-template-table-fetch
  [displayedPropertyColumns]="columns()"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="headers()"
  [searchFilterText]="customerService.search()"
  [dateSearchFilter]="customerService.searchDate()"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

### 🔍 Adding Search and Date Search

Place the search components in a header above the table. They write directly to the service's `search` and `searchDate` signals, which the table automatically picks up.

```html
<!-- Header with search bar + date picker -->
<header class="flex gap-12 items-center">
  <app-template-table-search [service]="customerService" />
  <app-template-date-search [service]="customerService" />
</header>

<!-- Table (receives search signals automatically) -->
<app-template-table-fetch
  [displayedPropertyColumns]="columns()"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="headers()"
  [searchFilterText]="customerService.search()"
  [dateSearchFilter]="customerService.searchDate()"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

The table debounces the search text by 500ms before sending a request, so rapid typing does not overload the server. When the search changes, pagination resets to the first page automatically.

### 🎨 Custom Cell Templates

You can override how individual columns are displayed using `ng-template` references.

```html
<!-- Define templates -->
<ng-template #statusCell let-value let-row="object">
  <span [class.active]="row.isActive">{{ value }}</span>
</ng-template>

<ng-template #actionsCell let-row="object">
  <app-edit-icon (clickEvent)="editCustomer(row)" />
  <app-delete-icon (clickEvent)="deleteCustomer(row)" />
</ng-template>

<!-- Pass them to the table -->
<app-template-table-fetch
  [displayedPropertyColumns]="['name', 'status', 'actions']"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="['customer.name', 'customer.status', '']"
  [customCellTemplates]="{ status: statusCell, actions: actionsCell }"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

Each template receives two context variables:

| Variable              | Description                          |
| --------------------- | ------------------------------------ |
| `$implicit`           | The cell value (same as `let-value`) |
| `object` or `let-row` | The full row data object             |

If no custom template is provided for a column, the table displays the raw value. Dates are automatically formatted as `dd.MM.yyyy HH:mm`.

### 🔄 Auto-Refresh

The table re-fetches data whenever the `dataRefreshTrigger` input changes. The `SignalStoreTable` base class automatically subscribes to `service.refreshObservable$` and increments `refreshCounter` on each emission. Services that extend `GenericHttpService` have a built-in `refreshObservable$` that emits after any create, update, or delete operation — so the table stays in sync automatically.

```typescript
// This is already set up for you — just provide the service:
// protected override readonly service = inject(CustomerService);
//
// After calling customerService.deleteOne(id), refreshObservable$ emits,
// SignalStoreTable increments refreshCounter,
// and the table re-fetches its data.
```

### 📋 Table Input Reference

| Input                         | Type                          | Default            | Description                                                                    |
| ----------------------------- | ----------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| `tableDataSource`             | `TableDataSource<T>`          | required           | Object providing entities, totalCount, loading + sendLoadRequest               |
| `columnHeaderLabels`          | `string[]`                    | required           | Translated column headers (can be i18n keys)                                   |
| `displayedPropertyColumns`    | `string[]`                    | required           | Property names on the data model (supports nested paths like `"address.city"`) |
| `customCellTemplates`         | `Record<string, TemplateRef>` | `{}`               | Maps column keys to custom cell templates                                      |
| `searchFilterText`            | `string`                      | `''`               | Current search text (bind to `service.search()`)                               |
| `dateSearchFilter`            | `string`                      | `''`               | ISO date string filter (bind to `service.searchDate()`)                        |
| `initialSortingConfiguration` | `SortParamType`               | `undefined`        | Initial sort in `"field,ASC"` or `"field,DESC"` format                         |
| `activeTabFilterValue`        | `boolean \| undefined`        | `undefined`        | Optional boolean filter for tab-based views                                    |
| `availablePageSizeOptions`    | `number[]`                    | `[5, 10, 25, 100]` | Page size dropdown options                                                     |
| `initialSelectedPageSize`     | `number`                      | `10`               | Default page size on first load                                                |
| `dataRefreshTrigger`          | `number`                      | `0`                | Increment to trigger a re-fetch                                                |

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">💬 Dialogs</h2></summary>

The template uses PrimeNG's `DialogService` (`primeng/dynamicdialog`) for opening reusable modal dialogs.

### Step-by-Step: Creating an Add/Edit Dialog

#### Step 1: Create a Dialog Component

The component receives data via `DynamicDialogConfig` and controls the dialog lifecycle via `DynamicDialogRef`. Implement the `AddEdit` interface for a consistent structure.

```typescript
// src/app/components/tenant/tenant-add-edit-dialog/tenant-add-edit-dialog.ts
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MODE } from '../../../other/enums/mode.enum';
import { AddEdit } from '../../../other/types/AddEdit.type';

@Component({
  selector: 'app-tenant-add-edit-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './tenant-add-edit-dialog.html',
})
export class TenantAddEditDialog implements OnInit, AddEdit {
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dialogRef: DynamicDialogRef = inject(DynamicDialogRef);
  private readonly config: DynamicDialogConfig<{ mode?: MODE; tenant?: Tenant }> = inject(
    DynamicDialogConfig,
  ) as DynamicDialogConfig<{ mode?: MODE; tenant?: Tenant }>;

  mode: MODE = MODE.ADD;
  tenantForm?: FormGroup;

  ngOnInit(): void {
    this.mode = this.config.data?.mode ?? MODE.ADD;
    this.initForm();
  }

  initForm(): void {
    const tenant = this.config.data?.tenant;
    this.tenantForm = this.fb.group({
      name: [tenant?.name ?? '', Validators.required],
    });
  }

  submit(): void {
    if (this.tenantForm?.invalid) return;
    // Call service, then close dialog
    this.dialogRef.close(true); // true = success signal
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  loadModelData(): void {
    // Optional: load additional data before opening
  }
}
```

#### Step 2: Open the Dialog from a Parent Component

Inject `DialogService` (from `primeng/dynamicdialog`) into the parent, then call `.open()`. Provide `DynamicDialog` as a provider at the component level.

```typescript
import { DialogService, DynamicDialog } from 'primeng/dynamicdialog';
import { TenantAddEditDialog } from '../tenant-add-edit-dialog/tenant-add-edit-dialog';
import { MODE } from '../../../other/enums/mode.enum';

@Component({
  selector: 'app-tenant-header',
  imports: [
    /* ... */
  ],
  providers: [DialogService], // Required!
})
export class TenantHeader {
  private readonly dialogService: DialogService = inject(DialogService);

  openCreateTenantDialog(): void {
    this.dialogService.open(TenantAddEditDialog, {
      data: { mode: MODE.ADD },
      showHeader: false,
      width: '350px',
      modal: true,
      dismissableMask: true,
      closable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
  }
}
```

### 🧩 Custom Dialogs Cheat Sheet

| Step | What to do                                                                     |
| ---- | ------------------------------------------------------------------------------ |
| 1    | Create a component (no base class needed)                                      |
| 2    | Inject `DynamicDialogRef` (to close) and `DynamicDialogConfig` (to read data)  |
| 3    | Implement `AddEdit` from `src/app/other/types/AddEdit.type.ts` for consistency |
| 4    | In the parent, provide `DialogService` at component level                      |
| 5    | Call `dialogService.open(YourComponent, { data: {...} })`                      |

<details>
<summary><h3 style="display: inline">💡 Dialog Best Practices</h3></summary>

- Keep dialogs focused on a single task
- Use consistent styling across all dialogs
- Handle loading states and errors gracefully
- Provide clear feedback on actions
- Use `breakpoints` in the config for responsive widths

</details>
</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">📦 Shared Components UI Docs</h2></summary>

This section serves as a compact UI documentation for the reusable Shared Components. Each component is briefly explained and shows at least two usage examples. Expansion panels keep the view concise.

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-delete-icon — DeleteIconComponent</h3></summary>

Displays a PrimeNG icon (delete) and emits an event on click. Useful e.g. in table rows.

|              |                   |
| ------------ | ----------------- |
| **Selector** | `app-delete-icon` |

**Inputs:**

| Name   | Type     | Default          | Description |
| ------ | -------- | ---------------- | ----------- |
| color? | `string` | `var(--p-error)` | CSS color   |

**Outputs:**

| Name       | Type   | Description      |
| ---------- | ------ | ---------------- |
| clickEvent | `void` | Emitted on click |

Examples

```html
<!-- Simple usage inside a card -->
<div class="user-card">
  {{ selectedUser.fullName }}
  <app-delete-icon (clickEvent)="deleteUser(selectedUser)" />
</div>
```

```html
<!-- Custom color in a table cell action -->
<ng-template #actions let-item>
  <app-delete-icon color="crimson" (clickEvent)="onDelete(item)" />
</ng-template>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-edit-icon — EditIconComponent</h3></summary>

Displays a PrimeNG icon (edit) and emits an event on click. Ideal for edit actions.

|              |                 |
| ------------ | --------------- |
| **Selector** | `app-edit-icon` |

**Inputs:**

| Name   | Type     | Default | Description |
| ------ | -------- | ------- | ----------- |
| color? | `string` | —       | CSS color   |

**Outputs:**

| Name       | Type   | Description      |
| ---------- | ------ | ---------------- |
| clickEvent | `void` | Emitted on click |

Examples

```html
<!-- Next to a title -->
<h3 class="flex items-center gap-8">
  {{ title }}
  <app-edit-icon (clickEvent)="openEditDialog()" />
</h3>
```

```html
<!-- Together with the delete icon in an action bar -->
<div class="flex gap-8">
  <app-edit-icon color="#1565c0" (clickEvent)="onEdit(item)" />
  <app-delete-icon (clickEvent)="onDelete(item)" />
</div>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-datepicker — TemplateDatepickerComponent</h3></summary>

Wraps the PrimeNG Datepicker including label and form binding. Emits the selected date as an ISO string via dateChange. Optionally supports min/max date as well as label/field name. Can be used with a service that has a searchDate signal property.

|              |                           |
| ------------ | ------------------------- |
| **Selector** | `app-template-datepicker` |

**Inputs:**

| Name          | Type                                     | Default                 | Description                      |
| ------------- | ---------------------------------------- | ----------------------- | -------------------------------- |
| minDate?      | `Date`                                   | —                       | Earliest selectable date         |
| maxDate?      | `Date`                                   | —                       | Latest selectable date           |
| label?        | `string`                                 | `"general.select-date"` | i18n key for the label           |
| fControlName? | `string`                                 | `"date"`                | FormControl name to bind         |
| service?      | `{ searchDate: WritableSignal<string> }` | —                       | Service with a searchDate signal |

**Outputs:**

| Name       | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| dateChange | `string` | ISO date string when changed |

Examples

```ts
// Standalone with handler — writes date to service signal
import { WritableSignal, signal } from '@angular/core';

class DummyService {
  searchDate: WritableSignal<string> = signal('');
}

const service = new DummyService();

function onDateChange(iso: string): void {
  service.searchDate.set(iso);
}
```

```html
<app-template-datepicker [service]="service" (dateChange)="onDateChange($event)" />
```

```html
<!-- With min/max and custom label/field name -->
<app-template-datepicker
  [minDate]="min"
  [maxDate]="max"
  label="filters.order-date"
  fControlName="orderDate"
  [service]="service"
  (dateChange)="onDateChange($event)"
/>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-date-search — TemplateDateSearchComponent</h3></summary>

Provides a datepicker search field and writes the selected date directly into `service().searchDate` (WritableSignal&lt;string&gt;). Clearing the selection removes the filter.

|              |                            |
| ------------ | -------------------------- |
| **Selector** | `app-template-date-search` |

**Inputs:**

| Name    | Type                                     | Default  | Description      |
| ------- | ---------------------------------------- | -------- | ---------------- |
| service | `{ searchDate: WritableSignal<string> }` | required | Service consumer |

Examples

```html
<!-- In a header bar for table filters -->
<header class="flex gap-16 items-center">
  <app-template-date-search [service]="customerService" />
</header>
```

```html
<!-- Together with a table component — date is used as a query param -->
<header class="flex gap-16 items-center">
  <app-template-date-search [service]="customerService" />
</header>

<app-template-table-fetch
  [displayedPropertyColumns]="columns()"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="headers()"
  [dateSearchFilter]="customerService.searchDate()"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

> Combining regular search and date search is possible (see the Tables section above).

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-input — TemplateInputComponent</h3></summary>

Input field based on PrimeNG, directly usable in Reactive Forms (automatically binds to the surrounding FormGroup via FormGroupDirective).

|              |                      |
| ------------ | -------------------- |
| **Selector** | `app-template-input` |

**Inputs:**

| Name             | Type                   | Default     | Description                |
| ---------------- | ---------------------- | ----------- | -------------------------- |
| label?           | `string`               | `"label"`   | i18n key or text           |
| fControlName     | `string`               | required    | FormControl name to bind   |
| appearance?      | `'fill' \| 'outline'`  | `'outline'` | Input style variant        |
| type?            | `'text' \| 'password'` | `'text'`    | Input type                 |
| subscriptSizing? | `'dynamic' \| 'fixed'` | `'dynamic'` | Subscript sizing behaviour |

Examples

```ts
// Simple search field in a toolbar
form = this.fb.group({ search: [''] });
```

```html
<form [formGroup]="form" class="flex items-center gap-12">
  <app-template-input label="general.search" fControlName="search" />
</form>
```

```ts
// Password field with appearance "fill"
form = this.fb.group({ password: [''] });
```

```html
<form [formGroup]="form">
  <app-template-input label="auth.password" fControlName="password" appearance="fill" type="password" />
</form>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-spinner — TemplateSpinnerComponent</h3></summary>

Simple loading indicator (PrimeNG). Ideal for loading states in lists, dialogs, or cards.

|              |                        |
| ------------ | ---------------------- |
| **Selector** | `app-template-spinner` |

No inputs or outputs.

Examples

```html
<!-- Display during an HTTP loading process -->
<section class="min-h-200 flex-center">
  @if (loading) {
  <app-template-spinner />
  } @else {
  <!-- actual content -->
  }
</section>
```

```html
<!-- Inline spinner in a button bar -->
<button pButton severity="primary" [disabled]="loading">
  {{ 'general.save' | transloco }} @if (loading) {
  <app-template-spinner />
  }
</button>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-table-search — TemplateTableSearchComponent</h3></summary>

Lightweight search field for tables. Reads and writes directly to `service().search` (WritableSignal&lt;string&gt;) with debouncing in the table.

|              |                             |
| ------------ | --------------------------- |
| **Selector** | `app-template-table-search` |

**Inputs:**

| Name    | Type                                 | Default  | Description      |
| ------- | ------------------------------------ | -------- | ---------------- |
| service | `{ search: WritableSignal<string> }` | required | Service consumer |

Examples

```html
<!-- Search in the table header -->
<header class="flex gap-12 items-center">
  <app-template-table-search [service]="userService" />
</header>
```

```html
<!-- Combination of search and date search -->
<header class="flex gap-12 items-center">
  <app-template-table-search [service]="customerService" />
  <app-template-date-search [service]="customerService" />
</header>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-table-fetch — TemplateTableEnterFetchComponent</h3></summary>

Powerful table that loads data from the server via a store-backed data source. Supports pagination, sorting, search, date search, and custom cells.

|              |                            |
| ------------ | -------------------------- |
| **Selector** | `app-template-table-fetch` |

**Inputs:**

| Name                         | Type                          | Default            | Description                                                               |
| ---------------------------- | ----------------------------- | ------------------ | ------------------------------------------------------------------------- |
| tableDataSource              | `TableDataSource<T>`          | required           | Provides entities, totalCount, loading + sendLoadRequest                  |
| columnHeaderLabels           | `string[]`                    | required           | Translated column headers (i18n keys)                                     |
| displayedPropertyColumns     | `string[]`                    | required           | Property names on the model (supports nested paths like `"address.city"`) |
| customCellTemplates?         | `Record<string, TemplateRef>` | `{}`               | Maps column keys to custom cell templates                                 |
| searchFilterText?            | `string`                      | `''`               | Current search text (bind to `service.search()`)                          |
| dateSearchFilter?            | `string`                      | `''`               | ISO date string (bind to `service.searchDate()`)                          |
| initialSortingConfiguration? | `SortParamType`               | —                  | Initial sort in `"field,ASC"` or `"field,DESC"` format                    |
| activeTabFilterValue?        | `boolean \| undefined`        | —                  | Optional boolean filter for tab-based views                               |
| availablePageSizeOptions?    | `number[]`                    | `[5, 10, 25, 100]` | Page size dropdown options                                                |
| initialSelectedPageSize?     | `number`                      | `10`               | Default page size on first load                                           |
| dataRefreshTrigger?          | `number`                      | `0`                | Increment to trigger a re-fetch                                           |

Examples

```html
<!-- Basic usage with a store -->
<app-template-table-fetch
  [displayedPropertyColumns]="columns()"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="headers()"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

```html
<!-- With search, date, sorting and custom cells -->
<header class="flex gap-12 items-center">
  <app-template-table-search [service]="userService" />
  <app-template-date-search [service]="userService" />
</header>

<ng-template #actions let-row>
  <app-edit-icon (clickEvent)="edit(row)" />
  <app-delete-icon (clickEvent)="remove(row)" />
</ng-template>

<app-template-table-fetch
  [displayedPropertyColumns]="['name', 'email', 'actions']"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="['general.name', 'general.email', '']"
  [customCellTemplates]="{ actions: actionsCell }"
  [searchFilterText]="userService.search()"
  [dateSearchFilter]="userService.searchDate()"
  [initialSortingConfiguration]="'name,ASC'"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

> Nested keys in displayedPropertyColumns are supported (e.g. `"address.city"`).
> initialSortingConfiguration must use the format `"field,ASC"` or `"field,DESC"`.
> The tableDataSource is typically provided by extending `SignalStoreTable`.

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-save-btn — SaveBtn</h3></summary>

PrimeNG button pre-configured with a transloco key for "save". Emits an event on click.

|              |                |
| ------------ | -------------- |
| **Selector** | `app-save-btn` |

**Inputs:**

| Name      | Type      | Default | Description         |
| --------- | --------- | ------- | ------------------- |
| disabled? | `boolean` | `false` | Disables the button |

**Outputs:**

| Name       | Type   | Description      |
| ---------- | ------ | ---------------- |
| clickEvent | `void` | Emitted on click |

Examples

```html
<!-- In a dialog footer -->
<footer class="flex gap-8 justify-end">
  <app-cancel-btn (cancelEvent)="cancel()" />
  <app-save-btn [disabled]="form.invalid" (clickEvent)="submit()" />
</footer>
```

```html
<!-- Standalone save button -->
<app-save-btn (clickEvent)="saveChanges()" />
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-cancel-btn — CancelBtn</h3></summary>

PrimeNG button pre-configured with a transloco key for "cancel". Emits an event on click.

|              |                  |
| ------------ | ---------------- |
| **Selector** | `app-cancel-btn` |

**Outputs:**

| Name        | Type   | Description      |
| ----------- | ------ | ---------------- |
| cancelEvent | `void` | Emitted on click |

Examples

```html
<!-- In a dialog footer -->
<footer class="flex gap-8 justify-end">
  <app-cancel-btn (cancelEvent)="cancel()" />
  <app-save-btn (clickEvent)="submit()" />
</footer>
```

```html
<!-- Inline cancel -->
<app-cancel-btn (cancelEvent)="resetForm()" />
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-icon-field — TemplateIconField</h3></summary>

Input field with a leading icon (PrimeNG IconField + InputIcon + InputText). Ideal for search bars, filter fields, or any input that benefits from a visual icon hint.

|              |                           |
| ------------ | ------------------------- |
| **Selector** | `app-template-icon-field` |

**Inputs:**

| Name         | Type     | Default  | Description                                |
| ------------ | -------- | -------- | ------------------------------------------ |
| iconClass    | `string` | required | PrimeNG icon class (e.g. `"pi pi-search"`) |
| placeholder? | `string` | `""`     | Placeholder text                           |

Examples

```html
<!-- Search field with search icon -->
<app-template-icon-field iconClass="pi pi-search" placeholder="Search..." />
```

```html
<!-- With a transloco placeholder -->
<app-template-icon-field iconClass="pi pi-user" placeholder="{{ 'general.username' | transloco }}" />
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-card-skeleton — TemplateCardSkeleton</h3></summary>

Loading placeholder for card-style layouts. Displays a circular avatar skeleton, text lines, and a content block with action buttons.

|              |                            |
| ------------ | -------------------------- |
| **Selector** | `app-template-card-skeleton` |

No inputs or outputs.

Examples

```html
<!-- Show while card data is loading -->
@if (isLoading) {
<app-template-card-skeleton />
} @else {
<app-user-card [user]="selectedUser" />
}
```

```html
<!-- In a grid of cards during initial load -->
<div class="grid grid-cols-3 gap-16">
  @for (_ of loadingPlaceholders; track _) {
  <app-template-card-skeleton />
  }
</div>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-list-skeleton — TemplateListSkeleton</h3></summary>

Loading placeholder for list layouts. Displays a vertical list of items, each with a circular avatar and two text lines.

|              |                            |
| ------------ | -------------------------- |
| **Selector** | `app-template-list-skeleton` |

No inputs or outputs.

Examples

```html
<!-- Show while list data is loading -->
@if (isLoading) {
<app-template-list-skeleton />
} @else {
<ul>
  @for (item of items(); track item.id) {
  <li>{{ item.name }}</li>
  }
</ul>
}
```

```html
<!-- Multiple skeletons for a longer list -->
@for (_ of [1, 2, 3]; track _) {
<app-template-list-skeleton />
}
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-table-skeleton — TemplateTableSkeleton</h3></summary>

Loading placeholder for table layouts. Displays a PrimeNG table with skeleton cells in headers and 10 body rows.

|              |                            |
| ------------ | -------------------------- |
| **Selector** | `app-template-table-skeleton` |

No inputs or outputs.

Examples

```html
<!-- Show while table data is loading -->
@if (tableDataSource.loading()) {
<app-template-table-skeleton />
} @else {
<app-template-table-fetch
  [displayedPropertyColumns]="columns()"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="headers()"
/>
}
```

```html
<!-- Full-width table skeleton -->
<div class="w-full">
  <app-template-table-skeleton />
</div>
```

</details>

<details style="margin-bottom: 1rem">
<summary><h3 style="display: inline">app-template-select-autocomplete — TemplateSelectAutocomplete</h3></summary>

Autocomplete input with dropdown support, filtering, and optional multi-select. Supports custom item/header/footer templates via `ng-template`.

|              |                                 |
| ------------ | ------------------------------- |
| **Selector** | `app-template-select-autocomplete` |

**Inputs:**

| Name                  | Type                         | Default     | Description                              |
| --------------------- | ---------------------------- | ----------- | ---------------------------------------- |
| options               | `Array<SelectOptions>`       | required    | Array of `{ name, value }` options       |
| selectedValue         | `SelectValue \| SelectValue[]` | —         | Two-way bound selected value(s)          |
| isDisplayedAsDropdown?| `boolean`                    | `true`      | Show dropdown arrow                      |
| multiple?             | `boolean`                    | `false`     | Enable multi-select mode                 |
| size?                 | `'small' \| 'large'`         | —           | Input size variant                       |
| placeholder?          | `string`                     | —           | Placeholder text                         |
| label?                | `string`                     | —           | Float label text                         |

**Outputs:**

| Name          | Type                         | Description                    |
| ------------- | ---------------------------- | ------------------------------ |
| selectedValueChange | `SelectValue \| SelectValue[]` | Emitted when selection changes |

Examples

```ts
// Component setup
readonly countries: Array<SelectOptions> = [
  { name: 'Germany', value: 'DE' },
  { name: 'France', value: 'FR' },
  { name: 'Spain', value: 'ES' },
];
readonly selectedCountry: WritableSignal<SelectValue | undefined> = signal(undefined);
```

```html
<!-- Basic single-select with label -->
<app-template-select-autocomplete
  [options]="countries"
  [(selectedValue)]="selectedCountry"
  label="general.country"
  placeholder="Select a country..."
/>
```

```html
<!-- Multi-select with custom item template -->
<app-template-select-autocomplete
  [options]="users"
  [(selectedValue)]="selectedUsers"
  [multiple]="true"
  label="general.assign-users"
>
  <ng-template #item let-context>
    <div class="flex items-center gap-8">
      <span class="pi pi-user"></span>
      <span>{{ context.name }}</span>
    </div>
  </ng-template>
</app-template-select-autocomplete>
```

> `SelectOptions` type is `{ name: string; value: SelectValue }` where `SelectValue = string | number | boolean`.
> Custom templates use `#item`, `#header`, and `#footer` ng-template references.

</details>

</details>

<details style="margin-bottom: 1rem">
<summary><h2 style="display: inline">📞 Contact</h2></summary>

For questions or support, contact:

| Name               | Email                                        |
| ------------------ | -------------------------------------------- |
| **Joscha Sattler** | j.sattler@28apps.de or joscha.sattler@web.de |

</details>
