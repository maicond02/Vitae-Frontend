import { ThemedText } from '@/components/common/themed-text';
import { ThemedView } from '@/components/common/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PanicButton() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <LinearGradient
            colors={['#ef4444', '#dc2626']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.panicCard}
          >
            <Ionicons name="warning" size={80} color="#fff" />
            <Text style={styles.panicTitle}>Botão do Pânico</Text>
            <Text style={styles.panicSubtitle}>
              Em caso de emergência, pressione o botão abaixo
            </Text>
          </LinearGradient>

          <TouchableOpacity style={styles.emergencyButton}>
            <LinearGradient
              colors={['#ef4444', '#dc2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emergencyButtonGradient}
            >
              <Ionicons name="alert-circle" size={32} color="#fff" />
              <Text style={styles.emergencyButtonText}>ACIONAR EMERGÊNCIA</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.infoSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Contatos de Emergência
            </ThemedText>
            
            <View style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="call" size={24} color="#10b981" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>Polícia</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>190</Text>
              </View>
            </View>

            <View style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="medkit" size={24} color="#ef4444" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>SAMU</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>192</Text>
              </View>
            </View>

            <View style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="flame" size={24} color="#f59226" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>Bombeiros</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>193</Text>
              </View>
            </View>
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
  content: {
    padding: 20,
    paddingTop: 60,
  },
  panicCard: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  panicTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  panicSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  emergencyButton: {
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  emergencyButtonGradient: {
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  infoSection: {
    marginTop: 20,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
  contactInfo: {
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactNumber: {
    fontSize: 16,
  },
});
