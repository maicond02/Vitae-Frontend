import { ThemedText } from '@/components/common/themed-text';
import { ThemedView } from '@/components/common/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PanicButton() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      pulseAnim.setValue(1);
    }
  }, [isActive]);

  const handlePanicPress = () => {
    Alert.alert(
      'Ativar Botão do Pânico?',
      'Isso enviará alertas para seus contatos de emergência e autoridades locais.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'ATIVAR',
          style: 'destructive',
          onPress: () => {
            setIsActive(true);
          },
        },
      ]
    );
  };

  const handleDeactivate = () => {
    Alert.alert(
      'Desativar Alerta?',
      'Tem certeza que deseja desativar o alerta de emergência?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim, Desativar',
          onPress: () => {
            setIsActive(false);
            setCountdown(0);
          },
        },
      ]
    );
  };

  const handleEmergencyCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {isActive ? (
            <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.activeCard}
              >
                <Ionicons name="radio-button-on" size={80} color="#fff" />
                <Text style={styles.activeTitle}>ALERTA ATIVO</Text>
                <Text style={styles.activeSubtitle}>
                  Mensagens enviadas para contatos de emergência
                </Text>
                <View style={styles.timerContainer}>
                  <Ionicons name="time" size={24} color="#fff" />
                  <Text style={styles.timerText}>{countdown}s</Text>
                </View>
                <TouchableOpacity style={styles.deactivateButton} onPress={handleDeactivate}>
                  <Text style={styles.deactivateButtonText}>Desativar Alerta</Text>
                </TouchableOpacity>
              </LinearGradient>
            </Animated.View>
          ) : (
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.panicCard}
            >
              <Ionicons name="shield-checkmark" size={80} color="#fff" />
              <Text style={styles.panicTitle}>Botão do Pânico</Text>
              <Text style={styles.panicSubtitle}>
                Em caso de emergência, pressione o botão abaixo
              </Text>
            </LinearGradient>
          )}

          {!isActive && (
            <TouchableOpacity style={styles.emergencyButton} onPress={handlePanicPress}>
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
          )}

          {isActive && (
            <View style={styles.statusSection}>
              <View style={[styles.statusCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
                <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusTitle, { color: colors.text }]}>Mensagem Enviada</Text>
                  <Text style={[styles.statusDescription, { color: colors.icon }]}>
                    Seus contatos de emergência foram notificados
                  </Text>
                </View>
              </View>

              <View style={[styles.statusCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
                <Ionicons name="location" size={24} color="#667eea" />
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusTitle, { color: colors.text }]}>Localização Compartilhada</Text>
                  <Text style={[styles.statusDescription, { color: colors.icon }]}>
                    Sua localização foi enviada em tempo real
                  </Text>
                </View>
              </View>

              <View style={[styles.statusCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
                <Ionicons name="shield" size={24} color="#f59226" />
                <View style={styles.statusInfo}>
                  <Text style={[styles.statusTitle, { color: colors.text }]}>Autoridades Notificadas</Text>
                  <Text style={[styles.statusDescription, { color: colors.icon }]}>
                    Disque 100 e 190 foram acionados
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.infoSection}>
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
              onPress={() => handleEmergencyCall('192')}
            >
              <Ionicons name="medkit" size={24} color="#ef4444" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>SAMU</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>192</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => handleEmergencyCall('193')}
            >
              <Ionicons name="flame" size={24} color="#f59226" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>Bombeiros</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>193</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.contactCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => handleEmergencyCall('100')}
            >
              <Ionicons name="people" size={24} color="#667eea" />
              <View style={styles.contactInfo}>
                <Text style={[styles.contactTitle, { color: colors.text }]}>Disque Direitos Humanos</Text>
                <Text style={[styles.contactNumber, { color: colors.icon }]}>100</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.icon} />
            </TouchableOpacity>
          </View>

          {!isActive && (
            <View style={[styles.tipsCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#f8f9fa' }]}>
              <Ionicons name="information-circle" size={24} color={colors.tint} />
              <View style={styles.tipsContent}>
                <Text style={[styles.tipsTitle, { color: colors.text }]}>Como Funciona</Text>
                <Text style={[styles.tipsText, { color: colors.icon }]}>
                   Ao ativar, seus contatos de emergência receberão SMS com sua localização{'\n'}
                   As autoridades locais serão notificadas automaticamente{'\n'}
                   O alerta ficará ativo por 60 segundos{'\n'}
                   Você pode desativar a qualquer momento
                </Text>
              </View>
            </View>
          )}
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
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  activeCard: {
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  panicTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  activeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
    letterSpacing: 2,
  },
  panicSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
  },
  activeSubtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.95,
    marginBottom: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  deactivateButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  deactivateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  statusSection: {
    marginBottom: 30,
  },
  statusCard: {
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
    elevation: 3,
  },
  statusInfo: {
    flex: 1,
    marginLeft: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  infoSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 16,
    fontSize: 20,
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
  tipsCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 20,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
