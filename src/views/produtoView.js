import express from "express";
import { ProdutoController } from "../controllers/produtoController.js";
import { ValidadorDeParametros } from "../middlewares/validaParametrosRotas.js";
import { RotasProtegidas } from "../middlewares/rotasProtegidas.js";

const visaoDasRotasDeProduto = express.Router();
const produtoController = new ProdutoController();
const validadorDeParametros = new ValidadorDeParametros();
const rotasProtegidasTokenJWT = new RotasProtegidas();

visaoDasRotasDeProduto.post(
  "/produto",
  rotasProtegidasTokenJWT.verificaTokenJWT,
  async (req, res) => {
    await produtoController.criarProduto(req, res);
  }
);

visaoDasRotasDeProduto.delete(
  "/produto/:id",
  rotasProtegidasTokenJWT.verificaTokenJWT,
  validadorDeParametros.validaNumeroInteiroMiddleware,
  async (req, res) => {
    await produtoController.deletarProduto(req, res);
  }
);

visaoDasRotasDeProduto.get(
  "/produto",
  rotasProtegidasTokenJWT.verificaTokenJWT,
  async (req, res) => {
    await produtoController.listarProdutos(req, res);
  }
);

visaoDasRotasDeProduto.get(
  "/produto/:id",
  rotasProtegidasTokenJWT.verificaTokenJWT,
  validadorDeParametros.validaNumeroInteiroMiddleware,
  async (req, res) => {
    await produtoController.listarProdutoPeloId(req, res);
  }
);

visaoDasRotasDeProduto.put(
  "/produto/:id",
  rotasProtegidasTokenJWT.verificaTokenJWT,
  validadorDeParametros.validaNumeroInteiroMiddleware,
  async (req, res) => {
    await produtoController.atualizarProduto(req, res);
  }
);

export { visaoDasRotasDeProduto };