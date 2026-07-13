/* ============================================================
   gen-image-hf.mjs — genera imágenes con la Inference API de
   Hugging Face (por defecto FLUX.1-schnell, rápido y gratuito).
   El token se lee de HUGGINGFACE_API_KEY / HF_TOKEN y NUNCA se
   imprime ni se guarda en el repo.

   Uso:
     node --env-file=.env.local scripts/gen-image-hf.mjs "<prompt>" <salida.png>
   Modelo alternativo:
     HF_MODEL=stabilityai/stable-diffusion-xl-base-1.0 node --env-file=.env.local scripts/gen-image-hf.mjs "<prompt>" <salida.png>
   ============================================================ */

import { writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const MODEL = process.env.HF_MODEL || "black-forest-labs/FLUX.1-schnell";
const token = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;

function fail(msg) {
  console.error(`\n✗ ${msg}\n`);
  process.exit(1);
}

if (!token || token.length < 20) {
  fail("No hay token HF válido. Define HUGGINGFACE_API_KEY en .env.local.");
}

const prompt = process.argv[2];
const outPath = process.argv[3];
if (!prompt || !outPath) {
  fail('Uso: node --env-file=.env.local scripts/gen-image-hf.mjs "<prompt>" <salida.png>');
}

const redact = (s) => (token ? s.replaceAll(token, "«REDACTED»") : s);

// endpoints a intentar en orden (el router es el nuevo, el clásico como respaldo)
const ENDPOINTS = [
  `https://router.huggingface.co/hf-inference/models/${MODEL}`,
  `https://api-inference.huggingface.co/models/${MODEL}`,
];

console.log(`• Proveedor: Hugging Face Inference`);
console.log(`• Modelo: ${MODEL}`);
console.log(`• Prompt: ${prompt.slice(0, 80)}${prompt.length > 80 ? "…" : ""}`);
console.log(`• Salida: ${outPath}`);
console.log("• Generando…");

async function tryEndpoint(url) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "image/png",
      "x-wait-for-model": "true",
    },
    body: JSON.stringify({ inputs: prompt }),
  });
  const ctype = res.headers.get("content-type") || "";
  if (res.ok && ctype.startsWith("image/")) {
    const buf = Buffer.from(await res.arrayBuffer());
    return { ok: true, buf, ctype };
  }
  const body = await res.text();
  return { ok: false, status: res.status, statusText: res.statusText, body: redact(body).slice(0, 500), url };
}

let lastErr = null;
for (const url of ENDPOINTS) {
  try {
    const r = await tryEndpoint(url);
    if (r.ok) {
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, r.buf);
      console.log(`\n✓ Imagen guardada: ${outPath}  (${(r.buf.length / 1024).toFixed(0)} KB, ${r.ctype})`);
      process.exit(0);
    }
    lastErr = r;
    console.log(`  · endpoint falló (${r.status} ${r.statusText}), probando siguiente…`);
  } catch (e) {
    lastErr = { status: "ERR", body: redact(String(e.message || e)) };
    console.log(`  · error de red, probando siguiente…`);
  }
}

fail(`No se pudo generar. Último error ${lastErr?.status} ${lastErr?.statusText || ""}:\n${lastErr?.body || ""}`);
