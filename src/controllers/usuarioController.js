import { Usuario } from "../models/usuarioModel.js";

const usuario = new Usuario();

export class UsuarioController {
  async criarUsuario(req, res) {
    const { nomeUsuario, sobrenomeUsuario, emailUsuario, senhaUsuario } =
      req.body;

    try {
      const novoUsuario = await usuario.cadastrarUsuario(
        nomeUsuario,
        sobrenomeUsuario,
        emailUsuario,
        senhaUsuario
      );

      if (!novoUsuario)
        return res
          .status(500)
          .json({ message: "Algo deu errado ao criar um novo usuario." });

      res.status(201).json(novoUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarInformacoesUsuario(req, res) {
    const idUsuarioJWT = req.idUsuario;

    try {
      const informacoesUsuario = await usuario.listarInformacoesUsuario(
        Number(idUsuarioJWT)
      );

      if (!informacoesUsuario)
        return res
          .status(404)
          .json({
            message: "Algo deu errado ao listar as informacoes do usuario",
          });

      res.status(200).json(informacoesUsuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async realizarLogin(req, res) {
    const { emailUsuario, senhaUsuario } = req.body;

    try {
      const tokenDeAutenticacao = await usuario.realizarLogin(
        emailUsuario,
        senhaUsuario
      );

      res.status(200).json(tokenDeAutenticacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
