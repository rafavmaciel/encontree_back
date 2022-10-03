const db = require("../infraestrutura/conexao");
const { fakeImoveis } = require("../faker/dadosFaker");
const { getImvovelId, postImovel, deleteImovel, putImovel,putImagemImovel} = require("../services/imovel_services");
const { body, validationResult } = require("express-validator");
const {validarParametrosimoveis} = require("../helpers/validacoesImovel");

module.exports = (app) => {
    app.get("/fakerImovel", (req, res) => {
        fakeImoveis();
        res.send("Bem vindo a pagina inicial");
    });

    app.get("/imovel", async (req, res) => {
        try {
            if (!req.query.id_imovel && !req.query.id_usuario) {
                res.status(400).send("O id do imovel ou id usuário obrigatorio");
            }
            if (req.query.id_imovel) {
                const imovel = await getImvovelId(req.query.id_imovel, "id");
                res.status(200).send(imovel);
            }
            if (req.query.id_usuario) {
                const imovel = await getImvovelId(req.query.id_usuario, "id_usuario");
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
                validarParametrosimoveis(req, res);
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

    app.put("/imovel-alt-imagem", async (req, res) => {
        try {
            if (!req.query.id_imovel) {
                res.status(400).send("O id do imovel é obrigatorio");
            }
            if (req.query.id_imovel) {
                const id = req.query.id_imovel;
                const {img_principal} = req.body;
                const imovelRequest = await putImagemImovel(img_principal, id);
                res.send({status:200, mensagem:imovelRequest});
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    //editar imovel
    app.put("/imovel", async (req, res) => {
        try {
            if (!req.query.id_imovel) {
                res.status(400).send("O id do imovel é obrigatorio");
            }
            if (req.query.id_imovel) {
                const id = req.query.id_imovel;
                const imovel = req.body;
                const imovelRequest = await putImovel(imovel, id);
                console.log(imovelRequest);
                res.send({status:200, mensagem:imovelRequest})
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });
};
