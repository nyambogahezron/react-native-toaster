# Development Workflow

This monorepo uses [Turborepo](https://turbo.build/) to manage builds, tests, and development workflows across all packages and apps.

## Quick Start

### 1. Install Dependencies

```bash
bun install
```

### 2. Start Development with Live Preview

For the best development experience with live preview capabilities:

**Option A: Automatic Setup**

```bash
# Start both package watching and example app
bun run dev
```

**Option B: Manual Setup (Recommended for active development)**

Terminal 1 - Watch and rebuild package on changes:

```bash
bun run package:dev
```

Terminal 2 - Start example app:

```bash
bun run example
```

Now when you edit files in `packages/toaster/`, the package will automatically rebuild and the example app will hot-reload with your changes!

## Available Scripts

### Root Level Commands

| Command              | Description                                |
| -------------------- | ------------------------------------------ |
| `bun run build`      | Build all packages and apps                |
| `bun run dev`        | Start development servers for all packages |
| `bun run test`       | Run tests across all packages              |
| `bun run test:watch` | Run tests in watch mode                    |
| `bun run lint`       | Lint all packages                          |
| `bun run lint:fix`   | Fix linting issues                         |
| `bun run clean`      | Clean all build artifacts                  |

### Package-Specific Commands

| Command                 | Description                       |
| ----------------------- | --------------------------------- |
| `bun run package:dev`   | Watch and rebuild toaster package |
| `bun run package:build` | Build toaster package once        |
| `bun run package:test`  | Run toaster package tests         |

### Example App Commands

| Command                   | Description                   |
| ------------------------- | ----------------------------- |
| `bun run example`         | Start Expo development server |
| `bun run example:web`     | Start Expo for web            |
| `bun run example:android` | Start Expo for Android        |
| `bun run example:ios`     | Start Expo for iOS            |

## Development Workflow

### 1. Working on the Toaster Package

When developing the core toaster functionality:

1. Start package watching: `bun run package:dev`
2. Start example app: `bun run example`
3. Edit files in `packages/toaster/`
4. See changes live in the example app!

### 2. Testing Changes

```bash
# Run all tests
bun run test

# Run tests in watch mode while developing
bun run test:watch

# Run tests for specific package
bun run package:test
```

### 3. Building for Production

```bash
# Build everything
bun run build

# Build specific package
bun run package:build
```

### 4. Linting and Type Checking

```bash
# Lint all packages
bun run lint

# Fix linting issues
bun run lint:fix

# Type check all packages
bun run check-types
```

## Turbo Configuration

The monorepo is configured with Turborepo for optimal caching and parallel execution:

- **Build tasks** are cached and only run when source files change
- **Dev tasks** run in persistent mode for live reloading
- **Test tasks** are cached based on source and test file changes
- **Dependencies** are properly handled between packages

## Package Structure

```
packages/
  toaster/              # Core toaster package
    src/                # Source files
    dist/               # Built files (auto-generated)
    __tests__/          # Test files

apps/
  example/              # Example Expo app
    app/                # App screens and components
    components/         # Reusable components
```

## Tips for Effective Development

1. **Always start with `bun run package:dev`** when working on the core package
2. **Use `bun run test:watch`** for TDD workflow
3. **Run `bun run lint`** before committing changes
4. **Use `bun run clean`** if you encounter build issues
5. **Check `bun run build`** passes before submitting PRs
