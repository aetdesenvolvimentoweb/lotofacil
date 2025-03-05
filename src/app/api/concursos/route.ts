import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// Interface que reflete o modelo do Prisma
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "100");

  const skip = (page - 1) * pageSize;

  try {
    // Buscar todos os concursos
    const concursos = await db.concursos.findMany({
      // Não usamos orderBy aqui porque faremos a ordenação manualmente
    });

    // Ordenar por número de concurso (decrescente)
    // Como concurso já é um número no schema, não precisamos de parseInt
    const sortedConcursos = concursos.sort((a, b) => {
      return b.concurso - a.concurso; // Ordem decrescente
    });

    // Aplicar paginação manualmente
    const paginatedConcursos = sortedConcursos.slice(skip, skip + pageSize);

    const total = concursos.length;

    return NextResponse.json({
      concursos: paginatedConcursos,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao buscar concursos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extrair e converter os campos para números
    const concursoNum = Number(body.concurso);
    const bola1Num = Number(body.bola1);
    const bola2Num = Number(body.bola2);
    const bola3Num = Number(body.bola3);
    const bola4Num = Number(body.bola4);
    const bola5Num = Number(body.bola5);
    const bola6Num = Number(body.bola6);
    const bola7Num = Number(body.bola7);
    const bola8Num = Number(body.bola8);
    const bola9Num = Number(body.bola9);
    const bola10Num = Number(body.bola10);
    const bola11Num = Number(body.bola11);
    const bola12Num = Number(body.bola12);
    const bola13Num = Number(body.bola13);
    const bola14Num = Number(body.bola14);
    const bola15Num = Number(body.bola15);

    // Validate that all fields are present and are valid numbers
    if (
      isNaN(concursoNum) ||
      isNaN(bola1Num) ||
      isNaN(bola2Num) ||
      isNaN(bola3Num) ||
      isNaN(bola4Num) ||
      isNaN(bola5Num) ||
      isNaN(bola6Num) ||
      isNaN(bola7Num) ||
      isNaN(bola8Num) ||
      isNaN(bola9Num) ||
      isNaN(bola10Num) ||
      isNaN(bola11Num) ||
      isNaN(bola12Num) ||
      isNaN(bola13Num) ||
      isNaN(bola14Num) ||
      isNaN(bola15Num)
    ) {
      return NextResponse.json(
        { error: "Todos os campos devem ser números válidos" },
        { status: 400 }
      );
    }

    // Check if concurso already exists
    const existingConcurso = await db.concursos.findUnique({
      where: { concurso: concursoNum },
    });

    if (existingConcurso) {
      return NextResponse.json(
        { error: "Concurso já existe" },
        { status: 409 }
      );
    }

    const newConcurso = await db.concursos.create({
      data: {
        concurso: concursoNum,
        bola1: bola1Num,
        bola2: bola2Num,
        bola3: bola3Num,
        bola4: bola4Num,
        bola5: bola5Num,
        bola6: bola6Num,
        bola7: bola7Num,
        bola8: bola8Num,
        bola9: bola9Num,
        bola10: bola10Num,
        bola11: bola11Num,
        bola12: bola12Num,
        bola13: bola13Num,
        bola14: bola14Num,
        bola15: bola15Num,
      },
    });

    return NextResponse.json(newConcurso);
  } catch (error) {
    console.error("Erro ao criar concurso:", error);
    return NextResponse.json(
      { error: "Falha ao criar concurso" },
      { status: 500 }
    );
  }
}
