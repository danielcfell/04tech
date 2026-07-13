import { ImageResponse } from "next/og";

export const alt =
  "04 Tech — páginas web, sistemas y bots de WhatsApp en Tulcán y el Carchi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Paleta bloqueada = bandera Carchi + crema: verde #0E7A3B, amarillo #F4CD00, rojo #D81E29, crema #E9E4D6, verde noche #0B3A1F */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B3A1F",
          color: "#F1ECDF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* isotipo Nodo 04 — el 0 es el anillo, el nodo marca las 4:00 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            width={64}
            height={64}
            alt=""
            src={`data:image/svg+xml,${encodeURIComponent(
              "<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><circle cx='32' cy='32' r='23' fill='none' stroke='#F1ECDF' stroke-width='10'/><circle cx='51.9' cy='43.5' r='8' fill='#F4CD00' stroke='#0B3A1F' stroke-width='4'/></svg>"
            )}`}
          />
          <div style={{ display: "flex", fontSize: 40, letterSpacing: "-1.5px" }}>
            <span style={{ fontWeight: 800 }}>04</span>
            <span style={{ fontWeight: 500 }}>tech</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2px",
              maxWidth: 940,
            }}
          >
            <span>Más clientes para tu negocio, desde tu&nbsp;</span>
            <span style={{ color: "#F4CD00" }}>WhatsApp</span>
          </div>
          <div style={{ fontSize: 30, color: "rgba(241,236,223,0.85)", maxWidth: 900 }}>
            Página web · sistema de facturación · bot de WhatsApp. Tulcán y todo el
            Carchi. Desde $39.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              background: "#0E7A3B",
              color: "#F1ECDF",
              fontSize: 24,
              fontWeight: 600,
              padding: "12px 26px",
              borderRadius: 999,
            }}
          >
            04tech.ec
          </div>
          <div style={{ fontSize: 24, color: "rgba(241,236,223,0.7)" }}>
            Tulcán · Julio Andrade · Carchi, Ecuador
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
