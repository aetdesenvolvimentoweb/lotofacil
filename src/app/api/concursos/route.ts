import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

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

    // Ordenar manualmente por número de concurso (decrescente)
    const sortedConcursos = concursos.sort((a, b) => {
      const numA = parseInt(a.concurso, 10);
      const numB = parseInt(b.concurso, 10);
      return numB - numA; // Ordem decrescente
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
    const {
      concurso,
      bola1,
      bola2,
      bola3,
      bola4,
      bola5,
      bola6,
      bola7,
      bola8,
      bola9,
      bola10,
      bola11,
      bola12,
      bola13,
      bola14,
      bola15,
    } = body;

    // Validate that all fields are present
    if (
      !concurso ||
      !bola1 ||
      !bola2 ||
      !bola3 ||
      !bola4 ||
      !bola5 ||
      !bola6 ||
      !bola7 ||
      !bola8 ||
      !bola9 ||
      !bola10 ||
      !bola11 ||
      !bola12 ||
      !bola13 ||
      !bola14 ||
      !bola15
    ) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios" },
        { status: 400 }
      );
    }

    // Check if concurso already exists
    const existingConcurso = await db.concursos.findUnique({
      where: { concurso },
    });

    if (existingConcurso) {
      return NextResponse.json(
        { error: "Concurso já existe" },
        { status: 409 }
      );
    }

    const newConcurso = await db.concursos.create({
      data: {
        concurso,
        bola1,
        bola2,
        bola3,
        bola4,
        bola5,
        bola6,
        bola7,
        bola8,
        bola9,
        bola10,
        bola11,
        bola12,
        bola13,
        bola14,
        bola15,
      },
    });

    return NextResponse.json(newConcurso);
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao criar concurso" },
      { status: 500 }
    );
  }
}
