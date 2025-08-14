import React, { useEffect } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Platform,
} from 'react-native';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withTiming,
	runOnJS,
	interpolate,
	Extrapolation,
} from 'react-native-reanimated';
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useToastStore } from '../store/toastStore';
import type { Toast } from '../store/toastStore';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TOAST_HEIGHT = 80;
const TOAST_MARGIN = 16;

interface ToastItemProps {
	toast: Toast;
	index: number;
}

function ToastItem({ toast, index }: ToastItemProps) {
	const insets = useSafeAreaInsets();
	const { hideToast } = useToastStore();

	const translateY = useSharedValue(-100);
	const translateX = useSharedValue(0);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0.9);

	useEffect(() => {
		// Entry animation
		translateY.value = withSpring(
			insets.top + 10 + index * (TOAST_HEIGHT + 8),
			{
				damping: 15,
				stiffness: 150,
			}
		);
		opacity.value = withTiming(1, { duration: 300 });
		scale.value = withSpring(1, { damping: 15, stiffness: 150 });
	}, [index, insets.top]);

	const handleDismiss = () => {
		// Exit animation
		translateY.value = withTiming(-100, { duration: 250 });
		opacity.value = withTiming(0, { duration: 250 });
		scale.value = withTiming(0.9, { duration: 250 });

		setTimeout(() => {
			runOnJS(hideToast)(toast.id);
		}, 250);
	};

	// Swipe gesture handler
	const panGesture = Gesture.Pan()
		.onStart(() => {
			// Store initial position
		})
		.onUpdate((event) => {
			translateX.value = event.translationX;

			// Reduce opacity as user swipes
			const progress = Math.abs(event.translationX) / (SCREEN_WIDTH * 0.4);
			opacity.value = interpolate(
				progress,
				[0, 1],
				[1, 0.3],
				Extrapolation.CLAMP
			);
		})
		.onEnd((event) => {
			const shouldDismiss =
				Math.abs(event.translationX) > SCREEN_WIDTH * 0.3 ||
				Math.abs(event.velocityX) > 500;

			if (shouldDismiss) {
				// Swipe away animation
				translateX.value = withTiming(
					event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
					{ duration: 200 }
				);
				opacity.value = withTiming(0, { duration: 200 });

				setTimeout(() => {
					runOnJS(hideToast)(toast.id);
				}, 200);
			} else {
				// Spring back
				translateX.value = withSpring(0);
				opacity.value = withSpring(1);
			}
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateY: translateY.value },
				{ translateX: translateX.value },
				{ scale: scale.value },
			],
			opacity: opacity.value,
		};
	});

	const getToastColors = () => {
		switch (toast.type) {
			case 'success':
				return {
					backgroundColor: '#10B981',
					borderColor: '#059669',
					iconColor: '#FFFFFF',
				};
			case 'error':
				return {
					backgroundColor: '#EF4444',
					borderColor: '#DC2626',
					iconColor: '#FFFFFF',
				};
			case 'warning':
				return {
					backgroundColor: '#F59E0B',
					borderColor: '#D97706',
					iconColor: '#FFFFFF',
				};
			case 'info':
				return {
					backgroundColor: '#3B82F6',
					borderColor: '#2563EB',
					iconColor: '#FFFFFF',
				};
			default:
				return {
					backgroundColor: '#6B7280',
					borderColor: '#4B5563',
					iconColor: '#FFFFFF',
				};
		}
	};

	const colors = getToastColors();

	const getIcon = () => {
		switch (toast.type) {
			case 'success':
				return '✓';
			case 'error':
				return '✕';
			case 'warning':
				return '⚠';
			case 'info':
				return 'ⓘ';
			default:
				return 'ⓘ';
		}
	};

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View
				style={[
					styles.toastContainer,
					{
						backgroundColor: colors.backgroundColor,
						borderLeftColor: colors.borderColor,
					},
					animatedStyle,
				]}
			>
				<View style={styles.toastContent}>
					<View style={styles.iconContainer}>
						<Text style={[styles.icon, { color: colors.iconColor }]}>
							{getIcon()}
						</Text>
					</View>

					<View style={styles.textContainer}>
						{toast.title && (
							<Text style={styles.title} numberOfLines={1}>
								{toast.title}
							</Text>
						)}
						<Text style={styles.message} numberOfLines={2}>
							{toast.message}
						</Text>
					</View>

					<TouchableOpacity
						style={styles.closeButton}
						onPress={handleDismiss}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<Text style={styles.closeText}>✕</Text>
					</TouchableOpacity>
				</View>

				{toast.action && (
					<TouchableOpacity
						style={styles.actionButton}
						onPress={() => {
							toast.action?.onPress();
							handleDismiss();
						}}
					>
						<Text style={styles.actionText}>{toast.action.label}</Text>
					</TouchableOpacity>
				)}
			</Animated.View>
		</GestureDetector>
	);
}

const ToastContainer: React.FC = () => {
	const { toasts } = useToastStore();

	if (toasts.length === 0) {
		return null;
	}

	return (
		<GestureHandlerRootView style={styles.container}>
			{toasts.map((toast, index) => (
				<ToastItem key={toast.id} toast={toast} index={index} />
			))}
		</GestureHandlerRootView>
	);
};

export default ToastContainer;

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		zIndex: 9999,
		pointerEvents: 'box-none',
	},
	toastContainer: {
		position: 'absolute',
		left: TOAST_MARGIN,
		right: TOAST_MARGIN,
		minHeight: TOAST_HEIGHT,
		borderRadius: 12,
		borderLeftWidth: 4,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 8,
		...Platform.select({
			ios: {
				backgroundColor: 'rgba(255, 255, 255, 0.95)',
			},
			android: {
				backgroundColor: '#FFFFFF',
			},
		}),
	},
	toastContent: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 16,
		minHeight: TOAST_HEIGHT,
	},
	iconContainer: {
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	icon: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	textContainer: {
		flex: 1,
		marginRight: 8,
	},
	title: {
		fontSize: 16,
		fontWeight: '600',
		color: '#111827',
		marginBottom: 2,
	},
	message: {
		fontSize: 14,
		color: '#6B7280',
		lineHeight: 20,
	},
	closeButton: {
		width: 24,
		height: 24,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
	},
	closeText: {
		fontSize: 12,
		color: '#6B7280',
		fontWeight: 'bold',
	},
	actionButton: {
		marginTop: 8,
		marginHorizontal: 16,
		marginBottom: 16,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		borderRadius: 8,
		alignItems: 'center',
	},
	actionText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FFFFFF',
	},
});
