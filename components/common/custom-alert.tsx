import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'error';
  buttons?: {
    text: string;
    onPress?: () => void;
    style?: 'default' | 'cancel' | 'destructive';
  }[];
  onClose: () => void;
}

export default function CustomAlert({
  visible,
  title,
  message,
  type = 'info',
  buttons = [{ text: 'OK', onPress: () => {} }],
  onClose,
}: CustomAlertProps) {
  const getIconAndColor = () => {
    switch (type) {
      case 'success':
        return { icon: 'checkmark-circle', colors: ['#10b981', '#059669'] as const };
      case 'error':
        return { icon: 'alert-circle', colors: ['#ef4444', '#dc2626'] as const };
      default:
        return { icon: 'information-circle', colors: ['#667eea', '#764ba2'] as const };
    }
  };

  const { icon, colors } = getIconAndColor();

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={colors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.iconGradient}
            >
              <Ionicons name={icon as any} size={48} color="#fff" />
            </LinearGradient>
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.buttonsContainer}>
            {buttons.map((button, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  button.style === 'cancel' && styles.buttonCancel,
                ]}
                onPress={() => {
                  button.onPress?.();
                  onClose();
                }}
              >
                {button.style === 'cancel' ? (
                  <View style={styles.buttonCancelInner}>
                    <Text style={styles.buttonCancelText}>{button.text}</Text>
                  </View>
                ) : (
                  <LinearGradient
                    colors={colors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>{button.text}</Text>
                  </LinearGradient>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 16,
  },
  iconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#b3b3b3',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonCancel: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 12,
  },
  buttonCancelInner: {
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancelText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
  },
});
