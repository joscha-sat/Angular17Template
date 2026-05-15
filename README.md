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

## 📋 Table of Contents

1. [✨ Overview](#-overview)
2. [🏗️ Project Structure](#️-project-structure)
3. [🎨 Styling](#-styling)
4. [🧩 Components](#-components)
5. [🔌 Services](#-services)
6. [📊 Models and Type Definitions](#-models-and-type-definitions)
7. [🔄 State Management](#-state-management)
8. [👨‍💻 Development](#-development)
9. [📑 Tables](#-tables)
10. [💬 Dialogs](#-dialogs)
11. [📦 Shared Components UI Docs](#-shared-components-ui-docs)
12. [📞 Contact](#-contact)

## ✨ Overview

This Angular template provides a solid foundation for building modern web applications with Angular 21+. It includes:

- ✅ Comprehensive API service architecture
- ✅ Model-based data handling
- ✅ Reusable UI components
- ✅ Table components with advanced features
- ✅ Dialog system
- ✅ State management with @ngrx/signals
- ✅ Internationalization with Transloco
- ✅ Code quality tools (ESLint, Prettier, Husky)

## 🏗️ Project Structure

The project follows a modular structure:

| Directory            | Purpose                                                                            |
| -------------------- | ---------------------------------------------------------------------------------- |
| `src/app/api`        | API services for HTTP requests                                                     |
| `src/app/components` | Feature-specific components                                                        |
| `src/app/models`     | Data models                                                                        |
| `src/app/other`      | Abstract classes, types, enums, guards, interceptors, layouts, pipes, environments |
| `src/app/services`   | Helper services                                                                    |
| `src/app/shared`     | Reusable UI components                                                             |
| `src/app/stores`     | State management                                                                   |
| `src/app/views`      | Page components used in routing                                                    |

## 🎨 Styling

### 📁 Global SCSS Files

Global SCSS files are located in the `assets/scss` folder:

| File              | Purpose                                                                          |
| ----------------- | -------------------------------------------------------------------------------- |
| `_mixins.scss`    | Custom global utility classes (directly usable as HTML class, no imports needed) |
| `_colors.scss`    | Repeating color values (import them into styles.scss as CSS variables)           |
| `_variables.scss` | Custom repeating SCSS values                                                     |

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
export const CustomerStore = signalStore(
  { providedIn: 'root' },

  // ENTITIES
  withEntities<Customer>(),

  // STATE
  withState(initialState),

  // COMPUTED
  withComputed(({ entities, loading }) => ({
    totalCount: computed(() => entities().length),
    isLoading: computed(() => loading()),
  })),

  // API METHODS
  withMethods((store, service = inject(CustomerService)) => ({
    getAllCustomers: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() =>
          service.getAllCustomers().pipe(
            tapResponse({
              next: (customers: ResponseWithRecords<Customer>) =>
                patchState(store, setAllEntities(customers.records), {
                  ...customers,
                  loading: false,
                }),
              error: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
);
```

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
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change any source files.

### ✅ Code Quality

The template includes:

| Tool         | Purpose         | Command                      |
| ------------ | --------------- | ---------------------------- |
| **ESLint**   | Code linting        | `npm run lint`               |
| **Prettier** | Code formatting     | `npm run prettier:write`     |
| **Vitest**   | Unit testing        | `npm run run-unit-tests:terminal` |
| **Husky**    | Git hooks           | Runs automatically on commit |

<details>
<summary>🔧 Configuration Files</summary>

- `eslint.config.mjs` - ESLint configuration
- `.prettierrc` - Prettier configuration
- `.husky/pre-commit` - Pre-commit hook configuration

</details>

## 📑 Tables

The template includes a powerful server-driven table component system. It is built from three layers that work together:

| Layer | File | Purpose |
|-------|------|---------|
| **1. Signal Store** | `src/app/stores/*.store.ts` | Holds data in memory, provides `entities`, `totalCount`, `loading` signals |
| **2. Abstract Component** | `src/app/other/abstract-classes/SignalStoreTable.ts` | Base class that connects a store to the table component |
| **3. Table Component** | `src/app/shared/template-table-enter-fetch-method/` | The actual PrimeNG table with pagination, search, sorting |

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

Create a component that extends `SignalStoreTable<T>`.

```typescript
// src/app/components/customer/customer-table/customer-table.ts
import { Component, inject, signal, type WritableSignal } from '@angular/core';
import { type Observable } from 'rxjs';
import { SignalStoreTable } from '../../../other/abstract-classes/SignalStoreTable';
import {
  type TableDataSource,
  TemplateTableEnterFetch,
} from '../../../shared/template-table-enter-fetch-method/template-table-enter-fetch';
import { CustomerStore } from '../../../stores/customer.store';
import { CustomerService } from '../../../api/customer.service';
import { type Customer } from '../../../models/Customer';

@Component({
  selector: 'app-customer-table',
  imports: [TemplateTableEnterFetch],
  templateUrl: './customer-table.html',
})
export class CustomerTable extends SignalStoreTable<Customer> {
  private readonly customerStore: InstanceType<typeof CustomerStore> = inject(CustomerStore);
  protected readonly customerService: CustomerService = inject(CustomerService);

  readonly headers: WritableSignal<string[]> = signal<string[]>([
    'customer.name',
    'customer.email',
    'general.createdAt',
    'general.updatedAt',
  ]);

  readonly columns: WritableSignal<string[]> = signal<string[]>(['name', 'email', 'createdAt', 'updatedAt']);

  // The service emits an event whenever data should be refreshed
  protected readonly onDataChanged$: Observable<unknown> = this.customerService.refreshObservable$;

  // Connects the store to the table
  protected createTableDataSource(): TableDataSource<Customer> {
    return {
      entities: this.customerStore.entities,
      totalCount: this.customerStore.totalCount,
      loading: this.customerStore.loading,
      sendLoadRequest: (parameters: unknown) =>
        this.customerStore.getAllCustomers(parameters as CustomerQueryParams | undefined),
    };
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.translateHeaders(this.headers);
  }
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

| Variable | Description |
|----------|-------------|
| `$implicit` | The cell value (same as `let-value`) |
| `object` or `let-row` | The full row data object |

If no custom template is provided for a column, the table displays the raw value. Dates are automatically formatted as `dd.MM.yyyy HH:mm`.

### 🔄 Auto-Refresh

The table re-fetches data whenever the `dataRefreshTrigger` input changes. The `SignalStoreTable` base class increments `refreshCounter` whenever `onDataChanged$` emits. Services that extend `GenericHttpService` have a built-in `refreshObservable$` that emits after any create, update, or delete operation — so the table stays in sync automatically.

```typescript
// This is already set up for you in the base service:
// After calling customerService.deleteOne(id), refreshObservable$ emits,
// SignalStoreTable increments refreshCounter,
// and the table re-fetches its data.
```

### 📋 Table Input Reference

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `tableDataSource` | `TableDataSource<T>` | required | Object providing entities, totalCount, loading + sendLoadRequest |
| `columnHeaderLabels` | `string[]` | required | Translated column headers (can be i18n keys) |
| `displayedPropertyColumns` | `string[]` | required | Property names on the data model (supports nested paths like `"address.city"`) |
| `customCellTemplates` | `Record<string, TemplateRef>` | `{}` | Maps column keys to custom cell templates |
| `searchFilterText` | `string` | `''` | Current search text (bind to `service.search()`) |
| `dateSearchFilter` | `string` | `''` | ISO date string filter (bind to `service.searchDate()`) |
| `initialSortingConfiguration` | `SortParamType` | `undefined` | Initial sort in `"field,ASC"` or `"field,DESC"` format |
| `activeTabFilterValue` | `boolean \| undefined` | `undefined` | Optional boolean filter for tab-based views |
| `availablePageSizeOptions` | `number[]` | `[5, 10, 25, 100]` | Page size dropdown options |
| `initialSelectedPageSize` | `number` | `10` | Default page size on first load |
| `dataRefreshTrigger` | `number` | `0` | Increment to trigger a re-fetch |


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

## 📦 Shared Components UI Docs

This section serves as a compact UI documentation for the reusable Shared Components. Each component is briefly explained and shows at least two usage examples. Expansion panels (details/summary) are used to keep the view concise.

<details>
<summary>app-delete-icon — DeleteIconComponent</summary>

Short description

- Displays a PrimeNG icon (delete) and emits an event on click. Useful e.g. in table rows.

API

- Selector: app-delete-icon
- Inputs:
  - color?: string — CSS color (Default: var(--p-error))
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

- Displays a PrimeNG icon (edit) and emits an event on click. Ideal for edit actions.

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

- Wraps the PrimeNG Datepicker including label and form binding. Emits the selected date as an ISO string via dateChange. Optionally supports min/max date as well as label/field name. Can be used with a service that has a searchDate signal property.

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
<app-template-table-fetch
  [displayedPropertyColumns]="columns()"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="headers()"
  [dateSearchFilter]="customerService.searchDate()"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

Note

- Combining regular search and date search is possible (see “Adding Search and Date Search” in the Tables section above).

</details>

<details>
<summary>app-template-input — TemplateInputComponent</summary>

Short description

- Input field based on PrimeNG, directly usable in Reactive Forms (automatically binds to the surrounding FormGroup via FormGroupDirective).

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

- Simple loading indicator (PrimeNG). Ideal for loading states in lists, dialogs, or cards.

API

- Selector: app-template-spinner
- Inputs/Outputs: —

Examples

1. Display during an HTTP loading process

```html
<section class="min-h-200 flex-center">
  @if (loading) {
  <app-template-spinner />
  } @else {
  <!-- actual content -->
  }
</section>
```

2. Inline spinner in a button bar

```html
<button pButton severity="primary" [disabled]="loading">
  {{ 'general.save' | transloco }} @if (loading) {
  <app-template-spinner />
  }
</button>
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

- Powerful table that loads data from the server via a store-backed data source. Supports pagination, sorting, search, date search, and custom cells.

API

- Selector: app-template-table-fetch
- Inputs:
  - tableDataSource: TableDataSource<T> — required, provides data signals + sendLoadRequest
  - columnHeaderLabels: string[] — required, column header text (i18n keys)
  - displayedPropertyColumns: string[] — required, property names on the data model
  - customCellTemplates?: Record<string, TemplateRef> — custom cell renderers
  - searchFilterText?: string — Current search text (bind to service.search())
  - dateSearchFilter?: string — ISO date string (bind to service.searchDate())
  - initialSortingConfiguration?: SortParamType — Format "field,ASC" | "field,DESC"
  - activeTabFilterValue?: boolean — Optional boolean filter
  - availablePageSizeOptions?: number[] (Default: [5,10,25,100])
  - initialSelectedPageSize?: number (Default: 10)
  - dataRefreshTrigger?: number (Default: 0) — Increment to re-fetch data
- Outputs: —

Examples

1. Basic usage with a store

```html
<app-template-table-fetch
  [displayedPropertyColumns]="columns()"
  [tableDataSource]="tableDataSource"
  [columnHeaderLabels]="headers()"
  [dataRefreshTrigger]="refreshCounter()"
/>
```

2. With search, date, sorting and custom cells

```html
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

Notes

- Nested keys in displayedPropertyColumns are supported (e.g. "address.city").
- initialSortingConfiguration must have the format "field,ASC" or "field,DESC".
- The tableDataSource object is typically provided by extending SignalStoreTable.

</details>

## 📞 Contact

For questions or support, contact:

| Name               | Email                                        |
| ------------------ | -------------------------------------------- |
| **Joscha Sattler** | j.sattler@28apps.de or joscha.sattler@web.de |
