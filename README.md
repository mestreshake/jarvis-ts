# Jarvis – Sistema de Gestão de Visitantes

![Stark Tower Logo](./src/assets/stark_logo.png)

## Visão Geral

O **Jarvis** é um sistema web moderno para controle de visitantes na Stark
Tower, desenvolvido em React + TypeScript com Material-UI. Ele permite gerenciar
entradas, saídas, histórico e autenticação de usuários de forma intuitiva e
segura.

---

---

## Funcionalidades Principais

- **Login Seguro**
  - Tela de login moderna, responsiva e animada.
  - Proteção de rotas via autenticação.

- **Dashboard de Visitantes**
  - Visualização em tempo real de visitantes ativos.
  - Cadastro de novas visitas.
  - Registro de saída de visitantes.
  - Histórico detalhado de entradas/saídas por visitante e por CPF.

- **Logs e Auditoria**
  - Visualização dos logs de acesso e ações.
  - Listagem virtualizada para performance.

- **Design e UX**
  - Interface responsiva (desktop/mobile).
  - Animações suaves e layout profissional.
  - Tema customizado Stark Tower.

---

## Como Usar

### 1. Login

- Acesse `/login`.
- Use suas credenciais fornecidas pelo administrador.
- Caso esqueça, peça o reset ao responsável.

### 2. Cadastro de Visitante

- Após logar, vá para a aba **Visitantes**.
- Clique em "Novo Visitante".
- Preencha nome, CPF, sala e responsável.
- Clique em **Cadastrar**.

### 3. Registrar Saída

- Na lista de visitantes ativos, clique em "Registrar Saída" ao lado do
  visitante.
- Confirme a ação.

### 4. Consultar Histórico

- Use a aba **Histórico** para visualizar todas as entradas e saídas de um
  visitante.

### 5. Visualizar Logs

- Acesse a aba **Logs** para ver todas as ações recentes no sistema.

---

## Tecnologias Utilizadas

- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Material-UI (MUI)](https://mui.com/)
- [React Router](https://reactrouter.com/)
- Context API para autenticação e dados
- Virtualização de listas para performance

---

## Como Rodar Localmente

1. **Pré-requisitos**
   - Node.js 18+
   - Yarn ou npm
   - Yarn ou npm

2. **Clonar o repositório**

   ```bash
   git clone https://github.com/mestreshake/jarvis-ts.git
   cd jarvis-ts
   ```

3. **Instalar dependências**

   ```bash
   yarn install
   # ou
   npm install
   ```

4. **Rodar o projeto**

   ```bash
   yarn dev
   # ou
   npm run dev
   ```

   O app estará disponível em `http://localhost:3000/jarvis` (ou porta
   configurada).

5. **Login de Teste**
   - Usuário padrão: `jarvis`
   - Senha padrão: `123`
   - Usuário alternativo 1: `stark`
   - Senha alternativa 1: `456`  
     (Esses valores podem ser alterados no contexto de autenticação.)

---

## Estrutura de Pastas

```
├── src/
│   ├── pages/           # Páginas principais (Login, Dashboard)
│   ├── components/      # Componentes reutilizáveis
│   ├── context/         # Providers de contexto (Auth, Jarvis)
│   ├── hooks/           # Hooks customizados (useAuth, useJarvis)
│   ├── domain/          # Tipos e interfaces de domínio
│   └── ...
```
