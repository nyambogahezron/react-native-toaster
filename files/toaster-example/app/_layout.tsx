import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useToast } from '@nh/react-toaster';

export default function RootLayout() {
	const toast = useToast();
	useEffect(() => {
		toast.configure({
			position: 'top',
			animationConfig: {
				entry: {
					duration: 400,
					type: 'spring',
					damping: 12,
					stiffness: 120,
				},
				exit: {
					duration: 250,
					type: 'timing',
				},
			},
			autoHide: true,
			swipeEnabled: true,
			customStyles: {
				title: { fontSize: 16, fontWeight: '600', color: '#fff' },
				message: { fontSize: 14, color: '#fff', marginTop: 4 },
				container: {
					paddingHorizontal: 16,
					paddingVertical: 12,
					borderRadius: 8,
					marginTop: 50,
					marginHorizontal: 16,
				},
			},
		});
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<StatusBar style='auto' />
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</GestureHandlerRootView>
	);
}
