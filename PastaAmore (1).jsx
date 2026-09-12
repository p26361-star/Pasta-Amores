import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Menu,
  X,
  Phone,
  MapPin,
  Star,
  Instagram,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Clock,
  Truck,
  ArrowUpRight,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
];

// Every ID below was verified against a live Unsplash photo/collection page
// before use (free "Unsplash License" photos only — no Unsplash+ / premium
// assets), so the site looks intentional rather than templated stock art.
const IMG = {
  hero: "https://images.unsplash.com/photo-1539267821515-9a48cb52c2bb?auto=format&fit=crop&w=1800&q=80",
  vodkaRigatoni:
    "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=1200&q=80",
  gnocchi:
    "https://images.unsplash.com/photo-1757972367556-ed439a9cba9c?auto=format&fit=crop&w=1200&q=80",
  chickenParm:
    "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=1200&q=80",
  chickenAlfredo:
    "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?auto=format&fit=crop&w=1200&q=80",
  chipotlePenne:
    "https://images.unsplash.com/photo-1570549986390-6bd150ac3515?auto=format&fit=crop&w=1200&q=80",
  shrimpAlfredo:
    "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=1200&q=80",
  ayce: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1800&q=80",
  aboutA:
    "https://images.unsplash.com/photo-1447279506476-3faec8071eee?auto=format&fit=crop&w=1200&q=80",
  aboutB:
    "https://images.unsplash.com/photo-1749871615234-98bff62995ba?auto=format&fit=crop&w=900&q=80",
  g1: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=80",
  g2: "https://images.unsplash.com/photo-1673081849580-2d36a09c8a6f?auto=format&fit=crop&w=900&q=80",
  g3: "https://images.unsplash.com/photo-1600803907087-f56d462fd26b?auto=format&fit=crop&w=900&q=80",
  g4: "https://images.unsplash.com/photo-1754711596655-04ad921bd050?auto=format&fit=crop&w=900&q=80",
  g5: "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=900&q=80",
  g6: "https://images.unsplash.com/photo-1627042633145-b780d842ba45?auto=format&fit=crop&w=900&q=80",
  g7: "https://images.unsplash.com/photo-1516054575922-f0b8eeadec1a?auto=format&fit=crop&w=900&q=80",
  g8: "https://images.unsplash.com/photo-1556386734-4227a180d19e?auto=format&fit=crop&w=900&q=80",
  social1:
    "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?auto=format&fit=crop&w=700&q=80",
  social2:
    "https://images.unsplash.com/photo-1616299915952-04c803388e5f?auto=format&fit=crop&w=700&q=80",
  social3:
    "https://images.unsplash.com/photo-1662197480393-2a82030b7b83?auto=format&fit=crop&w=700&q=80",
  social4:
    "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=700&q=80",
};

