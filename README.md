# Luxury Portfolio Platform

An ultra-luxury personal portfolio, showcase, and CMS built with Next.js (App Router), Tailwind CSS, Framer Motion, and Wasmer MySQL Database integration. Designed for maximum visual impact, fluid kinetic interactions, dynamic content management, and edge performance.

---

## 🚀 Wasmer.io Deployment Guide

This project is pre-configured for deployment on **[Wasmer Edge](https://wasmer.io)** with **Wasmer MySQL Database**.

### Option 1: Direct CLI Deployment

1. **Install Wasmer CLI** (if not installed):
   - **Windows (PowerShell)**:
     ```powershell
     iwr -useb https://wasmer.io/install.ps1 | iex
     ```
   - **macOS / Linux**:
     ```bash
     curl https://get.wasmer.io -sSfL | sh
     ```

2. **Login to Wasmer**:
   ```bash
   wasmer login
   ```

3. **Build the Next.js project**:
   ```bash
   npm run build
   ```

4. **Deploy to Wasmer Edge**:
   ```bash
   wasmer deploy
   ```

---

### Option 2: Continuous Deployment via GitHub Actions

1. Go to your Wasmer Dashboard at [wasmer.io/settings/tokens](https://wasmer.io/settings/tokens) and generate a personal access token.
2. In your GitHub repository:
   - Navigate to **Settings** > **Secrets and variables** > **Actions**.
   - Create a new repository secret named `WASMER_TOKEN` and paste your Wasmer token.
3. Every push to the `main` branch will automatically trigger `.github/workflows/wasmer-deploy.yml` and deploy to Wasmer Edge!

---

### Option 3: Connect via Wasmer Dashboard

1. Visit [wasmer.io/apps](https://wasmer.io/apps).
2. Click **Create App** / **Import from GitHub**.
3. Select your repository (`mramzan4055/portfolio`).
4. Wasmer will read `wasmer.toml` & `app.yaml` and deploy your app.

---

## 🛠 Local Development

```bash
# Install dependencies
npm install

# Run local development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

---

## 🗂 Project Architecture

- **`src/app/`**: Next.js App Router (Landing, Work, About, Services, Contact, and Admin Dashboard).
- **`src/components/`**: Modular, high-aesthetic UI components with Framer Motion animations.
- **`src/lib/db/`**: Wasmer MySQL connection pool and migration scripts.
- **`src/lib/data/`**: Data store layer with live Wasmer MySQL integration.
- **`wasmer.toml` & `app.yaml`**: Wasmer Edge package and application deployment manifests.
- **`.github/workflows/wasmer-deploy.yml`**: Automated CI/CD pipeline for Wasmer.
