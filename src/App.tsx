import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

// ============ DATA ============
const menuCategories = [
  {
    id: "antipasti",
    title: "Закуски",
    subtitle: "Антипасти",
    items: [
      { name: "Антипасти", desc: "", price: "6 800", image: "/images/steak.jpg" },
      { name: "Спелые томаты с песто и страчателлой", desc: "", price: "2 800", image: "/images/pizza.jpg" },
      { name: "Перцы Ромиро с креветками с соусом тоннато", desc: "", price: "5 900", image: "/images/seafood.jpg" },
      { name: "Оладушки с икрой", desc: "", price: "6 900", image: "/images/salad.jpg" },
      { name: "Тартар из лосося", desc: "", price: "6 900", image: "/images/salad.jpg" },
    ],
  },
  {
    id: "insalate",
    title: "Салаты",
    subtitle: "Инсалате",
    items: [
      { name: "Хрустящие баклажны с рукколой и страчателлой", desc: "", price: "4 150", image: "/images/salad.jpg" },
      { name: "Горячий Нисуаз", desc: "", price: "5 900", image: "/images/salad.jpg" },
      { name: "Салат из цветной капусты с пармезаном", desc: "", price: "2 950", image: "/images/salad.jpg" },
      { name: "Цезарь с цыпленком", desc: "", price: "4 450", image: "/images/salad.jpg" },
      { name: "Салат из авакадо с грушей и тигровыми креветками", desc: "", price: "5 450", image: "/images/salad.jpg" },
      { name: "Греческий салат", desc: "", price: "2 850", image: "/images/salad.jpg" },
      { name: "Салат с курицей", desc: "", price: "3 600", image: "/images/salad.jpg" },
      { name: "Салат Нисуаз", desc: "", price: "3 250", image: "/images/salad.jpg" },
    ],
  },
  {
    id: "bruschette",
    title: "Брускетты",
    subtitle: "Брускетты и фокачча",
    items: [
      { name: "Фокачча с томатами и чесноком", desc: "", price: "2 500", image: "/images/pizza.jpg" },
      { name: "Фокачча с песто и страчателлой", desc: "", price: "2 500", image: "/images/pizza.jpg" },
      { name: "Панини из фокаччи с мортадело1", desc: "", price: "3 500", image: "/images/pizza.jpg" },
      { name: "Брускетта с томатами и страчателлой", desc: "", price: "3 800", image: "/images/pizza.jpg" },
      { name: "Брускетта с томатной сальсой и анчоусами", desc: "", price: "3 100", image: "/images/pizza.jpg" },
      { name: "Хлеб багет", desc: "", price: "800", image: "/images/pizza.jpg" },
    ],
  },
  {
    id: "zuppe",
    title: "Супы",
    subtitle: "Дзуппе",
    items: [
      { name: "Буйабес", desc: "", price: "4 150", image: "/images/soup.jpg" },
      { name: "Минестроне", desc: "", price: "2 850", image: "/images/soup.jpg" },
      { name: "Куриный бульон с фрикадельками", desc: "", price: "2 250", image: "/images/soup.jpg" },
      { name: "Гаспаччо", desc: "", price: "2 850", image: "/images/soup.jpg" },
    ],
  },
  {
    id: "pasta",
    title: "Паста",
    subtitle: "Паста и ризотто",
    items: [
      { name: "BIG паста с морепродуктами", desc: "", price: "12 900", image: "/images/pasta.jpg", signature: true },
      { name: "Болоньезе", desc: "", price: "4 150", image: "/images/pasta.jpg" },
      { name: "Карбонара", desc: "", price: "4 900", image: "/images/pasta.jpg" },
      { name: "Папарделле с цыпленком и грибами", desc: "", price: "3 900", image: "/images/pasta.jpg" },
      { name: "Ризотто с грибами", desc: "", price: "4 800", image: "/images/pasta.jpg" },
      { name: "Спагетти с морепродуктами", desc: "", price: "5 650", image: "/images/pasta.jpg" },
      { name: "Лазанья", desc: "", price: "4 350", image: "/images/pasta.jpg" },
      { name: "Паста с лососем", desc: "", price: "5 550", image: "/images/pasta.jpg" },
    ],
  },
  {
    id: "pizza",
    title: "Пицца",
    subtitle: "Неаполитанская пицца",
    items: [
      { name: "Маргарита", desc: "", price: "3 300", image: "/images/pizza.jpg" },
      { name: "Пепперони", desc: "", price: "3 850", image: "/images/pizza.jpg" },
      { name: "Пицца с грушей и горганзолой", desc: "", price: "4 350", image: "/images/pizza.jpg" },
      { name: "Пицца с грибами и цыпленком", desc: "", price: "4 150", image: "/images/pizza.jpg" },
      { name: "Пицца с лососем страчателлой", desc: "", price: "5 950", image: "/images/pizza.jpg", signature: true },
    ],
  },
  {
    id: "secondi",
    title: "Горячие блюда",
    subtitle: "Секонди",
    items: [
      { name: "Куриная грудка с пюре из цветной капусты с добавлением картофеля", desc: "", price: "4 100", image: "/images/steak.jpg" },
      { name: "Домашние фрикадельки в томатном соусе", desc: "", price: "4 800", image: "/images/seafood.jpg" },
      { name: "Куриный шницель", desc: "", price: "4 100", image: "/images/steak.jpg" },
      { name: "Филе лосося с соусом берблан", desc: "", price: "8 100", image: "/images/seafood.jpg" },
      { name: "Филе дорадо с томатами и гуакамоле", desc: "", price: "8 100", image: "/images/seafood.jpg" },
      { name: "Бифштекс с яйцом", desc: "", price: "6 400", image: "/images/steak.jpg" },
      { name: "Цыпленок Кордон Блю", desc: "", price: "4 450", image: "/images/steak.jpg" },
      { name: "Бефстроганов с картофельнм пюре", desc: "", price: "5 700", image: "/images/steak.jpg" },
      { name: "Филье миньон с картофелем и грибами", desc: "", price: "7 250", image: "/images/seafood.jpg" },
      { name: "Томленые щечки теленка", desc: "", price: "5 250", image: "/images/seafood.jpg" },
    ],
  },
  {
    id: "contorni",
    title: "Гарниры",
    subtitle: "Конторни",
    items: [
      { name: "Картофельное пюре", desc: "", price: "1 100", image: "/images/interior.jpg" },
      { name: "Картофельные лодочки", desc: "", price: "1 800", image: "/images/interior.jpg" },
      { name: "Овощи на гриле со страчателлой", desc: "", price: "2 250", image: "/images/interior.jpg" },
    ],
  },
  {
    id: "dolci",
    title: "Десерты",
    subtitle: "Дольчи",
    items: [
      { name: "Лимонный тарт", desc: "", price: "2 990", image: "/images/dessert.jpg", signature: true },
      { name: "Шоколадный торт", desc: "", price: "3 100", image: "/images/dessert.jpg" },
      { name: "Мильфей", desc: "", price: "3 650", image: "/images/dessert.jpg" },
      { name: "Крем брюле", desc: "", price: "2 990", image: "/images/dessert.jpg" },
      { name: "Тарелка домашних трубочек и орешков", desc: "", price: "3 100", image: "/images/dessert.jpg" },
      { name: "Джелато", desc: "", price: "1 800", image: "/images/dessert.jpg" },
      { name: "Фруктовая нарезка", desc: "", price: "7 700", image: "/images/dessert.jpg" },
    ],
  },
];

