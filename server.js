const app = require("./src/app")

app.listen(process.env.PORT, () => console.log(`Server http://localhost:${process.env.PORT}`))
