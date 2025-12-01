<div align="center">
  <img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</div>

# 🛡️ Vitae - Plataforma de Proteção aos Direitos Humanos

<div align="center">
  <p><strong>Sistema de denúncia anônima e proteção de direitos humanos para Americana, SP</strong></p>
</div>

## 📋 Sobre o Projeto

**Vitae** é uma plataforma mobile desenvolvida para a cidade de Americana, São Paulo, com o objetivo de oferecer um canal seguro, anônimo e acessível para denúncia de violações de direitos humanos. O aplicativo conecta vítimas e testemunhas a serviços de emergência, suporte especializado e autoridades competentes de forma rápida e confidencial.

### 🎯 Missão

Proteger e defender os direitos fundamentais de todos os cidadãos, oferecendo:
- Canal seguro para denúncias anônimas
- Acesso imediato a serviços de emergência
- Suporte especializado 24/7
- Ambiente livre de discriminação e violência

---

## ✨ Funcionalidades Principais

### 🔴 Botão do Pânico
- **Acionamento rápido** de serviços de emergência
- **Contato direto** com: Polícia (190), SAMU (192), Bombeiros (193) e Disque Direitos Humanos (100)
- **Temporizador de 60 segundos** com notificações automáticas
- **Animação visual** para indicar status ativo
- **Sistema de confirmação** para evitar acionamentos acidentais

### 📝 Denúncia Anônima
- **Modo anônimo** por padrão com proteção total de identidade
- **Categorias de violação**: violência, discriminação, assédio, abuso, exploração e outros
- **Formulário completo** com data, local e descrição detalhada
- **Seletor de data** com máscara DD/MM/AAAA
- **Validação de dados** antes do envio
- **Contadores de caracteres** (limite de 1000)
- **Alertas customizados** com tema escuro

### 💬 Chat de Suporte
- **Assistente virtual** disponível 24/7
- **Respostas automáticas** personalizadas
- **Interface intuitiva** com histórico de mensagens
- **Suporte contextual** baseado na quantidade de interações

### 👤 Gerenciamento de Perfil
- **Edição de dados pessoais**: nome, telefone e localização
- **Alteração de senha** com validação de segurança
- **Modo de edição** com confirmação e cancelamento
- **Sincronização automática** com AsyncStorage

### ℹ️ Sobre o Aplicativo
- **Informações institucionais** da Prefeitura de Americana
- **Descrição de recursos** e funcionalidades
- **Contatos de emergência** clicáveis para ligação direta
- **Dados de contato** do projeto

---

## 🏗️ Arquitetura Técnica

### Stack Tecnológica

```
Frontend Mobile
├── React Native 0.81.5
├── Expo SDK 54.0.23
├── TypeScript 5.9.2
├── Expo Router 6.0.14 (File-based routing)
└── React Navigation 7.1.8
```

### Principais Dependências

| Pacote | Versão | Finalidade |
|--------|--------|-----------|
| `expo-linear-gradient` | 15.0.7 | Gradientes visuais |
| `@react-native-async-storage/async-storage` | 2.2.0 | Persistência de dados |
| `@react-native-community/datetimepicker` | 8.5.1 | Seleção de datas |
| `@expo/vector-icons` | 15.0.3 | Ícones (Ionicons) |
| `expo-linking` | 8.0.8 | Deep linking e chamadas telefônicas |

### Estrutura de Diretórios

```
vitae/
├── app/                          # Rotas da aplicação (Expo Router)
│   ├── (tabs)/                   # Navegação por abas
│   │   ├── index.tsx            # Tela inicial (Home/Login)
│   │   ├── report.tsx           # Denúncias
│   │   ├── panic.tsx            # Botão do Pânico
│   │   ├── chat.tsx             # Chat de suporte
│   │   ├── profile.tsx          # Perfil do usuário
│   │   └── about.tsx            # Sobre o app
│   └── _layout.tsx              # Layout raiz
│
├── components/
│   ├── auth/                     # Autenticação
│   │   ├── login-screen.tsx
│   │   ├── register-screen.tsx
│   │   └── forgot-password-screen.tsx
│   │
│   ├── screens/                  # Telas principais
│   │   ├── home-content.tsx
│   │   ├── panic-button.tsx
│   │   ├── report.tsx
│   │   ├── chat.tsx
│   │   ├── profile.tsx
│   │   └── about.tsx
│   │
│   ├── common/                   # Componentes reutilizáveis
│   │   ├── themed-view.tsx
│   │   ├── themed-text.tsx
│   │   └── custom-alert.tsx      # Modal customizado
│   │
│   └── ui/                       # Componentes de UI
│       ├── collapsible.tsx
│       └── icon-symbol.tsx
│
├── context/
│   └── auth-context.tsx          # Context API para autenticação
│
├── constants/
│   └── theme.ts                  # Temas (light/dark)
│
├── hooks/
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
│
└── assets/                       # Recursos estáticos
    └── images/
```

---