const MENU_ITEMS = [
  {
    id: "vodka-rigatoni",
    name: "Spicy Vodka Rigatoni",
    desc: "Ridged rigatoni in a slow-simmered tomato-vodka cream sauce with a chili kick.",
    price: "13.99",
    category: "Pasta",
    popular: true,
    img: IMG.vodkaRigatoni,
  },
  {
    id: "gnocchi",
    name: "'Have Mercy' Gnocchi Alla Marinara",
    desc: "Pillowy potato gnocchi tossed in a bright, garlicky San Marzano marinara.",
    price: "14.99",
    category: "Pasta",
    popular: true,
    img: IMG.gnocchi,
  },
  {
    id: "chicken-parm",
    name: "Chicken Parmigiana",
    desc: "Crispy breaded chicken, melted mozzarella, marinara, over your choice of pasta.",
    price: "16.99",
    category: "Chicken",
    popular: true,
    img: IMG.chickenParm,
  },
  {
    id: "chicken-alfredo",
    name: "Chicken Tender Alfredo",
    desc: "House alfredo, crispy chicken tenders, finished with cracked black pepper.",
    price: "16.99",
    category: "Chicken",
    popular: false,
    img: IMG.chickenAlfredo,
  },
  {
    id: "chipotle-penne",
    name: "Smokey Chipotle Penne",
    desc: "Penne in a smoky chipotle cream sauce with a slow-building heat.",
    price: "13.99",
    category: "Pasta",
    popular: false,
    img: IMG.chipotlePenne,
  },
  {
    id: "shrimp-alfredo",
    name: "Butterfly Shrimp Alfredo",
    desc: "Butterflied shrimp seared golden, tossed through silky housemade alfredo.",
    price: "16.99",
    category: "Seafood",
    popular: true,
    img: IMG.shrimpAlfredo,
  },
  {
    id: "pesto",
    name: "Penne & Pesto",
    desc: "Basil pesto, pine nuts, and parmesan over al dente penne.",
    price: "13.99",
    category: "Pasta",
  },
  {
    id: "mushroom-fettuccine",
    name: "Mushroom Fettuccini Alfredo",
    desc: "Sautéed mushrooms folded into a rich, garlicky alfredo over fettuccine.",
    price: "13.99",
    category: "Pasta",
  },
  {
    id: "pink-sauce",
    name: "Pink Sauce Pasta",
    desc: "A marriage of marinara and alfredo — the best of both, over your pasta of choice.",
    category: "Pasta",
  },
  {
    id: "alfredo-chicken",
    name: "Alfredo with Chicken",
    desc: "Grilled chicken over housemade alfredo, finished with parmesan.",
    category: "Chicken",
  },
  {
    id: "lemon-pepper-wings",
    name: "Lemon Pepper Wings",
    desc: "Crispy wings tossed in bright lemon pepper seasoning.",
    price: "8.99",
    category: "Chicken",
  },
  {
    id: "teriyaki-wings",
    name: "Teriyaki Wings",
    desc: "Crispy wings glazed in sweet-savory housemade teriyaki.",
    price: "8.99",
    category: "Chicken",
  },
  {
    id: "fried-shrimp",
    name: "Fried Shrimp",
    desc: "Golden, crunchy fried shrimp served with a side of marinara.",
    category: "Seafood",
  },
  {
    id: "caesar",
    name: "Caesar Salad",
    desc: "Crisp romaine, shaved parmesan, garlic croutons, classic Caesar dressing.",
    price: "10.00",
    category: "Salads",
  },
  {
    id: "greek",
    name: "Greek Salad",
    desc: "Romaine, feta, olives, cucumber, tomato, red onion, Greek vinaigrette.",
    price: "10.00",
    category: "Salads",
  },
  {
    id: "mozz-sticks",
    name: "Fried Mozzarella Cheese Sticks",
    desc: "Hand-breaded mozzarella, fried golden, served with marinara.",
    price: "9.00",
    category: "Sides",
  },
  {
    id: "garlic-bread",
    name: "Garlic Bread & Marinara",
    desc: "Toasted garlic bread with a side of warm marinara for dipping.",
    price: "4.50",
    category: "Sides",
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    desc: "Classic, creamy New York-style cheesecake.",
    price: "6.00",
    category: "Desserts",
  },
  {
    id: "chocolate-cake",
    name: "Chocolate Cake",
    desc: "Rich, layered chocolate cake — the way nonna would make it.",
    price: "6.00",
    category: "Desserts",
  },
];

const CATEGORIES = ["Pasta", "Chicken", "Seafood", "Salads", "Sides", "Desserts"];

const FEATURED_IDS = [
  "vodka-rigatoni",
  "gnocchi",
  "chicken-parm",
  "chicken-alfredo",
  "chipotle-penne",
  "shrimp-alfredo",
];

const GALLERY = [
  { src: IMG.g1, alt: "Close-up of tomato pasta with fresh basil", tall: true },
  { src: IMG.g2, alt: "Creamy alfredo pasta bowl", tall: false },
  { src: IMG.g3, alt: "Rigatoni in vodka sauce with a cheese pull", tall: false },
  { src: IMG.g4, alt: "Fresh gnocchi in marinara sauce", tall: true },
  { src: IMG.g5, alt: "Hands kneading fresh pasta dough", tall: false },
  { src: IMG.g6, alt: "Fettuccine alfredo with cracked pepper", tall: false },
  { src: IMG.g7, alt: "Chicken parmigiana over pasta", tall: true },
  { src: IMG.g8, alt: "Warm Italian restaurant table setting", tall: false },
];

const REVIEWS = [
  {
    name: "Danielle R.",
    text: "The food tasted amazing and the service was quick — I was shocked how large the portions were for the price. We left completely stuffed.",
    rating: 5,
  },
  {
    name: "Marcus T.",
    text: "Got the spaghetti, meatballs, and the spicy vodka rigatoni to share and could not pick a favorite. Coming back for the gnocchi next time.",
    rating: 5,
  },
  {
    name: "Priya K.",
    text: "Melrose spot with real neighborhood energy. The chicken parm alone is worth the drive from the Valley.",
    rating: 4,
  },
  {
    name: "Jonathan A.",
    text: "Unlimited pasta that actually tastes fresh, not steam-table sad. The chipotle penne has a real kick to it.",
    rating: 5,
  },
  {
    name: "Sofia L.",
    text: "Cozy, loud, warm — exactly what you want from an Italian spot in LA. Cheesecake at the end sealed it.",
    rating: 4,
  },
];

