import express from "express";
import { UsuarioController } from "../controllers/usuarioController.js";
import { RotasProtegidas } from "../middlewares/rotasProtegidas.js";

const visaoDasRotasDeUsuario = express.Router();
const usuarioController = new UsuarioController();
const rotasProtegidas = new RotasProtegidas();

visaoDasRotasDeUsuario.post("/usuario", async (req, res) => {
  await usuarioController.criarUsuario(req, res);
});

visaoDasRotasDeUsuario.post("/login", async (req, res) => {
  await usuarioController.realizarLogin(req, res);
});

visaoDasRotasDeUsuario.get(
  "/usuario",
  rotasProtegidas.verificaTokenJWT,
  async (req, res) => {
    await usuarioController.listarInformacoesUsuario(req, res);
  }
);

export { visaoDasRotasDeUsuario };