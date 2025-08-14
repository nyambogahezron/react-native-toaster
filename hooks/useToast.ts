import { useToastStore } from '../store/toastStore';
import type { Toast } from '../store/toastStore';

export const useToast = () => {
	const { showToast, hideToast, clearAllToasts } = useToastStore();

	return {
		success: (message: string, title?: string) => {
			showToast({
				type: 'success',
				message,
				title,
			});
		},

		error: (message: string, title?: string) => {
			showToast({
				type: 'error',
				message,
				title,
			});
		},

		warning: (message: string, title?: string) => {
			showToast({
				type: 'warning',
				message,
				title,
			});
		},

		info: (message: string, title?: string) => {
			showToast({
				type: 'info',
				message,
				title,
			});
		},

		custom: (toast: Omit<Toast, 'id'>) => {
			showToast(toast);
		},

		hide: hideToast,
		clear: clearAllToasts,
	};
};

export const useApiToast = () => {
	const toast = useToast();

	return {
		handleApiSuccess: (
			message: string = 'Operation completed successfully'
		) => {
			toast.success(message, 'Success');
		},

		handleApiError: (error: any) => {
			const message =
				error?.message || error?.data?.message || 'An error occurred';
			toast.error(message, 'Error');
		},

		handleApiLoading: (message: string = 'Loading...') => {
			toast.info(message, 'Please wait');
		},
	};
};

export const useFormToast = () => {
	const toast = useToast();

	return {
		validationError: (message: string) => {
			toast.error(message, 'Validation Error');
		},

		saveSuccess: (message: string = 'Saved successfully') => {
			toast.success(message, 'Success');
		},

		saveError: (message: string = 'Failed to save') => {
			toast.error(message, 'Save Error');
		},
	};
};
