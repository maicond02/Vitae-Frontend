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
            <Ionicons name="shield-checkmark" size={60} color="#fff" />
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
              O Vitae é uma plataforma de denúncia e proteção de direitos humanos desenvolvida para a cidade de Americana, SP. 
              Oferecemos um canal seguro e anônimo para reportar violações, com acesso rápido a serviços de emergência 
              e suporte especializado para vítimas de violência e discriminação.
            </Text>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Recursos
            </ThemedText>
            
            <View style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="document-text" size={24} color="#667eea" />
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Denúncia Anônima
                </Text>
                <Text style={[styles.featureDescription, { color: colors.icon }]}>
                  Reporte violações de forma segura e confidencial
                </Text>
              </View>
            </View>

            <View style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="alert-circle" size={24} color="#ef4444" />
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Botão do Pânico
                </Text>
                <Text style={[styles.featureDescription, { color: colors.icon }]}>
                  Acesso rápido a serviços de emergência
                </Text>
              </View>
            </View>

            <View style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="chatbubbles" size={24} color="#10b981" />
              <View style={styles.featureText}>
                <Text style={[styles.featureTitle, { color: colors.text }]}>
                  Suporte 24/7
                </Text>
                <Text style={[styles.featureDescription, { color: colors.icon }]}>
                  Chat com assistente virtual para orientação
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Contato e Emergência
            </ThemedText>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => Linking.openURL('tel:100')}
            >
              <Ionicons name="call" size={24} color="#10b981" />
              <Text style={[styles.contactText, { color: colors.text }]}>
                Disque 100 - Direitos Humanos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => Linking.openURL('tel:190')}
            >
              <Ionicons name="shield" size={24} color="#667eea" />
              <Text style={[styles.contactText, { color: colors.text }]}>
                190 - Polícia Militar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => Linking.openURL('mailto:contato@vitae-americana.sp.gov.br')}
            >
              <Ionicons name="mail" size={24} color={colors.icon} />
              <Text style={[styles.contactText, { color: colors.text }]}>
                contato@vitae-americana.sp.gov.br
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.icon }]}>
              © 2025 Vitae - Prefeitura de Americana, SP
            </Text>
            <Text style={[styles.footerText, { color: colors.icon }]}>
              Proteção e Defesa dos Direitos Humanos
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
