# MonoRepo — npm workspaces monorepo

Welcome. This repository is a **small, teaching-friendly monorepo**: one **React + Vite** application plus **shared packages** for UI, utilities, and two feature modules. It follows the same **layout principles** as larger examples such as [ride-share](https://github.com/diagomike/ride-share/tree/main/apps): **`apps/*`** for runnable apps, **`packages/*`** for shared code, and **workspace package names** (`@repo/...`) instead of cross-folder relative imports.

**Full detail (instructors, grading, workflow):** see **[DOCUMENTATION.md](./DOCUMENTATION.md)**.

---

## Architecture overview

| Area | Contents |
|------|-----------|
| **Frontend** | `apps/system-app` — Vite, React 18, composes features on one page. |
| **Shared UI** | `packages/ui-components` (`@repo/ui-components`) — `Button`, `Card`, `Badge`. |
| **Shared utilities** | `packages/utils` (`@repo/utils`) — `formatDate`, `apiHelper`, `isValidEmail`. |
| **Features** | `packages/feature-x` (`LoginFeature`), `packages/feature-y` (`DashboardFeature`). |
| **Tooling** | **npm workspaces** at the repo root (no Turborepo required for the demo). |

**Design rules**

1. Apps live under **`apps/*`**; reusable code lives under **`packages/*`**.
2. Packages are **scoped** as `@repo/...` so they are clearly internal.
3. Features depend on **`@repo/ui-components`** and **`@repo/utils`** only—not on each other.

---

## Repository layout

```
├── apps/
│   └── system-app/           # Host app (Vite + React)
├── packages/
│   ├── ui-components/        # @repo/ui-components
│   ├── utils/                # @repo/utils
│   ├── feature-x/            # @repo/feature-x
│   └── feature-y/            # @repo/feature-y
├── package.json              # workspaces
├── README.md                 # This file
└── DOCUMENTATION.md          # Collaboration & instructor guide
```

---

## Team & collaboration

Work is split by **package boundaries** so teammates can open **pull requests** without constant merge conflicts.

| Role | GitHub | Focus |
|------|--------|--------|
| Project lead | **[@biruk-1](https://github.com/biruk-1)** | Monorepo scaffold, `main`, merging PRs, host app shell, documentation. |
| Collaborator 1 | **[@BiileyX](https://github.com/BiileyX)** | `@repo/utils`, `@repo/feature-x` (e.g. validation, login). |
| Collaborator 2 | **[@jowrlds](https://github.com/jowrlds)** | `@repo/ui-components`, `@repo/feature-y` (e.g. `Badge`, dashboard). |

**Typical flow**

1. `git checkout main` && `git pull`
2. `git checkout -b feature/<short-description>`
3. Change only the folders agreed for your task
4. `git push -u origin feature/<short-description>` and open a **PR** into `main`
5. After merge, everyone updates: `git pull origin main`

More detail: **[DOCUMENTATION.md §5–6](./DOCUMENTATION.md#5-the-three-collaborators--roles-and-ownership)**.

---

## What you see when you run the app

- **Login (Feature X):** email/password form, shared **Button**, validation via **`isValidEmail`**, demo **GET** via **`apiHelper`**.
- **Dashboard (Feature Y):** sample metrics in **Cards**, **Badges** for value tiers, dates via **`formatDate`**.

---

## Install & run

From the **repository root**:

```bash
npm install
npm start
```

Open the URL Vite prints (often **http://localhost:5173**).

**Tests** (workspace utilities)

```bash
npm test
```

**Production build**

```bash
npm run build -w system-app
```

**Preview build**

```bash
npm run preview -w system-app
```

---

## How packages interact

- **`system-app`** lists `@repo/feature-x` and `@repo/feature-y` in `package.json` and renders both features in `App.jsx`.
- **`@repo/feature-x`** / **`@repo/feature-y`** list `@repo/ui-components` and `@repo/utils`.
- After `npm install`, the workspace linker resolves imports like `import { Button } from "@repo/ui-components"` from the local package copy.

---

## Comparison to the ride-share reference

| ride-share | This repo |
|------------|-----------|
| pnpm + Turborepo, multiple Next.js apps | npm workspaces, one Vite React app |
| `@repo/ui` + Tailwind v4 | `@repo/ui-components` with inline styles |
| `@repo/api`, `@repo/db` | Not included; demo HTTP only via `apiHelper` |

You can grow this repo toward the same shape by adding **`packages/api`**, **`packages/db`**, and shared **eslint/tsconfig** packages—same `packages/*` convention.

---

## Reference links

- [ride-share — `apps/`](https://github.com/diagomike/ride-share/tree/main/apps)
- [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)

---

## License / course use

Use and adapt for coursework as required by your institution. For authorship and review expectations, see **DOCUMENTATION.md**.
