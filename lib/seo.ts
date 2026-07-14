/* ============================================================
   lib/seo.ts — ÚNICA FUENTE DE VERDAD (NAP, keywords, precios,
   zonas, servicios y FAQ). La leen: metadata (layout), JSON-LD,
   el contenido visible de la landing, sitemap y robots.
   Objetivo: SEO local #1 en Google + citabilidad por IA para
   "página web Tulcán", "página web Julio Andrade",
   "bot de WhatsApp", "sistema de facturación Carchi".
   ============================================================ */

/* .trim() en toda env var usada en URLs (bug conocido de \n en Vercel)
   TODO: al comprar el dominio (p.ej. 04tech.ec), conectarlo en Vercel →
   Settings → Domains y cambiar este fallback (o setear NEXT_PUBLIC_SITE_URL).
   El canonical DEBE apuntar al dominio que realmente sirve el sitio. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://04tech.vercel.app"
).replace(/\/+$/, "");

export const BUSINESS = {
  name: "04 Tech",
  legalName: "04 Tech",
  slogan: "Páginas web, sistemas y bots de WhatsApp para el Carchi",
  /* NAP — idéntico en footer, schema y metadata */
  phoneE164: "+593958948115",
  whatsapp: "593958948115",
  /* TODO: cambiar a hola@04tech.ec cuando exista el dominio y su correo */
  email: "danielcfell98@gmail.com",
  street: "Tulcán",
  city: "Tulcán",
  region: "Carchi",
  regionCode: "EC-C",
  postalCode: "040150",
  country: "EC",
  countryName: "Ecuador",
  /* geo aproximado de Tulcán */
  latitude: 0.812222,
  longitude: -77.717778,
  founder: "04 Tech",
} as const;

export const waLink = (msg: string) =>
  `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`;

/* Zonas atendidas (areaServed en el schema y chips visibles) */
export const AREAS = [
  "Tulcán",
  "Julio Andrade",
  "San Gabriel",
  "El Ángel",
  "Mira",
  "Bolívar",
  "Huaca",
] as const;

/* Precios */
export const PRICE_SINGLE = "39";
export const PRICE_BUNDLE = "99";
export const CURRENCY = "USD";

/* Servicios (Service + Offer en JSON-LD; tarjetas visibles) */
export type Servicio = {
  id: string;
  title: string;
  h3: string;
  desc: string;
  para: string;
  price: string;
  schemaType: string;
  waMsg: string;
};

export const SERVICIOS: Servicio[] = [
  {
    id: "pagina-web",
    title: "Página web en Tulcán",
    h3: "Página web en Tulcán",
    desc: "Sal en Google cuando alguien busca lo que vendes y deja que te escriban al WhatsApp con un clic. Tu página web lista para atraer clientes, no para adornar.",
    para: "Restaurantes · hoteles · profesionales · comercios",
    price: PRICE_SINGLE,
    schemaType: "WebSite",
    waMsg: "Hola 04 Tech, quiero una página web para mi negocio por $39",
  },
  {
    id: "tienda-en-linea",
    title: "Tienda en línea",
    h3: "Tienda en línea",
    desc: "Muestra tus productos con fotos y precios, y recibe los pedidos directo en tu WhatsApp. Empieza a vender por internet aunque nunca lo hayas hecho.",
    para: "Boutiques · ferreterías · productores · artesanos",
    price: PRICE_SINGLE,
    schemaType: "WebSite",
    waMsg: "Hola 04 Tech, quiero una tienda en línea por $39",
  },
  {
    id: "sistema-facturacion",
    title: "Sistema de facturación y más",
    h3: "Sistema de facturación y más",
    desc: "Factura, controla tu inventario, agenda citas, registra tus ventas y saca reportes desde un solo lugar. Un sistema a la medida de tu negocio pequeño en el Carchi, no una camisa de fuerza.",
    para: "Facturación · inventario · citas · control de ventas · reportes",
    price: PRICE_SINGLE,
    schemaType: "SoftwareApplication",
    waMsg: "Hola 04 Tech, quiero un sistema de facturación por $39",
  },
  {
    id: "soporte",
    title: "Soporte que no te abandona",
    h3: "Soporte que no te abandona",
    desc: "Después de lanzar seguimos contigo: cambios, contenido nuevo, tu ficha de Google Maps al día. Un mensaje de WhatsApp y lo resolvemos.",
    para: "Para todo cliente de 04 Tech, mes a mes",
    price: PRICE_SINGLE,
    schemaType: "Service",
    waMsg: "Hola 04 Tech, quiero soporte y mejoras para mi página",
  },
  {
    id: "bot-whatsapp",
    title: "Bot de WhatsApp y automatización con IA",
    h3: "Bot de WhatsApp y automatización con IA",
    desc: "Un asistente que contesta a tus clientes por WhatsApp a toda hora, agenda citas y responde las preguntas de siempre por ti. Automatiza lo repetitivo para que no pierdas ventas ni tiempo, ni cuando duermes.",
    para: "Responde WhatsApp solo · agenda citas · confirma pedidos · atención 24/7",
    price: PRICE_SINGLE,
    schemaType: "Service",
    waMsg: "Hola 04 Tech, quiero un bot de WhatsApp con IA para mi negocio",
  },
];

