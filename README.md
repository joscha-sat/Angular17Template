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
|----------------------|----------------------------------------------|
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
|-------------------|----------------------------------------------------------------------------------|
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
@use "index" as *;

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
|------------------|-------------------------------------------------------------|
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
    return `${ this.firstName } ${ this.lastName }`;
  }
}
```

</details>

### 🏷️ Types and Enums

| Category  | Location              | Purpose                                               |
|-----------|-----------------------|-------------------------------------------------------|
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

<app-template-table-fetch
  [columns]="columns()"
  [fetchData]="fetchDataFn"
  [headers]="headers()"
/>
```

### 🧩 Table Component Implementation

For type safety and full functionality, extend the `BaseTableComponent`:

<details>
<summary>📝 Example Implementation</summary>

```typescript
export class UserTableComponent
  extends BaseTableComponent<User>
  implements Table<User>, OnInit {

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
|----------------------------------------|------------------------------------------|
| `(rowClickEvent)="rowClicked($event)"` | Emits the full object of the clicked row |

### 🎨 Custom Table Columns

You can customize table columns using templates:

<details>
<summary>📝 Example Custom Columns</summary>

```html

<app-template-table
  [fetchData]="fetchDataFn"
  [headers]="headers()"
  [columns]="columns()"
  [cellTemplatesMap]="{ name }"
/>

<!-- Custom column template -->
<ng-template #name let-value let-item="object">
  {{ value }}
  <app-delete-icon (click)="deleteItem(item)"/>
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
<app-template-search [service]="userService"/>

<!-- Table with search -->
<app-template-table [search]="userService.search()">
```

This triggers a request like: `/users?search=searchTerm`
</details>

### 📅 Date Search

For date-based filtering:

<details>
<summary>📝 Date Search Example</summary>

```html
<!-- Date search component -->
<app-template-search-date [service]="customerService"/>

<!-- Table with date search -->
<app-template-table [searchDate]="customerService.searchDate()"/>
```

This triggers a request like: `/customers?searchDate=2024-06-12T00:00:00.000Z`
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
  deleteMethod: 'deleteUserById'
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
```

Navigate to `http://localhost:4200/`. The application will automatically reload when you change any source files.

### ✅ Code Quality

The template includes:

| Tool         | Purpose         | Command                      |
|--------------|-----------------|------------------------------|
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
|--------------------|----------------------------------------------|
| **Joscha Sattler** | j.sattler@28apps.de or joscha.sattler@web.de |
