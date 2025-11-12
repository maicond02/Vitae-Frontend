import { ThemedText } from '@/components/common/themed-text';
import { ThemedView } from '@/components/common/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function About() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
            <Ionicons name="briefcase" size={60} color="#fff" />
          </View>
          <Text style={styles.appName}>Vitae</Text>
          <Text style={styles.version}>Versão 1.0.0</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Sobre o Vitae
            </ThemedText>
            <Text style={[styles.description, { color: colors.text }]}>
              O Vitae é uma plataforma completa para criação e gerenciamento de currículos profissionais. 
              Com ferramentas modernas e intuitivas, ajudamos você a criar currículos impressionantes 
              e acompanhar suas aplicações de emprego.
            </Text>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Recursos
            </ThemedText>
            
            <View style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="create" size={24} color="#667eea" />
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Criação de Currículos
                </Text>
                <Text style={[styles.featureDescription, { color: colors.icon }]}>
                  Templates profissionais e personalizáveis
                </Text>
              </View>
            </View>

            <View style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="analytics" size={24} color="#764ba2" />
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Acompanhamento
                </Text>
                <Text style={[styles.featureDescription, { color: colors.icon }]}>
                  Gerencie suas aplicações em um só lugar
                </Text>
              </View>
            </View>

            <View style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="shield-checkmark" size={24} color="#10b981" />
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Segurança
                </Text>
                <Text style={[styles.featureDescription, { color: colors.icon }]}>
                  Seus dados protegidos com criptografia
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Contato
            </ThemedText>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => Linking.openURL('mailto:suporte@vitae.com')}
            >
              <Ionicons name="mail" size={24} color={colors.icon} />
              <Text style={[styles.contactText, { color: colors.text }]}>
                suporte@vitae.com
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => Linking.openURL('https://vitae.com')}
            >
              <Ionicons name="globe" size={24} color={colors.icon} />
              <Text style={[styles.contactText, { color: colors.text }]}>
                www.vitae.com
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.icon }]}>
              © 2025 Vitae. Todos os direitos reservados.
            </Text>
          </View>
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
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  version: {
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
    fontSize: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  featureCard: {
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
  featureText: {
    marginLeft: 16,
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  contactText: {
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerText: {
    fontSize: 14,
  },
});
