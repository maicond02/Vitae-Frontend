import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Profile() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={50} color="#fff" />
            </View>
          </View>
          <Text style={styles.name}>{user?.name || 'Usuário'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Informações Pessoais
            </ThemedText>

            <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="mail" size={24} color={colors.icon} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Email</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{user?.email}</Text>
              </View>
            </View>

            <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="call" size={24} color={colors.icon} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Telefone</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>{user?.phone || 'Não informado'}</Text>
              </View>
            </View>

            <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="location" size={24} color={colors.icon} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Localização</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>Brasil</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Configurações
            </ThemedText>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="notifications" size={24} color={colors.icon} />
              <Text style={[styles.menuText, { color: colors.text }]}>Notificações</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="lock-closed" size={24} color={colors.icon} />
              <Text style={[styles.menuText, { color: colors.text }]}>Privacidade</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.menuItem, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="language" size={24} color={colors.icon} />
              <Text style={[styles.menuText, { color: colors.text }]}>Idioma</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Ionicons name="log-out" size={24} color="#ef4444" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 18,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  infoText: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 16,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ef4444',
    marginTop: 20,
    gap: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});
