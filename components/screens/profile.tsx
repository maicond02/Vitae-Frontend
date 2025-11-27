import CustomAlert from '@/components/common/custom-alert';
import { ThemedText } from '@/components/common/themed-text';
import { ThemedView } from '@/components/common/themed-view';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/auth-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function Profile() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user, logout, updateUser } = useAuth();
  
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editLocation, setEditLocation] = useState('Brasil');
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [alertConfig, setAlertConfig] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type: 'info' | 'success' | 'error';
    buttons: { text: string; onPress?: () => void; style?: 'default' | 'cancel' }[];
  }>({ visible: false, title: '', message: '', type: 'info', buttons: [] });

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      setAlertConfig({
        visible: true,
        title: 'Atenção',
        message: 'O nome não pode estar vazio',
        type: 'error',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    const success = await updateUser({
      name: editName,
      phone: editPhone,
    });

    if (success) {
      setEditMode(false);
      setAlertConfig({
        visible: true,
        title: 'Sucesso',
        message: 'Suas informações foram atualizadas!',
        type: 'success',
        buttons: [{ text: 'OK' }],
      });
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setAlertConfig({
        visible: true,
        title: 'Atenção',
        message: 'Preencha todos os campos',
        type: 'error',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setAlertConfig({
        visible: true,
        title: 'Atenção',
        message: 'As senhas não coincidem',
        type: 'error',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    if (newPassword.length < 3) {
      setAlertConfig({
        visible: true,
        title: 'Atenção',
        message: 'A senha deve ter pelo menos 3 caracteres',
        type: 'error',
        buttons: [{ text: 'OK' }],
      });
      return;
    }

    // Aqui você implementaria a lógica real de mudança de senha
    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    setAlertConfig({
      visible: true,
      title: 'Sucesso',
      message: 'Senha alterada com sucesso!',
      type: 'success',
      buttons: [{ text: 'OK' }],
    });
  };

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
          
          {!editMode ? (
            <TouchableOpacity style={styles.editButton} onPress={() => {
              setEditName(user?.name || '');
              setEditPhone(user?.phone || '');
              setEditMode(true);
            }}>
              <Ionicons name="create-outline" size={20} color="#fff" />
              <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => {
                setEditMode(false);
                setEditName(user?.name || '');
                setEditPhone(user?.phone || '');
              }}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          )}
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionTitle}>
              Informações Pessoais
            </ThemedText>

            <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="person-outline" size={24} color={colors.icon} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Nome</Text>
                {!editMode ? (
                  <Text style={[styles.infoValue, { color: colors.text }]}>{user?.name}</Text>
                ) : (
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
                    value={editName}
                    onChangeText={setEditName}
                    placeholder="Digite seu nome"
                    placeholderTextColor={colors.icon}
                  />
                )}
              </View>
            </View>

            <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="mail" size={24} color={colors.icon} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Email</Text>
                <Text style={[styles.infoValue, { color: colors.icon, fontSize: 12 }]}>{user?.email}</Text>
                <Text style={[styles.infoHint, { color: colors.icon }]}>Email não pode ser alterado</Text>
              </View>
            </View>

            <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="call" size={24} color={colors.icon} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Telefone</Text>
                {!editMode ? (
                  <Text style={[styles.infoValue, { color: colors.text }]}>{user?.phone || 'Não informado'}</Text>
                ) : (
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
                    value={editPhone}
                    onChangeText={setEditPhone}
                    placeholder="(00) 00000-0000"
                    placeholderTextColor={colors.icon}
                    keyboardType="phone-pad"
                  />
                )}
              </View>
            </View>

            <View style={[styles.infoCard, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}>
              <Ionicons name="location" size={24} color={colors.icon} />
              <View style={styles.infoText}>
                <Text style={[styles.infoLabel, { color: colors.icon }]}>Localização</Text>
                {!editMode ? (
                  <Text style={[styles.infoValue, { color: colors.text }]}>{editLocation}</Text>
                ) : (
                  <TextInput
                    style={[styles.input, { color: colors.text, borderColor: colors.icon }]}
                    value={editLocation}
                    onChangeText={setEditLocation}
                    placeholder="Sua localização"
                    placeholderTextColor={colors.icon}
                  />
                )}
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

            <TouchableOpacity 
              style={[styles.menuItem, { backgroundColor: colorScheme === 'dark' ? '#1f1f1f' : '#fff' }]}
              onPress={() => setShowPasswordModal(true)}
            >
              <Ionicons name="lock-closed" size={24} color={colors.icon} />
              <Text style={[styles.menuText, { color: colors.text }]}>Alterar Senha</Text>
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

      {/* Modal de Alterar Senha */}
      <Modal
        visible={showPasswordModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPasswordModal(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Alterar Senha</Text>
              <TouchableOpacity onPress={() => {
                setShowPasswordModal(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}>
                <Ionicons name="close" size={28} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Senha Atual</Text>
                <TextInput
                  style={styles.modalInput}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Digite sua senha atual"
                  placeholderTextColor="#666"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nova Senha</Text>
                <TextInput
                  style={styles.modalInput}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Digite a nova senha"
                  placeholderTextColor="#666"
                  secureTextEntry
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Confirmar Nova Senha</Text>
                <TextInput
                  style={styles.modalInput}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirme a nova senha"
                  placeholderTextColor="#666"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.modalButton} onPress={handleChangePassword}>
                <Text style={styles.modalButtonText}>Alterar Senha</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        buttons={alertConfig.buttons}
        onClose={() => setAlertConfig({ ...alertConfig, visible: false })}
      />
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
    gap: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#667eea',
    fontSize: 14,
    fontWeight: '600',
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
  infoHint: {
    fontSize: 10,
    marginTop: 4,
    fontStyle: 'italic',
  },
  input: {
    fontSize: 16,
    fontWeight: '600',
    borderBottomWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 0,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1a1a1a',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    fontWeight: '600',
  },
  modalInput: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#fff',
  },
  modalButton: {
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
