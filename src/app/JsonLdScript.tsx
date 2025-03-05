import JsonLd from "@/components/JsonLd";

export default function HomeJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Lotofácil Stats",
    url: "https://lotofacil-stats.vercel.app",
    description:
      "Análise completa da Lotofácil com estatísticas, verificador de jogos, histórico de concursos e muito mais.",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://lotofacil-stats.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return <JsonLd data={data} />;
}
