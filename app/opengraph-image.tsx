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
          <div
            style={{
              width: 62,
              height: 62,
              borderRadius: 16,
              background: "#0E7A3B",
              color: "#FFF7EC",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            04
          </div>
          <div style={{ fontSize: 34, fontWeight: 700 }}>Tech</div>
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
