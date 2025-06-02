# ESLint Custom Rules Troubleshooting

## Issue: ESLint Rules Not Showing in IDE

If you're not seeing ESLint warnings or errors in your IDE (WebStorm, VS Code, etc.) despite having correctly configured ESLint rules, try the following steps:

### For WebStorm Users

1. **Verify ESLint Integration is Enabled**
   - Go to `File > Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint`
   - Make sure "Automatic ESLint configuration" is selected or manually set the path to your ESLint configuration file
   - Ensure "Run eslint --fix on save" is checked if you want automatic fixes

2. **Restart ESLint Service**
   - In the status bar at the bottom of WebStorm, look for the ESLint icon
   - Click on it and select "Restart ESLint Service"

3. **Invalidate Caches and Restart**
   - Go to `File > Invalidate Caches / Restart...`
   - Select "Invalidate and Restart"
   - This will clear all caches and restart WebStorm

4. **Verify ESLint Version**
   - Make sure you're using a compatible version of ESLint
   - Run `npx eslint --version` to check your current version

### For VS Code Users

1. **Install ESLint Extension**
   - Make sure you have the ESLint extension installed
   - Search for "ESLint" in the Extensions marketplace

2. **Configure ESLint Extension**
   - Go to `File > Preferences > Settings`
   - Search for "eslint"
   - Make sure "ESLint: Enable" is checked
   - Set "ESLint: Package Manager" to "npm"

3. **Restart VS Code**
   - Sometimes a simple restart can fix issues with extensions

4. **Reload Window**
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
   - Type "Reload Window" and select it

### General Troubleshooting

1. **Verify ESLint Works from Command Line**
   - Run `npx eslint src\app\views\test-view\test-view.component.ts`
   - If this shows errors/warnings but your IDE doesn't, it's an IDE configuration issue

2. **Check for Conflicting Extensions**
   - Disable other linting extensions that might conflict with ESLint

3. **Clear ESLint Cache**
   - Run `npx eslint --no-cache src\app\views\test-view\test-view.component.ts`
   - If this works but regular ESLint doesn't, there might be a caching issue

4. **Update ESLint and Plugins**
   - Run `npm update eslint @eslint/js typescript-eslint @angular-eslint/eslint-plugin @angular-eslint/eslint-plugin-template @angular-eslint/template-parser eslint-plugin-rxjs-x`
   - Sometimes updating to the latest versions can fix compatibility issues

## Custom Rules Configuration

Our project uses the following custom ESLint rules:

1. **method-too-complex-warning**: Warns when method complexity exceeds 6
2. **method-too-complex-error**: Errors when method complexity exceeds 10
3. **component-max-lines-warning**: Warns when component file exceeds 300 lines
4. **component-max-lines-error**: Errors when component file exceeds 400 lines

These rules are configured in `eslint.config.mjs` and implemented in the `eslint-custom-rules` directory.
