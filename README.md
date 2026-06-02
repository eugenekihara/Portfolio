# Eugene — Portfolio

A modern, responsive portfolio website built with Next.js 16, React 19, Tailwind CSS 4, and Framer Motion. Designed and developed by **Eugene Kihara** — a Kenya-based UI/UX designer and front-end developer.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) + custom CSS variables
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Inter (body) + Poppins (headings)

## Sections

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen intro with name, tagline, and CTA buttons |
| **Services** | 4-card grid — Web Design, Product Design, UX Audit, Branding |
| **Process** | 4-step workflow — Discover, Define, Design, Deliver |
| **Marquee** | Scrolling service ticker banner |
| **Projects** | 3 project cards with hover reveal (WAVEEATZ links to detail page) |
| **About** | Bio, experience, and "What I Do" grid |
| **Skills** | Design (featured), Frontend, Backend, Database, Tools & Technologies |
| **Contact** | Contact form with toast notifications |
| **Footer** | Social links + second marquee |

## Project Detail Pages

| Route | Project |
|-------|---------|
| `/projects/waveeatz` | WAVEEATZ — Mobile App Design case study |

The WAVEEATZ detail page includes:
- Hero title with accent color split
- Project metadata grid (Client, Role, Timeline, Platform)
- Two-column layout: app mockup + problem/solution narrative
- Color palette showcase
- "Next Project" navigation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/eugenekihara/Portfolio.git

# Navigate into the project directory
cd Portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--background` | `#f5f0eb` | Page background |
| `--foreground` | `#1a1a1a` | Primary text |
| `--accent` | `#8b4049` | Brand accent (maroon) |
| `--card` | `#ffffff` | Card backgrounds |
| `--secondary` | `#e8e4e1` | Secondary surfaces |
| `--muted-foreground` | `#6b6b6b` | Secondary text |

### Typography

- **Headings**: Poppins (300–700)
- **Body**: Inter (variable)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main portfolio page (all sections)
│   ├── layout.tsx            # Root layout with fonts & metadata
│   ├── globals.css           # CSS variables, animations, scrollbar
│   └── projects/
│       └── waveeatz/
│           └── page.tsx      # WAVEEATZ project detail page
├── components/
│   └── ui/                   # shadcn/ui components
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions
└── public/
    ├── waveeatz.png          # Project images
    ├── schoolpata.png
    ├── shamba-rahisi.png
    ├── about-studio.png
    └── logo.svg
```

## License

This project is open source and available under the [MIT License](LICENSE).

---

Designed & built by [Eugene Kihara](https://github.com/eugenekihara)
