# Documentação

### Retorna todos os carros cadastrados

```sh
[GET] /api/carro
```

- Respostas

> 200 - OK
```json
[
	{
		"_id": "64b5ce8881593c79ef01d9bd",
		"marca": "Marca",
		"modelo": "Modelo",
		"ano": 2023,
		"createdAt": "2023-07-17T23:27:50.707Z",
		"__v": 0
	}
]
```

---

### Cadastra novo carro

```sh
[POST] /api/carro
```

- Parâmetros

> body (obrigatório) - Objeto carro
```json
{
	"marca": "Marca",
	"modelo": "Modelo",
	"ano": 2023
}
```

- Respostas

> 201 - Created
```json
{
	"marca": "Marca",
	"modelo": "Modelo",
	"ano": 2023,
	"createdAt": "2023-07-17T23:30:21.729Z",
	"_id": "64b5cf1b562995bc89ed6ad2",
	"__v": 0
}
```

---

### Atualiza cadastro de carro

```sh
[PATCH] /api/carro/{id}
```

- Parâmetros

> id (obrigatório) - ID do carro

> body (obrigatório) - Objeto carro
```json
{
	"marca": "Marca",
	"modelo": "Modelo",
	"ano": 2023
}
```

- Respostas

> 200 - OK
```json
{
	"marca": "Marca",
	"modelo": "Modelo",
	"ano": 2023,
	"createdAt": "2023-07-17T23:30:21.729Z",
	"_id": "64b5cf1b562995bc89ed6ad2",
	"__v": 0
}
```

> 404 - Not Found
```json
{
	"mensagem": "Não foi encontrado o carro de ID 64b5c25e89bd38a5617d44a7."
}
```

---

### Remove cadastro de carro

```sh
[DELETE] /api/carro/{id}
```

- Parâmetros

> id (obrigatório) - ID do carro

> authorization (obrigatório) - Bearer Token

- Respostas

> 200 - OK
```json
{
	"mensagem": "O carro de ID 64b5ce8881593c79ef01d9bd foi deletado."
}
```

> 401 - Unauthorized
```json
{
	"mensagem": "Sem autorização."
}
```

> 404 - Not Found
```json
{
	"mensagem": "Não foi encontrado o carro de ID 64b5c25e89bd38a5617d44a7."
}
```

---

### Retorna todos os usuários cadastrados

```sh
[GET] /api/usuario
```

- Respostas

> 200 - OK
```json
[
	{
		"_id": "64b5c9d882c73c6a7ac3b019",
		"nome": "Nome",
		"email": "email@email.com",
		"password": "$2b$10$MaLLUZ8xx/5KIsJJxQrvQOtu37/zlPiF7cx.eAZX3CK3Oj2FrU7Ae",
		"createdAt": "2023-07-17T23:07:54.661Z",
		"__v": 0
	}
]
```

---

### Cadastra novo usuário

```sh
[POST] /api/usuário
```

- Parâmetros

> body (obrigatório) - Objeto usuário
```json
{
	"nome": "Nome",
	"email": "email@email.com",
	"password": "Senha"
}
```

- Respostas

> 201 - Created
```json
{
	"mensagem": "Usuário criado com sucesso.",
	"usuario": {
		"nome": "Nome",
		"email": "email@email.com",
		"password": "$2b$10$MaLLUZ8xx/5KIsJJxQrvQOtu37/zlPiF7cx.eAZX3CK3Oj2FrU7Ae",
		"createdAt": "2023-07-17T23:07:54.661Z",
		"_id": "64b5c9d882c73c6a7ac3b019",
		"__v": 0
	}
}
```

> 409 - Conflict
```json
{
	"mensagem": "Email já cadastrado."
}
```

---

### Login

```sh
[POST] /api/login
```

- Parâmetros

> body (obrigatório) - Objeto login
```json
{
	"email": "email@email.com",
	"password": "Senha"
}
```

- Respostas

> 200 - OK
```json
{
	"mensagem": "Login efetuado com sucesso.",
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnJ1bm8iLCJpYXQiOjE2ODk2MzY2MzF9.ENmceEbBNAVuwnWI9X71edncHhLEFrQuyqpyCk26-ek"
}
```

> 401 - Unauthorized
```json
{
	"mensagem": "Senha inválida."
}
```

> 404 - Not Found
```json
{
	"mensagem": "Usuário email@email.com não encontrado."
}
```

## Arquitetura do projeto

```
📂 API
├─ 📂 src
│ ├─ 📂 controllers
│ │ └─ authControllers.js
│ │ └─ carroControllers.js
│ │ └─ usuarioControllers.js
│ ├─ 📂 database
│ │ └─ mongoConfig.js
│ ├─ 📂 middlewares
│ │ └─ auth.js
│ ├─ 📂 models
│ │ └─ carroModel.js
│ │ └─ carroSchema.js
│ │ └─ usuarioSchema.js
│ ├─ 📂 routes
│ │ └─ carroRoutes.js
│ └─ app.js
├─ .env
├─ .env.example
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ README.md
└─ server.js
```

## Dependências

| Dependência  | Versão  |
| ------------ | ------- |
| bcrypt       | ^5.1.0  |
| dotenv-safe  | ^8.2.0  |
| express      | ^4.18.2 |
| jsonwebtoken | ^9.0.1  |
| mongoose     | ^7.3.4  |
