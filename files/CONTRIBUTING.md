# Contributing to React Toaster

Thank you for your interest in contributing to React Toaster! We welcome contributions from the community and appreciate your help in making this project better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct. Please be respectful and constructive in all interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Set up the development environment
4. Make your changes
5. Test your changes
6. Submit a pull request

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- Bun (recommended) or npm/yarn
- React Native development environment
- iOS Simulator or Android Emulator (for testing)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/react-toaster.git
cd react-toaster

# Install dependencies
bun install

# Set up the example app
cd example
bun install
cd ..

# Link the local package to the example
bun run link:local
bun run setup:example
```

### Running the Example

```bash
# Start the example app
bun run example

# In another terminal, run the Metro bundler
cd example
bun run start
```

## How to Contribute

### Types of Contributions

We welcome the following types of contributions:

- **Bug fixes**: Fix issues in the codebase
- **Features**: Add new functionality
- **Documentation**: Improve or add documentation
- **Examples**: Create new examples or improve existing ones
- **Performance**: Optimize existing code
- **Tests**: Add or improve test coverage

### Finding Issues to Work On

- Check the [Issues](https://github.com/nyambogahezron/react-toaster/issues) page
- Look for issues labeled `good first issue` for beginners
- Look for issues labeled `help wanted` for general contributions
- Feel free to propose new features by creating an issue first

## Pull Request Process

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**

   - Follow the coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**

   ```bash
   bun run test
   bun run lint
   bun run build
   ```

4. **Commit Your Changes**

   ```bash
   git add .
   git commit -m "feat: add new toast animation type"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots or GIFs for UI changes

### Pull Request Guidelines

- **Title**: Use a clear, descriptive title
- **Description**: Explain what changes you made and why
- **Testing**: Describe how you tested your changes
- **Breaking Changes**: Clearly mark any breaking changes
- **Documentation**: Update relevant documentation

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Examples:

```
feat(toast): add custom animation duration support
fix(gesture): resolve swipe gesture conflict with scroll
docs(readme): update installation instructions
```

## Coding Standards

### TypeScript

- Use TypeScript for all code
- Provide proper type definitions
- Avoid `any` types when possible
- Export types that consumers might need

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add trailing commas in multiline structures
- Follow the existing code style
- Use meaningful variable and function names

### React Native Best Practices

- Use functional components with hooks
- Optimize performance with useMemo/useCallback when appropriate
- Follow React Native performance guidelines
- Ensure cross-platform compatibility (iOS and Android)

### File Structure

```
/
├── components/          # React components
├── hooks/              # Custom hooks
├── store/              # State management (Zustand)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── example/            # Example app
└── docs/               # Documentation
```

## Testing

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test --watch

# Run tests with coverage
bun run test --coverage
```

### Writing Tests

- Write unit tests for utility functions
- Write integration tests for components
- Test both iOS and Android platforms
- Include edge cases and error scenarios
- Use descriptive test names

### Test Structure

```typescript
describe('useToast hook', () => {
	it('should show toast with correct message', () => {
		// Test implementation
	});

	it('should dismiss toast after specified duration', () => {
		// Test implementation
	});
});
```

## Documentation

### Types of Documentation

- **API Documentation**: Document all public APIs
- **Examples**: Provide practical usage examples
- **Guides**: Create step-by-step tutorials
- **Migration Guides**: Help users upgrade between versions

### Documentation Guidelines

- Use clear, concise language
- Provide code examples
- Include screenshots or GIFs for visual features
- Keep documentation up to date with code changes

## Community

### Getting Help

- Create an issue on GitHub for bugs or feature requests
- Start a discussion for questions or ideas
- Check existing issues and discussions first

### Staying Updated

- Watch the repository for notifications
- Follow the maintainer on GitHub
- Join discussions in issues and pull requests

## Recognition

Contributors will be recognized in the following ways:

- Listed in the contributors section of the README
- Mentioned in release notes for significant contributions
- Given credit in the changelog

## Questions?

If you have any questions about contributing, please:

1. Check this contributing guide
2. Look through existing issues and discussions
3. Create a new issue with the `question` label

Thank you for contributing to React Toaster! 🍞✨
