import React, { useState } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	TextInput,
	ScrollView,
} from 'react-native';
import { useToast, useApiToast, useFormToast } from '../hooks/useToast';

const ToastDemo: React.FC = () => {
	const toast = useToast();
	const apiToast = useApiToast();
	const formToast = useFormToast();
	const [customMessage, setCustomMessage] = useState('');

	const showAsyncExample = async () => {
		toast.info('Starting async operation...', 'Loading');

		try {
			// Simulate API call
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					if (Math.random() > 0.5) {
						resolve('Success!');
					} else {
						reject(new Error('Network error occurred'));
					}
				}, 2000);
			});

			apiToast.handleApiSuccess('Data loaded successfully!');
		} catch (error) {
			apiToast.handleApiError(error);
		}
	};

	const showFormValidationExample = () => {
		if (!customMessage.trim()) {
			formToast.validationError('Please enter a message');
			return;
		}

		formToast.saveSuccess('Message saved successfully!');
		setCustomMessage('');
	};

	const showCustomActionToast = () => {
		toast.custom({
			type: 'warning',
			title: 'Unsaved Changes',
			message: 'You have unsaved changes. Do you want to save them?',
			duration: 0, // Don't auto-dismiss
			action: {
				label: 'Save Now',
				onPress: () => {
					toast.success('Changes saved!');
				},
			},
		});
	};

	const showStackedToasts = () => {
		toast.success('First notification');
		setTimeout(() => toast.warning('Second notification'), 300);
		setTimeout(() => toast.error('Third notification'), 600);
		setTimeout(() => toast.info('Fourth notification'), 900);
	};

	const showLongMessage = () => {
		toast.info(
			'This is a very long message that should wrap to multiple lines and test how the toast handles longer content gracefully.',
			'Long Message Test'
		);
	};

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Advanced Toast Examples</Text>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Basic Toasts</Text>
				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={[styles.button, styles.successButton]}
						onPress={() => toast.success('Operation completed!', 'Success')}
					>
						<Text style={styles.buttonText}>Success</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.errorButton]}
						onPress={() => toast.error('Something went wrong!', 'Error')}
					>
						<Text style={styles.buttonText}>Error</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={[styles.button, styles.warningButton]}
						onPress={() => toast.warning('Please check your input', 'Warning')}
					>
						<Text style={styles.buttonText}>Warning</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.button, styles.infoButton]}
						onPress={() => toast.info('New feature available!', 'Info')}
					>
						<Text style={styles.buttonText}>Info</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Advanced Features</Text>

				<TouchableOpacity
					style={[styles.button, styles.primaryButton]}
					onPress={showAsyncExample}
				>
					<Text style={styles.buttonText}>Async Operation Example</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.primaryButton]}
					onPress={showCustomActionToast}
				>
					<Text style={styles.buttonText}>Toast with Action Button</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.primaryButton]}
					onPress={showStackedToasts}
				>
					<Text style={styles.buttonText}>Show Multiple Toasts</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.primaryButton]}
					onPress={showLongMessage}
				>
					<Text style={styles.buttonText}>Long Message Test</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Form Integration</Text>

				<TextInput
					style={styles.input}
					placeholder='Enter a custom message...'
					placeholderTextColor='#999'
					value={customMessage}
					onChangeText={setCustomMessage}
				/>

				<TouchableOpacity
					style={[styles.button, styles.successButton]}
					onPress={showFormValidationExample}
				>
					<Text style={styles.buttonText}>Validate & Save</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Controls</Text>

				<TouchableOpacity
					style={[styles.button, styles.dangerButton]}
					onPress={toast.clear}
				>
					<Text style={styles.buttonText}>Clear All Toasts</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1a1b23',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center',
		marginBottom: 30,
	},
	section: {
		marginBottom: 30,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#fff',
		marginBottom: 15,
	},
	buttonRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	button: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 8,
		marginHorizontal: 4,
		alignItems: 'center',
	},
	successButton: {
		backgroundColor: '#10B981',
	},
	errorButton: {
		backgroundColor: '#EF4444',
	},
	warningButton: {
		backgroundColor: '#F59E0B',
	},
	infoButton: {
		backgroundColor: '#3B82F6',
	},
	primaryButton: {
		backgroundColor: '#6366F1',
		marginBottom: 10,
	},
	dangerButton: {
		backgroundColor: '#DC2626',
	},
	buttonText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: '600',
	},
	input: {
		backgroundColor: '#2a2b33',
		borderRadius: 8,
		padding: 12,
		marginBottom: 15,
		color: '#fff',
		fontSize: 16,
	},
});

export default ToastDemo;
