import { Produto } from "../models/produtoModel.js";

const produto = new Produto();

export class ProdutoController {
  async criarProduto(req, res) {
    const {
      nomeProduto,
      precoProduto,
      descricaoProduto,
      tamanhoProduto,
      quantidadeProduto,
      tipoProduto,
      urlImagemProduto,
    } = req.body;

    try {
      const novoProduto = await produto.cadastrarNovoProduto(
        nomeProduto,
        precoProduto,
        descricaoProduto,
        tamanhoProduto,
        quantidadeProduto,
        tipoProduto,
        urlImagemProduto
      );

      if (!novoProduto)
        return res
          .status(400)
          .json({ message: "Algo deu errado ao cadastrar um novo produto" });

      res.status(201).json(novoProduto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deletarProduto(req, res) {
    const idProduto = req.params.id;

    try {
      const produtoDeletado = await produto.deletarProduto(Number(idProduto));

      if (!produtoDeletado)
        return res
          .status(404)
          .json({ message: "ID do produto não encontrado." });

      res.status(200).json(produtoDeletado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarProdutos(req, res) {
    try {
      let produtosListados;
      const tipoProduto = req.query.tipo;

      if (tipoProduto) {
        switch (tipoProduto.toUpperCase()) {
          case "CAFE":
            produtosListados = await produto.listarTodosCafes();
            break;
          case "APERITIVO":
            produtosListados = await produto.listarTodosAperitivos();
            break;
          default:
            return res.status(400).json({ error: "Tipo de produto inválido" });
        }
      } else {
        produtosListados = await produto.listarProdutos();
      }

      res.status(200).json(produtosListados);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarProdutoPeloId(req, res) {
    const idProduto = req.params.id;

    try {
      const produtoListado = await produto.listarProdutoPeloId(
        Number(idProduto)
      );

      if (!produtoListado)
        return res
          .status(404)
          .json({ message: "ID do produto não encontrado." });

      res.status(200).json(produtoListado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async atualizarProduto(req, res) {
    const idProduto = req.params.id;
    const produtoInformacoesAtualizadas = req.body;

    try {
      const produtoAtualizado = await produto.atualizarProdutoPeloId(
        Number(idProduto),
        produtoInformacoesAtualizadas
      );

      if (!produtoAtualizado)
        return res
          .status(404)
          .json({ message: "ID do produto não encontrado." });

      res.status(200).json(produtoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
