# Quick Setup Checklist - Husky & Prettier

Use this checklist to quickly set up Husky, Lint-Staged, and Prettier in any project.

## Quick Commands (Copy & Paste)

```bash
# 1. Install dependencies
npm install --save-dev husky lint-staged prettier eslint

# 2. Initialize husky
npx husky install

# 3. Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"

# 4. Done! Test it
git add .
git commit -m "test"
```

## Manual Setup (If commands don't work)

### Step 1: Add to package.json
```json
{
  "scripts": {
    "prepare": "husky install"
  },
  "devDependencies": {
    "husky": "^9.1.7",
    "lint-staged": "^16.1.5",
    "prettier": "^3.6.2",
    "eslint": "^9.33.0"
  }
}
```

### Step 2: Create `.husky/pre-commit`
```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx lint-staged
```

### Step 3: Create `.lintstagedrc.json`
```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

### Step 4: Create `.prettierrc`
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "trailingComma": "es5"
}
```

### Step 5: Install hooks manually
```bash
npm install
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `command not found: husky` | Run `npm install` first |
| Pre-commit hook doesn't execute | Check file has execute permissions: `chmod +x .husky/pre-commit` |
| `npm ERR! prepare script failed` | Delete `node_modules/.husky`, run `npm install` again |
| Files not being formatted | Verify `eslint` is installed and configured |
| Husky not installing | Try: `npm install && npm run prepare` |

---

## Files to Copy from Working Project

If you have a working project, copy these 4 files:

1. `.husky/pre-commit`
2. `.lintstagedrc.json`
3. `.prettierrc`
4. `package.json` (check the scripts & devDependencies sections)

Then run `npm install` in the new project.

---

## Windows-Specific Issues

If you're on Windows and git hooks aren't running:

```bash
# Set git to track file mode
git config core.filemode true

# Run husky install again
npx husky install
```

If using VS Code Terminal, switch to **PowerShell** or **Git Bash** instead of CMD.

---

## Verify Installation

After setup, test with:
```bash
# Make a change
echo "const x=1" > test.js

# Try to commit
git add test.js
git commit -m "test"

# If you see ✓ checks pass, setup is successful!
```

---

## For Existing Projects

If you already have eslint configured, just add:
```bash
npm install --save-dev husky lint-staged prettier
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Then create `.lintstagedrc.json` and `.prettierrc`

---

Last Updated: 2026-03-05
