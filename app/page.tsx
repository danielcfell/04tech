import Image from "next/image";
import Link from "next/link";
import JsonLd from "./JsonLd";
import MobileNav from "./MobileNav";
import { waLink, BUSINESS, SERVICIOS, PLANES, PAQUETE, FAQS, AREAS } from "@/lib/seo";
/* ============================================================
   04 Tech — landing (home /)
   Copywriting de respuesta directa · beneficio + CTA a WhatsApp.
   Paleta bloqueada = bandera de la provincia del Carchi + crema:
     crema    #E9E4D6  (fondo · aire y legibilidad)
     verde    #0E7A3B  (PRIMARIO/marca + CTA sobre crema; nav, superficies, títulos, enlaces)
     amarillo #F4CD00  (acento secundario + CTA sobre fondos verdes; subrayados, íconos, etiquetas)
     rojo     #D81E29  (SOLO el badge "Más elegido" del paquete destacado — uso mínimo)
   Nota: el "verde noche" / tinta es un verde muy oscuro (#0B3A1F), no un color
   nuevo — es la sombra profunda del verde de marca, usado como texto y fondos
   oscuros. Amarillo y rojo nunca van como color de texto sobre crema (contraste).
   Tipografía: Bricolage Grotesque (títulos) + Instrument Sans (cuerpo).
   Imágenes: mockups SVG limpios dibujados con la misma paleta — sin fotos externas.
   Tokens espejo en app/globals.css (:root).
   ============================================================ */

const DISPLAY = "var(--font-bricolage), 'Arial Black', system-ui, sans-serif";
const SANS = "var(--font-instrument), system-ui, sans-serif";

/* ---------- paleta bloqueada (bandera Carchi + crema) ---------- */
const C = {
  crema: "#E9E4D6",
  verde: "#0E7A3B",    // bandera Carchi — primario / marca
  amarillo: "#F4CD00", // bandera Carchi — acento secundario
  rojo: "#D81E29",     // bandera Carchi — acción / CTA
} as const;

const T = {
  /* fondo y superficies claras (crema) */
  crema: C.crema,
  cremaOsc: "#DED8C7",     // shade de crema (superficie alterna)
  cremaClaro: "#F1ECDF",   // tint de crema (tarjetas)
  /* verde muy oscuro = texto principal y superficies profundas (sombra del verde) */
  tinta: "#0B3A1F",
  tintaSuave: "rgba(11,58,31,0.76)",
  tintaTenue: "rgba(11,58,31,0.54)",
  borde: "rgba(11,58,31,0.20)",
  bordeSuave: "rgba(11,58,31,0.11)",
  /* verde de marca (PRIMARIO) */
  verde: C.verde,          // relleno de superficies (texto claro encima)
  verdeOsc: "#0B5E2D",     // hover de superficies verdes
  verdeTx: "#0A5A2C",      // verde para TEXTO/enlaces sobre crema (pasa AA)
  verdeNoche: "#0B3A1F",   // = tinta, secciones profundas
  /* rojo de acción (ALTO IMPACTO: CTA + badge destacado) */
  rojo: C.rojo,
  rojoOsc: "#B4151F",      // hover del rojo
  /* amarillo acento (SECUNDARIO puntual) */
  amarillo: C.amarillo,
  amarilloOsc: "#D8B500",
  /* texto claro sobre superficies oscuras */
  cremaTx: "#F1ECDF",
  humo: "rgba(241,236,223,0.82)",
} as const;

/* ---------- imágenes del sitio ----------
   Generadas con la Inference API de Hugging Face (FLUX.1-schnell) y
   optimizadas a WebP en public/img/. Ver scripts/gen-site-images.mjs. */

/* ---------- datos ----------
   El contenido (títulos, descripciones, precios, FAQ) vive en lib/seo.ts —
   ÚNICA fuente de verdad, compartida con el JSON-LD para que lo visible y
   el schema coincidan siempre. Aquí solo va la capa de presentación. */
const media: Record<string, { mock: string; alt: string; ancho?: boolean }> = {
  "pagina-web": {
    mock: "/img/pagina-web.webp",
    alt: "Ilustración futurista de una página web mostrada en una laptop y un celular",
  },
  "tienda-en-linea": {
    mock: "/img/tienda.webp",
    alt: "Ilustración futurista de una tienda en línea con carrito de compras holográfico",
  },
  "sistema-facturacion": {
    mock: "/img/sistema.webp",
    alt: "Ilustración futurista de un sistema de facturación con paneles de datos y reportes",
  },
  "soporte": {
    mock: "/img/soporte.webp",
    alt: "Ilustración futurista de soporte al cliente con interfaz de ayuda",
  },
  "bot-whatsapp": {
    mock: "/img/bot-wa.webp",
    alt: "Robot asistente con el logo de WhatsApp en un celular, atendiendo clientes de un negocio en Carchi",
    ancho: true,
  },
};

const servicios = SERVICIOS.map((s) => ({ ...s, ...media[s.id] }));

const proceso = [
  { title: "Nos escribes", desc: "Cuéntanos por WhatsApp qué vendes y qué necesitas. Sin compromiso y sin tecnicismos, como hablar con un vecino." },
  { title: "Te cotizamos", desc: "Recibes por escrito qué incluye, cuánto cuesta y cuándo estará listo. Precio cerrado, cero sorpresas a mitad de camino." },
  { title: "Lo construimos", desc: "Diseñamos tu página, sistema o bot y te mostramos avances reales. Opinas y ajustamos antes de lanzar, no después." },
  { title: "Empiezas a vender", desc: "Publicamos y quedamos cerca para lo que necesites. Desde el día uno todo queda a tu nombre." },
];

