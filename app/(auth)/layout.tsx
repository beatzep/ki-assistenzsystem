export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_top,_theme(colors.indigo.50),_theme(colors.background)_55%)] px-4 py-12">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">CodeMentor Learn</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Didaktisches Lernstudio</h1>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
