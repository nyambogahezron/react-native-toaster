# React Toaster 🍞

A beautiful, animated toast notification system for React Native with gesture support and smooth animations.

## Features

- 🎨 Beautiful animated toasts with smooth entry/exit animations
- 👆 Swipe to dismiss gestures
- 🎯 Multiple toast types (success, error, warning, info)
- ⚡ Easy to use hooks
- 🎭 Customizable appearance and actions
- 📱 Works with Expo and bare React Native
- 🔄 Auto-dismiss with configurable duration
- 🌍 TypeScript support

## Installation

````bash
bun add @nyambogahezron/react-toaster
# or
npm install @nyambogahezron/react-toaster
# or
yarn add @nyambogahezron/react-toaster
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
import { ToastContainer } from '@nyambogahezron/react-toaster';

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
import { useToast, ToastContainer } from '@nyambogahezron/react-toaster';

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

## Customization

### Toast Configuration

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
import { useToastStore } from '@nyambogahezron/react-toaster';

const { toasts, showToast, hideToast, clearAllToasts } = useToastStore();
```

## Example App

Check out the example app in the `/example` folder to see all features in action.

````bash
cd example
bun install
bun run start
```## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## License

MIT

## Author

**nyambogahezron** - [GitHub](https://github.com/nyambogahezron)nstall dependencies:

```bash
bun install
````

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
