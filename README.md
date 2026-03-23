# My Project Name

My Project Description.

## 📚 Table of Contents

1. [Pre-Requirements](#pre-requirements)
2. [Setup &amp; Installation](#setup--installation)
3. [Build &amp; Deploy](#build--deploy)
4. [Project Folder Structure](#project-folder-structure)
5. [Tech Stack](#tech-stack)

## ✅ Pre-Requirements

Before running or building this project, ensure the following tools are installed:

- **Node.js** (v18 or higher recommended)
- **npm**
- **Git**
- **env-cmd** (for managing environment variables per environment)

Install `env-cmd` globally if you haven't:

```bash
npm install -g env-cmd
```

## 🗂️ Project Folder Structure

```bash
my_project/
├── public/                      # Static public files served as-is
│   ├── index.html               # HTML entry point
│   ├── favicon.ico              # Favicon
│   ├── manifest.json            # PWA support
│   ├── robots.txt               # SEO crawling rules
│   ├── icons/                   # App icons

├── src/                         # Main application source
│   ├── Api/                     # Shared API functions (e.g. media upload, content fetch, language list)
│   ├── assets/                  # Static image assets
│   ├── components/              # Reusable UI components
│   ├── Constants/               # Static constants, keys (e.g. TanStack keys)
│   ├── redux/                   # Redux store configuration, actions, and reducers
│   ├── graphs/                  # Highcharts/graph components used throughout the app
│   ├── layouts/                 # Layout components based on user types (admin/user/public)
│   ├── screens/                 # Page-level UI views
│   │   ├── Auth/                # Login, register, password reset screens
│   │   ├── Common/             # Common content pages
│   │   ├── Models/             # Reusable modal components
│   │   └── Protected/          # Pages for authenticated users only
│   ├── Hook/                   # Custom React hooks
│   ├── utils/                  # Utility/helper functions
│   ├── routes/                 # Route definitions and guards
│   ├── global.css              # Global styles and Tailwind setup
│   ├── App.js                  # Root React component
│   ├── NotFound.js             # 404 fallback page
│   ├── ErrorBoundary.js        # Global error catcher (UI fallback on crash)
│   └── index.js                # App entry point (renders App.js)

├── .env.*                      # Environment-specific variables (.env.development, .env.production, etc.)

├── jsconfig.json               # Path aliases for cleaner imports (e.g., `@/components/`)
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
├── package.json                # Project dependencies, scripts, and metadata
└── README.md                   # Project documentation (this file)
```

## 🛠️ 👨‍💻 Tech Stack

- **React 18** — Modern UI library
- **React Router DOM** — Routing and navigation
- **Redux** / **Redux Thunk** / **Redux Persist** — State management
- **@tanstack/react-query** — Data fetching and caching
- **Ant Design (antd)** — UI component library
- **TailwindCSS + tailwindcss-animate** — Utility-first CSS framework and animations
- **Jodit React** — Rich text editor
- **Highcharts + highcharts-react-official** — Interactive charting
- **React Icons** — Icon library
- **React Responsive** — Media query hooks
- **React Toastify** — Toast notifications
- **React Error Boundary** — Error handling UI
- **React Helmet Async** — Manage document head tags

### 📦 Utility Libraries

- **Axios** — HTTP client
- **Lodash** — Utility functions
- **Day.js & Moment.js** — Date/time utilities (you may want to consider using only one for consistency)
- **UUID** — Unique ID generation

### 📱 Phone Input

- **React Phone Input 2** — Phone number input

### 🧪 Tooling & Quality

- **env-cmd** — Environment variable management
- **ESLint** — Code linting

### ⚙️ Build Tools

- **react-scripts** — CRA tooling
- **PostCSS / autoprefixer / postcss-import** — CSS processing

## ⚙️ Setup & Run Locally

Clone the project

```bash
  https://your_repo_name_here.git
```

Go to the project directory

```bash
  cd your_repo_name_here
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## 🌍 Deployment (AWS Amplify)

This project is deployed using  **AWS Amplify** .

Steps to deploy:

1. Connect your GitHub repository to AWS Amplify.
2. Select the branch (e.g., `main` or `master`) to deploy.
3. Configure build settings.
4. Every push to the selected branch will trigger a new build and deployment.
