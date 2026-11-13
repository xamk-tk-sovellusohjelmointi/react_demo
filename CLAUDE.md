# React demo

Teaching demo for a Finnish React course: a small Vite + React + TypeScript + MUI app (home, about, task list, newsletter form) published as static files on GitHub Pages. Students read and copy this code, so keep it simple and beginner-readable.

## Commands

- `npm run dev`: dev server at http://localhost:3000 (`strictPort`, so it fails instead of switching ports if 3000 is taken)
- `npm run build`: type check (`tsc -b`), then production build into `dist/`
- `npm run lint`: oxlint with `.oxlintrc.json`
- `npm run preview`: serves `dist/` at http://localhost:4173
- Node 26 or newer (`.nvmrc`, `engines` in `package.json`)

## Verifying changes

There are no automated tests. After every change:

1. `npm run build` and `npm run lint` must both pass.
2. For UI changes, run the app and click through the affected routes (`#/`, `#/about`, `#/tasks`, `#/form`, `#/thank-you`).

Start the dev or preview server in the background and stop it when done.

## Non-obvious structure

- `src/AppRoutes.tsx` is the real root component: `NavBar`, every `<Route>` and the newsletter subscriber state. `src/App.tsx` is only the Home page (`/`).
- `src/Form.tsx` is the Newsletter page (`/form`). `ThankYou` gets the form data as props and is shown only after a submit. Without data it redirects to `/form`, and a reload loses the data. This is intended.
- Tasks are stored in `localStorage` under the key `tasks`. Keep the `{ uuid, name, completed }` shape compatible with data users have already saved.

## Constraints

- Dependencies: only React, React Router and the MUI family (`@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/styled`, `@fontsource/roboto`). Ask before installing anything else. Prefer browser APIs such as `crypto.randomUUID()` over new packages.
- Styling: no CSS files, `sx` props, `styled()` or theme overrides. Use MUI defaults and component props only (`spacing`, `gutterBottom`, `variant`, `color`).
- No network requests. Form data stays in React state, and persistence is `localStorage` only.
- Don't create a git repository, commit, push or deploy unless asked. The user publishes by uploading the contents of `dist/`.

## GitHub Pages requirements

The build is served from `https://<user>.github.io/<repo>/`, a subfolder with no single-page-app fallback.

- Keep `HashRouter` in `src/main.tsx`. `BrowserRouter` breaks reloads and direct links on GitHub Pages.
- Keep `base: './'` in `vite.config.ts`. Don't use root-absolute URLs (`/something`) for assets.
- Route paths stay plain (`to="/about"`). `HashRouter` adds the `#`.

## Library versions

Use the latest major versions and check them with `npm view <package> version` instead of relying on memory. The project is on Vite 8, React 19, TypeScript 7, MUI 9 and React Router 8.

- React Router 8: import everything from `react-router`, not `react-router-dom`.
- MUI 9: `Typography` no longer has the `paragraph` prop. Use `gutterBottom`.

## Code conventions

- One component per file, flat in `src/`, and the file is named after the component. Write `function Name() {}` with `export default Name` at the end of the file.
- Type props with a `type NameProps = { ... }` alias. Export a shared type from the component that owns it and import it with `import { type X }` (`verbatimModuleSyntax` is on).
- Don't export other values (constants, helper functions) from component files. oxlint warns about it (`react/only-export-components`).
- Include the `.tsx` extension in relative imports.
- Use named imports from `@mui/material`. Import icons as default imports from `@mui/icons-material/<Name>`.
- Forms use React 19 form actions (`action={fn}` receiving `FormData`) with uncontrolled MUI `TextField`s and native validation (`required`, `type="email"`).
- State shared between routes lives in `AppRoutes` and is passed down as props. Don't use Context or state libraries.
- Page headings are `<Typography variant="h3" component="h1" gutterBottom>`.
- There is no formatter config. Match the existing style: 2-space indent, single quotes, no semicolons, trailing commas.
- UI text and code comments are in English.
- No custom hooks, extra abstraction layers or extra files unless asked.

## Documentation

`README.md` is a Finnish tutorial, and its code blocks mirror the source files line for line. When you change a file that appears in it, tell the user the README is out of date instead of editing it silently. It is maintained with the demo-doc-writer skill.