const reviews = [
  {
    name: "Алия Нурланова",
    date: "Ноябрь 2025",
    rating: 5,
    text: "Изысканная атмосфера и безупречный сервис. Паста в форме пармезана — это настоящее шоу. Каждое блюдо — произведение искусства. Вернёмся снова.",
    role: "Постоянный гость",
  },
  {
    name: "Данияр Касымов",
    date: "Октябрь 2025",
    rating: 5,
    text: "Лучший итальянский ресторан в Астане. Интерьер в стиле семейного дома — уютно и при этом по-настоящему премиально. Пицца из дровяной печи бесподобна.",
    role: "Ресторанный критик",
  },
  {
    name: "Марина Соколова",
    date: "Сентябрь 2025",
    rating: 5,
    text: "Отмечали юбилей — всё прошло на высшем уровне. Особенно впечатлили тирамису и винная карта. Aperol Spritz готовят идеально.",
    role: "Гость заведения",
  },
  {
    name: "Тимур Ахметов",
    date: "Август 2025",
    rating: 5,
    text: "Завтраки здесь — отдельный ритуал. Свежая выпечка, идеальные яйца бенедикт и лучший эспрессо в городе. Настоящая Италия в сердце Астаны.",
    role: "Фуд-блогер",
  },
];

const galleryImages = [
  { src: "/images/hero.jpg", caption: "Интерьер" },
  { src: "/images/pasta.jpg", caption: "Авторская паста" },
  { src: "/images/interior.jpg", caption: "Лаунж-зона" },
  { src: "/images/pizza.jpg", caption: "Из печи" },
  { src: "/images/steak.jpg", caption: "Горячие блюда" },
  { src: "/images/wine.jpg", caption: "Винная карта" },
  { src: "/images/seafood.jpg", caption: "Морепродукты" },
  { src: "/images/dessert.jpg", caption: "Десерты" },
  { src: "/images/salad.jpg", caption: "Свежие салаты" },
  { src: "/images/soup.jpg", caption: "Домашние супы" },
];

