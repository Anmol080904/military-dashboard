# Husky, Lint-Staged & Prettier Setup Guide

This guide documents how to install and configure **Husky**, **Lint-Staged**, and **Prettier** in your project for automated code formatting and linting on every git commit.

## Overview

- **Husky**: Git hooks manager (runs scripts before commit)
- **Lint-Staged**: Only runs linters on staged files (faster)
- **Prettier**: Code formatter
- **ESLint**: Already configured in your project

Together, these tools ensure consistent code style and catch errors before committing.

---

## Step-by-Step Installation

### 1. Install Dependencies

Run the following command in your project directory:

```bash
npm install --save-dev husky lint-staged prettier
```

Or if using Yarn:

```bash
yarn add --dev husky lint-staged prettier
```

### 2. Initialize Husky

This creates the `.husky` directory and installs git hooks:

```bash
npx husky install
```

### 3. Add the Pre-Commit Hook

Create the pre-commit hook that runs lint-staged:

```bash
npx husky add .husky/pre-commit "npx lint-staged"
```

If the above command doesn't work, manually create `.husky/pre-commit` with this content:

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged
```

### 4. Add the Prepare Script to package.json

Add this script to your `package.json` (usually in the `scripts` section):

```json
"scripts": {
  "prepare": "husky install"
}
```

This ensures husky is installed when team members run `npm install`.

---

## Configuration Files

### `.lintstagedrc.json` (or `.lintstagedrc.js`)

Create this file in your project root to define which files to lint:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

**Explanation**:
- Files matching `*.{js,jsx,ts,tsx}` will be:
  1. Fixed with ESLint
  2. Formatted with Prettier
- Files matching `*.{json,css,md}` will only be formatted with Prettier

### `.prettierrc` (or `.prettierrc.json`)

Create this file for Prettier configuration:

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

**Common Options**:
- `semi`: Add semicolons at the end of statements
- `singleQuote`: Use single quotes instead of double quotes
- `printWidth`: Line length before wrapping
- `trailingComma`: Add trailing commas where valid in ES5

---

## How It Works

1. **You stage files**: `git add .`
2. **You commit**: `git commit -m "your message"`
3. **Husky runs pre-commit hook**: Automatically executes your hook script
4. **Lint-staged runs**: Only on staged files
5. **ESLint runs**: Fixes issues and auto-corrects files
6. **Prettier runs**: Formats code
7. **If changes made**: Files are updated, you need to `git add` again and commit

---

## Troubleshooting

### Issue: "husky install" not working

**Solution**:
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npx husky install
```

### Issue: Pre-commit hook doesn't run

**Solution**: Check file permissions:
```bash
# On Mac/Linux
chmod +x .husky/pre-commit

# On Windows (Git Bash)
git add .husky/pre-commit
git config core.filemode true
```

### Issue: "command not found: npx"

**Solution**: Install npm globally or use:
```bash
# Using npm directly
npm run prepare
```

### Issue: Hook runs but doesn't fix files

**Solution**: Check that ESLint is installed:
```bash
npm install --save-dev eslint
```

And verify `.lintstagedrc.json` points to correct commands.

### Issue: Files modified after commit but hook didn't prevent push

**Solution**: Husky only prevents commits, not pushes. This is working correctly.

### Issue: Can't commit even after running fixes

**Solution**: 
1. Check if files have changes: `git status`
2. Stage fixed files: `git add .`
3. Try commit again: `git commit -m "message"`

---

## Complete package.json Example

Here's what your `package.json` should look like (relevant parts):

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint",
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,css,scss,md}": ["prettier --write"]
  },
  "devDependencies": {
    "eslint": "^9.33.0",
    "husky": "^9.1.7",
    "lint-staged": "^16.1.5",
    "prettier": "^3.6.2"
  }
}
```

---

## Testing Your Setup

To verify everything works:

1. **Make a test change**:
   ```bash
   echo "const x = 1" > test.js
   git add test.js
   git commit -m "test"
   ```

2. **Check if formatting was applied**:
   - The commit should complete
   - Open `test.js` - it should be formatted with semicolons if configured

3. **If it worked**: You'll see similar output:
   ```
   ✔ Preparing...
   ✔ Running tasks...
   ✔ Applying modifications...
   ✔ Cleaning up...
   ```

---

## File Checklist

Before committing your setup configuration, ensure you have:

✅ `package.json` - with dependencies and prepare script
✅ `.husky/pre-commit` - hook file
✅ `.lintstagedrc.json` - lint-staged config
✅ `.prettierrc` - prettier config
✅ `eslint.config.mjs` (or `.eslintrc.js`) - ESLint config (already in your project)

---

## For Team Members

When a team member clones your repo:

```bash
# Install dependencies (this will run "prepare" script)
npm install

# Or if prepare doesn't auto-run
npx husky install
```

Husky will automatically set up the git hooks. No additional setup needed!

---

## Advanced: Custom Hooks

To add additional hooks (e.g., commit-msg validation):

```bash
npx husky add .husky/commit-msg 'npm run validate-commit'
```

Then add script to `package.json`:
```json
"scripts": {
  "validate-commit": "your-validation-tool"
}
```

---

## References

- [Husky Documentation](https://typicode.github.io/husky/)
- [Lint-Staged Documentation](https://github.com/okonet/lint-staged)
- [Prettier Documentation](https://prettier.io/docs/)
- [ESLint Documentation](https://eslint.org/)
