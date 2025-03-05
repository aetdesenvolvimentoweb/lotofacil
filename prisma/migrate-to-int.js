const { PrismaClient } = require("@prisma/client");
const { MongoClient, ObjectId } = require("mongodb");

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

    // Busca todos os concursos diretamente do MongoDB
    const concursos = await collection.find({}).toArray();

    // Para cada concurso, converte os campos de String para Int
    let successCount = 0;
    let errorCount = 0;

    for (const concurso of concursos) {
      try {
        // Converte todos os campos para números
        const updatedConcurso = {
          Concurso:
            typeof concurso.Concurso === "string"
              ? parseInt(concurso.Concurso, 10)
              : concurso.Concurso,
          Bola1:
            typeof concurso.Bola1 === "string"
              ? parseInt(concurso.Bola1, 10)
              : concurso.Bola1,
          Bola2:
            typeof concurso.Bola2 === "string"
              ? parseInt(concurso.Bola2, 10)
              : concurso.Bola2,
          Bola3:
            typeof concurso.Bola3 === "string"
              ? parseInt(concurso.Bola3, 10)
              : concurso.Bola3,
          Bola4:
            typeof concurso.Bola4 === "string"
              ? parseInt(concurso.Bola4, 10)
              : concurso.Bola4,
          Bola5:
            typeof concurso.Bola5 === "string"
              ? parseInt(concurso.Bola5, 10)
              : concurso.Bola5,
          Bola6:
            typeof concurso.Bola6 === "string"
              ? parseInt(concurso.Bola6, 10)
              : concurso.Bola6,
          Bola7:
            typeof concurso.Bola7 === "string"
              ? parseInt(concurso.Bola7, 10)
              : concurso.Bola7,
          Bola8:
            typeof concurso.Bola8 === "string"
              ? parseInt(concurso.Bola8, 10)
              : concurso.Bola8,
          Bola9:
            typeof concurso.Bola9 === "string"
              ? parseInt(concurso.Bola9, 10)
              : concurso.Bola9,
          Bola10:
            typeof concurso.Bola10 === "string"
              ? parseInt(concurso.Bola10, 10)
              : concurso.Bola10,
          Bola11:
            typeof concurso.Bola11 === "string"
              ? parseInt(concurso.Bola11, 10)
              : concurso.Bola11,
          Bola12:
            typeof concurso.Bola12 === "string"
              ? parseInt(concurso.Bola12, 10)
              : concurso.Bola12,
          Bola13:
            typeof concurso.Bola13 === "string"
              ? parseInt(concurso.Bola13, 10)
              : concurso.Bola13,
          Bola14:
            typeof concurso.Bola14 === "string"
              ? parseInt(concurso.Bola14, 10)
              : concurso.Bola14,
          Bola15:
            typeof concurso.Bola15 === "string"
              ? parseInt(concurso.Bola15, 10)
              : concurso.Bola15,
        };

        // Atualiza o documento no MongoDB
        await collection.updateOne(
          { _id: concurso._id },
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