/* cantones: nombres canónicos de lib/seo.ts + decoración visual local */
const notas: Record<string, string> = { "Tulcán": "nuestra casa" };
const sufijos: Record<string, string> = { "San Gabriel": "Montúfar", "El Ángel": "Espejo" };
const cantones = AREAS.map((n) => ({
  canton: sufijos[n] ? `${n} · ${sufijos[n]}` : n,
  nota: notas[n] ?? "",
}));

const planes = PLANES;
const paquete = PAQUETE;
const faqs = FAQS;

/* ---------- CSS ---------- */
const css = `
  html { scroll-behavior: smooth; }

  .fx a:focus-visible, .fx summary:focus-visible {
    outline: 3px solid ${T.verde};
    outline-offset: 3px;
    border-radius: 4px;
  }

  .nv-link { color: ${T.cremaTx}; position: relative; transition: color .16s ease; }
  .nv-link::after { content:''; position:absolute; left:0; right:0; bottom:-5px; height:2px; background:${T.amarillo}; transform:scaleX(0); transform-origin:left; transition:transform .2s ease; }
  .nv-link:hover { color:#fff; }
  .nv-link:hover::after { transform:scaleX(1); }

  /* CTA WhatsApp — verde sobre fondos claros (crema) */
  .btn-verde { background:${T.verde}; color:#FFF7EC; transition: background .18s ease, transform .15s ease, box-shadow .18s ease; }
  .btn-verde:hover { background:${T.verdeOsc}; transform: translateY(-2px); box-shadow: 0 16px 34px rgba(11,58,31,0.30); }
  .btn-verde:active { transform: translateY(0); }
  /* CTA WhatsApp — amarillo sobre fondos verdes/oscuros (máx. contraste, texto verde oscuro) */
  .btn-amar { background:${T.amarillo}; color:${T.tinta}; transition: background .18s ease, transform .15s ease, box-shadow .18s ease; }
  .btn-amar:hover { background:${T.amarilloOsc}; transform: translateY(-2px); box-shadow: 0 16px 34px rgba(0,0,0,0.30); }
  .btn-amar:active { transform: translateY(0); }
  .btn-ghost { color:${T.cremaTx}; border-bottom:1.5px solid rgba(241,236,223,0.5); transition: color .16s ease, border-color .16s ease; }
  .btn-ghost:hover { color:${T.amarillo}; border-color:${T.amarillo}; }

  .svc { transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease; }
  .svc:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(11,58,31,0.14); border-color:${T.verde}; }

  .tlink { color:${T.verdeTx}; font-weight:600; border-bottom:1.5px solid rgba(10,90,44,0.4); transition: color .15s ease, border-color .15s ease; }
  .tlink:hover { color:${T.tinta}; border-color:${T.tinta}; }

  .plan { transition: transform .2s ease, box-shadow .2s ease; }
  .plan:hover { transform: translateY(-4px); box-shadow: 0 22px 46px rgba(11,58,31,0.16); }
  .plan-cta { transition: background .18s ease, color .18s ease; }
  .plan-cta-line:hover { background:${T.tinta}; color:${T.crema}; }
  .plan-cta-solid:hover { background:${T.verdeOsc}; }

  .chip { transition: background .16s ease, border-color .16s ease, color .16s ease; }
  .chip:hover { background:${T.verde}; border-color:${T.verde}; color:#FFF7EC; }

  .faq summary { list-style:none; cursor:pointer; }
  .faq summary::-webkit-details-marker { display:none; }
  .faq .faq-ic { transition: transform .25s ease; }
  .faq[open] .faq-ic { transform: rotate(45deg); }
  .faq summary:hover .faq-q { color:${T.verde}; }
  .faq-q { transition: color .15s ease; }

  .footlink { color: rgba(241,236,223,0.8); transition: color .15s ease; }
  .footlink:hover { color:${T.amarillo}; }

  /* ===== responsive ===== */
  @media (max-width: 760px) {
    .svc-wide-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
    .svc-wide-media { order:-1; min-height: 200px !important; }
  }
  @media (max-width: 900px) {
    .nv-center { display:none !important; }
    .svc-grid { grid-template-columns: 1fr 1fr !important; }
    .plan-grid { grid-template-columns: 1fr !important; max-width:560px; margin-inline:auto; }
    .paquete-grid { grid-template-columns: 1fr !important; }
    .zonas-grid { grid-template-columns: 1fr !important; }
    .zonas-img { min-height: 300px !important; order:-1; }
    .man-grid { grid-template-columns: 1fr !important; }
    .proc-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 760px) {
    .hero-media { display:none !important; }
    .hero-inner { grid-template-columns: 1fr !important; }
    .hero-shelf { grid-template-columns: 1fr !important; }
    .hero-shelf > * + * { border-top:1px solid rgba(241,236,223,0.18); border-left:none !important; padding-left:0 !important; padding-top:14px !important; margin-top:14px; }
    .h1 { font-size: clamp(40px, 12vw, 62px) !important; }
    .nv-contacto { display:none !important; }
  }
  @media (max-width: 560px) {
    .svc-grid { grid-template-columns: 1fr !important; }
    .proc-grid { grid-template-columns: 1fr !important; }
    .foot-grid { grid-template-columns: 1fr !important; gap:28px !important; }
    .hero-cta { width:100%; justify-content:center; }
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior:auto; }
    .fx *, .fx *::before, .fx *::after { transition-duration:.01ms !important; animation:none !important; }
  }
`;

