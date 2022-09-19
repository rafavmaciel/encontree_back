const db = require("../infraestrutura/conexao");
const { fakeAnuncios } = require("../faker/dadosFaker");
const { getAnuncio, postAnuncio, alterarStatusAnuncio, buscaPersonalizadaAnuncio} = require("../services/anuncio_services");
const { body, validationResult } = require("express-validator");
const {validarParametrosAnuncio} = require("../helpers/validacoesAnuncio");

module.exports = (app) => {
    app.get("/fakerAnuncio", (req, res) => {
        res.send("seed feito com sucesso");
        fakeAnuncios();
    });

    app.get("/anuncio", async (req, res) => {
        try {
            if (!req.query.id_anuncio && !req.query.id_imovel && !req.query.id_usuario) {
                res.status(400).send("O id do anuncio, imovel, ou usuário é obrigatorio");
            }
            if (req.query.id_anuncio) {
                const anuncio = await getAnuncio(req.query.id_anuncio, "id");
                res.status(200).send(anuncio);
            }
            if (req.query.id_imovel) {
                const anuncio = await getAnuncio(req.query.id_imovel, "id_imovel");
                res.status(200).send(anuncio);
            }
            if (req.query.id_usuario) {
                const anuncio = await getAnuncio(req.query.id_usuario, "id_usuario");
                res.status(200).send(anuncio);
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.post(
        "/anuncio",
        [
            body("status").isLength({ min: 1, max: 1 }),
        ],
        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const anuncio = req.body;
                validarParametrosAnuncio(req, res);
                const anuncioRequest = await postAnuncio(anuncio);
                res.send(anuncioRequest);
            } catch (err) {
                res.status(400).send(err);
            }
        }
    );

    // alterar status do anuncio
    app.put("/anuncio-status", async (req, res) => {
        try {
            if (!req.query.id_anuncio) {
                res.status(400).send("O id do anuncio é obrigatorio");
            }
            if (req.query.id_anuncio) {
                const id = req.query.id_anuncio;
                const anuncio = await alterarStatusAnuncio(id);
                res.send({"msg":"Status alterado com sucesso" , "status": anuncio});
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
    );
    
    //buscas de anuncios personalisadas
    app.post("/anuncio-busca-personalizada", async (req, res) => {
        try {
            const {parametros} = req.body;
            const anuncios = await buscaPersonalizadaAnuncio(parametros);
            res.send(anuncios);
        } catch (err) {
            res.status(500).send(err);
        }
    });
}