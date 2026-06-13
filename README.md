# CraftNode Template v1.0.0

A clean, minimal Minecraft hosting website template built with React + Vite + Tailwind CSS. Everything is controlled from the `src/config/` folder — no need to touch component code.

## Quick Start

```bash
# Install dependencies
npm install

# Copy env file and add your webhook URLs
cp .env.example .env

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── config/          # ← EDIT THESE FILES ONLY
│   ├── theme.js     # Colors, buttons, borders
│   ├── branding.js  # Company name, links, currency
│   ├── navbar.js    # Nav links
│   ├── hero.js      # Hero section
│   ├── features.js  # Feature cards
│   ├── about.js     # About section
│   ├── products.js  # Pricing plans
│   ├── whyus.js     # Why us features
│   ├── process.js   # How it works steps
│   ├── testimonials.js  # Reviews
│   ├── webhooks.js  # Discord webhook URLs
│   ├── status.js    # Status page services
│   ├── support.js   # FAQs & channels
│   ├── links.js     # Links page
│   └── index.js     # Re-exports everything
├── components/      # UI components (don't edit)
├── pages/           # Page routes (don't edit)
└── main.jsx         # Entry point
```

## How to Customize

### Change Brand Name & Links

Edit `src/config/branding.js`:

```js
export const branding = {
  name: "Your Brand",
  logoInitial: "Y",
  discordLink: "https://discord.gg/your-invite",
  panelLink: "https://panel.yourdomain.com",
  currencySymbol: "₹",  // or $, €, etc.
};
```

### Change Colors

Edit `src/config/theme.js`. The site uses Tailwind utility classes. Change the accent color by replacing `emerald` with any Tailwind color:

```js
primaryButton: "bg-emerald-600 hover:bg-emerald-500 ...",
logoBg: "bg-emerald-600",
iconAccent: "text-emerald-500",
```

Available colors: `emerald`, `sky`, `violet`, `amber`, `rose`, `indigo`, `cyan`, `teal`

### Add/Edit Products

Edit `src/config/products.js`. Each product has a category, icon, and plans array:

```js
{
  name: "Your Category",
  category: "yourCat",
  icon: FaServer,
  description: "Description here.",
  plans: [
    { title: "Plan Name", ram: "4GB", cpu: "2 vCPU", storage: "40GB SSD", price: 99 },
  ],
},
```

### Change Hero Section

Edit `src/config/hero.js` for title, subtitle, buttons, and stats.

### Discord Webhooks

1. Copy `.env.example` to `.env`
2. Add your Discord webhook URLs:

```
VITE_DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
VITE_DISCORD_CONTACT_WEBHOOK=https://discord.com/api/webhooks/...
VITE_DISCORD_SUPPORT_WEBHOOK=https://discord.com/api/webhooks/...
```

### Status Page Services

Edit `src/config/status.js` to add/remove monitored services.

### FAQ

Edit `src/config/support.js` to change FAQ questions and answers.

## Pages

| Route | Page |
|---|---|
| `/` | Homepage |
| `/products` | Products & Pricing |
| `/status` | Service Status |
| `/billing` | Checkout |
| `/support` | Support & FAQ |
| `/links` | Quick Links |
| `/privacy-policy` | Privacy Policy |
| `/terms-of-service` | Terms of Service |

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4**
- **React Router 7**
- **React Icons**
- **React Hot Toast**

## License

Free to use. No attribution required.
