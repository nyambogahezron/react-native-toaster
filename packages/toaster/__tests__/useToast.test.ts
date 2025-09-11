import { describe, test, expect, beforeEach } from 'bun:test';
import {
	showSuccessToast,
	showErrorToast,
	showWarningToast,
	showInfoToast,
	useToastStore,
} from '../store/toastStore';

describe('Toast helper functions', () => {
	beforeEach(() => {
		// Clear all toasts before each test
		useToastStore.getState().clearAllToasts();
	});

	test('showSuccessToast should add a success toast', () => {
		showSuccessToast('Success message', 'Success title');

		const toasts = useToastStore.getState().toasts;
		expect(toasts).toHaveLength(1);
		expect(toasts[0].type).toBe('success');
		expect(toasts[0].message).toBe('Success message');
		expect(toasts[0].title).toBe('Success title');
	});

	test('showErrorToast should add an error toast', () => {
		showErrorToast('Error message', 'Error title');

		const toasts = useToastStore.getState().toasts;
		expect(toasts).toHaveLength(1);
		expect(toasts[0].type).toBe('error');
		expect(toasts[0].message).toBe('Error message');
		expect(toasts[0].title).toBe('Error title');
	});

	test('showWarningToast should add a warning toast', () => {
		showWarningToast('Warning message', 'Warning title');

		const toasts = useToastStore.getState().toasts;
		expect(toasts).toHaveLength(1);
		expect(toasts[0].type).toBe('warning');
		expect(toasts[0].message).toBe('Warning message');
		expect(toasts[0].title).toBe('Warning title');
	});

	test('showInfoToast should add an info toast', () => {
		showInfoToast('Info message', 'Info title');

		const toasts = useToastStore.getState().toasts;
		expect(toasts).toHaveLength(1);
		expect(toasts[0].type).toBe('info');
		expect(toasts[0].message).toBe('Info message');
		expect(toasts[0].title).toBe('Info title');
	});

	test('should handle toasts with custom configuration', () => {
		const customConfig = {
			position: 'bottom' as const,
			autoHide: false,
		};

		showSuccessToast('Custom toast', 'Custom', customConfig);

		const toasts = useToastStore.getState().toasts;
		expect(toasts).toHaveLength(1);
		expect(toasts[0].config).toEqual(customConfig);
	});
});
