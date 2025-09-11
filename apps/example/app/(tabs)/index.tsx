import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ToastContainer, useToast } from '@nh/react-toaster';
import { router } from 'expo-router';

function ToastExample() {
  const toast = useToast();

  const showSuccessToast = () => {
    toast.success('Operation completed successfully!', 'Success');
  };

  const showErrorToast = () => {
    toast.error('Something went wrong. Please try again.', 'Error');
  };

  const showWarningToast = () => {
    toast.warning('Please check your internet connection.', 'Warning');
  };

  const showInfoToast = () => {
    toast.info('New features are available in this update.', 'Info');
  };

  const showCustomToast = () => {
    toast.custom({
      type: 'success',
      message: 'Task completed with custom action!',
      title: 'Custom Action',
      action: {
        label: 'View Details',
        onPress: () => {
          router.push('/(tabs)/explore')
        },
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>React Toaster Demo</Text>
        <Text style={styles.subtitle}>
          Beautiful animated toast notifications for React Native
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={showSuccessToast}
          >
            <Text style={styles.buttonText}>Show Success Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={showErrorToast}
          >
            <Text style={styles.buttonText}>Show Error Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={showWarningToast}
          >
            <Text style={styles.buttonText}>Show Warning Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={showInfoToast}
          >
            <Text style={styles.buttonText}>Show Info Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.customButton]}
            onPress={showCustomToast}
          >
            <Text style={styles.buttonText}>Show Custom Action Toast</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ToastContainer />
    </SafeAreaView>
  );
}

export default function Index() {
  return <ToastExample />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  successButton: {
    backgroundColor: '#10b981',
  },
  errorButton: {
    backgroundColor: '#ef4444',
  },
  warningButton: {
    backgroundColor: '#f59e0b',
  },
  infoButton: {
    backgroundColor: '#3b82f6',
  },
  customButton: {
    backgroundColor: '#8b5cf6',
  },
});
