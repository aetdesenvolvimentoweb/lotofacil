import JsonLd from "@/components/JsonLd";

export default function CheckNumbersJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Verificador de Números da Lotofácil - Confira Seus Jogos",
    description:
      "Verifique seus jogos da Lotofácil contra resultados anteriores. Descubra quantos números você acertou e se ganhou algum prêmio.",
    url: "https://lotofacil-stats.vercel.app/check-numbers",
    mainEntity: {
      "@type": "WebApplication",
      name: "Verificador de Números da Lotofácil",
      description:
        "Aplicativo web para verificar jogos da Lotofácil contra resultados anteriores.",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "BRL",
        availability: "https://schema.org/InStock",
      },
    },
  };

  return <JsonLd data={data} />;
}
