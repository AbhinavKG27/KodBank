# 🏦 KodBank

A modern, full-stack banking demo application built with React, TypeScript, and Supabase. KodBank provides a clean and intuitive interface for managing bank accounts and financial transactions.

---

## ✨ Features

- **Account Management** — View and manage bank accounts in one place
- **Transaction Tracking** — Monitor deposits, withdrawals, and transfers
- **Real-time Data** — Powered by Supabase for live backend updates
- **Responsive UI** — Built with Tailwind CSS and shadcn/ui for a polished experience
- **Type-Safe Codebase** — End-to-end TypeScript for reliability and maintainability

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | [React](https://react.dev/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Backend / Database | [Supabase](https://supabase.com/) |
| Testing | [Vitest](https://vitest.dev/) |
| Package Manager | [Bun](https://bun.sh/) / npm |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+) or [Bun](https://bun.sh/)
- A [Supabase](https://supabase.com/) account and project

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AbhinavKG27/KodBank.git

# 2. Navigate into the project directory
cd KodBank

# 3. Install dependencies
npm install
# or with Bun
bun install
```

### Environment Setup

Create a `.env` file in the root directory and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

> You can find these values in your Supabase project under **Settings → API**.

### Database Setup

Apply the database schema using the Supabase CLI:

```bash
supabase db push
```

Or run the migration files found in the `/supabase` directory manually via the Supabase dashboard.

### Running the App

```bash
# Start the development server
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
KodBank/
├── public/             # Static assets
├── src/                # Application source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route-level page components
│   ├── hooks/          # Custom React hooks
│   └── lib/            # Utilities and Supabase client
├── supabase/           # Supabase migrations and config
├── .env                # Environment variables
├── tailwind.config.ts  # Tailwind CSS configuration
├── vite.config.ts      # Vite build configuration
└── vitest.config.ts    # Vitest test configuration
```

---

## 🧪 Running Tests

```bash
npm run test
# or
bun run test
```

---

## 📦 Building for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` directory.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Abhinav KG**  
GitHub: [@AbhinavKG27](https://github.com/AbhinavKG27)