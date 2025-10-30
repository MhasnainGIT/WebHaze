# WebHaze — Architecture Overview

This document summarizes the high-level architecture, component boundaries, deployment targets, and design decisions for WebHaze.

1. Goals
- API-first, microservice-ready architecture
- Config-driven design system as a single source of truth for templates, tokens, fonts, and region overrides
- Secure multi-tenancy with data isolation
- Cloud-hosting friendly with auto-scaling
- Easy integration of third-party analytics (Microsoft Clarity) and future AI features

2. High-level components

- API Gateway / Load Balancer — Routes requests, enforces rate limits and auth.
- Auth Service — Handles registration/login, social auth, password reset, and JWT/session management.
- CMS Service — Stores site/page content, templates, config, media references.
- E-commerce Service — Catalog, cart, orders, payments, webhooks.
- Analytics Service — Aggregation and policy for injecting scripts (Clarity), storing events (optional), and privacy controls.
- Asset Service / CDN — Stores user uploads and optimized assets (S3-compatible + CDN).
- Worker Queue — Asynchronous tasks: image optimization, sitemap generation, export, analytics aggregation. (BullMQ/Redis)
- Admin / Billing — Tenant management, billing integration, role management.

3. Data storage
- Primary DB: PostgreSQL for relational data (users, tenants, pages, products).
- Cache / Queue: Redis for sessions, rate-limiting, and job queues.
- Object Storage: S3-compatible storage for images, generated assets.

4. Multi-tenancy approach
- Shared-schema multi-tenancy with tenant_id on primary tables (good balance for resource usage).
- Option to opt for schema-per-tenant for enterprise customers.
- Tenant config includes design tokens overrides, analytics opt-in, region settings.

5. Config-driven design system
- Single source of truth: `config/design-tokens.schema.json` + tenant-specific overrides.
- Templates are JSON/YAML files describing component tree, content placeholders, and token references.
- Runtime: renderer resolves tokens by precedence: tenant region overrides -> tenant overrides -> template defaults -> global defaults.

6. Analytics & Microsoft Clarity
- Injection: server-side template renderer inserts Clarity script snippet when tenant allows it.
- Privacy: tenant-level toggle, opt-out, and consent scripts supported. Clarity key stored per-tenant.

7. Deployment & scaling
- Containerized services (Docker). Orchestrate via Kubernetes, or use managed container apps for less ops.
- Horizontal autoscaling for frontend and stateless services. Workers scale based on queue length.
- CI/CD pipelines build images, run tests, and deploy to staging/production.

8. Security
- TLS by default (Let's Encrypt or managed certs on cloud load balancer).
- Data encryption at rest on object storage and DB-level encryption for sensitive fields.
- RBAC implemented in Auth/ACL middleware for site-level roles (Admin, Editor, Contributor).

9. Future extensibility
- AI features integrated as separate microservices (generative content, recommendations), invoking async workers for heavy tasks.

10. Minimal proof-of-concept path
1. Implement a single Node.js API service and a React-based editor in `client/`.
2. Use Postgres (local docker) and Redis for queue; implement one worker for image optimization.
3. Provide a sample template and demonstrate Clarity script injection at render time.
