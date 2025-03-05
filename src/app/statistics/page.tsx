"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import StatisticsJsonLd from "./JsonLdScript";
import { AdHorizontal } from "@/components/ads";

interface NumberStat {
  number: number;
  count: number;
}

interface ColdNumber {
  number: number;
  contestsAgo: number;
}

interface SequenceNumber {
  number: number;
  consecutiveDraws: number;
}

interface RecencyFrequency {
  number: number;
  frequency: number;
  recency: number;
  score: number;
}

interface GeometricPattern {
  pattern: string;
  numbers: number[];
  completeMatches: number;
  partialMatches: number[];
}

interface HotAndCold {
  hot: NumberStat[];
  cold: ColdNumber[];
  combined: number[];
}

interface StatisticsData {
  mostDrawn: NumberStat[];
  coldestNumbers: ColdNumber[];
  longestSequence: SequenceNumber[];
  hotAndCold: HotAndCold;
  recencyVsFrequency: RecencyFrequency[];
  geometricPatterns: GeometricPattern[];
}

export default function StatisticsPage() {
  const { data, isLoading, isError, refetch } = useQuery<StatisticsData>({
    queryKey: ["statistics"],
    queryFn: async () => {
      const response = await fetch("/api/statistics");
      if (!response.ok) {
        throw new Error("Falha ao buscar estatísticas");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500">Erro ao carregar as estatísticas</p>
        <Button variant="outline" className="mt-4" onClick={() => refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <StatisticsJsonLd />
      <h1 className="text-2xl font-bold">Estatísticas Lotofácil</h1>

      {/* Anúncio horizontal no topo */}
      <AdHorizontal />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Números mais sorteados */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Números Mais Sorteados</h2>
          <div className="space-y-3">
            {data?.mostDrawn.map((item, index) => (
              <div key={item.number} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium mr-3">
                  {item.number}
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{
                        width: `${
                          (item.count / data.mostDrawn[0].count) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="ml-3 font-semibold">{item.count}x</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sequência atual */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Maior Sequência Atual</h2>
          <div className="space-y-3">
            {data?.longestSequence.map((item) => (
              <div key={item.number} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium mr-3">
                  {item.number}
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${
                          (item.consecutiveDraws /
                            data.longestSequence[0].consecutiveDraws) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="ml-3 font-semibold">
                  {item.consecutiveDraws}x
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Números atrasados */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Números Atrasados</h2>
          <div className="space-y-3">
            {data?.coldestNumbers.map((item) => (
              <div key={item.number} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-medium mr-3">
                  {item.number}
                </div>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: `${
                          (item.contestsAgo /
                            data.coldestNumbers[0].contestsAgo) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
                <span className="ml-3 font-semibold">
                  {item.contestsAgo} concursos
                </span>
              </div>
            ))}
          </div>

          {/* Novas estatísticas */}
        </div>
        {/* Números Quentes e Frios Combinados */}
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4">
            Números Quentes e Frios
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-medium mb-2 text-red-600">
                Números Quentes (Recentes)
              </h3>
              <div className="flex flex-wrap gap-2">
                {data?.hotAndCold.hot.map((item) => (
                  <div
                    key={item.number}
                    className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-sm font-medium"
                    title={`${item.count} vezes nos últimos 20 concursos`}
                  >
                    {item.number}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-2 text-blue-600">
                Números Frios (Atrasados)
              </h3>
              <div className="flex flex-wrap gap-2">
                {data?.hotAndCold.cold.map((item) => (
                  <div
                    key={item.number}
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium"
                    title={`Não sai há ${item.contestsAgo} concursos`}
                  >
                    {item.number}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-md font-medium mb-2 text-purple-600">
                Combinação Sugerida
              </h3>
              <div className="flex flex-wrap gap-2">
                {data?.hotAndCold.combined.map((num) => (
                  <div
                    key={num}
                    className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium"
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Padrões Geométricos */}
        <div className="bg-white p-6 rounded-lg border shadow-sm col-span-full">
          <h2 className="text-lg font-semibold mb-4">Padrões Geométricos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.geometricPatterns.map((pattern) => (
              <div
                key={pattern.pattern}
                className="border rounded-lg p-3 bg-gray-50"
              >
                <h3 className="font-medium mb-2 text-gray-800">
                  {pattern.pattern}
                </h3>
                <div className="grid grid-cols-5 gap-1 mb-2 max-w-[200px]">
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => {
                    const isInPattern = pattern.numbers.includes(num);
                    return (
                      <div
                        key={num}
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium
                              ${
                                isInPattern
                                  ? "bg-teal-600 text-white"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                      >
                        {num}
                      </div>
                    );
                  })}
                </div>
                <div className="text-sm font-semibold text-gray-700">
                  Ocorrências completas: {pattern.completeMatches}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
