
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main id="main-content" tabIndex={-1}>
      {children}
    </main>
  );
}
