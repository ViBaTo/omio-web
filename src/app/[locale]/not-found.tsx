import Link from "next/link";

export default function LocaleNotFound() {
  return (
    <main
      id="main-content"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", marginBottom: "1rem" }}>
        404
      </h1>
      <p style={{ fontSize: "1.125rem", marginBottom: "2rem", opacity: 0.85 }}>
        La página que buscas no existe.
      </p>
      <Link
        href="/"
        style={{
          color: "#8C7732",
          textDecoration: "underline",
          fontSize: "1rem",
        }}
      >
        Volver al inicio
      </Link>
    </main>
  );
}
