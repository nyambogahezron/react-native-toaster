import { create } from 'zustand';
import { ViewStyle, TextStyle } from 'react-native';

export type ToastPosition = 'top' | 'bottom' | 'center';

export interface AnimationConfig {
	duration?: number;
	damping?: number;
	stiffness?: number;
	type?: 'spring' | 'timing';
}

export interface ToastStyles {
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

export interface ToastConfig {
	position?: ToastPosition;
	animationConfig?: {
		entry?: AnimationConfig;
		exit?: AnimationConfig;
	};
	customStyles?: ToastStyles;
	autoHide?: boolean;
	swipeEnabled?: boolean;
}

export interface Toast {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	title?: string;
	message: string;
	duration?: number;
	action?: {
		label: string;
		onPress: () => void | Promise<void>;
	};
	config?: ToastConfig;
}

interface ToastState {
	toasts: Toast[];
	globalConfig: ToastConfig;
	actionHandlers: Map<string, () => void | Promise<void>>;
	showToast: (toast: Omit<Toast, 'id'>) => void;
	hideToast: (id: string) => void;
	clearAllToasts: () => void;
	setGlobalConfig: (config: Partial<ToastConfig>) => void;
	executeAction: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
	toasts: [],
	actionHandlers: new Map(),

	globalConfig: {
		position: 'top',
		animationConfig: {
			entry: {
				duration: 300,
				damping: 15,
				stiffness: 150,
				type: 'spring',
			},
			exit: {
				duration: 250,
				type: 'timing',
			},
		},
		autoHide: true,
		swipeEnabled: true,
	},

	showToast: (toast) => {
		const id = Math.random().toString(36).substr(2, 9);

		// Store the action handler separately to maintain a stable reference
		if (toast.action) {
			const handlers = get().actionHandlers;
			handlers.set(id, toast.action.onPress);
			set({ actionHandlers: new Map(handlers) });
		}

		const newToast: Toast = {
			id,
			duration: 4000,
			...toast,
		};

		set((state) => ({
			toasts: [...state.toasts, newToast],
		}));

		const finalConfig = { ...get().globalConfig, ...newToast.config };
		if (finalConfig.autoHide && newToast.duration && newToast.duration > 0) {
			setTimeout(() => {
				get().hideToast(id);
			}, newToast.duration);
		}
	},

	hideToast: (id) => {
		// Clean up the action handler when toast is hidden
		const handlers = get().actionHandlers;
		handlers.delete(id);
		set({ actionHandlers: new Map(handlers) });

		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		}));
	},

	clearAllToasts: () => {
		// Clear all action handlers
		set({ toasts: [], actionHandlers: new Map() });
	},

	setGlobalConfig: (config) => {
		set((state) => ({
			globalConfig: { ...state.globalConfig, ...config },
		}));
	},

	executeAction: (id) => {
		const handler = get().actionHandlers.get(id);
		if (handler) {
			try {
				const result = handler();
				// Handle async actions
				if (result instanceof Promise) {
					result.catch((error) => {
						console.error('Error executing toast action:', error);
					});
				}
			} catch (error) {
				console.error('Error executing toast action:', error);
			}
		}
	},
}));

export const showSuccessToast = (
	message: string,
	title?: string,
	config?: ToastConfig
) => {
	useToastStore.getState().showToast({
		type: 'success',
		message,
		title,
		config,
	});
};

export const showErrorToast = (
	message: string,
	title?: string,
	config?: ToastConfig
) => {
	useToastStore.getState().showToast({
		type: 'error',
		message,
		title,
		config,
	});
};

export const showWarningToast = (
	message: string,
	title?: string,
	config?: ToastConfig
) => {
	useToastStore.getState().showToast({
		type: 'warning',
		message,
		title,
		config,
	});
};

export const showInfoToast = (
	message: string,
	title?: string,
	config?: ToastConfig
) => {
	useToastStore.getState().showToast({
		type: 'info',
		message,
		title,
		config,
	});
};
