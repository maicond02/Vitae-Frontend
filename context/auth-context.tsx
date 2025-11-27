import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  name: string;
  phone?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string, phone?: string) => Promise<boolean>;
  updateUser: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = '@vitae_users';
const CURRENT_USER_KEY = '@vitae_current_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Carregar usuário ao iniciar
  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem(CURRENT_USER_KEY);
      if (currentUser) {
        const userData = JSON.parse(currentUser);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    phone?: string
  ): Promise<boolean> => {
    try {
      // Carregar usuários existentes
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users = usersData ? JSON.parse(usersData) : {};

      // Verificar se o email já existe
      if (users[email]) {
        return false;
      }

      // Salvar novo usuário
      users[email] = {
        password,
        name,
        phone,
        email,
      };

      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Verificar admin padrão
      if (email === 'admin@email.com' && password === '123') {
        const adminUser: User = { email, name: 'Administrador' };
        setIsAuthenticated(true);
        setUser(adminUser);
        await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(adminUser));
        return true;
      }

      // Verificar usuários registrados
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      if (usersData) {
        const users = JSON.parse(usersData);
        const userData = users[email];

        if (userData && userData.password === password) {
          const userInfo: User = {
            email: userData.email,
            name: userData.name,
            phone: userData.phone,
          };
          setIsAuthenticated(true);
          setUser(userInfo);
          await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userInfo));
          return true;
        }
      }

      return false;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const updateUser = async (updates: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;

      const updatedUser = { ...user, ...updates };
      
      // Atualizar o usuário no storage de usuários
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      if (usersData) {
        const users = JSON.parse(usersData);
        if (users[user.email]) {
          users[user.email] = {
            ...users[user.email],
            name: updatedUser.name,
            phone: updatedUser.phone,
          };
          await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
        }
      }

      // Atualizar o usuário atual
      setUser(updatedUser);
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
      
      return true;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
