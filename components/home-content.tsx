import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeContent() {
  const { user, logout } = useAuth();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleEmergencyCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.welcomeText}>Olá, {user?.name?.split(' ')[0] || 'Usuário'}!</Text>
              <Text style={styles.subtitleText}>Você está protegido</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Emergency Alert */}
          <View style={styles.emergencySection}>
            <LinearGradient
              colors={['#ef4444', '#dc2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.emergencyCard}
            >
              <View style={styles.emergencyIconContainer}>
                <Ionicons name="warning" size={32} color="#fff" />
              </View>
              <View style={styles.emergencyTextContainer}>
                <Text style={styles.emergencyTitle}>Em situação de risco?</Text>
                <Text style={styles.emergencySubtitle}>Acione o botão do pânico imediatamente</Text>
              </View>
              <TouchableOpacity style={styles.emergencyButton}>
                <Ionicons name="shield-checkmark" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Mission Statement */}
          <View style={styles.missionSection}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Nossa Missão
            </ThemedText>
            <View style={[styles.missionCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Text style={[styles.missionText, { color: colors.text }]}>
                O Vitae é uma plataforma dedicada à proteção dos direitos humanos e ao combate à violência. 
                Oferecemos um canal seguro, anônimo e acessível para denúncias e conectamos vítimas a uma 
                rede integrada de suporte jurídico, psicológico e social.
              </Text>
            </View>
          </View>

          {/* Key Features */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Nossos Recursos
            </ThemedText>
            
            <TouchableOpacity 
              style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
            >
              <View style={styles.featureLeft}>
                <View style={[styles.featureIcon, { backgroundColor: '#667eea20' }]}>
                  <Ionicons name="shield-checkmark" size={24} color="#667eea" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Denúncia Anônima
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.icon }]}>
                    Registre violações com total sigilo e segurança
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
            >
              <View style={styles.featureLeft}>
                <View style={[styles.featureIcon, { backgroundColor: '#ef444420' }]}>
                  <Ionicons name="warning" size={24} color="#ef4444" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Botão do Pânico
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.icon }]}>
                    Acione ajuda imediata em situações de emergência
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
            >
              <View style={styles.featureLeft}>
                <View style={[styles.featureIcon, { backgroundColor: '#10b98120' }]}>
                  <Ionicons name="people" size={24} color="#10b981" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Rede de Apoio
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.icon }]}>
                    Conecte-se a serviços jurídicos, psicológicos e sociais
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.featureCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
            >
              <View style={styles.featureLeft}>
                <View style={[styles.featureIcon, { backgroundColor: '#764ba220' }]}>
                  <Ionicons name="globe" size={24} color="#764ba2" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={[styles.featureTitle, { color: colors.text }]}>
                    Multilíngue e Acessível
                  </Text>
                  <Text style={[styles.featureDescription, { color: colors.icon }]}>
                    Disponível em Português, Libras e Espanhol
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Statistics */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Impacto no Brasil
            </ThemedText>
            
            <View style={styles.statsContainer}>
              <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
                <View style={[styles.statIconContainer, { backgroundColor: '#ef444420' }]}>
                  <Ionicons name="alert-circle" size={24} color="#ef4444" />
                </View>
                <Text style={[styles.statNumber, { color: colors.text }]}>+430mil</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Denúncias/ano</Text>
                <Text style={[styles.statSource, { color: colors.icon }]}>Disque 100 (2023)</Text>
              </View>

              <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
                <View style={[styles.statIconContainer, { backgroundColor: '#667eea20' }]}>
                  <Ionicons name="trending-up" size={24} color="#667eea" />
                </View>
                <Text style={[styles.statNumber, { color: colors.text }]}>+45%</Text>
                <Text style={[styles.statLabel, { color: colors.icon }]}>Aumento</Text>
                <Text style={[styles.statSource, { color: colors.icon }]}>vs. ano anterior</Text>
              </View>
            </View>
          </View>

          {/* Emergency Contacts */}
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Contatos de Emergência
            </ThemedText>
            
            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => handleEmergencyCall('190')}
            >
              <Ionicons name="call" size={24} color="#10b981" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>Polícia Militar</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>190</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => handleEmergencyCall('180')}
            >
              <Ionicons name="call" size={24} color="#667eea" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>Disque Denúncia</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>180</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => handleEmergencyCall('100')}
            >
              <Ionicons name="call" size={24} color="#ef4444" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>Disque Direitos Humanos</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>100</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          {/* Support Info */}
          <View style={[styles.supportCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f8f9fa' }]}>
            <Ionicons name="information-circle" size={24} color={colors.tint} />
            <Text style={[styles.supportText, { color: colors.text }]}>
              Você não está sozinho. Nossa rede de apoio está disponível 24/7 para te ajudar.
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
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  logoutButton: {
    padding: 8,
  },
  content: {
    padding: 20,
  },
  emergencySection: {
    marginBottom: 24,
  },
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  emergencyIconContainer: {
    marginRight: 12,
  },
  emergencyTextContainer: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
  },
  emergencySubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },
  emergencyButton: {
    padding: 8,
  },
  missionSection: {
    marginBottom: 30,
  },
  missionCard: {
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  missionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
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
  featureLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  statSource: {
    fontSize: 11,
    opacity: 0.7,
  },
  contactCard: {
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
  contactInfo: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 14,
  },
  supportCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  supportText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
