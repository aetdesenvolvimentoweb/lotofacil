import Link from "next/link";

export function Header() {
  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Lotofácil
          </Link>

          <nav className="space-x-6">
            <Link href="/" className="hover:text-green-200 transition-colors">
              Resultados
            </Link>
            <Link
              href="/check-numbers"
              className="hover:text-green-200 transition-colors"
            >
              Verificar Números
            </Link>
            <Link
              href="/statistics"
              className="hover:text-green-200 transition-colors"
            >
              Estatísticas
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
