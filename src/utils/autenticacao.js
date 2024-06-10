import jwt from "jsonwebtoken";

export class AutenticacaoJWT {
  constructor(secretKey) {
    this.secretKey = secretKey;
  }

  gerarTokenJWT(conteudoDeEnvioNoTokenJWT) {
    return jwt.sign(conteudoDeEnvioNoTokenJWT, this.secretKey);
  }

  verificarTokenJWT(tokenJWT) {
    try {
      return jwt.verify(tokenJWT, this.secretKey);
    } catch (error) {
      throw new Error("Token inválido.");
    }
  }
}
