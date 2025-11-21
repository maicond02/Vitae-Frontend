import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface ForgotPasswordScreenProps {
  onNavigateBack: () => void;
}

export default function ForgotPasswordScreen({ onNavigateBack }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleSendEmail = () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu email');
      return;
    }

    // Validação simples de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um email válido');
      return;
    }

    // Simular envio de email
    setEmailSent(true);
  };

  if (emailSent) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Success Message */}
            <View style={styles.successContainer}>
              <View style={styles.iconContainer}>
                <LinearGradient
                  colors={['#10b981', '#059669']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.successIcon}
                >
                  <Ionicons name="mail" size={60} color="#fff" />
                </LinearGradient>
              </View>

              <Text style={[styles.successTitle, { color: colors.text }]}>
                Email Enviado!
              </Text>
              <Text style={[styles.successText, { color: colors.icon }]}>
                Enviamos um link de recuperação para
              </Text>
              <Text style={[styles.emailText, { color: colors.tint }]}>
                {email}
              </Text>
              <Text style={[styles.successText, { color: colors.icon }]}>
                Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
              </Text>

              <View style={[styles.infoBox, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f8f9fa' }]}>
                <Ionicons name="information-circle" size={24} color={colors.tint} />
                <Text style={[styles.infoText, { color: colors.icon }]}>
                  Não recebeu o email? Verifique sua pasta de spam ou tente novamente em alguns minutos.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.backButton}
                onPress={onNavigateBack}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.backButtonGradient}
                >
                  <Text style={styles.backButtonText}>Voltar ao Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={() => setEmailSent(false)}
              >
                <Text style={[styles.resendText, { color: colors.tint }]}>
                  Reenviar Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backIcon}
              onPress={onNavigateBack}
            >
              <Ionicons name="arrow-back" size={28} color={colors.text} />
            </TouchableOpacity>

            <View style={styles.logoContainer}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.logo}
              >
                <Ionicons name="key" size={40} color="#fff" />
              </LinearGradient>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>
              Recuperar Senha
            </Text>
            <Text style={[styles.subtitle, { color: colors.icon }]}>
              Digite seu email e enviaremos um link para redefinir sua senha
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={[styles.inputWrapper, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f5f5f5' }]}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={colors.icon}
                  style={styles.inputIcon}
                />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Email"
                  placeholderTextColor={colors.icon}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoFocus
                />
              </View>
            </View>

            {/* Send Button */}
            <TouchableOpacity
              style={styles.sendButton}
              onPress={handleSendEmail}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.sendButtonGradient}
              >
                <Text style={styles.sendButtonText}>Enviar Link</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Back to Login */}
            <View style={styles.loginContainer}>
              <Text style={[styles.loginText, { color: colors.icon }]}>
                Lembrou a senha?{' '}
              </Text>
              <TouchableOpacity onPress={onNavigateBack}>
                <Text style={[styles.loginLink, { color: colors.tint }]}>
                  Fazer Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    minHeight: height,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  backIcon: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  sendButton: {
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sendButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 15,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 30,
  },
  successIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10b981',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  successTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  successText: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoBox: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginVertical: 32,
    gap: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  backButton: {
    width: '100%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  backButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  resendButton: {
    padding: 12,
  },
  resendText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
