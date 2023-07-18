const usuarioSchema = require('../models/usuarioSchema')
const bcrypt = require("bcrypt");

const obterTodos = async (request, response) => {
    try {
        const usuarios = await usuarioSchema.find({})
        response.status(200).send(usuarios)
    } catch (error) {
        response.status(500).send({ mensagem: error.message })
    }
}

const cadastrar = async (request, response) => {
    const hashedPassword = bcrypt.hashSync(request.body.password, 10)
    request.body.password = hashedPassword
  
    const existeEmail = await usuarioSchema.exists({ email: request.body.email })
    if (existeEmail) {
        return response.status(409).send({ mensagem: "Email já cadastrado." })
    }
  
    try {
        const usuarioNovo = new usuarioSchema(request.body)
        const usuario = await usuarioNovo.save()

        response.status(201).send({
            mensagem: "Usuário criado com sucesso.",
            usuario,
        })
    } catch (error) {
        response.status(500).send({ mensagem: error.message })
    }
}

module.exports = {
    obterTodos,
    cadastrar
}
