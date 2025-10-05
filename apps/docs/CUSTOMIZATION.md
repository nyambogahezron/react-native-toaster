# Customization Examples

This document provides comprehensive examples of how to use the new customization features in React Toaster.

## Table of Contents

- [Global Configuration](#global-configuration)
- [Custom Animations](#custom-animations)
- [Toast Positions](#toast-positions)
- [Custom Styling](#custom-styling)
- [Advanced Examples](#advanced-examples)

## Global Configuration

### Setting Up Global Defaults

```tsx
import { useToast } from 'hn-react-native-toaster';

function App() {
	const toast = useToast();

	useEffect(() => {
		// Configure global settings once when app loads
		toast.configure({
			position: 'bottom',
			animationConfig: {
				entry: {
					duration: 400,
					type: 'spring',
					damping: 12,
					stiffness: 120,
				},
				exit: {
					duration: 250,
					type: 'timing',
				},
			},
			autoHide: true,
			swipeEnabled: true,
		});
	}, []);

	return <YourApp />;
}
```

## Custom Animations

### Spring Animations

```tsx
// Bouncy entrance
toast.success('Bouncy animation!', 'Spring', {
	animationConfig: {
		entry: {
			type: 'spring',
			damping: 8, // Lower = more bouncy
			stiffness: 80, // Lower = slower
			duration: 600,
		},
	},
});

// Quick and snappy
toast.info('Quick animation!', 'Snappy', {
	animationConfig: {
		entry: {
			type: 'spring',
			damping: 20, // Higher = less bouncy
			stiffness: 200, // Higher = faster
			duration: 200,
		},
	},
});
```

### Timing Animations

```tsx
// Slow and smooth
toast.warning('Slow animation', 'Smooth', {
	animationConfig: {
		entry: {
			type: 'timing',
			duration: 800,
		},
		exit: {
			type: 'timing',
			duration: 600,
		},
	},
});

// Quick entrance, slow exit
toast.error('Mixed timing', 'Different Speeds', {
	animationConfig: {
		entry: {
			type: 'timing',
			duration: 150,
		},
		exit: {
			type: 'timing',
			duration: 500,
		},
	},
});
```

## Toast Positions

### Top Position (Default)

```tsx
toast.success('I appear at the top!', 'Top Toast', {
	position: 'top',
});
```

### Bottom Position

```tsx
toast.success('I appear at the bottom!', 'Bottom Toast', {
	position: 'bottom',
});
```

### Center Position

```tsx
toast.warning('I appear in the center!', 'Center Toast', {
	position: 'center',
	customStyles: {
		container: {
			marginHorizontal: 40, // Add margins for center position
		},
	},
});
```

## Custom Styling

### Material Design Style

```tsx
toast.success('Material Design', 'Google Style', {
	customStyles: {
		container: {
			backgroundColor: '#4CAF50',
			borderRadius: 4,
			borderLeftWidth: 0,
			elevation: 6,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 3 },
			shadowOpacity: 0.16,
			shadowRadius: 6,
		},
		title: {
			color: '#FFFFFF',
			fontSize: 16,
			fontWeight: '500',
		},
		message: {
			color: '#E8F5E8',
			fontSize: 14,
		},
	},
});
```

### Glassmorphism Style

```tsx
toast.info('Glassmorphism', 'Modern UI', {
	customStyles: {
		container: {
			backgroundColor: 'rgba(255, 255, 255, 0.1)',
			borderRadius: 16,
			borderWidth: 1,
			borderColor: 'rgba(255, 255, 255, 0.2)',
			borderLeftWidth: 1,
			backdropFilter: 'blur(20px)', // Note: May not work on all platforms
		},
		title: {
			color: '#FFFFFF',
			fontSize: 16,
			fontWeight: '600',
		},
		message: {
			color: 'rgba(255, 255, 255, 0.8)',
			fontSize: 14,
		},
	},
});
```

### Dark Theme Style

```tsx
toast.error('Dark theme error', 'Error', {
	customStyles: {
		container: {
			backgroundColor: '#1F2937',
			borderLeftColor: '#EF4444',
			borderRadius: 12,
		},
		title: {
			color: '#F9FAFB',
			fontSize: 16,
			fontWeight: '600',
		},
		message: {
			color: '#D1D5DB',
			fontSize: 14,
		},
		closeButton: {
			backgroundColor: 'rgba(255, 255, 255, 0.1)',
		},
		closeText: {
			color: '#D1D5DB',
		},
	},
});
```

### Neon Style

```tsx
toast.success('Neon glow!', 'Cyberpunk', {
	customStyles: {
		container: {
			backgroundColor: '#000000',
			borderColor: '#00FF88',
			borderWidth: 2,
			borderLeftWidth: 2,
			borderRadius: 8,
			shadowColor: '#00FF88',
			shadowOpacity: 0.5,
			shadowRadius: 10,
			elevation: 10,
		},
		title: {
			color: '#00FF88',
			fontSize: 16,
			fontWeight: 'bold',
			textShadowColor: '#00FF88',
			textShadowRadius: 5,
		},
		message: {
			color: '#FFFFFF',
			fontSize: 14,
		},
		icon: {
			color: '#00FF88',
			fontSize: 18,
		},
	},
});
```

## Advanced Examples

### Loading Toast with Custom Animation

```tsx
const showLoadingToast = () => {
	toast.info('Processing your request...', 'Please wait', {
		duration: 0, // Don't auto-hide
		swipeEnabled: false, // Prevent dismissal
		customStyles: {
			container: {
				backgroundColor: '#3B82F6',
			},
		},
		animationConfig: {
			entry: {
				type: 'spring',
				damping: 15,
				stiffness: 150,
				duration: 300,
			},
		},
	});
};
```

### Notification-Style Toast

```tsx
toast.custom({
	type: 'info',
	title: 'New Message',
	message: 'You have received a new message from John',
	duration: 8000,
	config: {
		position: 'top',
		customStyles: {
			container: {
				backgroundColor: '#FFFFFF',
				borderColor: '#E5E7EB',
				borderWidth: 1,
				borderLeftColor: '#3B82F6',
				borderLeftWidth: 4,
				borderRadius: 8,
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.1,
				shadowRadius: 8,
				elevation: 4,
			},
			title: {
				color: '#111827',
				fontSize: 16,
				fontWeight: '600',
			},
			message: {
				color: '#6B7280',
				fontSize: 14,
			},
			icon: {
				color: '#3B82F6',
			},
		},
	},
	action: {
		label: 'View',
		onPress: () => {
			// Navigate to message
		},
	},
});
```

### Toast with Custom Position and Animation

```tsx
toast.warning('Custom positioned toast!', 'Special', {
	position: 'center',
	animationConfig: {
		entry: {
			type: 'spring',
			damping: 10,
			stiffness: 100,
			duration: 500,
		},
		exit: {
			type: 'spring',
			damping: 15,
			stiffness: 200,
			duration: 300,
		},
	},
	customStyles: {
		container: {
			marginHorizontal: 30,
			backgroundColor: '#F59E0B',
			transform: [{ scale: 1.05 }], // Slightly larger
		},
	},
});
```

### Non-Dismissible System Alert

```tsx
toast.error('System maintenance in progress', 'System Alert', {
	duration: 0, // Never auto-hide
	swipeEnabled: false, // Cannot be swiped away
	autoHide: false, // Ensure it stays
	position: 'top',
	customStyles: {
		container: {
			backgroundColor: '#DC2626',
			borderLeftWidth: 0,
			borderTopWidth: 4,
			borderTopColor: '#FBBF24',
		},
		closeButton: {
			display: 'none', // Hide close button
		},
	},
});
```

## Using with Specific Hooks

### API Toast with Custom Config

```tsx
const apiToast = useApiToast();

apiToast.handleApiSuccess('Data saved!', {
	position: 'bottom',
	animationConfig: {
		entry: { type: 'spring', damping: 12 },
	},
});

apiToast.handleApiError(error, {
	duration: 0, // Keep error visible until manually dismissed
	swipeEnabled: false,
});
```

### Form Toast with Custom Styling

```tsx
const formToast = useFormToast();

formToast.validationError('Please check your input', {
	customStyles: {
		container: {
			borderColor: '#EF4444',
			borderWidth: 2,
			backgroundColor: '#FEF2F2',
		},
		title: {
			color: '#DC2626',
		},
		message: {
			color: '#991B1B',
		},
	},
});
```
