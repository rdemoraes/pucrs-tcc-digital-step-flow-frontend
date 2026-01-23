# Guia de Desenvolvimento Local - Frontend

Este guia cobre a configuração do frontend Digital Step Flow para desenvolvimento local.

## Pré-requisitos

- Node.js v24.13.0
- npm 11.6.3
- Docker e Docker Compose (opcional)

## Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev
```

O frontend estará disponível em http://localhost:3000

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Build para produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa linter
- `npm test` - Executa testes
- `npm run test:coverage` - Executa testes com cobertura

## Desenvolvimento com Docker

```bash
# Build e executa com Docker Compose
docker-compose up -d

# Ver logs
docker-compose logs -f frontend
```

## Estrutura do Projeto

```
src/
├── pages/          # Páginas da aplicação
├── components/     # Componentes reutilizáveis
├── services/       # Serviços de API
├── contexts/       # Contextos React
├── routes/         # Configuração de rotas
└── App.tsx         # Componente principal
```

## Testes

```bash
# Executar testes
npm test

# Com cobertura
npm run test:coverage
```

## Build para Produção

```bash
npm run build
```

A saída estará em `dist/`

