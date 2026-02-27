export default function StudioLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="sv">
        <head /> 
        <body style={{ margin: 0 }}>{children}</body>
      </html>
    )
  }