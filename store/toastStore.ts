import { create } from 'zustand';

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
}

interface ToastState {
	toasts: Toast[];
	showToast: (toast: Omit<Toast, 'id'>) => void;
	hideToast: (id: string) => void;
	clearAllToasts: () => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
	toasts: [],

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

		if (newToast.duration && newToast.duration > 0) {
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
}));

export const showSuccessToast = (message: string, title?: string) => {
	useToastStore.getState().showToast({
		type: 'success',
		message,
		title,
	});
};

export const showErrorToast = (message: string, title?: string) => {
	useToastStore.getState().showToast({
		type: 'error',
		message,
		title,
	});
};

export const showWarningToast = (message: string, title?: string) => {
	useToastStore.getState().showToast({
		type: 'warning',
		message,
		title,
	});
};

export const showInfoToast = (message: string, title?: string) => {
	useToastStore.getState().showToast({
		type: 'info',
		message,
		title,
	});
};
