# Configuração do Firebase

Este projeto usa Firebase para autenticação e armazenamento de dados. Siga os passos abaixo para configurar:

## 1. Criar Projeto no Firebase

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Adicionar projeto"**
3. Dê um nome ao projeto (ex: "ecg-laudo-sistema")
4. Desabilite o Google Analytics (opcional)
5. Clique em **"Criar projeto"**

## 2. Adicionar Aplicativo Web

1. No painel do projeto, clique no ícone **Web** (</>)
2. Registre o app com um apelido (ex: "ECG Laudo Web")
3. NÃO marque "Firebase Hosting"
4. Clique em **"Registrar app"**
5. **COPIE** o objeto `firebaseConfig` que aparece

## 3. Configurar o Arquivo firebase.js

1. Abra o arquivo: `src/config/firebase.js`
2. Substitua as configurações com os valores copiados:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456",
};
```

## 3.1. Configurar Emails Autorizados

1. Abra o arquivo: `src/config/authorized-users.js`
2. Substitua `'seu-email@gmail.com'` pelo seu email do Google:

```javascript
export const EMAILS_AUTORIZADOS = [
  "seuemail@gmail.com", // Substitua pelo seu email
];
```

**IMPORTANTE:** Apenas os emails listados aqui poderão acessar o sistema!

## 4. Habilitar Autenticação com Google

1. No console Firebase, vá em **Authentication** (menu lateral)
2. Clique em **"Começar"**
3. Na aba **"Sign-in method"**, clique em **"Google"**
4. **Ative** o provedor Google
5. Escolha um email de suporte (seu email)
6. Clique em **"Salvar"**

## 5. Configurar Firestore Database

1. No console Firebase, vá em **Firestore Database** (menu lateral)
2. Clique em **"Criar banco de dados"**
3. Selecione o modo **"Produção"** (production mode)
4. Escolha a localização (ex: southamerica-east1 para São Paulo)
5. Clique em **"Ativar"**

## 6. Configurar Regras de Segurança do Firestore

1. Vá em **Firestore Database** > **Regras**
2. Substitua as regras padrão por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Apenas usuários autenticados podem acessar seus próprios dados
    match /usuarios/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Clique em **"Publicar"**

## 7. Testar a Aplicação

1. Execute o projeto: `npm run dev`
2. Acesse: http://localhost:5173
3. Clique em **"Entrar com Google"**
4. Faça login com sua conta Google
5. Você deve ser redirecionado para o sistema

## Estrutura de Dados no Firestore

O sistema armazena os dados do usuário em:

```
usuarios/{userId}
  - frasesPersonalizadas: array de strings
  - ultimaAtualizacao: timestamp
```

## Domínios Autorizados

Se você hospedar o app, adicione o domínio em:

- **Authentication** > **Settings** > **Authorized domains**

## Troubleshooting

### Erro: "Firebase: Error (auth/popup-blocked)"

- Permita pop-ups no navegador para este site

### Erro: "Firebase: Error (auth/unauthorized-domain)"

- Adicione o domínio em "Authorized domains" nas configurações do Authentication

### Frases personalizadas não aparecem

- Verifique as regras de segurança do Firestore
- Confirme que o usuário está autenticado
- Verifique o console do navegador para erros

## Links Úteis

- [Firebase Console](https://console.firebase.google.com/)
- [Documentação Firebase Auth](https://firebase.google.com/docs/auth)
- [Documentação Firestore](https://firebase.google.com/docs/firestore)
