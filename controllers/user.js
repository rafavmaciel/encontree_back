const db = require("../infraestrutura/conexao");
const { fakerUser } = require("../faker/dadosFaker");
const { getUserById, postUser,deleteUser, getImoveisUsuario } = require("../services/user_services");
const { body, validationResult } = require("express-validator");
const {validarParametrosGet} = require("../helpers/validacoesUser");

module.exports = (app) => {
    app.get("/faker", (req, res) => {
        fakerUser();
        res.send("Bem vindo a pagina inicial");
    });

    app.get("/user", async (req, res) => {
        try {
            if (!req.query.email && !req.query.id_usuario) {
                res.status(400).send("O email ou id de usuario é obrigatorio");
            }
            if (req.query.email) {
                const user = await getUserById(req.query.email, "email");
                res.status(200).send(user);
            }
            if (req.query.id_usuario) {
                const id = parseInt(req.query.id);
                const user = await getUserById(req.query.id_usuario, "id");
                res.status(200).send(user);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get( "/user-imvoveis", async (req, res) => {
        try {
            if (!req.query.id_usuario) {
                res.status(400).send("O id do usuario é obrigatorio");
            }
            if (req.query.id_usuario) {
                const imoveis = await getImoveisUsuario(req.query.id_usuario);
                res.status(200).send(imoveis);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post(
        "/user",
        [
            body("nome").isLength({ min: 5 }),
            body("email").isEmail(),
            body("sexo").isLength({ min: 1, max: 1 }),
            body("telefone").isLength({ min: 11, max: 11 }),
            body("cpf").isLength({ min: 11, max: 11 }),
            body("idade").isLength({ min: 2, max: 3 }),
        ],
        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const usuario = req.body;
                const userRequest = await postUser(usuario);
                res.send(userRequest);
            } catch (err) {
                res.status(400).send(err);
            }
        }
    );

    app.delete("/user",async (req, res) => {
        try {

            if (!req.query.email && !req.query.id_usuario) {
                res.status(400).send("O email ou id de usuario é obrigatorio");
            }
            if (req.query.email) {
                const email = req.query.email;
                const user = await deleteUser(email, "email");
                res.send(user);
            }
            if (req.query.id_usuario) {
                const id = req.query.id_usuario;
                const user = await deleteUser(id, "id_usuario");
                res.send(user);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
