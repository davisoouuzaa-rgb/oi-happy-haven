import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Search, ShoppingBag, UserRound, Menu } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const slides = [
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90",
    alt: "Editorial de moda em tons neutros",
  },
  {
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=2200&q=90",
    alt: "Look contemporâneo de moda",
  },
  {
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=90",
    alt: "Peças de roupa em composição minimalista",
  },
];

const gallery = [
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
];

function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const previousSlide = () => setActiveSlide((current) => (current - 1 + slides.length) % slides.length);
  const nextSlide = () => setActiveSlide((current) => (current + 1) % slides.length);

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#24231f]">
      <header className="relative z-10 flex h-[76px] items-center justify-between border-b border-black/10 px-5 md:px-10">
        <button
          type="button"
          aria-label="Abrir menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-start transition-opacity hover:opacity-60"
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>

        <a href="/" aria-label="Página inicial" className="absolute left-1/2 -translate-x-1/2 text-xl font-medium tracking-[0.28em] md:text-2xl">
          ÉLAN
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          <button type="button" aria-label="Pesquisar" className="transition-opacity hover:opacity-60">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Minha conta" className="hidden transition-opacity hover:opacity-60 sm:block">
            <UserRound size={20} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Sacola de compras" className="transition-opacity hover:opacity-60">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
        </div>
        {menuOpen && (
          <div className="absolute left-0 top-[75px] w-full border-b border-black/10 bg-[#f8f7f4] px-6 py-6 shadow-sm md:px-10">
            <nav className="flex flex-col gap-5 text-xs tracking-[0.2em]">
              <a href="#colecao" onClick={() => setMenuOpen(false)} className="hover:opacity-60">COLEÇÃO</a>
              <a href="#editorial" onClick={() => setMenuOpen(false)} className="hover:opacity-60">EDITORIAL</a>
            </nav>
          </div>
        )}
      </header>

      <section aria-label="Carrossel de imagens" className="relative mx-auto w-full overflow-hidden bg-[#e9e6e0]">
        <div className="relative h-[62vh] min-h-[390px] max-h-[760px] w-full md:h-[76vh]">
          {slides.map((slide, index) => (
            <img
              key={slide.image}
              src={slide.image}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "pointer-events-none opacity-0"}`}
              loading={index === 0 ? "eager" : "lazy"}
            />
          ))}
          <div className="absolute inset-0 bg-black/10" />
          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={previousSlide}
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 md:left-8"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            aria-label="Próxima imagem"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 md:right-8"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Ir para imagem ${index + 1}`}
                onClick={() => setActiveSlide(index)}
                className={`h-1 transition-all duration-300 ${index === activeSlide ? "w-8 bg-white" : "w-4 bg-white/60"}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="colecao" className="px-4 py-5 md:px-8 md:py-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {gallery.map((image, index) => (
            <a href="#editorial" key={image} className="group block overflow-hidden bg-[#e9e6e0]">
              <img
                src={image}
                alt={`Imagem de moda ${index + 1}`}
                loading="lazy"
                className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </a>
          ))}
        </div>
      </section>

      <section id="editorial" className="px-4 pb-10 pt-2 md:px-8 md:pb-14">
        <div className="h-px w-full bg-black/10" />
        <div className="flex items-center justify-center py-7">
          <span className="text-[10px] tracking-[0.38em] text-black/50">ÉLAN</span>
        </div>
      </section>
    </main>
  );
}
