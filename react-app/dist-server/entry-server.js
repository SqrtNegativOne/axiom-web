import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect, useRef, useLayoutEffect, useCallback, useMemo, StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation, useParams, Routes, Route } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation, Virtual } from "swiper/modules";
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("axiom-theme", next ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggle,
      "aria-label": dark ? "Switch to light mode" : "Switch to dark mode",
      className: "p-1.5 text-green hover:text-terracotta transition-colors duration-200",
      children: dark ? (
        // Sun — shown in dark mode (click to go light)
        /* @__PURE__ */ jsxs(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "4" }),
              /* @__PURE__ */ jsx("line", { x1: "12", y1: "2", x2: "12", y2: "4" }),
              /* @__PURE__ */ jsx("line", { x1: "12", y1: "20", x2: "12", y2: "22" }),
              /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "4.22", x2: "5.64", y2: "5.64" }),
              /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "18.36", x2: "19.78", y2: "19.78" }),
              /* @__PURE__ */ jsx("line", { x1: "2", y1: "12", x2: "4", y2: "12" }),
              /* @__PURE__ */ jsx("line", { x1: "20", y1: "12", x2: "22", y2: "12" }),
              /* @__PURE__ */ jsx("line", { x1: "4.22", y1: "19.78", x2: "5.64", y2: "18.36" }),
              /* @__PURE__ */ jsx("line", { x1: "18.36", y1: "5.64", x2: "19.78", y2: "4.22" })
            ]
          }
        )
      ) : (
        // Moon — shown in light mode (click to go dark)
        /* @__PURE__ */ jsx(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
          }
        )
      )
    }
  );
}
const NAV_LINKS = [
  { label: "Home", to: "/", internal: true },
  { label: "Team", to: "/team", internal: true },
  { label: "Events", to: "/events", internal: true },
  { label: "Games", to: "/games", internal: true },
  { label: "Newsletter", to: "/newsletter/", internal: false }
];
const FOOTER_LINKS = [
  ...NAV_LINKS,
  {
    label: "Branding",
    to: "https://drive.google.com/drive/folders/1ghyc8NSUbn0NVhi1VjHnhtuaOrUcy2FQ",
    internal: false
  },
  { label: "Colophon", to: "/colophon", internal: true },
  { label: "Privacy Policy", to: "/privacy", internal: true }
];
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const [logoSpinning, setLogoSpinning] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);
  const isHome = pathname === "/";
  const hidden = isHome && !scrolled;
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${hidden ? "opacity-0 -translate-y-full pointer-events-none" : "opacity-100 translate-y-0 bg-cream/95 dark:bg-[#0E1A14]/95 shadow-sm"}`,
      children: [
        /* @__PURE__ */ jsxs("nav", { className: "max-w-6xl mx-auto px-6 py-4 flex items-center justify-between", children: [
          logoSpinning && /* @__PURE__ */ jsx("style", { children: `@keyframes axiom-logo-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }` }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "/",
              className: "flex items-center gap-3 group",
              onClick: () => {
                const next = logoClicks + 1;
                setLogoClicks(next);
                if (next >= 2) {
                  setLogoSpinning(true);
                  setLogoClicks(0);
                  setTimeout(() => setLogoSpinning(false), 600);
                }
              },
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: "/data/logo.svg",
                    alt: "Axiom",
                    className: "h-8 w-auto dark:invert",
                    style: logoSpinning ? { animation: "axiom-logo-spin 0.6s ease-out" } : {},
                    onError: (e) => {
                      e.target.style.display = "none";
                    }
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-heading text-2xl font-light tracking-[0.15em] text-green group-hover:text-terracotta transition-colors duration-200", children: "AXIOM" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("ul", { className: "hidden md:flex items-center gap-8 ml-auto", children: [
            NAV_LINKS.filter(({ to }) => to !== "/").map(
              ({ label, to, internal }) => internal ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: to,
                  className: `font-body text-sm tracking-wider uppercase transition-colors duration-200 ${pathname === to ? "text-terracotta" : "text-green hover:text-green relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gold after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100"}`,
                  children: label
                }
              ) }, to) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: to,
                  className: "font-body text-sm tracking-wider uppercase text-green hover:text-terracotta transition-colors duration-200",
                  children: label
                }
              ) }, to)
            ),
            /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ThemeToggle, {}) })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "md:hidden flex flex-col gap-1.5 p-2 ml-auto",
              onClick: () => setMenuOpen((o) => !o),
              "aria-label": "Toggle menu",
              "aria-expanded": menuOpen,
              "aria-controls": "mobile-menu",
              children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `block w-6 h-px bg-green transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `block w-6 h-px bg-green transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`
                  }
                ),
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `block w-6 h-px bg-green transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            id: "mobile-menu",
            className: `md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`,
            children: /* @__PURE__ */ jsx("div", { className: "bg-cream dark:bg-[#0E1A14] border-t border-gold/30 px-6 py-4", children: /* @__PURE__ */ jsxs("ul", { className: "flex flex-col gap-4", children: [
              NAV_LINKS.filter(({ to }) => to !== "/").map(
                ({ label, to, internal }) => internal ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: to,
                    className: `font-body text-sm tracking-wider uppercase ${pathname === to ? "text-terracotta" : "text-green"}`,
                    children: label
                  }
                ) }, to) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: to,
                    className: "font-body text-sm tracking-wider uppercase text-green",
                    children: label
                  }
                ) }, to)
              ),
              /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ThemeToggle, {}) })
            ] }) })
          }
        )
      ]
    }
  );
}
const SOCIAL_LINKS = [
  {
    label: "@axiomnsut",
    href: "https://www.instagram.com/axiomnsut",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }) })
  },
  {
    label: "Axiom NSUT",
    href: "https://www.linkedin.com/company/axiom-nsut",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) })
  },
  {
    label: "axiom.nsit",
    href: "https://www.facebook.com/axiom.nsit",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" }) })
  },
  {
    label: "Substack",
    href: "https://substack.com/@axiomnsut",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" }) })
  },
  {
    label: "WhatsApp Community",
    href: "https://chat.whatsapp.com/DGTXdFZKd53B93VvDbPuv6",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" }) })
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@AxiomNSUT",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" }) })
  },
  {
    label: "Linktree",
    href: "https://linktr.ee/AxiomNSUT_Official",
    icon: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm3.5-10c0 1.93-1.57 3.5-3.5 3.5s-3.5-1.57-3.5-3.5 1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5zm2-8h-10v2h10v-2zm0 4h-10v2h10v-2zm0 4h-10v2h10v-2z" }) })
  }
];
const FOOTER_STYLE = "bg-green dark:bg-[#0C1610] text-cream/80";
const CONTAINER_STYLE = "max-w-6xl mx-auto px-6 py-12";
const GRID_STYLE = "grid grid-cols-1 md:grid-cols-3 gap-10";
const BRAND_TITLE_STYLE = "font-heading text-2xl font-light tracking-[0.15em] text-cream mb-3";
const BRAND_DESC_STYLE = "font-body text-sm leading-relaxed text-cream/60";
const NAV_LABEL_STYLE = "font-body text-xs tracking-widest uppercase text-gold mb-4";
const NAV_LINK_STYLE = "font-body text-sm text-cream/70 hover:text-cream transition-colors duration-200";
const SOCIAL_LABEL_STYLE = NAV_LABEL_STYLE;
const SOCIAL_LINK_STYLE = NAV_LINK_STYLE + " flex items-center gap-2";
const FEED_LINK_STYLE = NAV_LINK_STYLE + " flex items-center gap-1";
const SOCIAL_COL_STYLE = "flex flex-col gap-2";
const DIVIDER_STYLE = "border-t border-gold/20 mt-10 pt-6";
const COPYRIGHT_STYLE = "font-body text-xs text-cream/40 text-center sm:text-left";
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: FOOTER_STYLE, children: /* @__PURE__ */ jsxs("div", { className: CONTAINER_STYLE, children: [
    /* @__PURE__ */ jsxs("div", { className: GRID_STYLE, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: BRAND_TITLE_STYLE, children: "AXIOM" }),
        /* @__PURE__ */ jsx("p", { className: BRAND_DESC_STYLE, children: "The Philosophy Society" })
      ] }),
      /* @__PURE__ */ jsxs("nav", { "aria-label": "Footer navigation", children: [
        /* @__PURE__ */ jsx("p", { className: NAV_LABEL_STYLE, children: "Navigate" }),
        /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2", children: FOOTER_LINKS.map(
          ({ label, to, internal }) => internal ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "a",
            {
              href: to,
              className: NAV_LINK_STYLE,
              children: label
            }
          ) }, to) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: to, className: NAV_LINK_STYLE, children: label }) }, to)
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: SOCIAL_LABEL_STYLE, children: "Connect" }),
        /* @__PURE__ */ jsxs("div", { className: SOCIAL_COL_STYLE, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1 mb-1", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/newsletter/feed.xml",
                className: FEED_LINK_STYLE,
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4 flex-shrink-0",
                      fill: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", { d: "M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1a9.9 9.9 0 019.9 9.9H11.1A7.07 7.07 0 004 12.93V10.1z" })
                    }
                  ),
                  "RSS"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "/newsletter/atom.xml",
                className: FEED_LINK_STYLE,
                children: [
                  /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4 flex-shrink-0",
                      fill: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx("path", { d: "M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 006.18 7.27V4.44M4 10.1a9.9 9.9 0 019.9 9.9H11.1A7.07 7.07 0 004 12.93V10.1z" })
                    }
                  ),
                  "Atom"
                ]
              }
            )
          ] }),
          SOCIAL_LINKS.map(({ label, href, icon }) => /* @__PURE__ */ jsxs(
            "a",
            {
              href,
              target: "_blank",
              rel: "noopener noreferrer",
              className: SOCIAL_LINK_STYLE,
              children: [
                icon,
                label
              ]
            },
            href
          ))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: DIVIDER_STYLE, children: /* @__PURE__ */ jsxs("p", { className: COPYRIGHT_STYLE, children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Axiom — The Philosophy Society. All rights reserved."
    ] }) })
  ] }) });
}
const SITE_NAME = "Axiom ⋅ The Philosophy Society";
const SITE_URL = "https://axiomnsut.in";
const DEFAULT_IMAGE = `${SITE_URL}/assets/logo.png`;
const DEFAULT_DESCRIPTION = "Axiom is the philosophy society at NSUT — fostering intellectual curiosity, critical thinking, and philosophical inquiry since 2017.";
function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  type = "website",
  image = DEFAULT_IMAGE,
  noindex = false
}) {
  const fullTitle = title ? `${title} ⋅ ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = `${SITE_URL}${path}`;
  return /* @__PURE__ */ jsxs(Helmet, { children: [
    /* @__PURE__ */ jsx("title", { children: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "description", content: description }),
    /* @__PURE__ */ jsx("link", { rel: "canonical", href: canonicalUrl }),
    noindex && /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex, nofollow" }),
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: type }),
    /* @__PURE__ */ jsx("meta", { property: "og:site_name", content: SITE_NAME }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: description }),
    /* @__PURE__ */ jsx("meta", { property: "og:url", content: canonicalUrl }),
    /* @__PURE__ */ jsx("meta", { property: "og:locale", content: "en_IN" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: image }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:width", content: "512" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image:height", content: "512" }),
    /* @__PURE__ */ jsx(
      "meta",
      {
        property: "og:image:alt",
        content: "Axiom — The Philosophy Society logo"
      }
    ),
    /* @__PURE__ */ jsx("meta", { name: "twitter:card", content: "summary" }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:title", content: fullTitle }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:description", content: description }),
    /* @__PURE__ */ jsx("meta", { name: "twitter:image", content: image })
  ] });
}
const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    v_uv.y = 1.0 - v_uv.y;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;
const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_uv;
  uniform float u_time;
  uniform vec2 u_resolution;

  // Bayer matrix
  float bayer(vec2 p) {
    vec2 b = mod(floor(p), 4.0);
    float val = 0.0;
    if(b.x == 0.0 && b.y == 0.0) val = 0.0;
    else if(b.x == 1.0 && b.y == 0.0) val = 8.0;
    else if(b.x == 2.0 && b.y == 0.0) val = 2.0;
    else if(b.x == 3.0 && b.y == 0.0) val = 10.0;
    else if(b.x == 0.0 && b.y == 1.0) val = 12.0;
    else if(b.x == 1.0 && b.y == 1.0) val = 4.0;
    else if(b.x == 2.0 && b.y == 1.0) val = 14.0;
    else if(b.x == 3.0 && b.y == 1.0) val = 6.0;
    else if(b.x == 0.0 && b.y == 2.0) val = 3.0;
    else if(b.x == 1.0 && b.y == 2.0) val = 11.0;
    else if(b.x == 2.0 && b.y == 2.0) val = 1.0;
    else if(b.x == 3.0 && b.y == 2.0) val = 9.0;
    else if(b.x == 0.0 && b.y == 3.0) val = 15.0;
    else if(b.x == 1.0 && b.y == 3.0) val = 7.0;
    else if(b.x == 2.0 && b.y == 3.0) val = 13.0;
    else if(b.x == 3.0 && b.y == 3.0) val = 5.0;
    return val / 15.0 - 0.5;
  }

  // Value noise
  float valueNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // fade(t)
    
    // Hash function similar to JS hash2
    float v00 = fract(sin(dot(i + vec2(0.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float v10 = fract(sin(dot(i + vec2(1.0, 0.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float v01 = fract(sin(dot(i + vec2(0.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453123);
    float v11 = fract(sin(dot(i + vec2(1.0, 1.0), vec2(12.9898, 78.233))) * 43758.5453123);
    
    return mix(mix(v00, v10, u.x), mix(v01, v11, u.x), u.y);
  }

  // FBM
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    float tot = 0.0;
    for (int i = 0; i < 4; i++) {
      v += a * valueNoise(p);
      tot += a;
      a *= 0.5;
      p *= 2.1;
    }
    return v / tot;
  }

  void main() {
    vec2 uv = v_uv;
    
    // Match JS time scale: t = (ts / 1000) * waveSpeed * 11
    float t = u_time * 0.4;
    
    // FBM wave
    vec2 wx1 = vec2(uv.x * 3.0 + t, uv.y * 3.0 + sin(t * 0.77) * 0.5);
    vec2 wx2 = vec2(uv.x * 3.0 * 0.8 + t, uv.y * 3.0 * 0.8 + sin(t * 0.77) * 0.5);
    float wave = fbm(wx1 + fbm(wx2));
    
    // Vignette
    vec2 d = uv - 0.5;
    float vig = 1.0 - min(1.0, dot(d, d) * 3.2);
    
    float brightness = clamp(wave * vig, 0.0, 1.0);
    
    // Bayer dither based on pixel coords (gl_FragCoord)
    float b = bayer(gl_FragCoord.xy);
    brightness = clamp(brightness + b * 0.22, 0.0, 1.0);
    
    // Palette
    vec3 c0 = vec3(10.0, 20.0, 15.0) / 255.0;
    vec3 c1 = vec3(26.0, 46.0, 36.0) / 255.0;
    vec3 c2 = vec3(44.0, 74.0, 58.0) / 255.0;
    vec3 c3 = vec3(64.0, 106.0, 82.0) / 255.0;
    
    float lvl = floor(brightness * 4.0);
    vec3 col;
    if(lvl <= 0.0) col = c0;
    else if(lvl == 1.0) col = c1;
    else if(lvl == 2.0) col = c2;
    else col = c3;
    
    gl_FragColor = vec4(col, 1.0);
  }
`;
function Dither({ waveSpeed = 0.05 } = {}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return;
    const W = 240;
    const H = 135;
    canvas.width = W;
    canvas.height = H;
    gl.viewport(0, 0, W, H);
    function compileShader(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }
    const vs = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(uRes, W, H);
    function render2(ts) {
      if (!startRef.current) startRef.current = ts;
      const t = (ts - startRef.current) / 1e3 * waveSpeed * 11;
      gl.uniform1f(uTime, t);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render2);
    }
    rafRef.current = requestAnimationFrame(render2);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [waveSpeed]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      ref: canvasRef,
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
        display: "block"
      }
    }
  );
}
const PROMPTS = [
  "> What do you know?",
  "> What ought you do?",
  "> What can be known?",
  "> What is the good life?",
  "> Does free will exist?",
  "> What is consciousness?",
  "> Is a hotdog a sandwich?",
  "> Why is there something rather than nothing?"
];
function TypewriterPrompt() {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState("typing");
  useEffect(() => {
    const full = PROMPTS[idx];
    if (phase === "typing") {
      if (displayed.length < full.length) {
        const t = setTimeout(
          () => setDisplayed(full.slice(0, displayed.length + 1)),
          22
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("lingering"), 2500);
        return () => clearTimeout(t);
      }
    }
    if (phase === "lingering") {
      const t = setTimeout(() => setPhase("erasing"), 0);
      return () => clearTimeout(t);
    }
    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          14
        );
        return () => clearTimeout(t);
      } else {
        setIdx((i) => (i + 1) % PROMPTS.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, idx]);
  return /* @__PURE__ */ jsxs("span", { className: "font-mono text-gold/80 text-sm md:text-base tracking-wider", children: [
    displayed,
    /* @__PURE__ */ jsx(
      "span",
      {
        className: "animate-blink inline-block bg-gold/80 align-text-bottom ml-0.5",
        style: { width: "0.5em", height: "1.1em" },
        "aria-hidden": "true"
      }
    )
  ] });
}
function Hero() {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative flex flex-col items-center justify-center text-center px-6 overflow-hidden",
      style: { minHeight: "100vh" },
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { zIndex: 0 }, children: /* @__PURE__ */ jsx(
          Dither,
          {
            waveColor: [0.23, 0.43, 0.33],
            disableAnimation: false,
            enableMouseInteraction: true,
            mouseRadius: 0.1,
            colorNum: 4,
            pixelSize: 2,
            waveAmplitude: 0.3,
            waveFrequency: 3,
            waveSpeed: 0.015
          }
        ) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 grid-overlay pointer-events-none",
            style: { zIndex: 1 }
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative flex flex-col items-center",
            style: { zIndex: 2 },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "relative",
                  style: {
                    willChange: "transform",
                    transform: "translateZ(0)"
                  },
                  children: /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "relative",
                      style: {
                        width: "clamp(340px, 54vw, 580px)",
                        height: "clamp(340px, 54vw, 580px)",
                        willChange: "transform",
                        transform: "translateZ(0)"
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: "/assets/icarus.png",
                            alt: "Fall of Icarus",
                            className: "w-full h-full object-contain",
                            style: {
                              willChange: "transform",
                              transform: "translateZ(0)"
                            }
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center gap-0", children: [
                          /* @__PURE__ */ jsx("div", { style: { marginBottom: "0.15em" }, children: /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "font-mono text-cream",
                              style: {
                                fontSize: "0.5rem",
                                letterSpacing: "0.3em",
                                backgroundColor: "rgba(26,26,24,0.72)",
                                padding: "0.35em 0.8em",
                                display: "inline-block",
                                willChange: "transform",
                                transform: "translateZ(0)"
                              },
                              children: "EST. 2017"
                            }
                          ) }),
                          /* @__PURE__ */ jsx("h1", { className: "axiom-wordmark", children: /* @__PURE__ */ jsx("span", { className: "axiom-wordmark-text", children: "AXIOM" }) }),
                          /* @__PURE__ */ jsx(
                            "p",
                            {
                              className: "font-heading italic font-light text-cream/70 tracking-[0.12em]",
                              style: {
                                fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)",
                                marginTop: "0.1em",
                                willChange: "transform",
                                transform: "translateZ(0)"
                              },
                              children: "the philosophy society"
                            }
                          )
                        ] })
                      ]
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "h-7 mt-2", children: /* @__PURE__ */ jsx(TypewriterPrompt, {}) })
            ]
          }
        )
      ]
    }
  );
}
function PullQuote({ children, attribution, className = "" }) {
  return /* @__PURE__ */ jsxs(
    "blockquote",
    {
      className: `border-l-4 border-terracotta pl-6 my-10 ${className}`,
      children: [
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "font-heading text-green italic font-light leading-relaxed",
            style: { fontSize: "clamp(1.1rem, 2vw, 1.4rem)" },
            children
          }
        ),
        attribution && /* @__PURE__ */ jsxs("footer", { className: "mt-3 font-body text-sm text-ink/60 not-italic", children: [
          "— ",
          attribution
        ] })
      ]
    }
  );
}
function SectionDivider({ className = "" }) {
  return /* @__PURE__ */ jsx("div", { className: `w-full ${className}`, children: /* @__PURE__ */ jsx(
    "hr",
    {
      className: "border-none border-t h-px",
      style: { borderTop: "0.5px solid #C9A44C" }
    }
  ) });
}
function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(201,164,76,0.12)"
}) {
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
    cardRef.current.style.setProperty("--spotlight", spotlightColor);
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: cardRef,
      onMouseMove: handleMouseMove,
      className: `spotlight-card ${className}`,
      children
    }
  );
}
const ctaCards = [
  {
    num: "01",
    title: "Meet the Team",
    description: "Meet the team, discover our origins, and read what our alumni say.",
    link: "/team",
    internal: true
  },
  {
    num: "02",
    title: "Events",
    description: "From Chai Pe Charcha to Wheel of Doom: explore what we've been up to.",
    link: "/events",
    internal: true
  },
  {
    num: "03",
    title: "Newsletter",
    description: "Long-form essays, philosophical musings, and ideas worth sitting with.",
    link: "/newsletter/",
    internal: false
  }
];
function useLatestPosts(n = 3) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("/newsletter/posts.json").then((r) => r.ok ? r.json() : []).then((data) => setPosts(data.slice(0, n))).catch(() => {
    });
  }, [n]);
  return posts;
}
function Home() {
  const latestPosts = useLatestPosts(3);
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        path: "/",
        description: "Axiom is the philosophy society at NSUT — fostering philosophical inquiry since 2017."
      }
    ),
    /* @__PURE__ */ jsx(Helmet, { children: /* @__PURE__ */ jsx("script", { type: "application/ld+json", children: JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://axiomnsut.in/#organization",
        name: "Axiom — The Philosophy Society",
        alternateName: "Axiom NSUT",
        url: "https://axiomnsut.in",
        logo: {
          "@type": "ImageObject",
          url: "https://axiomnsut.in/assets/logo.png"
        },
        description: "Axiom is the philosophy society at NSUT, established in 2017. We foster intellectual curiosity and philosophical inquiry.",
        foundingDate: "2017",
        memberOf: {
          "@type": "EducationalOrganization",
          name: "Netaji Subhas University of Technology",
          alternateName: "NSUT",
          url: "https://www.nsut.ac.in"
        },
        sameAs: ["https://www.instagram.com/axiomnsut/"]
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://axiomnsut.in/#website",
        url: "https://axiomnsut.in",
        name: "Axiom — The Philosophy Society",
        publisher: {
          "@id": "https://axiomnsut.in/#organization"
        }
      }
    ]) }) }),
    /* @__PURE__ */ jsx(Hero, {}),
    /* @__PURE__ */ jsx("section", { className: "w-[90%] max-w-5xl mx-auto py-14", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-12 items-center", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(PullQuote, { attribution: "Socrates", children: "The unexamined life is not worth living." }),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "font-body text-ink/70 leading-relaxed mt-8",
            style: {
              fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)"
            },
            children: "Axiom was born from a simple conviction: that philosophy is not merely an academic discipline but a way of inhabiting the world with greater depth and honesty. We create spaces where students from all departments can grapple with fundamental questions about knowledge, morality, consciousness, and society."
          }
        ),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "font-body text-ink/70 leading-relaxed mt-4",
            style: {
              fontSize: "clamp(1.05rem, 1.6vw, 1.2rem)"
            },
            children: [
              "Whether it's a spirited Chai Pe Charcha on free will, a walking seminar around campus, or a curated newsletter essay;",
              " ",
              /* @__PURE__ */ jsx("i", { children: "Axiom is where curiosity finds a home." })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center md:justify-end mt-8 md:mt-0", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/assets/the-thinker.png",
          alt: "The Thinker",
          className: "w-full max-w-sm md:max-w-md object-contain",
          style: {
            willChange: "transform",
            transform: "translateZ(0)"
          }
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "w-[90%] max-w-5xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "w-[90%] max-w-6xl mx-auto py-14", children: [
      /* @__PURE__ */ jsx("p", { className: "label-mono mb-2", children: "— Explore" }),
      /* @__PURE__ */ jsx("h2", { className: "section-heading mb-12", children: "Where would you like to go?" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: ctaCards.map(
        ({ num, title, description, link, internal }) => /* @__PURE__ */ jsxs(
          SpotlightCard,
          {
            className: "p-8 group transition-shadow duration-300 hover:shadow-lg",
            children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "font-mono text-gold/40 mb-4 transition-colors duration-200 group-hover:text-gold/70",
                  style: {
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    lineHeight: 1
                  },
                  children: num
                }
              ),
              /* @__PURE__ */ jsx("h3", { className: "font-heading text-xl text-green mb-3", children: title }),
              /* @__PURE__ */ jsx("p", { className: "font-body text-base text-ink/60 leading-relaxed mb-8", children: description }),
              internal ? /* @__PURE__ */ jsx(
                "a",
                {
                  href: link,
                  className: "font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider",
                  children: "explore →"
                }
              ) : /* @__PURE__ */ jsx(
                "a",
                {
                  href: link,
                  className: "font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider",
                  children: "explore →"
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 right-0 h-px bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" })
            ]
          },
          title
        )
      ) })
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "w-[90%] max-w-5xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "w-[90%] max-w-5xl mx-auto py-14", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-baseline justify-between mb-4 flex-wrap gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-2", children: "— Latest writing" }),
          /* @__PURE__ */ jsx("h2", { className: "section-heading", children: "From the Newsletter" })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/newsletter/",
            className: "font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider",
            children: "all essays →"
          }
        )
      ] }),
      latestPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-gold/20", children: latestPosts.map((post) => /* @__PURE__ */ jsx("article", { className: "py-8 group", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-gold/60 text-xs tracking-widest flex-shrink-0", children: post.dateReadable }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("a", { href: post.url, className: "block", children: /* @__PURE__ */ jsx(
            "h3",
            {
              className: "font-heading font-light text-green group-hover:text-terracotta transition-colors duration-200",
              style: {
                fontSize: "clamp(1.35rem, 2.7vw, 1.8rem)"
              },
              children: post.title
            }
          ) }),
          post.author && /* @__PURE__ */ jsxs("p", { className: "font-body text-xs text-ink/50 mt-1", children: [
            "by ",
            post.author
          ] }),
          post.excerpt && /* @__PURE__ */ jsx("p", { className: "font-body text-base text-ink/60 leading-relaxed mt-2 max-w-2xl", children: post.excerpt })
        ] }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: post.url,
            className: "font-mono text-xs text-terracotta/70 group-hover:text-terracotta transition-colors duration-200 tracking-wider flex-shrink-0 self-start md:self-center",
            children: "read →"
          }
        )
      ] }) }, post.url)) }) : /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-ink/40 tracking-wider", children: "// no posts yet — check back soon" })
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "w-[90%] max-w-5xl mx-auto" }),
    /* @__PURE__ */ jsxs(
      "section",
      {
        className: "relative w-full overflow-hidden",
        style: { minHeight: "70vh" },
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-cover bg-center",
              style: {
                backgroundImage: "url(https://upload.wikimedia.org/wikipedia/commons/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg)"
              }
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#1A1A18]/70" }),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 opacity-20 pointer-events-none",
              style: {
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px"
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative flex flex-col items-center justify-center text-center px-6",
              style: { minHeight: "70vh" },
              children: [
                /* @__PURE__ */ jsx("p", { className: "label-mono text-cream/50 mb-4", children: "Become part of the dialogue" }),
                /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: "font-heading font-light text-cream tracking-[0.2em] mb-8",
                    style: { fontSize: "clamp(3rem, 8vw, 6rem)" },
                    children: "JOIN US"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: "https://chat.whatsapp.com/DGTXdFZKd53B93VvDbPuv6",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-block border border-cream/40 text-cream/90 px-10 py-4 font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-cream hover:text-ink hover:border-cream",
                    children: "Apply Now →"
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Colophon() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-cream dark:bg-[#0E1A14] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Colophon",
        path: "/colophon",
        description: "How the Axiom website was built — typography, tools, colour palette, and deployment details.",
        noindex: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-[82%] max-w-3xl mx-auto py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsx("p", { className: "label-mono mb-4", children: "Colophon" }),
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "font-heading font-light text-green mb-6",
            style: { fontSize: "clamp(2.5rem, 5vw, 4rem)" },
            children: "How this site was made"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/30" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-14 font-body text-ink/80 dark:text-ink/80 leading-relaxed", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-4", children: "Typography" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-baseline", children: [
              /* @__PURE__ */ jsx("span", { className: "font-heading text-2xl font-light text-green w-48 shrink-0", children: "Cormorant Garamond" }),
              /* @__PURE__ */ jsx("span", { className: "text-ink/60", children: "Headings and display text — a revival of the 16th-century Garamond typeface, chosen for its scholarly warmth." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-baseline", children: [
              /* @__PURE__ */ jsx("span", { className: "font-body text-base w-48 shrink-0", children: "DM Sans" }),
              /* @__PURE__ */ jsx("span", { className: "text-ink/60", children: "Body copy and UI labels — a low-contrast geometric grotesque designed for screen legibility." })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
            /* @__PURE__ */ jsxs("div", { className: "flex gap-6 items-baseline", children: [
              /* @__PURE__ */ jsx("span", { className: "font-mono text-sm w-48 shrink-0", children: "IBM Plex Mono" }),
              /* @__PURE__ */ jsx("span", { className: "text-ink/60", children: "Metadata, dates, eyebrow labels — IBM's humanist monospace with a technical character." })
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-ink/40 mt-4", children: "All fonts served via Google Fonts." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-6", children: "Built with" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 border border-gold/20", children: [
            {
              index: "01",
              tool: "React 18",
              tag: "UI",
              desc: "Component library with BrowserRouter for clean URL routing."
            },
            {
              index: "02",
              tool: "Vite",
              tag: "Tooling",
              desc: "Development server and production bundler with hot module replacement."
            },
            {
              index: "03",
              tool: "Tailwind CSS",
              tag: "Styling",
              desc: "Utility-first CSS framework driven by custom design tokens."
            },
            {
              index: "04",
              tool: "Eleventy",
              tag: "Content",
              desc: "Static site generator powering the newsletter layer."
            },
            {
              index: "05",
              tool: "markdown-it",
              tag: "Content",
              desc: "Markdown renderer with footnote plugin for newsletter posts."
            },
            {
              index: "06",
              tool: "Vercel",
              tag: "Deploy",
              desc: "Edge hosting with automatic deploys from the main branch."
            },
            {
              index: "07",
              tool: "GoatCounter",
              tag: "Analytics",
              desc: "Open-source, cookieless, privacy-respecting page view tracking."
            }
          ].map(({ index, tool, tag, desc }) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "border-b border-r border-gold/20 p-5 flex flex-col gap-2",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-gold/50", children: index }),
                  /* @__PURE__ */ jsx("span", { className: "font-mono text-[9px] tracking-[0.18em] uppercase text-terracotta/60", children: tag })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "font-mono text-sm text-green", children: tool }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-ink/55 leading-relaxed", children: desc })
              ]
            },
            tool
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-4", children: "Colour palette" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
            {
              name: "Cream",
              hex: "#F8F4EC",
              bg: "bg-[#F8F4EC]",
              border: true
            },
            {
              name: "Cream Dark",
              hex: "#EDE9DF",
              bg: "bg-[#EDE9DF]",
              border: true
            },
            {
              name: "Green",
              hex: "#2C4A3E",
              bg: "bg-[#2C4A3E]",
              border: false
            },
            {
              name: "Terracotta",
              hex: "#C4704F",
              bg: "bg-[#C4704F]",
              border: false
            },
            {
              name: "Gold",
              hex: "#C9A44C",
              bg: "bg-[#C9A44C]",
              border: false
            },
            {
              name: "Ink",
              hex: "#1A1A18",
              bg: "bg-[#1A1A18]",
              border: false
            }
          ].map(({ name, hex, bg, border }) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `w-8 h-8 rounded-sm shrink-0 ${bg} ${border ? "border border-gold/30" : ""}`
                  }
                ),
                /* @__PURE__ */ jsxs("div", { children: [
                  /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-ink/80", children: name }),
                  /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-ink/40", children: hex })
                ] })
              ]
            },
            name
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-4", children: "Hosting & deployment" }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-ink/70 mb-5", children: [
            "Deployed on",
            " ",
            /* @__PURE__ */ jsx("strong", { className: "text-ink font-medium", children: "Vercel" }),
            " ",
            "from the",
            " ",
            /* @__PURE__ */ jsx("code", { className: "font-mono text-xs bg-cream-dark dark:bg-cream-dark px-1.5 py-0.5 rounded", children: "main" }),
            " ",
            "branch. The site ships as a single static directory merging two independent build systems — React/Vite for the main site and Eleventy for the newsletter — via a Node.js postbuild script."
          ] }),
          /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://github.com/SqrtNegativOne/axiom-web",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-2.5 font-mono text-xs text-green border border-gold/30 px-4 py-2.5 hover:bg-cream-dark dark:hover:bg-cream-dark hover:border-gold/60 transition-colors duration-200",
              children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    className: "shrink-0 opacity-70",
                    children: /* @__PURE__ */ jsx("path", { d: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" })
                  }
                ),
                "github.com/SqrtNegativOne/axiom-web"
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function NotFound() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-cream dark:bg-[#0E1A14] min-h-screen flex flex-col items-center justify-center px-6 text-center", children: [
    /* @__PURE__ */ jsx(SEO, { title: "Page Not Found", path: "/", noindex: true }),
    /* @__PURE__ */ jsx("p", { className: "label-mono mb-6", children: "404" }),
    /* @__PURE__ */ jsx(
      "h1",
      {
        className: "font-heading font-light text-green mb-6",
        style: { fontSize: "clamp(2rem, 5vw, 3.5rem)" },
        children: "The page you have requested exists only in your mind."
      }
    ),
    /* @__PURE__ */ jsx(
      "p",
      {
        className: "font-heading italic font-light text-ink/40 mb-12",
        style: { fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" },
        children: "— Sincerely, A Solipsist."
      }
    ),
    /* @__PURE__ */ jsx(
      "a",
      {
        href: "/",
        className: "font-mono text-xs text-terracotta hover:text-green transition-colors duration-200 tracking-wider",
        children: "← return to the phenomenal world"
      }
    )
  ] });
}
const batch2028 = {
  "Ark Malhotra": {
    name: "Ark Malhotra",
    image: "/data/portraits/ark-malhotra.jpg",
    quote: "All map and no territory made Jack a very dull boy.",
    socials: {
      linkedin: "https://www.linkedin.com/in/ark-malhotra/",
      instagram: "https://www.instagram.com/sqrtnegativ1/"
    }
  },
  "Arnav Gupta": {
    name: "Arnav Gupta",
    image: "/data/portraits/arnav-gupta.jpg",
    quote: "P²C² — Principles before position, comprehension before conclusion",
    socials: {
      linkedin: "https://www.linkedin.com/in/arnav-gupta-65a575323",
      instagram: "https://www.instagram.com/arnavg_2024"
    }
  },
  "Bhavishya Maheshwari": {
    name: "Bhavishya Maheshwari",
    image: "/data/portraits/bhavishya-maheshwari.jpg",
    quote: "The dildo of consequences rarely arrives lubed.",
    socials: {
      linkedin: "https://www.linkedin.com/in/bhavishyamaheshwari/",
      instagram: "https://www.instagram.com/bhavishyamaheshwari19/"
    }
  },
  Hansika: {
    name: "Hansika",
    image: "/data/portraits/hansika.jpeg",
    quote: "Everything you lose is a step you take",
    socials: { linkedin: "https://www.linkedin.com/in/hansika-c-bbb34339a/" }
  },
  "Iba Shibli": {
    name: "Iba Shibli",
    image: "/data/portraits/iba-shibli.jpg",
    quote: "Things happen, life goes on.",
    socials: {
      linkedin: "https://www.linkedin.com/in/iba-shibli-277a37323",
      instagram: "https://www.instagram.com/phoenix_69185"
    }
  },
  "Prableen Kaur": {
    name: "Prableen Kaur",
    image: "/data/portraits/prableen-kaur.png",
    quote: "Aspire to Inspire",
    socials: {
      linkedin: "https://www.linkedin.com/in/linkdin-link-prableenkaur",
      instagram: "https://www.instagram.com/prableen.19/"
    }
  },
  "Taneesha Bangia": {
    name: "Taneesha Bangia",
    image: "/data/portraits/taneesha-bangia.jpg",
    quote: "Everything that is real was imagined first",
    socials: { linkedin: "https://www.linkedin.com/in/taneesha-bangia" }
  },
  "Utsav Dwivedi": {
    name: "Utsav Dwivedi",
    image: "/data/portraits/utsav-dwivedi.jpg",
    quote: "Sunrise parabellum",
    socials: {
      linkedin: "https://www.linkedin.com/in/utsav-dwivedi-980575323",
      instagram: "https://www.instagram.com/utsavdwivedi5"
    }
  },
  Anisha: { name: "Anisha" },
  Devika: { name: "Devika" },
  Erut: { name: "Erut" },
  Kartavya: { name: "Kartavya" },
  Meghal: { name: "Meghal" },
  Poorva: { name: "Poorva" },
  Shreshth: { name: "Shreshth" },
  Vibhuti: { name: "Vibhuti" }
};
const batch2029 = {
  "Adit Gaur": {
    name: "Adit Gaur",
    image: "/data/portraits/adit-gaur.jpeg",
    quote: "To pray is to accept defeat",
    socials: {
      linkedin: "https://www.linkedin.com/in/aditgaur/",
      instagram: "https://www.instagram.com/adit__gaur_/"
    }
  },
  "Aditi Poonia": {
    name: "Aditi Poonia",
    image: "/data/portraits/aditi-poonia.jpeg",
    quote: "He who has a why to live can bear almost any how.",
    socials: {
      linkedin: "https://in.linkedin.com/in/aditi-poonia-55638b3a5",
      instagram: "https://www.instagram.com/a.deity_333"
    }
  },
  "Adwita Suri": {
    name: "Adwita Suri",
    image: "/data/portraits/adwita-suri.jpg",
    quote: "I exist. In thousand of agonies I exist.",
    socials: { instagram: "https://www.instagram.com/adwitasuri" }
  },
  Anju: {
    name: "Anju",
    image: "/data/portraits/anju.jpg",
    quote: "Every season serves a purpose!",
    socials: {
      linkedin: "https://www.linkedin.com/in/anju-kumari-a12a0936b",
      instagram: "https://www.instagram.com/i_anjuuuuu"
    }
  },
  "Ankit Kumar": {
    name: "Ankit Kumar",
    image: "/data/portraits/ankit-kumar.jpg",
    quote: "Climb mountain so you can see the world, not so the world can see you.",
    socials: {
      linkedin: "https://in.linkedin.com/in/ankit-kumar-42800a37b",
      instagram: "https://www.instagram.com/ankit_kumar0_o"
    }
  },
  "Ashish Joshi": {
    name: "Ashish Joshi",
    image: "/data/portraits/ashish-joshi.jpg",
    quote: "Life is pointless, so make sure to embarrass yourself in every possible way",
    socials: {
      linkedin: "https://www.linkedin.com/in/ashishjoshi540",
      instagram: "https://www.instagram.com/miselfashish"
    }
  },
  "Charu Vats": {
    name: "Charu Vats",
    image: "/data/portraits/charu-vats.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/charu-vats-a93586338",
      instagram: "https://www.instagram.com/designdiaries5"
    }
  },
  "Dev Manchanda": {
    name: "Dev Manchanda",
    image: "/data/portraits/dev-manchanda.png",
    quote: "I always get to where I’m going by walking away from where I’ve been. — Winnie the Pooh",
    socials: {
      linkedin: "https://www.linkedin.com/in/dev-manchanda-7a0867269/",
      instagram: "https://www.instagram.com/manchandadeva/"
    }
  },
  "Dhruv Bansal": {
    name: "Dhruv Bansal",
    image: "/data/portraits/dhruv-bansal.jpeg",
    quote: "We only feel free because we lack the language to articulate our unfreedom",
    socials: { linkedin: "https://www.linkedin.com/in/dhruv-bansal-35270b302" }
  },
  "Dushyant Singh Rathore": {
    name: "Dushyant Singh Rathore",
    image: "/data/portraits/dushyant-rathore.jpg",
    quote: "Loyalty is tested when betrayal is the most profitable option",
    socials: {
      linkedin: "https://www.linkedin.com/in/dushyant-singh-rathore-7bb319242",
      instagram: "https://www.instagram.com/dushyant_.rathore"
    }
  },
  Himanshi: {
    name: "Himanshi",
    image: "/data/portraits/himanshi.jpeg",
    quote: "Whatever will be, will be",
    socials: {
      linkedin: "https://www.linkedin.com/in/himanshi-b2b478359",
      instagram: "https://www.instagram.com/himanshiii_rohilla"
    }
  },
  "Joseph Jisso Aliyath": {
    name: "Joseph Jisso Aliyath",
    image: "/data/portraits/joseph-aliyath.jpg",
    quote: "Hallelujah",
    socials: {
      linkedin: "https://www.linkedin.com/in/josephjissoa",
      instagram: "https://www.instagram.com/joseph_jisso"
    }
  },
  "Khushi Mittal": {
    name: "Khushi Mittal",
    image: "/data/portraits/khushi-mittal.jpeg",
    quote: "A smile is a curve that sets everything straight.",
    socials: { instagram: "https://www.instagram.com/khushi_mittal01" }
  },
  "Md Rashid Iqbal": {
    name: "Md Rashid Iqbal",
    image: "/data/portraits/md-rashid-iqbal.jpg",
    quote: "One is never afraid of the unknown; one is afraid of the known coming to an end",
    socials: {
      linkedin: "https://www.linkedin.com/in/md-rashid-iqbal01",
      instagram: "https://www.instagram.com/rashid_zyannn"
    }
  },
  "Navratan Choudhary": {
    name: "Navratan Choudhary",
    image: "/data/portraits/navratan-choudhary.jpeg",
    quote: "It is better to die on your feet than to live on your knees.",
    socials: {
      linkedin: "https://www.linkedin.com/in/navratan-choudhary-aa81bb325",
      instagram: "https://www.instagram.com/navratan_choudhary10"
    }
  },
  "Prachetas Shukla": {
    name: "Prachetas Shukla",
    image: "/data/portraits/prachetas-shukla.jpeg",
    quote: "Curiosity is Discipline disguised as Wonder",
    socials: { linkedin: "https://www.linkedin.com/in/prachetasshukla/" }
  },
  "Prince Gangwar": {
    name: "Prince Gangwar",
    image: "/data/portraits/prince-gangwar.jpg",
    quote: "The truth is rarely pure and never simple.",
    socials: { instagram: "https://www.instagram.com/ern1l/" }
  },
  "Shivangi Amat": {
    name: "Shivangi Amat",
    image: "/data/portraits/shivangi-amat.png",
    quote: "Life is short. Smile while you still have teeth.",
    socials: {
      linkedin: "https://www.linkedin.com/in/shivangi-amat-431112369/",
      instagram: "https://www.instagram.com/_shhhivangii/"
    }
  },
  "Tushar Kumar Karn": {
    name: "Tushar Kumar Karn",
    image: "/data/portraits/tushar-karn.png",
    quote: "If you can be anything in this world, be kind.",
    socials: {
      linkedin: "https://www.linkedin.com/in/tushar-kumar-karn-9a5356378",
      instagram: "https://www.instagram.com/tushar__karn____"
    }
  },
  "Vinayak Mittal": {
    name: "Vinayak Mittal",
    image: "/data/portraits/vinayak-mittal.png",
    quote: "The universe is under no obligation to make sense to you. — Neil deGrasse Tyson",
    socials: {
      linkedin: "https://www.linkedin.com/in/vinayak-mittal-2846b4312/",
      instagram: "https://www.instagram.com/vinayak.mittal.9/"
    }
  },
  Ashu: { name: "Ashu" },
  "Ayush Rai": { name: "Ayush Rai" },
  Chetna: { name: "Chetna" },
  Chirag: { name: "Chirag" },
  Devansh: { name: "Devansh" },
  Divyansh: { name: "Divyansh" },
  "Garv Chawla": { name: "Garv Chawla" },
  "Garv Singhal": { name: "Garv Singhal" },
  Jatin: { name: "Jatin" },
  Nandini: { name: "Nandini" },
  Neha: { name: "Neha" },
  Nikhil: { name: "Nikhil" },
  Prachi: { name: "Prachi" },
  Pranav: { name: "Pranav" },
  Robin: { name: "Robin" },
  Rudra: { name: "Rudra" },
  Sanskriti: { name: "Sanskriti" },
  Sarah: { name: "Sarah" },
  Shaurya: { name: "Shaurya" },
  Shivam: { name: "Shivam" },
  Shreya: { name: "Shreya" },
  Sonia: { name: "Sonia" },
  Supreet: { name: "Supreet" },
  Tanu: { name: "Tanu" }
};
const core$1 = [
  {
    role: "President",
    members: [
      batch2028["Bhavishya Maheshwari"],
      batch2028["Arnav Gupta"]
    ]
  },
  {
    role: "Vice President",
    members: [
      batch2028["Poorva"],
      batch2028["Hansika"]
    ]
  },
  {
    role: "Director of External Affairs",
    members: [
      batch2028["Taneesha Bangia"]
    ]
  },
  {
    role: "Director of Tech",
    members: [
      batch2028["Ark Malhotra"]
    ]
  },
  {
    role: "General Secretary",
    members: [
      batch2028["Erut"],
      batch2028["Utsav Dwivedi"]
    ]
  },
  {
    role: "Joint Secretary",
    members: [
      batch2029["Ashish Joshi"],
      batch2028["Vibhuti"],
      batch2028["Prableen Kaur"],
      batch2029["Himanshi"]
    ]
  },
  {
    role: "Social Media and Design Head",
    members: [
      batch2028["Erut"],
      batch2028["Devika"]
    ]
  },
  {
    role: "Podcast Head",
    members: [
      batch2028["Utsav Dwivedi"],
      batch2028["Poorva"]
    ]
  },
  {
    role: "Newsletter Heads",
    members: [
      batch2028["Ark Malhotra"],
      batch2028["Iba Shibli"]
    ]
  },
  {
    role: "Filmmaking Head",
    members: [
      batch2028["Kartavya"],
      batch2028["Shreshth"]
    ]
  },
  {
    role: "PARTY HEADS",
    members: [
      batch2028["Bhavishya Maheshwari"],
      batch2028["Utsav Dwivedi"],
      batch2028["Erut"]
    ]
  }
];
const members$1 = [
  batch2029["Adit Gaur"],
  batch2029["Aditi Poonia"],
  batch2029["Adwita Suri"],
  batch2029["Anju"],
  batch2029["Ankit Kumar"],
  batch2029["Ashish Joshi"],
  batch2029["Charu Vats"],
  batch2029["Dev Manchanda"],
  batch2029["Dhruv Bansal"],
  batch2029["Dushyant Singh Rathore"],
  batch2029["Himanshi"],
  batch2029["Joseph Jisso Aliyath"],
  batch2029["Khushi Mittal"],
  batch2029["Md Rashid Iqbal"],
  batch2029["Navratan Choudhary"],
  batch2029["Prachetas Shukla"],
  batch2029["Prince Gangwar"],
  batch2029["Shivangi Amat"],
  batch2029["Tushar Kumar Karn"],
  batch2029["Vinayak Mittal"],
  batch2029["Ashu"],
  batch2029["Ayush Rai"],
  batch2029["Chetna"],
  batch2029["Chirag"],
  batch2029["Devansh"],
  batch2029["Divyansh"],
  batch2029["Garv Chawla"],
  batch2029["Garv Singhal"],
  batch2029["Jatin"],
  batch2029["Nandini"],
  batch2029["Neha"],
  batch2029["Nikhil"],
  batch2029["Prachi"],
  batch2029["Pranav"],
  batch2029["Robin"],
  batch2029["Rudra"],
  batch2029["Sanskriti"],
  batch2029["Sarah"],
  batch2029["Shaurya"],
  batch2029["Shivam"],
  batch2029["Shreya"],
  batch2029["Sonia"],
  batch2029["Supreet"],
  batch2029["Tanu"]
];
const alumniQuotes = [
  {
    name: "Rounak Raman",
    batch: "2021",
    image: "/data/alumni/Rounak_Raman.webp",
    thought: "Axiom was the spark that lit my flame, where thoughts collided, never the same. In halls of logic, minds would roam, yet every idea felt like home."
  },
  {
    name: "Vishwas Latiyan",
    batch: "2017–2021",
    image: "/data/alumni/Vishwas_Latiyan.webp",
    thought: "What started as a tiny interest in Metaphysics eventually opened a door to a whole new world. I met incredible people — each one bringing their own unique, thoughtful spirit to every conversation."
  },
  {
    name: "Vehuvoyi Theluo",
    batch: "2023",
    image: "/data/alumni/Vehuvoyi_Theluo.webp",
    thought: "There’ll always be a soft spot in my heart for Axiom — the incredible people & the endless but engaging Chai pe Charchas. Brought a lot more warmth to an otherwise hectic course."
  },
  {
    name: "Kushagra Lakhwani",
    batch: "2025",
    image: "/data/alumni/KUSHAGRA_LAKHWANI.webp",
    thought: "Axiom is a state of mind and though I’ll leave the place, I’ll still have a piece of everyone in my heart."
  },
  {
    name: "Gautam Tayal",
    batch: "2020–2024",
    image: "/data/alumni/Gautam_Tayal.webp",
    thought: "Honestly, Axiom was one of the good things about my college life. Wishing all the best to the society and my juniors :)"
  },
  {
    name: "Naman Dixit",
    batch: "2019–2023",
    image: "/data/alumni/Naman_Dixit.webp",
    thought: "Least kaleshi place in college ❤️ A part of college that I still have close to me — should’ve spent a lot more time here. The world may end but CPCs shall continue forever!"
  },
  {
    name: "Bharat Sethi",
    batch: "2019–2023",
    image: "/data/alumni/Bharat.webp",
    thought: "From ethical dilemmas and philosophical paradoxes to wild conspiracy theories, Axiom opened up a whole new world of thought for me. It gave me a space to engage with both like-minded and contrasting perspectives."
  },
  {
    name: "Nisarg Kumar",
    batch: "2024",
    image: "/data/alumni/nisagar_kumar.webp",
    thought: "Axiom was one of the best and most chill societies at NSUT. The atmosphere was welcoming, and the seniors were incredibly supportive. I have some really fond memories of being part of Axiom."
  },
  {
    name: "Aman Rana",
    batch: "2022",
    image: "/data/alumni/aman_rana.webp",
    thought: "Axiom was the perfect place for some horizon-broadening adventure! Diving into so many different ways of thinking was such an enriching journey, really honing my ability to see things from every angle."
  }
];
function DefaultAvatar({ className = "" }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center justify-center bg-green ${className}`,
      children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 80 80", fill: "none", className: "w-3/5 h-3/5", children: [
        /* @__PURE__ */ jsx("circle", { cx: "40", cy: "28", r: "12", fill: "#F8F4EC", opacity: "0.35" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M16 72c0-13.255 10.745-24 24-24s24 10.745 24 24",
            fill: "#F8F4EC",
            opacity: "0.35"
          }
        )
      ] })
    }
  );
}
function useSingleLineName(name) {
  const ref = useRef(null);
  const [displayName, setDisplayName] = useState(name);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24;
    if (el.offsetHeight <= lineHeight * 1.4) return;
    const words = name.split(" ");
    while (words.length > 1) {
      words.pop();
      el.textContent = words.join(" ");
      if (el.offsetHeight <= lineHeight * 1.4) {
        setDisplayName(words.join(" "));
        return;
      }
    }
    let chars = words[0];
    while (chars.length > 2) {
      chars = chars.slice(0, -1);
      el.textContent = chars + "..";
      if (el.offsetHeight <= lineHeight * 1.4) {
        setDisplayName(chars + "..");
        return;
      }
    }
    setDisplayName(chars + "..");
  }, [name]);
  return { ref, displayName };
}
function SocialIcons({ name, socials }) {
  if (!socials) return null;
  const { linkedin, instagram } = socials;
  const hasLinkedin = linkedin && linkedin !== "#";
  const hasInstagram = instagram && instagram !== "#";
  if (!hasLinkedin && !hasInstagram) return null;
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2.5 mt-2", children: [
    hasLinkedin && /* @__PURE__ */ jsx(
      "a",
      {
        href: linkedin,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-ink/30 hover:text-terracotta transition-colors duration-200",
        "aria-label": `${name} on LinkedIn`,
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-3.5 h-3.5",
            fill: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" })
          }
        )
      }
    ),
    hasInstagram && /* @__PURE__ */ jsx(
      "a",
      {
        href: instagram,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "text-ink/30 hover:text-terracotta transition-colors duration-200",
        "aria-label": `${name} on Instagram`,
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            className: "w-3.5 h-3.5",
            fill: "currentColor",
            viewBox: "0 0 24 24",
            children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
          }
        )
      }
    )
  ] });
}
function TeamPortraitCard({
  name,
  image,
  quote,
  socials,
  compact = false
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const { ref: nameRef, displayName } = useSingleLineName(name);
  const avatarSize = compact ? "w-20 h-20" : "w-32 h-32";
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center group", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `${avatarSize} rounded-full overflow-hidden mb-3 ring-2 ring-gold/30 group-hover:ring-gold transition-all duration-300`,
          children: image && !imgFailed ? /* @__PURE__ */ jsx(
            "img",
            {
              src: image,
              alt: `Portrait of ${name}`,
              className: "w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500",
              loading: "lazy",
              onError: () => setImgFailed(true)
            }
          ) : /* @__PURE__ */ jsx(DefaultAvatar, { className: "w-full h-full" })
        }
      ),
      compact && quote && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20",
          "aria-hidden": "true",
          children: [
            /* @__PURE__ */ jsx("div", { className: "bg-cream dark:bg-[#142219] border border-gold/40 rounded-2xl px-3.5 py-2.5 shadow-md", children: /* @__PURE__ */ jsxs("p", { className: "font-body text-xs text-ink/70 italic leading-relaxed text-center", children: [
              "“",
              quote,
              "”"
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-end gap-1 mt-1", children: [
              /* @__PURE__ */ jsx("div", { className: "w-2 h-2 rounded-full bg-cream dark:bg-[#142219] border border-gold/40" }),
              /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-cream dark:bg-[#142219] border border-gold/40" }),
              /* @__PURE__ */ jsx("div", { className: "w-1 h-1 rounded-full bg-cream dark:bg-[#142219] border border-gold/40" })
            ] })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      "h4",
      {
        ref: nameRef,
        className: `font-heading font-medium text-green ${compact ? "text-base mb-0.5" : "text-xl mb-1"}`,
        children: displayName
      }
    ),
    !compact && quote && /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/60 italic leading-relaxed max-w-xs", children: [
      "“",
      quote,
      "”"
    ] }),
    /* @__PURE__ */ jsx(SocialIcons, { name, socials })
  ] });
}
function AlumniQuoteCard({ name, batch, image, thought }) {
  const [imgFailed, setImgFailed] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "bg-cream-dark p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-14 h-14 rounded-full overflow-hidden flex-shrink-0", children: image && !imgFailed ? /* @__PURE__ */ jsx(
        "img",
        {
          src: image,
          alt: `Portrait of ${name}`,
          className: "w-full h-full object-cover object-top",
          loading: "lazy",
          onError: () => setImgFailed(true)
        }
      ) : /* @__PURE__ */ jsx(DefaultAvatar, { className: "w-full h-full" }) }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "font-heading text-lg font-medium text-green leading-tight", children: name }),
        /* @__PURE__ */ jsxs("p", { className: "font-body text-xs text-gold tracking-wider", children: [
          "Batch ",
          batch
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
    /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/70 leading-relaxed italic", children: [
      "“",
      thought,
      "”"
    ] })
  ] });
}
const galleryImages = [
  "/data/gallery/gal1.webp",
  "/data/gallery/gal2.webp",
  "/data/gallery/gal3.webp",
  "/data/gallery/gal4.webp",
  "/data/gallery/gal5.webp",
  "/data/gallery/1742112133133.webp",
  "/data/gallery/1742113242276.webp",
  "/data/gallery/1742113242495.webp"
];
function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);
  const [loaded, setLoaded] = useState(() => /* @__PURE__ */ new Set([0]));
  const show = useCallback((idx) => {
    setCurrent(idx);
    setLoaded((prev2) => new Set(prev2).add(idx));
  }, []);
  const prev = () => show((current - 1 + galleryImages.length) % galleryImages.length);
  const next = () => show((current + 1) % galleryImages.length);
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 4e3);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, current, show]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative overflow-hidden bg-ink",
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      style: { height: "clamp(260px, 45vw, 520px)" },
      children: [
        galleryImages.map((src, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0 transition-opacity duration-700",
            style: { opacity: idx === current ? 1 : 0 },
            children: [
              loaded.has(idx) && /* @__PURE__ */ jsx(
                "img",
                {
                  src,
                  alt: `Gallery image ${idx + 1}`,
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.target.parentElement.style.display = "none";
                  }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" })
            ]
          },
          src
        )),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: prev,
            className: "absolute left-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-4xl leading-none px-2 transition-colors",
            "aria-label": "Previous image",
            children: "‹"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: next,
            className: "absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-cream text-4xl leading-none px-2 transition-colors",
            "aria-label": "Next image",
            children: "›"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2", children: galleryImages.map((_, idx) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => show(idx),
            className: `w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === current ? "bg-gold w-4" : "bg-cream/40"}`,
            "aria-label": `Go to image ${idx + 1}`
          },
          idx
        )) })
      ]
    }
  );
}
function Team() {
  const [cpcClicked, setCpcClicked] = useState(false);
  useEffect(() => {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT
    );
    const toWrap = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.includes("Sunrise parabellum"))
        toWrap.push(node);
    }
    toWrap.forEach((textNode) => {
      const parts = textNode.textContent.split("Sunrise parabellum");
      const frag = document.createDocumentFragment();
      parts.forEach((part, i) => {
        frag.appendChild(document.createTextNode(part));
        if (i < parts.length - 1) {
          const a = document.createElement("a");
          a.href = "https://fitgirl-repacks.site/disco-elysium/";
          a.target = "_blank";
          a.rel = "noopener noreferrer";
          a.textContent = "Sunrise parabellum";
          a.style.cssText = "color:inherit;text-decoration:underline;text-underline-offset:3px";
          frag.appendChild(a);
        }
      });
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Meet the Team",
        path: "/team",
        description: "Meet the Axiom team — our mission, vision, and the people behind NSUT's philosophy society, established in 2017."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "max-w-4xl mx-auto px-6 py-16 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "label-mono mb-3", children: "Who We Are" }),
      /* @__PURE__ */ jsx("h1", { className: "section-heading mb-6", children: "About Axiom" }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-gold/50 mx-auto mb-8" }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "font-body text-ink/70 leading-relaxed max-w-2xl mx-auto",
          style: { fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)" },
          children: "Axiom is the philosophy society of Netaji Subhas University of Technology. Founded by a group of students who believed that the engineer's mind is incomplete without the philosopher's eye, we have grown into a vibrant community of curious thinkers."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-4xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsx("p", { className: "label-mono mb-3", children: "Our Story" }),
      /* @__PURE__ */ jsx("h2", { className: "font-heading text-green font-light text-3xl mb-8", children: "How it began" }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "font-body text-ink/70 leading-relaxed mb-4",
              style: {
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)"
              },
              children: "Like all great societies, Axiom had its genesis in a question. No one remembers what this question was, but it sparked a prarie fire that consumed our intellectual ennui, leaving only the legacy of curiosity in its wake. Something far greater than the true answer to the original question could have given us."
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "font-body text-ink/70 leading-relaxed",
              style: {
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)"
              },
              children: "What started as informal chai sessions in the NSUT canteen gradually evolved into structured events, philosophical walks, annual festivals, and eventually this — a full-fledged society with a newsletter, alumni network, and a reputation for being the most intellectually adventurous society on campus."
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(PullQuote, { children: "Philosophy begins in wonder. And at Axiom, the wonder never stops." }),
          /* @__PURE__ */ jsxs(
            "p",
            {
              className: "font-body text-ink/70 leading-relaxed mt-4",
              style: {
                fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)"
              },
              children: [
                "Our signature event,",
                " ",
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    onClick: () => setCpcClicked(true),
                    style: {
                      cursor: cpcClicked ? "default" : "pointer"
                    },
                    children: cpcClicked ? "Charas Par Charcha" : "Chai Pe Charcha"
                  }
                ),
                " ",
                "(CPC), remains the beating heart of Axiom. Every week, without fail, students gather over hot cups of chai to debate, discuss, and occasionally disagree — loudly, joyfully, philosophically."
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-heading text-center mb-3", children: "The Core" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-ink/60 text-center mb-14 max-w-xl mx-auto", children: "Dedicated stewards sworn to steer Axiom." }),
      core$1.map((group) => /* @__PURE__ */ jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gold/20" }),
          /* @__PURE__ */ jsx("h3", { className: "label-mono px-4", children: group.role }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gold/20" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-10", children: group.members.map((member) => /* @__PURE__ */ jsx("div", { className: "w-40", children: /* @__PURE__ */ jsx(TeamPortraitCard, { ...member }) }, member.name)) })
      ] }, group.role))
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsx("h2", { className: "section-heading text-center mb-3", children: "Members" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-ink/60 text-center mb-14 max-w-xl mx-auto", children: "The reasoned foot-soldiers of Axiom." }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-x-4 gap-y-6", children: members$1.map((member) => /* @__PURE__ */ jsx("div", { className: "w-[120px]", children: /* @__PURE__ */ jsx(TeamPortraitCard, { ...member, compact: true }) }, member.name)) })
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsx("p", { className: "label-mono mb-3 text-center", children: "Emigrants of Omelas" }),
      /* @__PURE__ */ jsx("h2", { className: "section-heading text-center mb-3", children: "Alumni" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-ink/60 text-center mb-12 max-w-xl mx-auto", children: "In their own words — what Axiom meant to the people who built it." }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: alumniQuotes.map((person) => /* @__PURE__ */ jsx(AlumniQuoteCard, { ...person }, person.name)) }),
      /* @__PURE__ */ jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsx(
        "a",
        {
          href: "/team/2025",
          className: "font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4",
          children: "See previous leadership →"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "py-16", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-6xl mx-auto px-6 mb-8", children: /* @__PURE__ */ jsx("h2", { className: "section-heading text-center mb-4", children: "Gallery" }) }),
      /* @__PURE__ */ jsx(GalleryCarousel, {})
    ] })
  ] });
}
const batch2026 = {
  Nikita: {
    name: "Nikita",
    image: "/data/portraits/nikita.jpeg",
    quote: "Leadership is about making others better as a result of your presence.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Arnav Khare": {
    name: "Arnav Khare",
    image: "/data/portraits/arnav khare.jpg",
    quote: "A leader is one who knows the way, goes the way, and shows the way.",
    socials: { linkedin: "#", instagram: "#" }
  },
  Tejas: {
    name: "Tejas",
    image: "/data/portraits/tejas.jpg",
    quote: "Empowering others is the key to success.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Shrey Paul": {
    name: "Shrey Paul",
    image: "/data/portraits/shrey-paul.jpg",
    quote: "Great leaders don't set out to be a leader, they set out to make a difference.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Garima Singh": {
    name: "Garima Singh",
    image: "/data/portraits/garima-singh.jpg",
    quote: "The secret of getting ahead is getting started.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Dev Vats": {
    name: "Dev Vats",
    image: "/data/portraits/dev vats.jpeg",
    quote: "Discipline is the bridge between goals and accomplishment.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Nikhil Kumar": {
    name: "Nikhil Kumar",
    image: "/data/portraits/nikhil kumar.jpg",
    quote: "Success is the sum of small efforts repeated day in and day out.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Shreyashi Das": {
    name: "Shreyashi Das",
    image: "/data/portraits/shreyashi-das.jpg",
    quote: "Social media is not a media. The key is to listen, engage, and build relationships.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Sachin Rout": {
    name: "Sachin Rout",
    image: "/data/portraits/sachin-rout.jpg",
    quote: "Design is not just what it looks like, but how it works.",
    socials: { linkedin: "#", instagram: "#" }
  },
  "Pratham Puri": {
    name: "Pratham Puri",
    image: "/data/portraits/pratham-puri.jpg",
    quote: "Content is the reason search began in the first place.",
    socials: { linkedin: "#", instagram: "#" }
  }
};
const teamLegacy = [
  {
    role: "President",
    members: [
      batch2026["Nikita"],
      batch2026["Arnav Khare"]
    ]
  },
  {
    role: "Vice President",
    members: [
      batch2026["Tejas"],
      batch2026["Shrey Paul"]
    ]
  },
  {
    role: "General Secretary",
    members: [
      batch2026["Garima Singh"]
    ]
  },
  {
    role: "Admin Directors",
    members: [
      batch2026["Dev Vats"],
      batch2026["Nikhil Kumar"]
    ]
  },
  {
    role: "Social Media Director",
    members: [
      batch2026["Shreyashi Das"]
    ]
  },
  {
    role: "Design Director",
    members: [
      batch2026["Sachin Rout"]
    ]
  },
  {
    role: "Content Director",
    members: [
      batch2026["Pratham Puri"]
    ]
  }
];
const batch2027 = {
  "Adarsh Jain": {
    name: "Adarsh Jain",
    image: "/data/portraits/adarsh-jain.jpg",
    quote: "Do not take life seriously. You will never get out of it alive.",
    socials: {
      linkedin: "https://www.linkedin.com/in/adarsh-jain-ba2801291/",
      instagram: "https://www.instagram.com/jainwin_adarsh/"
    }
  },
  Vivek: { name: "Vivek" },
  "Aman Kumar": {
    name: "Aman Kumar",
    image: "/data/portraits/aman-kumar.jpg",
    quote: "Make The Logo Bigger",
    socials: {
      linkedin: "https://in.linkedin.com/in/aman-kumar-meena-754816288"
    }
  },
  "Akshay Yadav": { name: "Akshay Yadav" },
  Arusha: { name: "Arusha" },
  Ribhu: { name: "Ribhu" },
  Dhruv: { name: "Dhruv" },
  Kanishka: { name: "Kanishka" },
  Keshav: { name: "Keshav" },
  Shreyash: { name: "Shreyash" },
  Ujjwal: { name: "Ujjwal" }
};
const core = [
  {
    role: "President",
    members: [
      batch2027["Adarsh Jain"],
      batch2027["Vivek"]
    ]
  },
  {
    role: "Vice President",
    members: [
      batch2027["Aman Kumar"],
      batch2027["Akshay Yadav"]
    ]
  },
  {
    role: "General Secretary",
    members: [
      batch2027["Arusha"],
      batch2027["Ribhu"]
    ]
  },
  {
    role: "Director of External Affairs",
    members: [
      batch2027["Dhruv"]
    ]
  },
  {
    role: "Treasurer",
    members: [
      batch2027["Kanishka"]
    ]
  },
  {
    role: "Director of Strategy",
    members: [
      batch2027["Keshav"]
    ]
  },
  {
    role: "Joint Secretary",
    members: [
      batch2027["Shreyash"],
      batch2027["Ujjwal"]
    ]
  }
];
const execomm = [
  batch2028["Ark Malhotra"],
  batch2028["Arnav Gupta"],
  batch2028["Bhavishya Maheshwari"],
  batch2028["Hansika"],
  batch2028["Iba Shibli"],
  batch2028["Prableen Kaur"],
  batch2028["Taneesha Bangia"],
  batch2028["Utsav Dwivedi"],
  batch2028["Anisha"],
  batch2028["Devika"],
  batch2028["Erut"],
  batch2028["Kartavya"],
  batch2028["Meghal"],
  batch2028["Poorva"],
  batch2028["Shreshth"],
  batch2028["Vibhuti"]
];
const members = [
  batch2029["Adit Gaur"],
  batch2029["Aditi Poonia"],
  batch2029["Adwita Suri"],
  batch2029["Anju"],
  batch2029["Ankit Kumar"],
  batch2029["Ashish Joshi"],
  batch2029["Charu Vats"],
  batch2029["Dev Manchanda"],
  batch2029["Dhruv Bansal"],
  batch2029["Dushyant Singh Rathore"],
  batch2029["Himanshi"],
  batch2029["Joseph Jisso Aliyath"],
  batch2029["Khushi Mittal"],
  batch2029["Md Rashid Iqbal"],
  batch2029["Navratan Choudhary"],
  batch2029["Prachetas Shukla"],
  batch2029["Prince Gangwar"],
  batch2029["Shivangi Amat"],
  batch2029["Tushar Kumar Karn"],
  batch2029["Vinayak Mittal"],
  batch2029["Ashu"],
  batch2029["Ayush Rai"],
  batch2029["Chetna"],
  batch2029["Chirag"],
  batch2029["Devansh"],
  batch2029["Divyansh"],
  batch2029["Garv Chawla"],
  batch2029["Garv Singhal"],
  batch2029["Jatin"],
  batch2029["Nandini"],
  batch2029["Neha"],
  batch2029["Nikhil"],
  batch2029["Prachi"],
  batch2029["Pranav"],
  batch2029["Robin"],
  batch2029["Rudra"],
  batch2029["Sanskriti"],
  batch2029["Sarah"],
  batch2029["Shaurya"],
  batch2029["Shivam"],
  batch2029["Shreya"],
  batch2029["Sonia"],
  batch2029["Supreet"],
  batch2029["Tanu"]
];
const teamLegacy2025 = [
  ...core,
  { role: "Executive Committee", members: execomm },
  { role: "Members", members }
];
const teams = {
  "2024": teamLegacy,
  "2025": teamLegacy2025
};
function TeamByYear() {
  const { year } = useParams();
  const teamData = teams[year];
  const nextYear = (parseInt(year) + 1).toString();
  const prevYear = (parseInt(year) - 1).toString();
  if (!teamData) {
    return /* @__PURE__ */ jsx("div", { className: "pt-20 animate-on-load min-h-[60vh] flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-mono text-gold mb-4 text-xl", children: "404: TEAM NOT FOUND" }),
      /* @__PURE__ */ jsx("a", { href: "/team", className: "text-terracotta hover:text-green underline underline-offset-4 transition-colors", children: "Return to current team" })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: `Team ${year}`,
        path: `/team/${year}`,
        description: `The ${year} executive committee and members of Axiom, the philosophy society at NSUT.`
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxs("h2", { className: "section-heading text-center mb-3", children: [
        "Team ",
        year
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-ink/60 text-center mb-14 max-w-xl mx-auto", children: "The team that steered Axiom through its previous chapter." }),
      teamData.map((group) => /* @__PURE__ */ jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gold/20" }),
          /* @__PURE__ */ jsx("h3", { className: "label-mono px-4", children: group.role }),
          /* @__PURE__ */ jsx("div", { className: "h-px flex-1 bg-gold/20" })
        ] }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `grid gap-10 ${group.members.length === 1 ? "grid-cols-1 place-items-center" : group.members.length === 2 ? "grid-cols-1 sm:grid-cols-2 max-w-lg mx-auto" : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"}`,
            children: group.members.map((member) => /* @__PURE__ */ jsx(
              TeamPortraitCard,
              {
                ...member
              },
              member.name
            ))
          }
        )
      ] }, group.role))
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-4xl mx-auto px-6 py-8 flex justify-center gap-8", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/team/${nextYear}`,
          className: "font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4",
          children: [
            "← Team ",
            nextYear
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: `/team/${prevYear}`,
          className: "font-body text-sm text-terracotta hover:text-green transition-colors duration-200 underline underline-offset-4",
          children: [
            "Team ",
            prevYear,
            " →"
          ]
        }
      )
    ] })
  ] });
}
const ongoing = [{ "title": "CPC — Chai Pe Charcha", "date": "Weekly", "location": "NSUT Canteen", "description": "Join us every week for engaging discussions over chai. Share ideas, debate philosophical concepts, and connect with like-minded individuals in a casual setting. Each session focuses on a different theme, allowing for diverse perspectives and enriching conversations. CPC is the heartbeat of Axiom — informal, curious, and always stimulating.", "imageFolder": "cpc-all" }];
const eventsData = {
  "2023": [{ "title": "Wheel of Doom — Nsutthon 2023", "date": "October 12, 2023", "location": "NSUT Campus", "description": "The debut edition of Wheel of Doom at Nsutthon 2023 brought philosophical challenges and intellectual games to life. Participants spun the wheel to face various thought-provoking tasks that tested their reasoning and quick thinking abilities.", "imageFolder": "wheel-of-doom-23" }, { "title": "Axiom Day 2023", "date": "September 2, 2023", "location": "NSUT Campus", "description": "Our inaugural Axiom Day celebration brought together philosophy enthusiasts for a day of intellectual exploration, games, and community building. It marked the beginning of Axiom's journey as NSUT's premier philosophy society.", "imageFolder": "axiom-day-23" }, { "title": "Induction 2023", "date": "August 2023", "location": "NSUT Campus", "description": "Welcome to the world of philosophical inquiry! The 2023 induction introduced new members to Axiom's mission, values, and community. Fresh minds eager to question, debate, and explore life's fundamental questions joined our intellectual family.", "imageFolder": "induction-23" }],
  "2024": [{ "title": "Scribble & Scramble — Nsutthon 2024", "date": "November 2024", "location": "NSUT NESCI Ground", "description": "A creative fusion of art and philosophy at Nsutthon 2024. Scribble & Scramble challenged participants to express abstract philosophical concepts through artistic means, stimulating both logical and creative thinking in unique ways.", "imageFolder": "scribble-scramble-24" }, { "title": "Axiom Photoshoot 2024", "date": "October 2024", "location": "NSUT Campus", "description": "Capturing the essence of Axiom through the lens. Our 2024 photoshoot immortalized the society's vibrant energy, diverse membership, and intellectual spirit in stunning visuals that tell our story.", "imageFolder": "photoshoot-24" }, { "title": "Axiom Ethnic Day 2024", "date": "October 2024", "location": "NSUT Campus", "description": "Celebrating diversity and cultural philosophy through traditional attire and customs. Ethnic Day 2024 explored how different cultures approach fundamental philosophical questions, creating a beautiful tapestry of global wisdom.", "imageFolder": "ethnic-day-24" }, { "title": "Wheel of Doom — Moksha 2024", "date": "September 2024", "location": "NESCI Ground, NSUT", "description": "The Wheel returned at Moksha 2024 with even more thrilling challenges! Participants faced the wheel's verdict with courage, tackling philosophical puzzles, ethical dilemmas, and brain teasers that tested their intellectual agility.", "imageFolder": "wheel-of-doom-24" }, { "title": "Axiom Day 2024", "date": "September 2024", "location": "NSUT Campus", "description": "The second annual Axiom Day expanded on our inaugural success with more activities, deeper discussions, and greater community engagement. A celebration of philosophy, friendship, and the joy of questioning everything.", "imageFolder": "axiom-day-24" }, { "title": "Induction 2024", "date": "August 2024", "location": "NSUT Campus", "description": "Welcoming a new generation of philosophical minds to Axiom. The 2024 induction was marked by enthusiastic participation, thought-provoking icebreakers, and the beginning of countless intellectual friendships.", "imageFolder": "induction-24" }, { "title": "Farewell 2024", "date": "May 10, 2024", "location": "NSUT Conference Hall", "description": "A heartfelt ceremony bidding farewell to our graduating members. The event celebrated their contributions to Axiom, reflected on the philosophical journey shared together, and looked forward to the wisdom they'll carry into the world.", "imageFolder": "farewell-24" }, { "title": "Philo Walk 2024", "date": "March 2024", "location": "NSUT Campus", "description": "Following in the footsteps of ancient philosophers who taught while walking, Philo Walk 2024 took participants on a contemplative journey through campus. Deep philosophical discussions flowed naturally as we moved through the physical and intellectual landscape.", "imageFolder": "philo-walk-24" }, { "title": "Trust Fall Disaster — Reso 2024", "date": "February 2024", "location": "NSUT Block 5 Ground", "description": "A thrilling team-building exercise at Reso 2024 that challenged participants to build trust through guided falls. This event focused on developing mutual confidence, strengthening bonds, and exploring the philosophy of trust in human relationships.", "imageFolder": "trustfall-24" }],
  "2025": [{ "title": "Axiom Photoshoot 2025", "date": "March 2025", "location": "NSUT Campus", "description": "Our 2025 photoshoot captured the evolving spirit of Axiom with fresh perspectives and creative compositions. These images showcase the society's growth, dynamism, and the philosophical depth reflected in every frame.", "imageFolder": "photoshoot-25" }, { "title": "Jagriti 2025", "date": "February 15, 2025", "location": "NSUT Auditorium", "description": "Jagriti, our annual philosophical awakening event, brought together thinkers from various fields to ignite intellectual curiosity. The 2025 edition featured thought-provoking panels, interactive discussions, and philosophical debates that encouraged critical thinking.", "imageFolder": "jagriti-25" }, { "title": "Axiom Ethnic Day 2025", "date": "January 2025", "location": "NSUT Campus", "description": "The 2025 Ethnic Day continued our tradition of celebrating cultural diversity through the lens of philosophy. Students explored how traditional wisdom and modern philosophical thought intersect across different cultures and traditions.", "imageFolder": "ethnic-day-25" }, { "title": "Axiom Day 2025", "date": "January 2025", "location": "NSUT Campus", "description": "Axiom Day 2025 kicked off the year with renewed energy and intellectual vigor. A full day of philosophical activities, games, and discussions brought our community together to celebrate the life of the mind.", "imageFolder": "axiom-day-25" }],
  "2026": [],
  ongoing
};
function EventCarousel({ images, eventTitle }) {
  const validImages = (images || []).filter(Boolean);
  if (validImages.length === 0) return null;
  return /* @__PURE__ */ jsx("div", { className: "event-carousel-wrapper my-8", children: /* @__PURE__ */ jsx(
    Swiper,
    {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 35,
        stretch: 0,
        depth: 150,
        modifier: 1.5,
        slideShadows: false
      },
      pagination: {
        clickable: true,
        dynamicBullets: true
      },
      navigation: true,
      virtual: { addSlidesBefore: 1, addSlidesAfter: 1 },
      modules: [EffectCoverflow, Pagination, Navigation, Virtual],
      className: "event-swiper",
      children: validImages.map((src, idx) => /* @__PURE__ */ jsx(SwiperSlide, { virtualIndex: idx, children: /* @__PURE__ */ jsx(
        "a",
        {
          href: src,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "block w-full h-full focus:outline-none focus:ring-2 focus:ring-gold/50 overflow-hidden",
          "aria-label": `View ${eventTitle} photo ${idx + 1} in new tab`,
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: `${eventTitle} — photo ${idx + 1}`,
              className: "w-full h-full object-cover",
              loading: "lazy",
              onError: (e) => {
                e.target.parentElement.style.display = "none";
              }
            }
          )
        }
      ) }, idx))
    }
  ) });
}
const events = { "axiom-day-23": ["2.webp", "8.jpg", "13.webp", "51.jpg", "66.jpg"], "axiom-day-24": ["1.jpg", "2.jpg", "4.jpg"], "axiom-day-25": ["4.webp", "7.webp", "64.webp"], "cpc-all": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"], "farewell-24": ["4.jpg"], "induction-23": ["2.jpg", "4.jpg", "7.jpg"], "induction-24": ["1.jpg"], "jagriti-25": ["1.jpg", "2.jpg", "3.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg", "18.jpg", "19.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg", "26.jpg", "27.jpg", "30.jpg", "31.jpg", "32.jpg", "33.jpg", "34.jpg", "35.jpg", "36.jpg", "37.jpg", "38.jpg"], "philo-walk-24": ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "12.jpg", "13.jpg"], "photoshoot-25": ["4.jpg"], "scribble-scramble-24": ["1.JPG", "8.JPG", "12.JPG", "15.JPG", "16.JPG", "20.JPG", "22.JPG", "23.JPG", "24.JPG", "28.JPG"], "trustfall-24": ["1.jpg", "3.jpg", "8.jpg", "15.jpg", "16.jpg"], "wheel-of-doom-23": ["1.jpg", "2.jpg", "4.jpg", "18.jpg", "19.jpg", "20.jpg", "24.jpg", "25.jpg", "29.jpg", "33.jpg", "42.jpg", "43.jpg"], "wheel-of-doom-24": ["1.jpg", "2.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "9.jpg"] };
const imageManifest = {
  events
};
function EventCard({
  title,
  date,
  location,
  description,
  imageFolder,
  index
}) {
  const images = imageFolder && imageManifest.events[imageFolder] ? imageManifest.events[imageFolder].map(
    (filename) => `/data/events/${imageFolder}/${filename}`
  ) : [];
  const validImages = images.filter(Boolean);
  const num = String((index ?? 0) + 1).padStart(2, "0");
  const cardRef = useRef(null);
  const [carouselVisible, setCarouselVisible] = useState(false);
  useEffect(() => {
    if (validImages.length === 0) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCarouselVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [validImages.length]);
  return /* @__PURE__ */ jsxs(
    "article",
    {
      ref: cardRef,
      className: "group relative grid grid-cols-1 md:grid-cols-[4rem_1fr] gap-0 md:gap-8 pb-16 mb-16 border-b border-gold/20 last:border-none last:mb-0",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "hidden md:flex flex-col items-end pt-1", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "font-mono text-gold/25 group-hover:text-gold/50 transition-colors duration-300 select-none",
              style: {
                fontSize: "2.8rem",
                fontWeight: 300,
                lineHeight: 1
              },
              children: num
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "w-px flex-1 bg-gold/15 mt-3 group-hover:bg-gold/30 transition-colors duration-300" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4 mb-2 items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "font-mono text-gold text-xs tracking-widest", children: date }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-ink/40 text-xs tracking-wider", children: "·" }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-ink/50 text-xs tracking-wider", children: location })
          ] }),
          /* @__PURE__ */ jsx(
            "h3",
            {
              className: "font-heading text-green font-light mb-4 group-hover:text-terracotta transition-colors duration-300",
              style: { fontSize: "clamp(1.5rem, 3vw, 2.2rem)" },
              children: title
            }
          ),
          /* @__PURE__ */ jsx(
            "p",
            {
              className: "font-body text-ink/65 leading-relaxed mb-6 max-w-3xl",
              style: { fontSize: "0.95rem" },
              children: description
            }
          ),
          carouselVisible && /* @__PURE__ */ jsx(EventCarousel, { images: validImages, eventTitle: title })
        ] })
      ]
    }
  );
}
function Events() {
  const currentEvents = [
    ...eventsData["2026"] || [],
    ...eventsData["2025"] || [],
    ...eventsData["ongoing"] || []
  ];
  const yearLinks = [
    { year: "2024", label: "2024" },
    { year: "2023", label: "2023" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Events",
        path: "/events",
        description: "Chai Pe Charcha, Wheel of Doom, Philo Walk and more — explore all of Axiom's philosophical events at NSUT."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "max-w-5xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsx("h1", { className: "section-heading mb-4", children: "Events" }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "font-body text-ink/70 leading-relaxed max-w-2xl",
          style: { fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)" },
          children: "Everything Axiom has put together for the curious minds among us."
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs tracking-[0.2em] uppercase text-gold/70", children: "Past Events:" }),
        yearLinks.map(({ year, label }) => /* @__PURE__ */ jsx(
          "a",
          {
            href: `/events/${year}`,
            className: "font-mono text-xs tracking-[0.15em] uppercase text-green hover:text-terracotta transition-colors border border-green/20 hover:border-terracotta/40 px-4 py-2 rounded",
            children: label
          },
          year
        ))
      ] })
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsx("section", { className: "max-w-5xl mx-auto px-6 py-16", children: currentEvents.map((event, i) => /* @__PURE__ */ jsx(EventCard, { ...event, index: i }, event.title)) })
  ] });
}
function EventsByYear() {
  const { year } = useParams();
  const events2 = eventsData[year] || [];
  const ongoing2 = eventsData.ongoing || [];
  const allEvents = year ? [...events2, ...ongoing2] : [];
  const yearTitle = year ? `Events ${year}` : "Events";
  const yearDescription = year ? `All Axiom philosophy society events from ${year} at NSUT.` : "Explore all of Axiom's philosophical events at NSUT.";
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: yearTitle,
        path: `/events/${year}`,
        description: yearDescription
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "max-w-5xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/events",
          className: "label-mono mb-4 inline-block hover:text-terracotta transition-colors",
          children: "← Back to Events"
        }
      ),
      /* @__PURE__ */ jsxs("h1", { className: "section-heading mb-4", children: [
        "Events ",
        year
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-gold/50 mb-8" }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "font-body text-ink/70 leading-relaxed max-w-2xl",
          style: { fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)" },
          children: allEvents.length > 0 ? `A collection of ${allEvents.length} event${allEvents.length !== 1 ? "s" : ""} from ${year} — philosophical discussions, creative challenges, and community gatherings that defined this year.` : `No events recorded for ${year} yet. Check back soon or explore other years!`
        }
      )
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    allEvents.length > 0 ? /* @__PURE__ */ jsx("section", { className: "max-w-5xl mx-auto px-6 py-16", children: allEvents.map((event, i) => /* @__PURE__ */ jsx(EventCard, { ...event, index: i }, event.title)) }) : /* @__PURE__ */ jsx("section", { className: "max-w-5xl mx-auto px-6 py-16 text-center", children: /* @__PURE__ */ jsx("p", { className: "font-body text-ink/50 text-lg", children: "No events to display for this year." }) })
  ] });
}
const gamesList = [
  {
    path: "hermeneutic",
    eyebrow: "Word Puzzle",
    title: "Hermeneutic",
    desc: "Guess the philosophical term from progressively revealing clues. Each wrong guess unveils another layer of context."
  },
  {
    path: "epoche",
    eyebrow: "Classification",
    title: "Époche",
    desc: "Classify propositions across four philosophical axes: analytic or synthetic, a priori or a posteriori, necessary or contingent, descriptive or normative."
  },
  {
    path: "fallacy",
    eyebrow: "Identification",
    title: "Fallacy",
    desc: "Identify the logical fallacy embedded in a philosophical argument. Wrong guesses reveal whether you're in the right family or class, narrowing the field."
  },
  {
    path: "dialectics",
    eyebrow: "Synthesis",
    title: "Dialectics",
    desc: "A thesis is presented. First identify its historical antithesis, then select the synthesis that resolves the contradiction."
  },
  {
    path: "negative-dialectics",
    eyebrow: "Critique",
    title: "Negative Dialectics",
    desc: "Dismantle a false historical synthesis by predicting its residual—the marginalized reality it represses or fails to capture."
  },
  {
    path: "sorites",
    eyebrow: "Experiment",
    title: "Sorites",
    desc: "Pick two colours, classify 34 patches across the gradient between them, and discover the Sorites paradox hiding in your own judgements."
  },
  {
    path: "repugnant",
    eyebrow: "Population Ethics",
    title: "The Repugnant Conclusion",
    desc: `Make a series of world-comparisons, each individually reasonable, to solve Parfit's "most important problem in ethics".`
  },
  {
    path: "philosophle",
    eyebrow: "Word Puzzle",
    title: "Philosophle",
    desc: "wordle, but for philosophy."
  },
  {
    path: "butterfly-job",
    eyebrow: "Counterfactual History",
    title: "The Butterfly Job",
    desc: "Step into seven minor roles across the twentieth century and watch how tiny choices derail recorded history."
  },
  {
    path: "fallacy-detective",
    eyebrow: "Investigation",
    title: "Fallacy Detective",
    desc: "Highlight suspected sentences in real-world documents, name the fallacy, and close each case."
  },
  {
    path: "philosopher-match",
    eyebrow: "Attribution",
    title: "Philosopher Match",
    desc: "A philosophical quote is placed before you. Identify its author from four options, with hints."
  },
  {
    path: "concept-map",
    eyebrow: "Navigation",
    title: "Concept Map",
    desc: "Bridge two philosophical concepts via the shortest chain of directly related ideas."
  },
  {
    path: "argument-reconstruction",
    eyebrow: "Reconstruction",
    title: "Argument Reconstruction",
    desc: "Drag a philosopher's premises into their correct logical order."
  },
  {
    path: "paradigm-shift",
    eyebrow: "Classification",
    title: "Paradigm Shift",
    desc: "Classify historical episodes in science according to Kuhn's five phases."
  }
];
const externalExperiments = [
  {
    title: "Philosophy Experiments",
    url: "https://philosophyexperiments.com",
    domain: "philosophyexperiments.com",
    desc: "26 browser-based experiments by Jeremy Stangroom: Battleground God (contradiction detection), Morality Play (reveals your ethical framework), Staying Alive (Parfit's personal identity), Whose Body Is It Anyway? (Thomson's violinist), and Talking with God (Euthyphro dilemma)."
  },
  {
    title: "MIT Moral Machine",
    url: "https://moralmachine.mit.edu",
    domain: "moralmachine.mit.edu",
    desc: "Trolley-problem variants across 13 scenarios. Reveals how your moral judgements compare globally, and lets you design your own cases."
  },
  {
    title: "Absurd Trolley Problems",
    url: "https://neal.fun/absurd-trolley-problems",
    domain: "neal.fun",
    desc: "28 escalating trolley variants with crowd-sourced results per dilemma."
  },
  {
    title: "The Evolution of Trust",
    url: "https://ncase.me/trust",
    domain: "ncase.me",
    desc: "An interactive game-theory tutorial by Nicky Case on the Prisoner's Dilemma, and how cooperation can emerge from it."
  },
  {
    title: "Milton",
    links: [
      {
        url: "https://milton-23eac.web.app/",
        domain: "milton-23eac.web.app"
      },
      {
        url: "https://mindany2.fr/milton/?lang=enu",
        domain: "mindany2.fr (mirror)"
      }
    ],
    desc: "A philosophical dialogue game exploring questions of mind, identity, and consciousness through conversation."
  },
  {
    title: "History of Philosophy",
    url: "https://www.denizcemonduygu.com/philo/browse/",
    domain: "denizcemonduygu.com",
    desc: "An interactive visual map of Western philosophy by Deniz Cem Önduygu — browse 200+ philosophers across 25 centuries, explore influence connections, and click any thinker to see who they shaped and who shaped them."
  },
  {
    title: "Closer to Truth: Interactive",
    url: "https://loc.closertotruth.com/interactive",
    domain: "loc.closertotruth.com",
    desc: "A 4-map interactive from Robert Lawrence Kuhn's Library of Consciousness — scatter-plot and force-directed graphs visualising theories of consciousness by category, scholarly interest, complexity, and connections across five dimensions: metaphysical assumptions, locus of consciousness, methods of study, confidence, and implications for AI consciousness, free will, and meaning."
  }
];
const externalGames = [
  {
    title: "Socrates Jones: Pro Philosopher",
    url: "https://store.steampowered.com/app/2120060/Socrates_Jones_Pro_Philosopher/",
    domain: "Steam (free)",
    desc: "Ace Attorney-style debate mechanics. You debate Euthyphro, Protagoras, Hobbes, Mill, and Kant using pure elenchus: request clarification, challenge relevance, demand backing."
  },
  {
    title: "The Talos Principle",
    url: "https://store.steampowered.com/app/257510/The_Talos_Principle/",
    domain: "Steam",
    desc: "A first-person puzzle game by Croteam in which an android navigates a world saturated with philosophical texts — Anaxagoras, Milton, Goethe — and must decide whether it is conscious, free, and worthy of existence."
  },
  {
    title: "The Talos Principle 2",
    url: "https://store.steampowered.com/app/835960/The_Talos_Principle_2/",
    domain: "Steam",
    desc: "The sequel deepens the inquiry into AI consciousness, political philosophy, and the ethics of civilisation. Features branching arguments with in-world characters representing distinct philosophical positions."
  },
  {
    title: "Disco Elysium",
    url: "https://store.steampowered.com/app/632470/Disco_Elysium__The_Final_Cut/",
    domain: "Steam",
    desc: "A detective RPG in which your fractured psyche — 24 competing skill-voices — debates every action. Engages directly with Marxism, existentialism, Taoism, and the phenomenology of failure. Widely considered the most philosophically dense game ever made."
  }
];
function Games() {
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Games",
        path: "/games",
        description: "Interactive philosophy games: guess a term from clues, classify propositions, identify fallacies, and trace dialectical movements in the history of thought."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "max-w-4xl mx-auto px-6 py-6 text-center", children: [
      /* @__PURE__ */ jsx("p", { className: "label-mono mb-3", children: "Play & Think" }),
      /* @__PURE__ */ jsx("h1", { className: "section-heading mb-3", children: "Games" }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-gold/50 mx-auto mb-3" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "max-w-6xl mx-auto px-6 pt-6 pb-16", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: gamesList.map(({ path, href, eyebrow, title, desc }) => {
      const cardClass = "group block bg-cream-dark border border-gold/20 rounded-lg p-6 relative overflow-hidden hover:border-gold/50 transition-all duration-300";
      const cardInner = /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-1 h-0 bg-terracotta group-hover:h-full transition-all duration-500" }),
        /* @__PURE__ */ jsxs("div", { className: "pl-4", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-4 mb-4", children: /* @__PURE__ */ jsx("p", { className: "label-mono text-gold", children: eyebrow }) }),
          /* @__PURE__ */ jsx(
            "h2",
            {
              className: "font-heading font-light text-green mb-3 group-hover:text-terracotta transition-colors duration-200",
              style: {
                fontSize: "clamp(1.25rem, 2vw, 1.75rem)"
              },
              children: title
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/65 leading-relaxed mb-6", children: desc })
        ] })
      ] });
      return href ? /* @__PURE__ */ jsx("a", { href, className: cardClass, children: cardInner }, href) : /* @__PURE__ */ jsx("a", { href: `/games/${path}`, className: cardClass, children: cardInner }, path);
    }) }) }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-6xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("p", { className: "label-mono mb-4", children: "Around the Web" }),
        /* @__PURE__ */ jsx(
          "h2",
          {
            className: "font-heading font-light text-green mb-3",
            style: { fontSize: "clamp(1.6rem, 3vw, 2.2rem)" },
            children: "External Experiments & Games"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "h-px w-16 bg-gold/50 mx-auto" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2", children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono text-gold mb-5", children: "Interactive Experiments" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-0 divide-y divide-gold/12", children: externalExperiments.map(
            ({ title, url, domain, links, desc }) => {
              const linkList = links ?? [{ url, domain }];
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "py-5 group relative",
                  children: [
                    /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: linkList[0].url,
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "absolute -inset-x-4 inset-y-0 z-0 rounded-xl hover:bg-ink/5 dark:hover:bg-cream/5 transition-colors",
                        "aria-label": title
                      }
                    ),
                    /* @__PURE__ */ jsxs("div", { className: "relative z-10 pointer-events-none", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 mb-1.5", children: [
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            className: "font-heading font-light text-green group-hover:text-terracotta transition-colors duration-150 min-w-0",
                            style: {
                              fontSize: "clamp(1rem, 1.5vw, 1.15rem)"
                            },
                            children: title
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-end gap-x-3 gap-y-1 pt-1 pointer-events-auto", children: linkList.map(
                          ({
                            url: lu,
                            domain: ld
                          }) => /* @__PURE__ */ jsxs(
                            "a",
                            {
                              href: lu,
                              target: "_blank",
                              rel: "noopener noreferrer",
                              className: "font-mono text-xs text-gold/50 hover:text-gold whitespace-nowrap transition-colors duration-150",
                              children: [
                                ld,
                                " ↗"
                              ]
                            },
                            lu
                          )
                        ) })
                      ] }),
                      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/55 leading-relaxed", children: desc })
                    ] })
                  ]
                },
                linkList[0].url
              );
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono text-gold mb-5", children: "External Games" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-0 divide-y divide-gold/12", children: externalGames.map(
            ({ title, url, domain, desc }) => /* @__PURE__ */ jsxs("div", { className: "py-5 group relative", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "absolute -inset-x-4 inset-y-0 z-0 rounded-xl hover:bg-ink/5 dark:hover:bg-cream/5 transition-colors",
                  "aria-label": title
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative z-10 pointer-events-none", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-4 mb-1.5", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "font-heading font-light text-green group-hover:text-terracotta transition-colors duration-150 min-w-0",
                      style: {
                        fontSize: "clamp(1rem, 1.5vw, 1.15rem)"
                      },
                      children: title
                    }
                  ),
                  /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-gold/50 whitespace-nowrap pt-1", children: [
                    domain,
                    " ↗"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/55 leading-relaxed", children: desc })
              ] })
            ] }, url)
          ) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(SectionDivider, { className: "px-6 max-w-6xl mx-auto" }),
    /* @__PURE__ */ jsx("section", { className: "max-w-4xl mx-auto px-6 py-12 text-center", children: /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/50 leading-relaxed", children: "New puzzles are added as the year progresses." }) })
  ] });
}
const HERMENEUTIC_EASY = [
  {
    answer: "consciousness",
    clues: [
      "Descartes placed <b>████</b> at the centre of his philosophy: the one thing that could not be doubted was that there was a thinking thing having experiences.",
      "Locke grounded personal identity in continuity of <b>████</b>: you are the same person over time because memory links your present experiences to your past ones.",
      "Phenomenologists such as Husserl and Merleau-Ponty argued that <b>████</b> is never a bare inner theatre but always intentional — directed toward objects in a shared world.",
      'The "hard problem" of <b>████</b>, named by David Chalmers, asks why and how physical processes in the brain give rise to subjective, felt experience — the "what it is like" to be something.',
      `Dennett's "multiple drafts" model holds that there is no single Cartesian theatre where <b>████</b> happens; many parallel processes compete, and our sense of a unified self is a useful narrative fiction.`
    ]
  },
  {
    answer: "belief",
    clues: [
      "Plato held that <b>████</b> alone is insufficient for knowledge: one can have a true <b>████</b> by luck without understanding why it is true.",
      "The classical analysis of knowledge defines it as justified true <b>████</b> — a formulation that dominated epistemology until Gettier produced decisive counterexamples in 1963.",
      "Hume argued that our most basic <b>████</b>s — that the future will resemble the past, that objects persist unobserved — cannot be grounded in reason and rest instead on habit and custom.",
      'William James, in "The Will to Believe," argued that in genuine dilemmas that are live, momentous, and forced, we are entitled to adopt a <b>████</b> on the basis of our passional nature when evidence runs out.',
      "Contemporary epistemology distinguishes the content of a <b>████</b> from its strength or degree; rationalists argue that agents ought to apportion their confidence to the evidence — a position called evidentialism."
    ]
  },
  {
    answer: "being",
    clues: [
      "Parmenides argued that only <b>████</b> is: non-<b>████</b> is literally unthinkable, since to think of nothing is already to think of something.",
      'Aristotle made the study of <b>████</b> qua <b>████</b> the subject of "first philosophy," asking what it means for anything at all to exist prior to any investigation of particular kinds of things.',
      "Aquinas distinguished between essence (what a thing is) and existence (that it is), arguing that in God alone are these identical — all creatures have <b>████</b> only by participation in the divine.",
      'Heidegger accused Western philosophy of "forgetting the question of <b>████</b>": since Plato, thinkers have spoken about beings but lost sight of <b>████</b> itself as a question requiring investigation.',
      "Sartre reversed the traditional priority: existence precedes essence — human <b>████</b> is not determined in advance, and we are condemned to create ourselves through our choices."
    ]
  },
  {
    answer: "freedom",
    clues: [
      "Kant distinguished empirical <b>████</b> — acting without external compulsion — from transcendental <b>████</b>, the will's capacity to initiate a causal series independently of natural determination.",
      "Locke grounded political <b>████</b> in natural rights: persons own themselves and the fruits of their labour, and no government may legitimately take these without consent.",
      'Sartre held that human beings are "condemned to be free" — we cannot escape <b>████</b> even by denying it, since choosing not to choose is itself a choice for which we are fully responsible.',
      "Isaiah Berlin distinguished negative <b>████</b> (absence of external constraint) from positive <b>████</b> (genuine self-direction); critics of liberalism argue that the former can coexist with profound unfreedom in practice.",
      "The problem of <b>████</b> and determinism asks whether genuine moral responsibility is possible if every decision is the inevitable product of prior causes operating according to natural law."
    ]
  },
  {
    answer: "truth",
    clues: [
      "Aristotle gave the oldest formulation: to say of what is that it is, and of what is not that it is not, is to speak <b>████</b> — the seed of the correspondence theory.",
      "Coherence theorists argue that <b>████</b> is a property of propositions that mutually support one another in a system, with no privileged bedrock of uninterpreted facts.",
      "Pragmatists like James and Dewey defined <b>████</b> functionally: a belief is true if acting on it reliably succeeds and satisfies in the long run of experience.",
      "Nietzsche questioned the value of <b>████</b> itself, asking why we prefer it to useful fictions and suggesting that the will to <b>████</b> might be a disguised ascetic ideal hostile to life.",
      `Tarski's semantic definition holds that "<i>S</i>" is <b>████</b> if and only if <i>S</i> — grounding <b>████</b> in satisfaction conditions and separating meta-language from object-language.`
    ]
  },
  {
    answer: "justice",
    clues: [
      "Plato defined <b>████</b> in the soul as each part — reason, spirit, appetite — performing its proper function, and in the city as each class fulfilling its role without encroaching on others.",
      "Aristotle distinguished distributive <b>████</b> (allocating goods proportionally to merit) from corrective <b>████</b> (restoring equality when wrongful transactions disturb it).",
      'Rawls argued that principles of <b>████</b> should be chosen behind a "veil of ignorance," where no one knows their social position — yielding equal liberties and inequalities arranged to benefit the worst-off.',
      "Nozick countered that <b>████</b> is historical and not patterned: any distribution is just if it arose from just acquisitions and voluntary transfers, regardless of the resulting inequality.",
      "Feminist philosophers argued that traditional theories of <b>████</b> excluded care, dependency, and relationality as moral categories — making invisible the conditions that sustain any society."
    ]
  },
  {
    answer: "virtue",
    clues: [
      "Aristotle defined <b>████</b> as a stable disposition to feel and act in the right way, at the right time, toward the right people — a mean between excess and deficiency cultivated through practice.",
      'The Stoics held that <b>████</b> alone is genuinely good and sufficient for happiness: health, wealth, and reputation are "indifferent" and neither benefit nor harm the soul.',
      "Kant rejected <b>████</b> ethics as insufficient: no character trait is unconditionally good, he argued; only a good will — acting from duty — has unconditional moral worth.",
      `MacIntyre's "After Virtue" argued that modern moral philosophy is incoherent because it inherited the vocabulary of <b>████</b> while discarding the teleological framework (human nature and its proper end) that made it intelligible.`,
      'Contemporary <b>████</b> ethics shifts attention from "what should I do?" to "what kind of person should I be?" — emphasising character development, practical wisdom, and the role of moral exemplars in shaping a good life.'
    ]
  },
  {
    answer: "reason",
    clues: [
      "Plato divided the soul into <b>████</b>, spirit, and appetite; <b>████</b> alone can grasp the eternal Forms and should govern the other parts, both in the individual and in the just city.",
      "Kant argued that <b>████</b> operates in two modes: theoretical <b>████</b> determines what we can know; practical <b>████</b> determines how we ought to act — and morality rests on the latter.",
      'Hume famously declared that "<b>████</b> is and ought only to be the slave of the passions": it can identify means to ends but cannot by itself determine what ends are worth pursuing.',
      `The Enlightenment elevated <b>████</b> as the universal faculty that would free humanity from superstition and authority — Kant's motto was "Dare to use your own <b>████</b>."`,
      'Adorno and Horkheimer argued in "Dialectic of Enlightenment" that instrumental <b>████</b> — the drive to calculate, control, and dominate — had turned against humanity itself, finding its terminus in the administered society.'
    ]
  }
];
const HERMENEUTIC_HARD = [
  {
    answer: "logos",
    clues: [
      "The ancient Greeks used <b>████</b> to refer simultaneously to word, reason, and the rational structure underlying reality itself.",
      "Heraclitus held that <b>████</b> governs all things — the unity beneath apparent conflict — yet most people remain ignorant of it throughout their lives.",
      "In Stoic philosophy, <b>████</b> became the immanent rational principle pervading the cosmos; human reason was a fragment of this universal principle.",
      'The Gospel of John opens "In the beginning was <b>████</b>," importing the Greek concept into theology, where it names the divine principle that takes on flesh.',
      'Heidegger argued that the original Greek sense of <b>████</b> — a gathering that lets things be seen — was obscured when rendered as "reason" or "word," and that recovering it is essential to understanding Western metaphysics.'
    ]
  },
  {
    answer: "aporia",
    clues: [
      "Socratic dialogues frequently end in <b>████</b>: the interlocutor discovers that a concept they believed they understood is, upon examination, incoherent or undefinable.",
      "<b>████</b> names not merely confusion but a productive impasse — the path of inquiry is blocked, and this blockage is itself philosophically significant.",
      "Aristotle distinguished between <b>████</b> arising from external obstacles and <b>████</b> arising from the structure of the problem itself; the latter is philosophically more valuable.",
      "Derrida used <b>████</b> to mark the undecidable moments in texts where a binary opposition collapses into its own impossibility.",
      "For Plato, <b>████</b> is the beginning of wisdom: only when the pretense of knowledge is exposed can genuine inquiry begin. It is paradoxically the most productive form of intellectual failure."
    ]
  },
  {
    answer: "dialectic",
    clues: [
      "In Hegel's system, <b>████</b> describes the movement by which a position generates its own negation, and both are preserved and surpassed in a higher unity.",
      "Plato used <b>████</b> as dialogical ascent toward the Forms; Kant diagnosed <b>████</b> as the inevitable illusion produced when reason overreaches possible experience.",
      "Marx retained the triadic structure of Hegel's <b>████</b> while grounding it in material contradictions and historical forces rather than the self-movement of Geist.",
      "For Adorno, <b>████</b> must remain permanently negative: no synthesis can reconcile genuine contradictions without falsifying them — claiming resolution is itself ideology.",
      "Whether as method, ontological structure, or critique, all versions of <b>████</b> share one feature: negation is not failure but the motor of thought itself."
    ]
  },
  {
    answer: "eudaimonia",
    clues: [
      "Ancient Greek moral philosophy names its highest aim <b>████</b> — not a fleeting emotion but a stable condition achieved over a complete life lived well.",
      "Aristotle held that <b>████</b> is the activity of the soul in accordance with virtue; it is never attributed to a moment but only to a whole human life, as we judge a day beautiful only when it is done.",
      "Unlike Platonic happiness, which is a property of the soul in isolation, Aristotle's <b>████</b> requires external goods — health, friendship, moderate wealth — because human beings are inherently political animals.",
      'The Stoics radically revised <b>████</b>: virtue alone is necessary and sufficient for it; fortune, health, and life itself are "indifferent" — neither good nor bad. The sage is <b>████</b> even on the rack.',
      "Modern virtue ethics (Foot, MacIntyre, Nussbaum) attempts to rehabilitate <b>████</b> as the organising concept of ethics, against both Kantian duty-ethics and utilitarian maximisation, arguing that human flourishing requires narrative, community, and the cultivation of character over time."
    ]
  },
  {
    answer: "dasein",
    clues: [
      "<b>████</b> is Heidegger's term for the kind of being whose being is an issue for it — the entity that asks the question of Being, and whose being is always at stake.",
      "Unlike Cartesian subjects or Husserlian transcendental egos, <b>████</b> is always already in-the-world — not a mind confronting an external reality but a structure of involvement, concern, and care.",
      '<b>████</b> is "thrown" into a world it did not choose, yet "projected" toward possibilities it must choose. This structure of thrownness and projection is the ontological ground of both freedom and anxiety.',
      'Authentic <b>████</b> runs ahead to its own death — recognising it as ownmost, non-relational, and certain — and in this "being-toward-death" individualises itself from the anonymous "they" (das Man) of everyday existence.',
      'Heidegger insists the German word must not be translated: "there-being" misses that <b>████</b> does not merely exist at a location but is the very opening through which Being comes to light — the Da, the "there," is the clearing of Being itself.'
    ]
  },
  {
    answer: "mimesis",
    clues: [
      "Plato condemned <b>████</b> as ontologically third-rate: a painting of a bed imitates the particular bed, which imitates the Form of Bed — the artist is twice removed from truth.",
      "Aristotle rehabilitated <b>████</b> in the <i>Poetics</i>: tragedy, precisely because it imitates human action, can produce catharsis and convey universal truths that history, bound to the particular, cannot reach.",
      'For Aristotle, the pleasure we take in <b>████</b> is not the low pleasure of deception but the intellectual pleasure of recognition: "That is what such a thing is like."',
      "Auerbach's landmark study traced how the style of <b>████</b> in Western literature — from Homer through Dante to Virginia Woolf — reflects each era's conception of what is real and historically significant.",
      'Derrida argued that the entire Platonic tradition is structured by the opposition between the original and the <b>████</b>, with the copy always devalued — but deconstructing this reveals that the "original" is always already marked by the iterability that makes copies possible.'
    ]
  },
  {
    answer: "praxis",
    clues: [
      "Aristotle distinguished three forms of life — theoria (contemplation), poiesis (productive making), and <b>████</b> — action that has its end in itself, in the quality and character of the acting.",
      "For Aristotle, ethics and politics are sciences of <b>████</b>: they aim not merely at knowing what is good, but at acting well. The practically wise person (phronimos) excels precisely in this domain.",
      "Marx seized on <b>████</b> to bridge theory and material reality: genuine philosophy must not merely interpret the world but change it. Human beings are essentially self-transforming agents whose labour mediates their relationship to nature.",
      "In Marxist theory, alienated <b>████</b> occurs when workers cannot recognise themselves in the products of their labour — when their own productive activity confronts them as a foreign, hostile power.",
      "Gramsci, Lukács, and the Frankfurt School each reworked <b>████</b> to ask: under what conditions can subordinated groups act collectively to transform oppressive structures? The concept holds together action, history, and the possibility of emancipation."
    ]
  },
  {
    answer: "antinomy",
    clues: [
      "<b>████</b> is Kant's term for a conflict of pure reason with itself — two proofs, each proceeding by valid argument from apparently acceptable premises, that yield contradictory conclusions.",
      "Kant identified four cosmological <b>████</b>: whether the world has a beginning in time, whether it is composed of simple parts, whether there is freedom alongside natural causation, and whether there is a necessary being.",
      `Each <b>████</b> has a "thesis" (the metaphysician's claim) and an "antithesis" (the counter-claim); Kant's solution is that both sides err in applying concepts beyond the limits of possible experience.`,
      "The <b>████</b> of freedom is especially important: the thesis asserts a transcendental freedom required by morality; the antithesis holds that every event is causally necessitated. Kant resolves this by separating the empirical (determined) from the noumenal (free) standpoint.",
      "The discovery of the <b>████</b> was, Kant wrote, what first awoke him from dogmatic slumber — it showed that uncritical metaphysics inevitably leads reason into self-contradiction, demanding a critique of reason's own powers."
    ]
  }
];
function rand$5(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function GameBoard$5({ puzzle, onNewGame }) {
  const [shown, setShown] = useState(1);
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState("playing");
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (status === "playing" && inputRef.current) {
      inputRef.current.focus();
    }
  }, [status, shown]);
  function handleGuess() {
    var _a;
    const val = input.trim().toLowerCase();
    if (!val || status !== "playing") return;
    setInput("");
    const correct = val === puzzle.answer.toLowerCase();
    const newGuesses = [...guesses, val];
    setGuesses(newGuesses);
    if (correct) {
      setStatus("win");
    } else if (newGuesses.length >= 6) {
      setStatus("lose");
    } else {
      setShown(Math.min(shown + 1, puzzle.clues.length));
    }
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }
  function handleKey(e) {
    if (e.key === "Enter") handleGuess();
  }
  const attemptsLeft = 6 - guesses.length;
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "mb-6 space-y-2", children: puzzle.clues.map((clue, i) => {
      const isLive = i < shown || status !== "playing";
      const isNewest = i < shown && i === shown - 1;
      return /* @__PURE__ */ jsx(
        "div",
        {
          className: `rounded-lg border px-4 py-3 font-body text-sm leading-relaxed italic transition-all duration-300 ${isLive ? "border-gold/30 bg-cream dark:bg-cream-dark text-ink/80" : "border-cream-dark bg-cream/40 dark:bg-cream-dark/30 text-ink/25"} ${isNewest ? "animate-slide-up" : ""}`,
          children: /* @__PURE__ */ jsx(
            "span",
            {
              dangerouslySetInnerHTML: { __html: clue },
              className: isLive ? "" : "blur-[3px] select-none"
            }
          )
        },
        i
      );
    }) }),
    guesses.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-gold tracking-widest uppercase mb-2", children: "Guesses" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: guesses.map((g, i) => {
        const isCorrect2 = g === puzzle.answer.toLowerCase();
        return /* @__PURE__ */ jsx(
          "span",
          {
            style: { animationDelay: `${i * 30}ms` },
            className: `animate-pop-in font-mono text-xs px-3 py-1 rounded-full border ${isCorrect2 ? "bg-green text-cream border-transparent" : "bg-terracotta/10 text-terracotta border-terracotta/20"}`,
            children: g
          },
          i
        );
      }) })
    ] }),
    status === "playing" && /* @__PURE__ */ jsxs("div", { className: "flex gap-3 mt-4", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          value: input,
          onChange: (e) => setInput(e.target.value),
          onKeyDown: handleKey,
          placeholder: "Enter your guess…",
          className: "flex-1 px-4 py-2.5 rounded-lg border border-gold/30 bg-cream dark:bg-cream-dark focus:outline-none focus:border-gold font-body text-sm text-ink placeholder-ink/30 transition-colors duration-150"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: handleGuess,
          disabled: !input.trim(),
          className: "px-5 py-2.5 rounded-lg bg-green text-cream font-body text-sm hover:bg-green/90 disabled:opacity-40 disabled:cursor-default transition-colors duration-150",
          children: "Guess"
        }
      )
    ] }),
    status === "playing" && /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs text-ink/35 mt-3 tracking-wide", children: [
      attemptsLeft,
      " ",
      attemptsLeft === 1 ? "guess" : "guesses",
      " ",
      "remaining · ",
      Math.min(shown, puzzle.clues.length),
      " of",
      " ",
      puzzle.clues.length,
      " clues revealed"
    ] }),
    status === "win" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mt-6 bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-green/70 mb-1", children: "Correct" }),
          /* @__PURE__ */ jsx("p", { className: "font-heading text-2xl font-light text-green mb-2", children: puzzle.answer }),
          /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: [
            "Identified in ",
            guesses.length,
            " ",
            guesses.length === 1 ? "guess" : "guesses",
            " with",
            " ",
            shown,
            " ",
            shown === 1 ? "clue" : "clues",
            " revealed."
          ] })
        ]
      }
    ),
    status === "lose" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mt-6 bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-1", children: "Not quite" }),
          /* @__PURE__ */ jsx("p", { className: "font-heading text-2xl font-light text-ink mb-2", children: puzzle.answer }),
          /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: [
            "The answer was",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-ink", children: puzzle.answer }),
            ". All clues trace this concept through its key appearances in Western philosophy."
          ] })
        ]
      }
    ),
    status !== "playing" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onNewGame,
        className: "mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150",
        children: "New puzzle"
      }
    )
  ] });
}
function GameHermeneutic() {
  const [difficulty, setDifficulty] = useState("easy");
  const [gameKey, setGameKey] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(
    () => rand$5(HERMENEUTIC_EASY)
  );
  function handleNewGame() {
    const pool = difficulty === "easy" ? HERMENEUTIC_EASY : HERMENEUTIC_HARD;
    setCurrentPuzzle(rand$5(pool));
    setGameKey((k) => k + 1);
  }
  function handleDifficulty(next) {
    if (next === difficulty) return;
    setDifficulty(next);
    const pool = next === "easy" ? HERMENEUTIC_EASY : HERMENEUTIC_HARD;
    setCurrentPuzzle(rand$5(pool));
    setGameKey((k) => k + 1);
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Hermeneutic",
        path: "/games/hermeneutic",
        description: "Guess the philosophical term from progressively revealing clues. Each wrong answer unveils another layer of context."
      }
    ),
    /* @__PURE__ */ jsxs("section", { className: "max-w-2xl mx-auto px-6 py-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/games",
            className: "font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150",
            children: "← Games"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs tracking-widest uppercase text-ink/40", children: "Hermeneutic" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mt-6", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDifficulty("easy"),
            className: `font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${difficulty === "easy" ? "bg-green text-cream border-transparent" : "border-gold/30 text-ink/50 hover:border-gold/60 hover:text-ink/70"}`,
            children: "Easy"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDifficulty("hard"),
            className: `font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-full border transition-colors duration-150 ${difficulty === "hard" ? "bg-green text-cream border-transparent" : "border-gold/30 text-ink/50 hover:border-gold/60 hover:text-ink/70"}`,
            children: "Hard"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 pb-20", children: /* @__PURE__ */ jsx(
      GameBoard$5,
      {
        puzzle: currentPuzzle,
        onNewGame: handleNewGame
      },
      gameKey
    ) })
  ] });
}
const EPOCHE = [
  {
    statement: '"Bachelors are unmarried men."',
    axes: {
      "Analytic / Synthetic": "Analytic",
      "A priori / A posteriori": "A priori",
      "Necessary / Contingent": "Necessary",
      "Descriptive / Normative": "Descriptive"
    },
    note: 'The predicate is contained in the subject — no empirical investigation required. Quine challenged whether this distinction is tenable in "Two Dogmas of Empiricism," but this remains the textbook case of an analytic truth.'
  },
  {
    statement: '"The sun will rise tomorrow."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A posteriori",
      "Necessary / Contingent": "Contingent",
      "Descriptive / Normative": "Descriptive"
    },
    note: "Hume's problem of induction: no logical necessity compels the sun to rise. The proposition extends beyond what is contained in the subject and is justified only through experience of past regularity."
  },
  {
    statement: '"You ought not torture innocents for entertainment."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A priori",
      "Necessary / Contingent": "Necessary",
      "Descriptive / Normative": "Normative"
    },
    note: "Moral rationalists (Kant, Ross) hold this is known a priori and necessarily true. Expressivists (Ayer, Blackburn) deny it has truth-value at all. The classification here reflects the Kantian position — itself deeply contested."
  },
  {
    statement: '"7 + 5 = 12."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A priori",
      "Necessary / Contingent": "Necessary",
      "Descriptive / Normative": "Descriptive"
    },
    note: "Kant's paradigm case of a synthetic a priori judgment. The concept 12 is not contained in 7 or 5 alone — arithmetic requires the pure intuition of time (counting) to be grasped. Frege disagreed, attempting to reduce arithmetic to logic alone and thus make it analytic. The debate about whether mathematics is analytic or synthetic a priori remains live."
  },
  {
    statement: '"Water is H₂O."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A posteriori",
      "Necessary / Contingent": "Necessary",
      "Descriptive / Normative": "Descriptive"
    },
    note: "Kripke's celebrated necessary a posteriori. Before chemistry, this identity was unknown — discovered empirically. Yet once discovered, it holds necessarily: in no possible world is water something other than H₂O. This discovery disproved the traditional equation of necessity with aprioricity and of contingency with the empirical."
  },
  {
    statement: '"Caesar crossed the Rubicon."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A posteriori",
      "Necessary / Contingent": "Contingent",
      "Descriptive / Normative": "Descriptive"
    },
    note: "The textbook contingent empirical claim. Nothing in the concepts of Caesar or the Rubicon guarantees the crossing — it required an act of will, a historical moment, an army. Leibniz controversially held that Caesar's concept includes the predicate of crossing, making it necessary. Kant rejected this: it conflates logical necessity with mere analytic containment."
  },
  {
    statement: '"Nothing can be both red and green all over at the same time."',
    axes: {
      "Analytic / Synthetic": "Analytic",
      "A priori / A posteriori": "A priori",
      "Necessary / Contingent": "Necessary",
      "Descriptive / Normative": "Descriptive"
    },
    note: "Wittgenstein's colour exclusion problem. In the Tractatus he held this was synthetic a priori — a structural fact about colour space not derivable from logic alone, which troubled his picture theory. He later abandoned this. The dominant position classifies it as analytic: the grammar of colour terms rules out simultaneous total redness and greenness by meaning alone."
  },
  {
    statement: '"Pain is intrinsically bad."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A priori",
      "Necessary / Contingent": "Necessary",
      "Descriptive / Normative": "Normative"
    },
    note: "The moral intuitionist position (Moore, Ross): some normative truths are knowable a priori through rational intuition — not derived from definitions, yet not discovered through empirical investigation. Expressivists deny it has any truth-value. Naturalists claim it is synthetic a posteriori: 'bad' picks out a natural property knowable by observation."
  },
  {
    statement: '"Act only according to that maxim by which you can at the same time will that it should become a universal law."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A priori",
      "Necessary / Contingent": "Necessary",
      "Descriptive / Normative": "Normative"
    },
    note: "Kant's categorical imperative. Synthetic because universalisability as the criterion of rightness is not contained in the concept of moral obligation. A priori because it is grounded in pure practical reason, not experience. Necessary because for Kant a moral law admits no exceptions — it holds unconditionally across all rational agents."
  },
  {
    statement: '"Democratic governments tend to outlast autocratic ones."',
    axes: {
      "Analytic / Synthetic": "Synthetic",
      "A priori / A posteriori": "A posteriori",
      "Necessary / Contingent": "Contingent",
      "Descriptive / Normative": "Descriptive"
    },
    note: "A synthetic empirical generalisation from comparative politics, not a conceptual truth. Its justification rests on the historical record — verifiable data on regime longevity. Contingent because the causal mechanisms could in principle fail; it is an inductive claim about tendencies, not a statement of logical necessity."
  }
];
function rand$4(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
const AXIS_OPTIONS = {
  "Analytic / Synthetic": ["Analytic", "Synthetic"],
  "A priori / A posteriori": ["A priori", "A posteriori"],
  "Necessary / Contingent": ["Necessary", "Contingent"],
  "Descriptive / Normative": ["Descriptive", "Normative"]
};
const TERMS = [
  {
    axis: "Analytic / Synthetic",
    terms: [
      {
        name: "Analytic",
        def: "Truth follows from the meanings of its terms alone; predicate adds nothing beyond what is already contained in the subject."
      },
      {
        name: "Synthetic",
        def: "Adds information beyond what is contained in the subject's meaning. Truth cannot be determined by concept analysis alone; it requires appeal to experience or further reasoning."
      }
    ]
  },
  {
    axis: "A priori / A posteriori",
    terms: [
      {
        name: "A priori",
        def: "Knowledge or justification independent of sensory experience."
      },
      {
        name: "A posteriori",
        def: "Knowledge derived from and dependent on sensory experience. Empirical claims about the contingent world."
      }
    ]
  },
  {
    axis: "Necessary / Contingent",
    terms: [
      {
        name: "Necessary",
        def: "True in every possible world. Denial leads to contradiction."
      },
      {
        name: "Contingent",
        def: 'A proposition that is true but could have been false — true in some possible worlds, false in others. "Napoleon lost at Waterloo" is contingent: history could have gone differently.'
      }
    ]
  },
  {
    axis: "Descriptive / Normative",
    terms: [
      {
        name: "Descriptive",
        def: "States how things are, were, or will be. Falsifiable."
      },
      {
        name: "Normative",
        def: "States how things ought to be, what is good, right, or valuable."
      }
    ]
  }
];
const TERM_DEFS = Object.fromEntries(
  TERMS.flatMap(({ terms }) => terms.map(({ name, def }) => [name, def]))
);
function Tooltip({ children, text }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  function show() {
    clearTimeout(timerRef.current);
    setVisible(true);
  }
  function hide() {
    timerRef.current = setTimeout(() => setVisible(false), 80);
  }
  return /* @__PURE__ */ jsxs("div", { className: "relative", onMouseEnter: show, onMouseLeave: hide, children: [
    children,
    visible && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 z-50",
        style: {
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.25))"
        },
        children: [
          /* @__PURE__ */ jsx("div", { className: "bg-[#1A1A18] text-[#F8F4EC]/80 text-xs font-body leading-relaxed rounded-lg px-3 py-2.5", children: text }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#1A1A18]" })
        ]
      }
    )
  ] });
}
function getButtonClass(status, hasResult, isSelected, axisCorrect, isCorrectAnswer) {
  let btnClass = "px-4 py-1.5 rounded-full border font-body text-xs cursor-pointer transition-all duration-150 ";
  if (status === "playing") {
    btnClass += isSelected ? "bg-green text-cream border-transparent" : "border-gold/30 text-ink/60 hover:border-gold/60 hover:text-ink";
  } else {
    if (isCorrectAnswer) {
      btnClass += "bg-green text-cream border-transparent";
    } else if (isSelected && !isCorrectAnswer) {
      btnClass += "bg-terracotta/15 text-terracotta border-terracotta/25";
    } else {
      btnClass += "border-gold/20 text-ink/30 cursor-default";
    }
  }
  return btnClass;
}
function GameBoard$4({ puzzle, onNewGame }) {
  const axes = Object.keys(puzzle.axes);
  const [sel, setSel] = useState(
    () => Object.fromEntries(axes.map((a) => [a, null]))
  );
  const [results, setResults] = useState(null);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("playing");
  const [firstAllWrong, setFirstAllWrong] = useState(false);
  const allSelected = axes.every((a) => sel[a] !== null);
  function handleSelect(axis, val) {
    if (status !== "playing") return;
    setSel((s) => ({ ...s, [axis]: val }));
  }
  function handleSubmit() {
    if (!allSelected || status !== "playing") return;
    const res = Object.fromEntries(
      axes.map((a) => [a, sel[a] === puzzle.axes[a]])
    );
    const allCorrect = axes.every((a) => res[a]);
    const newAttempts = attempts + 1;
    if (attempts === 0 && axes.every((a) => !res[a])) setFirstAllWrong(true);
    setResults(res);
    setAttempts(newAttempts);
    if (allCorrect) {
      setStatus("win");
    } else if (newAttempts >= 3) {
      setStatus("lose");
    }
  }
  const wrongAxes = results ? axes.filter((a) => !results[a]) : [];
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "border border-gold/30 rounded-lg px-5 py-4 mb-6", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-gold tracking-widest uppercase mb-2", children: "Proposition" }),
      /* @__PURE__ */ jsx("p", { className: "font-heading font-light text-ink text-xl leading-snug", children: puzzle.statement })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border border-gold/20 rounded-lg mb-5", children: axes.map((axis, i) => {
      const opts = AXIS_OPTIONS[axis];
      const chosen = sel[axis];
      const correct = puzzle.axes[axis];
      const hasResult = results !== null;
      const axisCorrect = hasResult ? results[axis] : null;
      return /* @__PURE__ */ jsxs(
        "div",
        {
          className: `flex items-center gap-4 px-5 py-3 flex-wrap ${i < axes.length - 1 ? "border-b border-gold/15" : ""}`,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "font-mono text-xs text-ink/50 tracking-wide flex-1 min-w-[160px]", children: [
              axis,
              hasResult && status !== "playing" && /* @__PURE__ */ jsx(
                "span",
                {
                  className: `ml-2 animate-pop-in ${axisCorrect ? "text-green" : "text-terracotta"}`,
                  children: axisCorrect ? "✓" : "✗"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: opts.map((opt) => {
              const isSelected = chosen === opt;
              const isCorrectAnswer = opt === correct;
              const btnClass = getButtonClass(
                status,
                hasResult,
                isSelected,
                axisCorrect,
                isCorrectAnswer
              );
              return /* @__PURE__ */ jsx(
                Tooltip,
                {
                  text: TERM_DEFS[opt],
                  children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => handleSelect(axis, opt),
                      disabled: status !== "playing",
                      className: btnClass,
                      children: opt
                    }
                  )
                },
                opt
              );
            }) })
          ]
        },
        axis
      );
    }) }),
    results && status === "playing" && /* @__PURE__ */ jsx("div", { className: "bg-terracotta/8 border border-terracotta/20 rounded-lg px-5 py-3 mb-4 animate-slide-up", children: /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-terracotta/90", children: [
      wrongAxes.length === 1 ? `One axis is wrong — reconsider and try again.` : `${wrongAxes.length} axes are wrong — reconsider and try again.`,
      " ",
      /* @__PURE__ */ jsxs("span", { className: "text-ink/40", children: [
        "(",
        3 - attempts,
        " ",
        3 - attempts === 1 ? "attempt" : "attempts",
        " left)"
      ] })
    ] }) }),
    status === "playing" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: handleSubmit,
        disabled: !allSelected,
        className: "px-6 py-2.5 rounded-lg bg-green text-cream font-body text-sm hover:bg-green/90 disabled:opacity-40 disabled:cursor-default transition-colors duration-150",
        children: "Submit classification"
      }
    ),
    status === "win" && /* @__PURE__ */ jsxs("div", { className: "bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-green/70 mb-2", children: "Correct — all four axes" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: puzzle.note })
    ] }),
    status === "win" && firstAllWrong && /* @__PURE__ */ jsxs("div", { className: "mt-4 border border-gold/40 rounded-lg overflow-hidden animate-slide-up", children: [
      /* @__PURE__ */ jsx("div", { className: "bg-gold/10 px-5 py-3 border-b border-gold/25", children: /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-gold", children: "Easter Egg · Unexamined Assumption" }) }),
      /* @__PURE__ */ jsxs("div", { className: "px-5 py-4", children: [
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/80 leading-relaxed mb-3", children: "Your first attempt was wrong on all four axes — every classification the inverse of the truth. You bracketed your assumptions, reconsidered, and found your way through." }),
        /* @__PURE__ */ jsx("blockquote", { className: "border-l-4 border-terracotta pl-4 mb-3", children: /* @__PURE__ */ jsx("p", { className: "font-heading font-light text-ink text-base italic leading-relaxed", children: '"We put out of action the general positing which belongs to the essence of the natural attitude; we parenthesize everything which that positing encompasses."' }) }),
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-gold/70", children: "Edmund Husserl · Ideas I (1913)" })
      ] })
    ] }),
    status === "lose" && /* @__PURE__ */ jsxs("div", { className: "bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-2", children: "Three attempts used" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: puzzle.note })
    ] }),
    status === "playing" && attempts > 0 && /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs text-ink/30 mt-3 tracking-wide", children: [
      "Attempt ",
      attempts,
      " of 3"
    ] }),
    status !== "playing" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onNewGame,
        className: "mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150",
        children: "New proposition"
      }
    )
  ] });
}
function GameEpoche() {
  const [gameKey, setGameKey] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(() => rand$4(EPOCHE));
  function handleNewGame() {
    setCurrentPuzzle(rand$4(EPOCHE));
    setGameKey((k) => k + 1);
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Époche",
        path: "/games/epoche",
        description: "Classify a philosophical proposition across four axes: analytic/synthetic, a priori/a posteriori, necessary/contingent, descriptive/normative."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/games",
          className: "font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150",
          children: "← Games"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-xs tracking-widest uppercase text-ink/40", children: "Époche" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 pb-20", children: /* @__PURE__ */ jsx(
      GameBoard$4,
      {
        puzzle: currentPuzzle,
        onNewGame: handleNewGame
      },
      gameKey
    ) })
  ] });
}
const FALLACY = [
  {
    argument: "Every time I've opened up emotionally to a friend, I've ended up feeling worse — they got uncomfortable, didn't know what to say, or shared what I'd told them. Being vulnerable with people only makes things harder.",
    answer: "Hasty generalisation",
    family: "Informal",
    cls: "Presumption",
    explanation: "A handful of painful experiences feels definitive from the inside — especially when they hurt. But a conclusion about all people drawn from a few cases is exactly what a hasty generalisation is. The sample is small and emotionally loaded, which makes it feel more solid than it is. The pattern may be real; the universal conclusion isn't warranted."
  },
  {
    argument: "The nutritionist advising on this company's wellness programme has visibly gained weight over the past year. I don't think we should be taking her recommendations seriously.",
    answer: "Ad hominem (abusive)",
    family: "Informal",
    cls: "Relevance",
    explanation: "This feels like reasonable scepticism — if someone can't follow their own advice, why should you? But the validity of nutritional science doesn't depend on the practitioner's body. A cardiologist with high blood pressure can still give accurate advice about reducing cholesterol. Attacking the person's circumstances instead of the content of their argument is ad hominem, however intuitively compelling the attack feels."
  },
  {
    argument: "You either get into a top university or you end up stuck in a mediocre career for the rest of your life. I can't afford to let my kid just drift.",
    answer: "False dilemma",
    family: "Informal",
    cls: "Presumption",
    explanation: "The fear feels completely rational — it looks like a binary fork in the road. But the space between 'top university' and 'mediocre career' contains most of the territory of human working life. The false dilemma works by erasing the middle: vocational routes, late bloomers, second degrees, careers that don't require university at all. Reducing a vast possibility space to two options forces a conclusion that the evidence doesn't support."
  },
  {
    argument: "If I skip the gym just this once, I know what happens. It becomes twice, then a standing excuse, then a former habit — and six months from now I'll have completely abandoned my health.",
    answer: "Slippery slope",
    family: "Informal",
    cls: "Presumption",
    explanation: "This reasoning is seductive precisely because it's sometimes true — habits do erode. But the argument asserts a necessary causal chain where each step automatically triggers the next, without evidence that the slide is inevitable. Missing one workout needn't become missing all of them. The fallacy is treating a possible outcome as a certain one, and using that certainty to foreclose the initial, modest choice."
  },
  {
    argument: "You've been telling me to cut down on screen time for months. But you're on your phone constantly — at dinner, before bed, first thing in the morning. Why should I take that advice from you?",
    answer: "Tu quoque",
    family: "Informal",
    cls: "Relevance",
    explanation: "Whether the advice is good depends on the advice, not on whether the person giving it follows it. A doctor who smokes can still correctly advise you not to. Tu quoque deflects the argument onto the person without ever engaging whether the claim itself is true."
  },
  {
    argument: "A Nobel laureate in physics recently stated publicly that the health risks of mobile phone radiation are being dramatically underplayed. He's won the most prestigious scientific prize in existence. His views on this deserve serious consideration.",
    answer: "Appeal to authority",
    family: "Informal",
    cls: "Relevance",
    explanation: "Expertise is domain-specific. A Nobel Prize in physics is an extraordinary credential in physics; it confers no particular authority on epidemiology or biomedical research. The appeal to authority fallacy doesn't mean experts are wrong — it means that prestige in one field doesn't settle questions in a different one. The scientific consensus on phone radiation comes from researchers who specialise in exactly that question."
  },
  {
    argument: "The senator proposed a 5% reduction in the defence budget to redirect funding to veterans' mental health. Her opponents responded: 'She wants to gut our military and leave the country defenceless against its enemies.'",
    answer: "Straw man",
    family: "Informal",
    cls: "Relevance",
    explanation: "A 5% reallocation and 'gutting the military' are not the same position. The opponents replaced her specific, modest proposal with an exaggerated, indefensible version — easier to attack, impossible to defend. The straw man works by misrepresentation: argue against a position your opponent doesn't hold, win that argument, and imply you've defeated the real one."
  },
  {
    argument: "I'm an excellent judge of character — I've never been seriously deceived by someone I trusted. And the reason I've never been deceived is that I read people very accurately.",
    answer: "Circular reasoning",
    family: "Informal",
    cls: "Presumption",
    explanation: "The conclusion and the premise are the same claim in different words: 'I'm a good judge because I'm accurate; I'm accurate because I'm a good judge.' No independent evidence is offered for either. Circular reasoning often feels like confident self-knowledge from the inside — but it uses the conclusion to justify itself. It's also worth noting that people who believe they've never been deceived may simply not have discovered it yet."
  },
  {
    argument: "The school's mission statement says it promotes 'critical thinking' and encourages students to 'question received wisdom.' Surely that means we should feel free to challenge whatever our teachers say — including exam requirements.",
    answer: "Equivocation",
    family: "Informal",
    cls: "Ambiguity",
    explanation: "'Critical thinking' in an educational context means evaluating ideas and arguments — not rejecting institutional authority. The argument exploits the word's elasticity: it slides from 'thinking critically about ideas' to 'not having to do what you're told.' Equivocation is hardest to spot when both meanings are perfectly reasonable in isolation — only the shift between them is the error."
  },
  {
    argument: "I told him how I was really feeling for the first time — that I was struggling and needed more support. Two days later, he became distant and stopped initiating contact. Being honest about my emotions clearly pushed him away.",
    answer: "Post hoc ergo propter hoc",
    family: "Informal",
    cls: "Presumption",
    explanation: "Temporal sequence is not causation, but it feels exactly like it when you're the one who opened up and got hurt. His withdrawal could reflect his own stress, something unrelated happening in his life, or simple coincidence. The post hoc fallacy is especially painful in personal contexts because the alternative — that vulnerability didn't cause the outcome — offers no comfort and is harder to see from the inside."
  },
  {
    argument: "We've been running annual performance reviews the same way for thirty years. If it were failing people, the organisation would have changed it long ago.",
    answer: "Appeal to tradition",
    family: "Informal",
    cls: "Relevance",
    explanation: "Longevity is not evidence of optimality. Practices survive for many reasons — inertia, sunk cost, nobody being empowered to change them — that have nothing to do with their effectiveness. The argument makes persistence do the work that evidence should do. Plenty of things have been done the same way for decades while quietly failing the people they're meant to serve."
  },
  {
    argument: "Millions of people have tried intermittent fasting and say it transformed their health. Are you seriously suggesting all of them are wrong? That many people can't be mistaken about something they've personally experienced.",
    answer: "Appeal to popularity",
    family: "Informal",
    cls: "Relevance",
    explanation: "The scale of popular belief is irrelevant to whether the belief is correct. Millions of people once held false beliefs about the solar system and disease. Personal testimony about felt effects is also notoriously unreliable — it doesn't control for placebo, expectation, coincidental timing, or confirmation bias. Something being widely believed and personally felt convincing is not the same as having been tested."
  },
  {
    argument: "That meta-analysis claiming moderate alcohol consumption is cardioprotective? It was funded by the drinks industry. You can't trust conclusions from researchers with a financial stake in the outcome.",
    answer: "Genetic fallacy",
    family: "Informal",
    cls: "Relevance",
    explanation: "Funding bias is a real concern in science, and scepticism about industry-funded research is healthy. But the genetic fallacy is dismissing a claim based on its source rather than evaluating its actual content. The data and methodology of a study must be scrutinised on their own terms. If the research is flawed, that should be demonstrable from the study itself — not assumed from who commissioned it."
  },
  {
    argument: "When I said real fans never boo their own team, someone pointed out that dozens of supporters booed loudly after last week's match. My reply: those people aren't real fans. A genuine supporter backs the club unconditionally.",
    answer: "No true Scotsman",
    family: "Informal",
    cls: "Presumption",
    explanation: "The original claim — 'real fans don't boo' — is falsified by the counterexample. Rather than revising the claim, the speaker redefines 'real fan' to exclude anyone who boos, making the claim unfalsifiable by construction. This is the pattern: a universal claim encounters a counterexample; the response is to redefine the category so the counterexample no longer counts. The goalposts have moved, but the speaker acts as though they haven't."
  },
  {
    argument: "I only buy supplements made from natural plant extracts — nothing synthetic, nothing cooked up in a chemical plant. I'd rather put something the earth made into my body.",
    answer: "Appeal to nature",
    family: "Informal",
    cls: "Relevance",
    explanation: "Natural and safe are not synonyms. Arsenic, hemlock, and ricin are entirely natural; aspirin and penicillin are synthetic. The natural origin of a substance tells you nothing about its safety, efficacy, or bioavailability. The appeal to nature gains its force from a conflation: 'natural' sounds like 'wholesome' and 'gentle,' but these are associations, not properties that follow from natural origin."
  },
  {
    argument: "If my partner were cheating on me, they'd be secretive about their phone. Lately they've been taking calls in another room and turning the screen away. So they must be cheating.",
    answer: "Affirming the consequent",
    family: "Formal",
    cls: "Formal",
    explanation: "The argument form is: if P then Q; Q is true; therefore P. But phone secrecy (Q) can have many causes besides cheating (P) — a surprise being planned, a personal conversation they want privacy for, a new habit. The conditional only runs one way: cheating implies secrecy, but secrecy doesn't imply cheating. From the inside, it feels like detective work; structurally, it's a logical error."
  },
  {
    argument: "Doctors say that regular exercise improves cardiovascular health. My father can't exercise — he has severe arthritis. So there's really no way to improve his heart health.",
    answer: "Denying the antecedent",
    family: "Formal",
    cls: "Formal",
    explanation: "The argument form is: if P then Q; P is false; therefore Q is false. But the absence of one sufficient condition (exercise) doesn't eliminate the outcome (heart health improvement), because other routes exist — dietary changes, medication, stress reduction, weight management. The conditional tells you that exercise is one way to improve heart health, not the only way. Denying the antecedent treats a sufficient condition as a necessary one."
  },
  // Non-fallacy arguments — valid reasoning that may superficially resemble a fallacy
  {
    argument: "Dr Aiko Tanaka has spent thirty years studying the epidemiology of respiratory disease and has authored over 150 peer-reviewed studies on the subject. When she states that long-term exposure to particulate matter at current urban levels significantly elevates the risk of chronic obstructive pulmonary disease, this is a well-grounded reason to take the claim seriously.",
    answer: "No fallacy",
    family: "Valid",
    cls: "Valid",
    explanation: "Appeal to authority is a fallacy when an expert's prestige is used to settle a question outside their domain, or when expertise substitutes for evidence. Here the expertise is directly relevant — thirty years of domain-specific research, not mere reputation. Citing what a specialist says within their specialty, backed by an extensive publication record, is legitimate reasoning. The claim would need to be rebutted by engaging the underlying research, not by dismissing the appeal to expertise."
  },
  {
    argument: "If the server logs had been altered after the incident, the checksums stored on the offline backup would not match the current log files. We verified the checksums: they match exactly. Therefore the logs were not altered after the incident.",
    answer: "No fallacy",
    family: "Valid",
    cls: "Valid",
    explanation: "This is modus tollens — 'if P then Q; not-Q; therefore not-P' — a valid deductive argument form. It should not be confused with denying the antecedent ('if P then Q; not-P; therefore not-Q'), which is the formal fallacy. Here it is the consequent that is denied: the checksum mismatch (Q) did not occur, which validly licenses the conclusion that the antecedent — log alteration (P) — did not occur. The inference is structurally sound."
  },
  {
    argument: "Five independent randomised controlled trials, each recruiting over 8,000 participants across multiple countries and demographic groups, all found that the intervention reduced the primary outcome by between 31% and 38%. A pre-registered meta-analysis pooling all five trials confirmed an overall reduction of 34%. This is strong evidence that the intervention is effective.",
    answer: "No fallacy",
    family: "Valid",
    cls: "Valid",
    explanation: "Hasty generalisation occurs when conclusions outstrip the evidence — small samples, unrepresentative populations, a single study. Here the evidence base is large, independent, geographically diverse, and confirmed by meta-analysis. Drawing a confident conclusion from this level of evidence is exactly what sound empirical reasoning looks like. The strength of the conclusion is proportional to the strength of the evidence — which is the epistemic ideal, not a generalisation error."
  },
  {
    argument: "Following the introduction of mandatory front-of-pack nutritional labelling, purchases of high-sugar products in the pilot region declined by 18%. Eight demographically comparable regions without the policy showed no equivalent decline over the same period. After accounting for seasonal buying patterns and concurrent advertising campaigns, the association remained consistent. The evidence supports a causal role for the labelling policy.",
    answer: "No fallacy",
    family: "Valid",
    cls: "Valid",
    explanation: "Post hoc ergo propter hoc is a fallacy when temporal sequence alone is used to infer causation. This argument does not rest on sequence alone: it includes a comparison group of similar regions, controls for alternative explanations, and assesses whether the pattern is specific to the intervention. This is the structure of controlled causal inference — it goes beyond 'A happened, then B happened.' A causal conclusion is not fallacious simply because it involves temporal data; what matters is whether the inference is adequately controlled."
  },
  {
    argument: "The only study supporting this drug's safety profile for long-term use was funded entirely by the manufacturer, has not been independently replicated in the six years since publication, and was conducted on a sample that excluded patients with liver conditions — the very population most at risk. On these grounds, we have strong reason to seek independent replication before approving it for general use.",
    answer: "No fallacy",
    family: "Valid",
    cls: "Valid",
    explanation: "The genetic fallacy dismisses a claim solely because of its source, treating origin as a substitute for evaluating content. This argument does not do that. It identifies specific methodological concerns — conflict of interest, absence of independent replication, and a sample that excludes high-risk patients — as grounds for requiring further evidence before approval. This is epistemically legitimate: the financial interest, combined with the absence of independent verification and a narrow sample, constitutes genuine methodological concern, not a mere guilty-by-association dismissal."
  },
  {
    argument: "The will was executed either before or after the testator was declared legally incapacitated — there is no third temporal possibility. The court records confirm that the declaration of incapacity predates the will's execution by three weeks. Therefore the will was executed after the testator was declared legally incapacitated.",
    answer: "No fallacy",
    family: "Valid",
    cls: "Valid",
    explanation: "False dilemma is a fallacy when stated alternatives are presented as exhaustive when they are not. Here the disjunction — before or after a single event — is genuinely exhaustive: there is no temporal middle ground. This is a valid disjunctive syllogism: 'either P or Q; not-P; therefore Q.' A binary disjunction that is actually exhaustive is not a false dilemma — it is a valid logical form. The argument's strength rests entirely on whether the alternatives truly cover all possibilities, and in this case they do."
  },
  // Multi-fallacy arguments — more than one error at work; the dominant fallacy is the answer
  {
    argument: "If we don't take a hard line on minor drug offences, we're effectively saying drug use is acceptable. And once we signal that, it normalises experimentation, which leads to harder drugs, which leads to addiction — and within a decade we'll have a generation too impaired to function.",
    answer: "Slippery slope",
    family: "Informal",
    cls: "Presumption",
    explanation: "Two fallacies work together here. The opening is a false dilemma: 'not cracking down' is treated as equivalent to 'endorsing drug use,' erasing a wide middle ground of harm reduction, decriminalisation, and regulated tolerance. Built on that is a slippery slope: normalisation → experimentation → harder drugs → societal collapse, each step asserted as a necessary consequence without a causal mechanism. Evidence from harm-reduction jurisdictions consistently fails to produce the predicted slide."
  },
  {
    argument: "Arranged marriages have been practised for thousands of years across dozens of cultures — billions of people can't be entirely wrong about this. There must be something genuinely right about a system that has persisted that long and that widely.",
    answer: "Appeal to tradition",
    family: "Informal",
    cls: "Relevance",
    explanation: "Two fallacies reinforce each other. The first is appeal to tradition: longevity is taken as evidence of value, when practices persist through inertia, power structures, and lack of alternatives as readily as through merit. The second is appeal to popularity: the sheer number of people who have lived under the system is treated as a collective endorsement. Neither the age of a practice nor its prevalence tells us whether it is good — only its actual effects on the people it governs does."
  },
  {
    argument: "My colleague is arguing we should cut mandatory overtime. She clearly doesn't care whether we hit our targets — and that kind of attitude is exactly why people who think like her tend to end up in middling careers.",
    answer: "Straw man",
    family: "Informal",
    cls: "Relevance",
    explanation: "Two fallacies work together. First, a straw man: arguing to reduce overtime is recast as 'not caring about targets,' erasing the possibility that she thinks the team can meet targets without excessive hours — or that overwork actually reduces output. Second, an ad hominem: her presumed career trajectory is introduced to discredit the position rather than engage it. Real arguments rarely commit exactly one error; they typically bundle a misrepresentation of the position with an attack on the person making it."
  },
  {
    argument: "This research on the benefits of mindfulness was led by a scientist who left mainstream academia to run a wellness retreat. Given that financial stake — combined with the fact that he clearly abandoned rigorous science — I wouldn't trust any of his conclusions.",
    answer: "Genetic fallacy",
    family: "Informal",
    cls: "Relevance",
    explanation: "Two separate attacks on the source are layered here. The first is a genetic fallacy: the researcher's financial interest is used to dismiss the findings rather than evaluate the methodology, sample size, or replication record. The second is an ad hominem: his career change is taken as evidence of intellectual decline. Neither move engages the actual data. Funding conflicts are worth disclosing and examining — but they don't automatically invalidate results that can be scrutinised on their own terms."
  }
];
const FALLACY_OPTS = [
  {
    name: "Ad hominem (abusive)",
    family: "Informal",
    cls: "Relevance",
    definition: "Attacking the person making the argument rather than the argument itself."
  },
  {
    name: "Tu quoque",
    family: "Informal",
    cls: "Relevance",
    definition: "Deflecting criticism by pointing out that the accuser does the same thing."
  },
  {
    name: "Appeal to authority",
    family: "Informal",
    cls: "Relevance",
    definition: "Treating an expert's opinion as conclusive proof outside their domain of expertise."
  },
  {
    name: "Straw man",
    family: "Informal",
    cls: "Relevance",
    definition: "Misrepresenting an opponent's argument into a weaker version, then refuting that instead."
  },
  {
    name: "Appeal to tradition",
    family: "Informal",
    cls: "Relevance",
    definition: "Arguing something is right or good simply because it has always been done that way."
  },
  {
    name: "Appeal to popularity",
    family: "Informal",
    cls: "Relevance",
    definition: "Claiming something is true or good because many people believe or do it."
  },
  {
    name: "Genetic fallacy",
    family: "Informal",
    cls: "Relevance",
    definition: "Judging a claim based on its origin or source rather than its own merits."
  },
  {
    name: "Appeal to nature",
    family: "Informal",
    cls: "Relevance",
    definition: "Arguing that something is good or right because it is natural, or bad because it is unnatural."
  },
  {
    name: "False dilemma",
    family: "Informal",
    cls: "Presumption",
    definition: "Presenting only two options as if they are the only possibilities when others exist."
  },
  {
    name: "Slippery slope",
    family: "Informal",
    cls: "Presumption",
    definition: "Claiming one event will inevitably trigger a chain of extreme consequences without justification."
  },
  {
    name: "Hasty generalisation",
    family: "Informal",
    cls: "Presumption",
    definition: "Drawing a broad conclusion from an unrepresentative or insufficient sample."
  },
  {
    name: "Circular reasoning",
    family: "Informal",
    cls: "Presumption",
    definition: "Using the conclusion as a hidden premise to support itself."
  },
  {
    name: "No true Scotsman",
    family: "Informal",
    cls: "Presumption",
    definition: "Dismissing counterexamples by arbitrarily redefining the category to exclude them."
  },
  {
    name: "Post hoc ergo propter hoc",
    family: "Informal",
    cls: "Presumption",
    definition: "Assuming that because B followed A, A must have caused B."
  },
  {
    name: "Equivocation",
    family: "Informal",
    cls: "Ambiguity",
    definition: "Exploiting a word's multiple meanings to shift between senses mid-argument."
  },
  {
    name: "Affirming the consequent",
    family: "Formal",
    cls: "Formal",
    definition: 'Inferring the antecedent from the consequent: "If P then Q; Q; therefore P."'
  },
  {
    name: "Denying the antecedent",
    family: "Formal",
    cls: "Formal",
    definition: 'Inferring the negation of the consequent from the negation of the antecedent: "If P then Q; not P; therefore not Q."'
  },
  {
    name: "No fallacy",
    family: "Valid",
    cls: "Valid",
    noLabel: true,
    definition: "The argument is logically sound: its premises genuinely support its conclusion without exploiting bias, misrepresentation, or structural error."
  }
];
const MAX_GUESSES = 4;
function rand$3(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
const RESULT_STYLES = {
  ok: {
    btn: "bg-green text-cream border-transparent",
    label: "Correct",
    labelClass: "text-green",
    dot: "#2C4A3E"
  },
  cls: {
    btn: "border-transparent text-ink",
    style: {
      background: "#C9A44C22",
      borderColor: "#C9A44C66",
      color: "#7A5C1E"
    },
    label: "Same class",
    labelClass: "text-gold",
    dot: "#C9A44C"
  },
  fam: {
    btn: "border-transparent",
    style: {
      background: "#4A6A8822",
      borderColor: "#4A6A8844",
      color: "#2A4A68"
    },
    label: "Same family",
    labelClass: "text-ink/60",
    dot: "#4A6A88"
  },
  no: {
    btn: "bg-terracotta/10 text-terracotta border-terracotta/20",
    label: "Wrong",
    labelClass: "text-terracotta",
    dot: "#C4704F"
  }
};
function GameBoard$3({ puzzle, onNewGame }) {
  const [guesses, setGuesses] = useState([]);
  const [status, setStatus] = useState("playing");
  function handlePick(i) {
    if (status !== "playing") return;
    const f = FALLACY_OPTS[i];
    if (guesses.find((g) => g.name === f.name)) return;
    let result;
    if (f.name === puzzle.answer) result = "ok";
    else if (f.cls === puzzle.cls) result = "cls";
    else if (f.family === puzzle.family) result = "fam";
    else result = "no";
    const newGuesses = [...guesses, { name: f.name, result, idx: i }];
    setGuesses(newGuesses);
    if (result === "ok") setStatus("win");
    else if (newGuesses.length >= MAX_GUESSES) setStatus("lose");
  }
  function getGuess(i) {
    return guesses.find((g) => g.idx === i);
  }
  const attemptsLeft = MAX_GUESSES - guesses.length;
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsxs("div", { className: "border border-gold/30 rounded-lg px-5 py-4 mb-5", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-gold tracking-widest uppercase mb-2", children: "Argument" }),
      /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/80 leading-relaxed italic", children: [
        "“",
        puzzle.argument,
        "”"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-x-5 gap-y-1.5 mb-5 font-mono text-xs text-ink/50", children: Object.entries(RESULT_STYLES).map(([key, val]) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: "w-2 h-2 rounded-sm inline-block flex-shrink-0",
          style: { background: val.dot }
        }
      ),
      val.label
    ] }, key)) }),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2 mb-5", children: FALLACY_OPTS.map((opt, i) => {
      const guess = getGuess(i);
      const r = guess == null ? void 0 : guess.result;
      const style = r ? RESULT_STYLES[r] : null;
      const alreadyGuessed = !!guess;
      const isDisabled = status !== "playing" || alreadyGuessed;
      let className = "px-3 py-2.5 rounded-lg border font-body text-xs text-left leading-snug cursor-pointer transition-all duration-150 ";
      if (r) {
        className += style.btn + " animate-pop-in";
      } else if (isDisabled) {
        className += "border-gold/15 text-ink/25 cursor-default";
      } else {
        className += "border-gold/25 text-ink/65 hover:border-gold/50 hover:bg-cream-dark hover:text-ink";
      }
      return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => handlePick(i),
            disabled: isDisabled,
            className: className + " w-full pr-7",
            style: r && style.style ? style.style : void 0,
            children: [
              /* @__PURE__ */ jsx("span", { className: "block font-medium", children: opt.name }),
              !opt.noLabel && /* @__PURE__ */ jsxs("span", { className: "block text-[10px] mt-0.5 opacity-60", children: [
                opt.family,
                " · ",
                opt.cls
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "group/tip absolute right-2 top-1/2 -translate-y-1/2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded-full bg-ink/15 flex items-center justify-center font-mono text-[9px] text-ink/50 cursor-default select-none", children: "?" }),
          /* @__PURE__ */ jsx("div", { className: "pointer-events-none invisible group-hover/tip:visible absolute z-20 bottom-full right-0 mb-1.5 w-64 px-3 py-2 rounded-md bg-ink text-cream font-body text-[11px] leading-snug shadow-lg dark:bg-[#1A1A18] dark:text-cream", children: opt.definition })
        ] })
      ] }, opt.name);
    }) }),
    status === "playing" && /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs text-ink/30 tracking-wide mb-5", children: [
      attemptsLeft,
      " ",
      attemptsLeft === 1 ? "guess" : "guesses",
      " ",
      "remaining"
    ] }),
    status === "win" && /* @__PURE__ */ jsxs("div", { className: "bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-green/70 mb-1", children: "Identified" }),
      /* @__PURE__ */ jsx("p", { className: "font-heading text-xl font-light text-green mb-2", children: puzzle.answer }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: puzzle.explanation })
    ] }),
    status === "lose" && /* @__PURE__ */ jsxs("div", { className: "bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-1", children: "Four guesses used" }),
      /* @__PURE__ */ jsx("p", { className: "font-heading text-xl font-light text-ink mb-2", children: puzzle.answer }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: puzzle.explanation })
    ] }),
    status !== "playing" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onNewGame,
        className: "mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150",
        children: "New argument"
      }
    )
  ] });
}
function GameFallacy() {
  const [gameKey, setGameKey] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(() => rand$3(FALLACY));
  function handleNewGame() {
    setCurrentPuzzle(rand$3(FALLACY));
    setGameKey((k) => k + 1);
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Fallacy",
        path: "/games/fallacy",
        description: "Identify the logical fallacy in a philosophical argument. Hints reveal whether your guess shares the right family or class."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/games",
          className: "font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150",
          children: "← Games"
        }
      ),
      /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "/" }),
      /* @__PURE__ */ jsx("span", { className: "font-mono text-xs tracking-widest uppercase text-ink/40", children: "Fallacy" })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 pb-20", children: /* @__PURE__ */ jsx(
      GameBoard$3,
      {
        puzzle: currentPuzzle,
        onNewGame: handleNewGame
      },
      gameKey
    ) })
  ] });
}
const DIALECTIC = [
  {
    context: "Berkeley (1710) → Materialism (18th c.) → Transcendental Idealism (1781)",
    thesis: '"To exist is to be perceived. Material objects have no existence independent of a mind that apprehends them. The so-called external world is a construction of ideas." — Berkeley',
    antitheses: [
      {
        text: "Reality exists independently of any mind. Objects persist whether perceived or not. The claim that matter is ideal confuses the order of knowledge with the order of being.",
        correct: true
      },
      {
        text: "The self alone can be known with certainty. The external world, including other minds, cannot be verified.",
        correct: false,
        explanation: "This describes Solipsism or radical skepticism. It retreats into the self rather than directly opposing idealism with a robust account of external matter."
      },
      {
        text: "Reality is fundamentally numerical and mathematical, accessible only to pure reason.",
        correct: false,
        explanation: "This describes mathematical rationalism, sidestepping the debate over the material vs. ideal nature of perceived objects."
      },
      {
        text: "Reality is will — a blind striving force of which perception is only a representation.",
        correct: false,
        explanation: "Schopenhauer's philosophy came later and does not represent the direct historical counter to Berkeley's idealism."
      }
    ],
    syntheses: [
      {
        text: "Kant's transcendental idealism: the structure of experience is mind-dependent (space, time, the categories), but something — the thing-in-itself — exists independently, even if it cannot be known directly.",
        correct: true
      },
      {
        text: "Hume's bundle theory: the self is just a bundle of perceptions with no underlying substance — neither mental nor material substance truly exists.",
        correct: false,
        explanation: "Hume's skepticism radicalized empiricism rather than resolving the contradiction between idealism and materialism, prompting Kant's synthesis."
      },
      {
        text: "Spinoza's neutral monism: mind and matter are two attributes of a single infinite substance, neither reducible to the other.",
        correct: false,
        explanation: "Spinoza's monism preceded the Berkeley/Materialism debate and asserts a single substance, circumventing the epistemological problem rather than synthesizing it."
      },
      {
        text: "Pragmatism: the mind/matter debate is meaningless unless it produces practical consequences. Truth is what works.",
        correct: false,
        explanation: "Pragmatism sidesteps the metaphysical debate by focusing on practical consequences, dissolving rather than synthesizing the contradiction."
      }
    ]
  },
  {
    context: "Utilitarianism (18th c.) → Kantian Deontology (1785) → Virtue Ethics (20th c.)",
    thesis: '"An action is right if and only if it produces the greatest happiness for the greatest number. Moral worth is determined entirely by consequences." — Bentham/Mill',
    antitheses: [
      {
        text: "Consequences are morally irrelevant. What matters is whether an action conforms to universal duty. An act done for good outcomes but violating a rational principle has no moral worth.",
        correct: true
      },
      {
        text: "Morality is whatever a society collectively agrees upon. There are no universal moral truths, only social conventions.",
        correct: false,
        explanation: "This describes Cultural Relativism. It simply rejects the idea of objective morality altogether, rather than engaging Utilitarianism on whether rules or consequences matter."
      },
      {
        text: "Moral claims are neither true nor false — they express only emotional attitudes. The question of right action is a pseudo-question.",
        correct: false,
        explanation: "This describes Emotivism. Like relativism, it denies that moral claims have truth-value, sidestepping the debate entirely."
      },
      {
        text: "The right action is whatever God commands. Morality is grounded in divine authority, not reason or welfare.",
        correct: false,
        explanation: "This describes Divine Command Theory, which locates morality in authority rather than in rational principles (deontology) or human welfare (utilitarianism)."
      }
    ],
    syntheses: [
      {
        text: "Virtue ethics: neither consequences nor rules are primary. What matters is character — the cultivation of practical wisdom (phronesis) that discerns what is genuinely called for in each situation.",
        correct: true
      },
      {
        text: "Contractualism: an action is wrong if its governing principle could not be justified to others on terms they could not reasonably reject.",
        correct: false,
        explanation: "Contractualism remains a rule-based system (like deontology) rather than moving beyond the rule/consequence binary to focus on character."
      },
      {
        text: "Moral particularism: no general principles apply universally — each situation must be evaluated entirely on its own morally relevant features.",
        correct: false,
        explanation: "Particularism rejects general principles entirely, failing to provide a systematic resolution to the conflict between duty and utility."
      },
      {
        text: "Moral realism: there are objective moral facts, discoverable empirically, that ground both duty and welfare.",
        correct: false,
        explanation: "Moral realism is a metaethical position about the nature of moral facts, not a normative theory that resolves the tension between consequences and duty."
      }
    ]
  },
  {
    context: "Heraclitus (6th c. BCE) → Parmenides (5th c. BCE) → Aristotle's Hylomorphism (4th c. BCE)",
    thesis: '"Everything flows; nothing is fixed. The same river cannot be stepped in twice. Stability is appearance; flux is the underlying reality." — Heraclitus',
    antitheses: [
      {
        text: "Change is impossible. What is, is; what is not, cannot be. Being is one, eternal, motionless. All apparent change is illusion generated by unreliable sense perception.",
        correct: true
      },
      {
        text: "Nothing truly changes because time is circular. All events recur eternally in identical cycles — what appears as change is repetition.",
        correct: false,
        explanation: "This describes the Eternal Return, which accepts change but makes it cyclical, rather than denying change entirely like Parmenides."
      },
      {
        text: "True reality is mathematical. Number and harmonic ratios constitute the stable structure beneath apparent flux.",
        correct: false,
        explanation: "Pythagoreanism seeks stability in numbers but doesn't make the radical logical claim that all change is literally impossible."
      },
      {
        text: "Atoms are the unchanging fundamental units. All apparent transformation is rearrangement, not genuine becoming.",
        correct: false,
        explanation: "Atomism tries to preserve both change and stability, acting more as a synthesis than the radical antithesis of pure stasis."
      }
    ],
    syntheses: [
      {
        text: "Aristotle's hylomorphism: substances persist through change because form imposes stability on matter. Change is real but structured — potentiality actualising toward determinate ends. Neither pure flux nor pure stasis.",
        correct: true
      },
      {
        text: "Plato's theory of Forms: the changing sensible world is mere appearance; the eternal, unchanging Forms are genuine reality.",
        correct: false,
        explanation: "Plato separates reality into two realms (being and becoming) rather than integrating them into a single account of physical change."
      },
      {
        text: "Stoic logos: flux is real, but the rational principle governing it is eternal and unchanging.",
        correct: false,
        explanation: "The Stoic logos focuses on rational order within flux, but does not provide a metaphysical mechanism for how substances persist through change."
      },
      {
        text: "Whitehead's process philosophy: reality consists of events rather than substances. Events perish — genuine becoming without static substance.",
        correct: false,
        explanation: "Whitehead's event-based ontology aligns more closely with Heraclitean flux and abandons substance entirely, rather than synthesizing it with stability."
      }
    ]
  },
  {
    context: "Cartesian Rationalism (17th c.) → Humean Empiricism (18th c.) → Kantian Critical Philosophy (1781)",
    thesis: '"I think, therefore I am. Clear and distinct perception is the mark of truth. The mind contains innate ideas — of God, substance, and extension — that no sensory experience could produce. Knowledge is secured not by the senses, which deceive, but by pure reason operating on its own resources." — Descartes',
    antitheses: [
      {
        text: "The mind at birth is a blank slate. Every idea without exception derives from sensory experience or reflection upon it. There are no innate ideas; what we call necessary connections — even causation itself — are nothing but habits formed by repeated observation. Reason alone cannot advance knowledge a single step.",
        correct: true
      },
      {
        text: "Only my own mind and its contents can be known with certainty. Whether an external world exists is unanswerable. The entire project of knowledge beyond the self is radically uncertain.",
        correct: false,
        explanation: "This is radical skepticism. It doesn't counter Rationalism's claim about how we know things (reason vs. senses), it just denies that we know much at all."
      },
      {
        text: "Reality is fundamentally mathematical. The true language of nature is number, and only mathematical reasoning penetrates to what things actually are.",
        correct: false,
        explanation: "This is highly compatible with early Rationalism (Galileo/Descartes), not its dialectical opposite."
      },
      {
        text: "We do not perceive an external world at all — only ideas in the mind of God. Matter is a fiction; the only substances are minds and their perceptions.",
        correct: false,
        explanation: "This is Berkeleyan Idealism, an extreme form of empiricism that came later, not the foundational empiricist response (Locke/Hume) that directly opposes Rationalism."
      }
    ],
    syntheses: [
      {
        text: "Kant's critical philosophy: the empiricists are right that knowledge requires sensory experience; the rationalists are right that the mind contributes structure to it. Space, time, and the categories (causation, substance) are not given in experience but imposed by the mind as conditions for having experience at all. The result is synthetic a priori knowledge — genuinely informative, yet knowable independently of any particular observation.",
        correct: true
      },
      {
        text: "Hegel's absolute idealism: both the rationalist subject and the empiricist object are abstractions from a single self-developing Absolute whose movement constitutes the whole of history and nature.",
        correct: false,
        explanation: "Hegel's idealism is a later development that historicizes the dialectic rather than serving as the immediate synthesis of early modern rationalism and empiricism."
      },
      {
        text: "Pragmatism: the debate between rationalism and empiricism is meaningless unless it produces a practical difference. Ideas are tools for action; their truth is their usefulness.",
        correct: false,
        explanation: "Pragmatism shifts the focus from epistemological certainty to practical utility, bypassing the foundationalist debate rather than resolving it."
      },
      {
        text: "Logical positivism: only statements verifiable by sensory experience are meaningful. Metaphysical claims of both rationalism and traditional empiricism are neither true nor false but nonsense.",
        correct: false,
        explanation: "Logical positivism radicalizes empiricism and dismisses rationalist metaphysics as meaningless, rather than synthesizing the two traditions."
      }
    ]
  },
  {
    context: "Libertarian Free Will (Antiquity) → Hard Determinism (19th c.) → Compatibilism (20th c.)",
    thesis: '"When I deliberate and choose, I am the uncaused originator of my own action. The will is not determined by prior causes in the way that billiard balls are. This capacity for genuine self-initiation is what makes praise, blame, and moral responsibility intelligible — and distinguishes persons from mechanisms." — Libertarian free will',
    antitheses: [
      {
        text: "Every event — including every act of will — is the necessary result of prior causes operating under physical laws. Given the state of the world one moment before a 'decision,' no other decision was ever possible. Moral responsibility based on the fiction of undetermined choice must be replaced by causal understanding, treatment, and social reform.",
        correct: true
      },
      {
        text: "The self is an illusion constructed after the fact. Neuroscience reveals that the brain initiates action before the subject is conscious of deciding. There is no agent — only the nervous system.",
        correct: false,
        explanation: "This describes neurobiological eliminativism. While deterministic, it focuses on denying consciousness entirely, rather than opposing the metaphysical nature of causality."
      },
      {
        text: "Freedom consists in acting in conformity with divine will. The truly free person is not the one who does as they please, but the one whose will is aligned with reason and God.",
        correct: false,
        explanation: "This changes the definition of freedom to spiritual obedience, rather than engaging with the metaphysical debate about causation."
      },
      {
        text: "Time is non-linear at the quantum scale. Free will is secured by genuine indeterminacy at the sub-atomic level, which propagates upward into brain states and hence into decisions.",
        correct: false,
        explanation: "This is actually an argument for a version of free will (or random chance), not the Hard Determinist antithesis."
      }
    ],
    syntheses: [
      {
        text: "Compatibilism (Hume, Frankfurt, Dennett): freedom and determinism are not in conflict. To act freely is not to be an uncaused cause, but to act from one's own desires and reasons without external compulsion or internal pathology. Moral responsibility requires only that the right kind of causal history connect the agent's character to the action — not that the causal chain be broken.",
        correct: true
      },
      {
        text: "Existentialism (Sartre): we are condemned to be free. Even in a determined world, consciousness constitutes itself as a perpetual negation of what it is — freedom is the inescapable structure of subjectivity, not a metaphysical property of the will.",
        correct: false,
        explanation: "Existentialism asserts radical freedom, functioning more as a defense of libertarian subjectivity than a reconciliation with causal laws."
      },
      {
        text: "Hard incompatibilism: since determinism and genuine agency are irreconcilable, and since determinism is true, we must abandon the reactive attitudes — praise, blame, gratitude, resentment — in favour of a purely forward-looking, consequentialist response to behaviour.",
        correct: false,
        explanation: "Hard incompatibilism accepts the contradiction and concludes that moral responsibility is impossible, rather than resolving the tension."
      },
      {
        text: "Agent causation theory: persons are irreducible causal agents who initiate chains of events by rational deliberation. This preserves libertarian freedom within a naturalistic framework by positing a distinct causal category — agent causation — alongside event causation.",
        correct: false,
        explanation: "Agent causation is a defense of libertarianism that posits a special kind of cause, rather than reconciling ordinary causal determinism with freedom."
      }
    ]
  },
  {
    context: "Ancient Atomism (5th c. BCE) → Aristotelian Teleology (4th c. BCE) → Modern Mechanistic Science (17th c.)",
    thesis: '"Everything is made of indivisible atoms moving through void. There is no purpose in nature, no divine craftsman, no final causes. What we call order — stars, organisms, minds — arises from the mechanical collision and aggregation of particles. All apparent design is chance arrangement." — Democritus/Leucippus',
    antitheses: [
      {
        text: "Nature does nothing without purpose. Every substance has an essence that defines what it is to flourish; every organ exists for a function; every motion tends toward a natural end. The cosmos is intelligible not because it obeys mathematical laws but because it is ordered toward ends. Atomism is blind to this because it cannot explain why things are good.",
        correct: true
      },
      {
        text: "The sensible world is mere appearance. The truly real is the realm of eternal, unchanging mathematical Forms, of which atoms are at best a dim imitation.",
        correct: false,
        explanation: "Platonism completely rejects the physical world as true reality, rather than arguing (like Aristotle) that the physical world is real and fundamentally purposive."
      },
      {
        text: "The ultimate constituents of nature are not material atoms but immaterial monads — substances whose nature is perception and striving, not extension and collision.",
        correct: false,
        explanation: "Leibniz's monadology is a much later (17th c.) rationalist metaphysics, not the immediate historical antithesis to ancient atomism."
      },
      {
        text: "Nature is infinite and divine — identical with God. Every apparent part is an expression of a single infinite substance. Purposiveness is not a property of individual things but of the whole.",
        correct: false,
        explanation: "Spinoza's pantheism denies individual purposes and identifies God with nature, contrasting with Aristotle's focus on individual organisms having intrinsic purposes."
      }
    ],
    syntheses: [
      {
        text: "Modern mechanistic science (Galileo, Descartes, Newton): Aristotelian teleology is abandoned — nature has no intrinsic purposes. But in place of ancient atomism's qualitative speculation, mechanism gains mathematical precision. Forces, masses, and motions are quantified; nature becomes a machine governed by laws expressible in equations. The result is predictive, interventionist mastery of the natural world that neither ancient school imagined.",
        correct: true
      },
      {
        text: "Darwin's natural selection: teleological language — 'organs are for functions' — is retained but reinterpreted. Functions are not intrinsic purposes but the product of selection history. Purpose re-enters biology without any designer.",
        correct: false,
        explanation: "Darwin provided a mechanism for biological adaptation, which addresses specific organic complexity rather than the general physical synthesis of the Scientific Revolution."
      },
      {
        text: "Kantian regulative teleology: we cannot know whether nature has genuine final causes, but we must represent organisms as if purposive in order to understand them. Teleology is a necessary heuristic, not a metaphysical claim.",
        correct: false,
        explanation: "Kant's approach is an epistemological stance on how we must study organisms, not the ontological framework that synthesized atomic mechanism and predictive power."
      },
      {
        text: "Whitehead's process philosophy: both atomism and teleology are partial truths. Reality consists of events that have both a mechanical past-inheritance and a purposive self-creative advance. Organisms and cosmology require both notions.",
        correct: false,
        explanation: "Process philosophy is a 20th-century reaction against mechanistic science, attempting to reintroduce organismic thinking, not the historical synthesis that followed Aristotelianism."
      }
    ]
  },
  {
    context: "Liberal Individualism (17th c.) → Communitarian Critique (1980s) → Rawlsian Justice (1993)",
    thesis: '"Individuals have natural rights — to life, liberty, and estate — prior to and independent of any social arrangement. Society is constituted by the voluntary consent of pre-social individuals to protect these rights. The state has no authority to impose a conception of the good; persons are free to pursue their own ends." — Locke/Nozick',
    antitheses: [
      {
        text: "The unencumbered self of liberal theory is a philosophical fiction. We are always already embedded in communities, traditions, and social practices that constitute our identities and give our ends their meaning. The good cannot be bracketed; a just society must engage with and sustain the shared understandings that make human life meaningful.",
        correct: true
      },
      {
        text: "Private property is the source of inequality and exploitation. Rights to life and liberty cannot be realised without material equality. The state must socialise the means of production to guarantee genuine freedom for all.",
        correct: false,
        explanation: 'This is the Marxist critique. It attacks the economic outcomes of liberalism rather than its philosophical assumption of the "unencumbered self" prior to society.'
      },
      {
        text: "All moral and political distinctions are expressions of power. The concept of individual rights is an ideology that naturalises historically contingent power relations. There are no pre-political rights — only political struggles.",
        correct: false,
        explanation: "This describes post-structuralist critique, which rejects normative political theory altogether rather than offering a communitarian alternative."
      },
      {
        text: "The individual is always less important than the collective. National culture, tradition, and organic community are the proper bases of political life. Abstract individual rights erode the social bonds that make genuine freedom possible.",
        correct: false,
        explanation: "This describes authoritarian collectivisation, which entirely destroys the individual, rather than the communitarian argument that individuals are constituted by their communities."
      }
    ],
    syntheses: [
      {
        text: "Rawlsian justice: the communitarians are right that we must abstract from contingent social advantages to assess justice fairly — but this requires more impartiality, not less. Behind a 'veil of ignorance,' rational persons would choose principles protecting basic liberties for all and arranging inequalities only when they benefit the least advantaged (the Difference Principle). Individual rights are preserved; community concern is built into the structure of just institutions.",
        correct: true
      },
      {
        text: "Habermas's discourse ethics: just norms are those that all affected parties could accept in an ideal rational discourse. Neither individual rights nor community traditions are foundational; legitimacy derives from the procedures of public reasoning.",
        correct: false,
        explanation: "Habermas focuses on procedural rationality and communicative action, which is a different structural response to modernity rather than Rawls' direct synthesis of rights and structural fairness."
      },
      {
        text: "The capabilities approach (Sen/Nussbaum): justice requires securing a threshold of human capabilities for all — not just rights or welfare, but the real freedom to live a dignified life. Communities provide context; the individual remains the ultimate norm.",
        correct: false,
        explanation: "The capabilities approach is a refinement and critique of Rawlsian primary goods, coming after Rawls' initial synthesis."
      },
      {
        text: "Communitarianism wins: Rawls's veil of ignorance is incoherent because a self stripped of all particular attachments has no basis for any choice. Justice can only be worked out from within a shared tradition.",
        correct: false,
        explanation: "This simply asserts the victory of the antithesis, failing to achieve a synthesis that preserves the insights of liberal individualism."
      }
    ]
  }
];
function rand$2(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle$5(arr) {
  const b = [...arr];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
function OptionButton$1({ text, explanation, result, onClick, disabled }) {
  let className = "w-full text-left px-4 py-3 rounded-lg border font-body text-sm leading-relaxed transition-all duration-150 ";
  if (result === "correct") {
    className += "bg-green/15 dark:bg-green/20 border-green/50 text-ink cursor-default";
  } else if (result === "wrong") {
    className += "bg-terracotta/10 dark:bg-terracotta/20 border-terracotta/40 text-ink cursor-default";
  } else if (result === "reveal") {
    className += "bg-green/5 dark:bg-green/10 border-green/30 text-ink/80 cursor-default italic";
  } else if (disabled) {
    className += "border-ink/20 text-ink/40 cursor-default";
  } else {
    className += "border-ink/30 text-ink hover:border-gold hover:bg-cream-dark cursor-pointer";
  }
  return /* @__PURE__ */ jsxs("button", { onClick, disabled, className, children: [
    result === "correct" && /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-green tracking-widest uppercase block mb-1", children: "Correct ✓" }),
    result === "wrong" && /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-terracotta tracking-widest uppercase block mb-1", children: "Incorrect ✗" }),
    result === "reveal" && /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-green/60 tracking-widest uppercase block mb-1", children: "Correct Answer" }),
    /* @__PURE__ */ jsx("div", { children: text }),
    result === "wrong" && explanation && /* @__PURE__ */ jsx("div", { className: "mt-2 pt-2 border-t border-terracotta/20 text-ink/80 text-sm", children: explanation })
  ] });
}
function GameBoard$2({ puzzle, onNewGame }) {
  const [antitheses] = useState(() => shuffle$5(puzzle.antitheses));
  const [syntheses] = useState(() => shuffle$5(puzzle.syntheses));
  const [aAttempts, setAAttempts] = useState([]);
  const [sAttempts, setSAttempts] = useState([]);
  const aCorrectIdx = antitheses.findIndex((a) => a.correct);
  const aSuccess = aAttempts.includes(aCorrectIdx);
  const aFailed = !aSuccess && aAttempts.length >= 2;
  const stage = aSuccess || aFailed ? 2 : 1;
  const sCorrectIdx = syntheses.findIndex((s) => s.correct);
  const sSuccess = sAttempts.includes(sCorrectIdx);
  const sFailed = !sSuccess && sAttempts.length >= 2;
  const status = sSuccess ? "win" : sFailed ? "lose" : "playing";
  function pickAntithesis(idx) {
    if (stage !== 1 || aAttempts.includes(idx)) return;
    setAAttempts((prev) => [...prev, idx]);
  }
  function pickSynthesis(idx) {
    if (stage !== 2 || status !== "playing" || sAttempts.includes(idx)) return;
    setSAttempts((prev) => [...prev, idx]);
  }
  function getAntithesisResult(idx) {
    if (aAttempts.includes(idx)) {
      return idx === aCorrectIdx ? "correct" : "wrong";
    }
    if (aFailed && idx === aCorrectIdx) {
      return "reveal";
    }
    return null;
  }
  function getSynthesisResult(idx) {
    if (sAttempts.includes(idx)) {
      return idx === sCorrectIdx ? "correct" : "wrong";
    }
    if (sFailed && idx === sCorrectIdx) {
      return "reveal";
    }
    return null;
  }
  const contextParts = puzzle.context.split(" → ").map((part) => {
    const match = part.match(/^(.*?)\s*(\(.*\))$/);
    return match ? { name: match[1], date: match[2] } : { name: part, date: null };
  });
  return /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center flex-wrap gap-1.5 mb-5 font-mono text-xs tracking-wide", children: contextParts.map((part, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxs(
        "span",
        {
          className: i === 0 ? "text-gold" : i === 1 ? stage >= 1 ? "text-ink/60" : "text-ink/25" : stage >= 2 ? "text-ink/60" : "text-ink/25",
          children: [
            part.name,
            part.date && /* @__PURE__ */ jsx("span", { className: "opacity-50 ml-1 font-normal tracking-normal", children: part.date })
          ]
        }
      ),
      i < contextParts.length - 1 && /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "→" })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-terracotta/50 pl-4 mb-6", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-terracotta/60 tracking-widest uppercase mb-2", children: "Thesis" }),
      /* @__PURE__ */ jsx(
        "p",
        {
          className: "font-heading font-light text-ink italic leading-relaxed",
          style: { fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)" },
          children: puzzle.thesis
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
      /* @__PURE__ */ jsxs(
        "p",
        {
          className: `font-mono text-xs tracking-widest uppercase mb-3 ${stage >= 1 ? "text-ink" : "text-ink/40"}`,
          children: [
            /* @__PURE__ */ jsx("span", { className: "text-gold/70 mr-2", children: "01" }),
            stage === 1 ? "Select the antithesis" : "Antithesis"
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: antitheses.map((a, i) => /* @__PURE__ */ jsx(
        OptionButton$1,
        {
          text: a.text,
          explanation: a.explanation,
          result: getAntithesisResult(i),
          onClick: () => pickAntithesis(i),
          disabled: stage !== 1
        },
        i
      )) })
    ] }),
    stage === 2 && /* @__PURE__ */ jsxs("div", { className: "mb-6 animate-slide-up", children: [
      /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs tracking-widest uppercase mb-3 text-ink", children: [
        /* @__PURE__ */ jsx("span", { className: "text-gold/70 mr-2", children: "02" }),
        status === "playing" ? "Select the synthesis" : "Synthesis"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: syntheses.map((s, i) => /* @__PURE__ */ jsx(
        OptionButton$1,
        {
          text: s.text,
          explanation: s.explanation,
          result: getSynthesisResult(i),
          onClick: () => pickSynthesis(i),
          disabled: status !== "playing"
        },
        i
      )) })
    ] }),
    status === "win" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-green/10 border border-green/30 rounded-lg px-5 py-4 animate-pop-in",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-green/70 mb-1", children: "Complete" }),
          /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: [
            "You traced the dialectical movement correctly:",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-ink", children: puzzle.context }),
            "."
          ] })
        ]
      }
    ),
    status === "lose" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 animate-pop-in",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-2", children: "Attempts exhausted" }),
          /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: [
            "The correct synthesis is highlighted above. The full movement:",
            " ",
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-ink", children: puzzle.context }),
            "."
          ] })
        ]
      }
    ),
    status !== "playing" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onNewGame,
        className: "mt-5 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150",
        children: "New dialectic"
      }
    )
  ] });
}
function GameDialectic() {
  const [gameKey, setGameKey] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(() => rand$2(DIALECTIC));
  function handleNewGame() {
    setCurrentPuzzle(rand$2(DIALECTIC));
    setGameKey((k) => k + 1);
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Dialectics",
        path: "/games/dialectics",
        description: "Match a philosophical thesis to its historical antithesis, then identify the synthesis that resolved the contradiction."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/games",
              className: "font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150",
              children: "← Games"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "/" })
        ] }),
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "font-heading font-light text-green uppercase tracking-wide",
            style: { fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" },
            children: "Dialectics"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gold/40 mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/60 leading-relaxed", children: "A philosophical thesis is presented. First, identify the position that historically opposed it — the antithesis. Then select the synthesis that preserved and resolved the contradiction. Two stages, two attempts each." })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 pb-20", children: /* @__PURE__ */ jsx(
      GameBoard$2,
      {
        puzzle: currentPuzzle,
        onNewGame: handleNewGame
      },
      gameKey
    ) })
  ] });
}
const NEGATIVE_DIALECTIC = [
  {
    context: "High Art → Folk Traditions → Mass Culture",
    thesis: "High Art: Complex, challenging, and boundary-pushing, but structurally elitist and largely inaccessible to the working masses.",
    antithesisOptions: [
      { text: "Folk Culture: Accessible, communal, and created by the people, but highly localized and lacking formal sophistication.", correct: true },
      { text: "Academic Censorship: A top-down ban on all artistic expression to enforce strict rationalism.", correct: false },
      { text: "Scientific Positivism: The belief that art should be replaced entirely by empirical science.", correct: false },
      { text: "Aristocratic Patronage: The complete privatization of art by wealthy individuals.", correct: false }
    ],
    falseSynthesis: "The advent of mass media and the Culture Industry has democratized art. By blending the sophistication of high culture with the mass accessibility of folk traditions, the system provides universal entertainment. The contradiction between the elite and the masses is resolved: culture is now freely available to all, satisfying the individual's need for leisure while harmoniously integrating them into modern society.",
    residualOptions: [
      {
        text: "The eradication of genuine spontaneity. The individual is not harmonized, but standardized; even acts of rebellion are pre-packaged commodities, leaving total conformity disguised as free choice.",
        correct: true
      },
      {
        text: "The masses are successfully elevated to the intellectual level of the former aristocracy, creating a unified society of philosopher-citizens.",
        correct: false,
        explanation: "This takes the system's idealistic promise at face value. The Culture Industry does not aim to educate or elevate; its economic function is to pacify and distract."
      },
      {
        text: "High art retreats entirely into isolated academic institutions, abandoning the public sphere to pure, unmediated chaos.",
        correct: false,
        explanation: "High art does not successfully escape. The Culture Industry absorbs high art too—turning avant-garde works into luxury commodities and classical music into background noise for commercials."
      },
      {
        text: "A complete, violent reversion to local folk traditions by the masses in direct protest of technological reproduction.",
        correct: false,
        explanation: 'Genuine folk culture is largely eradicated by the Culture Industry, replaced instead by manufactured nostalgia and packaged "authenticity."'
      }
    ]
  },
  {
    context: "Private Individuality → Public Community → The Networked Profile",
    thesis: "Private Individuality: The deeply human desire to cultivate a unique, subjective inner life and personal autonomy.",
    antithesisOptions: [
      { text: "Public Community: The fundamental human need for social belonging, external recognition, and integration into the collective.", correct: true },
      { text: "State Surveillance: The government's need to monitor all private correspondence.", correct: false },
      { text: "Religious Asceticism: The rejection of all social ties in favor of isolated monasticism.", correct: false },
      { text: "Corporate Monopoly: The consolidation of all physical marketplaces into a single entity.", correct: false }
    ],
    falseSynthesis: "The digital social profile perfectly resolves the ancient tension between private identity and public community. Through frictionless self-expression online, the individual becomes perfectly visible and connected to the universal network. We are now globally united in a digital town square, while remaining entirely, uniquely ourselves.",
    residualOptions: [
      {
        text: 'The qualitative, incalculable depths of human experience. The supposedly "unique" individual is flattened into predictable, monetizable data points, while genuine connection is replaced by fragmented echo chambers.',
        correct: true
      },
      {
        text: "The complete dissolution of the physical world, as individuals upload their consciousness entirely into virtual reality environments.",
        correct: false,
        explanation: 'This is a sci-fi exaggeration. The "residual" is the physical, material reality of our bodies and labor in the present that the digital world relies upon but ignores.'
      },
      {
        text: "A utopian global consensus where cultural misunderstandings are permanently eradicated by algorithmic translation.",
        correct: false,
        explanation: "This repeats the false promise of the Synthesis. In reality, algorithms optimize for engagement, which actively rewards and amplifies misunderstanding and outrage."
      },
      {
        text: "The state seizes total control of all personal data, resulting in a conscious, top-down Orwellian dictatorship.",
        correct: false,
        explanation: "While surveillance exists, the primary mode of domination here is soft and decentralized. The system controls behavior through convenience, peer pressure, and market logic."
      }
    ]
  },
  {
    context: 'Individual Freedom → Social Equality → The "End of History"',
    thesis: "Individual Freedom: The drive for personal liberty, free enterprise, and the right to accumulate private property without restriction.",
    antithesisOptions: [
      { text: "Social Equality: The demand for collective welfare, the eradication of class privilege, and the equitable distribution of resources.", correct: true },
      { text: "Feudal Hierarchy: A rigid caste system based on divine right and inherited land.", correct: false },
      { text: "Anarcho-Primitivism: The desire to dismantle all complex societal structures and return to hunter-gatherer lifestyles.", correct: false },
      { text: "Technocratic Rule: The belief that society should be governed solely by engineers and scientists.", correct: false }
    ],
    falseSynthesis: "Liberal democratic capitalism represents the final ideological evolution of humanity. It synthesizes the contradiction perfectly: free markets guarantee individual liberty and generate unprecedented wealth, while democratic institutions and human rights frameworks ensure that this prosperity eventually lifts all citizens, creating a just, equal, and post-historical global society.",
    residualOptions: [
      {
        text: "Systemic inequality and ecological limits. The synthesis masks the fact that its prosperity relies on outsourced exploitation and treats the planet as an infinite resource, leaving a massive, destructive remainder.",
        correct: true
      },
      {
        text: "A perfectly frictionless global market where all nation-states willingly dissolve themselves into a single world government.",
        correct: false,
        explanation: "This ignores the persistence of nationalism and state violence, which are often utilized to secure the very markets this synthesis relies upon."
      },
      {
        text: "Everyone becomes a perfectly rational economic actor, permanently eradicating all irrational human desires and conflicts.",
        correct: false,
        explanation: "This is the utopian assumption of neoclassical economics, ignoring the irrational, emotional, and cultural realities that drive human behavior."
      },
      {
        text: "Complete technological automation instantly frees all humans from labor, allowing everyone to live as aristocrats.",
        correct: false,
        explanation: "This ignores how automation under this synthesis often leads to precarious gig labor and wealth concentration rather than universal leisure."
      }
    ]
  }
];
function rand$1(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function shuffle$4(arr) {
  const b = [...arr];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
function OptionButton({ text, result, pending, onClick, disabled }) {
  let className = "w-full text-left px-4 py-3 rounded-lg border font-body text-sm leading-relaxed transition-all duration-150 ";
  if (result === "correct") {
    className += "bg-green/10 border-green/40 text-ink cursor-default";
  } else if (result === "wrong") {
    className += "bg-terracotta/8 border-terracotta/20 text-terracotta/70 cursor-default";
  } else if (result === "reveal") {
    className += "bg-green/8 border-green/25 text-ink/60 cursor-default italic";
  } else if (pending) {
    className += "border-gold/60 bg-cream-dark text-ink cursor-pointer ring-1 ring-gold/30";
  } else if (disabled) {
    className += "border-gold/15 text-ink/30 cursor-default";
  } else {
    className += "border-gold/25 text-ink/70 hover:border-gold/50 hover:bg-cream-dark hover:text-ink cursor-pointer";
  }
  return /* @__PURE__ */ jsxs("button", { onClick, disabled, className, children: [
    result === "correct" && /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-green tracking-widest uppercase block mb-1", children: "Correct ✓" }),
    result === "wrong" && /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-terracotta tracking-widest uppercase block mb-1", children: "Incorrect ✗" }),
    result === "reveal" && /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-green/60 tracking-widest uppercase block mb-1", children: "This was the answer" }),
    text
  ] });
}
function GameBoard$1({ puzzle, onNewGame }) {
  var _a, _b;
  const [antitheses] = useState(() => shuffle$4(puzzle.antithesisOptions));
  const [residuals] = useState(() => shuffle$4(puzzle.residualOptions));
  const [stage, setStage] = useState(1);
  const [aAttempts, setAAttempts] = useState(0);
  const [aResult, setAResult] = useState(null);
  const [rAttempts, setRAttempts] = useState(0);
  const [rResult, setRResult] = useState(null);
  const [status, setStatus] = useState("playing");
  function pickAntithesis(idx) {
    if (stage !== 1 || (aResult == null ? void 0 : aResult.correct) || (aResult == null ? void 0 : aResult.revealIdx) !== void 0)
      return;
    const correct = antitheses[idx].correct;
    const newAttempts = aAttempts + 1;
    setAAttempts(newAttempts);
    if (correct) {
      setAResult({ idx, correct: true });
      setStage(2);
    } else if (newAttempts >= 2) {
      const revealIdx = antitheses.findIndex((a) => a.correct);
      setAResult({ idx, correct: false, revealIdx });
      setStage(2);
    } else {
      setAResult({ idx, correct: false });
    }
  }
  function pickResidual(idx) {
    if (stage !== 2 || status !== "playing") return;
    const correct = residuals[idx].correct;
    const newAttempts = rAttempts + 1;
    setRAttempts(newAttempts);
    setRResult({ idx, correct });
    if (correct) setStatus("win");
    else if (newAttempts >= 2) setStatus("lose");
  }
  function getAntithesisResult(idx) {
    if (!aResult) return null;
    if (aResult.correct && aResult.idx === idx) return "correct";
    if (!aResult.correct) {
      if (aResult.idx === idx) return "wrong";
      if (aResult.revealIdx === idx) return "reveal";
    }
    return null;
  }
  function getResidualResult(idx) {
    if (!rResult) return null;
    const correct = residuals[idx].correct;
    if (rResult.idx === idx) return rResult.correct ? "correct" : "wrong";
    if (status !== "playing" && correct) return "reveal";
    return null;
  }
  const contextParts = puzzle.context.split(" → ").map((part) => part.trim());
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center flex-wrap gap-1.5 mb-10 font-mono text-xs tracking-wide", children: contextParts.map((part, i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsx(
        "span",
        {
          className: i === 0 ? "text-gold" : i === 1 ? stage >= 1 ? "text-ink/80" : "text-ink/40" : stage >= 2 ? "text-ink/80" : "text-ink/40",
          children: part
        }
      ),
      i < contextParts.length - 1 && /* @__PURE__ */ jsx("span", { className: "text-gold/40", children: "→" })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-8 md:gap-12 relative z-10", children: [
      /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsxs("div", { className: "border-l-4 border-terracotta/50 pl-4 h-full", children: [
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs text-terracotta/60 tracking-widest uppercase mb-3", children: "Thesis" }),
        /* @__PURE__ */ jsx(
          "p",
          {
            className: "font-heading font-light text-ink italic leading-relaxed",
            style: { fontSize: "clamp(1.05rem, 1.5vw, 1.15rem)" },
            children: puzzle.thesis
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: `font-mono text-xs tracking-widest uppercase mb-3 ${stage >= 1 ? "text-ink" : "text-ink/40"}`,
            children: [
              /* @__PURE__ */ jsx("span", { className: "text-gold/70 mr-2", children: "01" }),
              stage === 1 ? "Select the antithesis" : "Antithesis"
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: antitheses.map((a, i) => /* @__PURE__ */ jsx(
          OptionButton,
          {
            text: a.text,
            result: getAntithesisResult(i),
            pending: false,
            onClick: () => pickAntithesis(i),
            disabled: stage !== 1 || (aResult == null ? void 0 : aResult.correct) || (aResult == null ? void 0 : aResult.revealIdx) !== void 0
          },
          i
        )) }),
        aResult && !aResult.correct && stage === 1 && /* @__PURE__ */ jsx("p", { className: "font-body text-xs text-terracotta/80 mt-2 animate-slide-up text-right", children: "Not quite — one more attempt." })
      ] })
    ] }),
    stage === 2 && /* @__PURE__ */ jsxs("div", { className: "animate-slide-up relative mt-10 md:mt-16", children: [
      /* @__PURE__ */ jsx("div", { className: "hidden md:block absolute -top-16 left-0 right-0 h-16 pointer-events-none z-0 opacity-60", children: /* @__PURE__ */ jsxs(
        "svg",
        {
          className: "w-full h-full",
          preserveAspectRatio: "none",
          viewBox: "0 0 100 100",
          children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M 25 0 C 25 60, 50 60, 50 90",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1",
                className: "text-gold/60"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                d: "M 75 0 C 75 60, 50 60, 50 90",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1",
                className: "text-gold/60"
              }
            ),
            /* @__PURE__ */ jsx(
              "polygon",
              {
                points: "50,96 46,86 54,86",
                fill: "currentColor",
                className: "text-gold/60"
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center relative z-10 mb-12", children: /* @__PURE__ */ jsxs("div", { className: "bg-cream-dark border border-gold/25 p-6 md:p-8 rounded-xl max-w-3xl text-center shadow-md relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-terracotta/60" }),
        /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-terracotta/90 mb-4", children: "The False Synthesis" }),
        /* @__PURE__ */ jsxs(
          "p",
          {
            className: "font-heading font-light text-ink leading-relaxed",
            style: { fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)" },
            children: [
              '"',
              puzzle.falseSynthesis,
              '"'
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs tracking-widest uppercase mb-4 text-ink text-center", children: [
          /* @__PURE__ */ jsx("span", { className: "text-gold/70 mr-2", children: "02" }),
          status === "playing" ? "Predict the Residual" : "The Residual"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-center font-body text-sm text-ink/60 mb-6 italic", children: "What reality did this synthesis repress or fail to capture?" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: residuals.map((r, i) => /* @__PURE__ */ jsx(
          OptionButton,
          {
            text: r.text,
            result: getResidualResult(i),
            pending: false,
            onClick: () => pickResidual(i),
            disabled: status !== "playing"
          },
          i
        )) }),
        rResult && !rResult.correct && status === "playing" && /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 animate-slide-up", children: [
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm font-semibold text-terracotta/90 mb-1", children: "Not quite — one more attempt." }),
          ((_a = residuals[rResult.idx]) == null ? void 0 : _a.explanation) && /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-terracotta/80 leading-relaxed", children: residuals[rResult.idx].explanation })
        ] })
      ] })
    ] }),
    status === "win" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mt-8 bg-green/10 border border-green/30 rounded-lg px-6 py-5 animate-pop-in max-w-2xl mx-auto text-center",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-green/80 mb-2", children: "Critique Successful" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/75 leading-relaxed", children: "You successfully identified the non-identical remainder. The false synthesis has been dismantled." })
        ]
      }
    ),
    status === "lose" && /* @__PURE__ */ jsxs(
      "div",
      {
        className: "mt-8 bg-terracotta/8 border border-terracotta/25 rounded-lg px-6 py-5 animate-pop-in max-w-2xl mx-auto text-center",
        role: "status",
        "aria-live": "polite",
        children: [
          /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-terracotta/80 mb-3", children: "Attempts Exhausted" }),
          rResult && !rResult.correct && ((_b = residuals[rResult.idx]) == null ? void 0 : _b.explanation) && /* @__PURE__ */ jsx("div", { className: "mb-4 pb-4 border-b border-terracotta/15 text-left", children: /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-terracotta/80 leading-relaxed", children: residuals[rResult.idx].explanation }) }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/75 leading-relaxed", children: "The correct residual is highlighted above. Critical theory demands we always look for what the system excludes." })
        ]
      }
    ),
    status !== "playing" && /* @__PURE__ */ jsx("div", { className: "flex justify-center mt-8", children: /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onNewGame,
        className: "px-6 py-3 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/80 hover:border-gold hover:text-ink transition-colors duration-150 shadow-sm",
        children: "Critique another Synthesis"
      }
    ) })
  ] });
}
function GameNegativeDialectic() {
  const [gameKey, setGameKey] = useState(0);
  const [currentPuzzle, setCurrentPuzzle] = useState(() => rand$1(NEGATIVE_DIALECTIC));
  function handleNewGame() {
    setCurrentPuzzle(rand$1(NEGATIVE_DIALECTIC));
    setGameKey((k) => k + 1);
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Negative Dialectics — Philosophy Games",
        path: "/games/negative-dialectics",
        description: "Dismantle a false historical synthesis by predicting its residual—the marginalized reality it represses or fails to capture."
      }
    ),
    /* @__PURE__ */ jsx("section", { className: "max-w-4xl mx-auto px-6 py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: "/games",
              className: "font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150",
              children: "← Games"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "/" })
        ] }),
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "font-heading font-light text-green uppercase tracking-wide",
            style: { fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" },
            children: "Negative Dialectics"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gold/40 mb-4" }),
        /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/60 leading-relaxed", children: [
          "Instead of finding harmony, your goal is to identify what the system represses. First, establish the historical contradiction. Then, when presented with the false synthesis that claimed to resolve it, find the ",
          /* @__PURE__ */ jsx("i", { children: "residual" }),
          "—the non-identical remainder left behind."
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "max-w-5xl mx-auto px-6 pb-24", children: /* @__PURE__ */ jsx(
      GameBoard$1,
      {
        puzzle: currentPuzzle,
        onNewGame: handleNewGame
      },
      gameKey
    ) })
  ] });
}
const N = 34;
const patches = Array.from({ length: N }, (_, i) => ({ id: i, t: i / (N - 1) }));
const PRESET_COLOURS = [
  { name: "red", rgb: [220, 38, 38] },
  { name: "orange", rgb: [249, 115, 22] },
  { name: "amber", rgb: [245, 158, 11] },
  { name: "yellow", rgb: [234, 179, 8] },
  { name: "lime", rgb: [132, 204, 22] },
  { name: "green", rgb: [34, 197, 94] },
  { name: "teal", rgb: [20, 184, 166] },
  { name: "blue", rgb: [59, 130, 246] },
  { name: "violet", rgb: [139, 92, 246] },
  { name: "purple", rgb: [168, 85, 247] },
  { name: "pink", rgb: [236, 72, 153] },
  { name: "brown", rgb: [161, 72, 27] }
];
function lerpRGB(a, b, t) {
  return `rgb(${Math.round(a[0] + t * (b[0] - a[0]))},${Math.round(a[1] + t * (b[1] - a[1]))},${Math.round(a[2] + t * (b[2] - a[2]))})`;
}
function shuffle$3(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const BG = "var(--sor-bg, #F8F4EC)";
const INK = "var(--sor-ink, #1A1A18)";
const MONO = "'IBM Plex Mono', 'Courier New', monospace";
function Swatch({ color, size = 16 }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      style: {
        display: "inline-block",
        width: size,
        height: size,
        background: color,
        verticalAlign: "middle",
        margin: "0 3px",
        flexShrink: 0
      }
    }
  );
}
function SoritesBoard({ onNewGame }) {
  const [phase, setPhase] = useState("setup");
  const [setupStep, setSetupStep] = useState("fav");
  const [favColour, setFavColour] = useState(null);
  const [leastColour, setLeastColour] = useState(null);
  const [order] = useState(() => [
    0,
    N - 1,
    ...shuffle$3(Array.from({ length: N - 2 }, (_, i) => i + 1))
  ]);
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  function toRGB(t) {
    if (!favColour || !leastColour) return "var(--sor-subtle, #ccc)";
    return lerpRGB(favColour.rgb, leastColour.rgb, t);
  }
  function classify(v) {
    const id = order[step];
    const newAns = { ...ans, [id]: v };
    setAns(newAns);
    if (step + 1 >= N) setPhase("reveal");
    else setStep((s) => s + 1);
  }
  function stripBar() {
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          display: "flex",
          width: "100%",
          height: 18,
          marginBottom: 40
        },
        children: patches.map((p) => /* @__PURE__ */ jsx(
          "div",
          {
            style: { flex: 1, background: toRGB(p.t) }
          },
          p.id
        ))
      }
    );
  }
  if (phase === "setup") {
    const pickerColours = setupStep === "fav" ? PRESET_COLOURS : PRESET_COLOURS.filter((c) => c.name !== (favColour == null ? void 0 : favColour.name));
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          fontFamily: MONO,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0 80px"
        },
        children: [
          /* @__PURE__ */ jsx("style", { children: `
          .sor-swatch { border: none; padding: 0; cursor: pointer; background: transparent; text-align: center; }
          .sor-swatch-inner { width: 100%; aspect-ratio: 1; transition: transform 0.12s, outline 0.12s; outline: 2px solid transparent; outline-offset: 2px; }
          .sor-swatch:hover .sor-swatch-inner { transform: scale(1.06); outline-color: ${INK}; }
          .sor-swatch-label { font-family: ${MONO}; font-size: 9px; color: #888; letter-spacing: 0.12em; text-transform: uppercase; display: block; margin-top: 5px; }
        ` }),
          /* @__PURE__ */ jsxs("div", { style: { maxWidth: 520, width: "100%" }, children: [
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "var(--sor-muted, #999)",
                  textTransform: "uppercase",
                  margin: "0 0 14px"
                },
                children: [
                  "Setup ·",
                  " ",
                  setupStep === "fav" ? "Step 1 of 2" : "Step 2 of 2"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "h2",
              {
                style: {
                  fontSize: 34,
                  fontWeight: 600,
                  color: INK,
                  margin: "0 0 10px",
                  lineHeight: 1.15,
                  fontFamily: MONO
                },
                children: setupStep === "fav" ? "Choose your favourite colour." : "Choose your least favourite."
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 12,
                  color: "var(--sor-muted, #888)",
                  lineHeight: 1.8,
                  margin: "0 0 36px"
                },
                children: setupStep === "fav" ? 'The gradient will run from this colour. You will be asked: "Is this [your colour]?"' : "The gradient will end here — at the colour you find least appealing."
              }
            ),
            setupStep === "least" && favColour && /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 28
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        width: 20,
                        height: 20,
                        background: `rgb(${favColour.rgb.join(",")})`,
                        flexShrink: 0
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      style: {
                        fontSize: 10,
                        color: "var(--sor-muted, #aaa)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase"
                      },
                      children: [
                        "favourite: ",
                        favColour.name
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 12,
                  marginBottom: 20
                },
                children: pickerColours.map((colour) => /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "sor-swatch",
                    onClick: () => {
                      if (setupStep === "fav") {
                        setFavColour(colour);
                        setSetupStep("least");
                      } else {
                        setLeastColour(colour);
                        setPhase("intro");
                      }
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "sor-swatch-inner",
                          style: {
                            background: `rgb(${colour.rgb.join(",")})`
                          }
                        }
                      ),
                      /* @__PURE__ */ jsx("span", { className: "sor-swatch-label", children: colour.name })
                    ]
                  },
                  colour.name
                ))
              }
            )
          ] })
        ]
      }
    );
  }
  if (phase === "intro")
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          fontFamily: MONO,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0 80px"
        },
        children: [
          /* @__PURE__ */ jsx("style", { children: `
          .sor-start-btn { background:${INK}; color:${BG}; border:none; padding:14px 40px; font-family:${MONO}; font-size:12px; letter-spacing:0.18em; text-transform:uppercase; cursor:pointer; transition:opacity .15s; }
          .sor-start-btn:hover { opacity:0.75; }
        ` }),
          /* @__PURE__ */ jsxs("div", { style: { maxWidth: 520, width: "100%" }, children: [
            stripBar(),
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "var(--sor-muted, #999)",
                  textTransform: "uppercase",
                  margin: "0 0 14px"
                },
                children: "Experiment · The Sorites Paradox"
              }
            ),
            /* @__PURE__ */ jsxs(
              "h2",
              {
                style: {
                  fontSize: 40,
                  fontWeight: 600,
                  color: INK,
                  margin: "0 0 28px",
                  lineHeight: 1.1,
                  fontFamily: MONO
                },
                children: [
                  "Where does",
                  /* @__PURE__ */ jsx("br", {}),
                  favColour.name,
                  " end?"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  fontSize: 13,
                  color: "var(--sor-muted-dark, #555)",
                  lineHeight: 1.85,
                  margin: "0 0 12px"
                },
                children: [
                  "You will be shown ",
                  N,
                  " colour patches running from",
                  " ",
                  /* @__PURE__ */ jsx("span", { style: { color: toRGB(0), fontWeight: 600 }, children: favColour.name }),
                  " ",
                  "to",
                  " ",
                  /* @__PURE__ */ jsx("span", { style: { color: toRGB(1), fontWeight: 600 }, children: leastColour.name }),
                  ", one at a time. For each, answer a single question:"
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  fontSize: 16,
                  color: INK,
                  fontWeight: 500,
                  margin: "0 0 28px",
                  letterSpacing: "0.02em"
                },
                children: [
                  "Is this",
                  " ",
                  /* @__PURE__ */ jsx("span", { style: { color: toRGB(0) }, children: favColour.name }),
                  "?"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 12,
                  color: "var(--sor-muted, #888)",
                  lineHeight: 1.8,
                  margin: "0 0 44px"
                },
                children: "No trick. Answer honestly. You will be shown your own contradictions at the end."
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "sor-start-btn",
                onClick: () => setPhase("classify"),
                children: "Begin"
              }
            )
          ] })
        ]
      }
    );
  if (phase === "classify") {
    const p = patches[order[step]];
    const pct = Math.round(step / N * 100);
    const isAnchor = step < 2;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          fontFamily: MONO,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0 80px"
        },
        children: [
          /* @__PURE__ */ jsx("style", { children: `
          .sor-cls-btn { flex:1; padding:18px 0; font-family:${MONO}; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; border:1.5px solid; transition:all .12s; background:transparent; }
          .sor-yes-b { border-color:${INK}; color:${INK}; }
          .sor-yes-b:hover { background:${INK}; color:${BG}; }
          .sor-no-b { border-color:#bbb; color:#999; }
          .sor-no-b:hover { background:#bbb; color:${BG}; border-color:#bbb; }
        ` }),
          /* @__PURE__ */ jsxs("div", { style: { maxWidth: 480, width: "100%" }, children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 52
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        flex: 1,
                        height: 1,
                        background: "var(--sor-border, #ddd)",
                        position: "relative"
                      },
                      children: /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            height: 1,
                            background: INK,
                            width: `${pct}%`,
                            transition: "width 0.2s"
                          }
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      style: {
                        fontSize: 10,
                        color: "var(--sor-muted, #aaa)",
                        whiteSpace: "nowrap"
                      },
                      children: [
                        step + 1,
                        " / ",
                        N
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: "100%",
                  aspectRatio: "4/3",
                  background: toRGB(p.t),
                  marginBottom: 44,
                  transition: "background 0.35s ease"
                }
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  fontSize: 22,
                  textAlign: "center",
                  color: INK,
                  margin: "0 0 32px",
                  fontWeight: 500
                },
                children: [
                  "Is this",
                  " ",
                  /* @__PURE__ */ jsx("span", { style: { color: toRGB(0) }, children: favColour.name }),
                  "?"
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10 }, children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "sor-cls-btn sor-yes-b",
                  onClick: () => classify(true),
                  children: "Yes"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "sor-cls-btn sor-no-b",
                  onClick: () => classify(false),
                  children: "No"
                }
              )
            ] }),
            isAnchor && /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 10,
                  color: "var(--sor-subtle, #ccc)",
                  textAlign: "center",
                  marginTop: 20,
                  letterSpacing: "0.1em"
                },
                children: lerpRGB(favColour.rgb, leastColour.rgb, p.t)
              }
            )
          ] })
        ]
      }
    );
  }
  if (phase === "reveal") {
    const favName = favColour.name;
    const sorted = [...patches].sort((a, b) => a.t - b.t);
    const lastFavIdx = sorted.reduce(
      (best, p, i) => ans[p.id] === true ? i : best,
      -1
    );
    const firstNotFavIdx = sorted.findIndex((p) => ans[p.id] === false);
    const hasInversion = lastFavIdx >= 0 && firstNotFavIdx >= 0 && lastFavIdx > firstNotFavIdx;
    const cleanBoundary = lastFavIdx >= 0 && firstNotFavIdx >= 0 && !hasInversion;
    const favCount = Object.values(ans).filter(Boolean).length;
    const favPatch = lastFavIdx >= 0 ? sorted[lastFavIdx] : null;
    const notFavPatch = firstNotFavIdx >= 0 ? sorted[firstNotFavIdx] : null;
    if (favCount === N || favCount === 0) {
      const escapedRGB = favCount === N ? favColour.rgb : leastColour.rgb;
      const monoCSS = `rgb(${escapedRGB.join(",")})`;
      return /* @__PURE__ */ jsxs("div", { style: { fontFamily: MONO, padding: "0 0 80px" }, children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              display: "flex",
              width: "100%",
              height: 22,
              marginBottom: 56
            },
            children: patches.map((p) => /* @__PURE__ */ jsx(
              "div",
              {
                style: { flex: 1, background: monoCSS }
              },
              p.id
            ))
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              maxWidth: 560,
              margin: "0 auto",
              textAlign: "center"
            },
            children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    fontSize: 9,
                    letterSpacing: "0.3em",
                    color: monoCSS,
                    textTransform: "uppercase",
                    margin: "0 0 20px"
                  },
                  children: "Easter Egg · Heap Escaper"
                }
              ),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  style: {
                    fontSize: 52,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: monoCSS,
                    margin: "0 0 8px",
                    lineHeight: 1
                  },
                  children: "PARADOX"
                }
              ),
              /* @__PURE__ */ jsx(
                "h2",
                {
                  style: {
                    fontSize: 52,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    color: INK,
                    margin: "0 0 40px",
                    lineHeight: 1
                  },
                  children: "ESCAPED"
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    fontSize: 12,
                    color: "var(--sor-muted-dark, #666)",
                    lineHeight: 1.85,
                    margin: "0 0 36px",
                    maxWidth: 440,
                    marginLeft: "auto",
                    marginRight: "auto"
                  },
                  children: favCount === N ? `You called all ${N} patches ${favName} — absorbing ${leastColour.name} into your favourite colour. The sorites paradox cannot arise if the predicate swallows the entire spectrum.` : `You called nothing ${favName} — not even the pure ${favName} at position 1. The paradox dissolves when the predicate has no extension at all.`
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    borderLeft: "3px solid",
                    borderColor: monoCSS,
                    paddingLeft: 20,
                    textAlign: "left",
                    margin: "0 auto 48px",
                    maxWidth: 440
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          fontSize: 14,
                          fontStyle: "italic",
                          color: INK,
                          lineHeight: 1.8,
                          margin: "0 0 8px"
                        },
                        children: '"Everything is vague to a degree you do not realise till you have tried to make it precise."'
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          fontSize: 10,
                          letterSpacing: "0.15em",
                          color: "var(--sor-muted, #999)",
                          textTransform: "uppercase",
                          margin: 0
                        },
                        children: "Bertrand Russell"
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: onNewGame,
                  style: {
                    padding: "12px 28px",
                    border: `1px solid`,
                    borderColor: monoCSS,
                    background: "transparent",
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    color: monoCSS,
                    transition: "all .15s"
                  },
                  onMouseEnter: (e) => {
                    e.currentTarget.style.background = monoCSS;
                    e.currentTarget.style.color = BG;
                  },
                  onMouseLeave: (e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = monoCSS;
                  },
                  children: "Try again"
                }
              )
            ]
          }
        )
      ] });
    }
    return /* @__PURE__ */ jsx("div", { style: { fontFamily: MONO, padding: "0 0 80px" }, children: /* @__PURE__ */ jsxs("div", { style: { maxWidth: 600, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx(
        "p",
        {
          style: {
            fontSize: 10,
            letterSpacing: "0.22em",
            color: "var(--sor-muted, #999)",
            textTransform: "uppercase",
            margin: "0 0 10px"
          },
          children: "Analysis"
        }
      ),
      /* @__PURE__ */ jsx(
        "output",
        {
          style: {
            display: "block",
            fontSize: 28,
            fontWeight: 600,
            color: INK,
            margin: "0 0 40px",
            fontFamily: MONO
          },
          "aria-live": "polite",
          children: "Your classifications"
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", marginBottom: 6 }, children: sorted.map((p) => /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          },
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: "100%",
                  height: 36,
                  background: toRGB(p.t)
                }
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  width: "100%",
                  height: 6,
                  background: ans[p.id] === true ? INK : ans[p.id] === false ? "var(--sor-border-light, #e0ddd6)" : "var(--sor-subtle, #ccc)"
                }
              }
            )
          ]
        },
        p.id
      )) }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 48
          },
          children: [
            /* @__PURE__ */ jsxs("span", { style: { fontSize: 10, color: "var(--sor-muted, #999)" }, children: [
              "▲ ",
              favName,
              " (",
              favCount,
              ")"
            ] }),
            /* @__PURE__ */ jsxs("span", { style: { fontSize: 10, color: "var(--sor-subtle-dark, #bbb)" }, children: [
              "▲ not ",
              favName,
              " (",
              N - favCount,
              ")"
            ] })
          ]
        }
      ),
      hasInversion && notFavPatch && favPatch && /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            background: "#b50000",
            color: "#fff",
            padding: "22px 28px",
            marginBottom: 32
          },
          children: [
            /* @__PURE__ */ jsx(
              "strong",
              {
                style: {
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: 10
                },
                children: "Direct contradiction"
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  margin: 0,
                  fontSize: 13,
                  lineHeight: 1.85
                },
                children: [
                  "You called ",
                  /* @__PURE__ */ jsx(Swatch, { color: toRGB(notFavPatch.t) }),
                  " NOT",
                  " ",
                  favName,
                  ", but also called",
                  " ",
                  /* @__PURE__ */ jsx(Swatch, { color: toRGB(favPatch.t) }),
                  " ",
                  favName,
                  " — even though the second patch is",
                  " ",
                  /* @__PURE__ */ jsxs("em", { children: [
                    "further from ",
                    favName
                  ] }),
                  " in the gradient."
                ]
              }
            )
          ]
        }
      ),
      cleanBoundary && favPatch && notFavPatch && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: INK,
              color: BG,
              padding: "22px 28px",
              marginBottom: 32
            },
            children: [
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    margin: "0 0 14px",
                    fontSize: 13,
                    lineHeight: 1.85
                  },
                  children: "You drew a line."
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 16,
                    marginBottom: 14,
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          width: 40,
                          height: 40,
                          background: toRGB(favPatch.t),
                          flexShrink: 0
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { style: { fontSize: 12 }, children: [
                      "position ",
                      lastFavIdx + 1,
                      "/",
                      N,
                      " →",
                      " ",
                      /* @__PURE__ */ jsx("strong", { style: { color: toRGB(0) }, children: favName.toUpperCase() })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    display: "flex",
                    gap: 16,
                    marginBottom: 14,
                    alignItems: "center"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          width: 40,
                          height: 40,
                          background: toRGB(notFavPatch.t),
                          flexShrink: 0
                        }
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { style: { fontSize: 12 }, children: [
                      "position ",
                      firstNotFavIdx + 1,
                      "/",
                      N,
                      " →",
                      " ",
                      /* @__PURE__ */ jsxs("strong", { style: { color: "var(--sor-muted, #888)" }, children: [
                        "NOT ",
                        favName.toUpperCase()
                      ] })
                    ] })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "p",
                {
                  style: {
                    margin: 0,
                    fontSize: 12,
                    color: "var(--sor-muted, #aaa)"
                  },
                  children: [
                    "Gap: ",
                    firstNotFavIdx - lastFavIdx,
                    " step",
                    firstNotFavIdx - lastFavIdx !== 1 ? "s" : "",
                    " ",
                    "in the gradient  · ",
                    " ",
                    ((notFavPatch.t - favPatch.t) / 1 * 100).toFixed(1),
                    "% of total span"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "h3",
          {
            style: {
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--sor-muted, #999)",
              margin: "0 0 14px",
              fontFamily: MONO
            },
            children: "The tolerance chain"
          }
        ),
        /* @__PURE__ */ jsxs(
          "p",
          {
            style: {
              fontSize: 12,
              color: "var(--sor-muted-dark, #666)",
              lineHeight: 1.9,
              margin: "0 0 20px"
            },
            children: [
              /* @__PURE__ */ jsx("strong", { style: { color: INK }, children: "P1:" }),
              " ",
              /* @__PURE__ */ jsx(Swatch, { color: toRGB(0), size: 12 }),
              " ",
              favName,
              " (position 1) is ",
              favName,
              ". ",
              /* @__PURE__ */ jsx("em", { children: "(You agreed — step 1.)" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("strong", { style: { color: INK }, children: "P2:" }),
              " If S is ",
              favName,
              ", and S′ is one step further in the gradient,",
              /* @__PURE__ */ jsx("br", {}),
              "      then S′ is also ",
              favName,
              ".",
              " ",
              /* @__PURE__ */ jsxs("em", { children: [
                "(Each of the ",
                N - 1,
                " steps is perceptibly negligible.)"
              ] }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("strong", { style: { color: INK }, children: "C:" }),
              " By ",
              firstNotFavIdx,
              " applications of P2: ",
              /* @__PURE__ */ jsx(Swatch, { color: toRGB(notFavPatch.t), size: 12 }),
              " ",
              "position ",
              firstNotFavIdx + 1,
              " is ",
              favName,
              "."
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              marginBottom: 32
            },
            children: sorted.slice(0, firstNotFavIdx + 1).map((p) => /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      style: {
                        width: 22,
                        height: 22,
                        background: toRGB(p.t),
                        outline: ans[p.id] === false ? "2px solid #b50000" : "none",
                        outlineOffset: 1
                      }
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      style: {
                        fontSize: 7,
                        color: ans[p.id] === false ? "#b50000" : "var(--sor-subtle, #ccc)",
                        marginTop: 2
                      },
                      children: ans[p.id] === false ? "✗" : "·"
                    }
                  )
                ]
              },
              p.id
            ))
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              background: "#b50000",
              color: "#fff",
              padding: "22px 28px",
              marginBottom: 48
            },
            children: [
              /* @__PURE__ */ jsx(
                "strong",
                {
                  style: {
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: 10
                  },
                  children: "Contradiction"
                }
              ),
              /* @__PURE__ */ jsxs(
                "p",
                {
                  style: {
                    margin: 0,
                    fontSize: 13,
                    lineHeight: 1.85
                  },
                  children: [
                    "The tolerance chain forces position",
                    " ",
                    firstNotFavIdx + 1,
                    " to be ",
                    favName,
                    ". You said it is not. Your first answer, combined with the negligibility premise, makes your later answer logically impossible."
                  ]
                }
              )
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "h3",
        {
          style: {
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--sor-muted, #999)",
            margin: "0 0 20px",
            fontFamily: MONO
          },
          children: "Four exits from the paradox"
        }
      ),
      [
        [
          "Epistemicism",
          "https://en.wikipedia.org/wiki/Epistemicism",
          `A sharp boundary exists; we simply cannot know where it is. Vagueness is epistemic, not metaphysical. Your line is correct — you just drew it somewhere arbitrary. (Williamson 1994)`
        ],
        [
          "Fuzzy logic",
          "https://en.wikipedia.org/wiki/Fuzzy_logic",
          `'${favName}' admits of degrees: the borderline patch is 0.5 ${favName}. No contradiction arises at a non-classical truth value. The binary yes/no forced by this game is the culprit, not the predicate.`
        ],
        [
          "Reject tolerance",
          "https://en.wikipedia.org/wiki/Sorites_paradox#Responses",
          `Premise 2 is false. Imperceptible differences can be decisive — they accumulate. '${favName}' has a sharp extension even if individual differences are sub-threshold.`
        ],
        [
          "Supervaluationism",
          "https://en.wikipedia.org/wiki/Supervaluationism",
          `Statements about borderline cases are neither true nor false. 'Patch 17 is ${favName}' has no truth value, so the inductive step fails to go through. Classical logic still holds for clear cases.`
        ]
      ].map(([name, url, desc]) => /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            borderLeft: "2px solid #ddd",
            paddingLeft: 18,
            marginBottom: 22
          },
          children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: url,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  fontSize: 13,
                  color: INK,
                  display: "block",
                  marginBottom: 5,
                  textDecoration: "none",
                  fontWeight: 600
                },
                onMouseEnter: (e) => {
                  e.currentTarget.style.textDecoration = "underline";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.textDecoration = "none";
                },
                children: [
                  name,
                  " ↗"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 12,
                  color: "var(--sor-muted-dark, #666)",
                  margin: 0,
                  lineHeight: 1.8
                },
                children: desc
              }
            )
          ]
        },
        name
      )),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: onNewGame,
          style: {
            marginTop: 40,
            padding: "12px 28px",
            border: "1px solid #ccc",
            background: "transparent",
            fontFamily: MONO,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            color: "var(--sor-muted-dark, #666)",
            transition: "all .15s"
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.borderColor = INK;
            e.currentTarget.style.color = INK;
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.borderColor = "var(--sor-subtle, #ccc)";
            e.currentTarget.style.color = "var(--sor-muted-dark, #666)";
          },
          children: "Try again"
        }
      )
    ] }) });
  }
  return null;
}
function GameSorites() {
  const [gameKey, setGameKey] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load dark:bg-[#0E1A14] min-h-screen", children: [
    /* @__PURE__ */ jsx("style", { children: `
                .sorites-wrapper {
                    --sor-bg: #F8F4EC;
                    --sor-ink: #1A1A18;
                    --sor-muted: #888888;
                    --sor-muted-dark: #555555;
                    --sor-subtle: #cccccc;
                    --sor-subtle-dark: #bbbbbb;
                    --sor-border: #dddddd;
                    --sor-border-light: #e0ddd6;
                }
                .dark .sorites-wrapper {
                    --sor-bg: #0E1A14;
                    --sor-ink: #DDD8CD;
                    --sor-muted: #999999;
                    --sor-muted-dark: #aaaaaa;
                    --sor-subtle: #444444;
                    --sor-subtle-dark: #555555;
                    --sor-border: #333333;
                    --sor-border-light: #222222;
                }
            ` }),
    /* @__PURE__ */ jsxs("div", { className: "sorites-wrapper", children: [
      /* @__PURE__ */ jsx(
        SEO,
        {
          title: "Sorites",
          path: "/games/sorites",
          description: "Pick two colours, then classify 34 patches between them. Discover the Sorites paradox — the contradiction hiding in your own judgements about vagueness."
        }
      ),
      /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 py-10", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "/games",
                className: "font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150",
                children: "← Games"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "/" })
          ] }),
          /* @__PURE__ */ jsx(
            "h1",
            {
              className: "font-heading font-light text-green uppercase tracking-wide",
              style: { fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)" },
              children: "Sorites"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "md:w-1/2", children: [
          /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gold/40 mb-4" }),
          /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/60 leading-relaxed", children: "The Sorites paradox asks: if removing one grain from a heap still leaves a heap, how can a heap ever become a non-heap? This experiment runs the same logic through your own colour preferences — and exposes the contradiction in your own judgements about vagueness and borderline cases." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 pb-20", children: /* @__PURE__ */ jsx(
        SoritesBoard,
        {
          onNewGame: () => setGameKey((k) => k + 1)
        },
        gameKey
      ) })
    ] })
  ] });
}
function World({ n, w, groups, label, selected, pending, onSelect, disabled }) {
  const data = groups || [{ n, w }];
  const totalN = data.reduce((sum, g) => sum + g.n, 0);
  const totalW = data.reduce((sum, g) => sum + g.n * g.w, 0);
  const avgW = totalW / totalN;
  const barCount = Math.min(totalN, 20);
  const barWidth = Math.max(3, Math.floor(160 / barCount));
  let bars = [];
  if (groups) {
    data.forEach((g) => {
      const count = Math.round(g.n / totalN * barCount);
      for (let i = 0; i < count; i++) {
        bars.push(g.w);
      }
    });
    while (bars.length < barCount) bars.push(data[data.length - 1].w);
    bars = bars.slice(0, barCount);
  } else {
    bars = Array(barCount).fill(w);
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onClick: disabled ? void 0 : onSelect,
      style: {
        flex: 1,
        background: selected ? "#0d2b1e" : pending ? "#0a1a0e" : "#0a0f0d",
        border: `1.5px solid ${selected ? "#00e87a" : pending ? "#c9a44c" : "#1a2e1f"}`,
        padding: "20px 18px",
        cursor: disabled ? "default" : "pointer",
        transition: "all .18s",
        position: "relative"
      },
      children: [
        /* @__PURE__ */ jsx(
          "p",
          {
            style: {
              margin: "0 0 6px",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: selected ? "#00e87a" : pending ? "#c9a44c" : "#6aaa74",
              fontFamily: "'Space Mono', monospace"
            },
            children: label
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              fontSize: 11,
              color: selected ? "#7effa8" : pending ? "#c9d49c" : "#7aaa80",
              fontFamily: "'Space Mono', monospace",
              marginBottom: 14,
              lineHeight: 1.7
            },
            children: [
              /* @__PURE__ */ jsxs("span", { children: [
                totalN <= 32 ? "×" + totalN : "×" + totalN.toLocaleString(),
                " people"
              ] }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("span", { children: [
                groups ? "avg " : "",
                "welfare: ",
                avgW % 1 === 0 ? avgW : avgW.toFixed(1)
              ] }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs(
                "span",
                {
                  style: {
                    color: selected ? "#3eff8a" : pending ? "#b89c3c" : "#5aaa64"
                  },
                  children: [
                    "total: ",
                    totalW % 1 === 0 ? totalW : totalW.toFixed(0)
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "flex-end",
              gap: 2,
              height: 80,
              marginBottom: 8,
              overflow: "hidden"
            },
            children: [
              bars.map((barW, i) => /* @__PURE__ */ jsx(
                "div",
                {
                  style: {
                    width: barWidth,
                    height: Math.max(2, Math.round(barW / 100 * 76)),
                    background: selected ? "#00e87a" : pending ? "#c9a44c" : "#2d6a34",
                    transition: "height .3s",
                    flexShrink: 0
                  }
                },
                i
              )),
              totalN > 20 && /* @__PURE__ */ jsxs(
                "span",
                {
                  style: {
                    fontSize: 9,
                    color: "#5aaa64",
                    alignSelf: "center",
                    marginLeft: 4,
                    fontFamily: "'Space Mono', monospace"
                  },
                  children: [
                    "+",
                    totalN > 1e3 ? (totalN - 20).toLocaleString() : totalN - 20,
                    " more"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              height: 1,
              background: selected ? "#00e87a" : pending ? "#c9a44c" : "#1a2e1f"
            }
          }
        ),
        (selected || pending) && /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              position: "absolute",
              top: 10,
              right: 12,
              fontSize: 14,
              color: selected ? "#00e87a" : "#c9a44c"
            },
            children: selected ? "✓" : "◉"
          }
        )
      ]
    }
  );
}
const STEPS = [
  {
    aLabel: "World A",
    bLabel: "World A+",
    a: { n: 10, w: 100 },
    b: { groups: [{ n: 10, w: 105 }, { n: 10, w: 45 }] },
    prompt: "World A+ is World A, plus 10 additional people whose lives are worth living, plus a welfare boost for the original people. Is A+ at least as good as A?",
    bArgument: "More happy lives exist. Nobody is worse off. Total welfare is higher.",
    aArgument: "Average welfare falls. The original people deserve to keep their quality of life."
  },
  {
    aLabel: "World A+",
    bLabel: "World B",
    a: { groups: [{ n: 10, w: 105 }, { n: 10, w: 45 }] },
    b: { n: 20, w: 75 },
    prompt: "World B has the same 20 people and the same total welfare as A+, but distributed more equally. Is B at least as good as A+?",
    bArgument: "Equality is better. Same total welfare, same population, more fair.",
    aArgument: "(These are identical in population and welfare — equality is the only difference.)",
    tricky: true
  },
  {
    aLabel: "World B",
    bLabel: "World B+",
    a: { n: 20, w: 75 },
    b: { groups: [{ n: 20, w: 80 }, { n: 20, w: 32 }] },
    prompt: "World B+ adds 20 more people whose lives are worth living, plus a welfare boost for the original 20. Is B+ at least as good as B?",
    bArgument: "Again: more happy lives, nobody worse off, total utility rises.",
    aArgument: "Average welfare fell from 75 to 56. Adding lower-welfare lives drags down the mean."
  },
  {
    aLabel: "World B+",
    bLabel: "World C",
    a: { groups: [{ n: 20, w: 80 }, { n: 20, w: 32 }] },
    b: { n: 40, w: 56 },
    prompt: "World C equalises welfare across all 40 people. Is C at least as good as B+?",
    bArgument: "Same reasoning: equality is an improvement.",
    aArgument: "(Same population and total welfare — only equality changes.)",
    tricky: true
  },
  {
    aLabel: "World C",
    bLabel: "World C+",
    a: { n: 40, w: 56 },
    b: { groups: [{ n: 40, w: 60 }, { n: 40, w: 24 }] },
    prompt: "World C+ adds 40 more people, plus a welfare boost for the original 40. Is C+ at least as good as C?",
    bArgument: "More people with lives worth living. Nobody worse off. Total utility rises again.",
    aArgument: "Average welfare now 42. Quantity is replacing quality."
  },
  {
    aLabel: "World C+",
    bLabel: "World D",
    a: { groups: [{ n: 40, w: 60 }, { n: 40, w: 24 }] },
    b: { n: 80, w: 42 },
    prompt: "World D equalises welfare again across 80 people. Is D at least as good as C+?",
    bArgument: "Equality is better. Same total welfare, same population.",
    aArgument: "",
    tricky: true
  },
  {
    aLabel: "World D",
    bLabel: "World D+",
    a: { n: 80, w: 42 },
    b: { groups: [{ n: 80, w: 45 }, { n: 80, w: 17 }] },
    prompt: "World D+ adds 80 more people, plus a welfare boost for the original 80. Is D+ at least as good as D?",
    bArgument: "Every life added has positive welfare. More is better.",
    aArgument: "Welfare 31 is a grim existence: perpetual mild suffering, few joys."
  },
  {
    aLabel: "World D+",
    bLabel: "World E",
    a: { groups: [{ n: 80, w: 45 }, { n: 80, w: 17 }] },
    b: { n: 160, w: 31 },
    prompt: "World E equalises. Is E at least as good as D+?",
    bArgument: "Equality is better, as before.",
    aArgument: "",
    tricky: true
  },
  {
    aLabel: "World E",
    bLabel: "World Z",
    a: { n: 160, w: 31 },
    b: { n: 16e5, w: 1 },
    prompt: "World Z contains 10,000× more people, each at welfare 1. Their lives are barely worth living — just above the threshold of a life not worth having. Is Z at least as good as E?",
    bArgument: "Each life has positive welfare. By the logic applied at every prior step, total utility is what matters.",
    aArgument: "These lives are miserable by any ordinary standard. 'Barely worth living' is not what we owe future people.",
    final: true
  }
];
function GameRepugnant() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Space+Grotesk:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState([]);
  const [pendingChoice, setPendingChoice] = useState(null);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("intro");
  const current = STEPS[step];
  function choose(chooseB) {
    setChoices((c) => [...c, chooseB]);
    setSelected(chooseB);
    setPendingChoice(null);
  }
  function advance() {
    if (step + 1 >= STEPS.length) {
      setPhase("conclusion");
    } else {
      setStep((s) => s + 1);
      setSelected(null);
      setPendingChoice(null);
    }
  }
  const BG2 = "#040a06";
  const SANS = "'Space Grotesk', sans-serif";
  const MONO2 = "'Space Mono', monospace";
  const GREEN = "#00e87a";
  if (phase === "intro")
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          minHeight: "100vh",
          background: BG2,
          color: "#c8e6d0",
          fontFamily: SANS,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px"
        },
        children: [
          /* @__PURE__ */ jsx("style", { children: `
        .start-rp { background:${GREEN}; color:#040a06; border:none; padding:14px 44px; font-family:${MONO2}; font-size:13px; font-weight:700; letter-spacing:0.12em; cursor:pointer; transition:opacity .15s; }
        .start-rp:hover { opacity:0.85; }
      ` }),
          /* @__PURE__ */ jsxs("div", { style: { maxWidth: 500, width: "100%" }, children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  display: "flex",
                  gap: 1,
                  marginBottom: 48,
                  height: 4
                },
                children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      flex: 1,
                      background: `rgba(0,232,122,${0.1 + i * 0.045})`
                    }
                  },
                  i
                ))
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "#2a5c30",
                  textTransform: "uppercase",
                  margin: "0 0 12px",
                  fontFamily: MONO2
                },
                children: "Population Ethics · Parfit 1984"
              }
            ),
            /* @__PURE__ */ jsxs(
              "h1",
              {
                style: {
                  fontSize: 42,
                  fontWeight: 700,
                  color: "#c8e6d0",
                  margin: "0 0 28px",
                  lineHeight: 1.1
                },
                children: [
                  "The Repugnant",
                  /* @__PURE__ */ jsx("br", {}),
                  "Conclusion"
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 14,
                  color: "#5a8c64",
                  lineHeight: 1.85,
                  margin: "0 0 16px"
                },
                children: "You will make a series of comparisons between possible worlds. Each comparison will seem reasonable. Follow your own reasoning to its conclusion."
              }
            ),
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  fontSize: 14,
                  color: "#5a8c64",
                  lineHeight: 1.85,
                  margin: "0 0 44px"
                },
                children: [
                  "This experiment has ",
                  STEPS.length,
                  " steps."
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "start-rp",
                onClick: () => setPhase("game"),
                children: "Begin"
              }
            )
          ] })
        ]
      }
    );
  if (phase === "game")
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          minHeight: "100vh",
          background: BG2,
          color: "#c8e6d0",
          fontFamily: SANS,
          padding: "40px 20px 80px"
        },
        children: [
          /* @__PURE__ */ jsx("style", { children: `
        .next-rp { background:${GREEN}; color:#040a06; border:none; padding:12px 32px; font-family:${MONO2}; font-size:12px; font-weight:700; letter-spacing:0.12em; cursor:pointer; transition:opacity .15s; }
        .next-rp:hover { opacity:0.85; }
        @keyframes rpFadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .rp-reveal { animation: rpFadeUp 0.3s ease both; }
      ` }),
          /* @__PURE__ */ jsxs("div", { style: { maxWidth: 600, margin: "0 auto" }, children: [
            /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 4, marginBottom: 44 }, children: STEPS.map((_, i) => /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  flex: 1,
                  height: 3,
                  background: i < step ? GREEN : i === step ? "#1d4a24" : "#0d1f10"
                }
              },
              i
            )) }),
            /* @__PURE__ */ jsxs(
              "p",
              {
                style: {
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "#5a8c64",
                  textTransform: "uppercase",
                  margin: "0 0 8px",
                  fontFamily: MONO2
                },
                children: [
                  "Step ",
                  step + 1,
                  " of ",
                  STEPS.length
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "h2",
              {
                style: {
                  fontSize: 22,
                  fontWeight: 600,
                  color: "#c8e6d0",
                  margin: "0 0 8px"
                },
                children: [
                  current.aLabel,
                  " vs ",
                  current.bLabel
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 13,
                  color: "#8aaa94",
                  lineHeight: 1.85,
                  margin: "0 0 28px"
                },
                children: current.prompt
              }
            ),
            /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10, marginBottom: 20 }, children: [
              /* @__PURE__ */ jsx(
                World,
                {
                  n: current.a.n,
                  w: current.a.w,
                  groups: current.a.groups,
                  label: current.aLabel,
                  selected: selected === false,
                  pending: selected === null && pendingChoice === false,
                  onSelect: () => {
                    if (selected === null) setPendingChoice(false);
                  },
                  disabled: selected !== null
                }
              ),
              /* @__PURE__ */ jsx(
                World,
                {
                  n: current.b.n,
                  w: current.b.w,
                  groups: current.b.groups,
                  label: current.bLabel,
                  selected: selected === true,
                  pending: selected === null && pendingChoice === true,
                  onSelect: () => {
                    if (selected === null) setPendingChoice(true);
                  },
                  disabled: selected !== null
                }
              )
            ] }),
            selected === null && pendingChoice === null && /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 11,
                  color: "#5a8c64",
                  fontFamily: MONO2,
                  textAlign: "center"
                },
                children: "Click a world to select it, then submit."
              }
            ),
            selected === null && pendingChoice !== null && /* @__PURE__ */ jsx("div", { style: { textAlign: "center", marginBottom: 20 }, children: /* @__PURE__ */ jsx(
              "button",
              {
                className: "next-rp",
                onClick: () => choose(pendingChoice),
                children: "Submit choice →"
              }
            ) }),
            selected !== null && /* @__PURE__ */ jsxs("div", { className: "rp-reveal", style: { marginBottom: 24 }, children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    background: "#0a1f0e",
                    border: "1px solid #1a3c1f",
                    padding: "16px 20px",
                    marginBottom: 16
                  },
                  children: [
                    /* @__PURE__ */ jsxs(
                      "p",
                      {
                        style: {
                          margin: "0 0 8px",
                          fontSize: 10,
                          color: "#3a7a44",
                          fontFamily: MONO2,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase"
                        },
                        children: [
                          "Reasoning for",
                          " ",
                          selected ? current.bLabel : current.aLabel
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          margin: 0,
                          fontSize: 13,
                          color: "#8ab893",
                          lineHeight: 1.8
                        },
                        children: selected ? current.bArgument : current.aArgument || "You resisted the addition of lower-welfare lives."
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx("button", { className: "next-rp", onClick: advance, children: step + 1 < STEPS.length ? "Next comparison →" : "See conclusion →" })
            ] }),
            choices.length > 0 && /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  marginTop: 32,
                  padding: "14px 18px",
                  background: "#060e08",
                  border: "1px solid #0d1f10"
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        margin: "0 0 8px",
                        fontSize: 10,
                        color: "#5a8c64",
                        fontFamily: MONO2,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase"
                      },
                      children: "Your chain so far"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        margin: 0,
                        fontSize: 11,
                        color: "#6aaa74",
                        fontFamily: MONO2,
                        lineHeight: 2
                      },
                      children: STEPS.slice(0, choices.length).map((s, i) => /* @__PURE__ */ jsxs(
                        "span",
                        {
                          style: {
                            color: choices[i] ? "#4a9a5a" : "#7a3a3a"
                          },
                          children: [
                            choices[i] ? `${s.bLabel} ≥ ${s.aLabel}` : `${s.aLabel} > ${s.bLabel}`,
                            i < choices.length - 1 ? " · " : ""
                          ]
                        },
                        i
                      ))
                    }
                  )
                ]
              }
            )
          ] })
        ]
      }
    );
  if (phase === "conclusion") {
    let getWorldStats = function(world) {
      if (world.groups) {
        const n = world.groups.reduce((acc, g) => acc + g.n, 0);
        const w = world.groups.reduce((acc, g) => acc + g.n * g.w, 0) / n;
        return { n, w };
      }
      return { n: world.n, w: world.w };
    };
    const chainToZ = choices.every(Boolean);
    const firstRefusal = choices.findIndex((c) => !c);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          minHeight: "100vh",
          background: BG2,
          color: "#c8e6d0",
          fontFamily: SANS,
          padding: "60px 20px 80px"
        },
        children: [
          /* @__PURE__ */ jsx("style", { children: `
          .reset-rp { background:transparent; color:#3a6a44; border:1px solid #1a3c1f; padding:10px 24px; font-family:${MONO2}; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; cursor:pointer; transition:all .15s; }
          .reset-rp:hover { background:#1a3c1f; color:${GREEN}; }
        ` }),
          /* @__PURE__ */ jsxs("div", { style: { maxWidth: 580, margin: "0 auto" }, children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                style: {
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  color: "#2a5c30",
                  textTransform: "uppercase",
                  margin: "0 0 10px",
                  fontFamily: MONO2
                },
                children: "Conclusion"
              }
            ),
            /* @__PURE__ */ jsx(
              "h2",
              {
                style: {
                  fontSize: 34,
                  fontWeight: 700,
                  color: "#c8e6d0",
                  margin: "0 0 32px",
                  lineHeight: 1.2
                },
                role: "status",
                "aria-live": "polite",
                children: chainToZ ? "You have endorsed the Repugnant Conclusion." : "You resisted — but at a cost."
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  background: "#060e08",
                  border: "1px solid #0d2010",
                  padding: "20px 22px",
                  marginBottom: 28
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        margin: "0 0 12px",
                        fontSize: 10,
                        color: "#2a4c2f",
                        fontFamily: MONO2,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase"
                      },
                      children: "Your complete chain of endorsements"
                    }
                  ),
                  STEPS.map((s, i) => {
                    const bStats = getWorldStats(s.b);
                    const aStats = getWorldStats(s.a);
                    return /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 8
                        },
                        children: [
                          /* @__PURE__ */ jsx(
                            "div",
                            {
                              style: {
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                background: choices[i] ? GREEN : "#7a3a3a",
                                flexShrink: 0
                              }
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              style: {
                                fontSize: 11,
                                fontFamily: MONO2,
                                color: choices[i] ? "#4a9a5a" : "#7a4a4a",
                                lineHeight: 1.7
                              },
                              children: choices[i] ? `${s.bLabel} ≥ ${s.aLabel}  ·  ${bStats.n > 1e3 ? bStats.n.toLocaleString() : bStats.n} people @ avg ${bStats.w % 1 === 0 ? bStats.w : bStats.w.toFixed(1)}` : `STOPPED: preferred ${s.aLabel}  ·  ${aStats.n > 1e3 ? aStats.n.toLocaleString() : aStats.n} people @ avg ${aStats.w % 1 === 0 ? aStats.w : aStats.w.toFixed(1)}`
                            }
                          )
                        ]
                      },
                      i
                    );
                  })
                ]
              }
            ),
            chainToZ ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs(
                "div",
                {
                  style: {
                    background: "#0a1f0e",
                    border: `1.5px solid ${GREEN}`,
                    padding: "22px 24px",
                    marginBottom: 28
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          margin: "0 0 12px",
                          fontSize: 14,
                          color: "#c8e6d0",
                          fontWeight: 600
                        },
                        children: 'By transitivity of "at least as good as":'
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "p",
                      {
                        style: {
                          margin: "0 0 12px",
                          fontSize: 16,
                          color: GREEN,
                          fontFamily: MONO2,
                          fontWeight: 700
                        },
                        children: "World Z ≥ World A"
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "p",
                      {
                        style: {
                          margin: 0,
                          fontSize: 13,
                          color: "#8ab893",
                          lineHeight: 1.85
                        },
                        children: [
                          "World A: 10 people at welfare 100 (flourishing).",
                          /* @__PURE__ */ jsx("br", {}),
                          "World Z: 1,600,000 people at welfare 1 (barely worth living).",
                          /* @__PURE__ */ jsx("br", {}),
                          /* @__PURE__ */ jsx("br", {}),
                          "Your chain of endorsements — each individually reasonable — implies the vast, miserable Z is at least as good as the small, flourishing A. This is Parfit's",
                          " ",
                          /* @__PURE__ */ jsx("strong", { style: { color: "#c8e6d0" }, children: "Repugnant Conclusion" }),
                          "."
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsx(
                "p",
                {
                  style: {
                    fontSize: 13,
                    color: "#5a8c64",
                    lineHeight: 1.85,
                    margin: "0 0 14px"
                  },
                  children: "The conclusion follows from two widely-shared intuitions: (1) adding happy lives to the world makes it better, and (2) equal welfare distributions are at least as good as unequal ones with the same total. Together, via transitivity, they force Z ≥ A."
                }
              )
            ] }) : /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  background: "#0a1f0e",
                  border: "1.5px solid #3a7a44",
                  padding: "22px 24px",
                  marginBottom: 28
                },
                children: [
                  /* @__PURE__ */ jsxs(
                    "p",
                    {
                      style: {
                        margin: "0 0 10px",
                        fontSize: 13,
                        color: "#c8e6d0",
                        fontWeight: 600
                      },
                      children: [
                        "You broke the chain at step ",
                        firstRefusal + 1,
                        "."
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "p",
                    {
                      style: {
                        margin: 0,
                        fontSize: 13,
                        color: "#8ab893",
                        lineHeight: 1.85
                      },
                      children: [
                        "You refused to endorse",
                        " ",
                        STEPS[firstRefusal].bLabel,
                        " over",
                        " ",
                        STEPS[firstRefusal].aLabel,
                        ". This blocks the Repugnant Conclusion — but it requires accepting that adding lives with positive welfare does not always improve the world. You must explain",
                        " ",
                        /* @__PURE__ */ jsx("em", { children: "why" }),
                        " the addition is bad despite each new life being worth living."
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "h3",
              {
                style: {
                  fontSize: 11,
                  fontFamily: MONO2,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#2a5c30",
                  margin: "0 0 20px"
                },
                children: "Proposed exits"
              }
            ),
            [
              [
                "Reject Total Utilitarianism",
                "Accept that 'better' is not simply 'higher total welfare'. Average utilitarianism or critical level utilitarianism can block the conclusion — but face their own counterexamples."
              ],
              [
                "Reject transitivity of 'better than'",
                "Larry Temkin argues the relation 'better than' need not be transitive across populations. If so, the chain doesn't close. But rejecting transitivity is a drastic revision to logic."
              ],
              [
                "Person-affecting view",
                "A world is better only if it is better for someone. Adding new people can't make things better because there is no prior person for whom things improve. The Repugnant Conclusion is blocked — but so is the obligation to have any children at all."
              ],
              [
                "Accept it",
                "Parfit himself could not find a satisfying exit. He called this 'the most important problem in ethics' and concluded we may simply have to accept implications we cannot stomach."
              ]
            ].map(([name, desc]) => /* @__PURE__ */ jsxs(
              "div",
              {
                style: {
                  borderLeft: "2px solid #1a3c1f",
                  paddingLeft: 18,
                  marginBottom: 20
                },
                children: [
                  /* @__PURE__ */ jsx(
                    "strong",
                    {
                      style: {
                        fontSize: 13,
                        color: "#a8d4b0",
                        display: "block",
                        marginBottom: 5
                      },
                      children: name
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "p",
                    {
                      style: {
                        fontSize: 12,
                        color: "#5a8c64",
                        margin: 0,
                        lineHeight: 1.8
                      },
                      children: desc
                    }
                  )
                ]
              },
              name
            )),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "reset-rp",
                onClick: () => {
                  setStep(0);
                  setChoices([]);
                  setSelected(null);
                  setPhase("game");
                },
                children: "Restart"
              }
            )
          ] })
        ]
      }
    );
  }
  return null;
}
const WORDS_3 = [
  {
    word: "MAP",
    hint: "A representation of terrain or ideas that simplifies reality.",
    definition: "Map is used in philosophy as a model that selects some features and omits others. The classic warning that the model is not the territory reminds us that concepts are useful guides, not the world itself. This matters in science, politics, and ethics whenever abstractions hide lived complexity.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=map",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=map",
      other: "https://iep.utm.edu/?s=map"
    }
  },
  {
    word: "EGO",
    hint: "The first person center of experience and agency.",
    definition: "Ego names the self as subject, the one that thinks, chooses, and acts. Discussions of personal identity ask what makes this subject persist through change. Debates in moral psychology also ask whether practical reason can govern self interest.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ego",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ego",
      other: "https://iep.utm.edu/?s=ego"
    }
  },
  {
    word: "AGI",
    hint: "Machine intelligence expected to generalize across many tasks.",
    definition: "AGI refers to artificial systems that can transfer reasoning across domains instead of solving one narrow problem. Philosophers use it to test theories of mind, consciousness, and agency. The core question is whether functional success is enough for understanding or whether subjective experience is still missing.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=agi",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=agi",
      other: "https://iep.utm.edu/?s=agi"
    }
  },
  {
    word: "VOI",
    hint: "Term for expressive perspective in speech and interpretation.",
    definition: "Voi is a term for voice or voiced perspective in interpretive traditions. It highlights that meaning depends not only on propositions but also on standpoint and expression. This becomes important in hermeneutics, rhetoric, and theories of testimony.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=voi",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=voi",
      other: "https://iep.utm.edu/?s=voi"
    }
  },
  {
    word: "TAO",
    hint: "Classical Chinese idea of the natural way things unfold.",
    definition: "Tao is the Daoist notion of the way, the order and process by which beings arise and transform. It is not merely a rule book, but a pattern of attunement with change. Ethical life is often framed as acting with minimal force and responsive balance.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=tao",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=tao",
      other: "https://iep.utm.edu/?s=tao"
    }
  },
  {
    word: "ZEN",
    hint: "Buddhist tradition that stresses meditation and direct insight.",
    definition: "Zen emphasizes disciplined practice, attention, and non attachment to fixed conceptual schemes. It treats awakening as something to be realized in experience, not only in argument. Philosophically it challenges the assumption that discursive thought is the only path to understanding.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=zen",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=zen",
      other: "https://iep.utm.edu/?s=zen"
    }
  },
  {
    word: "YIN",
    hint: "The receptive and dark pole in a paired cosmology.",
    definition: "Yin names one side of the yin yang dynamic: receptive, cool, inward, and often associated with earth or night. It is meaningful only in relation to its complement, since each side transforms into the other. The framework models interdependence rather than strict opposition.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=yin",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=yin",
      other: "https://iep.utm.edu/?s=yin"
    }
  }
];
const WORDS_4 = [
  {
    word: "MIND",
    hint: "Capacity for thought, awareness, and intentional states.",
    definition: "Mind refers to the set of capacities for perception, thought, feeling, and intention. Philosophy of mind asks how these capacities relate to brain processes and bodily action. Major views include dualism, physicalism, functionalism, and enactivism.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=mind",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=mind",
      other: "https://iep.utm.edu/?s=mind"
    }
  },
  {
    word: "REAL",
    hint: "Whatever exists independently of mere appearance.",
    definition: "Real concerns what genuinely exists, not just what seems to exist from a limited standpoint. Metaphysical realism holds that truths can outrun human belief and language. Anti realist positions argue that what counts as real depends partly on conceptual schemes or practices.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=real",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=real",
      other: "https://iep.utm.edu/?s=real"
    }
  },
  {
    word: "IDEA",
    hint: "Mental content or abstract form grasped by reason.",
    definition: "Idea can mean a thought in the mind, but in some traditions it means an objective intelligible form. Plato treats forms as stable objects of knowledge, while empiricists treat ideas as contents derived from experience. The contrast tracks deeper disputes about reason and perception.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=idea",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=idea",
      other: "https://iep.utm.edu/?s=idea"
    }
  },
  {
    word: "SELF",
    hint: "Persisting subject of experience and personal identity.",
    definition: "Self names the person as a continuing subject across time. Philosophers ask whether continuity comes from memory, bodily persistence, narrative structure, or something deeper. Contemporary work also studies how social recognition shapes self understanding.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=self",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=self",
      other: "https://iep.utm.edu/?s=self"
    }
  },
  {
    word: "SOUL",
    hint: "Immaterial life principle in many metaphysical traditions.",
    definition: "Soul is often treated as the animating principle of living beings and the seat of intellect or character. In classical and medieval thought it explains life, cognition, and moral development. Modern philosophy debates whether such a principle is necessary once biology and neuroscience are in view.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=soul",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=soul",
      other: "https://iep.utm.edu/?s=soul"
    }
  },
  {
    word: "KANT",
    hint: "Critical thinker of duty, autonomy, and limits of knowledge.",
    definition: "Kant argues that the mind contributes the basic structure through which experience is possible. In ethics he defends autonomy and the categorical imperative, where moral law is self legislation by reason. His work reshaped metaphysics, epistemology, and political thought.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=kant",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=kant",
      other: "https://iep.utm.edu/?s=kant"
    }
  },
  {
    word: "HUME",
    hint: "Empiricist skeptic of necessary connection and stable identity.",
    definition: "Hume claims that all ideas trace back to impressions in experience. His critique of causation argues that necessity is not observed directly but inferred from habit. He also challenges substantial personal identity, proposing a bundle of perceptions instead.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=hume",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=hume",
      other: "https://iep.utm.edu/?s=hume"
    }
  },
  {
    word: "MARX",
    hint: "Critic of capitalism focused on class and material history.",
    definition: "Marx analyzes social life through material production, labor relations, and class struggle. He argues that economic structure shapes institutions, ideology, and forms of domination. His theory of alienation and historical change remains central in political philosophy.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=marx",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=marx",
      other: "https://iep.utm.edu/?s=marx"
    }
  },
  {
    word: "MILL",
    hint: "Utilitarian liberal focused on liberty and social harm.",
    definition: "Mill defends a consequentialist ethics that evaluates actions by their effects on happiness. In political theory he argues that coercion is justified only to prevent harm to others. He also emphasizes individuality, free discussion, and experiments in living.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=mill",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=mill",
      other: "https://iep.utm.edu/?s=mill"
    }
  },
  {
    word: "ZENO",
    hint: "Ancient thinker famous for paradoxes of motion and plurality.",
    definition: "Zeno of Elea developed paradoxes that challenge the coherence of movement, divisibility, and plurality. His arguments forced later philosophers to refine concepts of infinity and continuity. They still influence metaphysics and philosophy of mathematics.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=zeno",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=zeno",
      other: "https://iep.utm.edu/?s=zeno"
    }
  },
  {
    word: "NOUS",
    hint: "Intellective faculty that grasps first principles.",
    definition: "Nous is often translated as intellect, the capacity for direct apprehension of intelligible structure. Aristotle distinguishes it from discursive reasoning that proceeds step by step. In later traditions it can also mean a cosmic or ordering intelligence.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=nous",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=nous",
      other: "https://iep.utm.edu/?s=nous"
    }
  },
  {
    word: "DOXA",
    hint: "Opinion shaped by common belief rather than knowledge.",
    definition: "Doxa means belief or opinion, usually contrasted with justified understanding. In Plato it marks unstable judgment tied to appearance and persuasion. Modern uses extend to social norms that feel obvious but deserve critique.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=doxa",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=doxa",
      other: "https://iep.utm.edu/?s=doxa"
    }
  },
  {
    word: "EROS",
    hint: "Desiring force that moves persons toward value.",
    definition: "Eros is more than romantic attraction; it is a motivating desire for beauty, intimacy, and fulfillment. Plato presents it as a ladder that can rise from particular attachment to contemplation of the good. It therefore links psychology, ethics, and metaphysics.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=eros",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=eros",
      other: "https://iep.utm.edu/?s=eros"
    }
  },
  {
    word: "MAYA",
    hint: "Veiling power that makes the transient seem ultimate.",
    definition: "Maya in Indian thought names the power through which ordinary experience appears fixed and independent. It does not mean that nothing exists, but that things are misperceived as self standing. Liberation requires seeing through this distortion.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=maya",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=maya",
      other: "https://iep.utm.edu/?s=maya"
    }
  },
  {
    word: "RASA",
    hint: "Aesthetic flavor through which art evokes felt meaning.",
    definition: "Rasa theory explains how artistic performance yields distilled emotional experience. The point is not private feeling alone but a shared, cultivated savoring of significance. It connects aesthetics with psychology and ethics of attention.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=rasa",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=rasa",
      other: "https://iep.utm.edu/?s=rasa"
    }
  },
  {
    word: "VICE",
    hint: "Stable character trait that tends toward moral failure.",
    definition: "Vice is a dispositional defect such as cruelty, cowardice, or dishonesty. Virtue ethics studies these traits as habits that shape perception and action over time. Moral education therefore concerns character formation, not only isolated choices.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=vice",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=vice",
      other: "https://iep.utm.edu/?s=vice"
    }
  },
  {
    word: "ERGO",
    hint: "Logical connector meaning therefore in an inference.",
    definition: "Ergo signals that a conclusion is being drawn from stated premises. Its philosophical importance lies in argument structure and validity conditions. Careful use distinguishes rhetorical force from genuine logical support.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ergo",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ergo",
      other: "https://iep.utm.edu/?s=ergo"
    }
  },
  {
    word: "YANG",
    hint: "Active and bright pole in a paired cosmology.",
    definition: "Yang names the dynamic counterpart to the receptive side in yin yang thought. It is associated with activity, heat, and outward expression. The framework emphasizes cyclical transformation, where each pole depends on the other.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=yang",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=yang",
      other: "https://iep.utm.edu/?s=yang"
    }
  },
  {
    word: "KOAN",
    hint: "Paradoxical prompt used to disrupt habitual reasoning.",
    definition: "A koan is a compact case or question used in Zen training to unsettle rigid conceptual habits. It is not a puzzle with a merely clever answer. The aim is a shift in awareness achieved through sustained practice.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=koan",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=koan",
      other: "https://iep.utm.edu/?s=koan"
    }
  }
];
const WORDS_5 = [
  {
    word: "ALIEF",
    hint: "Automatic associative attitude that can conflict with belief.",
    definition: "Alief names a fast, affective, and action guiding state that may diverge from explicit judgment. A person can believe a glass bridge is safe yet still freeze while crossing. The concept helps explain akrasia, bias, and embodied cognition.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=alief",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=alief",
      other: "https://iep.utm.edu/?s=alief"
    }
  },
  {
    word: "LOGOS",
    hint: "Reasoned account, rational order, or meaningful discourse.",
    definition: "Logos ranges from argument and explanation to a deeper rational structure of reality. Heraclitus treats it as an ordering principle, while later traditions connect it to logic and language. It links thought, speech, and world intelligibility.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=logos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=logos",
      other: "https://iep.utm.edu/?s=logos"
    }
  },
  {
    word: "LINDY",
    hint: "Heuristic that durability predicts further longevity.",
    definition: "Lindy names the idea that non perishable things that survive longer are likely to endure longer still. Philosophically it raises questions about tradition, evidence, and epistemic risk. Survival is not truth, but it can be a practical filter under uncertainty.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=lindy",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=lindy",
      other: "https://iep.utm.edu/?s=lindy"
    }
  },
  {
    word: "OCCAM",
    hint: "Medieval name tied to the principle of parsimony.",
    definition: "Occam usually refers to William of Ockham and the preference for simpler explanatory frameworks. The guideline says not to multiply explanatory entities without necessity. It is a methodological rule, not a proof that reality itself must be simple.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=occam",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=occam",
      other: "https://iep.utm.edu/?s=occam"
    }
  },
  {
    word: "RAZOR",
    hint: "Method rule favoring simpler explanations when evidence ties.",
    definition: "A razor is a decision principle for theory choice under evidential parity. The best known version rewards explanatory economy and fewer assumptions. Such principles guide inquiry but do not replace empirical testing.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=razor",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=razor",
      other: "https://iep.utm.edu/?s=razor"
    }
  },
  {
    word: "MANAS",
    hint: "Inner faculty for attention, coordination, and intention.",
    definition: "Manas in Indian philosophy often denotes the internal organ that processes sensory input and directs attention. It mediates between raw perception and reflective cognition. Different schools dispute whether it is momentary, enduring, or fundamentally constructed.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=manas",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=manas",
      other: "https://iep.utm.edu/?s=manas"
    }
  },
  {
    word: "MORAL",
    hint: "Related to right action, obligation, and character.",
    definition: "Moral concerns norms about what persons ought to do and become. Major theories include consequentialism, deontology, and virtue ethics, each emphasizing different evaluative grounds. Contemporary debates also include care, justice, and social power.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=moral",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=moral",
      other: "https://iep.utm.edu/?s=moral"
    }
  },
  {
    word: "TRUTH",
    hint: "Property of judgments that accurately represent reality.",
    definition: "Truth is central to logic and epistemology because it connects belief with how things are. Competing theories define it through correspondence, coherence, or pragmatic success. The choice affects how we understand disagreement and rational inquiry.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=truth",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=truth",
      other: "https://iep.utm.edu/?s=truth"
    }
  },
  {
    word: "CAUSE",
    hint: "Relation by which one event brings about another.",
    definition: "Cause concerns production, dependence, and explanation across events and states. Humean views stress regularity, while interventionist views tie causation to manipulability. The concept is crucial in science, law, and moral responsibility.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=cause",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=cause",
      other: "https://iep.utm.edu/?s=cause"
    }
  },
  {
    word: "BEING",
    hint: "Most general notion of what it is to exist.",
    definition: "Being is the broadest metaphysical category, asking what it means for anything to be at all. Aristotle studies being in many senses, while Heidegger renews the question by linking it to human existence. The topic frames ontology as first philosophy.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=being",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=being",
      other: "https://iep.utm.edu/?s=being"
    }
  },
  {
    word: "AGENT",
    hint: "Entity capable of intentional action and responsibility.",
    definition: "Agent refers to a doer whose actions are guided by reasons, goals, and capacities. Action theory asks when movements count as intentional and attributable. Moral theory then asks when praise or blame is justified.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=agent",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=agent",
      other: "https://iep.utm.edu/?s=agent"
    }
  },
  {
    word: "IDEAL",
    hint: "Normative standard treated as an aspirational model.",
    definition: "Ideal is a model of excellence or perfect realization used to guide judgment. It can be moral, political, epistemic, or aesthetic. Philosophers debate whether ideals clarify progress or distort what finite agents can reasonably achieve.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ideal",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ideal",
      other: "https://iep.utm.edu/?s=ideal"
    }
  },
  {
    word: "PLATO",
    hint: "Founder of the Academy and theorist of forms.",
    definition: "Plato develops dialogues on justice, knowledge, love, and political order. He distinguishes changing appearances from intelligible forms that ground stable knowledge. His method combines argument with dramatic pedagogy and enduring conceptual experiments.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=plato",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=plato",
      other: "https://iep.utm.edu/?s=plato"
    }
  },
  {
    word: "HEGEL",
    hint: "Systematic thinker of history, recognition, and dialectic.",
    definition: "Hegel presents reality as a dynamic process in which contradictions are worked through historically. Freedom grows through institutions that secure mutual recognition. His dialectical method influenced continental philosophy, political theory, and social thought.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=hegel",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=hegel",
      other: "https://iep.utm.edu/?s=hegel"
    }
  },
  {
    word: "LOCKE",
    hint: "Liberal empiricist on knowledge, rights, and government.",
    definition: "Locke argues that the mind begins without innate ideas and gains content through experience. Politically he defends natural rights and government by consent. His work shaped modern liberal constitutionalism.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=locke",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=locke",
      other: "https://iep.utm.edu/?s=locke"
    }
  },
  {
    word: "BACON",
    hint: "Early modern advocate of experimental method.",
    definition: "Bacon criticizes scholastic reliance on authority and promotes organized empirical inquiry. He warns about cognitive idols that distort judgment before evidence is assessed. His program helped define the ethos of modern science.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=bacon",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=bacon",
      other: "https://iep.utm.edu/?s=bacon"
    }
  },
  {
    word: "RAWLS",
    hint: "Political philosopher of fairness behind a veil device.",
    definition: "Rawls develops justice as fairness through a thought experiment where principles are chosen without knowledge of social position. This original position is meant to model impartiality. His framework prioritizes equal basic liberties and fair opportunities.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=rawls",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=rawls",
      other: "https://iep.utm.edu/?s=rawls"
    }
  },
  {
    word: "CAMUS",
    hint: "Writer philosopher of absurdity and lucid rebellion.",
    definition: "Camus argues that human longing for meaning meets an indifferent world, producing the absurd. He rejects both nihilism and false consolation. The ethical response is lucid revolt, solidarity, and measured action.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=camus",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=camus",
      other: "https://iep.utm.edu/?s=camus"
    }
  },
  {
    word: "LAOZI",
    hint: "Attributed author of a classic on effortless alignment.",
    definition: "Laozi is linked to the Daodejing, a text on governing and living through non coercive attunement. Central themes include simplicity, humility, and action without forcing. The work criticizes domination and celebrates adaptive balance.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=laozi",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=laozi",
      other: "https://iep.utm.edu/?s=laozi"
    }
  },
  {
    word: "FREGE",
    hint: "Pioneer of modern logic and analytic philosophy.",
    definition: "Frege transformed logic with quantification theory and rigorous formal notation. His distinction between sense and reference reshaped philosophy of language. He also advanced logicist programs in the foundations of arithmetic.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=frege",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=frege",
      other: "https://iep.utm.edu/?s=frege"
    }
  },
  {
    word: "DEWEY",
    hint: "Pragmatist focused on inquiry, democracy, and education.",
    definition: "Dewey treats thinking as an experimental response to problematic situations in lived practice. He connects knowledge with communal inquiry rather than detached certainty. In politics he defends participatory democracy and public education.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=dewey",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=dewey",
      other: "https://iep.utm.edu/?s=dewey"
    }
  },
  {
    word: "QUINE",
    hint: "Naturalist critic of strict analytic synthetic division.",
    definition: "Quine challenges the idea that some truths are purely analytic and immune to revision. He proposes a holistic picture where beliefs face experience as a network. This view blurs boundaries between philosophy and empirical science.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=quine",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=quine",
      other: "https://iep.utm.edu/?s=quine"
    }
  },
  {
    word: "RORTY",
    hint: "Pragmatist critic of mirror of nature epistemology.",
    definition: "Rorty rejects the project of grounding knowledge in indubitable representations. He emphasizes conversation, contingency, and solidaristic politics over foundational certainty. Philosophy becomes cultural critique rather than tribunal of reason.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=rorty",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=rorty",
      other: "https://iep.utm.edu/?s=rorty"
    }
  },
  {
    word: "NAGEL",
    hint: "Analyst of consciousness and the subjective point of view.",
    definition: "Nagel argues that conscious experience has a first person character that objective science struggles to capture. His famous challenge asks what it is like to be another creature. He also writes on reasons, value, and moral luck.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=nagel",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=nagel",
      other: "https://iep.utm.edu/?s=nagel"
    }
  },
  {
    word: "TELOS",
    hint: "Final end or purpose toward which activity aims.",
    definition: "Telos means an end state that gives structure to development or practice. Aristotle uses it to explain natural kinds, virtues, and crafts. Modern science reduced teleology in physics, but purposive language remains central in biology and ethics.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=telos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=telos",
      other: "https://iep.utm.edu/?s=telos"
    }
  },
  {
    word: "EIDOS",
    hint: "Form or intelligible structure grasped in thought.",
    definition: "Eidos can mean form, species, or essential structure. In Platonic contexts it signals stable intelligible reality, while in phenomenology it can denote eidetic essence. The term links ontology with methods of abstraction.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=eidos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=eidos",
      other: "https://iep.utm.edu/?s=eidos"
    }
  },
  {
    word: "ARETE",
    hint: "Excellence of character or function in Greek ethics.",
    definition: "Arete names excellence in fulfilling a role or developing a capacity well. In virtue ethics it marks traits that enable flourishing rather than rule compliance alone. It unites character, practice, and social formation.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=arete",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=arete",
      other: "https://iep.utm.edu/?s=arete"
    }
  },
  {
    word: "POLIS",
    hint: "Classical city community as a unit of civic life.",
    definition: "Polis is the political community of the Greek city state. It is not only a territory but a shared framework of laws, education, and public action. Ancient political philosophy treats civic virtue as inseparable from this communal form.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=polis",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=polis",
      other: "https://iep.utm.edu/?s=polis"
    }
  },
  {
    word: "AGORA",
    hint: "Public civic space for exchange and deliberation.",
    definition: "Agora was the central public square where economic, social, and political interactions met. Philosophically it symbolizes publicity, contestation, and civic speech. It contrasts with private or courtly forms of power.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=agora",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=agora",
      other: "https://iep.utm.edu/?s=agora"
    }
  },
  {
    word: "ETHOS",
    hint: "Characteristic moral orientation of a person or culture.",
    definition: "Ethos describes the habitual style of valuing and acting that shapes a community or individual. It includes norms that are often implicit rather than codified. Ethical critique asks whether a prevailing ethos supports human flourishing or domination.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ethos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ethos",
      other: "https://iep.utm.edu/?s=ethos"
    }
  },
  {
    word: "MONAD",
    hint: "Simple indivisible unit in metaphysical system building.",
    definition: "Monad is most associated with Leibniz, where reality consists of simple, non spatial centers of perception. These units do not causally interact in the usual way. Harmony among them is explained by coordinated structure at the level of the whole.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=monad",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=monad",
      other: "https://iep.utm.edu/?s=monad"
    }
  },
  {
    word: "ANIMA",
    hint: "Life principle linked to psyche and vitality.",
    definition: "Anima in Latin traditions refers to life breath, soul, or living psyche. Aristotelian and medieval accounts use it to classify powers such as nutrition, sensation, and intellect. Later thinkers reinterpret it psychologically and symbolically.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=anima",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=anima",
      other: "https://iep.utm.edu/?s=anima"
    }
  },
  {
    word: "DEISM",
    hint: "Belief in a creator known by reason not revelation.",
    definition: "Deism affirms a divine source of the universe while rejecting ongoing miracles and sectarian authority. It gained force in early modern debates about natural religion. The position seeks compatibility between theism and scientific lawfulness.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=deism",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=deism",
      other: "https://iep.utm.edu/?s=deism"
    }
  },
  {
    word: "ANGST",
    hint: "Existential anxiety before freedom and finitude.",
    definition: "Angst is a mood in which familiar meanings lose their grip and responsibility becomes acute. Existentialists treat it as disclosure of freedom rather than mere pathology. It can motivate authentic commitment under uncertainty.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=angst",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=angst",
      other: "https://iep.utm.edu/?s=angst"
    }
  },
  {
    word: "ENNUI",
    hint: "Chronic weariness from perceived lack of meaning.",
    definition: "Ennui is a sustained boredom tied to emptiness rather than simple inactivity. It appears in critiques of modern life, consumption, and alienated labor. Philosophically it raises questions about value, attention, and purpose.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ennui",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ennui",
      other: "https://iep.utm.edu/?s=ennui"
    }
  },
  {
    word: "AXIOM",
    hint: "Starting proposition accepted without further proof.",
    definition: "Axiom is a foundational statement used to derive further results within a system. In logic and mathematics, changing axioms can produce different but coherent structures. Philosophers ask whether first principles are self evident, conventional, or pragmatically chosen.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=axiom",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=axiom",
      other: "https://iep.utm.edu/?s=axiom"
    }
  },
  {
    word: "LOGIC",
    hint: "Study of valid inference and argument structure.",
    definition: "Logic analyzes when conclusions follow from premises by form rather than persuasion alone. It includes formal systems, semantics, and proof methods. Philosophical logic also studies modality, identity, and the limits of formalization.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=logic",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=logic",
      other: "https://iep.utm.edu/?s=logic"
    }
  },
  {
    word: "VALID",
    hint: "Property of arguments where truth is preserved by form.",
    definition: "Valid describes an inference where true premises cannot yield a false conclusion. Validity concerns structure, not the actual truth of premises. This distinction is basic for evaluating arguments in every domain.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=valid",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=valid",
      other: "https://iep.utm.edu/?s=valid"
    }
  },
  {
    word: "MODAL",
    hint: "Concerning possibility, necessity, and possible worlds.",
    definition: "Modal discourse studies what could be, must be, or cannot be. It supports analysis of essence, counterfactuals, and metaphysical dependence. Different semantic frameworks explain modal truth in different ways.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=modal",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=modal",
      other: "https://iep.utm.edu/?s=modal"
    }
  },
  {
    word: "ATMAN",
    hint: "Inner self principle in several Indian traditions.",
    definition: "Atman denotes the deepest self in many Hindu schools, often contrasted with transient personality traits. Some systems identify it with ultimate reality, while Buddhist thought critiques any permanent self. The debate shapes ethics, liberation theory, and metaphysics.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=atman",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=atman",
      other: "https://iep.utm.edu/?s=atman"
    }
  },
  {
    word: "NOMOS",
    hint: "Law, custom, or socially instituted normative order.",
    definition: "Nomos means law and convention in Greek thought. It is often contrasted with physis, what exists by nature. Political philosophy uses this contrast to examine legitimacy and social construction.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=nomos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=nomos",
      other: "https://iep.utm.edu/?s=nomos"
    }
  },
  {
    word: "NOEMA",
    hint: "Intended object as meant in conscious experience.",
    definition: "Noema in phenomenology is the object as it is intended or presented in an act of consciousness. It is not merely an external thing nor a private image. The concept helps analyze intentionality with precision.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=noema",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=noema",
      other: "https://iep.utm.edu/?s=noema"
    }
  },
  {
    word: "BONUM",
    hint: "Latin term for the good as object of desire.",
    definition: "Bonum means the good in medieval and scholastic philosophy. It ties value to being by claiming that what exists is in some respect desirable. Ethical theories then ask how finite goods relate to highest good.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=bonum",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=bonum",
      other: "https://iep.utm.edu/?s=bonum"
    }
  },
  {
    word: "PIETY",
    hint: "Devout respect toward sacred duties and obligations.",
    definition: "Piety concerns proper attitudes and actions toward gods, ancestors, or sacred norms. In Plato Euthyphro, it becomes a test case for whether morality depends on divine command. The topic also intersects civic duty and tradition.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=piety",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=piety",
      other: "https://iep.utm.edu/?s=piety"
    }
  },
  {
    word: "KARMA",
    hint: "Moral causal order connecting action and consequence.",
    definition: "Karma is the principle that intentional actions shape future experiences and conditions. It is not fatalism, because present action still matters. Philosophical treatments examine responsibility across time and rebirth frameworks.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=karma",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=karma",
      other: "https://iep.utm.edu/?s=karma"
    }
  }
];
const WORDS_6 = [
  {
    word: "BUDDHI",
    hint: "Discriminative intelligence in Indian psychology.",
    definition: "Buddhi refers to higher discernment that can distinguish lasting from fleeting goods. In Samkhya and related systems it plays a key role in liberation through clear insight. It mediates between sensory mind and deeper awareness.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=buddhi",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=buddhi",
      other: "https://iep.utm.edu/?s=buddhi"
    }
  },
  {
    word: "CHITTA",
    hint: "Mind stream composed of impressions and fluctuations.",
    definition: "Chitta names the psychomental field in Yoga and related traditions. Practice aims to calm its fluctuations so awareness is not dominated by reactive patterns. The concept integrates cognition, memory, and affect.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=chitta",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=chitta",
      other: "https://iep.utm.edu/?s=chitta"
    }
  },
  {
    word: "UBUNTU",
    hint: "African ethic of personhood through relational community.",
    definition: "Ubuntu is often summarized by the idea that a person becomes a person through other persons. It emphasizes mutual care, dignity, and restorative justice. This framework challenges hyper individualist moral models.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ubuntu",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ubuntu",
      other: "https://iep.utm.edu/?s=ubuntu"
    }
  },
  {
    word: "QUALIA",
    hint: "Subjective felt qualities of conscious experience.",
    definition: "Qualia are the what it is like aspects of experience, such as the felt character of color or pain. They are central in arguments against reductive accounts of mind. Debates ask whether such qualities are physical, representational, or irreducible.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=qualia",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=qualia",
      other: "https://iep.utm.edu/?s=qualia"
    }
  },
  {
    word: "KLUDGE",
    hint: "Ad hoc workaround that functions without elegant design.",
    definition: "Kludge describes a patchwork solution that works in practice but lacks theoretical cleanliness. In philosophy of technology it highlights tradeoffs between local success and global coherence. It can also illuminate bounded rationality in real systems.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=kludge",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=kludge",
      other: "https://iep.utm.edu/?s=kludge"
    }
  },
  {
    word: "BELIEF",
    hint: "Cognitive stance that takes a claim to be true.",
    definition: "Belief is a propositional attitude central to epistemology and action theory. It interacts with evidence, desire, and intention in explaining behavior. Debates concern justification, revision, and rational disagreement.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=belief",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=belief",
      other: "https://iep.utm.edu/?s=belief"
    }
  },
  {
    word: "NATURE",
    hint: "Order of the world considered independently of convention.",
    definition: "Nature can mean the physical cosmos, the essence of a thing, or a normative standard. Philosophers ask whether moral and political norms can be grounded in natural facts. The term therefore sits at the intersection of science and value theory.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=nature",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=nature",
      other: "https://iep.utm.edu/?s=nature"
    }
  },
  {
    word: "REASON",
    hint: "Capacity to infer, justify, and guide action.",
    definition: "Reason includes both theoretical capacities for belief formation and practical capacities for decision. Rationality norms govern coherence, evidence response, and means end fit. Philosophers disagree about whether reasons are objective facts or stance dependent.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=reason",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=reason",
      other: "https://iep.utm.edu/?s=reason"
    }
  },
  {
    word: "MENTAL",
    hint: "Pertaining to states like thought, feeling, and intention.",
    definition: "Mental marks phenomena with intentional, phenomenological, or cognitive character. The category is contested by reductionist and non reductionist theories alike. Its analysis drives debates on consciousness, content, and causal efficacy.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=mental",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=mental",
      other: "https://iep.utm.edu/?s=mental"
    }
  },
  {
    word: "SPIRIT",
    hint: "Life giving or non material principle in many traditions.",
    definition: "Spirit can denote breath, vitality, personhood, or divine presence depending on tradition. In idealist contexts it may refer to collective historical consciousness. The term links metaphysical questions with existential and religious concerns.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=spirit",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=spirit",
      other: "https://iep.utm.edu/?s=spirit"
    }
  },
  {
    word: "CHOICE",
    hint: "Act of selecting among options under reasons.",
    definition: "Choice is where deliberation becomes commitment. Philosophers examine whether selection is free, constrained, or shaped by unconscious factors. The concept is central to responsibility, autonomy, and rational action.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=choice",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=choice",
      other: "https://iep.utm.edu/?s=choice"
    }
  },
  {
    word: "ACTION",
    hint: "Intentional doing attributable to an agent.",
    definition: "Action is behavior under descriptions that cite intentions and reasons. Classic questions ask how reasons explain movements without reducing them to mere events. The field bridges metaphysics, ethics, and philosophy of mind.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=action",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=action",
      other: "https://iep.utm.edu/?s=action"
    }
  },
  {
    word: "EFFECT",
    hint: "Result produced by prior conditions or interventions.",
    definition: "Effect is what follows from causes within explanatory or experimental frameworks. Identifying effects requires distinguishing signal from background conditions. This matters for policy, science, and moral assessment of consequences.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=effect",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=effect",
      other: "https://iep.utm.edu/?s=effect"
    }
  },
  {
    word: "DIVINE",
    hint: "Concerning ultimate sacred reality or deity.",
    definition: "Divine marks what is attributed to God or the highest sacred principle. Philosophy of religion asks which attributes are coherent, such as omniscience and goodness. It also studies how divine claims interact with evil, freedom, and evidence.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=divine",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=divine",
      other: "https://iep.utm.edu/?s=divine"
    }
  },
  {
    word: "SARTRE",
    hint: "Existentialist on freedom, bad faith, and responsibility.",
    definition: "Sartre argues that human beings are condemned to be free, with no fixed essence that excuses our choices. Bad faith is self deception that flees this burden. His ethics stresses responsibility in a shared world.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=sartre",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=sartre",
      other: "https://iep.utm.edu/?s=sartre"
    }
  },
  {
    word: "HOBBES",
    hint: "Contract theorist of authority from fear and security.",
    definition: "Hobbes describes a pre political condition where insecurity drives conflict. To escape it, individuals authorize sovereign power for peace. His account prioritizes order and survival as political fundamentals.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=hobbes",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=hobbes",
      other: "https://iep.utm.edu/?s=hobbes"
    }
  },
  {
    word: "SENECA",
    hint: "Stoic writer on virtue, emotion, and mortality.",
    definition: "Seneca develops Stoic ethics around rational self command and alignment with nature. He treats anger and fear as judgments that can be retrained. His letters present philosophy as practical therapy for life.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=seneca",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=seneca",
      other: "https://iep.utm.edu/?s=seneca"
    }
  },
  {
    word: "THALES",
    hint: "Early Greek thinker seeking natural principles of cosmos.",
    definition: "Thales is often cited as an origin figure of natural philosophy in Ionia. He sought non mythic explanations of the world, reportedly proposing water as an originating principle. His legacy is methodological as much as doctrinal.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=thales",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=thales",
      other: "https://iep.utm.edu/?s=thales"
    }
  },
  {
    word: "ARENDT",
    hint: "Political theorist of action, plurality, and totalitarianism.",
    definition: "Arendt distinguishes labor, work, and action to analyze human activity in public life. She emphasizes plurality and the capacity to begin anew through collective action. Her analysis of totalitarianism remains a major warning for modern politics.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=arendt",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=arendt",
      other: "https://iep.utm.edu/?s=arendt"
    }
  },
  {
    word: "ANSELM",
    hint: "Medieval thinker known for a priori theology.",
    definition: "Anselm is best known for the ontological argument, which reasons from the concept of greatest being to existence. His work also explores faith seeking understanding. Debates around his argument still shape metaphysics and philosophy of religion.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=anselm",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=anselm",
      other: "https://iep.utm.edu/?s=anselm"
    }
  },
  {
    word: "OCKHAM",
    hint: "Nominalist critic of unnecessary metaphysical entities.",
    definition: "Ockham argues that universals are not independent objects but conceptual or linguistic tools. His parsimony principle discourages positing entities beyond explanatory need. This stance influenced logic, metaphysics, and scientific method.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ockham",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ockham",
      other: "https://iep.utm.edu/?s=ockham"
    }
  },
  {
    word: "POPPER",
    hint: "Philosopher of science centered on falsifiability.",
    definition: "Popper holds that scientific theories must be testable in ways that risk refutation. He criticizes verificationist models that reward confirmation alone. Knowledge grows through bold conjectures and severe tests.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=popper",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=popper",
      other: "https://iep.utm.edu/?s=popper"
    }
  },
  {
    word: "NOZICK",
    hint: "Libertarian theorist of rights and minimal state.",
    definition: "Nozick defends strong individual rights that constrain redistribution and paternalism. His entitlement theory judges holdings by acquisition and transfer history. The result is a minimal state limited to protection against force and fraud.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=nozick",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=nozick",
      other: "https://iep.utm.edu/?s=nozick"
    }
  },
  {
    word: "PARFIT",
    hint: "Analyst of identity, reasons, and population ethics.",
    definition: "Parfit argues that personal identity may be less fundamental than psychological continuity and connectedness. He also develops influential work on future generations and moral aggregation. His method combines analytical rigor with thought experiments.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=parfit",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=parfit",
      other: "https://iep.utm.edu/?s=parfit"
    }
  },
  {
    word: "PUTNAM",
    hint: "Philosopher linking language, realism, and mind.",
    definition: "Putnam helped develop semantic externalism, where meaning depends partly on environment and community. He also moved from metaphysical realism toward internal realism. His work spans logic, philosophy of science, and ethics.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=putnam",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=putnam",
      other: "https://iep.utm.edu/?s=putnam"
    }
  },
  {
    word: "KRIPKE",
    hint: "Logician of naming, necessity, and rigid designation.",
    definition: "Kripke showed that names can refer rigidly across possible worlds. This supports necessary truths known a posteriori, such as identity claims in science. His lectures transformed modal metaphysics and philosophy of language.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=kripke",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=kripke",
      other: "https://iep.utm.edu/?s=kripke"
    }
  },
  {
    word: "SEARLE",
    hint: "Analyst of intentionality, speech acts, and institutions.",
    definition: "Searle develops speech act theory to explain how utterances perform social actions. He also argues that consciousness and intentionality are biologically real but irreducible first person phenomena. His account of social reality centers on status functions and collective acceptance.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=searle",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=searle",
      other: "https://iep.utm.edu/?s=searle"
    }
  },
  {
    word: "BUDDHA",
    hint: "Teacher of a path beyond craving and suffering.",
    definition: "Buddha teaches the Four Noble Truths and an eightfold path of ethical and contemplative practice. The framework diagnoses suffering as tied to craving and ignorance. Philosophically it offers a process view of self and impermanence.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=buddha",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=buddha",
      other: "https://iep.utm.edu/?s=buddha"
    }
  },
  {
    word: "APORIA",
    hint: "State of puzzlement where argument reaches impasse.",
    definition: "Aporia marks a productive dead end in inquiry. Socratic dialogues often use it to expose hidden assumptions and force conceptual revision. Rather than failure, it can be a method of intellectual honesty.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=aporia",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=aporia",
      other: "https://iep.utm.edu/?s=aporia"
    }
  },
  {
    word: "PATHOS",
    hint: "Affective dimension of experience and persuasion.",
    definition: "Pathos concerns emotion, suffering, and felt significance. In rhetoric it names appeals that move an audience through feeling. In ethics and aesthetics it highlights the cognitive role of emotion.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=pathos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=pathos",
      other: "https://iep.utm.edu/?s=pathos"
    }
  },
  {
    word: "MYTHOS",
    hint: "Narrative framework that conveys cultural meaning.",
    definition: "Mythos refers to structured stories that orient values and identity. Philosophical critique asks when such narratives illuminate existence and when they mask domination. It is often contrasted with logos but not always opposed to reason.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=mythos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=mythos",
      other: "https://iep.utm.edu/?s=mythos"
    }
  },
  {
    word: "KAIROS",
    hint: "Opportune timing where action fits the moment.",
    definition: "Kairos is qualitative time, the right moment for speech or action. It differs from clock time by emphasizing context sensitivity. The concept is central in rhetoric, strategy, and practical wisdom.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=kairos",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=kairos",
      other: "https://iep.utm.edu/?s=kairos"
    }
  },
  {
    word: "PHYSIS",
    hint: "Nature as growth and intrinsic order.",
    definition: "Physis in Greek thought names what arises by itself according to inner principle. It is contrasted with nomos, what is instituted by convention or law. This distinction shapes debates about natural justice and political legitimacy.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=physis",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=physis",
      other: "https://iep.utm.edu/?s=physis"
    }
  },
  {
    word: "PRAXIS",
    hint: "Embodied practice that unites theory and action.",
    definition: "Praxis is action informed by reflection and directed toward transformation. In Aristotelian and Marxist contexts it contrasts with purely contemplative or technical activity. The concept stresses that understanding is tested in lived practice.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=praxis",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=praxis",
      other: "https://iep.utm.edu/?s=praxis"
    }
  },
  {
    word: "TECHNE",
    hint: "Craft knowledge aimed at making and producing.",
    definition: "Techne is skilled know how oriented toward production of an artifact or outcome. Aristotle distinguishes it from practical wisdom and theoretical knowledge. Modern debates use it to study technology, expertise, and control.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=techne",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=techne",
      other: "https://iep.utm.edu/?s=techne"
    }
  },
  {
    word: "COGITO",
    hint: "First person certainty reached through methodic doubt.",
    definition: "Cogito summarizes Descartes argument that doubting confirms the existence of a thinking subject. It provides a proposed secure starting point for knowledge. Critics question whether it proves a substantial self or only a moment of thinking.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=cogito",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=cogito",
      other: "https://iep.utm.edu/?s=cogito"
    }
  },
  {
    word: "ANIMUS",
    hint: "Term for spirited disposition or inner drive.",
    definition: "Animus in Latin can mean mind, courage, or disposition. In later psychological usage it can denote structured patterns in the psyche. Philosophically it points to the motivational force behind judgment and action.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=animus",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=animus",
      other: "https://iep.utm.edu/?s=animus"
    }
  },
  {
    word: "DASEIN",
    hint: "Heidegger term for human being as world involved existence.",
    definition: "Dasein names the being for whom being is an issue. It is characterized by care, temporality, and practical involvement rather than detached spectatorship. The analysis reframes ontology through lived situatedness.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=dasein",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=dasein",
      other: "https://iep.utm.edu/?s=dasein"
    }
  },
  {
    word: "MONISM",
    hint: "View that reality is fundamentally one kind.",
    definition: "Monism claims that apparent plurality reduces to a single basic substance, principle, or structure. Variants include material, ideal, and neutral forms. The view competes with dualism and pluralism about what is ultimately real.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=monism",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=monism",
      other: "https://iep.utm.edu/?s=monism"
    }
  },
  {
    word: "THEISM",
    hint: "Belief that a personal creator sustains the world.",
    definition: "Theism holds that God exists as a purposive and morally significant source of reality. Classical theism attributes maximal power, knowledge, and goodness. Debates center on divine hiddenness, evil, and freedom.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=theism",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=theism",
      other: "https://iep.utm.edu/?s=theism"
    }
  },
  {
    word: "VIRTUE",
    hint: "Excellence of character that enables good action.",
    definition: "Virtue is a stable disposition to perceive and respond well in concrete situations. Aristotle links it to habituation and practical wisdom. Contemporary virtue ethics treats moral development as central to normative theory.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=virtue",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=virtue",
      other: "https://iep.utm.edu/?s=virtue"
    }
  },
  {
    word: "PHILIA",
    hint: "Affectionate friendship grounded in mutual regard.",
    definition: "Philia is the bond of friendship central to Greek ethics and political thought. Aristotle distinguishes friendships of utility, pleasure, and character. The highest form supports shared flourishing and moral growth.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=philia",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=philia",
      other: "https://iep.utm.edu/?s=philia"
    }
  },
  {
    word: "DHARMA",
    hint: "Normative order of duty, law, and right living.",
    definition: "Dharma can mean moral duty, social role, cosmic order, and righteous conduct depending on context. It organizes ethical life in many Indian traditions. Interpretations balance universal principles with role specific obligations.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=dharma",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=dharma",
      other: "https://iep.utm.edu/?s=dharma"
    }
  },
  {
    word: "AHIMSA",
    hint: "Norm of non harm in thought, speech, and conduct.",
    definition: "Ahimsa is the commitment to avoid injury to living beings. It functions as a moral discipline in Jain, Buddhist, and Hindu traditions. In modern politics it also underwrites nonviolent resistance.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ahimsa",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ahimsa",
      other: "https://iep.utm.edu/?s=ahimsa"
    }
  },
  {
    word: "DUKKHA",
    hint: "Unsatisfactoriness that marks conditioned existence.",
    definition: "Dukkha is often translated as suffering, but it also includes instability and pervasive dissatisfaction. In Buddhism it is diagnosed as arising from craving and ignorance. Understanding this condition is the first step toward liberation.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=dukkha",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=dukkha",
      other: "https://iep.utm.edu/?s=dukkha"
    }
  },
  {
    word: "PRIORI",
    hint: "Known independently of specific sensory experience.",
    definition: "A priori knowledge is justified by reason rather than observation of particular cases. Examples often include logic and mathematics. Philosophers debate how such knowledge is possible and whether the boundary with empirical knowledge is sharp.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=priori",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=priori",
      other: "https://iep.utm.edu/?s=priori"
    }
  },
  {
    word: "CORPUS",
    hint: "Body considered as organized whole of material parts.",
    definition: "Corpus means body in Latin and appears in metaphysical and legal contexts. Philosophically it can mark embodiment against disembodied theories of mind. It also appears in discussions of political bodies and institutional wholes.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=corpus",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=corpus",
      other: "https://iep.utm.edu/?s=corpus"
    }
  },
  {
    word: "TABULA",
    hint: "Image of a blank slate before experience writes on it.",
    definition: "Tabula rasa is the empiricist metaphor for the mind prior to learning. It rejects innate ideas in favor of acquisition through sensation and reflection. Contemporary cognitive science complicates but does not erase this contrast.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=tabula",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=tabula",
      other: "https://iep.utm.edu/?s=tabula"
    }
  },
  {
    word: "SUMMUM",
    hint: "Highest good that orders all lesser ends.",
    definition: "Summum bonum is the ultimate good around which ethical life is oriented. Different traditions identify it with happiness, virtue, union with God, or liberation. The concept structures theories of practical reason.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=summum",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=summum",
      other: "https://iep.utm.edu/?s=summum"
    }
  },
  {
    word: "EPOCHE",
    hint: "Methodic suspension of judgment about existence claims.",
    definition: "Epoche in skepticism and phenomenology means bracketing assent to ordinary ontological commitments. This suspension allows careful examination of appearances and structures of consciousness. It is a methodological move, not permanent disbelief.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=epoche",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=epoche",
      other: "https://iep.utm.edu/?s=epoche"
    }
  },
  {
    word: "NOESIS",
    hint: "Act of thinking or intending in conscious life.",
    definition: "Noesis denotes the intentional act side of consciousness in phenomenology. It is paired with noema, the object as meant. The distinction helps analyze how meaning is constituted in experience.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=noesis",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=noesis",
      other: "https://iep.utm.edu/?s=noesis"
    }
  },
  {
    word: "HUBRIS",
    hint: "Overreaching pride that ignores limits and measure.",
    definition: "Hubris names excessive self assertion that violates moral or civic balance. Greek tragedy treats it as a recurring source of downfall. The concept remains useful in political ethics and technology critique.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=hubris",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=hubris",
      other: "https://iep.utm.edu/?s=hubris"
    }
  },
  {
    word: "PNEUMA",
    hint: "Breath like principle of life and vitality.",
    definition: "Pneuma means breath or spirit in Greek medical, Stoic, and theological contexts. Stoics use it as a structuring force that organizes bodies and life. The term links cosmology, physiology, and ethics.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=pneuma",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=pneuma",
      other: "https://iep.utm.edu/?s=pneuma"
    }
  }
];
const WORDS_7 = [
  {
    word: "ASCETIC",
    hint: "Disciplined renunciant orientation toward self mastery.",
    definition: "Ascetic describes practices of restraint aimed at moral, spiritual, or cognitive transformation. Such practices can cultivate freedom from compulsive desire. Critics ask when restraint becomes life denial rather than flourishing.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=ascetic",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=ascetic",
      other: "https://iep.utm.edu/?s=ascetic"
    }
  },
  {
    word: "CONATUS",
    hint: "Striving tendency by which each thing persists.",
    definition: "Conatus is Spinoza term for the drive of each mode to persevere in being. It grounds his account of affect, desire, and power. Ethical development involves understanding this striving through adequate ideas.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=conatus",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=conatus",
      other: "https://iep.utm.edu/?s=conatus"
    }
  },
  {
    word: "SPINOZA",
    hint: "Rationalist monist of substance, affects, and freedom.",
    definition: "Spinoza identifies God with Nature and argues that everything follows from one infinite substance. Human bondage comes from inadequate ideas and passive affects. Freedom is achieved through understanding necessity and cultivating active joy.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=spinoza",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=spinoza",
      other: "https://iep.utm.edu/?s=spinoza"
    }
  },
  {
    word: "LEIBNIZ",
    hint: "Rationalist of monads, harmony, and sufficient reason.",
    definition: "Leibniz proposes that reality is composed of simple perceiving units called monads. Their coordination is explained by pre established harmony rather than direct interaction. He also defends principles of sufficient reason and identity of indiscernibles.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=leibniz",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=leibniz",
      other: "https://iep.utm.edu/?s=leibniz"
    }
  },
  {
    word: "RUSSELL",
    hint: "Analytic philosopher of logic, language, and description.",
    definition: "Russell helped develop mathematical logic and the analytic method. His theory of descriptions analyzes how language refers without assuming dubious entities. He also wrote on knowledge, science, and social criticism.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=russell",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=russell",
      other: "https://iep.utm.edu/?s=russell"
    }
  },
  {
    word: "BERGSON",
    hint: "Thinker of duration, creativity, and lived time.",
    definition: "Bergson distinguishes spatialized clock time from duration as qualitative lived temporality. He emphasizes creativity and novelty in life processes. His work influenced phenomenology, process thought, and modernist literature.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=bergson",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=bergson",
      other: "https://iep.utm.edu/?s=bergson"
    }
  },
  {
    word: "HUSSERL",
    hint: "Founder of phenomenology and intentional analysis.",
    definition: "Husserl seeks rigorous description of experience as it is given. Through intentional analysis and eidetic variation he studies structures of meaning constitution. His methods shaped major continental movements in the twentieth century.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=husserl",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=husserl",
      other: "https://iep.utm.edu/?s=husserl"
    }
  },
  {
    word: "MENCIUS",
    hint: "Confucian philosopher who defends moral sprouts.",
    definition: "Mencius argues that humans have innate beginnings of compassion and moral discernment. Ethical cultivation develops these sprouts through education and social conditions. His political thought criticizes rulers who ignore human welfare.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=mencius",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=mencius",
      other: "https://iep.utm.edu/?s=mencius"
    }
  },
  {
    word: "MIMESIS",
    hint: "Representation or imitation in art and learning.",
    definition: "Mimesis concerns how artworks represent actions, characters, and worlds. Plato worries that imitation can mislead, while Aristotle gives it cognitive and cathartic value. The debate remains central to aesthetics and media theory.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=mimesis",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=mimesis",
      other: "https://iep.utm.edu/?s=mimesis"
    }
  },
  {
    word: "POIESIS",
    hint: "Bringing forth through creative making.",
    definition: "Poiesis denotes productive creation that brings something into presence. It includes craft, poetry, and forms of disclosure beyond technical control. The term helps distinguish making from acting and contemplating.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=poiesis",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=poiesis",
      other: "https://iep.utm.edu/?s=poiesis"
    }
  },
  {
    word: "NEMESIS",
    hint: "Retributive response that restores broken balance.",
    definition: "Nemesis in Greek thought is corrective distribution against excessive fortune or wrongdoing. It symbolizes moral and cosmic rebalancing rather than private revenge. Philosophers use it to discuss justice and proportionality.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=nemesis",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=nemesis",
      other: "https://iep.utm.edu/?s=nemesis"
    }
  },
  {
    word: "SOPHIST",
    hint: "Professional teacher of rhetoric in classical Greece.",
    definition: "Sophists taught argument, persuasion, and civic skills for public life. Plato criticizes them for prioritizing success over truth. Recent scholarship offers a more nuanced view of their role in democratic culture.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=sophist",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=sophist",
      other: "https://iep.utm.edu/?s=sophist"
    }
  },
  {
    word: "SOPHISM",
    hint: "Fallacious but persuasive pattern of reasoning.",
    definition: "Sophism is argument that appears strong while hiding a logical defect. Studying it trains critical thinking against manipulation. It is a core concern in logic, rhetoric, and political discourse.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=sophism",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=sophism",
      other: "https://iep.utm.edu/?s=sophism"
    }
  },
  {
    word: "SKEPTIC",
    hint: "Questioner who withholds assent without adequate grounds.",
    definition: "Skeptic denotes one who tests claims and resists premature certainty. Ancient skepticism develops techniques for suspending judgment to achieve tranquility. Modern skepticism challenges knowledge claims about the external world, causation, and other minds.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=skeptic",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=skeptic",
      other: "https://iep.utm.edu/?s=skeptic"
    }
  },
  {
    word: "DUALISM",
    hint: "View that two fundamental kinds of reality exist.",
    definition: "Dualism most often claims that mental and physical reality are distinct in kind. It can also appear in moral, metaphysical, and theological forms. The position must explain interaction, dependence, and explanatory fit with science.",
    links: {
      sep: "https://plato.stanford.edu/search/searcher.py?query=dualism",
      wikipedia: "https://en.wikipedia.org/wiki/Special:Search?search=dualism",
      other: "https://iep.utm.edu/?s=dualism"
    }
  }
];
const PHILOSOPHLE = [
  ...WORDS_3,
  ...WORDS_4,
  ...WORDS_5,
  ...WORDS_6,
  ...WORDS_7
];
const ALL_WORDS = PHILOSOPHLE.map((entry) => entry.word);
Object.fromEntries(
  PHILOSOPHLE.map((entry) => [entry.word, entry])
);
const SEED1 = 2166136261;
const SEED2 = 2166136261;
function fnv1a(str, seed) {
  let h = seed >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}
async function loadBloomFilter(url) {
  const buf = await fetch(url).then((r) => {
    if (!r.ok) throw new Error(`Failed to load bloom filter: ${r.status}`);
    return r.arrayBuffer();
  });
  const view = new DataView(buf);
  const m = view.getUint32(0, true);
  const k = view.getUint8(4);
  const bits = new Uint8Array(buf, 5);
  return {
    has(word) {
      const lower = word.toLowerCase();
      const h1 = fnv1a(lower, SEED1);
      const h2 = fnv1a(lower, SEED2);
      for (let i = 0; i < k; i++) {
        const pos = (h1 + i * h2) % m;
        if (!(bits[pos >> 3] & 1 << (pos & 7))) return false;
      }
      return true;
    }
  };
}
const VALID_GAME_WORDS = new Set(ALL_WORDS);
let bloomPromise = null;
function getBloom() {
  if (!bloomPromise) {
    bloomPromise = loadBloomFilter("/assets/words.bloom").catch(() => null);
  }
  return bloomPromise;
}
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function pickWord() {
  return rand(PHILOSOPHLE);
}
function maxGuesses(wordLen) {
  return wordLen === 3 ? 7 : 6;
}
function evaluate(guess, answer) {
  const result = Array(answer.length).fill("absent");
  const ansLeft = answer.split("");
  const gLeft = guess.split("");
  for (let i = 0; i < answer.length; i++) {
    if (gLeft[i] === ansLeft[i]) {
      result[i] = "correct";
      ansLeft[i] = null;
      gLeft[i] = null;
    }
  }
  for (let i = 0; i < guess.length; i++) {
    if (gLeft[i] === null) continue;
    const idx = ansLeft.indexOf(gLeft[i]);
    if (idx !== -1) {
      result[i] = "present";
      ansLeft[idx] = null;
    }
  }
  return result;
}
function buildKeyState(rows) {
  const state = {};
  const priority = { correct: 3, present: 2, absent: 1 };
  for (const { letters, result } of rows) {
    letters.split("").forEach((ch, i) => {
      const prev = priority[state[ch]] ?? 0;
      const next = priority[result[i]] ?? 0;
      if (next > prev) state[ch] = result[i];
    });
  }
  return state;
}
function Cell({ letter, state, active, cellSize }) {
  let bg = "bg-cream dark:bg-[#0E1A14]";
  let border = "border-gold/20";
  let text = "text-ink";
  if (state === "correct") {
    bg = "bg-[#6AAA64]";
    border = "border-[#6AAA64]";
    text = "text-cream";
  } else if (state === "present") {
    bg = "bg-[#C9B458]";
    border = "border-[#C9B458]";
    text = "text-cream";
  } else if (state === "absent") {
    bg = "bg-ink/15 dark:bg-ink/20";
    border = "border-transparent";
    text = "text-ink/60 dark:text-ink/50";
  } else if (letter) {
    border = "border-gold/60";
  }
  const activeRing = active ? "ring-1 ring-gold/40" : "";
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `flex items-center justify-center rounded border-2 font-mono font-semibold uppercase select-none transition-colors duration-300 ${bg} ${border} ${text} ${activeRing}`,
      style: {
        width: cellSize,
        height: cellSize,
        fontSize: cellSize * 0.45
      },
      children: letter
    }
  );
}
function Grid({ wordLen, rows, currentInput, maxRows }) {
  const cellSize = wordLen <= 5 ? 56 : wordLen === 6 ? 48 : 42;
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-1.5", children: Array.from({ length: maxRows }, (_, rowIdx) => {
    const submitted = rows[rowIdx];
    const isCurrent = !submitted && rowIdx === rows.length;
    return /* @__PURE__ */ jsx("div", { className: "flex gap-1.5", children: Array.from({ length: wordLen }, (__, colIdx) => {
      let letter = "";
      let state = null;
      if (submitted) {
        letter = submitted.letters[colIdx];
        state = submitted.result[colIdx];
      } else if (isCurrent) {
        letter = currentInput[colIdx] || "";
      }
      return /* @__PURE__ */ jsx(
        Cell,
        {
          letter,
          state,
          active: isCurrent && colIdx === currentInput.length && currentInput.length < wordLen,
          cellSize
        },
        colIdx
      );
    }) }, rowIdx);
  }) });
}
const KB_ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"]
];
function Keyboard({ keyState, onKey }) {
  function getStyle(key) {
    const s = keyState[key];
    if (s === "correct") return "bg-[#6AAA64] text-cream border-transparent";
    if (s === "present") return "bg-[#C9B458] text-cream border-transparent";
    if (s === "absent")
      return "bg-ink/15 dark:bg-ink/20 text-ink/40 border-transparent";
    return "bg-cream-dark dark:bg-[#1A2A20] text-ink border-gold/20 hover:border-gold/40";
  }
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center gap-1.5 mt-6 select-none", children: KB_ROWS.map((row, ri) => /* @__PURE__ */ jsx("div", { className: "flex gap-1", children: row.map((key) => {
    const isWide = key === "ENTER" || key === "⌫";
    return /* @__PURE__ */ jsx(
      "button",
      {
        onPointerDown: (e) => {
          e.preventDefault();
          onKey(key);
        },
        className: `rounded border font-mono text-xs font-semibold uppercase transition-colors duration-150 ${getStyle(key)} ${isWide ? "px-2.5 py-3 min-w-[3rem]" : "w-9 h-10"}`,
        children: key
      },
      key
    );
  }) }, row[0])) });
}
function GameBoard({ entry, onNewGame }) {
  const answer = entry.word;
  const wordLen = answer.length;
  const totalGuesses = maxGuesses(wordLen);
  const [rows, setRows] = useState([]);
  const [current, setCurrent] = useState("");
  const [status, setStatus] = useState("playing");
  const [shake, setShake] = useState(false);
  const [badWord, setBadWord] = useState(false);
  const [bloom, setBloom] = useState(null);
  useEffect(() => {
    getBloom().then(setBloom);
  }, []);
  const keyState = buildKeyState(rows);
  const submitGuess = useCallback(() => {
    if (current.length !== wordLen) {
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    if (!VALID_GAME_WORDS.has(current)) {
      if (bloom && !bloom.has(current)) {
        setShake(true);
        setBadWord(true);
        setTimeout(() => {
          setShake(false);
          setBadWord(false);
        }, 1400);
        return;
      }
    }
    const result = evaluate(current, answer);
    const newRows = [...rows, { letters: current, result }];
    setRows(newRows);
    setCurrent("");
    if (current === answer) {
      setStatus("win");
    } else if (newRows.length >= totalGuesses) {
      setStatus("lose");
    }
  }, [current, wordLen, answer, rows, totalGuesses, bloom]);
  const handleKey = useCallback(
    (key) => {
      if (status !== "playing") return;
      if (key === "⌫" || key === "Backspace") {
        setCurrent((c) => c.slice(0, -1));
      } else if (key === "ENTER" || key === "Enter") {
        submitGuess();
      } else if (/^[A-Z]$/i.test(key) && current.length < wordLen) {
        setCurrent((c) => (c + key).toUpperCase());
      }
    },
    [status, current, wordLen, submitGuess]
  );
  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKey]);
  const attemptsLeft = totalGuesses - rows.length;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("div", { className: shake ? "animate-shake" : "", children: /* @__PURE__ */ jsx(
      Grid,
      {
        wordLen,
        rows,
        currentInput: current,
        maxRows: totalGuesses
      }
    ) }),
    badWord && /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest text-terracotta/80 mt-3", children: "not in word list" }),
    status === "playing" && !badWord && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("p", { className: "font-mono text-xs text-ink/35 mt-4 tracking-wide", children: [
        attemptsLeft,
        " ",
        attemptsLeft === 1 ? "guess" : "guesses",
        " remaining ·",
        " ",
        wordLen,
        " letters",
        wordLen === 3 && " · +1 extra guess"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 max-w-xl text-center font-body text-sm text-ink/65 leading-relaxed", children: [
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs uppercase tracking-widest text-gold/80 mr-2", children: "Hint" }),
        entry.hint
      ] })
    ] }),
    status === "win" && /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full max-w-xl bg-green/10 border border-green/30 rounded-lg px-5 py-4 text-center animate-pop-in", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-green/70 mb-1", children: "Correct" }),
      /* @__PURE__ */ jsx("p", { className: "font-heading text-2xl font-light text-green mb-2", children: answer }),
      /* @__PURE__ */ jsxs("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: [
        "Solved in ",
        rows.length,
        " ",
        rows.length === 1 ? "guess" : "guesses",
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/70 leading-relaxed mt-3", children: entry.definition }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 font-mono text-xs tracking-wide", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-green hover:underline mr-3",
            href: entry.links.sep,
            target: "_blank",
            rel: "noreferrer",
            children: "SEP"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-green hover:underline mr-3",
            href: entry.links.wikipedia,
            target: "_blank",
            rel: "noreferrer",
            children: "Wikipedia"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-green hover:underline",
            href: entry.links.other,
            target: "_blank",
            rel: "noreferrer",
            children: "More"
          }
        )
      ] })
    ] }),
    status === "lose" && /* @__PURE__ */ jsxs("div", { className: "mt-5 w-full max-w-xl bg-terracotta/8 border border-terracotta/25 rounded-lg px-5 py-4 text-center animate-pop-in", children: [
      /* @__PURE__ */ jsx("p", { className: "font-mono text-xs tracking-widest uppercase text-terracotta/70 mb-1", children: "Not quite" }),
      /* @__PURE__ */ jsx("p", { className: "font-heading text-2xl font-light text-ink mb-2", children: answer }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/65 leading-relaxed", children: "Better luck with the next one." }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/70 leading-relaxed mt-3", children: entry.definition }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 font-mono text-xs tracking-wide", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-terracotta hover:underline mr-3",
            href: entry.links.sep,
            target: "_blank",
            rel: "noreferrer",
            children: "SEP"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-terracotta hover:underline mr-3",
            href: entry.links.wikipedia,
            target: "_blank",
            rel: "noreferrer",
            children: "Wikipedia"
          }
        ),
        /* @__PURE__ */ jsx(
          "a",
          {
            className: "text-terracotta hover:underline",
            href: entry.links.other,
            target: "_blank",
            rel: "noreferrer",
            children: "More"
          }
        )
      ] })
    ] }),
    status !== "playing" && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onNewGame,
        className: "mt-4 px-5 py-2.5 rounded-lg border border-gold/40 bg-cream dark:bg-cream-dark font-body text-sm text-ink/70 hover:border-gold hover:text-ink transition-colors duration-150",
        children: "New word"
      }
    ),
    /* @__PURE__ */ jsx(Keyboard, { keyState, onKey: handleKey })
  ] });
}
function GamePhilosophle() {
  const [gameKey, setGameKey] = useState(0);
  const [entry, setEntry] = useState(() => pickWord());
  const [showIntro, setShowIntro] = useState(true);
  function handleNewGame() {
    setEntry(pickWord());
    setGameKey((k) => k + 1);
  }
  return /* @__PURE__ */ jsxs("div", { className: "pt-20 animate-on-load", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Philosophle",
        path: "/games/philosophle",
        description: "A Wordle-style game using philosophical terms — concepts, thinkers, and Greek roots from 3 to 7 letters."
      }
    ),
    showIntro && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-6 bg-ink/55 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-xl rounded-xl border border-gold/25 bg-cream dark:bg-cream-dark shadow-xl p-6 md:p-7 animate-pop-in", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-heading font-light text-2xl text-green mb-2", children: "How to play" }),
      /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/70 leading-relaxed mb-5", children: "Guess the hidden philosophical term — a concept, thinker, or Greek root between 3 and 7 letters. Green means the letter is in the right place; yellow means it appears somewhere else in the word. Three-letter words get an extra guess." }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 md:gap-6 flex-wrap mb-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded bg-[#6AAA64] flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-bold text-cream", children: "A" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-ink/55 tracking-wide", children: "Correct position" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded bg-[#C9B458] flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-bold text-cream", children: "A" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-ink/55 tracking-wide", children: "Wrong position" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-7 h-7 rounded bg-ink/15 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "font-mono text-xs font-bold text-ink/50", children: "A" }) }),
          /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-ink/55 tracking-wide", children: "Not in word" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowIntro(false),
          className: "px-4 py-2 rounded-lg border border-gold/45 bg-cream-dark/30 dark:bg-ink/10 font-mono text-xs tracking-wider uppercase text-ink/80 hover:border-gold hover:text-ink transition-colors duration-150",
          children: "Start game"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "max-w-2xl mx-auto px-6 py-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/games",
            className: "font-mono text-xs tracking-widest uppercase text-gold/70 hover:text-gold transition-colors duration-150",
            children: "← Games"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "text-gold/30", children: "/" }),
        /* @__PURE__ */ jsx("span", { className: "font-mono text-xs tracking-widest uppercase text-ink/40", children: "Philosophle" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-px w-12 bg-gold/40" })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "max-w-2xl mx-auto px-6 py-8 pb-20", children: /* @__PURE__ */ jsx(
      GameBoard,
      {
        entry,
        onNewGame: handleNewGame
      },
      gameKey
    ) })
  ] });
}
const SCENARIOS = [
  {
    yr: 1907,
    loc: "Stumpergasse 31, Vienna, Austria-Hungary",
    role: "You are a laundress who collects and returns washing for the pension residents.",
    ctx: "One of your regular customers — a young man the other tenants call Adi — is in a state this morning. He has an art portfolio submission today at the Academy on Schillerplatz. His leather portfolio case got soaked three days ago while he was painting outdoors in the rain. You've been drying it in your back room. It's mostly dry now but still stiff along the hinges.",
    q: "He's at the door early, looking anxious. Do you hand over the case?",
    ch: [
      {
        t: `"Here you are — it'll do fine."`,
        s: "He needs it this morning",
        ct: "The rejection",
        chain: [
          "He takes the case and goes straight to the examination hall on Schillerplatz.",
          "The committee reviews his portfolio. His architectural sketches are noted as capable. His figure studies are considered too stiff. The vote is three against, two in favour.",
          "He receives the rejection letter that evening at his lodgings. He reads it twice and sets it down on the table.",
          "Over the following years he drifts between men's shelters, reads political pamphlets, attends open-air rallies. He discovers he can hold a crowd still when he speaks.",
          "By 1919 he has found his vocation. It is not painting."
        ],
        dv: 0,
        tg: "History intact",
        tc: "ok"
      },
      {
        t: `"Come back this afternoon — another hour and it'll be properly dry."`,
        s: "You don't want to ruin his drawings",
        ct: "The admission",
        chain: [
          "Frustrated, he spends the morning in his room practising figure drawings — he has nothing else to do while he waits.",
          "He comes back for the case at two o'clock. The submission deadline has passed.",
          "He reapplies the following year, October 1908, with noticeably improved figure work.",
          "A different examining committee is convened. A professor who was absent in 1907 casts the deciding vote in favour.",
          "He studies fine art. He moves to Munich in 1913 and works as a commercial illustrator. He enlists in 1914 like millions of others. He survives the war and returns to his drawings.",
          "In 1919, a small political party in a Munich beer hall is looking for someone with a gift for speaking to crowds. They find someone else."
        ],
        dv: 82,
        tg: "Massively divergent",
        tc: "hi"
      }
    ]
  },
  {
    yr: 1914,
    loc: "Schiller's Delicatessen, Franz Josef Street, Sarajevo, Bosnia",
    role: "You are a customer picking up a Sunday morning order.",
    ctx: "It's just after ten in the morning and the shop is busy. A young man in a dark jacket has been standing in the doorway for the past quarter-hour, half inside and half outside, nursing what appears to be cold coffee. He's blocking the entrance — you have to squeeze past him to leave. An open motorcade passed this street about an hour ago heading for the town hall. You heard some commotion further down the route earlier, but it passed.",
    q: "You're trying to get out with your arms full. Do you ask him to step aside?",
    ch: [
      {
        t: '"Excuse me — could you move a little?"',
        s: "You need to get past",
        ct: "The missed shot",
        chain: [
          "He shuffles apologetically a few steps down the street.",
          "He is now standing in front of the butcher's next door — not the delicatessen doorway.",
          "Eleven minutes later, an open motorcar comes back down Franz Josef Street. The motorcade took a wrong turn; the driver has stalled the engine trying to reverse.",
          "The car stops about twenty feet from where the young man now stands. The crowd is thick. He cannot reach it.",
          "The driver corrects the car and it moves on. The Archduke continues toward the hospital.",
          "The assassination attempt — the second of the morning — does not happen. The alliance system does not activate this summer.",
          "The war may come by other means; the pressures that built it are still there. But not today, and not from this doorway."
        ],
        dv: 72,
        tg: "Heavily divergent",
        tc: "hi"
      },
      {
        t: "You squeeze around him without saying anything.",
        s: "Not worth the bother",
        ct: "The wrong turn",
        chain: [
          "He stays exactly where he is, in the doorway of Schiller's.",
          "Eleven minutes later, the Archduke's motorcade returns down Franz Josef Street after taking the wrong turn.",
          "The lead driver, confused by new instructions shouted from behind, stalls the engine directly in front of the delicatessen.",
          "The young man is less than two metres from the open car. He has been waiting since before nine o'clock.",
          "He steps forward. Two shots are fired.",
          "The alliance system begins to move. By August, every major power in Europe is at war."
        ],
        dv: 0,
        tg: "History intact",
        tc: "ok"
      }
    ]
  },
  {
    yr: 1928,
    loc: "St Mary's Hospital, Praed Street, Paddington, London",
    role: "You are a junior lab assistant in the mycology department on the ground floor.",
    ctx: "August, and the building is mostly empty — your supervisor, Dr La Touche, and the bacteriologist upstairs — everyone calls him Alec — are both on holiday for the month. The stairwell door connecting your floor to the shared corridor has been propped open all summer; your supervisor never closes it. Today there is a sharp smell coming off Praed Street and you've been meaning to do something about it. Your lab's open mould cultures are sitting out on the bench as usual.",
    q: "Do you close the stairwell door?",
    ch: [
      {
        t: "Close it — the smell is unbearable today.",
        s: "Takes two seconds",
        ct: "The sealed stairwell",
        chain: [
          "The door closes. The mould cultures on La Touche's bench continue releasing spores, as they have all summer.",
          "The spores have nowhere to go. They settle on the ground floor.",
          "Upstairs, the bacteriologist's uncovered petri dishes — left on his bench before his holiday — remain uncontaminated.",
          "When Alec returns from holiday in early September, he finds his cultures exactly as he left them. Unremarkable. He cleans up and starts a new series.",
          "The observation is never made. The discovery waits for someone else, somewhere else, to be lucky enough and curious enough at the same moment."
        ],
        dv: 63,
        tg: "Significantly divergent",
        tc: "hi"
      },
      {
        t: "Leave it — not really your floor, not really your door.",
        s: "You have enough to do",
        ct: "The open door",
        chain: [
          "The stairwell stays open throughout August. Spores from La Touche's mould cultures drift upward through the shared corridor.",
          "One settles on an uncovered petri dish on Alec's bench, two floors up. The cool August temperatures allow it to grow before the bacteria do.",
          "When Alec returns to the lab in September, one dish has a clear ring of dead bacteria around the mould colony.",
          `"That's funny," he says to his assistant, and does not throw the dish away.`,
          "He identifies the mould as a Penicillium species. He publishes his findings the following spring. His paper is largely ignored for a decade.",
          "In 1939, two researchers at Oxford read the paper and decide it deserves a second look."
        ],
        dv: 0,
        tg: "History intact",
        tc: "ok"
      }
    ]
  },
  {
    yr: 1933,
    loc: "Southampton Row, Bloomsbury, London",
    role: "You run a newspaper pitch outside the hotel most mornings.",
    ctx: "Tuesday, September 12th. A dull, grey morning, a trace of last night's rain on the pavement. A compact, irritable-looking man — Hungarian, you'd say from his accent — comes through the hotel's revolving doors just after nine, heading somewhere with the air of a person who has no particular destination. He asks if you have The Times. You've got one copy left on the cart, held back for a regular who hasn't shown up yet.",
    q: "Do you sell him the last copy?",
    ch: [
      {
        t: '"Here you go — tuppence."',
        s: "The regular will find one elsewhere",
        ct: "The red light at Russell Square",
        chain: [
          "He takes the paper and walks north along Southampton Row, reading as he goes.",
          "He stops under a streetlamp to finish a column near the front. Lord Rutherford, in a speech at the British Association, has dismissed the idea of extracting practical energy from atoms as 'moonshine'.",
          "He crumples the front page. He finds this deeply irritating.",
          "He crosses Montague Place still muttering. At the corner of Southampton Row and Russell Square, the light is red.",
          "He stands there stewing, and his mind wanders into the physics of it. What if a single neutron could dislodge two more from a nucleus? What if those two dislodged four more? What if the mass were large enough?",
          "The light changes. He steps off the kerb.",
          "He files for a British patent the following March and has it classified secret. Six years later, two groups at Columbia University confirm the chain reaction experimentally."
        ],
        dv: 0,
        tg: "History intact",
        tc: "ok"
      },
      {
        t: `"Sorry — that one's spoken for. Try the newsagent on Holborn."`,
        s: "You point up the street",
        ct: "A pleasant walk",
        chain: [
          "He shrugs and walks off without a paper, taking a back route through the Bloomsbury squares.",
          "He thinks about a refrigerator problem he's been stuck on. It's a dull morning but not unpleasant.",
          "He gets coffee at a Lyons corner house on High Holborn and reads a discarded copy of yesterday's Evening Standard. Nothing in it particularly interests him.",
          "He returns to the hotel before noon, orders a large lunch, and reads. The spark does not come.",
          "The insight arrives eventually — in a different city, five months later, prompted by a different article.",
          "The patent application is filed in the spring of 1934. The delay is small, but the theoretical groundwork for the project in Chicago in December 1942 has a different shape."
        ],
        dv: 30,
        tg: "Somewhat divergent",
        tc: "lo"
      }
    ]
  },
  {
    yr: 1955,
    loc: "Court Square, Montgomery, Alabama",
    role: "You sell evening papers from a pitch near the Empire Theatre bus stop.",
    ctx: "Thursday, December 1st, coming on six o'clock. You know most of the regulars on this corner. Rosa, who works as a seamstress at the department store up the street, usually picks up a paper on her way to the bus. She's walking toward the stop right now. You happen to know — because she mentioned it once, two or three years ago — that she made herself a promise never to ride a bus driven by a particular driver after an incident in 1943. You can read the route sign from here. It's his bus.",
    q: "Do you call out to her?",
    ch: [
      {
        t: `"Rosa — that's the 2857, isn't it? Blake's bus."`,
        s: "She'd want to know",
        ct: "The next bus",
        chain: [
          "She stops. She looks at the route number. She recognises it.",
          "She stays on the kerb. The next bus on the route arrives four minutes later. She boards and rides home without incident.",
          "She has dinner. She goes to bed early.",
          "The NAACP has been waiting nine months for the right test case. They continue waiting.",
          "The case they eventually bring is in different circumstances, with thinner press coverage and a less unified community response.",
          "A boycott begins, but later, and with less momentum. The 26-year-old minister at Dexter Avenue Baptist Church waits another year to be asked to lead anything."
        ],
        dv: 38,
        tg: "Notably divergent",
        tc: "lo"
      },
      {
        t: "You keep your eyes on your stack of papers.",
        s: "Not really your business",
        ct: "The arrest",
        chain: [
          "She boards without noticing the route number.",
          "She takes the first available seat in the coloured section, first row.",
          "The bus fills. At the third stop the driver walks back. He addresses the row.",
          "Three passengers stand. She does not.",
          '"You may do that," she replies when he says he will have her arrested.',
          "Two police officers arrive at 6:06 in the evening.",
          "By the following morning, 52,000 leaflets are being passed hand to hand across the city."
        ],
        dv: 0,
        tg: "History intact",
        tc: "ok"
      }
    ]
  },
  {
    yr: 1962,
    loc: "Soviet submarine B-59, North Atlantic, 90 metres",
    role: "You are a machinist's mate. The boat has been submerged for four days.",
    ctx: "October 27th. American destroyers have been depth-charging you for eleven hours. The air conditioning compressors failed yesterday — a bearing seized. The temperature inside the boat is above 45 degrees. The CO₂ is climbing. Men are making errors. An hour ago you found the replacement bearing in the aft spares locker. You could have the compressor running again in four hours — but the chief engineer said to wait for his authorisation, and he's been inside the officers' briefing since morning with the Flotilla Commander and the captain.",
    q: "Do you start the repair without orders?",
    ch: [
      {
        t: "You start the repair. The crew can't function like this much longer.",
        s: "Ask forgiveness, not permission",
        ct: "The clear air",
        chain: [
          "Four hours later, the first compressor kicks on. Cold air begins moving through the forward section.",
          "In the officers' mess, the Flotilla Commander — a heavy, deliberate man who has barely spoken in two days — straightens up from the chart table and asks for tea.",
          "When the captain calls a meeting to discuss the torpedo authorisation, the Flotilla Commander sits across from him and speaks for four minutes. His reasoning is clear and unhurried.",
          "He will not countersign. The launch requires all three senior officers. Without his signature, the procedure cannot proceed.",
          "At 20:11, the submarine surfaces. Signal flags are raised. An American destroyer acknowledges from 500 metres.",
          "The crisis passes. No one on the surface ever learns how close it came."
        ],
        dv: 0,
        tg: "History intact",
        tc: "ok"
      },
      {
        t: "You wait. You don't want trouble for going around the chain of command.",
        s: "The chief engineer said to wait",
        ct: "The launch",
        chain: [
          "The temperature continues to climb. By late afternoon, most of the crew are operating at a significantly impaired capacity.",
          "At 16:59, in the officers' mess, the captain calls for a final vote on the torpedo authorisation. The political officer has already signed.",
          "The Flotilla Commander starts to object. He has been awake for forty hours in 45-degree heat. He loses the thread halfway through his argument. He asks the captain to repeat something. The captain does not repeat it.",
          "The pen is placed in front of the Flotilla Commander.",
          "He looks at it for a long time.",
          "He picks it up.",
          "The torpedo is in the water at 17:04."
        ],
        dv: 100,
        tg: "Catastrophic",
        tc: "hi"
      }
    ]
  },
  {
    yr: 1979,
    loc: "Xerox PARC, Coyote Hill Road, Palo Alto, California",
    role: "You are a security guard on duty in the second-floor corridor.",
    ctx: "A delegation from a computer company in Cupertino has been touring the facility. Their leader — a young man in his mid-twenties with dark, unblinking eyes who hasn't stopped asking questions — has broken off from the group. You've found him standing in the open doorway of Demo Room C, watching a researcher walk through a live session on the Alto workstation: the mouse, the graphical windows, the text editing. He is not supposed to be in this wing.",
    q: "Do you redirect him back to the tour group?",
    ch: [
      {
        t: '"Sir, I need to ask you to come with me."',
        s: "You steer him back toward the lobby",
        ct: "The partial glimpse",
        chain: [
          "He's seen roughly twenty seconds of the demonstration through the open doorway — the screen, but not the mouse interaction.",
          "On the flight home he keeps asking his chief designer what he thought they'd seen. The designer is non-committal.",
          "The machine that ships from Cupertino in 1983 is close to the right idea, but something is not quite understood. The interface feels approximated rather than inhabited.",
          "A different company — which had a longer and more detailed demonstration of the same workstation — ships a cleaner implementation six months earlier.",
          "The personal computer revolution still arrives. It comes from a slightly different direction, with a different face on it."
        ],
        dv: 44,
        tg: "Significantly divergent",
        tc: "hi"
      },
      {
        t: "You look the other way. It's nearly end of shift.",
        s: "He seems harmless enough",
        ct: "The eleven minutes",
        chain: [
          "He stays in the doorway for eleven minutes while the researcher walks through the full session.",
          "He sees the mouse move a cursor across the screen. He sees pull-down menus appear and disappear. He sees text edited live. He sees windows opened side by side.",
          `He keeps saying, quietly: "Why aren't you doing anything with this?"`,
          "In the car on the way back to Cupertino he is almost incoherent. His colleagues have rarely seen him like this.",
          "The machine that ships from Cupertino four years later is built around one idea: that the computer should work the way thinking already works.",
          "It changes what personal computers look like for the next four decades."
        ],
        dv: 0,
        tg: "History intact",
        tc: "ok"
      }
    ]
  }
];
const VERDICTS = [
  {
    max: 25,
    v: "Faithful Keeper",
    d: "You changed almost nothing. History proceeded as recorded — the same wars, the same breakthroughs, the same figures on the stamps and the statues. Whether that's wisdom, caution, or just chance is difficult to say from the outside."
  },
  {
    max: 90,
    v: "Quiet Meddler",
    d: "You loosened a few threads, but the weave held. Most of what was going to happen still happened. The changes you introduced are small enough that their effects are still radiating outward — no one in that timeline yet knows anything is different."
  },
  {
    max: 200,
    v: "Unintended Architect",
    d: "Several load-bearing events have been displaced. The century you've left behind is recognisable but not identical — different technologies, different turning points, a different set of people remembered. Whether the substitution is an improvement is not obvious from where you're standing."
  },
  {
    max: 310,
    v: "Committed Revisionist",
    d: "You made significant interventions. At least one thing that was going to happen no longer will. At least one thing that didn't happen now may. The downstream effects are still unfolding. You hope you understood what you were doing."
  },
  {
    max: 9999,
    v: "Full Unravelling",
    d: "The timeline you entered no longer exists in any recognisable form. What you've left behind is structurally different from the world you came from. There is no way to verify whether the substitution is better. There is no way to go back and check."
  }
];
const styles$1 = `
:root {
  --bg: #0c0c09;
  --surface: #141410;
  --surface2: #1c1c17;
  --border: #262620;
  --border2: #32322a;
  --text: #e0dbc8;
  --text2: #8a8574;
  --text3: #504e42;
  --gold: #c49535;
  --gold-dim: #6b5018;
  --gold-bg: #191408;
  --red: #8a2525;
  --red-bg: #170a0a;
  --red-text: #c07070;
  --green: #3a6840;
  --green-bg: #0a150c;
  --green-text: #70b07a;
  --amber-text: #d4a850;
  --ff-serif: 'Palatino Linotype', Palatino, 'Book Antiqua', Georgia, serif;
  --ff-mono: 'Courier New', Courier, monospace;
  --ff-sans: 'Segoe UI', system-ui, -apple-system, sans-serif;
  --r: 8px;
  --rl: 14px;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.butterfly-shell {
  background: var(--bg);
  color: var(--text);
  font-family: var(--ff-serif);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2.5rem 1.25rem 4rem;
  line-height: 1.7;
  background-image: radial-gradient(ellipse 900px 600px at 50% -100px, rgba(140,100,20,0.07) 0%, transparent 70%);
}

.butterfly-game { max-width: 680px; width: 100%; }
.intro { padding: 3rem 0 2rem; }
.intro-eyebrow { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.2em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 1.25rem; }
.intro-title { font-size: clamp(32px, 6vw, 48px); font-weight: normal; color: var(--text); letter-spacing: -0.01em; line-height: 1.1; margin-bottom: 0.75rem; }
.intro-title em { font-style: italic; color: var(--gold); }
.intro-rule { width: 48px; height: 1px; background: var(--gold-dim); margin: 1.5rem 0; }
.intro-body { font-size: 15px; color: var(--text2); line-height: 1.9; max-width: 520px; margin-bottom: 2.5rem; }
.intro-body p + p { margin-top: 1.1rem; }
.intro-body strong { color: var(--text); font-weight: normal; font-style: italic; }
.start-btn { background: transparent; border: 1px solid var(--gold-dim); border-radius: var(--r); padding: 11px 32px; font-family: var(--ff-serif); font-size: 15px; color: var(--gold); cursor: pointer; letter-spacing: 0.04em; transition: background 0.18s, border-color 0.18s, color 0.18s; }
.start-btn:hover { background: var(--gold-bg); border-color: var(--gold); color: var(--amber-text); }
.progress { display: flex; align-items: center; gap: 5px; margin-bottom: 2.75rem; }
.pdot { width: 7px; height: 7px; border-radius: 50%; background: var(--border2); flex-shrink: 0; transition: background 0.4s; }
.pdot.done { background: var(--gold-dim); }
.pdot.now { background: var(--gold); box-shadow: 0 0 0 3px rgba(196,149,53,0.18); }
.pline { flex: 1; height: 1px; background: var(--border); }
.pcnt { font-family: var(--ff-mono); font-size: 10px; color: var(--text3); margin-left: 6px; white-space: nowrap; }
.yr-badge { font-family: var(--ff-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--gold); background: var(--gold-bg); border: 1px solid var(--gold-dim); padding: 3px 10px; border-radius: var(--r); display: inline-block; margin-bottom: 5px; }
.loc { font-family: var(--ff-sans); font-size: 11px; color: var(--text3); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 2rem; }
.role-label { font-family: var(--ff-sans); font-size: 10px; letter-spacing: 0.14em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 5px; }
.role-text { font-size: 16px; color: var(--text); line-height: 1.55; margin-bottom: 1.25rem; }
.ctx-block { font-size: 15px; color: var(--text2); line-height: 1.85; border-left: 2px solid var(--gold-dim); padding-left: 1.25rem; margin-bottom: 1.5rem; }
.question { font-size: 16px; font-style: italic; color: var(--text); margin-bottom: 1.5rem; line-height: 1.6; }
.choices { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 0.5rem; }
.ch { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--rl); padding: 1rem 1.25rem; cursor: pointer; text-align: left; color: var(--text); font-family: var(--ff-serif); transition: border-color 0.15s, background 0.15s, transform 0.1s; width: 100%; }
.ch:not(:disabled):hover { border-color: var(--gold-dim); background: var(--gold-bg); transform: translateY(-2px); }
.ch:active:not(:disabled) { transform: translateY(0); }
.ch:disabled { cursor: default; transform: none; }
.ch-t { font-size: 14px; font-weight: normal; font-style: italic; color: var(--text); margin-bottom: 4px; line-height: 1.4; }
.ch-s { font-family: var(--ff-sans); font-size: 12px; color: var(--text3); }
.ch.chosen { border-color: var(--gold); background: var(--gold-bg); }
.ch.chosen .ch-t { color: var(--amber-text); }
.con-box { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--rl); padding: 1.5rem; margin-bottom: 1.25rem; }
.con-top { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding-bottom: 1rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); }
.con-title { font-size: 18px; font-style: italic; color: var(--text); line-height: 1.3; }
.tag { font-family: var(--ff-sans); font-size: 10px; padding: 3px 8px; border-radius: var(--r); font-weight: 600; white-space: nowrap; flex-shrink: 0; letter-spacing: 0.06em; text-transform: uppercase; margin-top: 3px; }
.tag-ok { background: var(--green-bg); color: var(--green-text); border: 1px solid var(--green); }
.tag-lo { background: var(--gold-bg); color: var(--amber-text); border: 1px solid var(--gold-dim); }
.tag-hi { background: var(--red-bg); color: var(--red-text); border: 1px solid var(--red); }
.chain { margin-bottom: 1.25rem; }
.chain-step { display: flex; gap: 10px; align-items: baseline; padding: 0.55rem 0; border-bottom: 1px solid var(--border); font-size: 14px; color: var(--text2); line-height: 1.7; }
.chain-step:last-child { border-bottom: none; color: var(--text); font-style: italic; }
.chain-arrow { font-family: var(--ff-mono); font-size: 11px; color: var(--gold-dim); flex-shrink: 0; margin-top: 0.15rem; }
.dbar-wrap { padding-top: 1.25rem; border-top: 1px solid var(--border); }
.dbar-label { font-family: var(--ff-sans); font-size: 11px; color: var(--text3); display: flex; justify-content: space-between; margin-bottom: 6px; }
.dbar-track { height: 3px; background: var(--border2); border-radius: 2px; overflow: hidden; }
.dbar-fill { height: 100%; border-radius: 2px; width: 0%; transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes bfFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
.con-box { animation: bfFadeUp 0.35s ease both; }
.chain-step:nth-child(1) { animation: bfFadeUp 0.28s 0.05s ease both; }
.chain-step:nth-child(2) { animation: bfFadeUp 0.28s 0.13s ease both; }
.chain-step:nth-child(3) { animation: bfFadeUp 0.28s 0.21s ease both; }
.chain-step:nth-child(4) { animation: bfFadeUp 0.28s 0.29s ease both; }
.chain-step:nth-child(5) { animation: bfFadeUp 0.28s 0.37s ease both; }
.chain-step:nth-child(6) { animation: bfFadeUp 0.28s 0.45s ease both; }
.chain-step:nth-child(7) { animation: bfFadeUp 0.28s 0.53s ease both; }
.next-btn { width: 100%; background: transparent; border: 1px solid var(--border2); border-radius: var(--r); padding: 11px; font-family: var(--ff-serif); font-size: 14px; font-style: italic; color: var(--text3); cursor: pointer; transition: border-color 0.15s, color 0.15s, background 0.15s; }
.next-btn:hover { border-color: var(--gold-dim); color: var(--text2); background: var(--surface2); }
.end-page { padding: 2.5rem 0; }
.end-eyebrow { font-family: var(--ff-mono); font-size: 10px; letter-spacing: 0.2em; color: var(--text3); text-transform: uppercase; margin-bottom: 0.75rem; }
.end-title { font-size: 28px; font-weight: normal; color: var(--text); margin-bottom: 0.4rem; }
.end-sub { font-family: var(--ff-sans); font-size: 12px; color: var(--text3); font-style: italic; margin-bottom: 2.5rem; }
.end-card { background: var(--surface); border: 1px solid var(--border2); border-radius: var(--rl); padding: 1.75rem; margin-bottom: 1.5rem; }
.end-verdict { font-size: 22px; font-style: italic; color: var(--gold); margin-bottom: 1rem; }
.end-desc { font-size: 15px; color: var(--text2); line-height: 1.85; margin-bottom: 1.75rem; padding-bottom: 1.75rem; border-bottom: 1px solid var(--border); }
.log-row { display: grid; grid-template-columns: 44px 1fr auto; gap: 10px; align-items: baseline; padding: 0.6rem 0; border-bottom: 1px solid var(--border); font-size: 13px; }
.log-row:last-child { border-bottom: none; }
.log-yr { font-family: var(--ff-mono); font-size: 10px; color: var(--gold-dim); }
.log-ch { color: var(--text2); font-style: italic; line-height: 1.4; }
.log-dv { font-family: var(--ff-mono); font-size: 10px; white-space: nowrap; flex-shrink: 0; }
.dv-ok { color: var(--green-text); }
.dv-lo { color: var(--amber-text); }
.dv-hi { color: var(--red-text); }
.replay-btn { background: transparent; border: 1px solid var(--gold-dim); border-radius: var(--r); padding: 11px 28px; font-family: var(--ff-serif); font-size: 14px; color: var(--gold); cursor: pointer; transition: background 0.18s; }
.replay-btn:hover { background: var(--gold-bg); }
@media (max-width: 480px) {
  .choices { grid-template-columns: 1fr; }
  .log-row { grid-template-columns: 40px 1fr; }
  .log-dv { display: none; }
}
`;
function GameButterflyJob() {
  const [screen, setScreen] = useState("intro");
  const [cur, setCur] = useState(0);
  const [total, setTotal] = useState(0);
  const [phase, setPhase] = useState("decide");
  const [picked, setPicked] = useState(null);
  const [log, setLog] = useState([]);
  const [barWidth, setBarWidth] = useState(0);
  const scenario = SCENARIOS[cur];
  const pickedChoice = picked === null ? null : scenario.ch[picked];
  useEffect(() => {
    if (phase !== "consequence" || !pickedChoice) return;
    setBarWidth(0);
    const f1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => setBarWidth(pickedChoice.dv));
    });
    return () => cancelAnimationFrame(f1);
  }, [phase, pickedChoice]);
  const verdict = useMemo(
    () => VERDICTS.find((x) => total <= x.max) ?? VERDICTS[VERDICTS.length - 1],
    [total]
  );
  function startGame() {
    setScreen("game");
    setCur(0);
    setTotal(0);
    setPhase("decide");
    setPicked(null);
    setLog([]);
  }
  function choose(idx) {
    if (phase !== "decide") return;
    const choice = scenario.ch[idx];
    setPicked(idx);
    setTotal((v) => v + choice.dv);
    setLog((arr) => [
      ...arr,
      { yr: scenario.yr, choice: choice.t, dv: choice.dv }
    ]);
    setPhase("consequence");
  }
  function advance() {
    if (cur >= SCENARIOS.length - 1) {
      setScreen("end");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setCur((v) => v + 1);
    setPhase("decide");
    setPicked(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function replay() {
    setScreen("intro");
    setCur(0);
    setTotal(0);
    setPhase("decide");
    setPicked(null);
    setLog([]);
    setBarWidth(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const barColor = (pickedChoice == null ? void 0 : pickedChoice.dv) === 0 ? "#3a6840" : (pickedChoice == null ? void 0 : pickedChoice.dv) >= 80 ? "#8a2525" : "#6b5018";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "The Butterfly Job",
        path: "/games/butterfly-job",
        description: "Make seven seemingly minor decisions across the twentieth century and see how far the timeline diverges."
      }
    ),
    /* @__PURE__ */ jsx("style", { children: styles$1 }),
    /* @__PURE__ */ jsx("div", { className: "butterfly-shell", children: /* @__PURE__ */ jsxs("div", { className: "butterfly-game", children: [
      screen === "intro" && /* @__PURE__ */ jsxs("div", { className: "intro", children: [
        /* @__PURE__ */ jsx("div", { className: "intro-eyebrow", children: "1907 — 1979" }),
        /* @__PURE__ */ jsxs("h1", { className: "intro-title", children: [
          "The ",
          /* @__PURE__ */ jsx("em", { children: "Butterfly" }),
          " Job"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "intro-rule" }),
        /* @__PURE__ */ jsxs("div", { className: "intro-body", children: [
          /* @__PURE__ */ jsx("p", { children: "You have been dropped into seven moments across the twentieth century. Each time, you are a minor figure — a laundress, a newspaper seller, a guard on a corridor. You are not the subject of the history." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "You will make a small decision. The kind that barely registers at the time. You will not know, until after you've made it,",
            " ",
            /* @__PURE__ */ jsx("strong", { children: "what was riding on it." })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Seven decisions. Some will leave the timeline as you found it. Some won't. At the end, a report." })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "start-btn", onClick: startGame, children: "Begin — 1907" })
      ] }),
      screen === "game" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { className: "progress", children: [
          SCENARIOS.map((_, i) => /* @__PURE__ */ jsxs(
            "div",
            {
              style: { display: "contents" },
              children: [
                i > 0 && /* @__PURE__ */ jsx("div", { className: "pline" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `pdot ${i < cur ? "done" : i === cur ? "now" : ""}`
                  }
                )
              ]
            },
            i
          )),
          /* @__PURE__ */ jsx("div", { className: "pline" }),
          /* @__PURE__ */ jsxs("span", { className: "pcnt", children: [
            cur + 1,
            " / ",
            SCENARIOS.length
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "yr-badge", children: scenario.yr }),
        /* @__PURE__ */ jsx("div", { className: "loc", children: scenario.loc }),
        phase === "decide" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("div", { className: "role-label", children: "Your role" }),
          /* @__PURE__ */ jsx("div", { className: "role-text", children: scenario.role }),
          /* @__PURE__ */ jsx("div", { className: "ctx-block", children: scenario.ctx }),
          /* @__PURE__ */ jsx("p", { className: "question", children: scenario.q }),
          /* @__PURE__ */ jsx("div", { className: "choices", children: scenario.ch.map((c, i) => /* @__PURE__ */ jsxs(
            "button",
            {
              className: "ch",
              onClick: () => choose(i),
              children: [
                /* @__PURE__ */ jsx("div", { className: "ch-t", children: c.t }),
                /* @__PURE__ */ jsx("div", { className: "ch-s", children: c.s })
              ]
            },
            i
          )) })
        ] }),
        phase === "consequence" && pickedChoice && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "choices",
              style: { marginBottom: "1.25rem" },
              children: scenario.ch.map((c, i) => /* @__PURE__ */ jsxs(
                "button",
                {
                  className: `ch ${picked === i ? "chosen" : ""}`,
                  disabled: true,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "ch-t", children: c.t }),
                    /* @__PURE__ */ jsx("div", { className: "ch-s", children: c.s })
                  ]
                },
                i
              ))
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "con-box", children: [
            /* @__PURE__ */ jsxs("div", { className: "con-top", children: [
              /* @__PURE__ */ jsx("div", { className: "con-title", children: pickedChoice.ct }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `tag tag-${pickedChoice.tc}`,
                  children: pickedChoice.tg
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "chain", children: pickedChoice.chain.map(
              (step, i) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "chain-step",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "chain-arrow", children: "▸" }),
                    /* @__PURE__ */ jsx("span", { children: step })
                  ]
                },
                i
              )
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "dbar-wrap", children: [
              /* @__PURE__ */ jsxs("div", { className: "dbar-label", children: [
                /* @__PURE__ */ jsx("span", { children: "Divergence from recorded history" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  pickedChoice.dv,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "dbar-track", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: "dbar-fill",
                  style: {
                    background: barColor,
                    width: `${barWidth}%`
                  }
                }
              ) })
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              className: "next-btn",
              onClick: advance,
              children: cur < SCENARIOS.length - 1 ? "Continue through time →" : "See the final report →"
            }
          )
        ] })
      ] }),
      screen === "end" && /* @__PURE__ */ jsxs("div", { className: "end-page", children: [
        /* @__PURE__ */ jsx("div", { className: "end-eyebrow", children: "Timeline Report" }),
        /* @__PURE__ */ jsx("h2", { className: "end-title", children: verdict.v }),
        /* @__PURE__ */ jsxs("p", { className: "end-sub", children: [
          "Total divergence: ",
          total,
          " points across",
          " ",
          SCENARIOS.length,
          " decisions"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "end-card", children: [
          /* @__PURE__ */ jsx("div", { className: "end-verdict", children: verdict.v }),
          /* @__PURE__ */ jsx("div", { className: "end-desc", children: verdict.d }),
          /* @__PURE__ */ jsx("div", { children: log.map((entry, i) => {
            const dvClass = entry.dv === 0 ? "dv-ok" : entry.dv >= 70 ? "dv-hi" : "dv-lo";
            const dvLabel = entry.dv === 0 ? "intact" : `+${entry.dv}%`;
            return /* @__PURE__ */ jsxs("div", { className: "log-row", children: [
              /* @__PURE__ */ jsx("span", { className: "log-yr", children: entry.yr }),
              /* @__PURE__ */ jsx("span", { className: "log-ch", children: entry.choice }),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `log-dv ${dvClass}`,
                  children: dvLabel
                }
              )
            ] }, i);
          }) })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "replay-btn", onClick: replay, children: "Travel again ↺" })
      ] })
    ] }) })
  ] });
}
const FALLACIES = [
  // Appeals
  {
    id: "appeal_auth",
    name: "Appeal to Authority",
    desc: "Citing an authority — especially outside their domain — as definitive proof"
  },
  {
    id: "appeal_pop",
    name: "Appeal to Popularity",
    desc: "Claiming something is true because many people believe it (ad populum)"
  },
  {
    id: "appeal_emotion",
    name: "Appeal to Emotion",
    desc: "Substituting emotional manipulation for logical argument"
  },
  {
    id: "appeal_fear",
    name: "Appeal to Fear",
    desc: "Using fear or dire warnings to compel agreement rather than reason"
  },
  {
    id: "appeal_pity",
    name: "Appeal to Pity",
    desc: "Invoking sympathy or guilt to win assent rather than logic (ad misericordiam)"
  },
  {
    id: "appeal_nature",
    name: "Appeal to Nature",
    desc: "Assuming something is good because it is natural, or bad because it is unnatural"
  },
  {
    id: "appeal_tradition",
    name: "Appeal to Tradition",
    desc: "Arguing something is correct simply because it has long been done that way"
  },
  {
    id: "appeal_novelty",
    name: "Appeal to Novelty",
    desc: "Assuming something is better merely because it is newer"
  },
  {
    id: "appeal_ignorance",
    name: "Appeal to Ignorance",
    desc: "Claiming something is true because it hasn't been proven false, or vice versa"
  },
  {
    id: "appeal_ridicule",
    name: "Appeal to Ridicule",
    desc: "Presenting an argument as laughable rather than addressing it on its merits"
  },
  {
    id: "appeal_consequences",
    name: "Appeal to Consequences",
    desc: "Arguing a claim is false because its truth would have bad consequences, or true because desirable"
  },
  {
    id: "appeal_force",
    name: "Appeal to Force",
    desc: "Using threat of harm or coercion to compel agreement"
  },
  {
    id: "appeal_flattery",
    name: "Appeal to Flattery",
    desc: "Using excessive praise to gain agreement rather than argument"
  },
  // Character attacks & red herrings
  {
    id: "ad_hominem",
    name: "Ad Hominem",
    desc: "Attacking the person making the argument instead of the argument itself"
  },
  {
    id: "tu_quoque",
    name: "Tu Quoque",
    desc: "Deflecting criticism by accusing the critic of the same fault ('you too')"
  },
  {
    id: "genetic",
    name: "Genetic Fallacy",
    desc: "Judging an argument solely by its origin or source rather than its content"
  },
  {
    id: "red_herring",
    name: "Red Herring",
    desc: "Introducing irrelevant information to distract from the actual issue"
  },
  {
    id: "straw_man",
    name: "Straw Man",
    desc: "Misrepresenting someone's argument to make it easier to attack"
  },
  {
    id: "poisoning_well",
    name: "Poisoning the Well",
    desc: "Presenting adverse information about someone before they speak to preemptively discredit them"
  },
  {
    id: "whataboutism",
    name: "Whataboutism",
    desc: "Deflecting a charge by pointing to a comparable but unaddressed situation elsewhere"
  },
  // Causation & evidence
  {
    id: "post_hoc",
    name: "Post Hoc (False Cause)",
    desc: "Assuming A caused B merely because A preceded B (post hoc ergo propter hoc)"
  },
  {
    id: "correlation_cause",
    name: "Correlation Implies Causation",
    desc: "Treating a statistical correlation as evidence of a causal relationship"
  },
  {
    id: "texas_sharp",
    name: "Texas Sharpshooter",
    desc: "Picking clusters in data after the fact to match a pre-desired conclusion"
  },
  {
    id: "cherry_pick",
    name: "Cherry Picking",
    desc: "Selecting only evidence that supports a conclusion while ignoring contradictory data"
  },
  {
    id: "survivorship",
    name: "Survivorship Bias",
    desc: "Drawing conclusions from visible successes while ignoring unobserved failures"
  },
  {
    id: "gamblers",
    name: "Gambler's Fallacy",
    desc: "Believing past random outcomes affect the probability of independent future ones"
  },
  // Generalisation
  {
    id: "hasty_gen",
    name: "Hasty Generalization",
    desc: "Reaching a broad conclusion from too small or unrepresentative a sample"
  },
  {
    id: "anecdotal",
    name: "Anecdotal Evidence",
    desc: "Using a personal story or isolated case as though it defeats or replaces broader evidence"
  },
  {
    id: "false_analogy",
    name: "False Analogy",
    desc: "Claiming two situations are alike in a relevant way when they differ in important respects"
  },
  // Structure & framing
  {
    id: "false_dichotomy",
    name: "False Dichotomy",
    desc: "Presenting only two options as if no others exist (false dilemma / either-or fallacy)"
  },
  {
    id: "circular",
    name: "Circular Reasoning",
    desc: "The conclusion is smuggled in as a premise; the argument goes in a loop (begging the question)"
  },
  {
    id: "slippery_slope",
    name: "Slippery Slope",
    desc: "Asserting that one step will inevitably lead to extreme consequences without justifying each link"
  },
  {
    id: "false_equiv",
    name: "False Equivalence",
    desc: "Treating two fundamentally different things as though they are the same"
  },
  {
    id: "loaded_q",
    name: "Loaded Question",
    desc: "Asking a question with an unproven assumption built into it"
  },
  {
    id: "equivocation",
    name: "Equivocation",
    desc: "Exploiting a word's multiple meanings by switching senses within one argument"
  },
  {
    id: "composition",
    name: "Fallacy of Composition",
    desc: "Assuming what is true of the parts must be true of the whole"
  },
  {
    id: "division",
    name: "Fallacy of Division",
    desc: "Assuming what is true of the whole must be true of each part"
  },
  {
    id: "middle_ground",
    name: "Middle Ground / False Compromise",
    desc: "Assuming the truth must lie between two extremes regardless of their merits"
  },
  {
    id: "no_true_scotsman",
    name: "No True Scotsman",
    desc: "Dismissing a counterexample by redefining terms to exclude it"
  },
  {
    id: "motte_bailey",
    name: "Motte-and-Bailey",
    desc: "Defending a bold claim by retreating to a weaker version when challenged"
  },
  {
    id: "nirvana",
    name: "Nirvana / Perfect Solution",
    desc: "Rejecting a practical solution because it is not perfect, even when no perfect solution exists"
  },
  {
    id: "moving_goalposts",
    name: "Moving the Goalposts",
    desc: "Changing the standard of proof required after evidence has been provided"
  },
  {
    id: "special_pleading",
    name: "Special Pleading",
    desc: "Applying standards to others while exempting oneself without justification"
  },
  {
    id: "burden_proof",
    name: "Shifting the Burden of Proof",
    desc: "Demanding opponents disprove a claim rather than proving one's own"
  },
  {
    id: "sunk_cost",
    name: "Sunk Cost Fallacy",
    desc: "Continuing a course of action because of past investment rather than future value"
  },
  {
    id: "wishful_thinking",
    name: "Wishful Thinking",
    desc: "Believing something is true because one strongly wants it to be"
  },
  {
    id: "thought_terminating",
    name: "Thought-Terminating Cliché",
    desc: "Using a stock phrase or platitude to shut down further critical thinking"
  },
  {
    id: "galileo_gambit",
    name: "Galileo Gambit",
    desc: "Claiming that mainstream opposition proves one's idea must be revolutionary and correct"
  },
  // Formal
  {
    id: "affirm_consequent",
    name: "Affirming the Consequent",
    desc: "If P→Q and Q is true, concluding P is true — an invalid logical form"
  },
  {
    id: "deny_antecedent",
    name: "Denying the Antecedent",
    desc: "If P→Q and P is false, concluding Q is false — an invalid logical form"
  },
  {
    id: "undist_middle",
    name: "Undistributed Middle",
    desc: "Both A and B share a property, therefore A is B — the shared property doesn't establish identity"
  }
];
function parseCaseMarkdown(text) {
  const fmMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const meta = {};
  if (fmMatch) {
    fmMatch[1].split(/\r?\n/).forEach((line) => {
      const colon = line.indexOf(":");
      if (colon === -1) return;
      meta[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
    });
    text = text.slice(fmMatch[0].length);
  }
  const sentences = [];
  const fallacies = [];
  let pendingSis = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const hlMatch = line.match(/^\{==([\s\S]*?)==\}(.*)$/);
    if (hlMatch) {
      const sentenceText = hlMatch[1];
      const remainder = hlMatch[2].trim();
      const si = sentences.length;
      sentences.push(sentenceText);
      pendingSis.push(si);
      const cmMatch = remainder.match(/^\{>>([\s\S]*?)<<\}$/);
      if (cmMatch) {
        const sep = cmMatch[1].indexOf("|");
        const fid = cmMatch[1].slice(0, sep).trim();
        const expl = cmMatch[1].slice(sep + 1).trim();
        fallacies.push({ sis: [...pendingSis], fid, expl });
        pendingSis = [];
      }
    } else {
      if (pendingSis.length > 0) pendingSis = [];
      sentences.push(line);
    }
  }
  return {
    id: meta.id || "unknown",
    label: meta.label || "Case File",
    title: meta.title || "Untitled",
    context: meta.context || "",
    sentences,
    fallacies
  };
}
const therapyRaw = `---
id: therapy
label: Literature — Depressive Confession
title: A Confession (1882)
context: Verbatim excerpt from Leo Tolstoy's autobiographical essay "A Confession" (1882) and a verbatim excerpt from an 1841 letter by Abraham Lincoln. Both historical figures suffered from severe clinical depression (melancholia). These texts represent actual, real-world examples of cognitive distortions (logical fallacies applied to oneself) common in depressive episodes.
---

"My life came to a standstill. I could breathe, eat, drink, and sleep, and I could not help doing these things; but there was no life, for there were no wishes the fulfillment of which I could consider reasonable... 
{==The truth was that life is meaningless. I had as it were lived, lived, and walked, walked, till I had come to a precipice and saw clearly that there was nothing ahead of me but destruction.==}{>>slippery_slope | Tolstoy engages in catastrophizing (the depressive equivalent of a slippery slope fallacy). He assumes that because he currently lacks fulfillment, the only inevitable future outcome is total destruction and suffering, ignoring any possibility of recovery or change in perspective.<<}

{==It was impossible to stop, impossible to go back, and impossible to close my eyes or avoid seeing that there was nothing ahead but suffering and real death—complete annihilation." — Leo Tolstoy==}{>>false_dichotomy | Also known in CBT as 'black-and-white thinking'. Tolstoy sees no middle ground or alternative paths. It is either complete fulfillment (which he has lost) or complete annihilation, ignoring the nuanced realities of living with both pain and meaning.<<}

"For not giving you a general summary of news, you must pardon me; it is not in my power to do so. 
{==I am now the most miserable man living. If what I feel were equally distributed to the whole human family, there would not be one cheerful face on the earth.==}{>>appeal_emotion | Emotional reasoning. Lincoln treats his profound internal emotional pain as an objective measure of universal truth. Because he feels an overwhelming misery, he assumes it is the absolute reality of his existence and inherently insurmountable.<<}

{==Whether I shall ever be better I can not tell; I awfully forebode I shall not. To remain as I am is impossible; I must die or be better, it appears to me." — Abraham Lincoln==}{>>hasty_gen | Overgeneralization. Lincoln takes his current, temporary state of severe depression and assumes it is a permanent, unchangeable trait ("I awfully forebode I shall not"). He uses his current feeling to predict an eternal future.<<}
`;
const climateRaw = `---
id: climate_denial
label: Historical Floor Speech — Climate Debate
title: The Snowball
context: Verbatim excerpts from Senator James Inhofe's statements denying climate change, most notably his February 26, 2015 speech on the US Senate floor where he brought a snowball to work, and a 2012 radio interview.
---

{==In case we have forgotten, because we keep hearing that 2014 has been the warmest year on record. I ask the chair, you know what this is? It's a snowball just from outside here. It's very, very cold out. Very unseasonable. So here, Mr. President, catch this.==}{>>anecdotal | The speaker uses a single, local weather event (a snowball in Washington D.C.) as evidence against a long-term, global climate trend. This is anecdotal evidence that confuses localized weather with global climate patterns.<<}

{==We hear this coming from the media, they say, well, the global warming, this is it, the world is coming to an end. It's just not happening.==}{>>straw_man | He exaggerates the scientific consensus ("the world is coming to an end") to make it easier to dismiss, characterizing climate science as hyperbolic doomsday panic rather than empirical data.<<}

{==God's still up there. The arrogance of people to think that we, human beings, would be able to change what He is doing in the climate is to me outrageous.==}{>>appeal_emotion | This relies on religious appeal and personal incredulity ("outrageous arrogance") rather than addressing the atmospheric physics of carbon emissions. It replaces scientific argument with an appeal to divine sovereignty.<<}
`;
const extremistRaw = `---
id: extremist_speech
label: Historical Analysis — Political Rhetoric
title: Enemies from Within (1950)
context: Verbatim excerpts from Senator Joseph McCarthy's famous February 9, 1950 speech in Wheeling, West Virginia, which launched the "Red Scare". 
---

The reason why we find ourselves in a position of impotency is not because our only powerful potential enemy has sent men to invade our shores... but rather because of the traitorous actions of those who have been treated so well by this Nation. 

{==It has not been the less fortunate, or members of minority groups who have been traitorous to this Nation, but rather those who have had all the benefits that the wealthiest Nation on earth has had to offer... the finest homes, the finest college education and the finest jobs in government we can give.==}{>>hasty_gen | McCarthy generalizes that the most privileged individuals in government are the ones committing treason, without providing statistical evidence linking privilege or college education to treasonous behavior.<<}

{==I have here in my hand a list of 205—a list of names that were made known to the Secretary of State as being members of the Communist Party and who nevertheless are still working and shaping policy in the State Department.==}{>>appeal_emotion | The dramatic visual claim of holding a secret list is designed to invoke immediate panic and paranoia (appeal to fear) rather than providing the actual names for evidentiary review or legal scrutiny.<<}

{==As you know, very recently the Secretary of State proclaimed his loyalty to a man guilty of what has always been considered as the most abominable of all crimes—being a traitor to the people who gave him a position of great trust... The high priest of this treasonable group is now the Secretary of State.==}{>>ad_hominem | Instead of addressing the Secretary of State's actual foreign policies, McCarthy attacks his character by associating him with a convicted traitor (Alger Hiss) and labeling him a "high priest of treason", aiming to destroy his credibility through guilt by association and personal attacks.<<}
`;
const equalPayRaw = `---
id: equal_pay
label: Historical Speech — The War on Terror
title: With Us or Against Us
context: Verbatim excerpts from President George W. Bush's Address to a Joint Session of Congress on September 20, 2001. This is presented as an example of arguing for a noble cause (defending democracy and freedom) while utilizing highly fallacious rhetoric to unify the audience.
---

{==They hate our freedoms—our freedom of religion, our freedom of speech, our freedom to vote and assemble and disagree with each other... These terrorists kill not merely to end lives, but to disrupt and end a way of life.==}{>>straw_man | By defining the enemy's motivation entirely as "hating freedom," the speech simplifies a complex geopolitical and historical conflict into a cartoonish villainy, making it easier to rally the public without examining nuanced foreign policy issues.<<}

{==Every nation, in every region, now has a decision to make. Either you are with us, or you are with the terrorists.==}{>>false_dichotomy | The ultimate example of a false dilemma. It eliminates any possibility of a neutral nation, a nation that opposes terrorism but also opposes US military intervention, or a nation that prefers diplomatic resolution. It forces a complex global spectrum into exactly two absolute camps.<<}

{==From this day forward, any nation that continues to harbor or support terrorism will be regarded by the United States as a hostile regime.==}{>>slippery_slope | While stated as policy, the implication is that any lack of total compliance with US directives equates directly to supporting terrorism and thus becoming a military target.<<}

{==This is not, however, just America's fight. And what is at stake is not just America's freedom. This is the world's fight. This is civilization's fight.==}{>>appeal_emotion | An appeal to grand concepts (civilization itself) designed to evoke a powerful emotional response and a sense of existential urgency, bypassing logical debate over the specific military actions being proposed.<<}
`;
const CASE_RAWS = [therapyRaw, climateRaw, extremistRaw, equalPayRaw];
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap');

  .fd-root { --bg:#17140f; --panel:#1f1b14; --panel2:#261f16; --paper:#f0e8d8; --paper2:#e8deca; --ink:#1a1208; --ink2:#4a3820; --red:#b83232; --gold:#c49a28; --green:#2a6644; --border:rgba(196,154,40,0.22); --border2:rgba(196,154,40,0.12); --sel:rgba(255,215,40,0.42); --found:rgba(42,102,68,0.18); --ff-head:'Playfair Display',Georgia,serif; --ff-body:'Crimson Pro',Georgia,serif; --ff-mono:'Courier Prime','Courier New',monospace; }
  .fd-root { background: var(--bg); color: var(--paper); font-family: var(--ff-body); }

  .fd-sentence { cursor: pointer; border-radius: 2px; padding: 1px 3px; margin: 0 -3px; transition: background .12s; display: inline; }
  .fd-sentence:hover:not(.fd-found) { background: rgba(196,154,40,.16); }
  .fd-sentence.fd-selected:not(.fd-found) { background: var(--sel); }
  .fd-sentence.fd-found { background: var(--found); cursor: default; }

  .fd-flash-wrong  { animation: fdWrong  .55s ease both; }
  .fd-flash-narrow { animation: fdNarrow .55s ease both; }
  .fd-flash-correct{ animation: fdCorrect .6s ease both; }

  @keyframes fdWrong  { 0%,100%{background:var(--sel)} 40%{background:rgba(184,50,50,.38)} }
  @keyframes fdNarrow { 0%,100%{background:var(--sel)} 40%{background:rgba(220,130,30,.35)} }
  @keyframes fdCorrect{ 0%{background:var(--sel)} 100%{background:var(--found)} }

  .fd-badge { display:inline-block; font-family:var(--ff-mono); font-size:.58rem; letter-spacing:.1em; text-transform:uppercase; color:#2a6644; background:rgba(42,102,68,.13); border:1px solid rgba(42,102,68,.38); padding:.1rem .4rem; margin-left:.4rem; vertical-align:middle; border-radius:2px; white-space:nowrap; }

  .fd-dropdown { position:absolute; top:100%; left:0; right:0; z-index:100; background:#1c170f; border:1px solid rgba(196,154,40,.28); border-top:none; max-height:180px; overflow-y:auto; }
  .fd-opt { padding:.4rem .65rem; font-family:var(--ff-mono); font-size:.7rem; color:rgba(240,232,216,.72); cursor:pointer; line-height:1.4; }
  .fd-opt:hover, .fd-opt.fd-opt-sel { background:rgba(196,154,40,.15); color:var(--paper); }

  .fd-passage { font-size:1.08rem; line-height:2.1; color:var(--ink); position:relative; }
  .fd-case-paper { background:var(--paper); color:var(--ink); padding:2rem 2.5rem; max-width:680px; margin:0 auto; box-shadow:0 6px 40px rgba(0,0,0,.55); position:relative; }
  .fd-case-paper::before { content:''; position:absolute; top:0; left:0; right:0; height:5px; background:linear-gradient(90deg,#b83232,#922222); }

  .fd-clip { clip-path:polygon(0 0,100% 0,100% calc(100% - 7px),calc(100% - 7px) 100%,0 100%); }
  .fd-clip-sm { clip-path:polygon(0 0,100% 0,100% calc(100% - 5px),calc(100% - 5px) 100%,0 100%); }

  .fd-scrollbar::-webkit-scrollbar { width:4px; }
  .fd-scrollbar::-webkit-scrollbar-track { background:transparent; }
  .fd-scrollbar::-webkit-scrollbar-thumb { background:rgba(196,154,40,.28); border-radius:3px; }
  .fd-scrollbar::-webkit-scrollbar-thumb:hover { background:rgba(196,154,40,.5); }

  @keyframes fdFadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fdPopIn  { from{opacity:0;transform:scale(.94) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
  .fd-results-panel { animation: fdPopIn .32s cubic-bezier(0.34,1.3,0.64,1) both; }
  .fd-progress-item { animation: fdFadeUp .3s ease both; }
  .fd-fade-1 { animation: fdFadeUp .55s .0s ease both; }
  .fd-fade-2 { animation: fdFadeUp .55s .1s ease both; }
  .fd-fade-3 { animation: fdFadeUp .55s .2s ease both; }
  .fd-fade-4 { animation: fdFadeUp .55s .3s ease both; }
  .fd-fade-5 { animation: fdFadeUp .55s .38s ease both; }
`;
const FEEDBACK_STYLES = {
  ok: {
    borderColor: "#2a6644",
    background: "rgba(42,102,68,.15)",
    color: "#7fcf9f"
  },
  bad: {
    borderColor: "#b83232",
    background: "rgba(184,50,50,.12)",
    color: "#e07070"
  },
  narrow: {
    borderColor: "#d4840a",
    background: "rgba(212,132,10,.1)",
    color: "#e8a83a"
  },
  hint: {
    borderColor: "#c49a28",
    background: "rgba(196,154,40,.1)",
    color: "#c49a28"
  }
};
function FallacyDetective() {
  const rounds = useRef(CASE_RAWS.map(parseCaseMarkdown));
  const [phase, setPhase] = useState("intro");
  const [curRound, setCurRound] = useState(0);
  const [scores, setScores] = useState(() => {
    try {
      const stored = localStorage.getItem("fallacy-detective-scores");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [selectedSents, setSelectedSents] = useState(/* @__PURE__ */ new Set());
  const [foundFallacies, setFoundFallacies] = useState(/* @__PURE__ */ new Set());
  const [selectedFallacyId, setSelectedFallacyId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [flashMap, setFlashMap] = useState({});
  const [foundSentSet, setFoundSentSet] = useState(/* @__PURE__ */ new Set());
  const [foundBadges, setFoundBadges] = useState({});
  const [ctrlOpen, setCtrlOpen] = useState(false);
  const searchRef = useRef(null);
  const comboRef = useRef(null);
  const R = rounds.current[curRound];
  const filteredFallacies = FALLACIES.filter((f) => {
    const q = searchQuery.toLowerCase();
    return !q || f.name.toLowerCase().includes(q) || f.desc.toLowerCase().includes(q);
  });
  const selectedFallacy = FALLACIES.find((f) => f.id === selectedFallacyId);
  function pickFallacy(f) {
    setSelectedFallacyId(f.id);
    setSearchQuery(f.name);
    setShowDropdown(false);
  }
  function clearFallacy() {
    setSelectedFallacyId("");
    setSearchQuery("");
  }
  useEffect(() => {
    function handler(e) {
      if (comboRef.current && !comboRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  function flash(indices, cls) {
    setFlashMap((prev) => {
      const next = { ...prev };
      indices.forEach((i) => {
        next[i] = cls;
      });
      return next;
    });
    setTimeout(() => {
      setFlashMap((prev) => {
        const next = { ...prev };
        indices.forEach((i) => {
          if (next[i] === cls) delete next[i];
        });
        return next;
      });
    }, 650);
  }
  function startRound(idx) {
    setCurRound(idx);
    setSelectedSents(/* @__PURE__ */ new Set());
    setFoundFallacies(/* @__PURE__ */ new Set());
    setFoundSentSet(/* @__PURE__ */ new Set());
    setFoundBadges({});
    setFeedback(null);
    clearFallacy();
    setCtrlOpen(false);
  }
  function toggleSentence(i) {
    if (foundSentSet.has(i)) return;
    setSelectedSents((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setFeedback(null);
  }
  function checkAnswer() {
    const selArr = [...selectedSents];
    if (!selArr.length || !selectedFallacyId) return;
    const unfound = R.fallacies.map((f, idx) => ({ ...f, idx })).filter((f) => !foundFallacies.has(f.idx));
    const hits = unfound.filter(
      (f) => f.sis.some((si) => selArr.includes(si))
    );
    if (hits.length === 0) {
      flash(selArr, "fd-flash-wrong");
      setFeedback({
        type: "bad",
        msg: "No undiscovered fallacy in that sentence. Try another."
      });
      setTimeout(() => {
        setSelectedSents(/* @__PURE__ */ new Set());
        setFeedback(null);
      }, 650);
      return;
    }
    if (selArr.length > 1) {
      const exact = hits.find(
        (f) => selArr.every((si) => f.sis.includes(si))
      );
      if (!exact) {
        flash(selArr, "fd-flash-narrow");
        setFeedback({
          type: "narrow",
          msg: "Your selection spans a fallacy — narrow it to a single sentence (or the exact sentences of a multi-sentence fallacy)."
        });
        return;
      }
      resolveHit([exact], selArr);
      return;
    }
    resolveHit(hits, selArr);
  }
  function resolveHit(hits, selArr) {
    var _a;
    const target = hits.find((f) => f.fid === selectedFallacyId);
    if (!target) {
      flash(selArr, "fd-flash-wrong");
      setFeedback({
        type: "hint",
        msg: "That sentence does contain a fallacy — but that's not the right type. Try another."
      });
      return;
    }
    const fname = ((_a = FALLACIES.find((f) => f.id === target.fid)) == null ? void 0 : _a.name) || target.fid;
    flash(selArr, "fd-flash-correct");
    setTimeout(() => {
      setFoundFallacies((prev) => /* @__PURE__ */ new Set([...prev, target.idx]));
      setFoundSentSet((prev) => /* @__PURE__ */ new Set([...prev, ...target.sis]));
      setFoundBadges((prev) => ({ ...prev, [target.sis[0]]: fname }));
      setSelectedSents(/* @__PURE__ */ new Set());
      setFeedback({ type: "ok", msg: `✓  ${fname} — ${target.expl}` });
      clearFallacy();
    }, 650);
  }
  function finishRound() {
    const R_curr = rounds.current[curRound];
    const count = foundFallacies.size;
    const total = R_curr.fallacies.length;
    const pct = total ? Math.round(count / total * 100) : 0;
    setScores((prev) => {
      const next = { ...prev, [curRound]: { found: count, total, pct } };
      try {
        localStorage.setItem("fallacy-detective-scores", JSON.stringify(next));
      } catch (e) {
      }
      return next;
    });
    setPhase("results");
    setCtrlOpen(false);
  }
  const foundCount = foundFallacies.size;
  const allFound = foundCount === R.fallacies.length;
  const canSubmit = selectedSents.size > 0 && !!selectedFallacyId;
  const selCount = selectedSents.size;
  const overallFound = Object.values(scores).reduce((sum, s) => sum + s.found, 0);
  const totalFallacies = rounds.current.reduce(
    (s, r) => s + r.fallacies.length,
    0
  );
  const finalPct = Math.round(overallFound / totalFallacies * 100);
  const roundPct = R.fallacies.length ? Math.round(foundCount / R.fallacies.length * 100) : 0;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: css }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fd-root",
        style: {
          minHeight: "calc(100vh - 64px)",
          fontFamily: "var(--ff-body)"
        },
        children: [
          phase === "intro" && /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 64px)",
                textAlign: "center",
                padding: "2rem",
                background: "radial-gradient(ellipse 80% 60% at 30% 50%,rgba(196,154,40,.06) 0%,transparent 70%), radial-gradient(ellipse 60% 80% at 75% 55%,rgba(184,50,50,.05) 0%,transparent 70%), #17140f"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "fd-fade-1",
                    style: {
                      fontFamily: "var(--ff-mono)",
                      fontSize: ".62rem",
                      letterSpacing: ".3em",
                      textTransform: "uppercase",
                      color: "#c49a28",
                      border: "1px solid #c49a28",
                      padding: ".28rem .8rem",
                      marginBottom: "2rem",
                      opacity: 0.75
                    },
                    children: "Logic Investigation Bureau · Est. mmxxv"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "h1",
                  {
                    className: "fd-fade-2",
                    style: {
                      fontFamily: "var(--ff-head)",
                      fontSize: "clamp(3rem,9vw,5.5rem)",
                      fontWeight: 900,
                      color: "#f0e8d8",
                      lineHeight: 0.95,
                      letterSpacing: "-.02em",
                      marginBottom: ".5rem"
                    },
                    children: [
                      "Fallacy",
                      /* @__PURE__ */ jsx("br", {}),
                      /* @__PURE__ */ jsx(
                        "em",
                        {
                          style: {
                            color: "#b83232",
                            fontStyle: "italic"
                          },
                          children: "Detective"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    className: "fd-fade-2",
                    style: {
                      fontFamily: "var(--ff-head)",
                      fontStyle: "italic",
                      fontSize: "1.05rem",
                      color: "rgba(240,232,216,.4)",
                      marginBottom: "2rem",
                      letterSpacing: ".06em"
                    },
                    children: "Can you spot the flawed reasoning?"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "p",
                  {
                    className: "fd-fade-3",
                    style: {
                      maxWidth: 500,
                      fontSize: "1rem",
                      lineHeight: 1.75,
                      color: "rgba(240,232,216,.68)",
                      marginBottom: "2.5rem"
                    },
                    children: [
                      "Select a ",
                      /* @__PURE__ */ jsx("strong", { style: { color: "#f0e8d8" }, children: "case file" }),
                      " below. They are real-world documents laced with hidden logical fallacies. Your job: find them, name them, close the case."
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "fd-fade-4",
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "1rem",
                      maxWidth: 800,
                      width: "100%",
                      marginBottom: "2.5rem",
                      textAlign: "left"
                    },
                    children: rounds.current.map((r, i) => {
                      const score = scores[i];
                      return /* @__PURE__ */ jsxs(
                        "div",
                        {
                          onClick: () => {
                            startRound(i);
                            setPhase("game");
                          },
                          style: {
                            background: "var(--panel)",
                            border: "1px solid var(--border)",
                            padding: "1.2rem",
                            cursor: "pointer",
                            transition: "border-color 0.2s, background 0.2s"
                          },
                          onMouseEnter: (e) => {
                            e.currentTarget.style.borderColor = "rgba(196,154,40,0.5)";
                            e.currentTarget.style.background = "var(--panel2)";
                          },
                          onMouseLeave: (e) => {
                            e.currentTarget.style.borderColor = "var(--border)";
                            e.currentTarget.style.background = "var(--panel)";
                          },
                          children: [
                            /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }, children: [
                              /* @__PURE__ */ jsx("div", { style: {
                                fontFamily: "var(--ff-mono)",
                                fontSize: ".62rem",
                                letterSpacing: ".15em",
                                textTransform: "uppercase",
                                color: score ? score.pct === 100 ? "#7fcf9f" : "#c49a28" : "#b83232"
                              }, children: r.label }),
                              score && /* @__PURE__ */ jsxs("div", { style: {
                                fontFamily: "var(--ff-mono)",
                                fontSize: ".65rem",
                                color: score.pct === 100 ? "#7fcf9f" : "rgba(240,232,216,.6)",
                                background: "rgba(0,0,0,0.2)",
                                padding: ".2rem .5rem",
                                borderRadius: "2px"
                              }, children: [
                                score.pct,
                                "% (",
                                score.found,
                                "/",
                                score.total,
                                ")"
                              ] })
                            ] }),
                            /* @__PURE__ */ jsx("div", { style: { fontFamily: "var(--ff-head)", fontSize: "1.2rem", color: "var(--paper)", marginBottom: ".4rem", fontWeight: 700 }, children: r.title }),
                            /* @__PURE__ */ jsx("div", { style: { fontSize: ".85rem", color: "rgba(240,232,216,.5)", lineHeight: 1.4, fontStyle: "italic", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }, children: r.context })
                          ]
                        },
                        i
                      );
                    })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "fd-fade-5",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem"
                    },
                    children: /* @__PURE__ */ jsx(
                      "button",
                      {
                        onClick: () => setPhase("final"),
                        style: {
                          fontFamily: "var(--ff-mono)",
                          fontSize: ".65rem",
                          letterSpacing: ".12em",
                          textTransform: "uppercase",
                          color: "rgba(240,232,216,.4)",
                          background: "transparent",
                          border: "1px solid rgba(240,232,216,.15)",
                          padding: ".6rem 1rem",
                          cursor: "pointer"
                        },
                        children: "View Final Assessment →"
                      }
                    )
                  }
                )
              ]
            }
          ),
          phase === "game" && /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                height: "calc(100vh - 64px)"
              },
              children: [
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: ".55rem 1.2rem",
                      borderBottom: "1px solid var(--border)",
                      background: "var(--panel)",
                      flexShrink: 0
                    },
                    children: [
                      /* @__PURE__ */ jsx(
                        "span",
                        {
                          style: {
                            fontFamily: "var(--ff-head)",
                            fontSize: ".95rem",
                            fontWeight: 700,
                            color: "#c49a28",
                            letterSpacing: ".04em"
                          },
                          children: "Fallacy Detective"
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "span",
                        {
                          style: {
                            fontFamily: "var(--ff-mono)",
                            fontSize: ".65rem",
                            letterSpacing: ".18em",
                            textTransform: "uppercase",
                            color: "rgba(240,232,216,.35)"
                          },
                          children: [
                            "Case ",
                            curRound + 1,
                            " of ",
                            rounds.current.length
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "span",
                        {
                          style: {
                            fontFamily: "var(--ff-mono)",
                            fontSize: ".75rem",
                            color: "#c49a28",
                            letterSpacing: ".08em"
                          },
                          children: [
                            "Found: ",
                            foundFallacies.size,
                            " / ",
                            R.fallacies.length
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      display: "flex",
                      flex: 1,
                      minHeight: 0,
                      overflow: "hidden",
                      flexDirection: "column"
                    },
                    className: "md-row",
                    children: [
                      /* @__PURE__ */ jsx("style", { children: `.md-row { flex-direction: column; } @media (min-width: 768px) { .md-row { flex-direction: row !important; } }` }),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "fd-scrollbar",
                          style: {
                            flex: 1,
                            minWidth: 0,
                            overflowY: "auto",
                            padding: "1.5rem 1rem",
                            background: "var(--bg)",
                            backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 27px,rgba(196,154,40,.03) 27px,rgba(196,154,40,.03) 28px)"
                          },
                          children: /* @__PURE__ */ jsxs("div", { className: "fd-case-paper", children: [
                            /* @__PURE__ */ jsxs(
                              "div",
                              {
                                style: {
                                  marginBottom: "1.2rem",
                                  paddingBottom: ".8rem",
                                  borderBottom: "1px solid var(--paper2)"
                                },
                                children: [
                                  /* @__PURE__ */ jsx(
                                    "div",
                                    {
                                      style: {
                                        fontFamily: "var(--ff-mono)",
                                        fontSize: ".62rem",
                                        letterSpacing: ".22em",
                                        textTransform: "uppercase",
                                        color: "#b83232",
                                        marginBottom: ".4rem"
                                      },
                                      children: R.label
                                    }
                                  ),
                                  /* @__PURE__ */ jsx(
                                    "div",
                                    {
                                      style: {
                                        fontFamily: "var(--ff-head)",
                                        fontSize: "1.3rem",
                                        fontWeight: 700,
                                        color: "var(--ink)",
                                        marginBottom: ".25rem"
                                      },
                                      children: R.title
                                    }
                                  ),
                                  /* @__PURE__ */ jsx(
                                    "div",
                                    {
                                      style: {
                                        fontSize: ".9rem",
                                        fontStyle: "italic",
                                        color: "var(--ink2)"
                                      },
                                      children: R.context
                                    }
                                  )
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsx("div", { className: "fd-passage", children: R.sentences.map((txt, i) => {
                              const isSelected = selectedSents.has(i);
                              const isFound = foundSentSet.has(i);
                              const flashCls = flashMap[i] || "";
                              const badge = foundBadges[i];
                              const cls = [
                                "fd-sentence",
                                isSelected && !isFound ? "fd-selected" : "",
                                isFound ? "fd-found" : "",
                                flashCls
                              ].filter(Boolean).join(" ");
                              return /* @__PURE__ */ jsxs(
                                "span",
                                {
                                  className: cls,
                                  onClick: () => toggleSentence(i),
                                  children: [
                                    txt,
                                    " ",
                                    badge && /* @__PURE__ */ jsx("span", { className: "fd-badge", children: badge })
                                  ]
                                },
                                i
                              );
                            }) })
                          ] })
                        }
                      ),
                      /* @__PURE__ */ jsx("style", { children: `
                .fd-ctrl-wrap { width: 100%; flex-shrink: 0; background: var(--panel); border-top: 1px solid var(--border); display: flex; flex-direction: column; overflow-y: auto; }
                .fd-mobile-toggle { display: flex !important; }
                .fd-ctrl-body { display: ${ctrlOpen ? "flex" : "none"}; flex-direction: column; }
                @media (min-width: 768px) {
                  .fd-ctrl-wrap { width: 290px; border-top: none; border-left: 1px solid var(--border); height: 100%; }
                  .fd-mobile-toggle { display: none !important; }
                  .fd-ctrl-body { display: flex !important; flex-direction: column; flex: 1; min-height: 0; overflow-y: auto; }
                }
              ` }),
                      /* @__PURE__ */ jsxs("div", { className: "fd-ctrl-wrap fd-scrollbar", children: [
                        /* @__PURE__ */ jsxs(
                          "button",
                          {
                            onClick: () => setCtrlOpen((o) => !o),
                            className: "fd-mobile-toggle",
                            style: {
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: ".6rem 1rem",
                              background: "var(--panel2)",
                              border: "none",
                              borderBottom: "1px solid var(--border2)",
                              cursor: "pointer",
                              width: "100%",
                              fontFamily: "var(--ff-mono)",
                              fontSize: ".68rem",
                              letterSpacing: ".1em",
                              color: "rgba(240,232,216,.6)",
                              textTransform: "uppercase"
                            },
                            children: [
                              /* @__PURE__ */ jsx("span", { children: selCount > 0 ? `${selCount} sentence${selCount > 1 ? "s" : ""} selected${selectedFallacy ? ` · ${selectedFallacy.name}` : ""}` : "Controls" }),
                              /* @__PURE__ */ jsx("span", { style: { color: "#c49a28" }, children: ctrlOpen ? "▲" : "▼" })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs("div", { className: "fd-ctrl-body", children: [
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              style: {
                                padding: ".9rem 1.1rem",
                                borderBottom: "1px solid var(--border2)"
                              },
                              children: [
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".58rem",
                                      letterSpacing: ".22em",
                                      textTransform: "uppercase",
                                      color: "#c49a28",
                                      marginBottom: ".55rem",
                                      opacity: 0.75
                                    },
                                    children: "Selection"
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".72rem",
                                      color: selCount > 0 ? "rgba(240,232,216,.85)" : "rgba(240,232,216,.4)",
                                      minHeight: "2rem",
                                      lineHeight: 1.55
                                    },
                                    children: selCount > 0 ? `${selCount} sentence${selCount > 1 ? "s" : ""} selected` : "Click a sentence in the document to begin."
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              style: {
                                padding: ".9rem 1.1rem",
                                borderBottom: "1px solid var(--border2)"
                              },
                              children: [
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".58rem",
                                      letterSpacing: ".22em",
                                      textTransform: "uppercase",
                                      color: "#c49a28",
                                      marginBottom: ".6rem",
                                      opacity: 0.75
                                    },
                                    children: "Identify the Fallacy"
                                  }
                                ),
                                /* @__PURE__ */ jsxs(
                                  "div",
                                  {
                                    ref: comboRef,
                                    style: {
                                      position: "relative",
                                      marginBottom: ".45rem"
                                    },
                                    children: [
                                      /* @__PURE__ */ jsx(
                                        "input",
                                        {
                                          ref: searchRef,
                                          type: "text",
                                          value: searchQuery,
                                          onChange: (e) => {
                                            setSearchQuery(
                                              e.target.value
                                            );
                                            setSelectedFallacyId("");
                                          },
                                          onFocus: () => setShowDropdown(true),
                                          placeholder: "Search 50+ fallacies…",
                                          autoComplete: "off",
                                          spellCheck: false,
                                          style: {
                                            width: "100%",
                                            background: "rgba(0,0,0,.35)",
                                            color: "var(--paper)",
                                            border: "1px solid rgba(196,154,40,.22)",
                                            padding: ".5rem .65rem",
                                            fontFamily: "var(--ff-mono)",
                                            fontSize: ".7rem",
                                            outline: "none",
                                            appearance: "none"
                                          },
                                          onFocus2: () => setShowDropdown(true)
                                        }
                                      ),
                                      showDropdown && filteredFallacies.length > 0 && /* @__PURE__ */ jsx("div", { className: "fd-dropdown fd-scrollbar", children: filteredFallacies.map(
                                        (f) => /* @__PURE__ */ jsx(
                                          "div",
                                          {
                                            className: `fd-opt${f.id === selectedFallacyId ? " fd-opt-sel" : ""}`,
                                            onMouseDown: (e) => {
                                              e.preventDefault();
                                              pickFallacy(
                                                f
                                              );
                                            },
                                            children: f.name
                                          },
                                          f.id
                                        )
                                      ) })
                                    ]
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".65rem",
                                      color: "rgba(240,232,216,.38)",
                                      fontStyle: "italic",
                                      lineHeight: 1.5,
                                      minHeight: "1.8rem"
                                    },
                                    children: (selectedFallacy == null ? void 0 : selectedFallacy.desc) || ""
                                  }
                                ),
                                /* @__PURE__ */ jsx(
                                  "button",
                                  {
                                    onClick: checkAnswer,
                                    disabled: !canSubmit,
                                    className: "fd-clip-sm",
                                    style: {
                                      width: "100%",
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".72rem",
                                      letterSpacing: ".15em",
                                      textTransform: "uppercase",
                                      color: "#17140f",
                                      background: "#c49a28",
                                      border: "none",
                                      padding: ".65rem",
                                      cursor: canSubmit ? "pointer" : "not-allowed",
                                      fontWeight: 700,
                                      marginTop: ".6rem",
                                      opacity: canSubmit ? 1 : 0.28
                                    },
                                    children: "Submit Answer"
                                  }
                                ),
                                feedback && /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      marginTop: ".65rem",
                                      padding: ".6rem .75rem",
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".7rem",
                                      lineHeight: 1.55,
                                      borderLeft: "3px solid",
                                      ...FEEDBACK_STYLES[feedback.type]
                                    },
                                    children: feedback.msg
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              style: {
                                padding: ".9rem 1.1rem",
                                borderBottom: "1px solid var(--border2)"
                              },
                              children: [
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".58rem",
                                      letterSpacing: ".22em",
                                      textTransform: "uppercase",
                                      color: "#c49a28",
                                      marginBottom: ".6rem",
                                      opacity: 0.75
                                    },
                                    children: "Case Progress"
                                  }
                                ),
                                /* @__PURE__ */ jsxs(
                                  "ul",
                                  {
                                    style: {
                                      listStyle: "none",
                                      padding: 0,
                                      margin: 0
                                    },
                                    children: [
                                      R.fallacies.map((f, i) => {
                                        var _a;
                                        const done = foundFallacies.has(i);
                                        if (!done) return null;
                                        const fname = ((_a = FALLACIES.find(
                                          (x) => x.id === f.fid
                                        )) == null ? void 0 : _a.name) || f.fid;
                                        return /* @__PURE__ */ jsxs(
                                          "li",
                                          {
                                            className: "fd-progress-item",
                                            style: {
                                              display: "flex",
                                              alignItems: "center",
                                              gap: ".45rem",
                                              fontFamily: "var(--ff-mono)",
                                              fontSize: ".67rem",
                                              color: "#7fcf9f",
                                              padding: ".25rem 0",
                                              borderBottom: "1px solid rgba(196,154,40,.07)"
                                            },
                                            children: [
                                              /* @__PURE__ */ jsx(
                                                "span",
                                                {
                                                  style: {
                                                    width: 7,
                                                    height: 7,
                                                    borderRadius: "50%",
                                                    background: "#7fcf9f",
                                                    border: "1px solid #7fcf9f",
                                                    flexShrink: 0,
                                                    display: "inline-block"
                                                  }
                                                }
                                              ),
                                              fname
                                            ]
                                          },
                                          i
                                        );
                                      }),
                                      !allFound && /* @__PURE__ */ jsxs(
                                        "li",
                                        {
                                          style: {
                                            display: "flex",
                                            alignItems: "center",
                                            gap: ".45rem",
                                            fontFamily: "var(--ff-mono)",
                                            fontSize: ".67rem",
                                            color: "rgba(240,232,216,.35)",
                                            padding: ".25rem 0"
                                          },
                                          children: [
                                            /* @__PURE__ */ jsx(
                                              "span",
                                              {
                                                style: {
                                                  width: 7,
                                                  height: 7,
                                                  borderRadius: "50%",
                                                  border: "1px solid rgba(240,232,216,.22)",
                                                  flexShrink: 0,
                                                  display: "inline-block"
                                                }
                                              }
                                            ),
                                            /* @__PURE__ */ jsx(
                                              "span",
                                              {
                                                style: {
                                                  fontStyle: "italic",
                                                  letterSpacing: ".08em"
                                                },
                                                children: "keep looking…"
                                              }
                                            )
                                          ]
                                        }
                                      )
                                    ]
                                  }
                                ),
                                allFound && /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      marginTop: ".65rem",
                                      padding: ".55rem .75rem",
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".68rem",
                                      letterSpacing: ".05em",
                                      background: "rgba(42,102,68,.2)",
                                      border: "1px solid rgba(42,102,68,.4)",
                                      color: "#7fcf9f",
                                      textAlign: "center"
                                    },
                                    children: "All fallacies found — close the case!"
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              style: {
                                padding: ".9rem 1.1rem",
                                flex: 1
                              },
                              children: [
                                /* @__PURE__ */ jsx(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".58rem",
                                      letterSpacing: ".22em",
                                      textTransform: "uppercase",
                                      color: "#c49a28",
                                      marginBottom: ".5rem",
                                      opacity: 0.75
                                    },
                                    children: "Notes"
                                  }
                                ),
                                /* @__PURE__ */ jsxs(
                                  "div",
                                  {
                                    style: {
                                      fontFamily: "var(--ff-mono)",
                                      fontSize: ".64rem",
                                      lineHeight: 1.75,
                                      color: "rgba(240,232,216,.33)"
                                    },
                                    children: [
                                      "Click",
                                      " ",
                                      /* @__PURE__ */ jsx(
                                        "strong",
                                        {
                                          style: {
                                            color: "rgba(240,232,216,.52)"
                                          },
                                          children: "one sentence"
                                        }
                                      ),
                                      " ",
                                      "at a time.",
                                      /* @__PURE__ */ jsx("br", {}),
                                      "Wrong type? Try again on the same sentence.",
                                      /* @__PURE__ */ jsx("br", {}),
                                      '"Close the case" reveals what you missed.'
                                    ]
                                  }
                                )
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              onClick: finishRound,
                              style: {
                                margin: "auto 1.1rem 1.1rem",
                                fontFamily: "var(--ff-mono)",
                                fontSize: ".7rem",
                                letterSpacing: ".12em",
                                textTransform: "uppercase",
                                color: "rgba(240,232,216,.52)",
                                background: "transparent",
                                border: "1px solid rgba(240,232,216,.18)",
                                padding: ".55rem",
                                cursor: "pointer"
                              },
                              children: "Close This Case →"
                            }
                          )
                        ] })
                      ] })
                    ]
                  }
                )
              ]
            }
          ),
          phase === "results" && /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                position: "fixed",
                inset: 0,
                background: "rgba(23,20,15,.9)",
                zIndex: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                backdropFilter: "blur(5px)"
              },
              children: /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "fd-scrollbar fd-results-panel",
                  style: {
                    background: "var(--panel2)",
                    border: "1px solid var(--border)",
                    maxWidth: 600,
                    width: "100%",
                    maxHeight: "85vh",
                    overflowY: "auto",
                    padding: "2rem",
                    position: "relative"
                  },
                  children: [
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          position: "absolute",
                          top: "1.2rem",
                          right: "1.2rem",
                          fontFamily: "var(--ff-mono)",
                          fontSize: ".58rem",
                          letterSpacing: ".28em",
                          color: "#b83232",
                          border: "1px solid #b83232",
                          padding: ".2rem .55rem",
                          opacity: 0.65
                        },
                        children: "Case Closed"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "h2",
                      {
                        style: {
                          fontFamily: "var(--ff-head)",
                          fontSize: "1.7rem",
                          fontWeight: 700,
                          color: "var(--paper)",
                          marginBottom: ".25rem"
                        },
                        children: R.title
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        style: {
                          fontFamily: "var(--ff-mono)",
                          fontSize: ".82rem",
                          color: "#c49a28",
                          marginBottom: "1.75rem",
                          letterSpacing: ".08em"
                        },
                        children: [
                          roundPct,
                          "% — ",
                          foundCount,
                          " of",
                          " ",
                          R.fallacies.length,
                          " fallacies identified"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          fontFamily: "var(--ff-mono)",
                          fontSize: ".58rem",
                          letterSpacing: ".22em",
                          textTransform: "uppercase",
                          color: "rgba(240,232,216,.28)",
                          marginBottom: ".9rem"
                        },
                        children: "Fallacy Report"
                      }
                    ),
                    R.fallacies.map((f, i) => {
                      const caught = foundFallacies.has(i);
                      const fallacy = FALLACIES.find(
                        (x) => x.id === f.fid
                      );
                      const sent = R.sentences[f.sis[0]];
                      return /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: {
                            marginBottom: "1.1rem",
                            padding: ".85rem .95rem",
                            borderLeft: `3px solid ${caught ? "#2a6644" : "#b83232"}`,
                            background: caught ? "rgba(42,102,68,.07)" : "rgba(184,50,50,.07)"
                          },
                          children: [
                            /* @__PURE__ */ jsxs(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--ff-mono)",
                                  fontSize: ".72rem",
                                  fontWeight: 700,
                                  letterSpacing: ".1em",
                                  textTransform: "uppercase",
                                  color: caught ? "#7fcf9f" : "#e07070",
                                  marginBottom: ".3rem"
                                },
                                children: [
                                  caught ? "✓" : "✗",
                                  " ",
                                  (fallacy == null ? void 0 : fallacy.name) || f.fid
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxs(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--ff-body)",
                                  fontSize: ".9rem",
                                  color: "var(--paper)",
                                  fontStyle: "italic",
                                  marginBottom: ".3rem",
                                  lineHeight: 1.5
                                },
                                children: [
                                  '"',
                                  sent,
                                  '"'
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                style: {
                                  fontFamily: "var(--ff-mono)",
                                  fontSize: ".64rem",
                                  color: "rgba(240,232,216,.45)",
                                  lineHeight: 1.65
                                },
                                children: f.expl
                              }
                            )
                          ]
                        },
                        i
                      );
                    }),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        style: {
                          display: "flex",
                          gap: ".8rem",
                          marginTop: "1.75rem"
                        },
                        children: /* @__PURE__ */ jsx(
                          "button",
                          {
                            onClick: () => setPhase("intro"),
                            className: "fd-clip",
                            style: {
                              flex: 1,
                              fontFamily: "var(--ff-mono)",
                              fontSize: ".74rem",
                              letterSpacing: ".14em",
                              textTransform: "uppercase",
                              color: "#17140f",
                              background: "#c49a28",
                              border: "none",
                              padding: ".75rem",
                              cursor: "pointer",
                              fontWeight: 700
                            },
                            children: "Return to Case Files →"
                          }
                        )
                      }
                    )
                  ]
                }
              )
            }
          ),
          phase === "final" && /* @__PURE__ */ jsxs(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "calc(100vh - 64px)",
                textAlign: "center",
                padding: "2rem",
                background: "radial-gradient(ellipse 70% 50% at 50% 50%,rgba(196,154,40,.07) 0%,transparent 70%),#17140f"
              },
              children: [
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    style: {
                      fontFamily: "var(--ff-mono)",
                      fontSize: ".62rem",
                      letterSpacing: ".3em",
                      textTransform: "uppercase",
                      color: "#c49a28",
                      border: "1px solid #c49a28",
                      padding: ".28rem .8rem",
                      marginBottom: "1.5rem",
                      opacity: 0.7
                    },
                    children: "Investigation Complete"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "h1",
                  {
                    style: {
                      fontFamily: "var(--ff-head)",
                      fontSize: "clamp(2.2rem,7vw,4.5rem)",
                      fontWeight: 900,
                      color: "var(--paper)",
                      lineHeight: 0.95,
                      marginBottom: ".45rem"
                    },
                    children: [
                      "Case Files",
                      /* @__PURE__ */ jsx("br", {}),
                      "Closed"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "var(--ff-head)",
                      fontStyle: "italic",
                      fontSize: "1rem",
                      color: "rgba(240,232,216,.38)",
                      marginBottom: "2rem"
                    },
                    children: "Here's your final assessment, Detective."
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    style: {
                      background: "var(--panel)",
                      border: "1px solid var(--border)",
                      padding: "1.75rem 3.5rem",
                      marginBottom: "1.75rem",
                      textAlign: "center"
                    },
                    children: [
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: {
                            fontFamily: "var(--ff-head)",
                            fontSize: "4.5rem",
                            fontWeight: 900,
                            color: "#c49a28",
                            lineHeight: 1
                          },
                          children: [
                            finalPct,
                            "%"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          style: {
                            fontFamily: "var(--ff-mono)",
                            fontSize: ".68rem",
                            letterSpacing: ".1em",
                            color: "rgba(240,232,216,.38)",
                            marginTop: ".35rem"
                          },
                          children: [
                            overallFound,
                            " of ",
                            totalFallacies,
                            " fallacies identified"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          style: {
                            fontFamily: "var(--ff-mono)",
                            fontSize: ".58rem",
                            letterSpacing: ".22em",
                            textTransform: "uppercase",
                            color: "rgba(240,232,216,.22)",
                            marginTop: ".45rem"
                          },
                          children: "Detection Rate"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "p",
                  {
                    style: {
                      fontFamily: "var(--ff-head)",
                      fontSize: "1.25rem",
                      fontStyle: "italic",
                      color: "rgba(240,232,216,.65)",
                      marginBottom: "2rem"
                    },
                    children: finalPct === 100 ? '"Perfect case closure. A first-rate detective."' : finalPct >= 75 ? '"Sharp eyes — a few slipped through."' : finalPct >= 50 ? '"A solid start. Room to sharpen the instincts."' : '"The fallacies outwitted you today. Try again."'
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    onClick: () => setPhase("intro"),
                    className: "fd-clip",
                    style: {
                      fontFamily: "var(--ff-mono)",
                      fontSize: ".78rem",
                      letterSpacing: ".18em",
                      textTransform: "uppercase",
                      color: "#17140f",
                      background: "#c49a28",
                      border: "none",
                      padding: ".85rem 2.5rem",
                      cursor: "pointer",
                      fontWeight: 700
                    },
                    children: "Return to Case Files"
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] });
}
const ROUNDS = [
  {
    topic: "The Nature of Mind",
    quotes: [
      {
        text: "The mind is a tabula rasa upon which experience writes its characters.",
        philosopher: "John Locke",
        tradition: "British Empiricism",
        century: "17th",
        detail: "An English philosopher and physician, widely regarded as one of the most influential of Enlightenment thinkers."
      },
      {
        text: "I think, therefore I am. But what am I? A thing that thinks.",
        philosopher: "René Descartes",
        tradition: "Continental Rationalism",
        century: "17th",
        detail: "A French philosopher and mathematician who laid the foundations for rationalism and analytic geometry."
      },
      {
        text: "The unity of consciousness is nothing but the unity of the act of apperception.",
        philosopher: "Immanuel Kant",
        tradition: "German Idealism",
        century: "18th",
        detail: "A central figure in modern philosophy who synthesized early modern rationalism and empiricism."
      },
      {
        text: "What is it like to be a bat? We cannot suppose that experience is absent in creatures so unlike us.",
        philosopher: "Thomas Nagel",
        tradition: "Analytic Philosophy",
        century: "20th",
        detail: "An American philosopher known for his critique of reductionist accounts of the mind and objective viewpoints."
      },
      {
        text: "The stream of thought flows on; but most of its segments fall into the bottomless abyss of oblivion.",
        philosopher: "William James",
        tradition: "American Pragmatism",
        century: "19th",
        detail: 'An American philosopher and psychologist, considered one of the leading thinkers of the late 19th century and the "Father of American psychology".'
      }
    ]
  },
  {
    topic: "Truth and Knowledge",
    quotes: [
      {
        text: "Truth is subjectivity. The inward how is the truth.",
        philosopher: "Søren Kierkegaard",
        tradition: "Existentialism",
        century: "19th",
        detail: "A Danish philosopher, theologian, and cultural critic who was a major influence on existentialism and Protestant theology."
      },
      {
        text: "We can only know that we know nothing, and that is the highest degree of human wisdom.",
        philosopher: "Leo Tolstoy",
        tradition: "Literary Philosophy",
        century: "19th",
        detail: "A Russian writer who is regarded as one of the greatest authors of all time, who later in life developed a radical anarcho-pacifist Christian philosophy."
      },
      {
        text: "The whole is the true. The true is the whole.",
        philosopher: "Georg Wilhelm Friedrich Hegel",
        tradition: "German Idealism",
        century: "19th",
        detail: "A German philosopher whose dialectical method and historicist and idealist account of reality revolutionized European philosophy."
      },
      {
        text: "Whereof one cannot speak, thereof one must be silent.",
        philosopher: "Ludwig Wittgenstein",
        tradition: "Analytic Philosophy",
        century: "20th",
        detail: "An Austrian-British philosopher who worked primarily in logic, the philosophy of mathematics, the philosophy of mind, and the philosophy of language."
      },
      {
        text: "What is truth? Truth is not a thing; it is a process of verification.",
        philosopher: "William James",
        tradition: "American Pragmatism",
        century: "19th",
        detail: 'An American philosopher and psychologist, considered one of the leading thinkers of the late 19th century and the "Father of American psychology".'
      }
    ]
  }
];
const ALL_NAMES = [
  ...new Set(ROUNDS.flatMap((r) => r.quotes.map((q) => q.philosopher)))
];
function shuffle$2(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function getOptions(correct, pool) {
  const others = shuffle$2(pool.filter((n) => n !== correct)).slice(0, 3);
  return shuffle$2([correct, ...others]);
}
function PhilosopherMatch() {
  const [roundIdx, setRoundIdx] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [shake, setShake] = useState(null);
  const round = ROUNDS[roundIdx];
  const quote = round.quotes[quoteIdx];
  const options = getOptions(quote.philosopher, ALL_NAMES);
  function handleGuess(name) {
    if (correct) return;
    setSelected(name);
    if (name === quote.philosopher) {
      const pts = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      setScore((s) => s + pts);
      setTotal((t) => t + 3);
      setCorrect(true);
    } else {
      setShake(name);
      setTimeout(() => setShake(null), 600);
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts === 1) setRevealed(1);
      else if (newAttempts === 2) setRevealed(2);
      else if (newAttempts === 3) setRevealed(3);
    }
  }
  function next() {
    const nextQuote = quoteIdx + 1;
    if (nextQuote >= round.quotes.length) {
      const nextRound = roundIdx + 1;
      if (nextRound >= ROUNDS.length) {
        setDone(true);
        return;
      }
      setRoundIdx(nextRound);
      setQuoteIdx(0);
    } else {
      setQuoteIdx(nextQuote);
    }
    setAttempts(0);
    setRevealed(0);
    setSelected(null);
    setCorrect(false);
  }
  const progress = (roundIdx * ROUNDS[0].quotes.length + quoteIdx + (correct ? 1 : 0)) / (ROUNDS.length * ROUNDS[0].quotes.length);
  if (done) {
    const pct = Math.round(score / total * 100);
    return /* @__PURE__ */ jsx("div", { style: styles.root, children: /* @__PURE__ */ jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsx("div", { style: styles.endIcon, children: "✦" }),
      /* @__PURE__ */ jsx("div", { style: styles.endTitle, children: "Round Complete" }),
      /* @__PURE__ */ jsxs("div", { style: styles.endScore, children: [
        score,
        " / ",
        total
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.endPct, children: [
        pct,
        "% accuracy"
      ] }),
      /* @__PURE__ */ jsx("div", { style: styles.endLabel, children: pct >= 80 ? "Prodigious. Hume himself would approve." : pct >= 55 ? "Respectable. A few more centuries to study." : "The examined life requires re-examination." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { style: styles.root, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsx("span", { style: styles.logo, children: "PHILOSOPHER MATCH" }),
      /* @__PURE__ */ jsxs("span", { style: styles.scoreLabel, children: [
        score,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: styles.progressBar, children: /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          ...styles.progressFill,
          width: `${progress * 100}%`
        }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { style: styles.topicTag, children: [
      "Topic: ",
      round.topic
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.card, children: [
      /* @__PURE__ */ jsxs("div", { style: styles.quoteNumber, children: [
        "Quote ",
        quoteIdx + 1,
        " of ",
        round.quotes.length
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.quoteText, children: [
        '"',
        quote.text,
        '"'
      ] }),
      revealed >= 1 && /* @__PURE__ */ jsxs("div", { style: styles.hint, children: [
        /* @__PURE__ */ jsx("span", { style: styles.hintLabel, children: "Hint — Detail:" }),
        " ",
        quote.detail
      ] }),
      revealed >= 2 && /* @__PURE__ */ jsxs("div", { style: styles.hint, children: [
        /* @__PURE__ */ jsx("span", { style: styles.hintLabel, children: "Hint — Century:" }),
        " ",
        quote.century,
        " century"
      ] }),
      revealed >= 3 && /* @__PURE__ */ jsxs("div", { style: styles.hint, children: [
        /* @__PURE__ */ jsx("span", { style: styles.hintLabel, children: "Hint — Tradition:" }),
        " ",
        quote.tradition
      ] }),
      correct && /* @__PURE__ */ jsxs("div", { style: styles.correctBanner, children: [
        "✓ ",
        quote.philosopher,
        attempts === 0 && /* @__PURE__ */ jsx("span", { style: styles.pointsBadge, children: "+3" }),
        attempts === 1 && /* @__PURE__ */ jsx("span", { style: styles.pointsBadge, children: "+2" }),
        attempts >= 2 && /* @__PURE__ */ jsx("span", { style: styles.pointsBadge, children: "+1" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: styles.options, children: options.map((name) => {
      let style = styles.option;
      if (correct && name === quote.philosopher)
        style = { ...style, ...styles.optionCorrect };
      else if (correct && name !== quote.philosopher)
        style = { ...style, ...styles.optionDim };
      else if (shake === name)
        style = { ...style, ...styles.optionWrong };
      return /* @__PURE__ */ jsx(
        "button",
        {
          style,
          onClick: () => handleGuess(name),
          disabled: correct,
          children: name
        },
        name
      );
    }) }),
    correct && /* @__PURE__ */ jsx("button", { style: styles.nextBtn, onClick: next, children: quoteIdx + 1 < round.quotes.length || roundIdx + 1 < ROUNDS.length ? "Next Quote →" : "See Results" })
  ] });
}
const styles = {
  root: {
    minHeight: "100vh",
    background: "#F5F0E8",
    fontFamily: "'Georgia', 'Times New Roman', serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px 16px 48px",
    color: "#1a1208"
  },
  header: {
    width: "100%",
    maxWidth: 640,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  logo: {
    fontSize: 13,
    fontFamily: "monospace",
    letterSpacing: "0.18em",
    fontWeight: "bold",
    color: "#6b4c1e"
  },
  scoreLabel: {
    fontSize: 13,
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    color: "#6b4c1e"
  },
  progressBar: {
    width: "100%",
    maxWidth: 640,
    height: 3,
    background: "#d8cdb8",
    marginBottom: 20,
    borderRadius: 2
  },
  progressFill: {
    height: "100%",
    background: "#6b4c1e",
    borderRadius: 2,
    transition: "width 0.5s ease"
  },
  topicTag: {
    fontSize: 12,
    letterSpacing: "0.12em",
    color: "#9e7a4a",
    textTransform: "uppercase",
    marginBottom: 16,
    fontFamily: "monospace",
    alignSelf: "flex-start",
    maxWidth: 640,
    width: "100%"
  },
  card: {
    width: "100%",
    maxWidth: 640,
    background: "#fff",
    border: "1px solid #d8cdb8",
    borderRadius: 2,
    padding: "32px 32px 28px",
    marginBottom: 24,
    boxShadow: "4px 4px 0 #d8cdb8"
  },
  quoteNumber: {
    fontSize: 11,
    fontFamily: "monospace",
    color: "#aaa",
    letterSpacing: "0.1em",
    marginBottom: 16,
    textTransform: "uppercase"
  },
  quoteText: {
    fontSize: 20,
    lineHeight: 1.65,
    color: "#1a1208",
    fontStyle: "italic",
    marginBottom: 20
  },
  hint: {
    fontSize: 13,
    color: "#6b4c1e",
    background: "#fdf6ea",
    border: "1px solid #e8d9bb",
    padding: "8px 14px",
    borderRadius: 2,
    marginTop: 8,
    fontFamily: "monospace"
  },
  hintLabel: {
    fontWeight: "bold",
    marginRight: 6
  },
  correctBanner: {
    marginTop: 16,
    padding: "10px 16px",
    background: "#eaf7ea",
    border: "1px solid #b5d9b5",
    color: "#2d6e2d",
    fontSize: 15,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  pointsBadge: {
    background: "#2d6e2d",
    color: "#fff",
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 20,
    fontFamily: "monospace"
  },
  options: {
    width: "100%",
    maxWidth: 640,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 20
  },
  option: {
    padding: "14px 12px",
    background: "#fff",
    border: "1px solid #c8bfaf",
    borderRadius: 2,
    fontSize: 14,
    color: "#1a1208",
    cursor: "pointer",
    fontFamily: "'Georgia', serif",
    textAlign: "left",
    transition: "background 0.15s, transform 0.1s"
  },
  optionCorrect: {
    background: "#eaf7ea",
    border: "1px solid #2d6e2d",
    color: "#2d6e2d"
  },
  optionWrong: {
    background: "#fdeaea",
    border: "1px solid #c0392b",
    color: "#c0392b"
  },
  optionDim: {
    opacity: 0.4,
    cursor: "default"
  },
  nextBtn: {
    padding: "14px 36px",
    background: "#1a1208",
    color: "#F5F0E8",
    border: "none",
    borderRadius: 2,
    fontSize: 14,
    fontFamily: "'Georgia', serif",
    cursor: "pointer",
    letterSpacing: "0.05em"
  },
  endIcon: {
    fontSize: 40,
    color: "#6b4c1e",
    marginBottom: 16,
    textAlign: "center"
  },
  endTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: "0.08em"
  },
  endScore: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#6b4c1e",
    textAlign: "center",
    fontFamily: "monospace"
  },
  endPct: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "monospace"
  },
  endLabel: {
    fontSize: 15,
    fontStyle: "italic",
    color: "#555",
    textAlign: "center",
    maxWidth: 360,
    margin: "0 auto",
    lineHeight: 1.6
  }
};
const GRAPH = {
  consciousness: ["mind", "qualia", "self", "perception", "intentionality"],
  mind: ["consciousness", "reason", "body", "knowledge", "language"],
  qualia: ["consciousness", "perception", "subjectivity", "phenomenology"],
  self: ["consciousness", "identity", "freedom", "soul", "ego"],
  perception: ["qualia", "experience", "knowledge", "appearance"],
  intentionality: ["consciousness", "meaning", "language", "desire"],
  reason: ["mind", "logic", "knowledge", "ethics", "truth"],
  body: ["mind", "nature", "pleasure", "perception", "mortality"],
  knowledge: ["reason", "truth", "perception", "belief", "certainty"],
  language: ["meaning", "mind", "truth", "logic", "intentionality"],
  identity: ["self", "persistence", "soul", "society", "change"],
  freedom: ["self", "will", "ethics", "society", "necessity"],
  soul: ["self", "body", "god", "identity", "mortality"],
  ego: ["self", "desire", "pleasure", "will"],
  subjectivity: ["qualia", "experience", "truth", "phenomenology"],
  phenomenology: ["qualia", "subjectivity", "experience", "intentionality"],
  experience: ["perception", "knowledge", "subjectivity", "phenomenology"],
  logic: ["reason", "language", "truth", "necessity"],
  ethics: ["reason", "freedom", "justice", "virtue", "duty"],
  truth: ["knowledge", "language", "logic", "reason", "belief"],
  meaning: ["language", "intentionality", "existence", "value"],
  belief: ["knowledge", "truth", "certainty", "will"],
  certainty: ["knowledge", "belief", "doubt", "truth"],
  doubt: ["certainty", "skepticism", "knowledge"],
  skepticism: ["doubt", "knowledge", "appearance"],
  appearance: ["perception", "reality", "skepticism"],
  reality: ["appearance", "existence", "nature", "god"],
  existence: ["reality", "meaning", "being", "god", "mortality"],
  being: ["existence", "nothing", "time", "god"],
  nothing: ["being", "void", "death"],
  time: ["being", "change", "mortality", "causality"],
  change: ["time", "identity", "nature", "causality"],
  causality: ["time", "change", "necessity", "nature"],
  necessity: ["causality", "logic", "freedom", "god"],
  nature: ["body", "causality", "god", "reality", "change"],
  god: ["soul", "existence", "necessity", "nature", "being"],
  mortality: ["body", "soul", "existence", "time"],
  desire: ["ego", "pleasure", "will", "ethics"],
  pleasure: ["desire", "body", "virtue", "value"],
  will: ["freedom", "belief", "desire", "ego"],
  virtue: ["ethics", "pleasure", "soul", "justice"],
  justice: ["ethics", "society", "virtue", "duty"],
  society: ["freedom", "identity", "justice", "power"],
  power: ["society", "will", "knowledge", "value"],
  value: ["meaning", "ethics", "pleasure", "beauty"],
  beauty: ["value", "art", "appearance", "harmony"],
  art: ["beauty", "meaning", "expression", "creation"],
  expression: ["art", "language", "meaning", "emotion"],
  emotion: ["expression", "desire", "reason", "body"],
  duty: ["ethics", "justice", "reason", "will"],
  creation: ["art", "god", "being", "meaning"],
  harmony: ["beauty", "nature", "virtue", "balance"]
};
const PUZZLES = [
  {
    start: "justice",
    end: "consciousness",
    solution: ["justice", "ethics", "reason", "mind", "consciousness"],
    explanation: "Justice grounds ethics, ethics requires reason, reason is a faculty of mind, mind includes consciousness."
  },
  {
    start: "beauty",
    end: "god",
    solution: ["beauty", "harmony", "nature", "god"],
    explanation: "Beauty implies harmony, harmony found in nature, nature leads to its creator or ground."
  },
  {
    start: "doubt",
    end: "freedom",
    solution: [
      "doubt",
      "certainty",
      "knowledge",
      "reason",
      "ethics",
      "freedom"
    ],
    explanation: "Doubt undermines certainty, certainty is sought through knowledge, knowledge relies on reason, reason grounds ethics, ethics requires freedom."
  }
];
function bfs(start, end, graph) {
  if (start === end) return [start];
  const queue = [[start]];
  const visited = /* @__PURE__ */ new Set([start]);
  while (queue.length) {
    const path = queue.shift();
    const node = path[path.length - 1];
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        const newPath = [...path, neighbor];
        if (neighbor === end) return newPath;
        visited.add(neighbor);
        queue.push(newPath);
      }
    }
  }
  return null;
}
function isConnected(a, b) {
  var _a, _b;
  return ((_a = GRAPH[a]) == null ? void 0 : _a.includes(b)) || ((_b = GRAPH[b]) == null ? void 0 : _b.includes(a));
}
function ConceptMap() {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [path, setPath] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [won, setWon] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    document.title = "Concept Map | Axiom";
  }, []);
  const puzzle = PUZZLES[puzzleIdx];
  const optimal = bfs(puzzle.start, puzzle.end, GRAPH);
  const optimalLength = optimal ? optimal.length : 0;
  const currentConcept = path.length === 0 ? puzzle.start : path[path.length - 1];
  function handleAdd() {
    var _a;
    const term = input.trim().toLowerCase();
    setInput("");
    setError("");
    if (!term) return;
    if (term === puzzle.start && path.length === 0) {
      setError("That's your starting concept — type the next step.");
      return;
    }
    if (!GRAPH[term]) {
      setError(
        `"${term}" isn't in the concept network. Try another term.`
      );
      return;
    }
    if (path.includes(term)) {
      setError("You've already used that concept.");
      return;
    }
    if (!isConnected(currentConcept, term)) {
      setError(
        `"${term}" isn't directly connected to "${currentConcept}".`
      );
      return;
    }
    const newPath = [...path, term];
    setPath(newPath);
    if (term === puzzle.end) {
      setWon(true);
    }
    (_a = inputRef.current) == null ? void 0 : _a.focus();
  }
  function handleKey(e) {
    if (e.key === "Enter") handleAdd();
  }
  function nextPuzzle() {
    const next = puzzleIdx + 1;
    if (next >= PUZZLES.length) {
      setGameOver(true);
    } else {
      setPuzzleIdx(next);
      setPath([]);
      setInput("");
      setError("");
      setWon(false);
      setShowSolution(false);
    }
  }
  const fullPath = [puzzle.start, ...path];
  const pathLen = fullPath.length;
  const score = won ? Math.max(0, optimalLength + 3 - pathLen) : 0;
  if (gameOver) {
    return /* @__PURE__ */ jsx("div", { style: S.root, children: /* @__PURE__ */ jsxs("div", { style: S.endBox, children: [
      /* @__PURE__ */ jsx("div", { style: S.endGlyph, children: "◉" }),
      /* @__PURE__ */ jsx("div", { style: S.endTitle, children: "Network Traversed" }),
      /* @__PURE__ */ jsx("div", { style: S.endSub, children: "All three concept bridges crossed." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { style: S.root, children: [
    /* @__PURE__ */ jsxs("div", { style: S.topBar, children: [
      /* @__PURE__ */ jsx("span", { style: S.brand, children: "CONCEPT MAP" }),
      /* @__PURE__ */ jsxs("span", { style: S.puzzleCount, children: [
        puzzleIdx + 1,
        " / ",
        PUZZLES.length
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: S.instruction, children: "Connect two philosophical concepts via the shortest possible chain of related ideas." }),
    /* @__PURE__ */ jsxs("div", { style: S.endpoints, children: [
      /* @__PURE__ */ jsxs("div", { style: S.node, children: [
        /* @__PURE__ */ jsx("div", { style: S.nodeGlyph, children: "◎" }),
        /* @__PURE__ */ jsx("div", { style: S.nodeLabel, children: "START" }),
        /* @__PURE__ */ jsx("div", { style: S.nodeName, children: puzzle.start })
      ] }),
      /* @__PURE__ */ jsx("div", { style: S.arrow, children: "→" }),
      /* @__PURE__ */ jsxs("div", { style: S.node, children: [
        /* @__PURE__ */ jsx("div", { style: S.nodeGlyph, children: "◉" }),
        /* @__PURE__ */ jsx("div", { style: S.nodeLabel, children: "END" }),
        /* @__PURE__ */ jsx("div", { style: S.nodeName, children: puzzle.end })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: S.pathDisplay, children: [
      fullPath.map((c, i) => /* @__PURE__ */ jsxs("span", { style: S.pathItem, children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            style: i === 0 ? S.pathStart : i === fullPath.length - 1 && won ? S.pathEnd : S.pathMid,
            children: c
          }
        ),
        i < fullPath.length - 1 && /* @__PURE__ */ jsx("span", { style: S.pathArrow, children: " — " })
      ] }, i)),
      !won && /* @__PURE__ */ jsx("span", { style: S.cursor, children: "▋" })
    ] }),
    !won && !showSolution && /* @__PURE__ */ jsxs("div", { style: S.inputRow, children: [
      /* @__PURE__ */ jsxs("div", { style: S.fromLabel, children: [
        "From ",
        /* @__PURE__ */ jsx("strong", { children: currentConcept }),
        ", go to:"
      ] }),
      /* @__PURE__ */ jsxs("div", { style: S.inputWrap, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            style: S.input,
            value: input,
            onChange: (e) => {
              setInput(e.target.value);
              setError("");
            },
            onKeyDown: handleKey,
            placeholder: "type a concept…",
            autoFocus: true
          }
        ),
        /* @__PURE__ */ jsx("button", { style: S.addBtn, onClick: handleAdd, children: "→" })
      ] }),
      error && /* @__PURE__ */ jsx("div", { style: S.error, children: error })
    ] }),
    won && /* @__PURE__ */ jsxs("div", { style: S.wonBox, children: [
      /* @__PURE__ */ jsxs("div", { style: S.wonTitle, children: [
        "Path found — ",
        pathLen - 1,
        " step",
        pathLen - 2 !== 1 ? "s" : ""
      ] }),
      /* @__PURE__ */ jsxs("div", { style: S.wonDetail, children: [
        "Optimal: ",
        optimalLength - 1,
        " steps",
        pathLen === optimalLength ? " — perfect!" : pathLen <= optimalLength + 1 ? " — near-optimal." : "."
      ] }),
      score > 0 && /* @__PURE__ */ jsxs("div", { style: S.wonScore, children: [
        "+",
        score,
        " pts"
      ] }),
      /* @__PURE__ */ jsx("button", { style: S.nextBtn, onClick: nextPuzzle, children: puzzleIdx + 1 < PUZZLES.length ? "Next Puzzle →" : "Finish" })
    ] }),
    !won && !showSolution && path.length > optimalLength && /* @__PURE__ */ jsx("button", { style: S.hintBtn, onClick: () => setShowSolution(true), children: "Reveal optimal path" }),
    showSolution && /* @__PURE__ */ jsxs("div", { style: S.solutionBox, children: [
      /* @__PURE__ */ jsx("div", { style: S.solutionLabel, children: "Optimal path:" }),
      /* @__PURE__ */ jsx("div", { style: S.solutionPath, children: puzzle.solution.join(" — ") }),
      /* @__PURE__ */ jsx("div", { style: S.solutionExp, children: puzzle.explanation }),
      /* @__PURE__ */ jsx("button", { style: S.nextBtn, onClick: nextPuzzle, children: puzzleIdx + 1 < PUZZLES.length ? "Next Puzzle →" : "Finish" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: S.optimalHint, children: [
      "Optimal: ",
      optimalLength - 1,
      " steps"
    ] })
  ] });
}
const S = {
  root: {
    minHeight: "100vh",
    background: "#0a0e1a",
    color: "#c8d8f0",
    fontFamily: "'Courier New', monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "120px 16px 60px"
  },
  topBar: {
    width: "100%",
    maxWidth: 600,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8
  },
  brand: {
    fontSize: 11,
    letterSpacing: "0.22em",
    color: "#4a7fc0",
    fontWeight: "bold"
  },
  puzzleCount: {
    fontSize: 11,
    color: "#456",
    letterSpacing: "0.1em"
  },
  instruction: {
    fontSize: 13,
    color: "#4a6a8a",
    maxWidth: 500,
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 36
  },
  endpoints: {
    display: "flex",
    alignItems: "center",
    gap: 24,
    marginBottom: 32
  },
  node: {
    textAlign: "center"
  },
  nodeGlyph: {
    fontSize: 28,
    color: "#4a7fc0",
    marginBottom: 4
  },
  nodeLabel: {
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "#345",
    marginBottom: 4
  },
  nodeName: {
    fontSize: 18,
    color: "#90c0f0",
    fontWeight: "bold",
    letterSpacing: "0.05em"
  },
  arrow: {
    fontSize: 24,
    color: "#234"
  },
  pathDisplay: {
    width: "100%",
    maxWidth: 600,
    minHeight: 52,
    background: "#0f1520",
    border: "1px solid #1e2d45",
    borderRadius: 4,
    padding: "14px 18px",
    fontSize: 15,
    lineHeight: 1.8,
    marginBottom: 24,
    wordBreak: "break-word"
  },
  pathItem: {},
  pathStart: { color: "#4a7fc0" },
  pathMid: { color: "#90c0f0" },
  pathEnd: { color: "#50e090", fontWeight: "bold" },
  pathArrow: { color: "#234", margin: "0 2px" },
  cursor: { color: "#4a7fc0" },
  inputRow: {
    width: "100%",
    maxWidth: 600,
    marginBottom: 16
  },
  fromLabel: {
    fontSize: 13,
    color: "#4a6a8a",
    marginBottom: 8
  },
  inputWrap: {
    display: "flex",
    gap: 8
  },
  input: {
    flex: 1,
    background: "#0f1520",
    border: "1px solid #2a4060",
    borderRadius: 3,
    color: "#90c0f0",
    fontSize: 15,
    padding: "10px 14px",
    fontFamily: "'Courier New', monospace",
    outline: "none"
  },
  addBtn: {
    background: "#1e3050",
    border: "1px solid #2a4060",
    color: "#4a7fc0",
    fontSize: 18,
    padding: "10px 18px",
    borderRadius: 3,
    cursor: "pointer"
  },
  error: {
    fontSize: 12,
    color: "#c05050",
    marginTop: 8,
    lineHeight: 1.5
  },
  wonBox: {
    width: "100%",
    maxWidth: 600,
    background: "#0a1f14",
    border: "1px solid #2a5040",
    borderRadius: 4,
    padding: "20px 24px",
    marginBottom: 16
  },
  wonTitle: {
    fontSize: 18,
    color: "#50e090",
    marginBottom: 6
  },
  wonDetail: {
    fontSize: 13,
    color: "#3a8060",
    marginBottom: 12
  },
  wonScore: {
    fontSize: 22,
    color: "#50e090",
    fontWeight: "bold",
    marginBottom: 16
  },
  nextBtn: {
    background: "#1a3a28",
    border: "1px solid #2a5040",
    color: "#50e090",
    fontSize: 14,
    padding: "10px 24px",
    borderRadius: 3,
    cursor: "pointer",
    fontFamily: "monospace",
    letterSpacing: "0.05em"
  },
  hintBtn: {
    background: "transparent",
    border: "1px solid #2a4060",
    color: "#4a6a8a",
    fontSize: 12,
    padding: "8px 16px",
    borderRadius: 3,
    cursor: "pointer",
    fontFamily: "monospace",
    marginBottom: 16
  },
  solutionBox: {
    width: "100%",
    maxWidth: 600,
    background: "#10141e",
    border: "1px solid #2a3050",
    borderRadius: 4,
    padding: "20px 24px",
    marginBottom: 16
  },
  solutionLabel: {
    fontSize: 11,
    color: "#345",
    letterSpacing: "0.15em",
    marginBottom: 10,
    textTransform: "uppercase"
  },
  solutionPath: {
    fontSize: 15,
    color: "#5090d0",
    marginBottom: 12,
    lineHeight: 1.6
  },
  solutionExp: {
    fontSize: 13,
    color: "#4a6a8a",
    lineHeight: 1.7,
    fontStyle: "italic",
    marginBottom: 16
  },
  optimalHint: {
    fontSize: 11,
    color: "#234",
    marginTop: 8,
    letterSpacing: "0.1em"
  },
  endBox: {
    textAlign: "center",
    marginTop: 80
  },
  endGlyph: {
    fontSize: 48,
    color: "#4a7fc0",
    marginBottom: 16
  },
  endTitle: {
    fontSize: 24,
    color: "#90c0f0",
    marginBottom: 8,
    letterSpacing: "0.08em"
  },
  endSub: {
    fontSize: 14,
    color: "#4a6a8a"
  }
};
const ARGUMENTS = [
  {
    title: "Descartes' Cogito",
    philosopher: "René Descartes, Meditations II (1641)",
    conclusion: "I exist as a thinking thing.",
    correct: [
      "I can doubt everything I perceive through the senses.",
      "Even an evil demon could deceive me about the external world.",
      "But I cannot doubt that I am doubting.",
      "Doubting is a form of thinking.",
      "If I am thinking, then something must be doing the thinking.",
      "Therefore: I exist as a thinking thing."
    ],
    hiddenPremise: "The act of doubting cannot be faked from the inside.",
    hiddenIdx: 3,
    note: "The hidden premise — that doubting cannot be doubted — is what seals the argument against the demon hypothesis."
  },
  {
    title: "Hume on Causation",
    philosopher: "David Hume, Enquiry Concerning Human Understanding (1748)",
    conclusion: "Our idea of necessary connection has no rational foundation.",
    correct: [
      "We believe that causes necessarily produce their effects.",
      "All ideas must be derived from prior impressions.",
      "We have never observed necessary connection itself — only regular succession.",
      "The idea of necessity therefore cannot come from sense experience.",
      "Nor can it come from reason alone, since any cause could conceivably have a different effect.",
      "Therefore: Our idea of necessary connection has no rational foundation."
    ],
    hiddenPremise: "Custom or habit, not reason, produces our expectation of causes.",
    hiddenIdx: 4,
    note: "The hidden conclusion is that causation is a habit of the mind, not a fact about the world — Hume's most radical step."
  },
  {
    title: "Kant's Moral Law",
    philosopher: "Immanuel Kant, Groundwork of the Metaphysics of Morals (1785)",
    conclusion: "Act only according to that maxim by which you can at the same time will that it become a universal law.",
    correct: [
      "Moral worth comes from acting from duty, not from inclination or consequence.",
      "A good will is good not because of what it achieves, but because of what it wills.",
      "The only unconditionally good thing is a good will.",
      "Rational beings are ends in themselves, never merely means.",
      "A rational being must be able to universalise the maxim of any action it performs.",
      "Therefore: Act only according to that maxim by which you can at the same time will that it become a universal law."
    ],
    hiddenPremise: "Moral law must be categorical, not hypothetical.",
    hiddenIdx: 4,
    note: "The hidden premise — that moral law must be categorical — is what rules out consequentialist and prudential alternatives."
  }
];
function shuffle$1(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function initItems(correct) {
  const body = correct.slice(0, -1);
  const shuffled = shuffle$1(body);
  return shuffled.map((text, i) => ({ id: i, text }));
}
function isCorrect(items, correct) {
  return items.every((item, i) => item.text === correct[i]);
}
function ArgumentReconstruction() {
  const [argIdx, setArgIdx] = useState(0);
  const [items, setItems] = useState(() => initItems(ARGUMENTS[0].correct));
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showNote, setShowNote] = useState(false);
  const [done, setDone] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const arg = ARGUMENTS[argIdx];
  const correct = arg.correct.slice(0, -1);
  const won = submitted && isCorrect(items, correct);
  function handleDragStart(idx) {
    setDragging(idx);
  }
  function handleDragEnter(idx) {
    if (dragging === null || dragging === idx) return;
    const newItems = [...items];
    const [moved] = newItems.splice(dragging, 1);
    newItems.splice(idx, 0, moved);
    setItems(newItems);
    setDragging(idx);
  }
  function handleDragEnd() {
    setDragging(null);
    setDragOver(null);
  }
  function handleSubmit() {
    setAttempts((a) => a + 1);
    setSubmitted(true);
    if (isCorrect(items, correct)) {
      const pts = attempts === 0 ? 3 : 1;
      setScore((s) => s + pts);
    }
  }
  function handleReset() {
    setItems(initItems(arg.correct));
    setSubmitted(false);
  }
  function handleNext() {
    const next = argIdx + 1;
    if (next >= ARGUMENTS.length) {
      setDone(true);
    } else {
      setArgIdx(next);
      setItems(initItems(ARGUMENTS[next].correct));
      setSubmitted(false);
      setAttempts(0);
      setShowNote(false);
    }
  }
  if (done) {
    return /* @__PURE__ */ jsxs("div", { style: T.root, children: [
      /* @__PURE__ */ jsx(SEO, { title: "Argument Reconstruction" }),
      /* @__PURE__ */ jsxs("div", { style: T.doneCard, children: [
        /* @__PURE__ */ jsx("div", { style: T.doneStamp, children: "§" }),
        /* @__PURE__ */ jsx("div", { style: T.doneTitle, children: "All Arguments Reconstructed" }),
        /* @__PURE__ */ jsxs("div", { style: T.doneScore, children: [
          "Score: ",
          score,
          " / ",
          ARGUMENTS.length * 3
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs("div", { style: T.root, children: [
    /* @__PURE__ */ jsx(SEO, { title: "Argument Reconstruction" }),
    /* @__PURE__ */ jsxs("div", { style: T.header, children: [
      /* @__PURE__ */ jsx("span", { style: T.brand, children: "ARGUMENT RECONSTRUCTION" }),
      /* @__PURE__ */ jsxs("span", { style: T.score, children: [
        score,
        " pts"
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: T.meta, children: [
      /* @__PURE__ */ jsx("div", { style: T.argTitle, children: arg.title }),
      /* @__PURE__ */ jsx("div", { style: T.argPhil, children: arg.philosopher })
    ] }),
    /* @__PURE__ */ jsx("div", { style: T.task, children: "Drag the premises into the correct logical order. The conclusion is fixed." }),
    /* @__PURE__ */ jsxs("div", { style: T.argBox, children: [
      /* @__PURE__ */ jsx("div", { style: T.premisesSection, children: items.map((item, i) => {
        const isRight = submitted && item.text === correct[i];
        const isWrong = submitted && item.text !== correct[i];
        return /* @__PURE__ */ jsxs(
          "div",
          {
            draggable: !submitted,
            onDragStart: () => handleDragStart(i),
            onDragEnter: () => handleDragEnter(i),
            onDragEnd: handleDragEnd,
            onDragOver: (e) => e.preventDefault(),
            style: {
              ...T.premise,
              ...dragging === i ? T.premiseDragging : {},
              ...isRight ? T.premiseRight : {},
              ...isWrong ? T.premiseWrong : {},
              cursor: submitted ? "default" : "grab"
            },
            children: [
              /* @__PURE__ */ jsx("span", { style: T.premiseNum, children: i + 1 }),
              /* @__PURE__ */ jsx("span", { style: T.premiseText, children: item.text }),
              !submitted && /* @__PURE__ */ jsx("span", { style: T.handle, children: "⠿" }),
              isRight && /* @__PURE__ */ jsx("span", { style: T.tick, children: "✓" }),
              isWrong && /* @__PURE__ */ jsx("span", { style: T.cross, children: "✗" })
            ]
          },
          item.id
        );
      }) }),
      /* @__PURE__ */ jsxs("div", { style: T.conclusion, children: [
        /* @__PURE__ */ jsx("span", { style: T.conclusionLabel, children: "∴ CONCLUSION" }),
        /* @__PURE__ */ jsx("span", { style: T.conclusionText, children: arg.conclusion })
      ] })
    ] }),
    !submitted && /* @__PURE__ */ jsx("button", { style: T.submitBtn, onClick: handleSubmit, children: "Submit Order" }),
    submitted && !won && /* @__PURE__ */ jsxs("div", { style: T.feedback, children: [
      /* @__PURE__ */ jsx("div", { style: T.fbTitle, children: "Not quite — review the highlighted premises and try again." }),
      /* @__PURE__ */ jsx("button", { style: T.retryBtn, onClick: handleReset, children: "Reorder & Retry" })
    ] }),
    submitted && won && /* @__PURE__ */ jsxs("div", { style: T.wonBox, children: [
      /* @__PURE__ */ jsxs("div", { style: T.wonTitle, children: [
        "✓ Correct reconstruction",
        attempts === 1 ? " — first attempt!" : ""
      ] }),
      !showNote && /* @__PURE__ */ jsx(
        "button",
        {
          style: T.hintBtn,
          onClick: () => setShowNote(true),
          children: "Reveal hidden premise"
        }
      ),
      showNote && /* @__PURE__ */ jsxs("div", { style: T.noteBox, children: [
        /* @__PURE__ */ jsx("div", { style: T.noteLabel, children: "HIDDEN PREMISE" }),
        /* @__PURE__ */ jsxs("div", { style: T.noteText, children: [
          '"',
          arg.hiddenPremise,
          '"'
        ] }),
        /* @__PURE__ */ jsx("div", { style: T.noteExpl, children: arg.note })
      ] }),
      /* @__PURE__ */ jsx("button", { style: T.nextBtn, onClick: handleNext, children: argIdx + 1 < ARGUMENTS.length ? "Next Argument →" : "Finish" })
    ] })
  ] });
}
const T = {
  root: {
    minHeight: "100vh",
    background: "#1a1814",
    color: "#d0c8b8",
    fontFamily: "'Courier New', Courier, monospace",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "100px 16px 60px"
  },
  header: {
    width: "100%",
    maxWidth: 660,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 28
  },
  brand: {
    fontSize: 10,
    letterSpacing: "0.25em",
    color: "#7a6a4a"
  },
  score: {
    fontSize: 10,
    color: "#7a6a4a",
    letterSpacing: "0.15em"
  },
  meta: {
    width: "100%",
    maxWidth: 660,
    borderLeft: "3px solid #5a4a2a",
    paddingLeft: 16,
    marginBottom: 24
  },
  argTitle: {
    fontSize: 20,
    color: "#e0d0a0",
    marginBottom: 4,
    fontWeight: "bold",
    letterSpacing: "0.04em"
  },
  argPhil: {
    fontSize: 12,
    color: "#6a5a3a",
    letterSpacing: "0.05em"
  },
  task: {
    fontSize: 12,
    color: "#5a4a2a",
    marginBottom: 20,
    textAlign: "center",
    maxWidth: 660,
    width: "100%"
  },
  argBox: {
    width: "100%",
    maxWidth: 660,
    border: "1px solid #2a2218",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 20
  },
  premisesSection: {
    padding: "4px 0",
    background: "#1e1a14"
  },
  premise: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "14px 16px",
    borderBottom: "1px solid #2a2218",
    transition: "background 0.15s",
    userSelect: "none"
  },
  premiseDragging: {
    background: "#2a2418",
    opacity: 0.7
  },
  premiseRight: {
    background: "#1a2a18",
    borderLeft: "3px solid #4a8a4a"
  },
  premiseWrong: {
    background: "#2a1a18",
    borderLeft: "3px solid #8a4a4a"
  },
  premiseNum: {
    fontSize: 10,
    color: "#4a3a1a",
    minWidth: 16,
    paddingTop: 2,
    letterSpacing: "0.1em"
  },
  premiseText: {
    fontSize: 14,
    lineHeight: 1.6,
    flex: 1,
    color: "#c0b898"
  },
  handle: {
    fontSize: 16,
    color: "#3a3020",
    minWidth: 18
  },
  tick: {
    color: "#4a8a4a",
    fontSize: 14,
    minWidth: 18
  },
  cross: {
    color: "#8a4a4a",
    fontSize: 14,
    minWidth: 18
  },
  conclusion: {
    padding: "16px 18px",
    background: "#121008",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    borderTop: "2px solid #3a3020"
  },
  conclusionLabel: {
    fontSize: 9,
    color: "#6a5a2a",
    letterSpacing: "0.2em",
    minWidth: 72,
    paddingTop: 3
  },
  conclusionText: {
    fontSize: 14,
    color: "#e0d0a0",
    lineHeight: 1.6,
    fontStyle: "italic"
  },
  submitBtn: {
    padding: "12px 32px",
    background: "#3a3020",
    border: "1px solid #5a4a2a",
    color: "#d0c080",
    fontSize: 13,
    fontFamily: "monospace",
    letterSpacing: "0.1em",
    cursor: "pointer",
    borderRadius: 2,
    marginBottom: 16
  },
  feedback: {
    width: "100%",
    maxWidth: 660,
    background: "#2a1818",
    border: "1px solid #4a2a2a",
    borderRadius: 3,
    padding: "16px 20px"
  },
  fbTitle: {
    fontSize: 13,
    color: "#a06060",
    marginBottom: 12
  },
  retryBtn: {
    background: "transparent",
    border: "1px solid #4a2a2a",
    color: "#a06060",
    fontSize: 12,
    padding: "8px 18px",
    cursor: "pointer",
    fontFamily: "monospace",
    borderRadius: 2
  },
  wonBox: {
    width: "100%",
    maxWidth: 660,
    background: "#141e12",
    border: "1px solid #2a4028",
    borderRadius: 3,
    padding: "20px 24px"
  },
  wonTitle: {
    fontSize: 15,
    color: "#70c070",
    marginBottom: 16
  },
  hintBtn: {
    background: "transparent",
    border: "1px dashed #2a4028",
    color: "#4a7a4a",
    fontSize: 12,
    padding: "8px 16px",
    cursor: "pointer",
    fontFamily: "monospace",
    borderRadius: 2,
    marginBottom: 16,
    display: "block"
  },
  noteBox: {
    background: "#0e160c",
    border: "1px solid #2a4028",
    borderRadius: 2,
    padding: "16px 18px",
    marginBottom: 16
  },
  noteLabel: {
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "#3a5a3a",
    marginBottom: 8,
    textTransform: "uppercase"
  },
  noteText: {
    fontSize: 14,
    color: "#90c090",
    fontStyle: "italic",
    marginBottom: 10,
    lineHeight: 1.6
  },
  noteExpl: {
    fontSize: 12,
    color: "#4a6a4a",
    lineHeight: 1.7
  },
  nextBtn: {
    background: "#1a2a18",
    border: "1px solid #2a4028",
    color: "#70c070",
    fontSize: 13,
    padding: "10px 24px",
    cursor: "pointer",
    fontFamily: "monospace",
    borderRadius: 2,
    letterSpacing: "0.06em",
    display: "block"
  },
  doneCard: {
    textAlign: "center",
    marginTop: 80
  },
  doneStamp: {
    fontSize: 60,
    color: "#5a4a2a",
    marginBottom: 16
  },
  doneTitle: {
    fontSize: 20,
    color: "#d0c080",
    marginBottom: 12,
    letterSpacing: "0.06em"
  },
  doneScore: {
    fontSize: 16,
    color: "#7a6a4a",
    fontFamily: "monospace"
  }
};
const PHASES = [
  {
    id: "pre",
    label: "Pre-Science",
    color: "#6a6a7a",
    desc: "No dominant paradigm; competing schools"
  },
  {
    id: "normal",
    label: "Normal Science",
    color: "#4a7aaa",
    desc: "Puzzle-solving within accepted framework"
  },
  {
    id: "anomaly",
    label: "Anomaly",
    color: "#aa8a30",
    desc: "Puzzle that resists standard solutions"
  },
  {
    id: "crisis",
    label: "Crisis",
    color: "#aa5a30",
    desc: "Paradigm openly questioned; rules loosen"
  },
  {
    id: "revolution",
    label: "Revolution",
    color: "#7aaa4a",
    desc: "New paradigm displaces the old"
  }
];
const CASES = [
  {
    paradigm: "Ptolemaic Astronomy",
    statement: "Astronomers introduce epicycles upon epicycles to make planetary motion fit the Earth-centred model. The system still works... mostly.",
    correct: "anomaly",
    explanation: "This is a textbook anomaly: the paradigm absorbs discrepancies through ad hoc adjustments rather than abandoning its core assumption."
  },
  {
    paradigm: "Newtonian Mechanics",
    statement: "A young physicist measures the perihelion precession of Mercury, noticing divergence from Newton's prediction by 43 arcseconds per century. The community notes the discrepancy but moves on.",
    correct: "anomaly",
    explanation: "Known since 1859 and unresolved for sixty years, this was a persistent anomaly that eventually contributed to the crisis preceding relativity."
  },
  {
    paradigm: "Galenic Medicine",
    statement: "Medical schools throughout Europe teach that blood is consumed by the body and continuously produced by the liver. Students learn to diagnose imbalances in the four humours.",
    correct: "normal",
    explanation: "Normal science: a settled framework being transmitted, applied, and extended — not questioned. Anomalies exist but are suppressed."
  },
  {
    paradigm: "Phlogiston Chemistry",
    statement: "Antoine Lavoisier demonstrates that metals gain mass when they calcinate. Phlogiston chemists cannot reconcile this: phlogiston should be released, not absorbed.",
    correct: "crisis",
    explanation: "This marks crisis: the anomaly of weight gain attacks a core commitment of the paradigm. Competing explanations proliferate."
  },
  {
    paradigm: "Classical Physics",
    statement: "Einstein publishes the special theory of relativity. Initially dismissed, then debated fiercely, and finally, over two decades, adopted.",
    correct: "revolution",
    explanation: "A revolution: a new paradigm replaces the old not by refutation alone, but through a gestalt shift in the community's fundamental commitments."
  },
  {
    paradigm: "Spontaneous Generation",
    statement: "Multiple naturalists conduct experiments on whether living things can arise from non-living matter, with inconsistent methodology and conflicting results.",
    correct: "pre",
    explanation: "Pre-science: competing frameworks, no settled method, no exemplary achievement to guide puzzle-solving. The field is not yet a science in Kuhn's sense."
  },
  {
    paradigm: "Newtonian Mechanics",
    statement: "A 17th century engineer uses Newtonian mechanics to calculate the trajectory of a cannonball.",
    correct: "normal",
    explanation: "Normal science in its purest form: applying the paradigm's tools to solve a puzzle it was designed for."
  },
  {
    paradigm: "Quantum Mechanics (Copenhagen)",
    statement: "Einstein, Podolsky, and Rosen argue that quantum mechanics must be incomplete. Bohr responds. Physicists split. Bell's inequalities are a generation away.",
    correct: "crisis",
    explanation: "A prolonged crisis: the paradigm cannot fully satisfy its most eminent practitioners; foundational questions are reopened."
  }
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function ParadigmShift() {
  var _a;
  const [cases] = useState(() => shuffle(CASES));
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [attempts, setAttempts] = useState(0);
  useEffect(() => {
    document.title = "Paradigm Shift | Axiom";
  }, []);
  const c = cases[idx];
  const isCorrect2 = selected === c.correct;
  function handleSelect(id) {
    if (submitted) return;
    setSelected(id);
  }
  function handleSubmit() {
    if (!selected) return;
    setAttempts((a) => a + 1);
    setSubmitted(true);
    if (selected === c.correct) {
      setScore((s) => s + (attempts === 0 ? 2 : 1));
    }
  }
  function handleNext() {
    if (idx + 1 >= cases.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
      setAttempts(0);
    }
  }
  function handleRetry() {
    setSelected(null);
    setSubmitted(false);
  }
  const maxScore = cases.length * 2;
  if (done) {
    const pct = Math.round(score / maxScore * 100);
    return /* @__PURE__ */ jsx("div", { style: P.root, children: /* @__PURE__ */ jsxs("div", { style: P.doneWrap, children: [
      /* @__PURE__ */ jsxs("div", { style: P.doneCircle, children: [
        score,
        /* @__PURE__ */ jsxs("span", { style: P.doneMax, children: [
          "/",
          maxScore
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { style: P.doneTitle, children: "Scientific Revolutions Mapped" }),
      /* @__PURE__ */ jsx("div", { style: P.doneSub, children: pct >= 80 ? "Kuhn would call you a revolutionary scientist." : pct >= 55 ? "Solid — you understand the structure of normal science." : "The paradigm of your reasoning requires revision." })
    ] }) });
  }
  return /* @__PURE__ */ jsxs("div", { style: P.root, children: [
    /* @__PURE__ */ jsxs("div", { style: P.topBar, children: [
      /* @__PURE__ */ jsx("span", { style: P.brand, children: "PARADIGM SHIFT" }),
      /* @__PURE__ */ jsxs("span", { style: P.progress, children: [
        idx + 1,
        " / ",
        cases.length
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: P.phaseKey, children: PHASES.map((ph) => /* @__PURE__ */ jsxs("div", { style: P.keyItem, children: [
      /* @__PURE__ */ jsx("div", { style: { ...P.keyDot, background: ph.color } }),
      /* @__PURE__ */ jsx("span", { style: P.keyLabel, children: ph.label })
    ] }, ph.id)) }),
    /* @__PURE__ */ jsxs("div", { style: P.card, children: [
      /* @__PURE__ */ jsx("div", { style: P.paradigmLabel, children: "Paradigm" }),
      /* @__PURE__ */ jsx("div", { style: P.paradigmName, children: c.paradigm }),
      /* @__PURE__ */ jsx("div", { style: P.divider }),
      /* @__PURE__ */ jsx("div", { style: P.statement, children: c.statement })
    ] }),
    /* @__PURE__ */ jsx("div", { style: P.question, children: "Which Kuhnian phase does this describe?" }),
    /* @__PURE__ */ jsx("div", { style: P.phaseGrid, children: PHASES.map((ph) => {
      let style = P.phaseBtn;
      if (selected === ph.id && !submitted)
        style = {
          ...style,
          ...P.phaseBtnSelected,
          borderColor: ph.color,
          color: ph.color
        };
      if (submitted && ph.id === c.correct)
        style = {
          ...style,
          ...P.phaseBtnCorrect,
          borderColor: ph.color,
          color: ph.color,
          background: ph.color + "18"
        };
      if (submitted && ph.id === selected && ph.id !== c.correct)
        style = { ...style, ...P.phaseBtnWrong };
      if (submitted && ph.id !== c.correct && ph.id !== selected)
        style = { ...style, opacity: 0.3 };
      return /* @__PURE__ */ jsxs(
        "button",
        {
          style,
          onClick: () => handleSelect(ph.id),
          disabled: submitted,
          children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                style: {
                  ...P.phaseDot,
                  background: submitted && ph.id === c.correct ? ph.color : selected === ph.id ? ph.color : "#333"
                }
              }
            ),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { style: P.phaseBtnLabel, children: ph.label }),
              /* @__PURE__ */ jsx("div", { style: P.phaseBtnDesc, children: ph.desc })
            ] })
          ]
        },
        ph.id
      );
    }) }),
    !submitted && /* @__PURE__ */ jsx(
      "button",
      {
        style: {
          ...P.submitBtn,
          opacity: selected ? 1 : 0.4,
          cursor: selected ? "pointer" : "default"
        },
        onClick: handleSubmit,
        disabled: !selected,
        children: "Classify"
      }
    ),
    submitted && !isCorrect2 && /* @__PURE__ */ jsxs("div", { style: P.wrongBox, children: [
      /* @__PURE__ */ jsx("div", { style: P.wrongTitle, children: "Not quite. The correct phase is highlighted above." }),
      /* @__PURE__ */ jsx("button", { style: P.retryBtn, onClick: handleRetry, children: "Try again" })
    ] }),
    submitted && isCorrect2 && /* @__PURE__ */ jsxs("div", { style: P.correctBox, children: [
      /* @__PURE__ */ jsxs("div", { style: P.correctTitle, children: [
        "✓ Correct —",
        " ",
        (_a = PHASES.find((p) => p.id === c.correct)) == null ? void 0 : _a.label
      ] }),
      /* @__PURE__ */ jsx("div", { style: P.explanation, children: c.explanation }),
      /* @__PURE__ */ jsx("button", { style: P.nextBtn, onClick: handleNext, children: idx + 1 < cases.length ? "Next Case →" : "Final Score" })
    ] })
  ] });
}
const P = {
  root: {
    minHeight: "100vh",
    background: "#12141c",
    color: "#b0b8c8",
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "120px 16px 60px"
  },
  topBar: {
    width: "100%",
    maxWidth: 680,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20
  },
  brand: {
    fontSize: 10,
    letterSpacing: "0.28em",
    color: "#4a5a7a",
    fontWeight: "600"
  },
  progress: {
    fontSize: 10,
    color: "#3a4a5a",
    letterSpacing: "0.1em"
  },
  phaseKey: {
    display: "flex",
    gap: 16,
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 28,
    maxWidth: 680,
    width: "100%"
  },
  keyItem: {
    display: "flex",
    alignItems: "center",
    gap: 6
  },
  keyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%"
  },
  keyLabel: {
    fontSize: 11,
    color: "#4a5a7a",
    letterSpacing: "0.06em"
  },
  card: {
    width: "100%",
    maxWidth: 680,
    background: "#1a1e28",
    border: "1px solid #2a3048",
    borderRadius: 6,
    padding: "24px 28px",
    marginBottom: 24
  },
  paradigmLabel: {
    fontSize: 9,
    letterSpacing: "0.2em",
    color: "#3a4a6a",
    textTransform: "uppercase",
    marginBottom: 6
  },
  paradigmName: {
    fontSize: 18,
    color: "#8aacdc",
    fontWeight: "600",
    marginBottom: 16,
    letterSpacing: "0.02em"
  },
  divider: {
    height: 1,
    background: "#2a3048",
    marginBottom: 16
  },
  statement: {
    fontSize: 16,
    lineHeight: 1.75,
    color: "#c0c8d8"
  },
  question: {
    fontSize: 13,
    color: "#4a5a7a",
    marginBottom: 16,
    textAlign: "center",
    maxWidth: 680,
    width: "100%",
    letterSpacing: "0.04em"
  },
  phaseGrid: {
    width: "100%",
    maxWidth: 680,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 20
  },
  phaseBtn: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 18px",
    background: "#1a1e28",
    border: "1px solid #2a3048",
    borderRadius: 5,
    cursor: "pointer",
    transition: "all 0.15s",
    textAlign: "left",
    color: "#7a8aaa"
  },
  phaseBtnSelected: {
    background: "#1e2438"
  },
  phaseBtnCorrect: {},
  phaseBtnWrong: {
    background: "#2a1820",
    borderColor: "#6a2a2a",
    color: "#6a4a4a"
  },
  phaseDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
    transition: "background 0.15s"
  },
  phaseBtnLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
    letterSpacing: "0.02em"
  },
  phaseBtnDesc: {
    fontSize: 11,
    opacity: 0.6,
    letterSpacing: "0.02em"
  },
  submitBtn: {
    padding: "12px 36px",
    background: "#2a3a58",
    border: "none",
    color: "#8aaad8",
    fontSize: 14,
    borderRadius: 5,
    fontWeight: "600",
    letterSpacing: "0.08em",
    marginBottom: 16,
    transition: "opacity 0.15s"
  },
  wrongBox: {
    width: "100%",
    maxWidth: 680,
    background: "#1e1418",
    border: "1px solid #3a2228",
    borderRadius: 5,
    padding: "16px 20px"
  },
  wrongTitle: {
    fontSize: 13,
    color: "#8a5a5a",
    marginBottom: 10
  },
  retryBtn: {
    background: "transparent",
    border: "1px solid #3a2228",
    color: "#6a4a4a",
    fontSize: 12,
    padding: "7px 16px",
    borderRadius: 4,
    cursor: "pointer"
  },
  correctBox: {
    width: "100%",
    maxWidth: 680,
    background: "#141e18",
    border: "1px solid #2a4030",
    borderRadius: 5,
    padding: "20px 24px"
  },
  correctTitle: {
    fontSize: 15,
    color: "#60b860",
    marginBottom: 10,
    fontWeight: "600"
  },
  explanation: {
    fontSize: 14,
    color: "#4a7a5a",
    lineHeight: 1.7,
    marginBottom: 18
  },
  nextBtn: {
    background: "#1a3020",
    border: "1px solid #2a5030",
    color: "#60b860",
    fontSize: 13,
    padding: "10px 24px",
    borderRadius: 4,
    cursor: "pointer",
    fontWeight: "600",
    letterSpacing: "0.05em"
  },
  doneWrap: {
    textAlign: "center",
    marginTop: 80
  },
  doneCircle: {
    fontSize: 64,
    color: "#6aace8",
    fontWeight: "bold",
    marginBottom: 16,
    letterSpacing: "-0.02em"
  },
  doneMax: {
    fontSize: 32,
    color: "#3a5a8a"
  },
  doneTitle: {
    fontSize: 18,
    color: "#8aaad8",
    marginBottom: 10,
    letterSpacing: "0.04em"
  },
  doneSub: {
    fontSize: 14,
    color: "#4a5a7a",
    maxWidth: 360,
    margin: "0 auto",
    lineHeight: 1.6,
    fontStyle: "italic"
  }
};
function PrivacyPolicy() {
  return /* @__PURE__ */ jsxs("div", { className: "bg-cream dark:bg-[#0E1A14] min-h-screen", children: [
    /* @__PURE__ */ jsx(
      SEO,
      {
        title: "Privacy Policy",
        path: "/privacy",
        description: "Privacy policy for the Axiom website — what data we collect and how we use it.",
        noindex: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "w-[82%] max-w-3xl mx-auto py-24", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-14", children: [
        /* @__PURE__ */ jsx("p", { className: "label-mono mb-4", children: "Legal" }),
        /* @__PURE__ */ jsx(
          "h1",
          {
            className: "font-heading font-light text-green mb-6",
            style: { fontSize: "clamp(2.5rem, 5vw, 4rem)" },
            children: "Privacy Policy"
          }
        ),
        /* @__PURE__ */ jsx("p", { className: "font-body text-sm text-ink/50 dark:text-ink/50 mb-4", children: "Last updated: May 2025" }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/30" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-14 font-body text-ink/80 dark:text-ink/80 leading-relaxed text-sm", children: [
        /* @__PURE__ */ jsxs("section", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx("p", { children: "Axiom is the philosophy society at NSUT. This policy explains what information is collected when you visit this website and how it is used." }),
          /* @__PURE__ */ jsx("p", { children: "We respect your privacy. We do not track you across sites, we do not sell or share any data with third parties, and we do not use advertising cookies." })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-6", children: "Analytics" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              "This site uses",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://www.goatcounter.com",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-terracotta hover:underline",
                  children: "GoatCounter"
                }
              ),
              " ",
              "— an open-source, cookieless analytics platform — to understand how many people visit each page."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "border border-gold/20 divide-y divide-gold/20", children: [
              [
                [
                  "What is collected",
                  "Page URL, referrer URL, browser name and version, approximate screen size, and country derived from IP address. IP addresses are never stored."
                ],
                [
                  "Cookies",
                  "None. GoatCounter sets no cookies and uses no local storage."
                ],
                [
                  "Personal data",
                  "No personally identifiable information is collected or stored."
                ],
                [
                  "Opt-out",
                  "If you have JavaScript disabled or use a script-blocking browser extension, no analytics data is sent at all."
                ]
              ].map(([label, text]) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex gap-6 px-4 py-3",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-gold uppercase tracking-widest w-32 shrink-0 pt-0.5", children: label }),
                    /* @__PURE__ */ jsx("span", { className: "text-ink/70 dark:text-ink/70", children: text })
                  ]
                },
                label
              )),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-6 px-4 py-3", children: [
                /* @__PURE__ */ jsx("span", { className: "font-mono text-xs text-gold uppercase tracking-widest w-32 shrink-0 pt-0.5", children: "Data location" }),
                /* @__PURE__ */ jsxs("span", { className: "text-ink/70 dark:text-ink/70", children: [
                  "Analytics data is stored on GoatCounter's servers. See the",
                  " ",
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: "https://www.goatcounter.com/help/privacy",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-terracotta hover:underline",
                      children: "GoatCounter privacy policy"
                    }
                  ),
                  " ",
                  "for details."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-ink/40", children: [
              "GoatCounter is GDPR-friendly by design. Learn more at",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://www.goatcounter.com/help/privacy",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-terracotta hover:underline",
                  children: "goatcounter.com/help/privacy"
                }
              ),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-6", children: "External links & embeds" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { children: "This site links to third-party platforms (Instagram, LinkedIn, YouTube, etc.). Visiting those links is subject to each platform's own privacy policy. We have no control over and accept no responsibility for the content or privacy practices of external sites." }),
            /* @__PURE__ */ jsxs("p", { children: [
              "Fonts are loaded from Google Fonts. Google may record font requests; see the",
              " ",
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: "https://policies.google.com/privacy",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-terracotta hover:underline",
                  children: "Google Privacy Policy"
                }
              ),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gold/20" }),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("p", { className: "label-mono mb-6", children: "Contact" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "If you have any questions about this policy, you can reach us via our",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.instagram.com/axiomnsut",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-terracotta hover:underline",
                children: "Instagram"
              }
            ),
            " ",
            "or",
            " ",
            /* @__PURE__ */ jsx(
              "a",
              {
                href: "https://www.linkedin.com/company/axiom-nsut",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-terracotta hover:underline",
                children: "LinkedIn"
              }
            ),
            "."
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function App() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollToTop, {}),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-cream dark:bg-[#0E1A14]", children: [
      /* @__PURE__ */ jsx(NavBar, {}),
      /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxs(Routes, { children: [
        /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/team", element: /* @__PURE__ */ jsx(Team, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "/events", element: /* @__PURE__ */ jsx(Events, {}) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/events/:year",
            element: /* @__PURE__ */ jsx(EventsByYear, {})
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "/colophon", element: /* @__PURE__ */ jsx(Colophon, {}) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/team/:year",
            element: /* @__PURE__ */ jsx(TeamByYear, {})
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "/games", element: /* @__PURE__ */ jsx(Games, {}) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/hermeneutic",
            element: /* @__PURE__ */ jsx(GameHermeneutic, {})
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "/games/epoche", element: /* @__PURE__ */ jsx(GameEpoche, {}) }),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/fallacy",
            element: /* @__PURE__ */ jsx(GameFallacy, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/dialectics",
            element: /* @__PURE__ */ jsx(GameDialectic, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/negative-dialectics",
            element: /* @__PURE__ */ jsx(GameNegativeDialectic, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/sorites",
            element: /* @__PURE__ */ jsx(GameSorites, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/repugnant",
            element: /* @__PURE__ */ jsx(GameRepugnant, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/philosophle",
            element: /* @__PURE__ */ jsx(GamePhilosophle, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/butterfly-job",
            element: /* @__PURE__ */ jsx(GameButterflyJob, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/fallacy-detective",
            element: /* @__PURE__ */ jsx(FallacyDetective, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/philosopher-match",
            element: /* @__PURE__ */ jsx(PhilosopherMatch, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/concept-map",
            element: /* @__PURE__ */ jsx(ConceptMap, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/argument-reconstruction",
            element: /* @__PURE__ */ jsx(ArgumentReconstruction, {})
          }
        ),
        /* @__PURE__ */ jsx(
          Route,
          {
            path: "/games/paradigm-shift",
            element: /* @__PURE__ */ jsx(ParadigmShift, {})
          }
        ),
        /* @__PURE__ */ jsx(Route, { path: "/privacy", element: /* @__PURE__ */ jsx(PrivacyPolicy, {}) }),
        /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound, {}) })
      ] }) }),
      /* @__PURE__ */ jsx(Footer, {})
    ] })
  ] });
}
function render(url) {
  return renderToString(
    /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(HelmetProvider, { children: /* @__PURE__ */ jsx(StaticRouter, { location: url, children: /* @__PURE__ */ jsx(App, {}) }) }) })
  );
}
export {
  render
};
