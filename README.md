# Lumi

Lumi is an [Angular](https://angular.dev/) application built with Angular CLI 19.2.24.

## 🛠 Tech Stack

- **Framework:** Angular 19
- **CLI:** Angular CLI 19.2.24
- **Testing:** Karma (unit tests)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Angular CLI](https://angular.dev/tools/cli) installed globally:
  ```bash
  npm install -g @angular/cli
  ```

### Installation

```bash
npm install
```

### Development server

Start a local dev server:

```bash
ng serve
```

Then open [http://localhost:4200/](http://localhost:4200/) in your browser. The app reloads automatically on file changes.

## 📦 Build

```bash
ng build
```

Build artifacts are output to the `dist/` directory. Production builds are optimized by default.

## 🧩 Code Scaffolding

Generate a new component:

```bash
ng generate component component-name
```

See all available schematics (components, directives, pipes, services, etc.):

```bash
ng generate --help
```

## ✅ Testing

### Unit tests

```bash
ng test
```

Runs unit tests via [Karma](https://karma-runner.github.io).

### End-to-end tests

Angular CLI doesn't ship with an e2e framework by default — pick one that fits your needs (e.g. Cypress, Playwright).

```bash
ng e2e
```

## 📁 Project Structure

```
lumi/
├── src/
│   ├── app/          # Application source code
│   ├── assets/       # Static assets
│   └── environments/ # Environment configs
├── angular.json
├── package.json
└── tsconfig.json
```

## 📚 Resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Angular Documentation](https://angular.dev/)

## 📄 License

Specify your project's license here.
