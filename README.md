# Marketplace Hyperlocal

A hyperlocal marketplace platform connecting local businesses with community members.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Available Commands](#available-commands)
- [Project Structure](#project-structure)
- [Branch Strategy](#branch-strategy)
- [Contributing](#contributing)
- [Future Decisions](#future-decisions)

## 🎯 Overview

Marketplace Hyperlocal is a platform that enables:

- Local businesses to list and manage their services/products
- Community members to discover and support local offerings
- Direct connections between merchants and customers

This repository contains a monorepo structure using pnpm workspaces and Turborepo to manage multiple applications (API, Web) and shared packages.

## 🏗️ Architecture

### Tech Stack

- **Runtime**: Node.js 20 LTS
- **Monorepo**: pnpm workspaces + Turborepo
- **Frontend**: Next.js (App Router) + React
- **Backend**: NestJS + Fastify
- **Database**: PostgreSQL 17
- **ORM**: Prisma
- **Language**: TypeScript (strict mode)
- **Testing**: Jest
- **Linting**: ESLint
- **Code Formatting**: Prettier

### Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│               Marketplace Hyperlocal                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌──────────────┐           ┌──────────────────┐  │
│  │  apps/web    │           │   apps/api       │  │
│  │  Next.js     │◄─────────►│   NestJS/Fastify │  │
│  │  React       │   HTTP    │   Prisma         │  │
│  └──────────────┘           └──────────────────┘  │
│         │                            │             │
│         └────────────┬───────────────┘             │
│                      │                             │
│  ┌──────────────────────────────────────────────┐ │
│  │          PostgreSQL Database                  │ │
│  │          (Docker Compose)                     │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌──────────────────────────────────────────────┐ │
│  │     Shared Packages (@repo/*)                 │ │
│  │  - contracts (types & interfaces)             │ │
│  │  - typescript-config                          │ │
│  │  - eslint-config                              │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

For detailed architecture decisions, see [ADR 0001](./docs/adr/0001-arquitetura-inicial.md).

## 📋 Prerequisites

- **Node.js**: 20.18.0 LTS (specified in [.nvmrc](.nvmrc))
- **pnpm**: 9.4.0 or later
- **Docker & Docker Compose**: For running PostgreSQL locally
- **Git**: For version control

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Bountiful-Labs/marketplace-hyperlocal.git
cd marketplace-hyperlocal
```

### 2. Use Correct Node Version

```bash
nvm install
nvm use
# or manually: nvm use 20.18.0
```

### 3. Install pnpm

```bash
npm install -g pnpm@9.4.0
# or: corepack enable pnpm
```

### 4. Install Dependencies

```bash
pnpm install --frozen-lockfile
```

### 5. Set Up Environment Variables

```bash
cp .env.example .env.local
# Edit .env.local as needed (defaults are suitable for development)
```

## 🔧 Environment Variables

### Root Level (.env.local)

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/marketplace_dev

# API
API_PORT=3001
API_HOST=0.0.0.0
NODE_ENV=development

# Web
NEXT_PUBLIC_API_URL=http://localhost:3001
```

**Note**: Use `.env.local` for local development. Never commit actual secrets to the repository.

## 🏃 Running the Project

### Prerequisites: Start PostgreSQL

```bash
# Start PostgreSQL in Docker
pnpm db:up

# Wait a few seconds for the database to be ready
# You can verify with: docker compose ps
```

### Development Mode

Start all applications in parallel:

```bash
pnpm dev
```

This starts:

- **API**: http://localhost:3001
- **Web**: http://localhost:3000

**Test the setup**:

1. Open http://localhost:3000 in your browser
2. You should see the Marketplace Hyperlocal homepage
3. The page displays API health status if the connection is working

### Individual Application Development

Start specific applications:

```bash
# Start only the API
pnpm dev --filter=api

# Start only the web app
pnpm dev --filter=web
```

### Production Build

```bash
pnpm build
```

### Start Production Build

```bash
pnpm start
```

### Stop PostgreSQL

```bash
pnpm db:down
```

## 📚 Available Commands

### Root Level Scripts

| Command             | Description                                |
| ------------------- | ------------------------------------------ |
| `pnpm dev`          | Start all applications in development mode |
| `pnpm build`        | Build all applications and packages        |
| `pnpm lint`         | Run ESLint across the monorepo             |
| `pnpm typecheck`    | Run TypeScript type checking               |
| `pnpm test`         | Run all tests                              |
| `pnpm format`       | Format code with Prettier                  |
| `pnpm format:check` | Check code formatting without changes      |
| `pnpm db:up`        | Start PostgreSQL with Docker Compose       |
| `pnpm db:down`      | Stop PostgreSQL                            |
| `pnpm db:migrate`   | Run Prisma migrations                      |

### API-Specific Commands (apps/api)

```bash
pnpm --filter=api dev          # Development server
pnpm --filter=api build        # Build for production
pnpm --filter=api start        # Start production server
pnpm --filter=api lint         # Lint code
pnpm --filter=api test         # Run tests
pnpm --filter=api test:cov     # Run tests with coverage
pnpm --filter=api db:migrate   # Run database migrations
```

### Web-Specific Commands (apps/web)

```bash
pnpm --filter=web dev          # Development server
pnpm --filter=web build        # Build for production
pnpm --filter=web start        # Start production server
pnpm --filter=web lint         # Lint code
pnpm --filter=web test         # Run tests
```

## 📁 Project Structure

```
marketplace-hyperlocal/
├── .github/
│   ├── workflows/
│   │   └── ci.yml                      # GitHub Actions CI pipeline
│   └── pull_request_template.md        # PR template
├── apps/
│   ├── api/                            # NestJS API application
│   │   ├── src/
│   │   │   ├── health/                 # Health check endpoint
│   │   │   ├── prisma/                 # Prisma setup
│   │   │   ├── app.module.ts           # Root module
│   │   │   └── main.ts                 # Entry point
│   │   ├── prisma/
│   │   │   └── schema.prisma           # Database schema
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web/                            # Next.js web application
│       ├── src/
│       │   └── app/
│       │       ├── page.tsx            # Homepage
│       │       └── layout.tsx          # Root layout
│       ├── package.json
│       ├── tsconfig.json
│       └── next.config.js
├── packages/
│   ├── contracts/                      # Shared types & interfaces
│   │   └── src/
│   │       └── index.ts
│   ├── eslint-config/                  # Shared ESLint rules
│   │   └── eslint.config.js
│   └── typescript-config/              # Shared TypeScript settings
│       ├── tsconfig.json
│       ├── tsconfig.build.json
│       └── tsconfig.node.json
├── docs/
│   └── adr/
│       └── 0001-arquitetura-inicial.md # Architecture decision record
├── infra/
│   └── docker/                         # Docker-related configurations
├── .editorconfig                       # Editor settings
├── .env.example                        # Environment variables template
├── .gitignore                          # Git ignore rules
├── .nvmrc                              # Node version specification
├── .prettierrc                         # Prettier configuration
├── docker-compose.yml                  # Local PostgreSQL setup
├── package.json                        # Root package configuration
├── pnpm-workspace.yaml                 # Workspace configuration
├── turbo.json                          # Turborepo configuration
└── README.md                           # This file
```

## 🌿 Branch Strategy

### Main Branches

- **`main`**: Integration and staging branch. PRs to main trigger CI.
- **`production`**: Release branch for deployed code. Never develop directly here.

### Feature Branches

Create feature branches from `main`:

- `feat/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `chore/task-description` - Maintenance and setup tasks

### Pull Request Workflow

1. Create a branch from `main`: `git checkout -b feat/your-feature`
2. Make your changes and commit with [Conventional Commits](#conventional-commits)
3. Push to remote: `git push origin feat/your-feature`
4. Open a Pull Request to `main`
5. Wait for CI to pass and code review approval
6. Merge to `main`

### Release Process

To release to production:

1. Ensure `production` is up to date with `main`
2. Create a PR from `main` to `production`
3. After approval and testing, merge to `production`

## 🤝 Contributing

### Conventional Commits

Use [Conventional Commits](https://www.conventionalcommits.org/) for all commits:

```
<type>(<scope>): <description>

<body>

<footer>
```

**Types**:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation updates
- `style`: Code style changes (no logic change)
- `refactor`: Code refactoring (no new feature)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependencies

**Examples**:

```bash
git commit -m "feat(api): add user registration endpoint"
git commit -m "fix(web): resolve navbar styling issue"
git commit -m "docs: update installation instructions"
git commit -m "chore: bump dependencies"
```

### Code Quality Standards

Before committing:

```bash
# Format code
pnpm format

# Check linting
pnpm lint

# Run type checking
pnpm typecheck

# Run tests
pnpm test
```

### Pull Request Guidelines

1. Keep PRs focused on a single feature or fix
2. Use the [PR template](.github/pull_request_template.md)
3. Ensure CI passes
4. Maintain test coverage
5. Update documentation as needed
6. Request review from at least one maintainer

## 🚀 Future Decisions

These technologies/features are planned for future integration based on business needs:

- **Caching Layer (Redis)**: For session management and read-heavy features
- **Task Queue (BullMQ)**: For asynchronous processing (emails, notifications)
- **Search Engine (Meilisearch)**: For advanced marketplace search capabilities
- **Authentication & Authorization**: User and business authentication flows
- **Payment Processing**: Integration with payment providers
- **Real-time Features**: WebSocket support for messaging and live updates
- **Kubernetes**: Container orchestration when scaling to multiple instances
- **API Versioning**: Structured API versioning strategy
- **Analytics**: Business intelligence and usage tracking
- **Content Delivery**: CDN integration for media and assets

See [ADR 0001](./docs/adr/0001-arquitetura-inicial.md#decisions-not-yet-made-future-considerations) for rationale.

## 📖 Documentation

- **Architecture**: [docs/adr/](./docs/adr/) - Architecture Decision Records
- **API**: API documentation will be available at `/api/docs` in development (Swagger)
- **Contributing**: See [Contributing](#contributing) section above

## 🐛 Troubleshooting

### "postgres connection refused"

- Ensure Docker Compose is running: `pnpm db:up`
- Check PostgreSQL is healthy: `docker compose ps`
- Verify DATABASE_URL in `.env.local`

### "Module not found @repo/*"

- Run `pnpm install` again
- Check pnpm-workspace.yaml for correct package paths
- Clear cache: `rm -rf node_modules .pnpm-store`

### Port already in use

- Change API_PORT or NEXT_PUBLIC_API_URL in `.env.local`
- Kill process: `lsof -i :3000` or `lsof -i :3001`

### Type errors in IDE

- Restart TypeScript server (Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")
- Ensure `pnpm install` completed successfully

## 📝 License

MIT

## 🤵 Support

For questions, issues, or suggestions:

1. Check existing [GitHub Issues](https://github.com/Bountiful-Labs/marketplace-hyperlocal/issues)
2. Create a new issue with detailed description
3. Contact the team on Slack or email

---

**Happy coding!** 🚀