/* ---------- helpers ---------- */
const wrap: React.CSSProperties = { maxWidth: 1200, margin: "0 auto", padding: "0 clamp(20px, 4vw, 44px)" };
const pad = "clamp(72px, 9vw, 124px)";

function Kicker({ children, bg = T.verde, fg = T.cremaTx }: { children: React.ReactNode; bg?: string; fg?: string }) {
  return (
    <span style={{ display: "inline-block", fontFamily: SANS, fontSize: 13, fontWeight: 600, letterSpacing: "0.2px", color: fg, background: bg, padding: "5px 13px", borderRadius: 7 }}>
      {children}
    </span>
  );
}

function Title({ children, color = T.tinta, size = "clamp(30px, 4.2vw, 50px)" }: { children: React.ReactNode; color?: string; size?: string }) {
  return (
    <h2 style={{ margin: 0, fontFamily: DISPLAY, fontWeight: 800, fontSize: size, lineHeight: 1.04, letterSpacing: "-0.02em", color, textWrap: "balance" }}>
      {children}
    </h2>
  );
}

const WaIcon = () => (
  <span aria-hidden style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,247,236,0.24)", display: "grid", placeItems: "center", fontSize: 13 }}>✆</span>
);

/* Logo 04 Tech — isotipo "Nodo 04": el 0 es un anillo y el nodo marca las 4:00.
   Importado del proyecto de diseño de claude.ai (artboard 2a "Nodo 04 · sistema
   completo"), redibujado con los tokens de la paleta del sitio. `nodeStroke` es
   el halo del nodo: debe igualar el color de fondo donde se coloca el logo. */
function Logo({
  size = 34,
  ring = T.cremaTx,
  node = T.amarillo,
  nodeStroke = T.verdeNoche,
  word = T.cremaTx,
}: { size?: number; ring?: string; node?: string; nodeStroke?: string; word?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.34 }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden style={{ flexShrink: 0, display: "block" }}>
        <circle cx="32" cy="32" r="23" fill="none" stroke={ring} strokeWidth="10" />
        <circle cx="51.9" cy="43.5" r="8" fill={node} stroke={nodeStroke} strokeWidth="4" />
      </svg>
      <span style={{ fontFamily: DISPLAY, fontSize: size * 0.6, letterSpacing: "-0.03em", color: word, lineHeight: 1 }}>
        <span style={{ fontWeight: 800 }}>04</span>
        <span style={{ fontWeight: 500, opacity: 0.92 }}>tech</span>
      </span>
    </span>
  );
}

/* Mapa de cobertura del Carchi — constelación de los 7 cantones en código.
   Posiciones geográficas aproximadas; plano, solo paleta de marca. */
function ZonasMap() {
  const towns: { n: string; x: number; y: number; side: "l" | "r"; home?: boolean }[] = [
    { n: "Tulcán", x: 168, y: 66, side: "r", home: true },
    { n: "Julio Andrade", x: 236, y: 96, side: "r" },
    { n: "Huaca", x: 244, y: 150, side: "r" },
    { n: "San Gabriel", x: 178, y: 196, side: "r" },
    { n: "El Ángel", x: 106, y: 182, side: "l" },
    { n: "Bolívar", x: 150, y: 250, side: "r" },
    { n: "Mira", x: 80, y: 258, side: "l" },
  ];
  const links = [[0, 1], [1, 2], [2, 3], [0, 3], [3, 4], [3, 5], [4, 6], [5, 6], [4, 5]];
  const line = "rgba(241,236,223,0.30)";
  return (
    <svg
      viewBox="0 0 340 340"
      width="100%"
      style={{ maxWidth: 420, display: "block" }}
      role="img"
      aria-label="Mapa de cobertura en la provincia del Carchi: Tulcán, Julio Andrade, San Gabriel, El Ángel, Bolívar, Mira y Huaca."
    >
      {/* marco tipo tarjeta de mapa */}
      <rect x="8" y="8" width="324" height="324" rx="20" fill={T.verdeOsc} stroke="rgba(241,236,223,0.26)" />
      {/* brújula */}
      <text x="305" y="40" textAnchor="middle" fontFamily={SANS} fontSize="12" fontWeight="700" fill={T.cremaTx} opacity="0.8">N</text>
      <path d="M305 44 L305 58 M305 44 L301 50 M305 44 L309 50" stroke={T.cremaTx} strokeWidth="1.5" opacity="0.7" fill="none" />
      {/* conexiones */}
      {links.map(([a, b], i) => (
        <line key={i} x1={towns[a].x} y1={towns[a].y} x2={towns[b].x} y2={towns[b].y} stroke={line} strokeWidth="1.5" />
      ))}
      {/* nodos + etiquetas */}
      {towns.map((t) => (
        <g key={t.n}>
          {t.home ? (
            <>
              <circle cx={t.x} cy={t.y} r="10" fill="none" stroke={T.amarillo} strokeWidth="2" opacity="0.55" />
              <circle cx={t.x} cy={t.y} r="6.5" fill={T.amarillo} />
            </>
          ) : (
            <circle cx={t.x} cy={t.y} r="5" fill={T.cremaTx} />
          )}
          <text
            x={t.side === "r" ? t.x + 13 : t.x - 13}
            y={t.y + 4}
            textAnchor={t.side === "r" ? "start" : "end"}
            fontFamily={SANS}
            fontSize="12.5"
            fontWeight={t.home ? 700 : 500}
            fill={T.cremaTx}
          >
            {t.n}
          </text>
        </g>
      ))}
      {/* pie */}
      <text x="24" y="316" fontFamily={SANS} fontSize="12" fontWeight="600" fill={T.cremaTx} opacity="0.72">
        7 cantones · toda la provincia
      </text>
    </svg>
  );
}

