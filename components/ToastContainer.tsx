import React, { useEffect, useCallback } from 'react';
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
	interpolate,
	Extrapolation,
	runOnJS,
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
	const { hideToast, globalConfig } = useToastStore();

	const config = { ...globalConfig, ...toast.config };
	const position = config.position || 'top';
	const entryAnimation = config.animationConfig?.entry || {
		duration: 300,
		damping: 15,
		stiffness: 150,
		type: 'spring',
	};
	const exitAnimation = config.animationConfig?.exit || {
		duration: 250,
		type: 'timing',
	};

	const translateY = useSharedValue(position === 'bottom' ? 100 : -100);
	const translateX = useSharedValue(0);
	const opacity = useSharedValue(0);
	const scale = useSharedValue(0.9);

	const getInitialPosition = useCallback(() => {
		switch (position) {
			case 'top':
				return insets.top + 10 + index * (TOAST_HEIGHT + 8);
			case 'bottom':
				return -(insets.bottom + 10 + index * (TOAST_HEIGHT + 8));
			case 'center':
				return index * (TOAST_HEIGHT + 8);
			default:
				return insets.top + 10 + index * (TOAST_HEIGHT + 8);
		}
	}, [position, insets.top, insets.bottom, index]);

	const hideToastWrapper = useCallback((id: string) => {
		hideToast(id);
	}, [hideToast]);

	useEffect(() => {
		const targetPosition = getInitialPosition();

		if (entryAnimation.type === 'spring') {
			translateY.value = withSpring(targetPosition, {
				damping: entryAnimation.damping || 15,
				stiffness: entryAnimation.stiffness || 150,
			});
			scale.value = withSpring(1, {
				damping: entryAnimation.damping || 15,
				stiffness: entryAnimation.stiffness || 150,
			});
		} else {
			translateY.value = withTiming(targetPosition, {
				duration: entryAnimation.duration || 300,
			});
			scale.value = withTiming(1, {
				duration: entryAnimation.duration || 300,
			});
		}

		opacity.value = withTiming(1, { duration: entryAnimation.duration || 300 });
	}, [index, insets.top, insets.bottom, position, entryAnimation, getInitialPosition]);

	const handleDismiss = useCallback(() => {
		const exitPosition = position === 'bottom' ? 100 : -100;
		const exitDuration = exitAnimation.duration || 250;

		const animationFinishedCallback = () => {
			'worklet';
			runOnJS(hideToastWrapper)(toast.id);
		};

		if (exitAnimation.type === 'spring') {
			translateY.value = withSpring(
				exitPosition,
				{
					damping: exitAnimation.damping || 15,
					stiffness: exitAnimation.stiffness || 150,
				},
				animationFinishedCallback
			);
			scale.value = withSpring(0.9, {
				damping: exitAnimation.damping || 15,
				stiffness: exitAnimation.stiffness || 150,
			});
		} else {
			translateY.value = withTiming(
				exitPosition,
				{
					duration: exitDuration,
				},
				animationFinishedCallback
			);
			scale.value = withTiming(0.9, {
				duration: exitDuration,
			});
		}

		opacity.value = withTiming(0, { duration: exitDuration });
	}, [position, exitAnimation, toast.id, hideToastWrapper]);

	const panGesture = Gesture.Pan()
		.enabled(config.swipeEnabled !== false)
		.onStart(() => {
			'worklet';
		})
		.onUpdate((event) => {
			'worklet';
			translateX.value = event.translationX;

			const progress = Math.abs(event.translationX) / (SCREEN_WIDTH * 0.4);
			opacity.value = interpolate(
				progress,
				[0, 1],
				[1, 0.3],
				Extrapolation.CLAMP
			);
		})
		.onEnd((event) => {
			'worklet';
			const shouldDismiss =
				Math.abs(event.translationX) > SCREEN_WIDTH * 0.3 ||
				Math.abs(event.velocityX) > 500;

			if (shouldDismiss) {
				const swipeExitDuration = exitAnimation.duration || 200;
				const swipeFinishedCallback = () => {
					'worklet';
					runOnJS(hideToastWrapper)(toast.id);
				};

				translateX.value = withTiming(
					event.translationX > 0 ? SCREEN_WIDTH : -SCREEN_WIDTH,
					{ duration: swipeExitDuration },
					swipeFinishedCallback
				);
				opacity.value = withTiming(0, { duration: swipeExitDuration });
			} else {
				translateX.value = withSpring(0);
				opacity.value = withSpring(1);
			}
		});

	const animatedStyle = useAnimatedStyle(() => {
		'worklet';
		return {
			transform: [
				{ translateY: translateY.value },
				{ translateX: translateX.value },
				{ scale: scale.value },
			],
			opacity: opacity.value,
		};
	}, []);

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
					config.customStyles?.container,
					animatedStyle,
				]}
			>
				<View style={[styles.toastContent, config.customStyles?.content]}>
					<View style={styles.iconContainer}>
						<Text
							style={[
								styles.icon,
								{ color: colors.iconColor },
								config.customStyles?.icon,
							]}
						>
							{getIcon()}
						</Text>
					</View>

					<View style={styles.textContainer}>
						{toast.title && (
							<Text
								style={[styles.title, config.customStyles?.title]}
								numberOfLines={1}
							>
								{toast.title}
							</Text>
						)}
						<Text
							style={[styles.message, config.customStyles?.message]}
							numberOfLines={2}
						>
							{toast.message}
						</Text>
					</View>

					<TouchableOpacity
						style={[styles.closeButton, config.customStyles?.closeButton]}
						onPress={handleDismiss}
						hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
					>
						<Text style={[styles.closeText, config.customStyles?.closeText]}>
							✕
						</Text>
					</TouchableOpacity>
				</View>

				{toast.action && (
					<TouchableOpacity
						style={[styles.actionButton, config.customStyles?.actionButton]}
						onPress={() => {
							toast.action?.onPress();
							handleDismiss();
						}}
					>
						<Text style={[styles.actionText, config.customStyles?.actionText]}>
							{toast.action.label}
						</Text>
					</TouchableOpacity>
				)}
			</Animated.View>
		</GestureDetector>
	);
}

const ToastContainer: React.FC = () => {
	const { toasts, globalConfig } = useToastStore();
	const position = globalConfig.position || 'top';

	if (toasts.length === 0) {
		return null;
	}

	const getContainerStyle = () => {
		switch (position) {
			case 'top':
				return { ...styles.container, top: 0 };
			case 'bottom':
				return { ...styles.container, bottom: 0, top: undefined };
			case 'center':
				return {
					...styles.container,
					top: '50%' as const,
					justifyContent: 'center' as const,
				};
			default:
				return { ...styles.container, top: 0 };
		}
	};

	return (
		<GestureHandlerRootView style={getContainerStyle()}>
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
		color: '#f3f3f3',
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
