import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface Concurso {
  id: string;
  concurso: number;
  bola1: number;
  bola2: number;
  bola3: number;
  bola4: number;
  bola5: number;
  bola6: number;
  bola7: number;
  bola8: number;
  bola9: number;
  bola10: number;
  bola11: number;
  bola12: number;
  bola13: number;
  bola14: number;
  bola15: number;
}

interface Stats {
  num: number;
  sequencia: number;
  atraso: number;
}

export async function GET() {
  try {
    // Get all concursos
    // Buscamos todos os concursos e ordenamos numericamente (não lexicograficamente)
    const concursos: Concurso[] = await db.concursos.findMany();
    // Ordenamos por número de concurso (do mais recente para o mais antigo)
    concursos.sort((a, b) => b.concurso - a.concurso);
    // Inicializa o array stats de forma mais concisa
    const stats: Stats[] = Array.from({ length: 25 }, (_, i) => ({
      num: i + 1,
      sequencia: 0,
      atraso: 0,
    }));

    // Função auxiliar para extrair os números sorteados de um concurso
    const getNumerosSorteados = (concurso: Concurso): number[] => [
      concurso.bola1,
      concurso.bola2,
      concurso.bola3,
      concurso.bola4,
      concurso.bola5,
      concurso.bola6,
      concurso.bola7,
      concurso.bola8,
      concurso.bola9,
      concurso.bola10,
      concurso.bola11,
      concurso.bola12,
      concurso.bola13,
      concurso.bola14,
      concurso.bola15,
    ];

    // Calcula atrasos e sequências para cada número
    stats.forEach((stat) => {
      let interrompeAtraso = false;
      let interrompeSequencia = false;

      concursos.forEach((concurso) => {
        const numerosSorteados = getNumerosSorteados(concurso);

        if (numerosSorteados.includes(stat.num)) {
          if (!interrompeSequencia) {
            stat.sequencia += 1;
            stat.atraso = 0;
          }
          interrompeAtraso = true;
        } else {
          if (!interrompeAtraso) {
            stat.sequencia = 0;
            stat.atraso += 1;
          }
          interrompeSequencia = true;
        }
      });
    });

    // Contagem de ocorrências de cada número
    const numberCounts = Array(26).fill(0); // 0-25, ignore index 0

    // Contagem de ocorrências recentes (últimos 20 concursos)
    const recentNumberCounts = Array(26).fill(0);

    // Último concurso em que cada número apareceu
    const lastAppearance = Array(26).fill(0);

    // Processa os concursos para contagem
    concursos.forEach((concurso, index) => {
      // Usa a função auxiliar para obter os números sorteados
      const numerosSorteados = getNumerosSorteados(concurso);

      // Conta ocorrências
      numerosSorteados.forEach((num) => {
        numberCounts[num]++;

        // Atualiza último concurso em que o número apareceu
        if (lastAppearance[num] === 0) {
          lastAppearance[num] = concurso.concurso;
        }

        // Conta ocorrências recentes (últimos 20 concursos)
        if (index < 20) {
          recentNumberCounts[num]++;
        }
      });
    });

    // Interface para contagem de padrões
    interface PadraoCount {
      total: number;
      parcial: number[];
    }

    // Definição de padrões geométricos no volante da Lotofácil (5x5)
    const padroes: Record<string, number[]> = {
      // Linhas horizontais
      linha1: [1, 2, 3, 4, 5],
      linha2: [6, 7, 8, 9, 10],
      linha3: [11, 12, 13, 14, 15],
      linha4: [16, 17, 18, 19, 20],
      linha5: [21, 22, 23, 24, 25],

      // Colunas verticais
      coluna1: [1, 6, 11, 16, 21],
      coluna2: [2, 7, 12, 17, 22],
      coluna3: [3, 8, 13, 18, 23],
      coluna4: [4, 9, 14, 19, 24],
      coluna5: [5, 10, 15, 20, 25],

      // Diagonais
      diagonal1: [1, 7, 13, 19, 25],
      diagonal2: [5, 9, 13, 17, 21],

      // Quadrantes
      quadrante1: [1, 2, 3, 6, 7, 8, 11, 12, 13],
      quadrante2: [3, 4, 5, 8, 9, 10, 13, 14, 15],
      quadrante3: [11, 12, 13, 16, 17, 18, 21, 22, 23],
      quadrante4: [13, 14, 15, 18, 19, 20, 23, 24, 25],
    };

    // Contagem de ocorrências de cada padrão
    const padraoCount: Record<string, PadraoCount> = {};

    // Analisa padrões em cada concurso
    concursos.forEach((concurso) => {
      const numerosSorteados = getNumerosSorteados(concurso);

      // Verifica cada padrão
      Object.entries(padroes).forEach(([nome, numeros]) => {
        // Conta quantos números do padrão estão presentes no sorteio
        const count = numeros.filter((num) =>
          numerosSorteados.includes(num)
        ).length;

        // Inicializa contador se necessário
        if (!padraoCount[nome]) {
          padraoCount[nome] = {
            total: 0,
            parcial: Array(numeros.length + 1).fill(0),
          };
        }

        // Incrementa contador de ocorrências parciais
        padraoCount[nome].parcial[count]++;

        // Se todos os números do padrão estiverem presentes, incrementa o total
        if (count === numeros.length) {
          padraoCount[nome].total++;
        }
      });
    });

    // Função auxiliar para obter os top 10 itens de uma lista
    const getTop10 = <T, R>(
      items: T[],
      sortFn: (a: T, b: T) => number,
      mapFn: (item: T) => R
    ): R[] => {
      return [...items].sort(sortFn).slice(0, 10).map(mapFn);
    };

    // Calcula números quentes (mais frequentes recentemente)
    const hotNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
      .sort((a, b) => recentNumberCounts[b] - recentNumberCounts[a])
      .slice(0, 5)
      .map((num) => ({ number: num, count: recentNumberCounts[num] }));

    // Calcula números frios (que não saem há mais tempo)
    const coldNumbers = Array.from({ length: 25 }, (_, i) => i + 1)
      .sort(
        (a, b) =>
          stats.find((s) => s.num === a)!.atraso -
          stats.find((s) => s.num === b)!.atraso
      )
      .reverse()
      .slice(0, 5)
      .map((num) => ({
        number: num,
        contestsAgo: stats.find((s) => s.num === num)!.atraso,
      }));

    // Combinação de números quentes e frios
    const hotAndColdCombination = {
      hot: hotNumbers,
      cold: coldNumbers,
      combined: [
        ...hotNumbers.map((h) => h.number),
        ...coldNumbers.map((c) => c.number),
      ],
    };

    // Padrões geométricos mais frequentes
    const geometricPatterns = Object.entries(padraoCount)
      .map(([pattern, counts]) => ({
        pattern,
        numbers: padroes[pattern],
        completeMatches: counts.total,
        partialMatches: counts.parcial,
      }))
      .sort((a, b) => b.completeMatches - a.completeMatches)
      .slice(0, 5);

    // Gera os resultados finais
    const results = {
      // Números mais sorteados
      mostDrawn: getTop10(
        Array.from({ length: 25 }, (_, i) => i + 1),
        (a, b) => numberCounts[b] - numberCounts[a],
        (num) => ({ number: num, count: numberCounts[num] })
      ),

      // Números com maior atraso
      coldestNumbers: getTop10(
        stats,
        (a, b) => b.atraso - a.atraso,
        (stat) => ({ number: stat.num, contestsAgo: stat.atraso })
      ),

      // Números com maior sequência atual
      longestSequence: getTop10(
        stats,
        (a, b) => b.sequencia - a.sequencia,
        (stat) => ({ number: stat.num, consecutiveDraws: stat.sequencia })
      ),

      // Novas estatísticas
      hotAndCold: hotAndColdCombination,
      geometricPatterns,
    };

    return NextResponse.json(results);
  } catch (error) {
    console.error("Erro ao criar concurso:", error);
    return NextResponse.json(
      { error: "Falha ao buscar estatísticas" },
      { status: 500 }
    );
  }
}
