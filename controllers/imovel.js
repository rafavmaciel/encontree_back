const db = require("../infraestrutura/conexao");
const { fakeImoveis } = require("../faker/dadosFaker");
const { getImvovelId, postImovel, deleteImovel } = require("../services/imovel_services");
const { body, validationResult } = require("express-validator");
const {validarParametrosGet} = require("../helpers/validacoesUser");

module.exports = (app) => {
    app.get("/fakerImovel", (req, res) => {
        fakeImoveis();
        res.send("Bem vindo a pagina inicial");
    });

    app.get("/imovel", async (req, res) => {
        try {
            if (!req.query.id_imovel) {
                res.status(400).send("O id do imovel é obrigatorio");
            }
            if (req.query.id_imovel) {
                const imovel = await getImvovelId(req.query.id_imovel, "id");
                res.status(200).send(imovel);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post(
        "/imovel",
        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const imovel = req.body;
                const imovelRequest = await postImovel(imovel);
                res.send(imovelRequest);
            } catch (err) {
                res.status(400).send(err);
            }
        }
    );

    app.delete("/imovel",async (req, res) => {
        try {
            if (!req.query.id_imovel) {
                res.status(400).send("O id do imovel é obrigatorio");
            }
            if (req.query.id_imovel) {
                const id = req.query.id_imovel;
                const imovel = await deleteImovel(id, "id_imovel");
                res.send(imovel);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
