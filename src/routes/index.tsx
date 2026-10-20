import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Search, ShoppingBag, UserRound, Menu, X, Plus, Minus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const slides = [
  { image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=90", alt: "Editorial de moda em tons neutros" },
  { image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=2200&q=90", alt: "Look contemporâneo de moda" },
  { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2200&q=90", alt: "Peças de roupa em composição minimalista" },
];

type Product = { id: number; name: string; price: number; image: string; category: string };
type CartItem = { product: Product; quantity: number };

const products: Product[] = [
  { id: 1, name: "Blazer Estruturado", price: 289.9, category: "Alfaiataria", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85" },
  { id: 2, name: "Camisa Essencial", price: 159.9, category: "Básicos", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=900&q=85" },
  { id: 3, name: "Conjunto Casual", price: 239.9, category: "Conjuntos", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=85" },
  { id: 4, name: "Vestido Minimal", price: 219.9, category: "Vestidos", image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85" },
  { id: 5, name: "Look Urbano", price: 199.9, category: "Casual", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85" },
  { id: 6, name: "Tricot Atemporal", price: 179.9, category: "Básicos", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85" },
  { id: 7, name: "Jaqueta Clássica", price: 329.9, category: "Casacos", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85" },
  { id: 8, name: "Calça de Alfaiataria", price: 189.9, category: "Alfaiataria", image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=900&q=85" },
];

const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Index() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCart((items) => {
      const existing = items.find((item) => item.product.id === product.id);
      return existing
        ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((items) => items
      .map((item) => item.product.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const visibleProducts = products.filter((product) =>
    (product.name + " " + product.category).toLocaleLowerCase("pt-BR").includes(searchTerm.toLocaleLowerCase("pt-BR"))
  );

  return (
    <main className="min-h-screen bg-[#f8f7f4] text-[#24231f]">
      <header className="relative z-20 flex h-[76px] items-center justify-between border-b border-black/10 px-5 md:px-10">
        <button type="button" aria-label="Abrir menu" onClick={() => setMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-start transition-opacity hover:opacity-60">
          <Menu size={22} strokeWidth={1.5} />
        </button>
        <a href="/" aria-label="Página inicial" className="absolute left-1/2 -translate-x-1/2 text-xl font-medium tracking-[0.28em] md:text-2xl">ÉLAN</a>
        <div className="flex items-center gap-4 md:gap-6">
          <button type="button" aria-label="Pesquisar produtos" onClick={() => { setSearchOpen((open) => !open); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} className="transition-opacity hover:opacity-60">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <button type="button" aria-label="Minha conta" className="hidden transition-opacity hover:opacity-60 sm:block"><UserRound size={20} strokeWidth={1.5} /></button>
          <button type="button" aria-label="Abrir carrinho" onClick={() => setCartOpen(true)} className="relative transition-opacity hover:opacity-60">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#24231f] px-1 text-[10px] text-white">{cartCount}</span>}
          </button>
        </div>
        {menuOpen && (
          <div className="absolute left-0 top-[75px] w-full border-b border-black/10 bg-[#f8f7f4] px-6 py-6 shadow-sm md:px-10">
            <nav className="flex flex-col gap-5 text-xs tracking-[0.2em]">
              <a href="#produtos" onClick={() => setMenuOpen(false)} className="hover:opacity-60">PRODUTOS</a>
              <a href="#colecao" onClick={() => setMenuOpen(false)} className="hover:opacity-60">COLEÇÃO</a>
            </nav>
          </div>
        )}
      </header>

      {searchOpen && (
        <div className="border-b border-black/10 px-5 py-4 md:px-10">
          <div className="mx-auto flex max-w-2xl items-center gap-3 border-b border-black/30 pb-2">
            <Search size={18} />
            <input autoFocus value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Buscar produtos..." className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-black/40" />
            <button type="button" aria-label="Fechar busca" onClick={() => { setSearchOpen(false); setSearchTerm(""); }}><X size={18} /></button>
          </div>
        </div>
      )}

      <section aria-label="Carrossel de imagens" className="relative mx-auto w-full overflow-hidden bg-[#e9e6e0]">
        <div className="relative h-[62vh] min-h-[390px] max-h-[760px] w-full md:h-[76vh]">
          {slides.map((slide, index) => (
            <img key={slide.image} src={slide.image} alt={slide.alt} className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${index === activeSlide ? "opacity-100" : "pointer-events-none opacity-0"}`} loading={index === 0 ? "eager" : "lazy"} />
          ))}
          <div className="absolute inset-0 bg-black/10" />
          <button type="button" aria-label="Imagem anterior" onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)} className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 md:left-8"><ArrowLeft size={20} strokeWidth={1.5} /></button>
          <button type="button" aria-label="Próxima imagem" onClick={() => setActiveSlide((current) => (current + 1) % slides.length)} className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 md:right-8"><ArrowRight size={20} strokeWidth={1.5} /></button>
          <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2.5">
            {slides.map((slide, index) => <button key={slide.image} type="button" aria-label={`Ir para imagem ${index + 1}`} onClick={() => setActiveSlide(index)} className={`h-1 transition-all duration-300 ${index === activeSlide ? "w-8 bg-white" : "w-4 bg-white/60"}`} />)}
          </div>
        </div>
      </section>

      <section id="produtos" className="px-4 py-12 md:px-8 md:py-16">
        <div className="mb-7 flex items-end justify-between gap-4 md:mb-9">
          <div>
            <p className="mb-2 text-[10px] tracking-[0.28em] text-black/50">ÉLAN · SELEÇÃO</p>
            <h1 className="text-2xl font-light tracking-wide md:text-3xl">Peças selecionadas</h1>
          </div>
          <span className="text-xs text-black/50">{visibleProducts.length} produtos</span>
        </div>
        {visibleProducts.length === 0 ? (
          <p className="py-12 text-center text-sm text-black/60">Nenhum produto encontrado.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <article key={product.id} className="group min-w-0">
                <div className="relative overflow-hidden bg-[#e9e6e0]">
                  <img src={product.image} alt={product.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  <button type="button" onClick={() => addToCart(product)} className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-[#f8f7f4]/95 px-3 py-3 text-[10px] tracking-[0.13em] transition-colors hover:bg-[#24231f] hover:text-white md:opacity-0 md:group-hover:opacity-100">
                    <Plus size={14} /> ADICIONAR À SACOLA
                  </button>
                </div>
                <div className="flex items-start justify-between gap-2 pt-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{product.name}</p>
                    <p className="mt-1 text-[10px] tracking-wider text-black/45">{product.category}</p>
                  </div>
                  <span className="shrink-0 text-sm">{money(product.price)}</span>
                </div>
                <button type="button" onClick={() => addToCart(product)} className="mt-3 w-full border border-black/20 py-2.5 text-[10px] tracking-[0.12em] transition hover:border-black hover:bg-[#24231f] hover:text-white md:hidden">ADICIONAR À SACOLA</button>
              </article>
            ))}
          </div>
        )}
      </section>

      <section id="colecao" className="px-4 pb-10 md:px-8 md:pb-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {[
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85",
          ].map((image, index) => <a href="#produtos" key={image} className="group block overflow-hidden bg-[#e9e6e0]"><img src={image} alt={`Editorial de moda ${index + 1}`} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></a>)}
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-8 text-center md:px-8">
        <span className="text-[10px] tracking-[0.38em] text-black/50">ÉLAN</span>
      </footer>

      {cartOpen && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Fechar carrinho" onClick={() => setCartOpen(false)} className="absolute inset-0 h-full w-full bg-black/40" />
          <aside role="dialog" aria-modal="true" aria-label="Carrinho de compras" className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#f8f7f4] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-5">
              <div className="flex items-center gap-3"><ShoppingBag size={19} strokeWidth={1.5} /><h2 className="text-sm tracking-[0.15em]">SUA SACOLA ({cartCount})</h2></div>
              <button type="button" aria-label="Fechar carrinho" onClick={() => setCartOpen(false)} className="p-1 hover:opacity-60"><X size={21} /></button>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingBag size={34} strokeWidth={1} className="mb-5 text-black/40" />
                <p className="mb-2 text-base">Sua sacola está vazia</p>
                <p className="mb-6 text-sm text-black/50">Adicione suas peças favoritas para continuar.</p>
                <button type="button" onClick={() => { setCartOpen(false); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} className="bg-[#24231f] px-6 py-3 text-[10px] tracking-[0.15em] text-white hover:bg-black/80">EXPLORAR PRODUTOS</button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5">
                  {cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4 border-b border-black/10 py-5">
                      <img src={product.image} alt={product.name} className="h-32 w-24 shrink-0 bg-[#e9e6e0] object-cover" />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2"><div><p className="text-sm">{product.name}</p><p className="mt-1 text-xs text-black/50">{product.category}</p></div><button type="button" aria-label={`Remover ${product.name}`} onClick={() => setCart((items) => items.filter((item) => item.product.id !== product.id))} className="text-black/45 hover:text-black"><Trash2 size={16} /></button></div>
                        <p className="mt-2 text-sm">{money(product.price)}</p>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center border border-black/15"><button type="button" aria-label="Diminuir quantidade" onClick={() => changeQuantity(product.id, -1)} className="p-2 hover:bg-black/5"><Minus size={13} /></button><span className="min-w-8 text-center text-xs">{quantity}</span><button type="button" aria-label="Aumentar quantidade" onClick={() => changeQuantity(product.id, 1)} className="p-2 hover:bg-black/5"><Plus size={13} /></button></div>
                          <span className="text-sm">{money(product.price * quantity)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-black/10 px-5 py-5">
                  <div className="mb-2 flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
                  <p className="mb-5 text-xs text-black/50">Frete e entrega serão combinados na finalização.</p>
                  <button type="button" onClick={() => window.alert("Seu carrinho está pronto! O pagamento online ainda precisa ser configurado.")} className="w-full bg-[#24231f] py-4 text-[10px] tracking-[0.18em] text-white transition hover:bg-black/80">CONTINUAR PARA PAGAMENTO</button>
                  <button type="button" onClick={() => setCartOpen(false)} className="mt-3 w-full py-2 text-xs underline underline-offset-4">Continuar comprando</button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
