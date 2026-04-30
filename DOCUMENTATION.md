# MonoRepo — Project & collaboration documentation

This document is for **instructors**, **new contributors**, and **the team**. It explains what the system is, how it is structured, how three collaborators work together on GitHub, and what a reviewer should check.

**Repository:** [github.com/biruk-1/MonoRepo](https://github.com/biruk-1/MonoRepo)

---

## 1. What this project is

This is a **modular monorepo**: one place in Git that holds several **npm packages** and one **React application**. The goal is to practice how real teams split work:

- **Apps** (`apps/*`) are runnable products (here: a single Vite + React host).
- **Packages** (`packages/*`) are reusable libraries (UI, utilities, feature modules).

Everything is wired with **npm workspaces** so packages depend on each other by **name** (for example `@repo/utils`), not by fragile relative paths like `../../../`.

The **reference architecture** we align with is the [ride-share monorepo](https://github.com/diagomike/ride-share/tree/main/apps): many apps or one app, but always **shared packages** and clear boundaries.

---

## 2. What the running product looks like

When you run the host app (`npm start` from the repo root), you see **one page** that composes two feature areas:

1. **Login (Feature X)**  
   - Simple email and password fields and a **Sign in** button from `@repo/ui-components`.  
   - Uses `@repo/utils`: `formatDate`, `apiHelper`, and **`isValidEmail`** so invalid emails get a clear message before any network call.  
   - On success, performs a demo **GET** via `apiHelper` to JSONPlaceholder and shows a short status message.

2. **Dashboard (Feature Y)**  
   - A grid of **cards** (`Card` from `@repo/ui-components`) backed by **sample in-memory data**.  
   - Each row shows a **value** and **last updated** date formatted with `formatDate`.  
   - **Badges** (`Badge`) show a tier label (High / Mid / Standard) based on the numeric value.

There is **no** shared Express API or database in this repo yet; that is intentional to keep the exercise small. The same **folder layout** can later host `@repo/api` and `@repo/db` like the ride-share tutorial.

---

## 3. Repository layout (what lives where)

```
monorepo-project/
├── apps/
│   └── system-app/          # Vite + React; depends on feature packages
├── packages/
│   ├── ui-components/       # @repo/ui-components — Button, Card, Badge
│   ├── utils/               # @repo/utils — formatDate, apiHelper, isValidEmail
│   ├── feature-x/           # @repo/feature-x — LoginFeature
│   └── feature-y/           # @repo/feature-y — DashboardFeature
├── package.json             # workspaces: ["packages/*", "apps/*"]
├── README.md                # Quick start + team overview
└── DOCUMENTATION.md         # This file
```

---

## 4. Package responsibilities

| Package | Name on npm (workspace) | Responsibility |
|---------|------------------------|----------------|
| UI | `@repo/ui-components` | Reusable presentational React components (inline styles). |
| Utilities | `@repo/utils` | Pure JS helpers: dates, HTTP wrapper, validation. |
| Feature X | `@repo/feature-x` | Login UI; uses UI + utils. |
| Feature Y | `@repo/feature-y` | Dashboard UI; uses UI + utils. |
| Host app | `system-app` | Installs features; mounts them on one route. |

**Dependency rule:** features may depend on `@repo/ui-components` and `@repo/utils`. They should **not** depend on each other. The app depends on the features.

---

## 5. The three collaborators — roles and ownership

This team uses **one GitHub repository** and **pull requests**. Work is split so people rarely edit the same files at once.

| Person | GitHub | Typical ownership | Examples of contribution |
|--------|--------|-------------------|----------------------------|
| **Project lead (PM)** | `biruk-1` | Repo setup, `main`, merging PRs, `apps/system-app` shell, root docs | Initial monorepo scaffold; merge PR #1 and PR #2; keep README accurate. |
| **Collaborator 1** | `BiileyX` | `@repo/utils`, `@repo/feature-x` | `isValidEmail`, login validation, exports from `utils`. |
| **Collaborator 2** | `jowrlds` | `@repo/ui-components`, `@repo/feature-y` | `Badge` component, dashboard tiers and layout. |

**Important for grading:** GitHub shows **commit authors** on feature branches. **Merge commits** on `main` show the person who clicked “Merge” (usually the PM). That is normal: authorship of the *feature work* is on the commits that were merged; authorship of *integration* is on the merge commit.

---

## 6. How we collaborate on GitHub (workflow)

1. **Default branch:** `main` — always deployable / demo-ready after merges.
2. **Feature branches:** one branch per piece of work (for example `feature/teammate-1-utils-login`, `feature/teammate-2-ui-dashboard`).
3. **Pull request (PR):** each branch opens a PR into `main`. Description should say *what* changed and *which packages* were touched.
4. **Review:** at least one other person skims the diff (even briefly for a course).
5. **Merge:** PM (or designated maintainer) merges when ready. Prefer **squash** or **merge commit** per course rules.
6. **After merge:** everyone `git pull origin main` before starting new work.

**Avoiding conflicts:** agree on **package boundaries** (see table above). Two people should not edit the same file without coordinating.

**Workspace installs:** after any `package.json` change, run `npm install` from the **repository root** so symlinks stay correct.

---

## 7. What instructors should look for

Use this as a **grading or review checklist**.

### 7.1 On GitHub (history and process)

- [ ] Repository is **public** or accessible to the instructor.
- [ ] **`main`** contains the integrated app (merge commits or a linear history after squash).
- [ ] At least **two feature PRs** (or equivalent) show **distinct authors** on the feature commits.
- [ ] **Commits** have **clear messages** (for example `feat(utils, feature-x): ...`).
- [ ] **Collaborators** are added under repository **Settings → Collaborators** if group work is required.

### 7.2 Structure and engineering

- [ ] Root `package.json` declares **`workspaces`**: `packages/*` and `apps/*`.
- [ ] Internal packages use a **scope** such as `@repo/...`.
- [ ] Imports between packages use **package names**, not long `../../` paths across `packages/`.
- [ ] `README.md` explains **install**, **run**, and **layout**.

### 7.3 Running the project (smoke test)

From the repo root:

```bash
npm install
npm start
```

- [ ] Dev server starts (Vite; URL often `http://localhost:5173`).
- [ ] Login area and dashboard both render.
- [ ] Invalid email shows validation feedback; valid flow can reach the demo API message.

Optional:

```bash
npm run build -w system-app
```

- [ ] Production build completes without errors.

### 7.4 Inspecting authorship locally

```bash
git log main --oneline
git log main --format="%h %an <%ae> %s"
```

Compare with GitHub **Insights → Contributors** or the **Commits** tab on `main`.

---

## 8. Commands reference

| Goal | Command |
|------|---------|
| Install all workspaces | `npm install` (from repo root) |
| Run host app | `npm start` |
| Run unit tests (`@repo/utils`) | `npm test` |
| Build host app | `npm run build -w system-app` |
| Preview production build | `npm run preview -w system-app` |

---

## 8.1 Sprint update (current increment)

This section summarizes the latest integrated work for instructors and the team.

| Collaborator | Focus | Delivered in this sprint |
|--------------|--------|---------------------------|
| **Biruk (PM)** | Integration & quality | GitHub Actions **CI** (install, test, build `system-app`); **ErrorBoundary** and accessible **skip link** + sticky **header** in the host app; this sprint note in docs. |
| **BiileyX** | `@repo/utils`, `@repo/feature-x` | Form helpers (`isNonEmpty`, `minLength`), **`apiHelper` timeout** (`timeoutMs`, combinable with `signal`), **Vitest** unit tests for utils; **login** validates password length and uses shared **TextField**. |
| **jowrlds** | `@repo/ui-components`, `@repo/feature-y` | Reusable **TextField** (label, error, a11y); dashboard **search** filter, **sort** (name / value / date), and **empty state** when no rows match. |

**How to verify:** `npm ci`, `npm test`, `npm run build -w system-app` (also run automatically in CI on push/PR to `main`).

---

## 8.2 Sprint update — follow-up increment

| Collaborator | Delivered |
|--------------|-----------|
| **jowrlds** | **`Spinner`** component; dashboard **summary cards** (visible row count + sum of values); **Refresh stats** control with short loading state; **`Card`** merges custom `style` with defaults. |
| **BiileyX** | **`truncate`**, **`passwordStrengthLabel`** in `@repo/utils`; **login** gains **show password**, strength hint, truncated email in success copy; extra **Vitest** coverage (`formRules`, `stringUtils`, `passwordHint`). |
| **Biruk (PM)** | **Footer** in `system-app` with repo link; **README** / **DOCUMENTATION** refreshed for this increment. |

---

## 8.3 Sprint update — deeper product increment

| Collaborator | Delivered |
|--------------|-----------|
| **jowrlds** | **`Modal`** (focus lock / escape / scroll lock), **`Select`** filter; dashboard **tier filter**, **region** field + **by-region stats**, **JSON export** (batch + single row), **detail modal** with raw JSON; extra sample row **Delta Ops**. |
| **BiileyX** | **`storage` helpers** + **`REMEMBER_EMAIL_KEY`** (remember email in `localStorage`), **`apiHelper` retries** for transient network / 5xx failures; **Vitest** for storage; login **remember email** checkbox + **retries: 1** on demo API. |
| **Biruk (PM)** | **React Router v6** in `system-app` (**`/`** = login, **`/dashboard`** = metrics; nav in header); **CI concurrency** group to cancel redundant workflow runs; docs/README sync. |

---

## 8.4 Sprint update — UX & formatting increment

| Collaborator | Delivered |
|--------------|-----------|
| **jowrlds** | **`Tabs`** and **`Alert`** in `@repo/ui-components`; dashboard **region** filter, **card vs table** view toggle, and a short **export confirmation** alert. |
| **BiileyX** | **`formatInteger`** / **`formatCompact`** in `@repo/utils` (+ Vitest), **`LAST_SIGNIN_AT_KEY`** and login UI showing **last successful sign-in** (from `localStorage`). |
| **Biruk (PM)** | **`NotFound`** route (`path="*"`), per-route **`document.title`** via `DocumentTitle`; documentation **§8.4**; README note for 404 + titles. |

---

## 8.5 Sprint update — layout & wayfinding polish

| Collaborator | Delivered |
|--------------|-----------|
| **jowrlds** | **`Divider`** and **`ProgressBar`** in `@repo/ui-components`; dashboard **reset filters** control, labeled **divider** before the view tabs, and **per-card progress** vs. the highest visible value (grid view). |
| **BiileyX** | **`formatRelativeSince`** in `@repo/utils` (+ Vitest); login shows **relative** time next to the last sign-in timestamp. |
| **Biruk (PM)** | **`ScrollToTop`** on route changes in `system-app`; documentation **§8.5**; README sync. |

---

## 9. What could be done next (roadmap ideas)

These are **not** required for the current milestone but match how this repo could grow toward a “full” monorepo like ride-share:

- Add **`@repo/api`** (Express) and **`@repo/db`** (SQLite + Drizzle) as separate packages.
- Add **`@repo/eslint-config`** and **`@repo/typescript-config`** and migrate the app to TypeScript.
- Expand **Vitest** coverage (e.g. `apiHelper` with `fetch` mocks) and optional UI tests.
- Add **lint** to CI (ESLint) and shared `@repo/eslint-config`.
- Split **multiple apps** under `apps/*` (e.g. admin vs customer) sharing the same packages.
- Replace inline styles with **Tailwind** in `@repo/ui-components` and share a `globals.css` export.

---

## 10. Related reading

- [ride-share — apps folder](https://github.com/diagomike/ride-share/tree/main/apps) — reference multi-app layout.
- [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) — official documentation.

---

*Last updated to match the team’s MonoRepo course delivery. For day-to-day commands and a short team summary, see `README.md`.*
