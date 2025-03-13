#! /usr/bin/env node

console.log('Teste gravacao de dados no banco remoto');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require('async')
var Tarefa = require('./models/tarefa')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function gravaRegistros() {
  await (new Tarefa({descricao: "Estudar Frameworks WEB",statusRealizada: false})).save();
  await (new Tarefa({descricao: "Comer Pizza",statusRealizada: false})).save();
  await (new Tarefa({descricao: "Ajudar meus pais",statusRealizada: false})).save();
  await mongoose.connection.close();
}

gravaRegistros()

