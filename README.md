# Digital Step Flow - Frontend

Frontend React da plataforma Digital Step Flow.

## Stack Tecnológico

- React 18 com TypeScript
- Vite para build
- React Router para navegação
- TanStack Query para busca de dados
- Tailwind CSS para estilização
- React Hook Form + Zod para validação

## Desenvolvimento Local

Para instruções detalhadas de desenvolvimento local, consulte [docs/local-development.md](./docs/local-development.md).

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Executar testes
npm test
```

## Estrutura do Projeto

```
src/
├── pages/          # Páginas da aplicação
│   ├── auth/      # Páginas de autenticação
│   ├── dashboard/ # Dashboard
│   ├── onboarding/# Onboarding
│   └── subscription/ # Assinaturas
├── services/      # Serviços de API
├── contexts/      # Contextos React
├── routes/        # Configuração de rotas
└── App.tsx        # Componente principal
```

## Kubernetes

Os manifests Kubernetes estão em `k8s/` e incluem:
- Deployment
- Service
- Kustomization (usa remote base do repositório principal)

## Argo CD

A application do Argo CD está em `argocd/application.yaml` e aponta para este repositório.

## Build Docker

```bash
# Build local
docker buildx bake -f docker-bake.hcl --load

# Build com versão específica
docker buildx bake -f docker-bake.hcl --load \
  --set frontend.args.FRONTEND_IMAGE_VERSION=1.0.0 \
  --set frontend.args.BASE_IMAGE_VERSION=1.0.0
```

## Versionamento

Este projeto segue [Semantic Versioning 2.0.0](https://semver.org/).

Para criar uma release:
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## CI/CD

O pipeline CI/CD constrói e publica automaticamente as imagens quando:
- Um PR é mergeado para `main` ou `develop`
- Uma tag semântica é criada (ex: `v1.0.0`)

Após o build bem-sucedido, os manifests Kubernetes são atualizados automaticamente com a nova tag da imagem.

## Documentação

- [Desenvolvimento Local](./docs/local-development.md)
- [Versionamento](./docs/versioning.md)
