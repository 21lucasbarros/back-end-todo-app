const express = require("express");
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "HEAD, GET, POST, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
const PORT = process.env.PORT || 3000;
const routes = require("./routes/routes");
app.use("/api", routes);
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
// Obtendo os parametros passados pela linha de comando
var userArgs = process.argv.slice(2);
var mongoURL = userArgs[0];
//Configurando a conexao com o Banco de Dados
var mongoose = require("mongoose");
mongoose.connect(mongoURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("connected", () => {
  console.log("Database Connected");
});