const marqueeTexts = [
  "ITALIAN CUISINE",
  "FINE DINING",
  "ASTANA",
  "SINCE 2023",
  "WOOD-FIRED PIZZA",
  "HANDMADE PASTA",
];

// ============ COMPONENTS ============

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return p + 1.5;
      });
    }, 25);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030202]"
    >
      <div className="absolute inset-0">
        <div className="volumetric-light w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center gap-10"
      >
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="display-text text-7xl tracking-[0.4em] gold-text text-glow"
          >
            LIA
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 eyebrow text-[#d4af37]/60"
          >
            RISTORANTE ITALIANO
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="loader-ring" />
          <div className="flex items-center gap-4">
            <div className="w-48 h-px bg-[#d4af37]/10 relative overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#d4af37] to-[#e8c766]"
              />
            </div>
            <span className="eyebrow text-[#d4af37]/60">{Math.round(progress)}%</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CursorEffects() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + "px";
        glowRef.current.style.top = e.clientY + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow hidden md:block" />
      <div ref={dotRef} className="cursor-dot hidden md:block" />
    </>
  );
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 15,
    duration: 20 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "О ресторане" },
    { href: "#menu", label: "Меню" },
    { href: "#gallery", label: "Галерея" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#contact", label: "Контакты" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-full px-8 py-4 transition-all duration-700 ${
            scrolled ? "glass-strong" : ""
          }`}
        >
          <a href="#" className="flex items-center gap-4 group">
            <span className="display-text text-3xl tracking-[0.4em] gold-text transition-all duration-500 group-hover:text-glow">
              LIA
            </span>
            <div className="hidden md:flex flex-col items-start gap-1 border-l border-[#d4af37]/20 pl-4">
              <span className="eyebrow text-[#d4af37]/50 text-[8px]">RISTORANTE</span>
              <span className="eyebrow text-[#d4af37]/70 text-[9px]">ASTANA</span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-12">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="eyebrow text-[#f5ebe0]/60 hover:text-[#d4af37] transition-all duration-500 link-underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a
              href="tel:+77012072997"
              className="hidden md:flex items-center gap-3 group"
            >
              <div className="w-8 h-8 rounded-full border border-[#d4af37]/30 flex items-center justify-center group-hover:border-[#d4af37] transition-all duration-500">
                <svg className="w-3 h-3 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="eyebrow text-[8px] text-[#d4af37]/50">ЗВОНИТЕ</span>
                <span className="text-sm text-[#f5ebe0] font-light">+7 701 207-29-97</span>
              </div>
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-[#d4af37]"
              aria-label="Меню"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeWidth="1" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden glass-strong mt-3 rounded-3xl p-8 flex flex-col gap-6"
            >
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="eyebrow text-[#f5ebe0]/80 hover:text-[#d4af37] transition-colors py-2"
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 700], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background layers */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <div className="absolute inset-0 ken-burns">
          <img
            src="/images/hero.jpg"
            alt="Lia Restaurant"
            fetchPriority="high"
            decoding="async"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Multiple gradient layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#030202]/60 via-[#030202]/40 to-[#030202]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030202]/90 via-transparent to-[#030202]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030202_85%)]" />

        {/* Volumetric light effects */}
        <div className="volumetric-light w-[600px] h-[600px] top-1/4 left-1/4 opacity-20" />
        <div className="volumetric-light w-[800px] h-[800px] top-1/3 right-1/4 opacity-15" />

        {/* Noise & grain - moved inside to ensure they don't block clicks */}
        <div className="noise" />
        <div className="grain" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-8 flex items-center gap-3 md:gap-6 px-4"
        >
          <div className="h-px w-8 md:w-16 bg-gradient-to-r from-transparent to-[#d4af37]/60 flex-shrink-0" />
          <span className="eyebrow text-[#d4af37] text-[8px] md:text-[10px] text-center">
            <span className="hidden md:inline">РЕСТОРАН ИТАЛЬЯНСКОЙ КУХНИ · АСТАНА</span>
            <span className="md:hidden">ИТАЛЬЯНСКАЯ КУХНЯ</span>
          </span>
          <div className="h-px w-8 md:w-16 bg-gradient-to-l from-transparent to-[#d4af37]/60 flex-shrink-0" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display-text text-[22vw] md:text-[16vw] lg:text-[13rem] leading-[0.85] tracking-[0.08em] gold-text text-glow text-premium"
        >
          Lia
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 md:mt-8 max-w-3xl px-4"
        >
          <p className="serif-italic text-lg md:text-2xl lg:text-3xl text-[#f5ebe0]/90 leading-relaxed text-premium">
            «Италия, рассказанная языком традиций —<br className="hidden md:block" />
            в самом сердце Астаны»
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center gap-3 md:gap-5 relative z-20 w-full px-4 sm:px-0"
        >
          <a href="#contact" className="btn-gold px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs rounded-full relative z-30 w-full sm:w-auto text-center">
            Забронировать столик
          </a>
          <a href="#menu" className="btn-ghost px-8 md:px-12 py-4 md:py-5 text-[10px] md:text-xs rounded-full relative z-30 w-full sm:w-auto text-center">
            Смотреть меню
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="eyebrow text-[#d4af37]/50">ПРОКРУТИТЕ ВНИЗ</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[#d4af37] via-[#d4af37]/50 to-transparent"
          />
        </motion.div>

        {/* Side info */}
        <div className="hidden xl:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-[8px] text-[#d4af37]/40">РЕЙТИНГ 2ГИС</span>
            <div className="display-text text-4xl gold-text">4.8</div>
          </div>
          <div className="hairline-v h-16" />
          <div className="flex flex-col gap-2">
            <span className="eyebrow text-[8px] text-[#d4af37]/40">ЕЖЕДНЕВНО</span>
            <div className="text-sm text-[#f5ebe0] font-light">07:00 — 00:00</div>
          </div>
        </div>

        <div className="hidden xl:flex absolute right-10 top-1/2 -translate-y-1/2 items-center gap-6">
          <div className="hairline-v h-16" />
          <div className="flex flex-col gap-4">
            {["Instagram", "WhatsApp", "Telegram"].map((social) => (
              <a
                key={social}
                href="#"
                className="eyebrow text-[#d4af37]/60 hover:text-[#d4af37] transition-all duration-500 link-underline"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />
    </section>
  );
}

function Marquee() {
  return (
    <div className="relative py-8 md:py-12 overflow-hidden border-y border-[#d4af37]/10">
      <div className="marquee">
        <div className="marquee-content">
          {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
            <div key={i} className="flex items-center gap-8 md:gap-16">
              <span className="display-text text-3xl md:text-5xl lg:text-7xl gold-text whitespace-nowrap">
                {text}
              </span>
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#d4af37]/40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function About() {
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="about" className="relative py-20 md:py-40 lg:py-56 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />
      <div className="volumetric-light w-[600px] h-[600px] top-20 right-20 opacity-20" />
      <div className="volumetric-light w-[500px] h-[500px] bottom-20 left-20 opacity-15" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 md:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 flex items-center gap-6">
            <div className="h-px w-16 bg-[#d4af37]" />
            <span className="eyebrow text-[#d4af37]">О РЕСТОРАНЕ</span>
          </div>

          <h2 className="display-text text-4xl md:text-6xl lg:text-8xl leading-[0.95] mb-8 md:mb-10">
            <span className="gold-text">Искусство</span>
            <br />
            <span className="serif-italic text-[#f5ebe0]">итальянской</span>
            <br />
            <span className="gold-text">гостеприимности</span>
          </h2>

          <div className="space-y-6 md:space-y-8 text-[#f5ebe0]/75 leading-relaxed font-light text-base md:text-lg">
            <p>
              Lia — это камерный итальянский ресторан в сердце Астаны, созданный как
              отражение настоящего семейного дома на побережье Тосканы. Здесь каждая
              деталь рассказывает историю: от ручной лепки пасты до подачи пиццы
              прямо из дровяной печи.
            </p>
            <p>
              Наш шеф-повар ежедневно создаёт свежую пасту, которую по традиции
              перемешивают в настоящей форме пармезана — ритуал, ставший визитной
              карточкой ресторана. В баре — итальянское вино, безупречный Aperol
              Spritz и авторский Negroni.
            </p>
            <p className="serif-italic text-2xl text-[#d4af37] leading-relaxed">
              «Мы верим: настоящая Италия начинается не с рецепта, а с чувства,
              с которым её готовят.»
            </p>
          </div>

          <div className="mt-12 md:mt-16 grid grid-cols-3 gap-3 md:gap-6">
            {[
              { value: "4.8", label: "РЕЙТИНГ" },
              { value: "378", label: "ОТЗЫВОВ" },
              { value: "7K ₸", label: "СРЕДНИЙ ЧЕК" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-6 text-center shimmer-border"
              >
                <div className="display-text text-4xl gold-text mb-2">{stat.value}</div>
                <div className="eyebrow text-[#d4af37]/60 text-[9px]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <motion.div
            style={{ y: imageY }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden soft-glow shimmer-border"
          >
            <img
              src="/images/interior.jpg"
              alt="Интерьер ресторана Lia"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030202] via-transparent to-transparent opacity-70" />
            <div className="grain" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-8 md:-bottom-10 -left-4 md:-left-10 glass-strong rounded-3xl p-6 md:p-8 max-w-[280px] md:max-w-sm hidden md:block float-slow"
          >
            <div className="divider-ornament mb-6">
              <svg className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.5 8.5L3 9.5L7.5 14.5L6 21L12 17.5L18 21L16.5 14.5L21 9.5L14.5 8.5L12 2Z" />
              </svg>
            </div>
            <p className="serif-italic text-xl text-[#f5ebe0]/95 leading-relaxed mb-6">
              «Паста в сырной голове — это не блюдо, это театр. Каждое посещение — маленький праздник.»
            </p>
            <div className="eyebrow text-[#d4af37] text-[9px]">— ОТЗЫВ ГОСТЯ</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState("antipasti");
  const current = menuCategories.find((c) => c.id === activeCategory)!;

  return (
    <section id="menu" className="relative py-20 md:py-40 lg:py-56 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#030202]" />
      <div className="volumetric-light w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="mb-6 md:mb-8 divider-ornament">
            <span className="eyebrow text-[#d4af37] text-[9px] md:text-[10px]">IL MENÙ</span>
          </div>
          <h2 className="display-text text-4xl md:text-6xl lg:text-8xl gold-text mb-4 md:mb-6">Наше меню</h2>
          <p className="max-w-2xl mx-auto text-[#f5ebe0]/60 font-light text-lg leading-relaxed">
            Авторская интерпретация классической итальянской кухни — каждое блюдо
            создано с уважением к традициям и вниманием к деталям.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12 md:mb-20 px-2">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative px-4 md:px-6 lg:px-8 py-2.5 md:py-4 rounded-full eyebrow text-[8px] md:text-[10px] transition-all duration-700 whitespace-nowrap ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-[#d4af37] via-[#e8c766] to-[#d4af37] text-[#030202] shadow-[0_10px_40px_-10px_rgba(212,175,55,0.6)]"
                  : "text-[#d4af37]/70 hover:text-[#d4af37] border border-[#d4af37]/20 hover:border-[#d4af37]/50"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Items grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center mb-16">
              <p className="serif-italic text-2xl text-[#d4af37]">
                {current.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-8 lg:gap-10">
              {current.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="menu-card depth-card rounded-2xl md:rounded-3xl overflow-hidden group relative"
                >
                  <div className="flex gap-3 md:gap-6 p-4 md:p-7">
                    <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0 shimmer-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="menu-card-image w-full h-full object-cover object-center"
                      />
                      {item.signature && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-[#d4af37] to-[#e8c766] text-[#030202] text-[8px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full font-medium">
                          SIGNATURE
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <h3 className="serif-italic text-lg md:text-2xl text-[#f5ebe0] mb-2 md:mb-3 leading-tight">
                          {item.name}
                        </h3>
                        <p className="text-xs md:text-base text-[#f5ebe0]/60 font-light leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>

                      <div className="flex items-end justify-between mt-3 md:mt-4 pt-3 md:pt-4 border-t border-[#d4af37]/10">
                        <div className="flex items-baseline gap-1 md:gap-2">
                          <span className="display-text text-xl md:text-3xl gold-text">
                            {item.price}
                          </span>
                          <span className="eyebrow text-[#d4af37]/60 text-[8px] md:text-[9px]">₸</span>
                        </div>
                        <button className="eyebrow text-[9px] text-[#d4af37]/70 hover:text-[#d4af37] transition-all duration-500 link-underline">
                          ЗАКАЗАТЬ →
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="serif-italic text-[#d4af37]/70 text-lg mb-8">
            * Цены указаны в тенге. Меню может обновляться сезонно.
          </p>
          <a href="#contact" className="btn-ghost px-10 py-4 text-xs rounded-full">
            Запросить полное меню
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="relative py-20 md:py-40 lg:py-56 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="mb-6 md:mb-8 divider-ornament">
            <span className="eyebrow text-[#d4af37] text-[9px] md:text-[10px]">LA GALLERIA</span>
          </div>
          <h2 className="display-text text-4xl md:text-6xl lg:text-8xl gold-text">Атмосфера</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 auto-rows-[140px] md:auto-rows-[220px] lg:auto-rows-[260px]">
          {galleryImages.map((img, i) => {
            const spans = [
              "col-span-2 row-span-2",
              "col-span-1 row-span-1",
              "col-span-1 row-span-2",
              "col-span-1 row-span-1",
              "col-span-1 row-span-2",
              "col-span-1 row-span-1",
              "col-span-2 row-span-1",
              "col-span-1 row-span-1",
              "col-span-1 row-span-1",
              "col-span-2 row-span-1",
            ];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`gallery-item rounded-3xl ${spans[i]} shimmer-border`}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center rounded-3xl"
                />
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="flex items-center gap-4">
                    <div className="h-px w-10 bg-[#d4af37]" />
                    <span className="eyebrow text-[#f5ebe0] text-[10px]">
                      {img.caption}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" className="relative py-20 md:py-40 lg:py-56 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[#030202]" />
      <div className="volumetric-light w-[600px] h-[600px] top-1/3 left-0 opacity-15" />
      <div className="volumetric-light w-[600px] h-[600px] bottom-1/3 right-0 opacity-15" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="mb-6 md:mb-8 divider-ornament">
            <span className="eyebrow text-[#d4af37] text-[9px] md:text-[10px]">LE RECENSIONI</span>
          </div>
          <h2 className="display-text text-4xl md:text-6xl lg:text-8xl gold-text mb-4 md:mb-8">
            Слова наших гостей
          </h2>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L9.5 8.5L3 9.5L7.5 14.5L6 21L12 17.5L18 21L16.5 14.5L21 9.5L14.5 8.5L12 2Z" />
                </svg>
              ))}
            </div>
            <span className="display-text text-2xl text-[#f5ebe0] ml-3">4.8</span>
            <span className="text-[#d4af37]/60 text-base ml-2 font-light">· 378 оценок на 2ГИС</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong rounded-2xl md:rounded-3xl p-5 md:p-10 relative group hover:border-[#d4af37]/30 transition-all duration-700"
            >
              <svg
                className="absolute top-8 right-8 w-12 h-12 text-[#d4af37]/15"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#d4af37]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L9.5 8.5L3 9.5L7.5 14.5L6 21L12 17.5L18 21L16.5 14.5L21 9.5L14.5 8.5L12 2Z" />
                  </svg>
                ))}
              </div>

              <p className="serif-italic text-base md:text-xl leading-relaxed text-[#f5ebe0]/95 mb-5 md:mb-8">
                {review.text}
              </p>

              <div className="flex items-center gap-3 md:gap-5 pt-5 md:pt-8 border-t border-[#d4af37]/15">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#d4af37] via-[#e8c766] to-[#b8935a] flex items-center justify-center text-[#030202] display-text text-lg md:text-2xl flex-shrink-0">
                  {review.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-[#f5ebe0] font-medium text-sm md:text-base mb-1 truncate">{review.name}</div>
                  <div className="eyebrow text-[#d4af37]/60 text-[7px] md:text-[9px]">
                    {review.role} · {review.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    note: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-40 lg:py-56 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 animated-gradient" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="mb-6 md:mb-8 divider-ornament">
            <span className="eyebrow text-[#d4af37] text-[9px] md:text-[10px]">PRENOTAZIONE</span>
          </div>
          <h2 className="display-text text-4xl md:text-6xl lg:text-8xl gold-text mb-4 md:mb-6">
            Бронирование
          </h2>
          <p className="max-w-2xl mx-auto text-[#f5ebe0]/60 font-light text-lg leading-relaxed">
            Зарезервируйте столик для особого вечера. Наш метрдотель свяжется
            с вами в течение 15 минут.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-2xl md:rounded-3xl p-5 md:p-10 lg:p-12 space-y-5 md:space-y-7 relative overflow-hidden"
          >
            <div className="volumetric-light w-[400px] h-[400px] -top-20 -right-20 opacity-20" />

            <div className="relative mb-6 md:mb-8">
              <h3 className="display-text text-2xl md:text-4xl gold-text mb-2 md:mb-3">Забронировать столик</h3>
              <p className="text-sm md:text-base text-[#d4af37]/60 font-light">Заполните форму — мы подтвердим бронь</p>
            </div>

            <div className="grid md:grid-cols-2 gap-5 md:gap-6 relative">
              <div>
                <label className="eyebrow text-[#d4af37]/60 text-[8px] md:text-[9px] mb-2 md:mb-3 block">
                  ВАШЕ ИМЯ
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-[#d4af37]/20 focus:border-[#d4af37] outline-none py-3 md:py-4 text-[#f5ebe0] font-light text-base md:text-lg transition-colors"
                  placeholder="Алия"
                />
              </div>
              <div>
                <label className="eyebrow text-[#d4af37]/60 text-[8px] md:text-[9px] mb-2 md:mb-3 block">
                  ТЕЛЕФОН
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-[#d4af37]/20 focus:border-[#d4af37] outline-none py-3 md:py-4 text-[#f5ebe0] font-light text-base md:text-lg transition-colors"
                  placeholder="+7 700 000 00 00"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 md:gap-6 relative">
              <div>
                <label className="eyebrow text-[#d4af37]/60 text-[7px] md:text-[9px] mb-2 md:mb-3 block">
                  ДАТА
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border-b border-[#d4af37]/20 focus:border-[#d4af37] outline-none py-3 md:py-4 text-[#f5ebe0] font-light text-sm md:text-lg transition-colors [color-scheme:dark] min-w-0"
                />
              </div>
              <div>
                <label className="eyebrow text-[#d4af37]/60 text-[7px] md:text-[9px] mb-2 md:mb-3 block">
                  ВРЕМЯ
                </label>
                <input
                  type="time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-transparent border-b border-[#d4af37]/20 focus:border-[#d4af37] outline-none py-3 md:py-4 text-[#f5ebe0] font-light text-sm md:text-lg transition-colors [color-scheme:dark] min-w-0"
                />
              </div>
              <div>
                <label className="eyebrow text-[#d4af37]/60 text-[7px] md:text-[9px] mb-2 md:mb-3 block">
                  ГОСТЕЙ
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-transparent border-b border-[#d4af37]/20 focus:border-[#d4af37] outline-none py-3 md:py-4 text-[#f5ebe0] font-light text-sm md:text-lg transition-colors min-w-0"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n} className="bg-[#141210] text-base md:text-lg">{n} {n === 1 ? "гость" : n < 5 ? "гостя" : "гостей"}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="eyebrow text-[#d4af37]/60 text-[9px] mb-3 block">
                ОСОБЫЕ ПОЖЕЛАНИЯ
              </label>
              <textarea
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                rows={4}
                className="w-full bg-transparent border-b border-[#d4af37]/20 focus:border-[#d4af37] outline-none py-4 text-[#f5ebe0] font-light text-lg transition-colors resize-none"
                placeholder="День рождения, особое место у окна, аллергии..."
              />
            </div>

            <button
              type="submit"
              className="btn-gold w-full py-5 text-xs rounded-full mt-6 relative"
            >
              {submitted ? "✓ ЗАЯВКА ОТПРАВЛЕНА" : "ПОДТВЕРДИТЬ БРОНИРОВАНИЕ"}
            </button>

            <p className="eyebrow text-[#d4af37]/40 text-[8px] text-center leading-relaxed relative">
              НАЖИМАЯ КНОПКУ, ВЫ СОГЛАШАЕТЕСЬ С УСЛОВИЯМИ ОБРАБОТКИ ПЕРСОНАЛЬНЫХ ДАННЫХ
            </p>
          </motion.form>

          {/* Info + Map */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            <div className="glass-strong rounded-3xl p-10 relative overflow-hidden">
              <div className="volumetric-light w-[400px] h-[400px] -top-20 -right-20 opacity-15" />

              <h3 className="display-text text-4xl gold-text mb-10 relative">Контакты</h3>

              <div className="space-y-5 md:space-y-8 relative">
                <div className="flex gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="eyebrow text-[#d4af37]/60 text-[8px] md:text-[9px] mb-1 md:mb-2">АДРЕС</div>
                    <div className="text-[#f5ebe0] font-light text-base md:text-lg leading-relaxed">
                      пр. Кабанбай батыра, 45/1<br />
                      <span className="text-[#d4af37]/70 text-sm md:text-base">1 этаж, Нура район, Астана</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="eyebrow text-[#d4af37]/60 text-[8px] md:text-[9px] mb-1 md:mb-2">ТЕЛЕФОН</div>
                    <a href="tel:+77012072997" className="text-[#f5ebe0] font-light text-base md:text-lg hover:text-[#d4af37] transition-colors break-all">
                      +7 (701) 207-29-97
                    </a>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="eyebrow text-[#d4af37]/60 text-[8px] md:text-[9px] mb-1 md:mb-2">ЧАСЫ РАБОТЫ</div>
                    <div className="text-[#f5ebe0] font-light text-base md:text-lg">
                      Ежедневно<br />
                      <span className="text-[#d4af37]">07:00 — 00:00</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-5">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 5h10v2h2V3H5v4h2zm10 14H7v-2H5v4h14v-4h-2zm-5-6.5c1.38 0 2.5-1.12 2.5-2.5S13.38 7.5 12 7.5 9.5 8.62 9.5 10s1.12 2.5 2.5 2.5z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="eyebrow text-[#d4af37]/60 text-[8px] md:text-[9px] mb-1 md:mb-2">СОЦСЕТИ</div>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      <a href="https://instagram.com/lia_bistro" target="_blank" rel="noopener noreferrer" className="text-[#f5ebe0]/70 hover:text-[#d4af37] text-sm md:text-base transition-colors link-underline">Instagram</a>
                      <span className="text-[#d4af37]/30">·</span>
                      <a href="https://wa.me/77012072997" target="_blank" rel="noopener noreferrer" className="text-[#f5ebe0]/70 hover:text-[#d4af37] text-sm md:text-base transition-colors link-underline">WhatsApp</a>
                      <span className="text-[#d4af37]/30">·</span>
                      <a href="#" className="text-[#f5ebe0]/70 hover:text-[#d4af37] text-sm md:text-base transition-colors link-underline">Telegram</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-[#d4af37]/10 grid grid-cols-2 gap-6 relative">
                <div>
                  <div className="eyebrow text-[8px] text-[#d4af37]/50 mb-2">ЗАВТРАКИ</div>
                  <div className="text-[#f5ebe0] text-lg font-light">07:00 — 11:00</div>
                </div>
                <div>
                  <div className="eyebrow text-[8px] text-[#d4af37]/50 mb-2">СРЕДНИЙ ЧЕК</div>
                  <div className="text-[#f5ebe0] text-lg font-light">от 7 000 ₸</div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="glass-strong rounded-3xl overflow-hidden h-72 relative group">
              <iframe
                title="Lia Restaurant Map"
                src="https://widgets.2gis.com/widget?type=firmsonmap&options=%7B%22pos%22%3A%7B%22lat%22%3A51.093461%2C%22lon%22%3A71.429749%2C%22zoom%22%3A16%7D%2C%22table%22%3A%7B%22id%22%3A%2270000001104950934%22%7D%2C%22opt%22%3A%7B%22city%22%3A%22astana%22%7D%7D"
                className="w-full h-full dark-map border-0"
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#d4af37]/20 rounded-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-12 md:py-20 px-4 md:px-6 border-t border-[#d4af37]/10">
      <div className="absolute inset-0 bg-[#030202]" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="display-text text-4xl md:text-5xl tracking-[0.4em] gold-text">LIA</span>
            </div>
            <p className="text-[#f5ebe0]/50 font-light max-w-md leading-relaxed text-base md:text-lg">
              Ресторан итальянской кухни в Астане. Авторская паста, пицца из
              дровяной печи, изысканная атмосфера семейного дома.
            </p>
            <div className="mt-6 md:mt-8 flex gap-3 md:gap-4">
              {["IG", "WA", "TG", "FB"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#d4af37]/20 flex items-center justify-center eyebrow text-[9px] md:text-[10px] text-[#d4af37]/70 hover:border-[#d4af37] hover:text-[#d4af37] transition-all duration-500"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-[#d4af37] text-[10px] mb-6">НАВИГАЦИЯ</h4>
            <ul className="space-y-3">
              {["О ресторане", "Меню", "Галерея", "Отзывы", "Бронирование"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-base text-[#f5ebe0]/60 hover:text-[#d4af37] transition-colors font-light link-underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[#d4af37] text-[10px] mb-6">КОНТАКТЫ</h4>
            <ul className="space-y-4 text-base text-[#f5ebe0]/60 font-light">
              <li>пр. Кабанбай батыра, 45/1</li>
              <li>Астана, Казахстан</li>
              <li>
                <a href="tel:+77012072997" className="hover:text-[#d4af37] transition-colors link-underline">
                  +7 (701) 207-29-97
                </a>
              </li>
              <li className="text-[#d4af37]">07:00 — 00:00</li>
            </ul>
          </div>
        </div>

        <div className="hairline mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] text-[#d4af37]/40">
          <div className="eyebrow">© 2026 LIA RESTAURANT · ВСЕ ПРАВА ЗАЩИЩЕНЫ</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#d4af37] transition-colors link-underline eyebrow">ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors link-underline eyebrow">УСЛОВИЯ ИСПОЛЬЗОВАНИЯ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#030202] text-[#f5ebe0] overflow-x-hidden">
      <AnimatePresence>{loading && <LoadingScreen onComplete={() => setLoading(false)} />}</AnimatePresence>

      <CursorEffects />
      <Particles />
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <Gallery />
        <Reviews />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
