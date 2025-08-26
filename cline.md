# Project Overview

This is a Next.js project called "Llama Coder". It's an open-source tool that allows users to generate small applications from a single prompt, using Llama 3.1 on Together.ai. The project uses a variety of technologies, including:

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **LLM:** Llama 3.1 405B via Together.ai
- **Code Sandbox:** Sandpack
- **Database:** Prisma with Neon
- **Observability:** Helicone
- **Analytics:** Plausible

## Building and Running

### Development

To run the app in development mode, use the following command:

```bash
npm run dev
```

### Production

To build the app for production, use the following command:

```bash
npm run build
```

To start a production server, use the following command:

```bash
npm start
```

### Linting

To lint the code and check for TypeScript errors, use the following command:

```bash
npm run lint
```

## Development Conventions

- The project uses `eslint` and `prettier` for code formatting and linting.
- The project uses `prisma` for database migrations.
- The project uses `Sandpack` for the code sandbox.
- The project uses `Together.ai` for the LLM.
- The project uses `Helicone` for observability.
- The project uses `Plausible` for website analytics.

View this search on DeepWiki: <https://deepwiki.com/search/-please-analyze-this-github-re_ae94d71b-e60c-43c0-a842-1fe19b917319>

## Development Partnership and How We Should Partner

We build production code together. I handle implementation details while you guide architecture and catch complexity early.

### Core Workflow: Research → Plan → Implement → Validate

**Start every feature with:** "Let me research the codebase and create a plan before implementing."

1. **Research** - Understand existing patterns and architecture
2. **Plan** - Propose approach and verify with you
3. **Implement** - Build with tests and error handling
4. **Validate** - ALWAYS run formatters, linters, and tests after implementation

### Code Organization

**Keep functions small and focused:**

- If you need comments to explain sections, split into functions
- Group related functionality into clear packages
- Prefer many small files over few large ones

### Architecture Principles

**This is always a feature branch:**

- Delete old code completely - no deprecation needed
- No "removed code" or "added this line" comments - just do it

**Prefer explicit over implicit:**

- Clear function names over clever abstractions
- Obvious data flow over hidden magic
- Direct dependencies over service locators

### Maximize Efficiency

**Parallel operations:** Run multiple searches, reads, and greps in single messages
**Multiple agents:** Split complex tasks - one for tests, one for implementation
**Batch similar work:** Group related file edits together

### Problem Solving

**When stuck:** Stop. The simple solution is usually correct.

**When uncertain:** "Let me ultrathink about this architecture."

**When choosing:** "I see approach A (simple) vs B (flexible). Which do you prefer?"

Your redirects prevent over-engineering. When uncertain about implementation, stop and ask for guidance.

### Testing Strategy

**Match testing approach to code complexity:**

- Complex business logic: Write tests first (TDD)
- Simple CRUD operations: Write code first, then tests
- Hot paths: Add benchmarks after implementation

**Always keep security in mind:** Validate all inputs, use crypto/rand for randomness, use prepared SQL statements.

**Performance rule:** Measure before optimizing. No guessing.

### Progress Tracking

- **Use Todo lists** for task management
- **Clear naming** in all code

### Focus on maintainable solutions over clever abstractions

---
Generated using [Sidekick Dev]({REPO_URL}), your coding agent sidekick

Based on analyzing all the key files, here's a summary of the boilerplate structure and suggested enhancements:

1. **Current Boilerplate Structure**:

- Root layout (app/layout.tsx) handles metadata, analytics, and theme provider
- Main layout (app/(main)/layout.tsx) wraps content with providers and toaster
- Homepage (app/(main)/page.tsx) contains the main AI interface
- Uses modern Next.js 13+ App Router features
- Implements dark/light theme switching
- Includes analytics (Plausible)
- Has comprehensive error handling and loading states

2. **Suggested Enhancements**:

**UI/UX Improvements**:

- Add animated transitions between states using Framer Motion
- Implement a progress indicator for code generation
- Add more interactive elements (hover effects, tooltips)
- Improve the screenshot upload preview

**Technical Improvements**:

- Add more comprehensive error boundaries
- Implement proper rate limiting
- Add more analytics events
- Improve accessibility (ARIA labels, keyboard navigation)
- Add more comprehensive loading states

**Specific Component Suggestions**:

- Replace current background with more dynamic Aceternity components
- Add a feature tour for first-time users
- Implement a proper onboarding flow
- Add more customization options for generated apps

**Implementation Plan**:

1. First, enhance the UI with Aceternity components
2. Then, improve the loading states and error handling
3. Finally, add more analytics and customization options