/* ============================================================ */
export default function Home() {
  return (
    <div className="fx" style={{ fontFamily: SANS, background: T.crema, color: T.tinta }}>
      <JsonLd />
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* ================= HERO ================= */}
      <header style={{ position: "relative", overflow: "hidden", background: T.verdeNoche, color: T.cremaTx }}>
        {/* superficie de color (sin foto): verde noche con acentos sutiles amarillo/verde */}
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(120% 100% at 88% 12%, rgba(244,205,0,0.16) 0%, rgba(244,205,0,0) 52%)`, pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(90% 90% at 10% 100%, rgba(14,122,59,0.5) 0%, rgba(14,122,59,0) 55%)`, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "22px clamp(20px, 4vw, 44px) clamp(30px, 4vw, 44px)", display: "flex", flexDirection: "column", minHeight: "100svh" }}>
          {/* nav */}
          <nav aria-label="Principal" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, paddingBottom: 18, borderBottom: "1px solid rgba(241,236,223,0.20)" }}>
            <Link href="/" aria-label="04 Tech — inicio" style={{ display: "inline-flex", alignItems: "center", color: T.cremaTx }}>
              <Logo size={34} />
            </Link>
            <div className="nv-center" style={{ display: "flex", alignItems: "center", gap: 30, fontSize: 15, fontWeight: 500 }}>
              <a href="#servicios" className="nv-link">Servicios</a>
              <a href="#proceso" className="nv-link">Cómo trabajamos</a>
              <a href="#zonas" className="nv-link">Zonas</a>
              <a href="#precios" className="nv-link">Precios</a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <a href="#contacto" className="nv-link nv-contacto" style={{ fontSize: 15, fontWeight: 500 }}>Contacto</a>
              <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, quiero información sobre una página web")} className="btn-amar" style={{ padding: "10px 20px", borderRadius: 9, fontSize: 15, fontWeight: 600 }}>WhatsApp</a>
              <MobileNav />
            </div>
          </nav>

          {/* contenido hero: texto + mockup web */}
          <div className="hero-inner" style={{ flex: 1, display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(32px, 5vw, 72px)", alignItems: "center", padding: "clamp(40px, 6vh, 80px) 0" }}>
            <div style={{ maxWidth: 640 }}>
              <span style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 600, color: T.cremaTx, background: "rgba(11,58,31,0.4)", border: "1px solid rgba(241,236,223,0.28)", borderRadius: 8, padding: "7px 14px", marginBottom: 24 }}>
                <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: T.amarillo }} />
                Páginas web, sistemas y bots · Tulcán, Carchi
              </span>

              <h1 className="h1" style={{ margin: "0 0 22px", fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(44px, 5.8vw, 78px)", lineHeight: 1.0, letterSpacing: "-0.035em", color: T.cremaTx }}>
                Más clientes para tu negocio en Tulcán,{" "}
                <span style={{ color: T.amarillo }}>desde tu WhatsApp.</span>
              </h1>

              <p style={{ margin: "0 0 34px", fontSize: "clamp(17px, 1.5vw, 20px)", lineHeight: 1.6, color: "rgba(241,236,223,0.92)", maxWidth: "48ch", textWrap: "pretty" }}>
                Creamos tu <strong style={{ color: T.cremaTx, fontWeight: 600 }}>página web en Tulcán</strong>, tu{" "}
                <strong style={{ color: T.cremaTx, fontWeight: 600 }}>sistema de facturación</strong> y tu{" "}
                <strong style={{ color: T.cremaTx, fontWeight: 600 }}>bot de WhatsApp</strong> para que te encuentren y te
                escriban en todo el Carchi. Desde $39, pago único.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
                <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, quiero más clientes para mi negocio. ¿Me ayudan?")} className="btn-amar hero-cta" style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "16px 30px", borderRadius: 11, fontSize: 17, fontWeight: 700, boxShadow: "0 14px 30px rgba(0,0,0,0.30)" }}>
                  <WaIcon />
                  Escríbenos por WhatsApp
                </a>
                <a href="#precios" className="btn-ghost" style={{ fontSize: 15.5, fontWeight: 600, paddingBottom: 3 }}>Ver precios ↓</a>
              </div>

              <p style={{ margin: "20px 0 0", fontSize: 13.5, color: "rgba(241,236,223,0.66)" }}>
                Te respondemos hoy mismo · Atención en persona en Tulcán
              </p>
            </div>

            {/* foto documental del hero. <picture>: en móvil (<760px) la imagen
               está oculta por CSS, así que servimos un GIF de 1px para no
               descargar los ~56KB; en desktop carga eager con prioridad alta. */}
            <div className="hero-media" style={{ position: "relative" }}>
              <picture>
                <source media="(max-width: 760px)" srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
                <img
                  src="/img/hero.webp"
                  alt="dueño de negocio en Tulcán usando WhatsApp en su celular"
                  width={1100}
                  height={733}
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: "100%", height: "auto", borderRadius: 18, boxShadow: "0 30px 60px rgba(11,58,31,0.28)", border: "1px solid rgba(241,236,223,0.14)" }}
                />
              </picture>
            </div>
          </div>

          {/* repisa de 3 beneficios */}
          <div className="hero-shelf" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, paddingTop: 24, borderTop: "1px solid rgba(241,236,223,0.22)" }}>
            {[
              { t: "Te encuentran en Google", d: "Sal cuando buscan lo que vendes." },
              { t: "Te escriben al WhatsApp", d: "Un clic y ya están hablando contigo." },
              { t: "Vendes hasta dormido", d: "Tu bot atiende cuando tú no puedes." },
            ].map((s, i) => (
              <div key={s.t} style={{ paddingLeft: i === 0 ? 0 : "clamp(18px,2.5vw,32px)", borderLeft: i === 0 ? "none" : "1px solid rgba(241,236,223,0.16)" }}>
                <h3 style={{ margin: "0 0 5px", fontFamily: DISPLAY, fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: T.cremaTx }}>{s.t}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.5, color: "rgba(241,236,223,0.72)" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>
        {/* ================= MANIFIESTO ================= */}
        <section style={{ padding: `${pad} 0`, background: T.crema }}>
          <div className="man-grid" style={{ ...wrap, display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "clamp(36px, 6vw, 88px)", alignItems: "center" }}>
            <div>
              <Kicker bg={T.verde}>Por qué te conviene</Kicker>
              <div style={{ height: 18 }} />
              <Title>Si no te encuentran en internet, le compran a otro.</Title>
              <p style={{ margin: "20px 0 26px", fontSize: "clamp(16.5px, 1.4vw, 19px)", lineHeight: 1.66, color: T.tintaSuave, maxWidth: "54ch", textWrap: "pretty" }}>
                Cada día, gente de Tulcán, Julio Andrade y todo el Carchi busca en
                su celular dónde comer, quién repara, quién vende. Si tu negocio no
                aparece, ese cliente se va a la competencia. Nosotros hacemos que
                te encuentren, te escriban y te compren — con tu página, tu sistema
                y tu bot de WhatsApp.
              </p>
              <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, quiero que mi negocio aparezca en internet")} className="btn-verde" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", borderRadius: 11, fontSize: 16, fontWeight: 700 }}>
                <WaIcon />
                Quiero que me encuentren
              </a>
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {[
                { t: "Cercanos", d: "Nos ves la cara. Estamos en Tulcán, no en un call center." },
                { t: "Claros", d: "Precio cerrado y por escrito antes de empezar." },
                { t: "Rápidos", d: "Te respondemos el mismo día por WhatsApp." },
              ].map((v) => (
                <div key={v.t} style={{ background: T.cremaClaro, border: `1px solid ${T.borde}`, borderRadius: 14, padding: "18px 20px", display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span aria-hidden style={{ width: 10, height: 10, borderRadius: 3, background: T.amarillo, marginTop: 8, flexShrink: 0 }} />
                  <div>
                    <h3 style={{ margin: "0 0 3px", fontFamily: DISPLAY, fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em", color: T.tinta }}>{v.t}</h3>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: T.tintaSuave }}>{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SERVICIOS ================= */}
        <section id="servicios" style={{ padding: `${pad} 0`, background: T.cremaOsc, borderTop: `1px solid ${T.bordeSuave}` }}>
          <div style={wrap}>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: "clamp(32px, 4vw, 56px)" }}>
              <div style={{ maxWidth: 640 }}>
                <Kicker bg={T.verde}>Servicios</Kicker>
                <div style={{ height: 16 }} />
                <Title>Todo lo que tu negocio necesita para vender más</Title>
              </div>
              <p style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: T.tintaSuave, maxWidth: "34ch" }}>
                Página web, sistema de facturación y bot de WhatsApp. Elige uno o llévate el paquete completo.
              </p>
            </div>

            <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "clamp(16px, 2vw, 22px)" }}>
              {servicios.map((s) =>
                s.ancho ? (
                  <article key={s.title} className="svc svc-wide" style={{ gridColumn: "1 / -1", background: T.crema, border: `1.5px solid ${T.amarillo}`, borderRadius: 18, padding: "clamp(24px, 2.6vw, 34px)", overflow: "hidden" }}>
                    <div className="svc-wide-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(24px, 3vw, 48px)", alignItems: "center" }}>
                      <div>
                        <span style={{ display: "inline-block", marginBottom: 12, fontSize: 12, fontWeight: 700, letterSpacing: "0.3px", color: T.tinta, background: T.amarillo, padding: "4px 11px", borderRadius: 7 }}>Más nuevo</span>
                        <h3 style={{ margin: "0 0 12px", fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(24px, 2.6vw, 31px)", letterSpacing: "-0.025em", color: T.tinta }}>{s.title}</h3>
                        <p style={{ margin: "0 0 18px", fontSize: 16, lineHeight: 1.62, color: T.tintaSuave, textWrap: "pretty" }}>{s.desc}</p>
                        <p style={{ margin: "0 0 18px", paddingTop: 14, borderTop: `1px solid ${T.bordeSuave}`, fontSize: 13.5, fontWeight: 600, color: T.verdeTx }}>{s.para}</p>
                        <a target="_blank" rel="noopener" href={waLink(s.waMsg)} className="tlink">Quiero mi bot de WhatsApp →</a>
                      </div>
                      <div className="svc-wide-media">
                        <Image src={s.mock} alt={s.alt} width={1024} height={768} sizes="(max-width: 760px) 100vw, (max-width: 900px) 90vw, 460px" style={{ width: "100%", height: "auto", borderRadius: 14, border: `1px solid ${T.borde}`, boxShadow: "0 16px 34px rgba(11,58,31,0.16)" }} />
                      </div>
                    </div>
                  </article>
                ) : (
                  <article key={s.title} className="svc" style={{ background: T.crema, border: `1px solid ${T.borde}`, borderRadius: 18, padding: "clamp(20px, 2.2vw, 26px)", overflow: "hidden" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.mock} alt={s.alt} width={1024} height={768} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: 12, marginBottom: 20, border: `1px solid ${T.borde}` }} />
                    <h3 style={{ margin: "0 0 10px", fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(22px, 2.3vw, 27px)", letterSpacing: "-0.025em", color: T.tinta }}>{s.title}</h3>
                    <p style={{ margin: "0 0 16px", fontSize: 16, lineHeight: 1.62, color: T.tintaSuave, textWrap: "pretty" }}>{s.desc}</p>
                    <p style={{ margin: 0, paddingTop: 14, borderTop: `1px solid ${T.bordeSuave}`, fontSize: 13.5, fontWeight: 600, color: T.verdeTx }}>{s.para}</p>
                  </article>
                )
              )}
            </div>

            <p style={{ margin: "28px 0 0", fontSize: 16, color: T.tintaSuave }}>
              ¿No sabes cuál necesitas?{" "}
              <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, no sé qué necesita mi negocio, ¿me ayudan a elegir?")} className="tlink">Escríbenos y te orientamos gratis</a>.
            </p>
          </div>
        </section>

        {/* ================= PROCESO ================= */}
        <section id="proceso" style={{ padding: `${pad} 0`, background: T.verdeNoche, color: T.cremaTx }}>
          <div style={wrap}>
            <div style={{ maxWidth: 640, marginBottom: "clamp(32px, 4vw, 56px)" }}>
              <Kicker bg={T.amarillo} fg={T.tinta}>Cómo trabajamos</Kicker>
              <div style={{ height: 16 }} />
              <Title color={T.cremaTx}>Empezar es tan fácil como mandar un mensaje</Title>
              <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.6, color: T.humo, textWrap: "pretty" }}>
                Cuatro pasos simples. Tú atiendes tu negocio; nosotros hacemos que aparezca en internet.
              </p>
            </div>

            <ol className="proc-grid" style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(18px, 2.4vw, 30px)" }}>
              {proceso.map((p, i) => (
                <li key={p.title} style={{ borderTop: `2px solid ${T.amarillo}`, paddingTop: 18 }}>
                  <span aria-hidden style={{ display: "inline-grid", placeItems: "center", width: 42, height: 42, borderRadius: 11, background: "rgba(241,236,223,0.14)", color: T.amarillo, fontFamily: DISPLAY, fontWeight: 800, fontSize: 20, marginBottom: 16 }}>{i + 1}</span>
                  <h3 style={{ margin: "0 0 8px", fontFamily: DISPLAY, fontWeight: 700, fontSize: 21, letterSpacing: "-0.02em", color: T.cremaTx }}>{p.title}</h3>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.58, color: T.humo, textWrap: "pretty" }}>{p.desc}</p>
                </li>
              ))}
            </ol>

            <div style={{ marginTop: "clamp(36px, 4vw, 52px)" }}>
              <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, quiero empezar mi proyecto")} className="btn-amar" style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "16px 32px", borderRadius: 11, fontSize: 17, fontWeight: 700 }}>
                <WaIcon />
                Empecemos por WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ================= ZONAS ================= */}
        <section id="zonas" style={{ padding: `${pad} 0`, background: T.crema }}>
          <div className="zonas-grid" style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px, 6vw, 80px)", alignItems: "center" }}>
            <div>
              <Kicker bg={T.verde}>Dónde atendemos</Kicker>
              <div style={{ height: 18 }} />
              <Title>Tu página web en Tulcán, Julio Andrade y todo el Carchi</Title>
              <p style={{ margin: "20px 0 30px", fontSize: 17, lineHeight: 1.65, color: T.tintaSuave, maxWidth: "46ch", textWrap: "pretty" }}>
                Trabajamos con negocios de toda la provincia. Estés donde estés,
                coordinamos por WhatsApp o videollamada — y cuando el proyecto lo
                amerita, vamos hasta donde estás.
              </p>
              <ul style={{ listStyle: "none", margin: "0 0 30px", padding: 0, display: "flex", flexWrap: "wrap", gap: 10 }}>
                {cantones.map((c) => (
                  <li key={c.canton} className="chip" style={{ display: "inline-flex", alignItems: "baseline", gap: 8, border: `1px solid ${T.borde}`, borderRadius: 9, padding: "9px 16px", fontSize: 15, fontWeight: 500, color: T.tinta, background: T.cremaClaro }}>
                    {c.canton}
                    {c.nota && <span style={{ fontSize: 13, color: T.verdeTx, fontWeight: 600 }}>· {c.nota}</span>}
                  </li>
                ))}
              </ul>
              <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, mi negocio está en el Carchi y quiero una página web")} className="btn-verde" style={{ display: "inline-flex", alignSelf: "flex-start", alignItems: "center", gap: 11, padding: "15px 30px", borderRadius: 11, fontSize: 16.5, fontWeight: 700 }}>
                <WaIcon />
                Escríbenos desde tu ciudad
              </a>
            </div>

            <div className="zonas-img" style={{ display: "grid", placeItems: "center" }}>
              <div style={{ width: "100%", maxWidth: 460, background: T.verdeNoche, borderRadius: 22, padding: "clamp(20px, 3vw, 34px)", boxShadow: "0 24px 50px rgba(11,58,31,0.18)", border: `1px solid ${T.borde}` }}>
                <ZonasMap />
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRECIOS ================= */}
        <section id="precios" style={{ padding: `${pad} 0`, background: T.cremaOsc, borderTop: `1px solid ${T.bordeSuave}` }}>
          <div style={wrap}>
            <div style={{ maxWidth: 680, marginBottom: "clamp(32px, 4vw, 52px)" }}>
              <Kicker bg={T.verde}>Precios</Kicker>
              <div style={{ height: 16 }} />
              <Title>Precios claros. Sin letra pequeña.</Title>
              <p style={{ margin: "18px 0 0", fontSize: 17, lineHeight: 1.6, color: T.tintaSuave, textWrap: "pretty" }}>
                Cada servicio cuesta $39, pago único — pagas una vez y es tuyo.
                ¿Quieres los tres? El paquete completo es $99 y tu negocio queda
                listo de una vez.
              </p>
            </div>

            {/* tres servicios sueltos */}
            <div className="plan-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(16px, 2vw, 24px)", alignItems: "stretch", marginBottom: "clamp(18px, 2vw, 24px)" }}>
              {planes.map((p) => (
                <article key={p.nombre} className="plan" style={{ display: "flex", flexDirection: "column", background: T.cremaClaro, color: T.tinta, border: `1px solid ${T.borde}`, borderRadius: 18, padding: "clamp(24px, 2.4vw, 32px)" }}>
                  <h3 style={{ margin: "0 0 16px", fontFamily: DISPLAY, fontWeight: 800, fontSize: 22, letterSpacing: "-0.025em" }}>{p.nombre}</h3>
                  <p style={{ margin: "0 0 3px", display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(38px, 3.4vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1, color: T.verde }}>${p.price}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: T.tintaTenue }}>{p.lapso}</span>
                  </p>
                  <ul style={{ listStyle: "none", margin: "20px 0 24px", padding: 0, flex: 1 }}>
                    {p.incluye.map((item) => (
                      <li key={item} style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "8px 0", fontSize: 15, lineHeight: 1.5, color: T.tintaSuave, borderTop: `1px solid ${T.bordeSuave}` }}>
                        <span aria-hidden style={{ color: T.verde, fontWeight: 800 }}>›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a target="_blank" rel="noopener" href={waLink(p.waMsg)} className="plan-cta plan-cta-line" style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 9, padding: "13px 20px", borderRadius: 11, fontSize: 15.5, fontWeight: 700, background: "transparent", color: T.tinta, border: `1.5px solid ${T.tinta}` }}>
                    Lo quiero por WhatsApp
                  </a>
                </article>
              ))}
            </div>

            {/* paquete completo destacado */}
            <article className="plan paquete-grid" style={{ display: "grid", gridTemplateColumns: "1.15fr 0.85fr", gap: "clamp(24px, 3vw, 48px)", background: T.verdeNoche, color: T.cremaTx, borderRadius: 20, padding: "clamp(28px, 3vw, 44px)", alignItems: "center", position: "relative", overflow: "hidden" }}>
              <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(70% 90% at 90% 10%, rgba(244,205,0,0.16) 0%, rgba(244,205,0,0) 55%)` }} />
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.3px", color: "#FFF7EC", background: T.rojo, padding: "5px 12px", borderRadius: 7 }}>Más elegido</span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.3px", color: T.amarillo, background: "rgba(244,205,0,0.16)", padding: "5px 12px", borderRadius: 7, border: `1px solid rgba(244,205,0,0.45)` }}>Ahorra</span>
                </div>
                <h3 style={{ margin: "0 0 10px", fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(26px, 3vw, 36px)", letterSpacing: "-0.03em", color: T.cremaTx }}>{paquete.nombre}</h3>
                <p style={{ margin: "0 0 6px", display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(48px, 5vw, 68px)", letterSpacing: "-0.04em", lineHeight: 1, color: T.amarillo }}>${paquete.price}</span>
                  <span style={{ fontSize: 14.5, color: "rgba(241,236,223,0.7)" }}>{paquete.antes}</span>
                </p>
                <p style={{ margin: "0 0 18px", fontSize: 15.5, fontWeight: 600, color: T.humo }}>{paquete.lapso}</p>
                <a target="_blank" rel="noopener" href={waLink(paquete.waMsg)} className="btn-amar" style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "16px 32px", borderRadius: 11, fontSize: 17, fontWeight: 700, boxShadow: "0 14px 30px rgba(0,0,0,0.32)" }}>
                  <WaIcon />
                  Quiero el paquete de $99
                </a>
              </div>
              <ul style={{ position: "relative", listStyle: "none", margin: 0, padding: 0 }}>
                {paquete.incluye.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 11, alignItems: "baseline", padding: "10px 0", fontSize: 15.5, lineHeight: 1.5, color: "rgba(241,236,223,0.92)", borderTop: "1px solid rgba(241,236,223,0.14)" }}>
                    <span aria-hidden style={{ color: T.amarillo, fontWeight: 800 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <p style={{ margin: "22px 0 0", fontSize: 14, color: T.tintaTenue }}>
              Precios de lanzamiento. Escríbenos y te confirmamos el valor exacto de tu proyecto.
            </p>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section id="faq" style={{ padding: `${pad} 0`, background: T.crema, borderTop: `1px solid ${T.bordeSuave}` }}>
          <div style={{ ...wrap, maxWidth: 880 }}>
            <div style={{ marginBottom: "clamp(28px, 4vw, 48px)" }}>
              <Kicker bg={T.verde}>Preguntas frecuentes</Kicker>
              <div style={{ height: 16 }} />
              <Title>Lo que todos nos preguntan</Title>
            </div>
            <div style={{ borderTop: `1px solid ${T.borde}` }}>
              {faqs.map((f) => (
                <details key={f.q} className="faq" style={{ borderBottom: `1px solid ${T.borde}` }}>
                  <summary style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "22px 4px" }}>
                    <span className="faq-q" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: "clamp(18px, 2vw, 22px)", letterSpacing: "-0.02em", color: T.tinta }}>{f.q}</span>
                    <span className="faq-ic" aria-hidden style={{ flexShrink: 0, width: 30, height: 30, borderRadius: 8, border: `1px solid ${T.borde}`, display: "grid", placeItems: "center", fontSize: 17, color: T.verde, lineHeight: 1 }}>+</span>
                  </summary>
                  <p style={{ margin: 0, padding: "0 44px 24px 4px", fontSize: 16, lineHeight: 1.65, color: T.tintaSuave, maxWidth: "64ch", textWrap: "pretty" }}>{f.a}</p>
                </details>
              ))}
            </div>
            <p style={{ margin: "26px 0 0", fontSize: 16, color: T.tintaSuave }}>
              ¿Tienes otra pregunta?{" "}
              <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, tengo una pregunta sobre mi página web / sistema / bot")} className="tlink">Escríbenos al WhatsApp</a>, te respondemos hoy.
            </p>
          </div>
        </section>

        {/* ================= CTA FINAL ================= */}
        <section id="contacto" style={{ padding: `${pad} 0`, background: T.verdeNoche, color: "#FFF7EC", position: "relative", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, background: `radial-gradient(60% 100% at 50% 0%, rgba(244,205,0,0.14) 0%, rgba(244,205,0,0) 60%)` }} />
          <div style={{ ...wrap, position: "relative", textAlign: "center", maxWidth: 820 }}>
            <Title color="#FFF7EC" size="clamp(34px, 4.8vw, 58px)">Empieza a conseguir clientes esta semana</Title>
            <p style={{ margin: "20px auto 36px", fontSize: "clamp(16.5px, 1.5vw, 19px)", lineHeight: 1.64, color: "rgba(255,247,236,0.94)", maxWidth: "50ch", textWrap: "pretty" }}>
              Escríbenos qué vendes y qué quieres lograr. Te respondemos hoy mismo
              con el precio y los siguientes pasos — sin compromiso. Página web,
              sistema o bot de WhatsApp, desde $39.
            </p>
            <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, quiero conseguir más clientes. ¿Empezamos?")} className="btn-amar" style={{ display: "inline-flex", alignItems: "center", gap: 11, padding: "18px 40px", borderRadius: 12, fontSize: 17.5, fontWeight: 700, boxShadow: "0 16px 36px rgba(0,0,0,0.28)" }}>
              <WaIcon />
              Escríbenos por WhatsApp ahora
            </a>
            <p style={{ margin: "20px 0 0", fontSize: 14, color: "rgba(255,247,236,0.85)" }}>
              O visítanos en Tulcán — coordinamos la cita por WhatsApp.
            </p>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer style={{ background: T.verdeNoche, color: "rgba(241,236,223,0.78)" }}>
        <div className="foot-grid" style={{ ...wrap, padding: "clamp(48px, 6vw, 72px) clamp(20px, 4vw, 44px) 26px", display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "clamp(28px, 4vw, 60px)" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", marginBottom: 14 }}>
              <Logo size={34} />
            </div>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, maxWidth: "36ch", textWrap: "pretty" }}>
              Páginas web, sistemas de facturación y bots de WhatsApp para los
              negocios de Tulcán y todo el Carchi.
            </p>
          </div>
          <nav aria-label="Footer" style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15 }}>
            <p style={{ margin: "0 0 4px", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.4px", color: "rgba(241,236,223,0.6)" }}>Secciones</p>
            <a href="#servicios" className="footlink">Servicios</a>
            <a href="#proceso" className="footlink">Cómo trabajamos</a>
            <a href="#zonas" className="footlink">Zonas</a>
            <a href="#precios" className="footlink">Precios</a>
            <a href="#faq" className="footlink">Preguntas frecuentes</a>
          </nav>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15 }}>
            <p style={{ margin: "0 0 4px", fontSize: 12.5, fontWeight: 700, letterSpacing: "0.4px", color: "rgba(241,236,223,0.6)" }}>Contacto</p>
            <a target="_blank" rel="noopener" href={waLink("Hola 04 Tech, quiero información")} className="footlink">WhatsApp</a>
            {/* NAP visible — debe coincidir con el JSON-LD (lib/seo.ts) */}
            <a href={`tel:${BUSINESS.phoneE164}`} className="footlink">+593 95 894 8115</a>
            <a href={`mailto:${BUSINESS.email}`} className="footlink">{BUSINESS.email}</a>
            <p style={{ margin: 0 }}>{BUSINESS.city}, {BUSINESS.region} — {BUSINESS.countryName}</p>
          </div>
        </div>
        <div style={wrap}>
          <div style={{ borderTop: "1px solid rgba(241,236,223,0.12)", padding: "18px 0 24px", display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", fontSize: 12.5, color: "rgba(241,236,223,0.64)" }}>
            <p style={{ margin: 0 }}>© {new Date().getFullYear()} {BUSINESS.name} · Tulcán, Carchi</p>
            <p style={{ margin: 0 }}>Diseño web · sistemas · bots con IA en el Carchi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
