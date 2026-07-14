"use client";

/* ============================================================
   MobileNav — hamburguesa + panel a pantalla completa (<900px).
   Único componente cliente del sitio: solo el estado open/close.
   Colores desde los tokens de globals.css (:root) vía var().
   ============================================================ */

import { useState } from "react";
import { waLink } from "@/lib/seo";

const LINKS: [string, string][] = [
  ["#servicios", "Servicios"],
  ["#proceso", "Cómo trabajamos"],
  ["#zonas", "Zonas"],
  ["#precios", "Precios"],
  ["#faq", "Preguntas frecuentes"],
  ["#contacto", "Contacto"],
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mnav">
      <style>{`
        .mnav { display: none; }
        @media (max-width: 900px) { .mnav { display: block; } }
        .mnav-btn { display: inline-grid; place-items: center; width: 44px; height: 44px; border: 1px solid rgba(241,236,223,0.35); border-radius: 9px; background: transparent; color: #F1ECDF; cursor: pointer; }
        .mnav-btn:focus-visible { outline: 3px solid var(--amarillo); outline-offset: 2px; }
        .mnav-panel { position: fixed; inset: 0; z-index: 60; background: var(--verde-noche); color: #F1ECDF; display: flex; flex-direction: column; padding: 22px clamp(20px, 4vw, 44px) 34px; }
        .mnav-link { display: block; padding: 16px 2px; font-size: 24px; font-weight: 700; letter-spacing: -0.02em; color: #F1ECDF; border-bottom: 1px solid rgba(241,236,223,0.16); }
        .mnav-link:hover { color: var(--amarillo); }
      `}</style>

      <button
        type="button"
        className="mnav-btn"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        aria-controls="mnav-panel"
        onClick={() => setOpen(!open)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <div id="mnav-panel" className="mnav-panel" role="dialog" aria-label="Menú">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button type="button" className="mnav-btn" aria-label="Cerrar menú" onClick={() => setOpen(false)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>
          <nav aria-label="Menú móvil" style={{ marginTop: 10, flex: 1 }}>
            {LINKS.map(([href, label]) => (
              <a key={href} href={href} className="mnav-link" onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a
            target="_blank"
            rel="noopener"
            href={waLink("Hola 04 Tech, quiero información sobre una página web")}
            onClick={() => setOpen(false)}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10, padding: "16px 24px", borderRadius: 11, fontSize: 17, fontWeight: 700, background: "var(--amarillo)", color: "var(--verde-noche)" }}
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
