import { PrismaClient } from "@prisma/client";
import {
  iniciarConexaoBancoDeDadosPrisma,
  encerrarConexaoBancoDeDadosPrisma,
} from "../configs/mysql.js";
import { AutenticacaoJWT } from "../utils/autenticacao.js";

const prisma = new PrismaClient();

export class Usuario {
  async cadastrarUsuario(
    nomeUsuario,
    sobrenomeUsuario,
    emailUsuario,
    senhaUsuario
  ) {
    await iniciarConexaoBancoDeDadosPrisma();

    try {
      const usuarioCadastrado = await prisma.usuario.create({
        data: {
          nomeUsuario: nomeUsuario,
          sobrenomeUsuario: sobrenomeUsuario,
          emailUsuario: emailUsuario,
          senhaUsuario: senhaUsuario,
        },
      });

      if (!usuarioCadastrado) return false;

      return usuarioCadastrado;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async listarInformacoesUsuario(idUsuario) {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      const informacoesUsuarioBancoDeDados = await prisma.usuario.findUnique({
        where: { chavePrimaria_idUsuario: idUsuario },
      });

      if (!informacoesUsuarioBancoDeDados) return false;

      const { nomeUsuario, sobrenomeUsuario, emailUsuario } =
        informacoesUsuarioBancoDeDados;

      const informacoesUsuario = {
        nomeUsuario,
        sobrenomeUsuario,
        emailUsuario,
      };

      return informacoesUsuario;
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }

  async realizarLogin(emailUsuario, senhaUsuario) {
    try {
      await iniciarConexaoBancoDeDadosPrisma();

      let verificarRegistro = await prisma.usuario.findUnique({
        where: { emailUsuario: emailUsuario },
      });

      if (!verificarRegistro) return null;

      if (verificarRegistro.senhaUsuario == senhaUsuario) {
        const autenticacao = new AutenticacaoJWT(process.env.SECRET_KEY);
        const token = autenticacao.gerarTokenJWT({
          idUsuario: verificarRegistro.chavePrimaria_idUsuario,
        });

        return token;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    } finally {
      await encerrarConexaoBancoDeDadosPrisma();
    }
  }
}
