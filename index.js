import Express from "express";
import { visaoDasRotasDeProduto } from "./src/views/produtoView.js";
import { visaoDasRotasDeUsuario } from "./src/views/usuarioView.js";

const app = Express();
const port = 3000;

app.use(Express.json());

app.use("/nativeCoffe", [
  visaoDasRotasDeUsuario,
  visaoDasRotasDeProduto,  
]);

app.listen(port, () => {
  console.log("O servidor Fatec-Estágio está funcionando...");
});
