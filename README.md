# Frontend - Astro 5

Modern, spiritual, and responsive frontend for Iglesia Cristiana Unidos en Su Presencia.

## Tech Stack

- **Framework**: Astro 5
- **Styling**: Tailwind CSS
- **Interactivity**: React (for interactive components)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Inter, Playfair Display)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Environment Setup

Create `.env` file:

```env
PUBLIC_API_URL=http://localhost:3000/api
```

### Run Development Server

```bash
npm run dev
```

Site will be available at `http://localhost:4321`

## Project Structure

```
src/
├── components/        # Reusable components
│   ├── Header.astro   # Navigation header
│   └── Footer.astro   # Site footer
├── layouts/           # Page layouts
│   ├── BaseLayout.astro    # Base HTML
│   └── MainLayout.astro    # Main with header/footer
├── pages/             # Route pages
│   ├── index.astro         # Home page
│   ├── about.astro         # About page
│   ├── login.astro         # Login page
│   ├── contact.astro       # Contact page
│   └── sermons/            # Sermons section
├── lib/               # Utilities
│   ├── api.ts              # API client
│   └── auth.ts             # Auth helpers
└── styles/            # Global styles
    └── global.css          # Tailwind + custom styles
```

## Design System

### Colors

```css
--church-white: #fefefe
--church-blue: #6d94bf
--church-gold: #f7bf6a
--church-deep-blue: #13549b
--church-gray: #c6d2e0
```

### Typography

- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components

#### Buttons

```astro
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-outline">Outline Button</button>
```

#### Cards

```astro
<div class="card">
  <!-- Card content -->
</div>
```

#### Sections

```astro
<h2 class="section-title">Section Title</h2>
<p class="section-subtitle">Section subtitle</p>
```

## Pages

### Public Pages

- `/` - Home (hero, schedule, values, CTA)
- `/about` - About (vision, mission, team)
- `/sermons` - Sermons listing
- `/blog` - Blog posts
- `/gallery` - Photo gallery
- `/events` - Events calendar
- `/contact` - Contact form

### Authentication

- `/login` - Login page
- `/register` - Registration page

### Protected Pages

- `/dashboard` - User dashboard
- `/admin/*` - Admin panel (superadmin only)

## API Integration

The `api.ts` client handles all backend communication:

```typescript
import { api } from "@/lib/api";

// Get sermons
const sermons = await api.getSermons({ limit: 10 });

// Login
await api.login({ email, password });

// Upload image
await api.uploadImage(file);
```

## Authentication

Check authentication status:

```typescript
import { checkAuth, isSuperAdmin } from "@/lib/auth";

const user = await checkAuth();
if (isSuperAdmin(user)) {
  // Show admin features
}
```

## Responsive Design

Mobile-first approach with breakpoints:

- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## Animations

Custom animations in Tailwind:

- `animate-fade-in`
- `animate-slide-up`
- `animate-slide-down`
- `animate-scale-in`

Delay utilities:

- `animate-delay-200`
- `animate-delay-400`
- `animate-delay-600`

## SEO Optimization

All pages include:

- Proper title and meta description
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Semantic HTML structure

## Building for Production

```bash
npm run build
```

Output will be in `dist/` directory, ready for deployment to:

- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
npm run astro      # Run Astro CLI
```

## Best Practices

1. Use semantic HTML elements
2. Keep components small and focused
3. Leverage Astro's partial hydration
4. Optimize images with Astro Image
5. Use TypeScript for type safety
6. Follow accessibility guidelines
