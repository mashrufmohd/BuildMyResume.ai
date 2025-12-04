# BuildMyResume

![Hacktoberfest-2025](https://img.shields.io/badge/Hacktoberfest-2025-brightgreen)
![Tech](https://img.shields.io/badge/Tech-React%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-blue)
![License](https://img.shields.io/badge/License-MIT-green)

Craft modern, ATS-friendly resumes in minutes — no design skills required. Fast, clean, and print-ready templates built for developers and recruiters.

## ✨ Features

- **🎨 Beautiful Templates** - Choose from multiple professional layouts (Modern, Minimal, Professional)
- **📱 Fully Responsive** - Works flawlessly on mobile, tablet, and desktop devices
- **⚡ Live Preview** - See your resume update in real-time as you type
- **📥 PDF Export** - Download your resume as a high-quality PDF with one click
- **✅ ATS-Friendly** - Optimized formatting to pass Applicant Tracking Systems
- **🚀 Easy to Use** - Intuitive multi-step form guides you through the process

## Why contribute?
- Friendly for first-timers and experienced contributors
- Clear issues labeled for Hacktoberfest and `good-first-issue`
- Small, focused tasks you can finish in under a day
- Opportunity to add a resume template or improve export quality

## Quick links
- Live dev (local): http://localhost:5173 (or the port shown in terminal)

## Table of contents
- [Getting started](#getting-started)
- [Contributing guide (Hacktoberfest-friendly)](#contributing-guide-hacktoberfest-friendly)
- [Good first issues and ideas](#good-first-issues-and-ideas)
- [Project structure](#project-structure)
- [Development tips](#development-tips)
- [Code of Conduct & License](#code-of-conduct--license)

## Getting started
These steps will get the project running locally on your machine.

Prerequisites
- Node.js 16+ (or compatible), npm
- Git

Setup
1. Fork the repository on GitHub and clone your fork:

```powershell
git clone https://github.com/<your-username>/BuildMyResume.ai.git
cd BuildMyResume.ai
```

2. Install dependencies:

```powershell
npm install
```

3. Start the dev server:

```powershell
npm run dev
```

4. Open your browser and visit:

```
http://localhost:8080
```

If you see a blank page, open the browser DevTools console and the terminal running Vite for errors. See [Development tips](#development-tips) below.

## Contributing guide (Hacktoberfest-friendly)
We welcome contributions of all sizes. Follow these steps to contribute:

1. Fork the repo and create a branch named `feature/your-thing` or `fix/issue-id`.
2. Make small, focused changes with clear commits.
3. Run the app and tests (if applicable).
4. Open a pull request against `main` with a clear description of your change.

PR Checklist (maintainers and contributors):
- [ ] The change is limited in scope and easy to review
- [ ] The app builds and runs locally
- [ ] No sensitive information (secrets) was added
- [ ] Documentation updated if relevant (README, comments)

Labels we use (suggested for maintainers):
- `hacktoberfest` — tasks that qualify for Hacktoberfest
- `good-first-issue` — small tasks for newcomers
- `help-wanted` — tasks that need contributions
- `enhancement` — feature requests
- `bug` — bug reports

## Good first issues and ideas
Here are some small improvements that are great for first contributions:
- Fix small UI layout bugs on mobile
- Add keyboard accessibility to template selector
- Improve PDF export fidelity for long resumes
- Add a new resume template (e.g. "Academic", "Creative")
- Improve README with screenshots and GIFs

If you'd like to pick one, leave a comment on the issue so maintainers know you're working on it.

## Project structure
Key folders and files:
```
BuildMyResume.ai/
├── public/                 # Static assets
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── resume/        # Resume template layouts
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/             # Route pages
│   │   ├── Home.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Builder.tsx
│   │   ├── Templates.tsx
│   │   ├── SignIn.tsx
│   │   ├── SignUp.tsx
│   │   ├── Profile.tsx
│   │   └── NotFound.tsx
│   ├── integrations/      # External services
│   │   └── supabase/
│   │       ├── client.ts
│   │       └── types.ts
│   ├── lib/               # Utility functions
│   │   ├── utils.ts
│   │   └── resumeService.ts
│   ├── types/             # TypeScript types
│   │   └── resume.ts
│   ├── hooks/             # Custom React hooks
│   │   └── use-toast.ts
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── supabase/              # Supabase migrations
│   └── migrations/
├── .env.example           # Environment variables template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md
```
## Development tips
- If Vite fails to start with a module error, check `vite.config.ts` for plugin imports and ensure packages exist in `package.json`.
- To debug a blank page: open DevTools (F12) → Console and Network tabs for runtime errors or missing files.
- Use `npm run build` to test production build locally: `npm run build; npm run preview`.

Troubleshooting common issues
- Missing package error: run `npm install` and confirm the package appears in `package.json`.
- Port conflicts: If `8080` is in use, pass a different port in `vite` command or edit `vite.config.ts`.

## Tests
There are no automated tests currently; PRs that add useful tests are welcome.

## Code of Conduct & License
Please follow the repository Code of Conduct (create `CODE_OF_CONDUCT.md` if you wish). This project is licensed under the MIT License. See `LICENSE` for details.

## Maintainers & Contact
Maintainer: mashrufmohd
For questions or help, open an issue on GitHub.

---

Thank you for contributing — have fun at Hacktoberfest 2025! 🎉
