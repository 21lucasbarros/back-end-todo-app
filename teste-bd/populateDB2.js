#! /usr/bin/env node

console.log("Teste gravacao de dados no banco remoto");

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
var Partida = require("./models/2004");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

async function gravaRegistros() {
  await new Partida({
    time1: "Inimigos da bola",
    time2: "Nóis não joga nada",
    placar: "2x0",
  }).save();
  await new Partida({ time1: "PCC", time2: "Prets", placar: "2x3" }).save();
  await new Partida({
    time1: "Meus Queridos",
    time2: "Fenômenos",
    placar: "1x0",
  }).save();
  await new Partida({
    time1: "Engenharia Só Se For",
    time2: "Alcapone",
    placar: "1x1",
  }).save();
  await new Partida({
    time1: "Inimigos da Bola",
    time2: "Meus Queridos",
    placar: "5x1",
  }).save();
  await new Partida({
    time1: "PCC",
    time2: "Engenharia Só Se For",
    placar: "0x4",
  }).save();
  await new Partida({
    time1: "Nóis não joga nada",
    time2: "Fenômenos",
    placar: "0x4",
  }).save();
  await new Partida({
    time1: "Prets",
    time2: "Alcapone",
    placar: "1x0",
  }).save();
  await new Partida({
    time1: "Inimigos da bola",
    time2: "Fenômenos",
    placar: "1x1",
  }).save();
  await new Partida({ time1: "PCC", time2: "O", placar: "xW" }).save();
  await new Partida({
    time1: "Alcapone",
    time2: "Nóis Não Joga Nada",
    placar: "2x0",
  }).save();
  await new Partida({
    time1: "Meus Queridos",
    time2: "Prets",
    placar: "0x5",
  }).save();
  await new Partida({
    time1: "Engenharia Só Se For",
    time2: "Inimigos da Bola",
    placar: "0x4",
  }).save();
  await new Partida({
    time1: "Prets",
    time2: "Engenharia Só Se For",
    placar: "1x0",
  }).save();
  await new Partida({
    time1: "Fenômenos",
    time2: "Prets",
    placar: "2x1",
  }).save();
  await mongoose.connection.close();
}

gravaRegistros();
