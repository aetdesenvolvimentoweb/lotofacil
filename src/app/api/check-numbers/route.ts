import { db } from "@/lib/db";
import { concursoToNumberArray } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { numbers } = body;

    if (
      !numbers ||
      !Array.isArray(numbers) ||
      numbers.length < 15 ||
      numbers.length > 20
    ) {
      return NextResponse.json(
        { error: "Você deve escolher entre 15 e 20 números" },
        { status: 400 }
      );
    }

    // Ensure all numbers are between 1 and 25
    if (!numbers.every((num) => num >= 1 && num <= 25)) {
      return NextResponse.json(
        { error: "Os números devem ser entre 1 e 25" },
        { status: 400 }
      );
    }

    // Get all concursos
    const concursos = await db.concursos.findMany();

    // Initialize counters
    const results = {
      total: concursos.length,
      hits11: 0,
      hits12: 0,
      hits13: 0,
      hits14: 0,
      hits15: 0,
      percentages: {
        hits11: 0,
        hits12: 0,
        hits13: 0,
        hits14: 0,
        hits15: 0,
      },
    };

    // Check hits for each concurso
    concursos.forEach((concurso) => {
      const concursoNumbers = concursoToNumberArray(concurso);

      // Count how many of the selected numbers were drawn in this concurso
      const hits = numbers.filter((num) =>
        concursoNumbers.includes(num)
      ).length;

      // Increment the appropriate counter
      if (hits >= 11) {
        results[`hits${hits}` as keyof typeof results]++;
      }
    });

    // Calculate percentages
    results.percentages.hits11 = Number(
      ((results.hits11 / results.total) * 100).toFixed(2)
    );
    results.percentages.hits12 = Number(
      ((results.hits12 / results.total) * 100).toFixed(2)
    );
    results.percentages.hits13 = Number(
      ((results.hits13 / results.total) * 100).toFixed(2)
    );
    results.percentages.hits14 = Number(
      ((results.hits14 / results.total) * 100).toFixed(2)
    );
    results.percentages.hits15 = Number(
      ((results.hits15 / results.total) * 100).toFixed(2)
    );

    return NextResponse.json(results);
  } catch (error) {
    console.error("Erro ao criar concurso:", error);
    return NextResponse.json(
      { error: "Falha ao verificar os números." },
      { status: 500 }
    );
  }
}
