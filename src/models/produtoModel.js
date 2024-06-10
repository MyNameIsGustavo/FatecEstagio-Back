import { PrismaClient } from "@prisma/client";
import {
  iniciarConexaoBancoDeDadosPrisma,
  encerrarConexaoBancoDeDadosPrisma,
} from "../configs/mysql.js";

const prisma = new PrismaClient();

export class Produto {
  async cadastrarNovoProduto(
    nomeProduto,
    precoProduto,
    descricaoProduto,
    tamanhoProduto,
    quantidadeProduto,
    tipoProduto,
    urlImagemProduto
  ) {
    await iniciarConexaoBancoDeDadosPrisma();
    debugger;
    
    try {
      const produtoCadastrado = await prisma.produto.create({
        data: {
          nomeProduto: nomeProduto,
          precoProduto: precoProduto,
          descricaoProduto: descricaoProduto,
          tamanhoProduto: tamanhoProduto,
          quantidadeProduto: quantidadeProduto,
          tipoProduto: tipoProduto,
          urlImagemProduto: urlImagemProduto,
        },
      });
      
      debugger;

      if (!produtoCadastrado) return false;

      return produtoCadastrado;
    } catch (error) {
      debugger;
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async deletarProduto(idProduto) {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      const produtoDeletado = await prisma.produto.delete({
        where: { chavePrimaria_idProduto: idProduto },
      });

      if (!produtoDeletado) return false;

      return produtoDeletado;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async listarProdutos() {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      const produtosListados = await prisma.produto.findMany();

      return produtosListados;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async listarProdutoPeloId(idProduto) {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      const produtoSelecionado = await prisma.produto.findUnique({
        where: { chavePrimaria_idProduto: idProduto },
      });

      if (!produtoSelecionado) return false;

      return produtoSelecionado;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async atualizarProdutoPeloId(idProduto, produtoInformacoesAtualizadas) {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      const produtoParaAtualizar = await prisma.produto.findUnique({
        where: { chavePrimaria_idProduto: idProduto },
      });

      if (!produtoParaAtualizar) return false;

      const produtoAtualizado = await prisma.produto.update({
        where: { chavePrimaria_idProduto: idProduto },
        data: produtoInformacoesAtualizadas,
      });

      return produtoAtualizado;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async listarTodosCafes() {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      const todosCafes = await prisma.produto.findMany({
        where: { tipoProduto: { equals: "CAFE" } },
      });
      if (!todosCafes) return false;

      return todosCafes;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async listarTodosAperitivos() {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      const todosAperitivos = await prisma.produto.findMany({
        where: { tipoProduto: { equals: "APERITIVO" } },
      });
      if (!todosAperitivos) return false;

      return todosAperitivos;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }
}
