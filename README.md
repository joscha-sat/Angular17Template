# AngularTemplateV2

## Angular Template Structure (how to work with the template):

questions @ joscha sattler -> j.sattler@28apps.de, joscha.sattler@web.de

### Style (Scss): global scss files are in the assets/scss folder :

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

### Components:

- Reusable components src/app/shared --> Base components that can be reused with different data / style via @Input() / @Output()
- View components src/app/components --> A view is split into different component blocks, here are the different component blocks for the view (uses reusable components)
- Views src/app/views --> Views use the component blocks to display the full UI. It is used as a kind of "Layout-Component" for the different component blocks

### Customizable table columns in parent component, example:

TS:

```
  @Input({ required: true }) tenants$: Observable<Tenant[]> | undefined;
  headers = signal<string[]>(['Name']);
  columns = signal<string[]>(['name']);
```

HTML: **important:** the names inside  [cellTemplatesMap] have to match the ng-template #name"

```angular17html
@if (tenants$ | async) {
  <app-base-table-async
    [tableData$]="tenants$!"
    (rowClickEvent)="rowClicked($event)"
    [headers]="headers()"
    [columns]="columns()"
    [cellTemplatesMap]="{'name': name}"
  />

  <!-- customized column, value = current name value, object = full object (tenant) -->
  <ng-template #name let-value let-object="object">
    {{ value }} {{ object }}
    <app-delete-icon/>
  </ng-template>
}
```

### Services:

API: src/app/api

- the api-folder contains api-services responsible for any http request

Helper services: src/app/services

- the services folder contains all services which are used for centralized and reusable methods + data

### Type definition:

Typescript classes >  src/app/models

Types (uses type not interfaces, same syntax except "=" before {}) >  src/app/types

Enums > src/app/enums

##

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
