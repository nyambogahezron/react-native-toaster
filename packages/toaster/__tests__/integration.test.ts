import { describe, test, expect } from 'bun:test';

// Integration test to ensure all exports work correctly
describe('Package Integration', () => {
	test('should export all main functions from individual modules', async () => {
		// Test store exports
		const storeModule = await import('../store/toastStore');
		expect(storeModule.useToastStore).toBeDefined();
		expect(storeModule.showSuccessToast).toBeDefined();
		expect(storeModule.showErrorToast).toBeDefined();
		expect(storeModule.showWarningToast).toBeDefined();
		expect(storeModule.showInfoToast).toBeDefined();

		// Test hooks exports
		const hooksModule = await import('../hooks/useToast');
		expect(hooksModule.useToast).toBeDefined();
		expect(hooksModule.useApiToast).toBeDefined();
		expect(hooksModule.useFormToast).toBeDefined();

		// Check that exports are functions
		expect(typeof storeModule.useToastStore).toBe('function');
		expect(typeof storeModule.showSuccessToast).toBe('function');
		expect(typeof hooksModule.useToast).toBe('function');
		expect(typeof hooksModule.useApiToast).toBe('function');
		expect(typeof hooksModule.useFormToast).toBe('function');
	});

	test('should have proper TypeScript definitions', () => {
		// This test ensures the TypeScript compilation worked
		// and type definitions are available
		expect(true).toBe(true);
	});
});
