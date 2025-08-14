# Animated Toast Notification System

A comprehensive, well-animated toast notification system built with React Native Reanimated for your events app.

## Features

✨ **Beautiful Animations**

- Smooth entry/exit animations with spring physics
- Swipe-to-dismiss gesture support
- Stacking support for multiple toasts
- Opacity and scale transitions

🎨 **Multiple Toast Types**

- Success (green)
- Error (red)
- Warning (orange)
- Info (blue)

🔧 **Advanced Functionality**

- Auto-dismiss with customizable duration
- Action buttons on toasts
- Swipe gestures for manual dismissal
- Safe area support
- TypeScript support

📱 **React Native Reanimated Integration**

- Smooth 60fps animations
- Gesture handling with PanGestureHandler
- Shared values for optimal performance

## Setup

The toast system is already integrated into your app through the main layout (`app/_layout.tsx`). The `ToastContainer` component is rendered at the root level to ensure toasts appear above all other content.

## Basic Usage

### Using Helper Functions (Recommended)

```typescript
import {
	showSuccessToast,
	showErrorToast,
	showWarningToast,
	showInfoToast,
} from '@/store';

// Simple success toast
showSuccessToast('Operation completed successfully!');

// Error toast with title
showErrorToast('Something went wrong', 'Error');

// Warning toast
showWarningToast('Please check your input');

// Info toast
showInfoToast('New features are available!');
```

### Using the Custom Hook

```typescript
import { useToast } from '@/hooks/useToast';

const MyComponent = () => {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Data saved successfully!', 'Success');
  };

  const handleError = () => {
    toast.error('Failed to save data', 'Error');
  };

  return (
    // Your component JSX
  );
};
```

## Advanced Usage

### Custom Toast with Action Button

```typescript
import { useToast } from '@/hooks/useToast';

const MyComponent = () => {
	const toast = useToast();

	const showUnsavedChanges = () => {
		toast.custom({
			type: 'warning',
			title: 'Unsaved Changes',
			message: 'You have unsaved changes. Do you want to save them?',
			duration: 0, // Don't auto-dismiss
			action: {
				label: 'Save Now',
				onPress: () => {
					// Handle save action
					toast.success('Changes saved!');
				},
			},
		});
	};
};
```

### API Integration Helper

```typescript
import { useApiToast } from '@/hooks/useToast';

const MyComponent = () => {
	const apiToast = useApiToast();

	const fetchData = async () => {
		try {
			const response = await fetch('/api/data');
			if (!response.ok) throw new Error('Failed to fetch');

			const data = await response.json();
			apiToast.handleApiSuccess('Data loaded successfully!');
			return data;
		} catch (error) {
			apiToast.handleApiError(error);
		}
	};
};
```

### Form Validation Helper

```typescript
import { useFormToast } from '@/hooks/useToast';

const MyForm = () => {
	const formToast = useFormToast();

	const validateAndSave = (formData) => {
		if (!formData.email) {
			formToast.validationError('Email is required');
			return;
		}

		if (!formData.email.includes('@')) {
			formToast.validationError('Please enter a valid email');
			return;
		}

		// Save logic here
		formToast.saveSuccess('Form saved successfully!');
	};
};
```

## Toast Store API

### State

```typescript
interface ToastState {
	toasts: Toast[];
}
```

### Actions

```typescript
// Show a custom toast
showToast(toast: Omit<Toast, 'id'>): void

// Hide a specific toast
hideToast(id: string): void

// Clear all toasts
clearAllToasts(): void
```

## Toast Interface

```typescript
interface Toast {
	id: string; // Auto-generated unique ID
	type: 'success' | 'error' | 'warning' | 'info';
	title?: string; // Optional title
	message: string; // Main message text
	duration?: number; // Auto-dismiss duration (default: 4000ms, 0 = no auto-dismiss)
	action?: {
		// Optional action button
		label: string;
		onPress: () => void;
	};
}
```

## Customization

### Colors and Styling

Toast colors are defined in the `getToastColors()` function within `ToastContainer.tsx`. You can modify these to match your app's theme:

```typescript
const getToastColors = () => {
	switch (toast.type) {
		case 'success':
			return {
				backgroundColor: '#10B981', // Your custom green
				borderColor: '#059669',
				iconColor: '#FFFFFF',
			};
		// ... other types
	}
};
```

### Animation Configuration

Animations can be customized by modifying the spring and timing configurations:

```typescript
// Entry animation
translateY.value = withSpring(targetPosition, {
	damping: 15, // Bounce damping
	stiffness: 150, // Spring stiffness
});

// Exit animation
opacity.value = withTiming(0, {
	duration: 250, // Animation duration
});
```

### Gesture Configuration

Swipe sensitivity can be adjusted:

```typescript
// In gestureHandler onEnd
const shouldDismiss =
	Math.abs(event.translationX) > SCREEN_WIDTH * 0.3 || // Distance threshold (30% of screen)
	Math.abs(event.velocityX) > 500; // Velocity threshold
```

## Error Handling Integration

The toast system is integrated with your store error handling:

```typescript
// In store/index.ts
export const handleStoreError = (error: any, storeName: string) => {
	console.error(`Error in ${storeName}:`, error);

	const message =
		error?.response?.data?.message ||
		error?.message ||
		'An unexpected error occurred';

	showErrorToast(message, `${storeName} Error`);
};
```

## Best Practices

1. **Use appropriate toast types**: Match the toast type to the content (success for positive actions, error for failures, etc.)

2. **Keep messages concise**: Aim for 1-2 lines of text for better readability

3. **Use titles sparingly**: Only add titles when they provide additional context

4. **Consider auto-dismiss duration**:

   - Quick confirmations: 2-3 seconds
   - Important messages: 4-5 seconds
   - Critical actions: No auto-dismiss (duration: 0)

5. **Action buttons for important actions**: Use action buttons for critical operations that might need immediate user response

6. **Avoid toast spam**: Don't show multiple toasts for the same action in quick succession

## Animation Performance

The toast system uses React Native Reanimated for optimal performance:

- All animations run on the UI thread
- Shared values minimize bridge communication
- Gesture handling is optimized for 60fps
- Memory-efficient toast stacking

## Accessibility

The toast system includes basic accessibility features:

- Proper color contrast for text
- Touch targets meet minimum size requirements
- Screen reader compatible text content

## Troubleshooting

### Toasts not appearing

- Ensure `ToastContainer` is rendered in your root layout
- Check if `GestureHandlerRootView` is properly set up
- Verify react-native-reanimated is properly configured

### Gesture conflicts

- The toast uses PanGestureHandler which might conflict with other gestures
- Consider gesture priority or simultaneousHandlers if needed

### Performance issues

- Limit the number of simultaneous toasts (current implementation handles stacking well)
- Avoid showing toasts in rapid succession

## Dependencies

- `react-native-reanimated`: ^3.17.4
- `react-native-gesture-handler`: ~2.24.0
- `react-native-safe-area-context`: 5.4.0
- `zustand`: (for state management)

## Demo Component

A comprehensive demo component is available at `components/ToastDemo.tsx` that showcases all features and use cases.
