# Vite + Express Monorepo Template

A minimal monorepo template for building a full-stack application with **Vite**, **Express**, and **Bun workspaces**.

The repository is split into independent frontend and backend packages while sharing a single root configuration and dependency installation.

## Stack

* **Bun** — runtime, package manager, and workspace manager
* **Vite** — frontend development and build tooling
* **Express** — backend HTTP server
* **TypeScript** — application language
* **Bun workspaces** — monorepo dependency management

## Project Structure

```text
.
├── apps/
│   ├── client/          # Vite frontend
│   │   ├── src/
│   │   ├── index.html
│   │   └── package.json
│   │
│   └── server/          # Express backend
│       ├── src/
│       └── package.json
│
├── package.json         # Workspace configuration and root scripts
├── bun.lock
└── README.md
```

## Requirements

Install [Bun](https://bun.sh/) before using the template.

Check your installation:

```bash
bun --version
```

## Getting Started

Clone the repository:

```bash
git clone <repository-url> my-app
cd my-app
```

Install all workspace dependencies from the repository root:

```bash
bun install
```

Start the development environment:

```bash
bun run dev
```

This starts the Vite client and Express server through the root workspace scripts.

## Workspace Commands

Run a command for a specific workspace:

```bash
bun --filter client dev
```

```bash
bun --filter server dev
```

You can also run commands directly from an application directory:

```bash
cd apps/client
bun run dev
```

```bash
cd apps/server
bun run dev
```

## Adding Dependencies

Install a dependency for the client:

```bash
bun add <package> --cwd apps/client
```

Install a dependency for the server:

```bash
bun add <package> --cwd apps/server
```

For dependencies shared by the workspace itself, install them at the root:

```bash
bun add -d <package>
```

Avoid installing application-specific dependencies at the root just because Bun makes it convenient. Keep dependencies in the workspace that actually uses them.

## Development

The intended development setup is:

```text
Browser
   │
   ▼
Vite dev server
   │
   │ API requests
   ▼
Express server
```

The frontend and backend remain separate applications, but are managed from the same repository.

Vite handles frontend development and production builds. Express handles API routes and server-side logic.

## Building

Build the frontend:

```bash
bun --filter client build
```

Build the backend:

```bash
bun --filter server build
```

Or use the root build script if the template provides one:

```bash
bun run build
```

## Production

The template does not impose a specific deployment platform.

A typical deployment consists of:

1. Installing dependencies with Bun.
2. Building the Vite application.
3. Building the Express application.
4. Serving the frontend using your chosen static hosting setup.
5. Running the Express application as the API server.

Environment-specific configuration should be supplied through environment variables rather than committed to the repository.

## Adding Another Workspace

Additional applications or packages can be added under the workspace directories.

For example:

```text
apps/
├── client/
├── server/
└── worker/
```

Or shared packages:

```text
packages/
├── config/
├── types/
└── utils/
```

Add the corresponding workspace paths to the root `package.json` if they are not already covered by the workspace configuration.

## Why Bun Workspaces?

The repository uses Bun workspaces to keep the project as one repository without turning the frontend and backend into one application.

Each workspace has its own:

* `package.json`
* source code
* dependencies
* scripts
* build configuration

The root manages the repository as a whole.

This keeps the structure simple while still allowing the client and server to evolve independently.

## License

Add a license appropriate for your project.
