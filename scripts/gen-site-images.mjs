/* ============================================================
   gen-site-images.mjs — genera TODAS las imágenes del sitio con la
   Inference API de Hugging Face (FLUX.1-schnell) y las optimiza a
   WebP en public/img/. El token se lee de HUGGINGFACE_API_KEY y
   NUNCA se imprime ni se guarda en el repo.

   Uso:
     node --env-file=.env.local scripts/gen-site-images.mjs [nombre]
   (sin argumento genera todas; con nombre genera solo esa)
   ============================================================ */

import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const MODEL = process.env.HF_MODEL || "black-forest-labs/FLUX.1-schnell";
const token = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;
if (!token || token.length < 20) {
  console.error("✗ No hay token HF válido en .env.local (HUGGINGFACE_API_KEY).");
  process.exit(1);
}
const redact = (s) => (token ? String(s).replaceAll(token, "«REDACTED»") : String(s));

const STYLE =
  "sleek futuristic technology concept, holographic user interface, glowing neon blue and cyan light accents, glass and chrome surfaces, dark premium studio background, cinematic volumetric lighting, ultra-detailed 3D render, professional, clean, sense of innovation and trust, no text, no letters, no words, no watermark";

const IMAGES = [
  { name: "hero", w: 1216, h: 768, subject:
    "A glowing holographic smartphone floating above a reflective surface, surrounded by rising business growth bar charts and chat message bubbles made of light, conveying sales growth and success" },
  { name: "pagina-web", w: 1024, h: 768, subject:
    "A modern business website interface displayed on a floating futuristic laptop and smartphone, with layered translucent holographic UI panels and cards" },
  { name: "tienda", w: 1024, h: 768, subject:
    "A futuristic online store concept, holographic products and a glowing shopping cart icon floating in space, digital e-commerce storefront panels of light" },
  { name: "sistema", w: 1024, h: 768, subject:
    "A futuristic analytics and invoicing dashboard as floating holographic panels with line charts, bar graphs, tables and streaming data numbers made of blue light" },
  { name: "soporte", w: 1024, h: 768, subject:
    "A futuristic customer support concept, a glowing headset and a floating holographic chat and help interface, human and technology connected" },
  { name: "bot", w: 1024, h: 768, subject:
    "A futuristic AI assistant, a glowing translucent neural-network sphere and robotic core connected to floating chat message bubbles, artificial intelligence automation" },
  { name: "zonas", w: 1024, h: 768, subject:
    "A futuristic glowing digital map of a mountainous andean region seen from above, with connected network nodes and thin light lines linking towns, connectivity concept" },
];

const ENDPOINTS = [
  `https://router.huggingface.co/hf-inference/models/${MODEL}`,
  `https://api-inference.huggingface.co/models/${MODEL}`,
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, "..", "public", "img");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generate(item, attempt = 1) {
  const prompt = `${item.subject}. ${STYLE}`;
  const body = JSON.stringify({
    inputs: prompt,
    parameters: { width: item.w, height: item.h },
  });
  for (const url of ENDPOINTS) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "image/png",
        "x-wait-for-model": "true",
      },
      body,
    });
    const ctype = res.headers.get("content-type") || "";
    if (res.ok && ctype.startsWith("image/")) {
      return Buffer.from(await res.arrayBuffer());
    }
    const txt = redact(await res.text()).slice(0, 300);
    // 503 = modelo cargando, 429 = rate limit → reintentar con espera
    if ((res.status === 503 || res.status === 429) && attempt <= 4) {
      const wait = 15000 * attempt;
      console.log(`   · ${item.name}: ${res.status}, reintento ${attempt}/4 en ${wait / 1000}s…`);
      await sleep(wait);
      return generate(item, attempt + 1);
    }
    console.log(`   · ${item.name}: endpoint falló (${res.status}) → ${txt}`);
  }
  throw new Error(`No se pudo generar "${item.name}"`);
}

const only = process.argv[2];
const targets = only ? IMAGES.filter((i) => i.name === only) : IMAGES;
if (targets.length === 0) {
  console.error(`✗ No existe la imagen "${only}". Opciones: ${IMAGES.map((i) => i.name).join(", ")}`);
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
console.log(`• Modelo: ${MODEL}`);
console.log(`• Generando ${targets.length} imagen(es) → public/img/\n`);

let ok = 0;
for (const item of targets) {
  process.stdout.write(`→ ${item.name} (${item.w}x${item.h})… `);
  try {
    const raw = await generate(item);
    const outPath = path.join(OUT_DIR, `${item.name}.webp`);
    const info = await sharp(raw)
      .resize({ width: Math.min(item.w, 1100), withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);
    console.log(`✓ ${(info.size / 1024).toFixed(0)} KB → public/img/${item.name}.webp`);
    ok++;
  } catch (e) {
    console.log(`✗ ${redact(e.message)}`);
  }
}
console.log(`\nListo: ${ok}/${targets.length} imágenes generadas.`);
