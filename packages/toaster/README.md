# hn-react-native-toaster

A beautiful, animated toast notification system for React Native with support for Expo and web platforms.

## Demo

<p align="center">
	<img src="./preview.gif" alt="React Toaster Demo" width="300" height="650"/>
</p>

## Features

- 🎨 **Beautiful Animations**: Smooth spring animations powered by React Native Reanimated
- 🎯 **TypeScript Support**: Fully typed for better development experience
- 🎪 **Multiple Toast Types**: Success, Error, Warning, and Info toasts
- 📱 **Cross-Platform**: Works on iOS, Android, and Web
- 🎛️ **Highly Customizable**: Custom styles, positions, and animations
- 👆 **Gesture Support**: Swipe to dismiss functionality
- 🎪 **Multiple Hooks**: Specialized hooks for different use cases
- 🎈 **Lightweight**: Minimal bundle size with Zustand for state management

## Installation

```bash
# Using npm
npm install hn-react-native-toaster


# Using yarn
yarn add hn-react-native-toaster


# Using bun
bun add hn-react-native-toaster

```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install react react-native react-native-reanimated react-native-gesture-handler react-native-safe-area-context zustand
```

For Expo projects, these are typically included by default.

## Quick Start

### 1. Setup ToastContainer

Add the `ToastContainer` at the root of your app:

```tsx
import React from 'react';
import { View } from 'react-native';
import { ToastContainer } from 'hn-react-native-toaster';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>
				{/* Your app content */}

				<ToastContainer />
			</View>
		</GestureHandlerRootView>
	);
}
```

### 2. Use the Toast Hook

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useToast } from 'hn-react-native-toaster';

function MyComponent() {
	const toast = useToast();

	const showSuccess = () => {
		toast.success('Operation completed successfully!', 'Success');
	};

	const showError = () => {
		toast.error('Something went wrong!', 'Error');
	};

	return (
		<View>
			<Button title='Show Success' onPress={showSuccess} />
			<Button title='Show Error' onPress={showError} />
		</View>
	);
}
```

## API Reference

### Hooks

#### `useToast()`

The main hook for displaying toasts.

```tsx
const toast = useToast();

// Basic usage
toast.success('Message', 'Title');
toast.error('Message', 'Title');
toast.warning('Message', 'Title');
toast.info('Message', 'Title');

// Hide specific toast
toast.hide('toast-id');

// Clear all toasts
toast.clear();

// Configure global settings
toast.configure({
	position: 'bottom',
	autoHide: false,
});
```

#### `useApiToast()`

Specialized hook for API-related toasts.

```tsx
const apiToast = useApiToast();

// Handle API responses
apiToast.handleApiSuccess('Data saved successfully');
apiToast.handleApiError(error);
apiToast.handleApiLoading('Saving data...');
```

#### `useFormToast()`

Specialized hook for form-related toasts.

```tsx
const formToast = useFormToast();

// Handle form events
formToast.validationError('Please fill all required fields');
formToast.saveSuccess('Form saved successfully');
formToast.saveError('Failed to save form');
```

### Components

#### `ToastContainer`

The main container component that renders all toasts.

```tsx
import { ToastContainer } from 'hn-react-native-toaster';

<ToastContainer />;
```

#### `ToastDemo`

A demo component showcasing all toast features.

```tsx
import { ToastDemo } from 'hn-react-native-toaster';

<ToastDemo />;
```

### Configuration Options

#### `ToastConfig`

```tsx
interface ToastConfig {
	position?: 'top' | 'bottom' | 'center';
	animationConfig?: {
		entry?: AnimationConfig;
		exit?: AnimationConfig;
	};
	customStyles?: ToastStyles;
	autoHide?: boolean;
	swipeEnabled?: boolean;
}
```

#### `AnimationConfig`

```tsx
interface AnimationConfig {
	duration?: number;
	damping?: number;
	stiffness?: number;
	type?: 'spring' | 'timing';
}
```

#### `ToastStyles`

```tsx
interface ToastStyles {
	container?: ViewStyle;
	content?: ViewStyle;
	title?: TextStyle;
	message?: TextStyle;
	icon?: TextStyle;
	closeButton?: ViewStyle;
	closeText?: TextStyle;
	actionButton?: ViewStyle;
	actionText?: TextStyle;
}
```

## Examples

### Custom Styled Toast

```tsx
toast.success('Custom styled toast!', 'Beautiful', {
	customStyles: {
		container: {
			backgroundColor: '#6366F1',
			borderRadius: 20,
			borderLeftWidth: 0,
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
	},
});
```

### Toast with Custom Animation

```tsx
toast.info('Slow animation toast', 'Watch me!', {
	animationConfig: {
		entry: {
			duration: 800,
			type: 'spring',
			damping: 8,
			stiffness: 80,
		},
		exit: {
			duration: 600,
			type: 'timing',
		},
	},
});
```

### Center Positioned Toast

```tsx
toast.warning('I appear in the center!', 'Centered', {
	position: 'center',
});
```

### Non-dismissible Toast

```tsx
toast.error('Critical error!', 'Important', {
	autoHide: false,
	swipeEnabled: false,
});
```

## Platform Support

- ✅ iOS
- ✅ Android
- ✅ Web (React Native Web)
- ✅ Expo

## Requirements

- React Native 0.70+
- React 17+
- React Native Reanimated 3+
- React Native Gesture Handler 2+
- React Native Safe Area Context 4+

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you like this package, please give it a ⭐ on GitHub!
