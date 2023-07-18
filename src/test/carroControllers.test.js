const app = require("../app")
const carroSchema = require("../models/carroSchema")
const request = require("supertest")
const mongoose = require("mongoose")

describe('carroControllers', () => {

    let carroId, token
    const carroMock = {
        "marca": "Marca",
        "modelo": "Modelo",
        "ano": 2023
    }

    beforeAll(async() => {
        const email = "admin@email.com"
        const senha = "admin"

        await request(app)
            .post("/api/usuario")
            .send({ nome: "Admin", email, password: senha });

        const response = await request(app)
            .post("/api/login")
            .send({ email, password: senha });

        token = response.body.token;

        const novoCarro = new carroSchema(carroMock)
        await novoCarro.save()
        carroMock.id = novoCarro._id
    })

    afterAll(async() => {
        if (carroId) {
            await request(app)
                .delete("/api/carro/" + carroId)
                .set("Authorization", "Bearer " + token)
                .expect(200)
        }

        await mongoose.connection.close()
    })

    test('GET /api/carro', (done) => {
        request(app)
            .get("/api/carro")
            .expect(200)
            .expect(response => {
                expect(response.body.mensagem).toBe("Todos os carros.")
            })
            .end(error => {
                if (error) {
                    return done(error)
                }
                return done()
            })
    })

    test('POST /api/carro', (done) => {
        const carroBody = {
            "marca": "Marca",
            "modelo": "Modelo",
            "ano": 2023
        }

        request(app)
            .post("/api/carro")
            .send(carroBody)
            .expect(201)
            .expect(response => {
                expect(response.body.mensagem).toBe("Carro cadastrado.")
                carroId = response.body.carro._id
            })
            .end(error => {
                if (error) {
                    return done(error)
                }
                return done()
            })
    })

    test('PATCH /api/carro/:id', (done) => {
        const carroPatchBody = {
            "marca": "Marca 2",
            "modelo": "Modelo 2",
            "ano": 2022
        }

        request(app)
            .patch("/api/carro/" + carroMock.id)
            .send(carroPatchBody)
            .expect(200)
            .expect(response => {
                expect(response.body.mensagem).toBe("Carro atualizado.")
            })
            .end(error => {
                if (error) {
                    return done(error)
                }
                return done()
            })
    })

    test('DELETE /api/carro/:id', (done) => {
        request(app)
            .delete("/api/carro/" + carroMock.id)
            .set("Authorization", "Bearer " + token)
            .expect(200)
            .expect(response => {
                expect(response.body.mensagem).toBe(`O carro de ID ${carroMock.id} foi deletado.`)
            })
            .end(error => {
                if (error) {
                    return done(error)
                }
                return done()
            })
    })
});
