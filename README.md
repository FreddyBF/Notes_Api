<h1 align="center">📒 Notes API</h1>

<p align="center">
  <b>API RESTful para gerenciamento seguro de anotações pessoais</b>  
  <br>
  <i>CRUD completo + Autenticação JWT + Respostas padronizadas</i>
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x-green?logo=nodedotjs" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/JWT-secure-orange?logo=jsonwebtokens" alt="JWT">
  <img src="https://img.shields.io/badge/OpenAPI-3.0.3-teal?logo=openapiinitiative" alt="OpenAPI">
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma" alt="Prisma ORM">
</p>
---

## 📖 Sobre
A **Notes API** permite que utilizadores criem, organizem e gerenciem anotações pessoais de forma **segura**.  
Todos os endpoints de notas requerem autenticação via **Bearer Token (JWT)**.

Funcionalidades principais:
- ✨ Registro e login de utilizadores
- 🔑 Autenticação e autorização com JWT
- 📌 CRUD completo de anotações (criar, listar, atualizar, remover)
- 📜 Documentação em **OpenAPI/Swagger**
- ⚡ Respostas padronizadas (status + mensagem + dados)
  
---
## 🛠 Tecnologias

<p align="center">
  <span style="display:inline-block; text-align:center; margin:0 15px;">
    <img src="https://cdn.simpleicons.org/nodedotjs/339933" width="35" height="35"/>
    <sub>Node.js</sub>
  </span>
  <span style="display:inline-block; text-align:center; margin:0 15px;">
    <img src="https://cdn.simpleicons.org/express/000000" width="35" height="35"/>
    <sub>Express</sub>
  </span>
  <span style="display:inline-block; text-align:center; margin:0 15px;">
    <img src="https://cdn.simpleicons.org/typescript/3178C6" width="35" height="35"/>
    <sub>TypeScript</sub>
  </span>
  <span style="display:inline-block; text-align:center; margin:0 15px;">
    <img src="https://cdn.simpleicons.org/jsonwebtokens/000000" width="35" height="35"/>
    <sub>JWT</sub>
  </span>
  <span style="display:inline-block; text-align:center; margin:0 15px;">
    <img src="https://cdn.simpleicons.org/openapiinitiative/6BA539" width="35" height="35"/>
    <sub>OpenAPI</sub>
  </span>
  <span style="display:inline-block; text-align:center; margin:0 15px;">
    <img src="https://cdn.simpleicons.org/prisma/2D3748" width="35" height="35"/>
    <sub>Prisma</sub>
  </span>
</p>

---
## 🚀 Instalação e Configuração

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/FreddyBF/notes-api.git
cd notes-api
```

### 2️⃣ Instalar dependências
```bash
npm install
```
### 3️⃣ Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (ajuste conforme seu ambiente):

```env
# Porta da aplicação
PORT=3000

# URL de conexão com o banco de dados (exemplo com PostgreSQL)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

# Chave secreta para JWT
JWT_SECRET="sua_chave_secreta_aqui"
```

### 4️⃣ Gerar cliente Prisma
```bash
npm run generate
```
### 5️⃣ Criar e aplicar migrações
```bash
npm run migrate
```

### 6️⃣ (Opcional) Abrir o Prisma Studio
```bash
npm run studio
```

### 7️⃣ Rodar o servidor em desenvolvimento
```bash
npm run dev
```

### 8️⃣ Build e produção
```bash
npm run build
npm run start
```
---
## 📜 Documentação da API

A API conta com documentação interativa gerada via **Swagger/OpenAPI**.  
Após iniciar o servidor, acesse o link abaixo no seu navegador para explorar os endpoints, parâmetros e exemplos de requisição/resposta:

🔗 **URL local:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

> 💡 Dica: pelo Swagger UI você pode testar as rotas diretamente, sem precisar de ferramentas externas como Postman ou Insomnia.
---

## 🔒 Autenticação

A API utiliza **JWT (JSON Web Token)**.  
Envie o token no header das requisições privadas:

```http
Authorization: Bearer <seu_token_aqui>
```
---
## 📌 Endpoints Principais

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| **POST** | `/api/v1/auth/register` | Criar um novo usuário | ❌ |
| **POST** | `/api/v1/auth/login` | Autenticar e obter token JWT | ❌ |
| **GET** | `/api/v1/notes` | Listar todas as notas do usuário autenticado | ✅ |
| **GET** | `/api/v1/notes/:id` | Obter detalhes de uma nota específica | ✅ |
| **POST** | `/api/v1/notes` | Criar uma nova nota | ✅ |
| **PUT** | `/api/v1/notes/:id` | Atualizar uma nota existente | ✅ |
| **DELETE** | `/api/v1/notes/:id` | Remover uma nota | ✅ |
---
