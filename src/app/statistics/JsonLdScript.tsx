import JsonLd from "@/components/JsonLd";

export default function StatisticsJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Estatísticas da Lotofácil - Análise Avançada de Resultados",
    description:
      "Estatísticas avançadas da Lotofácil com análise de números mais sorteados, atrasados, sequências, padrões geométricos e muito mais.",
    url: "https://lotofacil-stats.vercel.app/statistics",
    mainEntity: {
      "@type": "Dataset",
      name: "Estatísticas da Lotofácil",
      description:
        "Conjunto de dados estatísticos sobre os resultados da Lotofácil, incluindo números mais sorteados, atrasados, sequências e padrões.",
      creator: {
        "@type": "Organization",
        name: "Lotofácil Stats",
      },
      keywords:
        "estatísticas lotofácil, números quentes lotofácil, números frios lotofácil, padrões lotofácil, análise lotofácil",
    },
  };

  return <JsonLd data={data} />;
}
