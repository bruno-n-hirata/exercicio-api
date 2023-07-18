const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

exports.checkAuth = (request, response, next) => {
    const authHeader = request.get('authorization')

    if (!authHeader) {
        return response.status(401).send({ mensagem: "Sem autorização." })
    }
    
    const token = authHeader.split(' ')[1]
    if (!token) {
        return response.status(401).send({ mensagem: "Erro no token." })
    }
    
    try {
        jwt.verify(token, SECRET, (error) => {
            if (error) {
                return response.status(401).send({ mensagem: "Não autorizado." })
            }
            next()
        })
    } catch (error) {
        console.error(error)
    }
}
