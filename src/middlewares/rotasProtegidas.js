import jwt from "jsonwebtoken";
import "dotenv/config";

export class RotasProtegidas {
  constructor() {}

  verificaTokenJWT(req, res, next) {
    const reqToken = req.headers.authorization;

    if (!reqToken)
      return res
        .status(401)
        .json({ message: "Token de autenticação não foi fornecido." });
    if (!reqToken.startsWith("Bearer "))
      return res.status(401).json({ message: "Formato do token inválido." });

    const tokenJWT = reqToken.split(" ")[1];
    try {
      const tokenDecodificado = jwt.verify(tokenJWT, process.env.SECRET_KEY);
      if (!tokenDecodificado.idUsuario)
        return res
          .status(401)
          .json({ message: "Token inválido: Campos obrigatórios ausentes." });
          
      req.idUsuario = tokenDecodificado.idUsuario;
      
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Token inválido." });
    }
  }
}
