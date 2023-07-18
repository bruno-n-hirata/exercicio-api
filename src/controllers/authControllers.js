const usuarioSchema = require('../models/usuarioSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const SECRET = process.env.SECRET;

const login = async (request, response) => {
    try {
        const usuario = await usuarioSchema.findOne({ email: request.body.email })
        if (!usuario) {
            return response.status(404).send({ mensagem: `Usuário ${request.body.email} não encontrado.` })
        }

        const senhaValida = bcrypt.compareSync(request.body.password, usuario.password)
        if (!senhaValida) {
            return response.status(401).send({ mensagem: "Senha inválida." })
        }

        const token = jwt.sign({ name: usuario.nome }, SECRET);
        response.status(200).send({
            mensagem: "Login efetuado com sucesso.",
            token
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    login
};
