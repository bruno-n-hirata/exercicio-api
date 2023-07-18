const carroSchema = require("../models/carroSchema")
const carroModel = require("../models/carroModel")

const obterTodos = async (request, response) => {
    try {
        const carros = await carroSchema.find({})
        response.status(200).send(carros)
    } catch (error) {
        response.status(500).send({ mensagem: error.message })
    }
}

const cadastrar = async (request, response) => {
    try {
        const carroModelSchema = Object.assign({}, carroModel, request.body)
        const carroNovo = new carroSchema(carroModelSchema)
        const carro = await carroNovo.save()
        response.status(201).send(carro)
    } catch (error) {
        response.status(500).send({ mensagem: error.message })
    }
}

const atualizar = async (request, response) => {
    try {
        const id = request.params.id
        const carro = await carroSchema.findById(id)
        if (carro) {
            Object.keys(carroModel).forEach(key => {
                if (request.body.hasOwnProperty(key)) {
                    if (carro[key] instanceof Object && request.body[key] instanceof Object) {
                        Object.assign(carro[key], request.body[key]);
                    } else if (!(carro[key] instanceof Object)) {
                        carro[key] = request.body[key];
                    }
                }
            })
            const carroAtualizado = await carro.save()
            response.status(200).send(carroAtualizado)
        } else {
            response.status(404).send({ mensagem: `Não foi encontrado o carro de ID ${id}.` })
        }
    } catch (error) {
        response.status(500).send({ mensagem: error.message })
    }
}

const deletar = async (request, response) => {
    try {
        const id = request.params.id
        const carro = await carroSchema.findByIdAndDelete(id)
        if (carro) {
            response.status(200).send({ mensagem: `O carro de ID ${id} foi deletado.` })
        } else {
            response.status(404).send({ mensagem: `Não foi encontrado o carro de ID ${id}.` })
        }
    } catch(error) {
        response.status(500).send({ mensagem: error.message })
    }
}

module.exports = {
    obterTodos,
    cadastrar,
    atualizar,
    deletar
}
