import { PrismaClient } from "@prisma/client";
import { MongoClient, ObjectId } from "mongodb";

// Função principal de migração
async function migrateToInt() {
  // Inicializa o cliente Prisma
  const prisma = new PrismaClient();

  try {
    // Obtém a URL do banco de dados do ambiente
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL não está definida no ambiente");
    }

    // Conecta ao MongoDB diretamente
    const mongoClient = new MongoClient(databaseUrl);
    await mongoClient.connect();

    // Obtém a referência para a coleção
    const db = mongoClient.db();
    const collection = db.collection("concursos");

    // Busca todos os concursos usando Prisma
    const concursos = await prisma.concursos.findMany();

    // Para cada concurso, converte os campos de String para Int
    let successCount = 0;
    let errorCount = 0;

    for (const concurso of concursos) {
      try {
        // Converte todos os campos para números
        const updatedConcurso = {
          Concurso:
            typeof concurso.concurso === "string"
              ? parseInt(concurso.concurso, 10)
              : concurso.concurso,
          Bola1:
            typeof concurso.bola1 === "string"
              ? parseInt(concurso.bola1, 10)
              : concurso.bola1,
          Bola2:
            typeof concurso.bola2 === "string"
              ? parseInt(concurso.bola2, 10)
              : concurso.bola2,
          Bola3:
            typeof concurso.bola3 === "string"
              ? parseInt(concurso.bola3, 10)
              : concurso.bola3,
          Bola4:
            typeof concurso.bola4 === "string"
              ? parseInt(concurso.bola4, 10)
              : concurso.bola4,
          Bola5:
            typeof concurso.bola5 === "string"
              ? parseInt(concurso.bola5, 10)
              : concurso.bola5,
          Bola6:
            typeof concurso.bola6 === "string"
              ? parseInt(concurso.bola6, 10)
              : concurso.bola6,
          Bola7:
            typeof concurso.bola7 === "string"
              ? parseInt(concurso.bola7, 10)
              : concurso.bola7,
          Bola8:
            typeof concurso.bola8 === "string"
              ? parseInt(concurso.bola8, 10)
              : concurso.bola8,
          Bola9:
            typeof concurso.bola9 === "string"
              ? parseInt(concurso.bola9, 10)
              : concurso.bola9,
          Bola10:
            typeof concurso.bola10 === "string"
              ? parseInt(concurso.bola10, 10)
              : concurso.bola10,
          Bola11:
            typeof concurso.bola11 === "string"
              ? parseInt(concurso.bola11, 10)
              : concurso.bola11,
          Bola12:
            typeof concurso.bola12 === "string"
              ? parseInt(concurso.bola12, 10)
              : concurso.bola12,
          Bola13:
            typeof concurso.bola13 === "string"
              ? parseInt(concurso.bola13, 10)
              : concurso.bola13,
          Bola14:
            typeof concurso.bola14 === "string"
              ? parseInt(concurso.bola14, 10)
              : concurso.bola14,
          Bola15:
            typeof concurso.bola15 === "string"
              ? parseInt(concurso.bola15, 10)
              : concurso.bola15,
        };

        // Atualiza o documento no MongoDB
        // Usamos o ObjectId para a consulta
        await collection.updateOne(
          { _id: new ObjectId(concurso.id) },
          { $set: updatedConcurso }
        );

        successCount++;
      } catch (error) {
        errorCount++;
      }
    }

    // Fecha as conexões
    await mongoClient.close();
    await prisma.$disconnect();
  } catch (error) {
    await prisma.$disconnect();
    process.exit(1);
  }
}

// Executa a migração
migrateToInt()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    process.exit(1);
  });
