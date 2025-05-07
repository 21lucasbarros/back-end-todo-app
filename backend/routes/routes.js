const express = require("express");
const router = express.Router();
module.exports = router;
const modeloTarefa = require("../models/tarefa");

router.post("/post", async (req, res) => {
  const objetoTarefa = new modeloTarefa({
    descricao: req.body.descricao,
    statusRealizada: req.body.statusRealizada,
  });
  try {
    const tarefaSalva = await objetoTarefa.save();
    res.status(200).json(tarefaSalva);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", verificaJWT, async (req, res, next) => {
  try {
    const resultados = await modeloTarefa.find();
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const resultado = await modeloTarefa.findByIdAndDelete(req.params.id);
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const novaTarefa = req.body;
    const options = { new: true };
    const result = await modeloTarefa.findByIdAndUpdate(
      id,
      novaTarefa,
      options
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Autorizacao
function verificaUsuarioSenha(req, res, next) {
  if (req.body.nome !== "branqs" || req.body.senha !== "1234") {
    return res
      .status(401)
      .json({ auth: false, message: "Usuario ou Senha incorreta" });
  }
  next();
}

//Autenticacao
var jwt = require("jsonwebtoken");
router.post("/login", (req, res, next) => {
  if (req.body.nome === "branqs" && req.body.senha === "1234") {
    const token = jwt.sign({ id: req.body.nome }, "segredo", {
      expiresIn: 300,
    });
    return res.json({ auth: true, token: token });
  }
  res.status(500).json({ message: "Login invalido!" });
});

//Nova forma de Autorizacao
function verificaJWT(req, res, next) {
  const token = req.headers["id-token"];
  if (!token)
    return res
      .status(401)
      .json({ auth: false, message: "Token não fornecido" });

  jwt.verify(token, "segredo", (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: "Falha !" });
    }
    req.userId = decoded.id;
    next();
  });
}
