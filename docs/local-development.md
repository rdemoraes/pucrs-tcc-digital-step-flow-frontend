# Guia de Desenvolvimento Local - Frontend

Este guia cobre a configuração do frontend Digital Step Flow para desenvolvimento local, incluindo uso com **Docker Compose** (stack completa no repositório do backend).

## Pré-requisitos

- Node.js v24.13.0
- npm 11.6.3
- Docker e Docker Compose (opcional; usado na stack do backend)

---

## Opção 1: Docker Compose (stack completa no backend)

O repositório do **backend** inclui um Docker Compose com backend, frontend, Postgres, Redis e observabilidade (Prometheus, Grafana, Loki, Tempo). Para usar:

1. Clone o frontend **ao lado** do backend:
   ```bash
   # Exemplo: mesmo nível do backend
   git/
   ├── pucrs-tcc-digital-step-flow-backend/
   └── pucrs-tcc-digital-step-flow-frontend/
   ```

2. No repositório do **backend**:
   ```bash
   docker compose up -d
   ```

3. Acesse:
   - **Frontend:** http://localhost:3000  
   - **Backend API:** http://localhost:8080  
   - **Grafana:** http://localhost:3001  

Detalhes (variáveis, comandos, backend-only) estão em [Backend – Desenvolvimento Local](https://github.com/raphaelmoraes/pucrs-tcc-digital-step-flow-backend/blob/main/docs/local-development.md).

---

## Opção 2: Desenvolvimento local com Node (recomendado para dev do frontend)

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará em http://localhost:3000

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Para usar com o backend em Docker Compose (no repo do backend):

```bash
docker compose -f docker-compose.backend-only.yml up -d   # no repo do backend
npm run dev   # neste repo (frontend)
```

O frontend em `npm run dev` usa o backend em http://localhost:8080.

### Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento (Vite HMR)
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter
- `npm test` - Executa testes
- `npm run test:coverage` - Executa testes com cobertura

---

## Estrutura do Projeto

```
src/
├── pages/          # Páginas da aplicação
├── components/    # Componentes reutilizáveis
├── services/      # Serviços de API
├── contexts/      # Contextos React
├── routes/        # Configuração de rotas
└── App.tsx        # Componente principal
```

---

## Testes

```bash
# Executar testes
npm test

# Com cobertura
npm run test:coverage
```

---

## Build para Produção

```bash
npm run build
```

A saída estará em `dist/`
