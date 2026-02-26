# QR Code Generator

A fast, minimal, and customizable QR Code generator built with React, Vite, TypeScript, and Tailwind CSS v4.

## Features

- **Instant Generation**: Creates QR codes on-the-fly as you type.
- **Smart Sizing**: Automatically uses the lowest possible QR version based on the data length.
- **Customizable**: Change foreground/background colors, export size, error correction levels, and toggle the quiet zone margin.
- **Export**: One-click download to save your QR code as a PNG.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Package Manager**: [Bun](https://bun.sh/)
- **QR Code Library**: [qrcode.react](https://github.com/zpao/qrcode.react)
- **Icons**: [Lucide React](https://lucide.dev/)

## Local Development

Ensure you have [Bun](https://bun.sh/) installed, then run the following commands:

```bash
# Install dependencies
bun install

# Start the development server
bun run dev
```

Your app will be running at `http://localhost:5173`.

## Deployment

This repository is ready to be deployed to **Coolify** (or any Docker-compatible environment).

### How to deploy on Coolify

1. Add a new resource in Coolify and connect this Git repository.
2. Choose **Docker** as the Build Pack.
3. Set the **Container Port** to **80**.
4. Deploy!

The included `Dockerfile` utilizes a lightweight multi-stage build:
1. It builds the Vite app using `bun`.
2. It serves the static assets (`dist/`) using an ultra-fast `nginx:alpine` web server.
