import { useToastStore } from '../store/toastStore';
import type { Toast, ToastConfig } from '../store/toastStore';

export const useToast = () => {
	const { showToast, hideToast, clearAllToasts, setGlobalConfig } =
		useToastStore();

	return {
		success: (message: string, title?: string, config?: ToastConfig) => {
			showToast({
				type: 'success',
				message,
				title,
				config,
			});
		},

		error: (message: string, title?: string, config?: ToastConfig) => {
			showToast({
				type: 'error',
				message,
				title,
				config,
			});
		},

		warning: (message: string, title?: string, config?: ToastConfig) => {
			showToast({
				type: 'warning',
				message,
				title,
				config,
			});
		},

		info: (message: string, title?: string, config?: ToastConfig) => {
			showToast({
				type: 'info',
				message,
				title,
				config,
			});
		},

		custom: (toast: Omit<Toast, 'id'>) => {
			showToast(toast);
		},

		hide: hideToast,
		clear: clearAllToasts,
		configure: setGlobalConfig,
	};
};

export const useApiToast = () => {
	const toast = useToast();

	return {
		handleApiSuccess: (
			message: string = 'Operation completed successfully',
			config?: ToastConfig
		) => {
			toast.success(message, 'Success', config);
		},

		handleApiError: (error: any, config?: ToastConfig) => {
			const message =
				error?.message || error?.data?.message || 'An error occurred';
			toast.error(message, 'Error', config);
		},

		handleApiLoading: (
			message: string = 'Loading...',
			config?: ToastConfig
		) => {
			toast.info(message, 'Please wait', config);
		},
	};
};

export const useFormToast = () => {
	const toast = useToast();

	return {
		validationError: (message: string, config?: ToastConfig) => {
			toast.error(message, 'Validation Error', config);
		},

		saveSuccess: (
			message: string = 'Saved successfully',
			config?: ToastConfig
		) => {
			toast.success(message, 'Success', config);
		},

		saveError: (message: string = 'Failed to save', config?: ToastConfig) => {
			toast.error(message, 'Save Error', config);
		},
	};
};
