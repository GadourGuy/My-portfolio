# My-portfolio
# 💼 Personal Portfolio

Welcome to my personal portfolio! A one-page, scroll-driven site that showcases my experience, projects and skills, with cinematic scroll effects inspired by the GTA VI website.

## 🌐 Live Website

https://gadourguy.github.io/My-portfolio/

## 📌 Features

- Pinned hero where the photo shrinks into a masked "OTHMAN" wordmark on scroll
- Word-by-word text reveal, parallax portrait and animated stats
- Horizontally scrolling experience timeline
- Stacked full-screen project showcase
- GitHub repositories grid, velocity-reactive skill marquees
- Contact form (Google Sheets) and responsive mobile menu

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite
- **Motion:** GSAP + ScrollTrigger, Lenis smooth scrolling
- **Hosting:** GitHub Pages (deployed by GitHub Actions)

## 🚀 Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

Content (experience, projects, repos, skills) lives in `src/data.js`.
