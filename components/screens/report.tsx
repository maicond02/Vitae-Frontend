import CustomAlert from '@/components/common/custom-alert';
import { ThemedView } from '@/components/common/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Linking,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
export default function Report() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [anonymous, setAnonymous] = useState(true);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [violationType, setViolationType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'info' | 'success' | 'error';
    buttons: { text: string; onPress?: () => void; style?: 'default' | 'cancel' }[];
  }>({ visible: false, title: '', message: '', type: 'info', buttons: [] });

  const makePhoneCall = (phoneNumber: string) => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.canOpenURL(phoneUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(phoneUrl);
        } else {
          Alert.alert('Erro', 'Não foi possível realizar a ligação');
        }
      })
      .catch((err) => console.error('Erro ao tentar ligar:', err));
  };

  const formatDate = (text: string) => {
    // Remove tudo que não é número
    const numbers = text.replace(/\D/g, '');
    
    // Aplica a máscara DD/MM/AAAA
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    }
  };

  const handleDateChange = (text: string) => {
    const formatted = formatDate(text);
    setDate(formatted);
  };

  const handleDatePickerChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setSelectedDate(selectedDate);
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const year = selectedDate.getFullYear();
      setDate(`${day}/${month}/${year}`);
    }
  };

  const openDatePicker = () => {
    setShowDatePicker(true);
  };

  const violationTypes = [
    { id: 'violence', label: 'Violência Física', icon: 'warning' },
    { id: 'discrimination', label: 'Discriminação', icon: 'people' },
    { id: 'harassment', label: 'Assédio', icon: 'alert-circle' },
    { id: 'abuse', label: 'Abuso de Autoridade', icon: 'shield' },
    { id: 'exploitation', label: 'Exploração', icon: 'hand-left' },
    { id: 'other', label: 'Outro', icon: 'ellipsis-horizontal' },
  ];

  const handleSubmit = () => {
    if (!violationType) {
      setAlertConfig({
        visible: true,
        title: 'Atenção',
        message: 'Por favor, selecione o tipo de violação',
        type: 'error',
        buttons: [{ text: 'OK', onPress: () => {} }],
      });
      return;
    }

    if (!description.trim()) {
      setAlertConfig({
        visible: true,
        title: 'Atenção',
        message: 'Por favor, descreva o ocorrido',
        type: 'error',
        buttons: [{ text: 'OK', onPress: () => {} }],
      });
      return;
    }

    setAlertConfig({
      visible: true,
      title: 'Denúncia Enviada',
      message: anonymous 
        ? 'Sua denúncia foi registrada anonimamente. As autoridades competentes foram notificadas.'
        : 'Sua denúncia foi registrada. As autoridades competentes foram notificadas e entraremos em contato em breve.',
      type: 'success',
      buttons: [
        {
          text: 'OK',
          onPress: () => {
            // Limpar formulário
            setName('');
            setPhone('');
            setViolationType('');
            setLocation('');
            setDescription('');
            setDate('');
          },
        },
      ],
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <ThemedView style={styles.container}>
        <LinearGradient
          colors={['#ef4444', '#dc2626']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <Ionicons 
            name={anonymous ? "eye-off" : "shield-checkmark"} 
            size={32} 
            color="#fff" 
            style={styles.headerIcon} 
          />
          <View>
            <Text style={styles.headerTitle}>
              {anonymous ? 'Denúncia Anônima' : 'Denúncia Identificada'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {anonymous ? 'Seus dados estão protegidos' : 'Podemos entrar em contato'}
            </Text>
          </View>
        </LinearGradient>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Anonymous Toggle */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
            <View style={styles.anonymousHeader}>
              <Ionicons name="eye-off" size={24} color={colors.tint} />
              <View style={styles.anonymousText}>
                <Text style={[styles.cardTitle, { color: colors.text }]}>Denúncia Anônima</Text>
                <Text style={[styles.cardDescription, { color: colors.icon }]}>
                  Sua identidade será protegida
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.toggle, anonymous && styles.toggleActive]}
                onPress={() => setAnonymous(!anonymous)}
              >
                <View style={[styles.toggleCircle, anonymous && styles.toggleCircleActive]} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Personal Information (Optional) */}
          {!anonymous && (
            <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Informações Pessoais (Opcional)</Text>
              
              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Nome Completo</Text>
                <View style={[styles.inputWrapper, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5' }]}>
                  <Ionicons name="person-outline" size={20} color={colors.icon} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="Seu nome"
                    placeholderTextColor={colors.icon}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, { color: colors.text }]}>Telefone para Contato</Text>
                <View style={[styles.inputWrapper, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5' }]}>
                  <Ionicons name="call-outline" size={20} color={colors.icon} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, { color: colors.text }]}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor={colors.icon}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
            </View>
          )}

          {/* Violation Type */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Tipo de Violação *</Text>
            <View style={styles.typesGrid}>
              {violationTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.typeButton,
                    { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f8f9fa' },
                    violationType === type.id && styles.typeButtonActive,
                  ]}
                  onPress={() => setViolationType(type.id)}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={24}
                    color={violationType === type.id ? '#fff' : colors.icon}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      { color: violationType === type.id ? '#fff' : colors.text },
                    ]}
                  >
                    {type.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location and Date */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Local e Data</Text>
            
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Local do Ocorrido</Text>
              <View style={[styles.inputWrapper, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5' }]}>
                <Ionicons name="location-outline" size={20} color={colors.icon} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Endereço, bairro ou referência"
                  placeholderTextColor={colors.icon}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Data do Ocorrido</Text>
              <View style={[styles.inputWrapper, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5' }]}>
                <TouchableOpacity onPress={openDatePicker} style={styles.dateIconButton}>
                  <Ionicons name="calendar-outline" size={20} color={colors.icon} />
                </TouchableOpacity>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="DD/MM/AAAA"
                  placeholderTextColor={colors.icon}
                  value={date}
                  onChangeText={handleDateChange}
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
            </View>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={handleDatePickerChange}
              maximumDate={new Date()}
            />
          )}

          {/* Description */}
          <View style={[styles.card, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Descrição do Ocorrido *</Text>
            <View style={[styles.textAreaWrapper, { backgroundColor: colorScheme === 'dark' ? '#2a2a2a' : '#f5f5f5' }]}>
              <TextInput
                style={[styles.textArea, { color: colors.text }]}
                placeholder="Descreva detalhadamente o que aconteceu. Quanto mais informações, melhor será o auxílio."
                placeholderTextColor={colors.icon}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>
            <Text style={[styles.helperText, { color: colors.icon }]}>
              {description.length}/1000 caracteres
            </Text>
          </View>

          {/* Warning Info */}
          <View style={[styles.warningCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff5f5' }]}>
            <Ionicons name="information-circle" size={24} color="#ef4444" />
            <Text style={[styles.warningText, { color: colorScheme === 'dark' ? colors.text : '#991b1b' }]}>
              Denúncias falsas podem ser criminalizadas. Todas as informações são verificadas pelas autoridades competentes.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
            <LinearGradient
              colors={['#ef4444', '#dc2626']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.submitButtonGradient}
            >
              <Ionicons name="checkmark-circle" size={24} color="#fff" />
              <Text style={styles.submitButtonText}>Enviar Denúncia</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Help Contacts */}
          <View style={styles.helpSection}>
            <Text style={[styles.helpTitle, { color: colors.text }]}>Precisa de Ajuda Imediata?</Text>
            <View style={styles.helpButtons}>
              <TouchableOpacity style={styles.helpButton} onPress={() => makePhoneCall('100')}>
                <Ionicons name="call" size={20} color="#10b981" />
                <Text style={styles.helpButtonText}>Disque 100</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.helpButton} onPress={() => makePhoneCall('190')}>
                <Ionicons name="shield" size={20} color="#667eea" />
                <Text style={styles.helpButtonText}>Polícia 190</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <CustomAlert
          visible={alertConfig.visible}
          title={alertConfig.title}
          message={alertConfig.message}
          type={alertConfig.type}
          buttons={alertConfig.buttons}
          onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
        />
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 20,
    gap: 12,
  },
  headerIcon: {
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  anonymousHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  anonymousText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#e5e5e5',
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: '#667eea',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleCircleActive: {
    alignSelf: 'flex-end',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  dateIconButton: {
    marginRight: 12,
    padding: 4,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  typesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    width: '47%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  typeButtonActive: {
    backgroundColor: '#667eea',
  },
  typeButtonText: {
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  textAreaWrapper: {
    borderRadius: 12,
    padding: 16,
  },
  textArea: {
    fontSize: 15,
    minHeight: 120,
  },
  helperText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
  },
  warningCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    gap: 12,
    marginBottom: 24,
  },
  warningText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    shadowColor: '#ef4444',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  helpSection: {
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  helpButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  helpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});
