const express = require("express")
const controller = require("../controllers/carroControllers")
const authController = require("../controllers/authControllers");
const usuarioController = require("../controllers/usuarioControllers");
const { checkAuth } = require("../middlewares/auth");

const app = express.Router()

app.get("/carro", controller.obterTodos)
app.post("/carro", controller.cadastrar)
app.patch("/carro/:id", controller.atualizar)
app.delete("/carro/:id", checkAuth, controller.deletar)

app.get("/usuario", usuarioController.obterTodos)
app.post("/usuario", usuarioController.cadastrar)
app.post("/login", authController.login)

module.exports = app
