# React Toaster

[![npm version](https://badge.fury.io/js/hn-react-native-toaster.svg)](https://badge.fury.io/js/hn-react-native-toaster)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.70%2B-blue.svg)](https://reactnative.dev/)

A beautiful, animated toast notification system for React Native with gesture support and smooth animations.

## Demo

<p align="center">
	<img src="./apps/docs/assets/preview.gif" alt="React Toaster Demo" width="300" height="700"/>
</p>

## Features

- 🎨 Beautiful animated toasts with smooth entry/exit animations
- 👆 Swipe to dismiss gestures
- 🎯 Multiple toast types (success, error, warning, info)
- ⚡ Easy to use hooks
- 🎭 Customizable appearance and actions
- 📱 Works with Expo and bare React Native
- 🔄 Auto-dismiss with configurable duration
- 🌍 TypeScript support
- 🎛️ **NEW:** Custom animation durations and types
- 📍 **NEW:** Configurable toast positions (top, bottom, center)
- 🎨 **NEW:** Custom styling support
- ⚙️ **NEW:** Global configuration options
- 🔧 **NEW:** Per-toast configuration overrides

## Installation

````bash
bun add hn-react-native-toaster
# or
npm install hn-react-native-toaster
# or
yarn add hn-react-native-toaster
```### Peer Dependencies

Make sure you have these dependencies installed:

```bash
bun add react-native-reanimated react-native-gesture-handler react-native-safe-area-context zustand
# or
npm install react-native-reanimated react-native-gesture-handler react-native-safe-area-context zustand
````

## Setup

### 1. Wrap your app with GestureHandlerRootView

```tsx
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			{/* Your app content */}
		</GestureHandlerRootView>
	);
}
```

### 2. Add ToastContainer to your app

```tsx
import { ToastContainer } from 'hn-react-native-toaster';

export default function App() {
	return (
		<View style={{ flex: 1 }}>
			{/* Your app content */}
			<ToastContainer />
		</View>
	);
}
```

## Basic Usage

```tsx
import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useToast, ToastContainer } from 'hn-react-native-toaster';

function MyComponent() {
	const toast = useToast();

	const showSuccess = () => {
		toast.success('Operation completed successfully!', 'Success');
	};

	const showError = () => {
		toast.error('Something went wrong', 'Error');
	};

	const showCustom = () => {
		toast.custom({
			type: 'info',
			message: 'Check out this new feature!',
			title: 'New Feature',
			action: {
				label: 'Learn More',
				onPress: () => console.log('Action pressed!'),
			},
		});
	};

	return (
		<View>
			<TouchableOpacity onPress={showSuccess}>
				<Text>Show Success Toast</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={showError}>
				<Text>Show Error Toast</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={showCustom}>
				<Text>Show Custom Toast</Text>
			</TouchableOpacity>

			<ToastContainer />
		</View>
	);
}
```

## API Reference

### useToast Hook

```tsx
const toast = useToast();

// Basic toast methods
toast.success(message, title?, duration?)
toast.error(message, title?, duration?)
toast.warning(message, title?, duration?)
toast.info(message, title?, duration?)

// Custom toast
toast.custom({
  type: 'success' | 'error' | 'warning' | 'info',
  message: string,
  title?: string,
  duration?: number,
  action?: {
    label: string,
    onPress: () => void,
  },
})

// Control methods
toast.hide(id)
toast.clear()
```

### useApiToast Hook

Specialized hook for API operations:

```tsx
const apiToast = useApiToast();

apiToast.handleApiSuccess('Data loaded successfully!');
apiToast.handleApiError(error);
apiToast.handleApiLoading('Loading...');
```

### useFormToast Hook

Specialized hook for form validation:

```tsx
const formToast = useFormToast();

formToast.validationError('Please enter a valid email');
formToast.saveSuccess('Form saved successfully!');
formToast.saveError('Failed to save form');
```

## Toast Types

- **success**: Green toast for successful operations
- **error**: Red toast for errors and failures
- **warning**: Orange toast for warnings
- **info**: Blue toast for informational messages

## Advanced Customization

### Global Configuration

Configure global settings that apply to all toasts:

```tsx
const toast = useToast();

// Configure global settings
toast.configure({
	position: 'bottom', // 'top' | 'bottom' | 'center'
	animationConfig: {
		entry: {
			duration: 500,
			type: 'spring', // 'spring' | 'timing'
			damping: 10,
			stiffness: 100,
		},
		exit: {
			duration: 300,
			type: 'timing',
		},
	},
	autoHide: true, // Auto-dismiss toasts
	swipeEnabled: true, // Enable swipe to dismiss
});
```

### Per-Toast Configuration

Override global settings for individual toasts:

```tsx
// Custom animation duration
toast.success('Slow animation!', 'Watch me!', {
	animationConfig: {
		entry: { duration: 800, type: 'spring' },
		exit: { duration: 600, type: 'timing' },
	},
});

// Custom position
toast.warning('I appear in the center!', 'Centered', {
	position: 'center',
});

// Disable swipe for specific toast
toast.error('Cannot swipe me!', 'Persistent', {
	swipeEnabled: false,
	autoHide: false,
});
```

### Custom Styling

Apply custom styles to any part of the toast:

```tsx
toast.success('Beautiful toast!', 'Custom Style', {
	customStyles: {
		container: {
			backgroundColor: '#6366F1',
			borderRadius: 20,
			borderLeftWidth: 0,
			shadowColor: '#6366F1',
			shadowOpacity: 0.5,
			shadowRadius: 15,
		},
		title: {
			color: '#FFFFFF',
			fontSize: 18,
			fontWeight: 'bold',
		},
		message: {
			color: '#E0E7FF',
			fontSize: 16,
		},
		icon: {
			fontSize: 20,
		},
		closeButton: {
			backgroundColor: 'rgba(255, 255, 255, 0.2)',
		},
		actionButton: {
			backgroundColor: '#4F46E5',
		},
	},
});
```

### Animation Types

Choose between different animation types:

```tsx
// Spring animation (bouncy, natural)
toast.info('Spring animation!', 'Bouncy', {
	animationConfig: {
		entry: {
			type: 'spring',
			damping: 15, // Higher = less bouncy
			stiffness: 150, // Higher = faster
			duration: 300,
		},
	},
});

// Timing animation (linear, precise)
toast.info('Timing animation!', 'Smooth', {
	animationConfig: {
		entry: {
			type: 'timing',
			duration: 400,
		},
	},
});
```

### Toast Positions

Control where toasts appear on screen:

```tsx
// Top position (default)
toast.success('I appear at the top!', '', { position: 'top' });

// Bottom position
toast.success('I appear at the bottom!', '', { position: 'bottom' });

// Center position
toast.success('I appear in the center!', '', { position: 'center' });
```

## Updated API Reference

### useToast Hook

```tsx
const toast = useToast();

// Basic toast methods with optional config
toast.success(message, title?, config?)
toast.error(message, title?, config?)
toast.warning(message, title?, config?)
toast.info(message, title?, config?)

// Custom toast
toast.custom({
  type: 'success' | 'error' | 'warning' | 'info',
  message: string,
  title?: string,
  duration?: number,
  action?: {
    label: string,
    onPress: () => void,
  },
  config?: ToastConfig, // New configuration options
})

// Control methods
toast.hide(id)
toast.clear()
toast.configure(globalConfig) // New: Set global configuration
```

### Configuration Types

```tsx
interface ToastConfig {
	position?: 'top' | 'bottom' | 'center';
	animationConfig?: {
		entry?: {
			duration?: number;
			type?: 'spring' | 'timing';
			damping?: number; // Spring only
			stiffness?: number; // Spring only
		};
		exit?: {
			duration?: number;
			type?: 'spring' | 'timing';
			damping?: number; // Spring only
			stiffness?: number; // Spring only
		};
	};
	customStyles?: {
		container?: ViewStyle;
		content?: ViewStyle;
		title?: TextStyle;
		message?: TextStyle;
		icon?: TextStyle;
		closeButton?: ViewStyle;
		closeText?: TextStyle;
		actionButton?: ViewStyle;
		actionText?: TextStyle;
	};
	autoHide?: boolean;
	swipeEnabled?: boolean;
}
```

## Toast Types

- **success**: Green toast for successful operations
- **error**: Red toast for errors and failures
- **warning**: Orange toast for warnings
- **info**: Blue toast for informational messages

## Legacy Customization

### Basic Toast Configuration

```tsx
toast.custom({
	type: 'success',
	message: 'Your custom message',
	title: 'Custom Title',
	duration: 5000, // 5 seconds (default: 4000)
	action: {
		label: 'Action Button',
		onPress: () => {
			// Custom action
		},
	},
});
```

### Store Access

For advanced use cases, you can access the store directly:

```tsx
import { useToastStore } from 'hn-react-native-toaster';

const { toasts, showToast, hideToast, clearAllToasts } = useToastStore();
```

## Example App

Check out the example app in the `/example` folder to see all features in action.

```bash
cd example
bun install
bun run start
```

## Local Development

To develop and test the package locally:

### Option 1: Using bun link (Recommended)

```bash
# In the main package directory
bun link

# In your test project
bun link hn-react-native-toaster
```

### Option 2: Using the example app

```bash
# Clone and setup
git clone <repository-url>
cd react-toaster

# Install dependencies
bun install

# Link the package and setup example
bun run link:local
bun run setup:example

# Start development
bun run example
```

### Testing Changes

After making changes to the package:

```bash
# Rebuild if needed
bun run build

# The linked package will automatically reflect changes
# Just reload your app to see updates
```

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to:

- Report bugs
- Suggest new features
- Submit pull requests
- Set up the development environment

Before contributing, please read our [Code of Conduct](CONTRIBUTING.md#code-of-conduct).

## Security

If you discover a security vulnerability, please follow our [Security Policy](SECURITY.md) for responsible disclosure.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a detailed list of changes and version history.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 🐛 **Bug Reports**: [Create an issue](https://github.com/nyambogahezron/react-toaster/issues)
- 💡 **Feature Requests**: [Start a discussion](https://github.com/nyambogahezron/react-toaster/discussions)
- ❓ **Questions**: Check existing [discussions](https://github.com/nyambogahezron/react-toaster/discussions) or create a new one

## Author

**nyambogahezron** - [GitHub](https://github.com/nyambogahezron)

---

Made with ❤️ for the React Native community