/* Planes de precio visibles + Offer en JSON-LD */
export const PLANES = [
  {
    id: "plan-web",
    nombre: "Página web",
    price: PRICE_SINGLE,
    lapso: "pago único",
    incluye: [
      "Página web lista para Google y WhatsApp",
      "Diseño a tu medida, se ve bien en el celular",
      "Botón de WhatsApp y mapa de tu ubicación",
      "Para que te encuentren en Tulcán y el Carchi",
    ],
    waMsg: "Hola 04 Tech, quiero el servicio de Página web por $39",
  },
  {
    id: "plan-sistema",
    nombre: "Sistema a la medida",
    price: PRICE_SINGLE,
    lapso: "pago único",
    incluye: [
      "Sistema de facturación para tu negocio",
      "Inventario, citas, control de ventas y reportes",
      "Todo en un solo lugar, fácil de usar",
      "Hecho a la medida de cómo trabajas",
    ],
    waMsg: "Hola 04 Tech, quiero el servicio de Sistema a la medida por $39",
  },
  {
    id: "plan-bot",
    nombre: "Bot y automatización",
    price: PRICE_SINGLE,
    lapso: "pago único",
    incluye: [
      "Bot de WhatsApp que atiende 24/7",
      "Agenda citas y confirma pedidos solo",
      "Responde las preguntas de siempre por ti",
      "No pierdes clientes ni cuando duermes",
    ],
    waMsg: "Hola 04 Tech, quiero el servicio de Bot y automatización por $39",
  },
];

export const PAQUETE = {
  id: "paquete-completo",
  nombre: "Paquete completo",
  price: PRICE_BUNDLE,
  antes: "los tres por separado costarían más",
  lapso: "página web + sistema a la medida + bot con IA",
  incluye: [
    "Tu página web para que te encuentren",
    "Tu sistema de facturación e inventario",
    "Tu bot de WhatsApp que atiende 24/7",
    "Todo integrado y trabajando para ti",
  ],
  waMsg:
    "Hola 04 Tech, quiero el PAQUETE COMPLETO por $99 (página web + sistema + bot)",
};

/* Portafolio de proyectos reales (tarjetas visibles en la sección
   "Proyectos"). Trabajos verdaderos ya entregados — hechos, no reseñas
   inventadas. `fechaIso` en AAAA-MM (para <time>/schema); `fecha` es el
   texto que se muestra. Rellena `cliente`/`lugar` con el nombre real del
   negocio cuando tengas su OK para mostrarlo. */
