# ADR 0001: Initial Architecture

## Status

Accepted

## Context

We are bootstrapping a new hyperlocal marketplace platform that connects local businesses with community members. We need to establish an initial architecture that is scalable, maintainable, and allows for rapid feature development while keeping operational complexity low.

## Decision

### 1. TypeScript End-to-End

We use TypeScript across the entire stack (backend, frontend, shared packages) to ensure type safety, improve developer experience, and reduce runtime errors.

### 2. Monorepo with npm Workspaces

We use a monorepo structure managed by npm Workspaces with Turborepo for task orchestration. This allows:

- Shared code across applications via workspace packages
- Single dependency tree reduces conflicts
- Unified scripts and tooling
- Scalable to multiple apps and services

### 3. Next.js App Router for Web

We use Next.js with App Router for the web application because:

- Server Components enable efficient data fetching and reduce JavaScript sent to clients
- App Router is the modern, recommended approach by the Next.js team
- Built-in API routes support (if needed for client-side functionality)
- Strong TypeScript support and developer experience
- Excellent SEO capabilities for marketplace discovery

### 4. NestJS with Fastify for API

We use NestJS as our API framework with Fastify as the HTTP adapter because:

- NestJS provides excellent structure, dependency injection, and TypeScript support
- Fastify is the fastest Node.js framework, ideal for high-throughput scenarios
- Full module system for code organization
- Built-in support for middleware, pipes, guards, and interceptors
- Excellent testing capabilities

### 5. PostgreSQL as Single Source of Truth

We use PostgreSQL as the primary database because:

- Mature, reliable, and battle-tested
- Strong ACID compliance for transactional data
- Rich query capabilities with advanced types
- Excellent Docker support for development

### 6. Prisma ORM

We use Prisma as the ORM/query builder because:

- Type-safe database queries with auto-generated types from schema
- Migrations are version-controlled and reversible
- Clear, readable query API
- Excellent developer experience with IntelliSense
- Good support for complex queries and relationships

### 7. Docker Compose for Local Development

We use Docker Compose for local development to:

- Ensure dev/prod parity
- Avoid "works on my machine" problems
- Simplify onboarding for new developers
- Make CI/CD more predictable

### 8. Modular Monolith, Not Microservices

We start with a modular monolith (single codebase, multiple apps in npm workspaces) instead of microservices because:

- Simpler to reason about and debug
- Easier data consistency across features
- Better performance with shared memory
- Can evolve to microservices later if needed
- Less operational overhead

### 9. GitHub Actions for CI/CD

We use GitHub Actions because:

- Native integration with GitHub repository
- Good free tier for public repositories
- Simple, YAML-based configuration
- Sufficient for current scale

## Architectural Patterns

### Shared Code Organization

- `packages/contracts`: Shared TypeScript types and interfaces
- `packages/typescript-config`: Shared TypeScript configuration
- `packages/eslint-config`: Shared linting configuration
- App-specific code lives in `apps/api` and `apps/web`

### API Design

- RESTful API with JSON responses
- Standard HTTP status codes and error handling
- Validation at controller layer using class-validator
- Request/Response types defined in `@repo/contracts`

### Frontend Architecture

- React functional components with hooks
- Server Components for data fetching (Next.js App Router)
- Client Components for interactive features
- Axios for HTTP requests to backend

## Decisions Not Yet Made (Future Considerations)

### Not Included Now

These will be added when business needs require them:

- **Caching Layer (Redis)**: Not needed until we have read-heavy features or need session management
- **Task Queue (BullMQ)**: Not needed until we have async processing requirements
- **Search Engine (Meilisearch)**: Not needed until marketplace search is a critical feature
- **Authentication & Authorization**: Will be added with user/business registration
- **Payment Processing**: Will be integrated when marketplace transactions begin
- **Real-time Features (WebSockets)**: Will be added if messaging or live updates are needed
- **Kubernetes**: Not needed at current scale; Docker Compose is sufficient

### Why This Matters

This approach allows us to:

- Launch quickly with proven, simple technology
- Add complexity only when it solves a real problem
- Maintain team productivity in early stages
- Scale individual components independently when needed

## Consequences

### Positive

- Clear, type-safe contracts between frontend and backend
- Easy code sharing across applications
- Single dependency version management
- Fast local development feedback loop
- Straightforward CI/CD pipeline
- Easy to understand and modify by new developers

### Negative

- Monorepo requires careful dependency management
- Single PostgreSQL database could become a bottleneck (mitigated by planning)
- Must manage growth carefully before splitting into services

## Related ADRs

None yet.

## References

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [npm Workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)
- [Turborepo Documentation](https://turbo.build/)
