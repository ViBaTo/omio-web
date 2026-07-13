// Layout propio para el panel de administración de Keystatic.
// Queda FUERA de [locale] y del NextIntlClientProvider, por eso provee
// su propio <html>/<body> (el RootLayout es passthrough).
export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