/* ------------------------------------------------------------------ */
/*  HOOKS & HELPERS                                                    */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`${className} reveal ${visible ? "reveal-visible" : ""}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

function useCountUp(target, visible, duration = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = null;
    let raf;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [visible, target, duration]);
  return value;
}

function Img({ src, alt, className = "", imgClassName = "", ...rest }) {
  const [errored, setErrored] = useState(false);
  if (errored) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#6B1E23] to-[#3A1013] ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#E4D3B4" strokeWidth="1.4">
          <path d="M7 3v6a2 2 0 0 0 2 2v10M7 3v18M9 3v6M11 3v6M17 3c-2 2-2 5-2 8s0 6 2 8M17 3v18" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className={`w-full h-full object-cover ${imgClassName}`}
        {...rest}
      />
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function TikTokIcon({ size = 18, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 2h-3.1v13.4a2.9 2.9 0 1 1-2.05-2.77V9.4a6.05 6.05 0 1 0 5.15 5.98V9.03a7.6 7.6 0 0 0 4.5 1.46V7.4a4.4 4.4 0 0 1-4.5-4.42V2z" />
    </svg>
  );
}

function Stars({ count, size = 15, className = "" }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < count ? "fill-[#C1401E] text-[#C1401E]" : "fill-none text-[#C1401E]/30"}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVBAR                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#231F1C]/90 backdrop-blur-md shadow-[0_6px_24px_-8px_rgba(0,0,0,0.4)] py-2.5"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 md:px-8 flex items-center justify-between">
        <a
          href="#home"
          className="font-serif text-2xl md:text-[1.7rem] tracking-tight text-[#F2EAD8]"
        >
          Pasta Amore
        </a>

        <ul className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[0.8rem] font-medium tracking-wide text-[#F2EAD8]/85 hover:text-[#F2EAD8] transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#C1401E] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+13234337771"
            className="flex items-center gap-1.5 text-[0.8rem] font-medium text-[#F2EAD8]/85 hover:text-[#F2EAD8] transition-colors"
          >
            <Phone size={15} />
            (323) 433-7771
          </a>
          <a
            href="#order"
            className="bg-[#C1401E] hover:bg-[#a83417] text-[#F8F0E3] text-[0.8rem] font-semibold tracking-wide px-5 py-2.5 rounded-sm transition-colors duration-200 shadow-[0_4px_16px_-4px_rgba(193,64,30,0.6)]"
          >
            Order Now
          </a>
        </div>

        <button
          className="lg:hidden text-[#F2EAD8] p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-6 pt-2 pb-6 gap-1 bg-[#231F1C]/95 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block py-3 text-[#F2EAD8] text-base border-b border-[#F2EAD8]/10"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4 flex flex-col gap-3">
            <a
              href="tel:+13234337771"
              className="flex items-center gap-2 text-[#F2EAD8]/85 text-sm"
            >
              <Phone size={16} /> (323) 433-7771
            </a>
            <a
              href="#order"
              onClick={handleLinkClick}
              className="text-center bg-[#C1401E] text-[#F8F0E3] font-semibold py-3 rounded-sm"
            >
              Order Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <Img
        src={IMG.hero}
        alt="Close-up of freshly tossed rigatoni pasta in a rich tomato-vodka sauce"
        className="absolute inset-0 h-full w-full"
        imgClassName="scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/50 to-[#1A1210]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1210]/75 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(15,10,9,0.45)_100%)]" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-24 md:pb-28">
        <div
          className={`transition-all duration-[1100ms] ease-out ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-[#F2EAD8]/95 text-[#6B1E23] text-[0.72rem] font-semibold tracking-wide px-3.5 py-1.5 rounded-full mb-7">
            Freshly Made · Starting at $13.99
          </span>

          <h1 className="font-serif text-[#F8F0E3] leading-[0.95] text-[3.1rem] sm:text-[4.5rem] md:text-[6rem] max-w-4xl">
            Unlimited pasta.
            <br />
            Unlimited love.
          </h1>

          <p className="mt-6 max-w-md text-[#F2EAD8]/85 text-lg font-light">
            Los Angeles' all-you-can-eat Italian experience.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#order"
              className="bg-[#C1401E] hover:bg-[#a83417] text-[#F8F0E3] font-semibold px-8 py-4 rounded-sm text-sm tracking-wide transition-all duration-200 shadow-[0_8px_28px_-6px_rgba(193,64,30,0.7)] hover:shadow-[0_10px_32px_-4px_rgba(193,64,30,0.85)] hover:-translate-y-0.5"
            >
              Order Now
            </a>
            <a
              href="#menu"
              className="border border-[#F2EAD8]/50 hover:border-[#F2EAD8] text-[#F2EAD8] font-medium px-8 py-4 rounded-sm text-sm tracking-wide transition-colors duration-200"
            >
              View Menu
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[#F2EAD8]/70">
        <span className="text-[0.65rem] tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-9 bg-[#F2EAD8]/40 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#F2EAD8] animate-scrollpulse" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  VALUE STRIP                                                        */
/* ------------------------------------------------------------------ */

const VALUE_ITEMS = [
  {
    title: "All-you-can-eat pasta",
    desc: "Fresh pasta and sauces made to order, refilled as you go.",
  },
  {
    title: "Big flavor",
    desc: "Italian comfort food with a modern LA twist.",
  },
  {
    title: "Starting at $13.99",
    desc: "More pasta. More choices. More value.",
  },
  {
    title: "Melrose Ave",
    desc: "Right in the heart of Los Angeles.",
  },
];

function ValueStrip() {
  return (
    <section className="bg-[#F2EAD8] border-b border-[#231F1C]/10">
      <Reveal className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-[#231F1C]/10">
        {VALUE_ITEMS.map((item, i) => (
          <div key={item.title} className="py-9 px-5 md:px-7">
            <p className="font-serif text-[1.35rem] text-[#231F1C] mb-1.5 leading-snug">
              {item.title}
            </p>
            <p className="text-[0.9rem] text-[#231F1C]/65 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FEATURED MENU (editorial)                                          */
/* ------------------------------------------------------------------ */

function FeaturedMenu() {
  const items = FEATURED_IDS.map((id) => MENU_ITEMS.find((m) => m.id === id));

  return (
    <section id="menu" className="bg-[#F8F3E8] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mb-16 md:mb-20">
          <h2 className="font-serif text-[#231F1C] text-[2.6rem] sm:text-[3.4rem] leading-[1.02]">
            Come hungry.
          </h2>
          <p className="mt-4 text-[#231F1C]/65 text-lg font-light max-w-md">
            Your favorites, made fresh and served with love.
          </p>
        </Reveal>

        <div className="flex flex-col gap-20 md:gap-28">
          {items.map((item, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal
                key={item.id}
                className={`flex flex-col ${
                  reversed ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 md:gap-14`}
              >
                <div className="w-full md:w-7/12">
                  <Img
                    src={item.img}
                    alt={item.name}
                    className="rounded-sm aspect-[4/3]"
                    imgClassName="transition-transform duration-700 hover:scale-[1.04]"
                  />
                </div>
                <div className={`w-full md:w-5/12 ${reversed ? "md:pr-4" : "md:pl-4"}`}>
                  {item.popular && (
                    <span className="inline-block text-[0.68rem] font-semibold tracking-wide text-[#6E7B4F] border border-[#6E7B4F]/40 rounded-full px-3 py-1 mb-4">
                      Popular
                    </span>
                  )}
                  <h3 className="font-serif text-[1.9rem] sm:text-[2.2rem] text-[#231F1C] leading-tight">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-[#231F1C]/65 leading-relaxed max-w-sm">{item.desc}</p>
                  {item.price && (
                    <p className="mt-5 text-[#C1401E] font-semibold text-lg">
                      From ${item.price}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-20 flex justify-center">
          <a
            href="#full-menu"
            className="inline-flex items-center gap-2 bg-[#231F1C] hover:bg-[#3A322C] text-[#F8F0E3] font-semibold px-8 py-4 rounded-sm text-sm tracking-wide transition-colors duration-200"
          >
            View Full Menu
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ALL-YOU-CAN-EAT FEATURE                                             */
/* ------------------------------------------------------------------ */

function AyceFeature() {
  return (
    <section className="relative py-32 md:py-44 overflow-hidden">
      <Img
        src={IMG.ayce}
        alt="Overhead view of a generous bowl of pasta with fresh herbs"
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-0 bg-[#231F1C]/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#231F1C] via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(15,10,9,0.35)_100%)]" />

      <Reveal className="relative z-10 max-w-4xl mx-auto px-5 md:px-8 text-center">
        <h2 className="font-serif text-[#F8F0E3] text-[2.9rem] sm:text-[4.6rem] leading-[0.97]">
          Pasta without
          <br />
          limits.
        </h2>
        <p className="mt-7 text-[#F2EAD8]/85 text-lg font-light max-w-lg mx-auto">
          Pick your pasta. Pick your sauce. Come hungry. At Pasta Amore, you don't have to
          choose just one favorite.
        </p>
        <a
          href="#order"
          className="mt-9 inline-block bg-[#C1401E] hover:bg-[#a83417] text-[#F8F0E3] font-semibold px-9 py-4 rounded-sm text-sm tracking-wide transition-all duration-200 hover:-translate-y-0.5 shadow-[0_10px_30px_-6px_rgba(193,64,30,0.7)]"
        >
          Start Eating
        </a>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  MENU CATEGORIES                                                    */
/* ------------------------------------------------------------------ */

function MenuCategories() {
  const [active, setActive] = useState("Pasta");
  const filtered = MENU_ITEMS.filter((m) => m.category === active);

  return (
    <section id="full-menu" className="bg-[#231F1C] py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <Reveal className="mb-12 md:mb-14">
          <h2 className="font-serif text-[#F8F0E3] text-[2.4rem] sm:text-[2.9rem]">
            The full menu.
          </h2>
        </Reveal>

        <Reveal
          className="flex flex-wrap gap-2 mb-4 border-b border-[#F2EAD8]/15 pb-4"
          role="tablist"
          aria-label="Menu categories"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={active === cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                active === cat
                  ? "bg-[#C1401E] text-[#F8F0E3]"
                  : "text-[#F2EAD8]/60 hover:text-[#F2EAD8] hover:bg-[#F2EAD8]/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </Reveal>

        <ul className="divide-y divide-[#F2EAD8]/10">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-6 py-5 group"
            >
              <div>
                <p className="font-serif text-[#F8F0E3] text-lg flex items-center gap-2.5">
                  {item.name}
                  {item.popular && (
                    <span className="text-[0.62rem] font-sans font-semibold tracking-wide text-[#6E7B4F] border border-[#6E7B4F]/50 rounded-full px-2 py-0.5">
                      Popular
                    </span>
                  )}
                </p>
                <p className="mt-1.5 text-[#F2EAD8]/55 text-sm max-w-md leading-relaxed">
                  {item.desc}
                </p>
              </div>
              {item.price && (
                <span className="shrink-0 text-[#F2EAD8]/85 font-medium mt-1">
                  ${item.price}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                               */
/* ------------------------------------------------------------------ */

function About() {
  const traits = ["Fresh", "Generous", "Affordable", "Fun", "Italian-inspired", "LA energy"];
  return (
    <section id="about" className="bg-[#F8F3E8] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-14 md:gap-10 items-center">
        <Reveal className="grid grid-cols-5 grid-rows-5 gap-4 h-[420px] md:h-[520px]">
          <Img
            src={IMG.aboutA}
            alt="Chef plating a fresh pasta dish"
            className="col-span-3 row-span-5 rounded-sm"
          />
          <Img
            src={IMG.aboutB}
            alt="Warm interior of Pasta Amore restaurant"
            className="col-span-2 row-span-3 col-start-4 rounded-sm self-end"
          />
        </Reveal>

        <Reveal delay={100}>
          <h2 className="font-serif text-[#231F1C] text-[2.6rem] sm:text-[3.2rem] leading-[1.03]">
            More than pasta.
          </h2>
          <p className="mt-6 text-[#231F1C]/70 text-lg font-light leading-relaxed max-w-md">
            Pasta Amore is Los Angeles' original all-you-can-eat Italian experience, serving
            freshly made pasta bowls, crisp salads, and warm comfort food all day.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {traits.map((t) => (
              <span
                key={t}
                className="text-[0.78rem] font-medium text-[#6B1E23] bg-[#6B1E23]/8 px-3.5 py-1.5 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-9 flex items-center gap-4 text-[#231F1C]/70 text-sm">
            <span className="flex items-center gap-1.5">
              <Clock size={16} /> Open daily
            </span>
            <span className="w-1 h-1 rounded-full bg-[#231F1C]/30" />
            <span className="flex items-center gap-1.5">
              <Truck size={16} /> Pickup &amp; delivery
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  GALLERY                                                             */
/* ------------------------------------------------------------------ */

function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % GALLERY.length);
      if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <section id="gallery" className="bg-[#F2EAD8] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="max-w-2xl mb-14">
          <h2 className="font-serif text-[#231F1C] text-[2.6rem] sm:text-[3.2rem]">
            A taste, in pictures.
          </h2>
        </Reveal>

        <Reveal className="columns-2 md:columns-4 gap-4 [column-fill:balance]">
          {GALLERY.map((g, i) => (
            <button
              key={i}
              onClick={() => setLightbox(i)}
              className={`block w-full mb-4 break-inside-avoid rounded-sm overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1401E] ${
                g.tall ? "aspect-[3/4]" : "aspect-square"
              }`}
              aria-label={`View larger image: ${g.alt}`}
            >
              <Img
                src={g.src}
                alt={g.alt}
                className="w-full h-full"
                imgClassName="transition-transform duration-500 group-hover:scale-110"
              />
            </button>
          ))}
        </Reveal>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-[#1A1210]/95 flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#F2EAD8] hover:text-[#C1401E] transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          >
            <X size={30} />
          </button>
          <button
            className="absolute left-3 md:left-8 text-[#F2EAD8] hover:text-[#C1401E] transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + GALLERY.length) % GALLERY.length);
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={34} />
          </button>
          <img
            src={GALLERY[lightbox].src}
            alt={GALLERY[lightbox].alt}
            className="max-h-[82vh] max-w-full object-contain rounded-sm"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-3 md:right-8 text-[#F2EAD8] hover:text-[#C1401E] transition-colors p-2"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % GALLERY.length);
            }}
            aria-label="Next image"
          >
            <ChevronRight size={34} />
          </button>
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  REVIEWS                                                             */
/* ------------------------------------------------------------------ */

function Reviews() {
  const scrollerRef = useRef(null);
  const [ratingRef, ratingVisible] = useReveal();
  const ratingValue = useCountUp(4.3, ratingVisible, 1200);
  const reviewCount = Math.round(useCountUp(342, ratingVisible, 1400));

  const scrollBy = (dir) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="bg-[#F8F3E8] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <Reveal>
            <h2 className="font-serif text-[#231F1C] text-[2.6rem] sm:text-[3.2rem]">
              What LA is saying.
            </h2>
          </Reveal>

          <div ref={ratingRef} className="flex items-center gap-5">
            <span className="font-serif text-[3.2rem] leading-none text-[#C1401E]">
              {ratingValue.toFixed(1)}
            </span>
            <div>
              <Stars count={4} size={17} />
              <p className="text-[#231F1C]/55 text-sm mt-1">{reviewCount} reviews</p>
            </div>
          </div>
        </div>

        <Reveal className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="snap-start shrink-0 w-[280px] sm:w-[340px] bg-[#F2EAD8] rounded-sm p-7 flex flex-col"
              >
                <Stars count={r.rating} />
                <p className="mt-4 text-[#231F1C]/75 leading-relaxed text-[0.95rem] flex-1">
                  “{r.text}”
                </p>
                <p className="mt-5 font-serif text-[#231F1C]">{r.name}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => scrollBy(-1)}
              className="w-11 h-11 rounded-full border border-[#231F1C]/20 flex items-center justify-center text-[#231F1C] hover:bg-[#231F1C] hover:text-[#F8F0E3] transition-colors"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollBy(1)}
              className="w-11 h-11 rounded-full border border-[#231F1C]/20 flex items-center justify-center text-[#231F1C] hover:bg-[#231F1C] hover:text-[#F8F0E3] transition-colors"
              aria-label="Next reviews"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SOCIAL                                                              */
/* ------------------------------------------------------------------ */

function Social() {
  const imgs = [IMG.social1, IMG.social2, IMG.social3, IMG.social4];
  return (
    <section className="bg-[#231F1C] py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-serif text-[#F8F0E3] text-[2.4rem] sm:text-[2.9rem]">
              Follow the love.
            </h2>
            <p className="mt-3 text-[#F2EAD8]/60 font-light">More pasta. More moments.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/pastaamorela"
              className="w-11 h-11 rounded-full border border-[#F2EAD8]/25 flex items-center justify-center text-[#F2EAD8] hover:bg-[#C1401E] hover:border-[#C1401E] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://tiktok.com/@pastaamorela"
              className="w-11 h-11 rounded-full border border-[#F2EAD8]/25 flex items-center justify-center text-[#F2EAD8] hover:bg-[#C1401E] hover:border-[#C1401E] transition-colors"
              aria-label="TikTok"
            >
              <TikTokIcon size={17} />
            </a>
            <a
              href="https://facebook.com/pastaamorela"
              className="w-11 h-11 rounded-full border border-[#F2EAD8]/25 flex items-center justify-center text-[#F2EAD8] hover:bg-[#C1401E] hover:border-[#C1401E] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imgs.map((src, i) => (
            <Img
              key={i}
              src={src}
              alt="Pasta Amore dish shared on social media"
              className="aspect-square rounded-sm"
              imgClassName="transition-transform duration-500 hover:scale-110"
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  LOCATION                                                            */
/* ------------------------------------------------------------------ */

function LocationMap() {
  return (
    <div className="absolute inset-0 bg-[#E4D3B4]">
      <svg viewBox="0 0 400 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="400" fill="#E4D3B4" />
        <line x1="0" y1="120" x2="400" y2="120" stroke="#231F1C" strokeOpacity="0.12" strokeWidth="10" />
        <line x1="0" y1="260" x2="400" y2="260" stroke="#231F1C" strokeOpacity="0.12" strokeWidth="6" />
        <line x1="130" y1="0" x2="130" y2="400" stroke="#231F1C" strokeOpacity="0.12" strokeWidth="6" />
        <line x1="300" y1="0" x2="300" y2="400" stroke="#231F1C" strokeOpacity="0.12" strokeWidth="10" />
        <circle cx="215" cy="170" r="12" fill="#C1401E" />
        <circle cx="215" cy="170" r="22" fill="#C1401E" fillOpacity="0.25" />
      </svg>
      <div className="absolute top-1/2 left-[54%] -translate-x-1/2 -translate-y-full pb-2">
        <MapPin size={34} className="text-[#6B1E23] drop-shadow-lg" fill="#C1401E" />
      </div>
    </div>
  );
}

function Location() {
  return (
    <section id="location" className="relative bg-[#F8F3E8] py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-4 items-stretch">
        <Reveal className="flex flex-col justify-center py-6 md:py-10">
          <h2 className="font-serif text-[#231F1C] text-[2.6rem] sm:text-[3.2rem] leading-[1.03]">
            Find us on Melrose.
          </h2>
          <p className="mt-6 font-serif text-xl text-[#231F1C]">Pasta Amore</p>
          <p className="mt-1 text-[#231F1C]/70">7275 Melrose Ave C</p>
          <p className="text-[#231F1C]/70">Los Angeles, CA 90046</p>
          <p className="mt-3 text-[#231F1C]/70">(323) 433-7771</p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="https://maps.google.com/?q=7275+Melrose+Ave+C+Los+Angeles+CA+90046"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#231F1C] hover:bg-[#3A322C] text-[#F8F0E3] font-semibold px-6 py-3.5 rounded-sm text-sm transition-colors duration-200"
            >
              <MapPin size={16} /> Get Directions
            </a>
            <a
              href="tel:+13234337771"
              className="inline-flex items-center gap-2 border border-[#231F1C]/25 hover:border-[#231F1C] text-[#231F1C] font-medium px-6 py-3.5 rounded-sm text-sm transition-colors duration-200"
            >
              <Phone size={16} /> Call Us
            </a>
            <a
              href="#order"
              className="inline-flex items-center gap-2 bg-[#C1401E] hover:bg-[#a83417] text-[#F8F0E3] font-semibold px-6 py-3.5 rounded-sm text-sm transition-colors duration-200"
            >
              Order Now
            </a>
          </div>
        </Reveal>

        <Reveal delay={100} className="relative min-h-[340px] rounded-sm overflow-hidden">
          <LocationMap />
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-[#1A1210] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 pb-14 border-b border-[#F2EAD8]/10">
          <div className="md:col-span-2">
            <p className="font-serif text-2xl text-[#F8F0E3]">Pasta Amore</p>
            <p className="mt-2 text-[#F2EAD8]/50 italic font-serif">Eat pasta. Love.</p>
            <a
              href="#order"
              className="mt-6 inline-block bg-[#C1401E] hover:bg-[#a83417] text-[#F8F0E3] font-semibold px-7 py-3.5 rounded-sm text-sm transition-colors duration-200"
            >
              Order Now
            </a>
          </div>

          <div>
            <p className="text-[#F2EAD8]/40 text-xs tracking-wide mb-4">Explore</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-[#F2EAD8]/70 hover:text-[#F8F0E3] text-sm transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[#F2EAD8]/40 text-xs tracking-wide mb-4">Visit</p>
            <p className="text-[#F2EAD8]/70 text-sm leading-relaxed">
              7275 Melrose Ave C
              <br />
              Los Angeles, CA 90046
            </p>
            <p className="text-[#F2EAD8]/70 text-sm mt-3">(323) 433-7771</p>
            <div className="flex items-center gap-3 mt-5">
              <a href="https://instagram.com/pastaamorela" aria-label="Instagram" className="text-[#F2EAD8]/60 hover:text-[#C1401E] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://tiktok.com/@pastaamorela" aria-label="TikTok" className="text-[#F2EAD8]/60 hover:text-[#C1401E] transition-colors">
                <TikTokIcon size={17} />
              </a>
              <a href="https://facebook.com/pastaamorela" aria-label="Facebook" className="text-[#F2EAD8]/60 hover:text-[#C1401E] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <p className="pt-8 text-center text-[#F2EAD8]/35 text-xs">
          © {new Date().getFullYear()} Pasta Amore. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  MOBILE STICKY CTA                                                   */
/* ------------------------------------------------------------------ */

function MobileStickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 px-4 pb-4 transition-transform duration-300 ${
        show ? "translate-y-0" : "translate-y-24"
      }`}
    >
      <a
        href="#order"
        className="flex items-center justify-center gap-2 w-full bg-[#C1401E] text-[#F8F0E3] font-semibold py-4 rounded-sm text-sm tracking-wide shadow-[0_10px_28px_-4px_rgba(0,0,0,0.5)]"
      >
        Order Now — Starting at $13.99
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ORDER SECTION (anchor target for CTAs)                             */
/* ------------------------------------------------------------------ */

function OrderBand() {
  return (
    <section id="order" className="bg-[#C1401E] py-14">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div>
          <h2 className="font-serif text-[#F8F0E3] text-3xl">Ready when you are.</h2>
          <p className="text-[#F8F0E3]/80 mt-1">Pickup and delivery available now.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="tel:+13234337771"
            className="bg-[#F8F0E3] text-[#C1401E] font-semibold px-7 py-3.5 rounded-sm text-sm hover:bg-white transition-colors"
          >
            Call to Order
          </a>
          <a
            href="https://maps.google.com/?q=7275+Melrose+Ave+C+Los+Angeles+CA+90046"
            target="_blank"
            rel="noreferrer"
            className="border border-[#F8F0E3]/60 text-[#F8F0E3] font-semibold px-7 py-3.5 rounded-sm text-sm hover:border-[#F8F0E3] transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SEO (document head side-effects)                                   */
/* ------------------------------------------------------------------ */

function useSEO() {
  useEffect(() => {
    document.title = "Pasta Amore | All-You-Can-Eat Pasta in Los Angeles";

    const setMeta = (name, content, attr = "name") => {
      let tag = document.querySelector(`meta[${attr}="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const desc =
      "Experience Los Angeles' all-you-can-eat Italian experience at Pasta Amore on Melrose. Fresh pasta, big flavors, and unlimited love starting at $13.99.";

    setMeta("description", desc);
    setMeta("og:title", "Pasta Amore | All-You-Can-Eat Pasta in Los Angeles", "property");
    setMeta("og:description", desc, "property");
    setMeta("og:type", "restaurant.menu", "property");
    setMeta("og:image", IMG.hero, "property");

    let ld = document.getElementById("pasta-amore-ld-json");
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = "pasta-amore-ld-json";
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: "Pasta Amore",
      servesCuisine: "Italian",
      priceRange: "$10-$20",
      telephone: "+1-323-433-7771",
      address: {
        "@type": "PostalAddress",
        streetAddress: "7275 Melrose Ave C",
        addressLocality: "Los Angeles",
        addressRegion: "CA",
        postalCode: "90046",
        addressCountry: "US",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.3",
        reviewCount: "342",
      },
    });
  }, []);
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

export default function App() {
  useSEO();

  return (
    <div className="font-sans bg-[#F8F3E8] text-[#231F1C] antialiased">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Work+Sans:wght@300;400;500;600;700&display=swap');

        .font-serif { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-sans { font-family: 'Work Sans', sans-serif; }

        .reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes scrollpulse {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scrollpulse {
          animation: scrollpulse 1.8s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .reveal-visible, .animate-scrollpulse {
            transition: none !important;
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }

        html { scroll-behavior: smooth; }
        ::selection { background: #C1401E; color: #F8F0E3; }

        a:focus-visible, button:focus-visible {
          outline: 2px solid #C1401E;
          outline-offset: 2px;
        }

        .grain-overlay {
          position: fixed;
          inset: 0;
          z-index: 60;
          pointer-events: none;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <Hero />
      <ValueStrip />
      <FeaturedMenu />
      <AyceFeature />
      <MenuCategories />
      <About />
      <Gallery />
      <Reviews />
      <Social />
      <Location />
      <OrderBand />
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}
