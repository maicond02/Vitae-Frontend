import ForgotPasswordScreen from '@/components/auth/forgot-password-screen';
import LoginScreen from '@/components/auth/login-screen';
import RegisterScreen from '@/components/auth/register-screen';
import { ThemedView } from '@/components/common/themed-view';
import HomeContent from '@/components/screens/home-content';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if (isAuthenticated) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <HomeContent />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      {showForgotPassword ? (
        <ForgotPasswordScreen onNavigateBack={() => setShowForgotPassword(false)} />
      ) : showRegister ? (
        <RegisterScreen onBackToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginScreen 
          onNavigateToRegister={() => setShowRegister(true)}
          onNavigateToForgotPassword={() => setShowForgotPassword(true)}
        />
      )}
    </ThemedView>
  );
}
