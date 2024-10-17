# Angular Template (how to work with the template):

questions @ joscha sattler -> j.sattler@28apps.de, joscha.sattler@web.de

# Table of content

1. [Project structure](#project-structure)
2. [Everything about table](#tables)
3. [Dialogs](#dialogs)

# Project Structure

# Style (Scss): global scss files are in the assets/scss folder :

- use _mixins.scss for custom global utility classes (directly usable as html class, no imports needed)
- use _colors.scss for repeating color values -> import them into the styles.scss as css variables
- use _variables.scss for custom repeating scss values
- Used UI Library: TAIGA UI: https://taiga-ui.dev/getting-started
  - to change TAIGA UI colors / variables use the styles.scss (there are examples)

### @media queries and breakpoints src/assets/variables

- values for common device breakpoints are located here
- globally usable @media queries for desktop, laptop, tablet and mobile are predefined and ready to be used
  - implement @use "index" as *; in the component.scss where the media query mixin should be used.

#### Example

```css
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

# Components:

- Reusable components: src/app/shared --> Base components that can be reused with different data / style via @Input() / @Output()
  ifferent component blocks, here are the different component blocks for the view (uses reusable components)

- Views / Pages src/app/views --> Views use the component blocks to display the full UI. It is used as a kind of "Layout-Component" for the different component blocks and are use in the routing

# Services:

API: src/app/api

- the api-folder contains api-services responsible for any http request
- every api service should extend the GenericHttpService

Helper services: src/app/services

- the services folder contains all services which are used for centralized and reusable methods + data

# Type definition:

Typescript classes >  src/app/other/models

Types (uses type not interfaces, same syntax except "=" before {}) >  src/app/other/types

Enums > src/app/other/enums

# Tables

### Most basic example possible (using User object)

````angular181html

<app-base-table [columns]="columns()" [fetchData]="fetchDataFn" [headers]="headers()" />
````

**very helpful to not miss anything + have type security - use this in the component.ts**

- `extends TableRefresherComponent<ClassModel>`
- `implements Table<ClassModel>`

````ts
export class TestViewComponent
  extends TableRefresherComponent<User>
  implements Table<User>, OnInit {

  // inject the service responsible for the api call (get all)
  userService = inject(UserService);

  // data columns with the name from the object, where the actual value is stored in
  columns: WritableSignal<(keyof User | 'delete' | 'edit')[]> = signal(['firstName',]);

  // translated header, just enter the i18n key (and dont forget ngOnInit implementation)
  headers: WritableSignal<string[]> = signal(['general.firstName']);

  // method name which calls the GET All endpoint in th service (needed for the parent fetchData call)
  setTableRefreshMethodName(): string {
    return 'getAllUsers';
  }

  // service responsible for the api call (needed for the parent fetchData call)
  setTableRefreshService() {
    return this.userService;
  }

  // ngOnInit using the translateHeaders method, for automatic transation
  override ngOnInit() {
    super.ngOnInit();
    super.translateHeaders(this.headers);
  }
}
````

### Possible events

- (rowClickEvent)="rowClicked($event)"
  - emits the full object of the clicked row eg. User

### Customizable table columns in parent component, example:

TS:

```
  headers = signal<string[]>(['general.name']);
  columns = signal<string[]>(['name']);
```

HTML: **important:** the names inside  [cellTemplatesMap] have to match the ng-template #name"

```angular181html

<app-base-table
  [fetchData]="fetchDataFn"
  [headers]="headers()"
  [columns]="columns()"
  [cellTemplatesMap]="{ name }"
/>

<!-- customized column, value = current name value, tenant(any name can be given) = full object (tenant) -->
<ng-template #name let-value let-tenant="object">
  {{ value }} {{ tenant }}
  <app-delete-icon />
</ng-template>
```

### Table refresh class: ComponentClass "extends TableRefresherComponent<Model>"

Used to automatically refresh the table data after a http request (POST, PATCH, DELETE)

located at: src/app/shared/table-refresher

````
  // Method must be implemented in each derived component
  abstract setTableRefreshService(): any;

  // Method must be implemented in each derived component
  abstract setTableRefreshMethodName(): string;

  // Optional method to override in derived components for additional parameters
  setAdditionalParams(): any {
    return null;
  }
  
  // Optional param to override whether or not the getAll should have no params at all
  protected noParams: boolean = false;
````

Example usage in a table component:

````ts
export class TenantTableComponent extends TableRefresherComponent<Tenant> {
  setTableRefreshService() {
    return this.tenantService;
  }

  setTableRefreshMethodName() {
    return 'getAllTenants';
  }

  // adds &name=John to the default query params
  override setAdditionalParams(): any {
    return { name: 'John' };
  }

  // aremoves every param from the getAll request, so it is just a blank request without a payload
  override noParams = true;
}
````

### Table search

#### "service".search() is accessible through GenericHttp in all api services by default

This triggers a getAllMethod with a param called search eg: <br />
/customers?search=max

````angular181html
<!-- search component -->
<app-base-search [serice]="userService" />

<!-- table adjustment (example user) -->
<app-base-table [search]="userService.search()">
````

### Table date search

This triggers a getAllMethod with a param called searchDate eg: <br />
/customers?searchDate=2024-06-12T00:00:00.000Z

````angular181html
<!-- search component -->
<app-base-search-date [service]="customerService" />

<!-- table adjustment (example customer) -->
<app-base-table [searchDate]="customerService.searchDate()" />
````

# Dialogs

### How to use base-delete-dialog component: example User

1. create a data object for the base-delete-dialog with all needed values
2. call the openDialog with the BaseDeleteDialogComponent and the created data object

````ts
// TYPE
export type DeleteContextData = {
  model: any; // e.g. user 
  service: any; // e.g. userService
  deleteMethod: string; // e.g. deleteUserById
};

// How to in user.component.ts
function openDeleteDialog(user: User) {
  const deleteContextData: DeleteContextData = {
    deleteMethod: 'deleteUserById',
    model: user,
    service: this.userService,
  };

  this.dialogService.openDialog(BaseDeleteDialogComponent, deleteContextData);
}
````

that's it, deleting + updating (table) is now fully functional

### TODO: how to use general Dialogs

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
