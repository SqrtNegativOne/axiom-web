export const NAV_LINKS = [
  { label: 'Home',       to: '/',            internal: true  },
  { label: 'About',      to: '/about',        internal: true  },
  { label: 'Events',     to: '/events',       internal: true  },
  { label: 'Games',      to: '/games',        internal: true  },
  { label: 'Newsletter', to: '/newsletter/',  internal: false },
]

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { label: 'Branding', to: 'https://drive.google.com/drive/folders/1ghyc8NSUbn0NVhi1VjHnhtuaOrUcy2FQ', internal: false },
  { label: 'Colophon', to: '/colophon', internal: true },
]
