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
		onPress: () => void;
	};
	config?: ToastConfig;
}

interface ToastState {
	toasts: Toast[];
	globalConfig: ToastConfig;
	showToast: (toast: Omit<Toast, 'id'>) => void;
	hideToast: (id: string) => void;
	clearAllToasts: () => void;
	setGlobalConfig: (config: Partial<ToastConfig>) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
	toasts: [],

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
		set((state) => ({
			toasts: state.toasts.filter((toast) => toast.id !== id),
		}));
	},

	clearAllToasts: () => {
		set({ toasts: [] });
	},

	setGlobalConfig: (config) => {
		set((state) => ({
			globalConfig: { ...state.globalConfig, ...config },
		}));
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
