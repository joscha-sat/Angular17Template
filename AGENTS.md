## Scripts to run after changes are done:

- npm run eslint
- npx prettier --write "src/\*_/_.{html,ts,scss}"

## Tech Stack:

- Angular: ^21.1.1
- TypeScript: ~5.9.3
- RxJS: ~7.8.2
- Angular Material: ^21.1.1
- ESLint: ^9.39.2
- Prettier: ^3.8.1

## Project Structure:

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

## Refactoring aka clean code criteria:

- DRY (Don't Repeat Yourself)
  - bad:
    ```ts
    calculateCircleArea(r) { return 3.14 * r * r; }
    calculateCylinderVolume(r, h) { return 3.14 * r * r * h; }
    ```
  - good:
    ```ts
    calculateCircleArea(r) { return Math.PI * r * r; }
    calculateCylinderVolume(r, h) { return calculateCircleArea(r) * h; }
    ```

- KISS (Keep It Simple, Stupid)
  - bad:
    ```ts
    !!value ? value : null;
    ```
  - good:
    ```ts
    value || null;
    ```

- YAGNI (You Ain't Gonna Need It)
  - bad:
    ```ts
    interface User {
      id: number;
      name: string;
      age: number;
      address: string;
      phone: string;
    }
    ```
    (when only id and name are used)
  - good:
    ```ts
    interface User {
      id: number;
      name: string;
    }
    ```

- Readability over Cleverness (no shortcuts, write things out)
  - bad:
    ```ts
    customerId = customer.map((c) => c.id);
    ```
  - good:
    ```ts
    customerId = customer.map((customer) => customer.id);
    ```

- No overuse of comments (if needed in english only)
  - bad:
    ```ts
    // increment counter by 1
    i++;
    ```
  - good:
    ```ts
    i++;
    ```

- No deep nesting
  - bad:
    ```ts
    if (a) {
      if (b) {
        if (c) {
          return true;
        }
      }
    }
    ```
  - good:
    ```ts
    if (!a || !b || !c) {
      return false;
    }
    return true;
    ```

- dont change behaviour, only update to use clean code

## Prefer

- tpye over interfacve
