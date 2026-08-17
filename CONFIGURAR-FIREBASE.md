# Configurar os Bilhetes (Firebase) — passo a passo

Os bilhetes usam o **Firebase** (do Google) para que o que a Lara escreve
apareça no celular da Leh, e vice-versa. É gratuito para esse uso (bem
abaixo do limite grátis) e leva uns 5 minutinhos pra configurar.

## 1. Criar o projeto

1. Acesse https://console.firebase.google.com e entre com uma conta Google.
2. Clique em **"Adicionar projeto"**, dê um nome (ex: `nosso-site`) e siga
   os passos (pode desativar o Google Analytics, não é necessário).

## 2. Criar o banco de dados (Firestore)

1. No menu lateral, vá em **Build → Firestore Database**.
2. Clique em **"Criar banco de dados"**.
3. Escolha **"Iniciar no modo de produção"** e selecione uma localização
   (ex: `southamerica-east1` para o Brasil).

## 3. Ativar o login anônimo

1. No menu lateral, vá em **Build → Authentication**.
2. Clique em **"Vamos começar"** (ou "Get started").
3. Na aba **"Sign-in method"**, ative o provedor **"Anônimo" (Anonymous)**.

Isso serve só para identificar que quem está escrevendo veio do site —
vocês não precisam criar login nem senha.

## 4. Definir as regras de segurança do Firestore

1. Ainda em **Firestore Database**, vá na aba **"Regras" (Rules)**.
2. Substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /bilhetes/{bilheteId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Clique em **"Publicar"**.

> Isso libera leitura e escrita pra qualquer pessoa que tenha aberto o
> site (autenticação anônima é automática e instantânea). Não é uma
> segurança forte tipo banco — é o suficiente pra manter estranhos da
> internet longe, mas não conte esse link pra ninguém que vocês não
> queiram deixar escrever recados.

## 5. Pegar as chaves de configuração

1. Clique na engrenagem ⚙️ ao lado de "Visão geral do projeto" →
   **Configurações do projeto**.
2. Role até **"Seus apps"** e clique no ícone **`</>`** (Web) para
   registrar um app.
3. Dê um apelido (ex: `site`) e clique em **"Registrar app"**.
4. O Firebase vai mostrar um bloco `firebaseConfig = { ... }`. Copie
   esses valores.

## 6. Colar no site

Abra o arquivo **`firebase-config.js`** (na pasta principal do site) e
troque cada `"SUBSTITUA_AQUI"` pelo valor correspondente que você
copiou. Fica assim, por exemplo:

```js
export const firebaseConfig = {
  apiKey: "AIzaSyD...",
  authDomain: "nosso-site-xxxx.firebaseapp.com",
  projectId: "nosso-site-xxxx",
  storageBucket: "nosso-site-xxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

Salve o arquivo, suba o site de novo (GitHub Pages, Netlify, Vercel etc.)
e prontinho — os bilhetes já sincronizam entre os dois celulares. 💛

---

### Não quer usar Firebase agora?

Sem problema — a página de Bilhetes mostra um aviso simpático até vocês
configurarem, e o resto do site funciona normalmente sem isso.
