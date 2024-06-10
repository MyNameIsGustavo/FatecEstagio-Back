import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

const iniciarConexaoBancoDeDadosPrisma = async () => {
  try {
    await prisma.$connect();
    console.log("Conexão aberta bem-sucedida com o Prisma para uso.");
  } catch (error) {
    console.error("Erro ao conectar com o Prisma:", error);
    throw error;
  }
};

const encerrarConexaoBancoDeDadosPrisma = async () => {
  try {
    await prisma.$disconnect();
    console.log("Conexão com o Prisma encerrada com sucesso após o uso.");
  } catch (error) {
    console.error("Erro ao encerrar a conexão com o Prisma:", error);
    throw error;
  }
};

export { iniciarConexaoBancoDeDadosPrisma, encerrarConexaoBancoDeDadosPrisma };