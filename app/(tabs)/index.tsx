import HomeContent from '@/components/home-content';
import LoginScreen from '@/components/login-screen';
import RegisterScreen from '@/components/register-screen';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/auth-context';
import { useState } from 'react';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (isAuthenticated) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <HomeContent />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      {showRegister ? (
        <RegisterScreen onBackToLogin={() => setShowRegister(false)} />
      ) : (
        <LoginScreen onNavigateToRegister={() => setShowRegister(true)} />
      )}
    </ThemedView>
  );
}
