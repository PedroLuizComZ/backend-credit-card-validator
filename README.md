# 🚀 Express TypeScript Boilerplate 2024

[![Build](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/build.yml)
[![Test](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/test.yml)
[![Code Quality](https://github.com/edwinhern/express-typescript-2024/actions/workflows/code-quality.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/code-quality.yml)
[![Docker Image CI](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml/badge.svg)](https://github.com/edwinhern/express-typescript-2024/actions/workflows/docker-image.yml)

``` code
Hey There! 🙌 
🤾 that ⭐️ button if you like this boilerplate. 
```

## 🌟 Introduction

Welcome to the Express TypeScript Boilerplate 2024 – a streamlined, efficient, and scalable foundation for building powerful backend services with modern tools and practices in Express.js and TypeScript.

## 💡 Motivation

This boilerplate aims to:

- ✨ Reduce setup time for new projects
- 📊 Ensure code consistency and quality
- ⚡  Facilitate rapid development
- 🛡️ Encourage best practices in security, testing, and performance

## 🚀 Features

- 📁 Modular Structure: Organized by feature for easy navigation and scalability
- 💨 Faster Execution with tsx: Rapid TypeScript execution with `tsx` and type checking with `tsc`
- 🌐 Stable Node Environment: Latest LTS Node version in `.nvmrc`
- 🔧 Simplified Environment Variables: Managed with Envalid
- 🔗 Path Aliases: Cleaner code with shortcut imports
- 🔄 Renovate Integration: Automatic updates for dependencies
- 🔒 Security: Helmet for HTTP header security and CORS setup
- 📊 Logging: Efficient logging with `pino-http`
- 🧪 Comprehensive Testing: Setup with Vitest and Supertest
- 🔑 Code Quality Assurance: Husky and lint-staged for consistent quality
- ✅ Unified Code Style: `Biomejs` for consistent coding standards
- 📃 API Response Standardization: `ServiceResponse` class for consistent API responses
- 🐳 Docker Support: Ready for containerization and deployment
- 📝 Input Validation with Zod: Strongly typed request validation using `Zod`
- 🧩 Swagger UI: Interactive API documentation generated from Zod schemas

## 🛠️ Getting Started

### Video Demo

For a visual guide, watch the [video demo](https://github.com/user-attachments/assets/b1698dac-d582-45a0-8d61-31131732b74e) to see the setup and running of the project.

### Step-by-Step Guide

#### Step 1: 🚀 Initial Setup

- Clone the repository: `git clone https://github.com/edwinhern/express-typescript-2024.git`
- Navigate: `cd express-typescript-2024`
- Install dependencies: `npm ci`

#### Step 2: ⚙️ Environment Configuration

- Create `.env`: Copy `.env.template` to `.env`
- Update `.env`: Fill in necessary environment variables

#### Step 3: 🏃‍♂️ Running the Project

- Development Mode: `npm run dev`
- Building: `npm run build`
- Production Mode: Set `.env` to `NODE_ENV="production"` then `npm run build && npm run start`

## 🤝 Feedback and Contributions

We'd love to hear your feedback and suggestions for further improvements. Feel free to contribute and join us in making backend development cleaner and faster!

🎉 Happy coding!




Passo 1: Configuração do Ambiente (Dia 1)
Criar um repositório no GitHub.
Configurar o backend: ✅
Escolher um framework (Node.js com NestJS/Express ou Python com Django/FastAPI). ✅
Criar um banco de dados PostgreSQL e definir a estrutura das tabelas com base nos arquivos CSV.
Criar endpoints REST para:
Carregar os dados dos CSVs no banco.
Gerenciar usuários e respostas dos questionários. ✅
Configurar o frontend: ✅
Criar um projeto Next.js. ✅
Definir as rotas básicas (Login, Seleção de Questionário, Questionário, Admin Panel). ✅

Passo 2: Implementação do Backend (Dia 2)
Criar modelos de banco de dados para armazenar as perguntas, respostas e usuários.
Criar scripts para importar os CSVs e popular o banco.
Implementar os endpoints de API:
Login (com usuários hardcoded). ✅
Listagem de questionários. ✅
Obtenção de perguntas de um questionário com ordenação por prioridade. ✅
Salvamento de respostas dos usuários. ✅
Endpoint para os administradores acessarem respostas.

Passo 3: Implementação do Frontend (Dia 3)
Criar a interface de Login. ✅
Criar a tela de seleção de questionário. ✅
Criar a tela do questionário: ✅
Exibir perguntas dinamicamente. ✅
Validar que respostas não podem estar vazias ou conter apenas espaços em branco.
Permitir seleção múltipla em perguntas “Select all that apply”. ✅
Preencher respostas previamente dadas, se aplicável.

Passo 4: Painel Administrativo e Melhorias (Dia 4)
Criar a tela de administrador: ✅
Exibir lista de usuários e quantos questionários cada um completou.
Criar modal para exibir respostas de um usuário em formato Q: ... A: ....
Melhorias gerais:
Ajustes na UI para garantir usabilidade.
Testar fluxo de usuário (login > responder questionário > admin visualizar respostas).


Passo 5: Testes, Deploy e Entrega (Dia 5)
Testar toda a aplicação, garantindo que os requisitos estão atendidos.
Deploy:
Backend: Subir para um serviço como Render, Railway ou AWS.
Frontend: Deploy no Vercel.
Banco de Dados: PostgreSQL em um serviço como Supabase ou ElephantSQL.
Submeter o código no GitHub e enviar o link do repositório + deployment para os contatos fornecidos.# questionnaire-system-backend