export type Proyecto = {
  titulo: string;   // nombre del producto o del trabajo
  cliente: string;  // negocio para quien se hizo (vacío si no se muestra)
  lugar: string;    // ciudad
  tipo: string;     // etiqueta corta del tipo de trabajo
  fecha: string;    // texto visible, p.ej. "Febrero 2026"
  fechaIso: string; // AAAA-MM
  desc: string;     // qué se construyó
  tags: string[];   // funciones / tecnología destacada
  url?: string;     // enlace al sitio en vivo (opcional → botón "Ver sitio")
  repo?: string;    // enlace al repo de GitHub (opcional → botón "Ver código")
};

export const PROYECTOS: Proyecto[] = [
  {
    titulo: "Foody",
    cliente: "Restaurante Cactus",
    lugar: "Julio Andrade",
    tipo: "Sistema a la medida",
    fecha: "Febrero 2026",
    fechaIso: "2026-02",
    desc: "Sistema de facturación y gestión para el restaurante: registro de ventas, catálogo de productos, control de inventario y stock, todo en un solo lugar.",
    tags: ["Facturación", "Ventas", "Inventario", "Stock"],
    url: "https://foodyec.vercel.app",
  },
  {
    titulo: "Psicología Para Ti",
    cliente: "Centro de psicología",
    lugar: "Quito",
    tipo: "Página web",
    fecha: "Octubre 2025",
    fechaIso: "2025-10",
    desc: "Página web orientada a captar pacientes: presenta los servicios del centro y guía al visitante a agendar una cita.",
    tags: ["Captación de clientes", "Diseño a medida", "Móvil"],
  },
  {
    titulo: "danielsdev",
    cliente: "Studio de software",
    lugar: "En línea",
    tipo: "Web · portafolio",
    fecha: "Junio 2026",
    fechaIso: "2026-06",
    desc: "Sitio web enfocado en vender y servir de portafolio: muestra el trabajo del studio y convierte visitas en contactos.",
    tags: ["Portafolio", "Ventas", "Diseño a medida"],
  },
];

/* FAQ — DEBE coincidir palabra por palabra con FAQPage (JSON-LD) */
export const FAQS = [
  {
    q: "¿Cuánto cuesta una página web en Tulcán?",
    a: "Una página web en Tulcán cuesta $39, en un solo pago. Un sistema de facturación a la medida también cuesta $39, y lo mismo el bot de WhatsApp con IA. Si quieres los tres juntos, el paquete completo es $99, más barato que por separado.",
  },
  {
    q: "¿Atienden en Julio Andrade y el resto del Carchi?",
    a: "Sí. Hacemos páginas web, sistemas de facturación y bots de WhatsApp para negocios de Tulcán, Julio Andrade, San Gabriel, El Ángel, Bolívar, Mira, Huaca y toda la provincia del Carchi. Coordinamos por WhatsApp o videollamada, y viajamos cuando el proyecto lo amerita.",
  },
  {
    q: "¿Qué hace un bot de WhatsApp por mi negocio?",
    a: "Un bot de WhatsApp contesta a tus clientes a toda hora: responde las preguntas de siempre, agenda citas y confirma pedidos por ti. Así no pierdes ventas cuando estás ocupado o dormido, y tu negocio atiende las 24 horas.",
  },
  {
    q: "¿El sistema de facturación sirve para un negocio pequeño?",
    a: "Sí, está pensado justo para eso. Facturas, controlas tu inventario, agendas citas, registras ventas y sacas reportes desde un solo lugar, fácil de usar. Lo hacemos a la medida de cómo trabaja tu negocio en el Carchi.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No necesitas saber de tecnología. Nosotros nos encargamos del dominio, el hosting y toda la parte técnica, y te explicamos lo importante en palabras simples. Tú solo atiendes tu negocio; de lo demás nos ocupamos nosotros.",
  },
  {
    q: "¿Todo queda a mi nombre?",
    a: "Sí. Tu página web, tu sistema, tu contenido y los accesos son tuyos desde el primer día. Si algún día decides seguir con alguien más, te llevas todo contigo.",
  },
];
