require("dotenv-safe").config()

const express = require("express")
const database = require("./database/mongoConfig")
const router = require("../src/routes/carroRoutes")

database.connect()

const app = express()
app.use(express.json())
app.use("/api", router)

module.exports = app
