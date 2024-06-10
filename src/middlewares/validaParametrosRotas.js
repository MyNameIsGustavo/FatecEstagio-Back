export class ValidadorDeParametros {
  constructor() {}

  validaNumeroInteiroMiddleware(req, res, next) {
    const id = req.params.id;

    if (!isNaN(id) && Number.isInteger(Number(id))) {
      next();
    } else {
      res
        .status(400)
        .json({ error: "ID inválido. Deve ser um número inteiro." });
    }
  }
}
