## About The Project

One repository containing all Pegipegi's web applications code maintained by [Pegipegi Web Team](https://github.com/orgs/pegipegi/teams/web).

### Built with

- [Vue](https://vuejs.org/)
- [Nuxt](https://v3.nuxtjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## Getting Started

### Prerequisites

We use [pnpm](https://pnpm.io/) to manage all the dependencies. So, you need to [install](https://pnpm.io/installation) it as global package by running this command.

```sh
npm install -g pnpm
```

### Installation

1. Clone the repository

   ```sh
   git clone https://github.com/pegipegi/pegipegi-web.git
   ```

2. Install all the dependencies

   ```sh
   pnpm install
   ```

### Running Local Development Server

You have two ways to run package in your local machine.

#### Running from Root

You can use this script to run package locally from the root.

```sh
pnpm -F "PACKAGE_PATH" dev
```

For example if you want to run `apps/flight-mobile` package:

```sh
pnpm -F "./apps/flight-mobile" dev
```

#### Running from Package Root

You can also run the package like it's not in the mono-repository. All you have to do is `cd` to specific package and run the scripts.
For example if you want to run `apps/flight-mobile` package:

1. Change your workdir to `apps/flight-mobile`

   ```sh
   cd apps/flight-mobile
   ```

2. Run the scripts
   
   ```sh
   pnpm dev
   ```

### VS Code Workspace

You can open this repository with [VS Code Workspace](https://code.visualstudio.com/docs/editor/workspaces). All you have to do is open `.vscode/web-pegipegi.code-workspace` and click button says **Open Workspace** at the bottom right corner of the page.