## 🚀 Instalação e Execução

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Expo CLI
- Emulador Android/iOS ou dispositivo físico com Expo Go

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/maicond02/Vitae-Frontend.git
   cd Vitae-Frontend
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npx expo start
   ```

4. **Execute no dispositivo**
   - Escaneie o QR Code com o aplicativo **Expo Go** (Android/iOS)
   - Ou pressione `a` para Android emulator
   - Ou pressione `i` para iOS simulator

### Scripts Disponíveis

```bash
npm start          # Inicia o servidor Expo
npm run android    # Abre no emulador Android
npm run ios        # Abre no simulador iOS
npm run web        # Abre no navegador web
npm run lint       # Executa o linter
```

---

## 🔐 Autenticação e Segurança

### Sistema de Autenticação

- **AsyncStorage** para persistência local de usuários
- **Context API** para gerenciamento de estado global
- **Credenciais padrão** para demonstração:
  - Email: `admin@email.com`
  - Senha: `123`

### Funcionalidades de Segurança

- ✅ Senhas armazenadas localmente (demonstração)
- ✅ Modo anônimo para denúncias
- ✅ Validação de formulários
- ✅ Confirmação dupla para ações críticas (botão do pânico)
- ✅ Proteção de dados pessoais

> **Nota**: Para produção, implementar autenticação com backend (JWT, OAuth) e criptografia adequada.

---

## 🎨 Design e UX

### Tema Visual

- **Gradientes**: Roxo (`#667eea` → `#764ba2`)
- **Emergência**: Vermelho (`#ef4444` → `#dc2626`)
- **Sucesso**: Verde (`#10b981`)
- **Suporte a Dark Mode**: Automático pelo sistema

### Componentes Customizados

- **CustomAlert**: Modal com tema escuro para alertas do sistema
- **ThemedView/ThemedText**: Componentes que adaptam ao tema
- **Cards Interativos**: Com sombras e feedback tátil

### Acessibilidade

- Ícones intuitivos (Ionicons)
- Feedback visual para ações
- Textos com contraste adequado
- Botões com área de toque adequada

---

## 📱 Fluxo de Navegação

```
Início (Login/Register)
    ↓
Home (Autenticado)
    ├─→ Denunciar (Formulário de denúncia)
    ├─→ Pânico (Botão de emergência)
    ├─→ Chat (Suporte virtual)
    ├─→ Perfil (Editar dados)
    └─→ Sobre (Informações)
```

---

## 🧪 Funcionalidades de Persistência

### AsyncStorage (Local Storage)

- **Usuários cadastrados**: `@vitae_users`
- **Usuário atual**: `@vitae_current_user`

### Operações CRUD

- ✅ **Create**: Registro de novos usuários
- ✅ **Read**: Carregamento de dados na inicialização
- ✅ **Update**: Edição de perfil
- ✅ **Delete**: Logout (remoção de sessão)

---

## 🛠️ Tecnologias e Padrões

### Padrões de Código

- **TypeScript**: Tipagem estática para maior segurança
- **Functional Components**: Hooks do React
- **Context API**: Gerenciamento de estado global
- **File-based Routing**: Expo Router para navegação
- **Component Composition**: Componentes reutilizáveis

### Bibliotecas Principais

- **expo-linear-gradient**: Gradientes visuais
- **@react-native-community/datetimepicker**: Seletor de datas nativo
- **expo-linking**: Integração com telefone e URLs
- **react-native-reanimated**: Animações performáticas

---

## 📞 Contatos de Emergência Integrados

| Serviço | Número | Descrição |
|---------|--------|-----------|
| 🚔 Polícia Militar | 190 | Emergências policiais |
| 🚑 SAMU | 192 | Urgências médicas |
| 🚒 Bombeiros | 193 | Incêndios e resgates |
| 🛡️ Disque Direitos Humanos | 100 | Violações de direitos |

---

## 👥 Equipe de Desenvolvimento

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/joaoracanelli.png" width="100px" alt="João Marcos"/><br />
      <sub><b>João Marcos Racanelli Moura</b></sub><br />
      <sub>Developer</sub>
    </td>
    <td align="center">
      <img src="https://github.com/leonardomarcondeli.png" width="100px" alt="Leonardo"/><br />
      <sub><b>Leonardo Marcondeli</b></sub><br />
      <sub>Developer</sub>
    </td>
    <td align="center">
      <img src="https://github.com/maicond02.png" width="100px" alt="Maicon"/><br />
      <sub><b>Maicon Douglas Mendes Alves</b></sub><br />
      <sub>Developer</sub>
    </td>
    <td align="center">
      <img src="https://github.com/viniciusgodoi.png" width="100px" alt="Vinicius"/><br />
      <sub><b>Vinicius de Moraes de Godoi</b></sub><br />
      <sub>Developer</sub>
    </td>
  </tr>
</table>

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e como proposta para a Prefeitura de Americana, SP.

© 2025 Vitae - Proteção e Defesa dos Direitos Humanos

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📧 Contato

**Email Institucional**: contato@vitae-americana.sp.gov.br

**Repositório**: [github.com/maicond02/Vitae-Frontend](https://github.com/maicond02/Vitae-Frontend)

---

<div align="center">
  <p>Feito pela equipe Vitae</p>
  <p><strong>Defendendo Direitos, Protegendo Vidas</strong></p>
</div>
