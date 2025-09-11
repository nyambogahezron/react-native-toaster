import { describe, test, expect, beforeEach } from 'bun:test';
import { useToastStore } from '../store/toastStore';

describe('ToastStore', () => {
	beforeEach(() => {
		// Clear all toasts before each test
		useToastStore.getState().clearAllToasts();
	});

	test('should initialize with empty toasts array', () => {
		const state = useToastStore.getState();
		expect(state.toasts).toEqual([]);
	});

	test('should add a toast when showToast is called', () => {
		const { showToast } = useToastStore.getState();

		showToast({
			type: 'success',
			message: 'Test message',
			title: 'Test title',
		});

		const currentToasts = useToastStore.getState().toasts;
		expect(currentToasts).toHaveLength(1);
		expect(currentToasts[0].type).toBe('success');
		expect(currentToasts[0].message).toBe('Test message');
		expect(currentToasts[0].title).toBe('Test title');
		expect(currentToasts[0].id).toBeDefined();
	});

	test('should remove a toast when hideToast is called', () => {
		const { showToast, hideToast } = useToastStore.getState();

		showToast({
			type: 'error',
			message: 'Error message',
		});

		const toast = useToastStore.getState().toasts[0];
		expect(useToastStore.getState().toasts).toHaveLength(1);

		hideToast(toast.id);
		expect(useToastStore.getState().toasts).toHaveLength(0);
	});

	test('should clear all toasts when clearAllToasts is called', () => {
		const { showToast, clearAllToasts } = useToastStore.getState();

		// Add multiple toasts
		showToast({ type: 'success', message: 'Toast 1' });
		showToast({ type: 'error', message: 'Toast 2' });
		showToast({ type: 'warning', message: 'Toast 3' });

		expect(useToastStore.getState().toasts).toHaveLength(3);

		clearAllToasts();
		expect(useToastStore.getState().toasts).toHaveLength(0);
	});

	test('should update global configuration', () => {
		const { setGlobalConfig } = useToastStore.getState();

		const newConfig = {
			position: 'bottom' as const,
			autoHide: false,
		};

		setGlobalConfig(newConfig);

		const updatedState = useToastStore.getState();
		expect(updatedState.globalConfig.position).toBe('bottom');
		expect(updatedState.globalConfig.autoHide).toBe(false);
	});
	test('should set default duration when not provided', () => {
		const { showToast } = useToastStore.getState();

		showToast({
			type: 'info',
			message: 'Test message',
		});

		const toast = useToastStore.getState().toasts[0];
		expect(toast.duration).toBe(4000);
	});

	test('should respect custom duration when provided', () => {
		const { showToast } = useToastStore.getState();

		showToast({
			type: 'info',
			message: 'Test message',
			duration: 2000,
		});

		const toast = useToastStore.getState().toasts[0];
		expect(toast.duration).toBe(2000);
	});

	test('should generate unique IDs for different toasts', () => {
		const { showToast } = useToastStore.getState();

		showToast({ type: 'success', message: 'Toast 1' });
		showToast({ type: 'error', message: 'Toast 2' });

		const toasts = useToastStore.getState().toasts;
		expect(toasts[0].id).not.toBe(toasts[1].id);
	});
});
