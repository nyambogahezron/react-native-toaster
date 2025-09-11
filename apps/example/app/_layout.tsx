import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useToast } from '@nh/react-toaster';
import { useEffect } from 'react';

export const unstable_settings = {
	anchor: '(tabs)',
};

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const toast = useToast();
	useEffect(() => {
		toast.configure({
			position: 'top',
			animationConfig: {
				entry: {
					duration: 500,
					type: 'timing',
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
				message: { fontSize: 14, color: '#fff', marginTop: 4, },
				container: {
					paddingHorizontal: 0,
					paddingVertical: 0,
					borderRadius: 8,
					marginTop: 10,
					marginHorizontal: 1,
				},
			},
		});
	}, []);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<Stack>
					<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
					<Stack.Screen
						name='modal'
						options={{ presentation: 'modal', title: 'Modal' }}
					/>
				</Stack>
				<StatusBar style='auto' />
			</ThemeProvider>
		</GestureHandlerRootView>
	);
}
