const db = require("../infraestrutura/conexao");

async function getAnuncio(data, tipo) {
    try {
        if (tipo == "id") {
            const anuncio = await db("anuncio").select("*").where({ id_anuncio: data });
            return anuncio;
        }

        if (tipo == "id_imovel") {
            const anuncio = await db("anuncio").select("*").where({ imovel_id_imovel: data });
            return anuncio;
        }

        if (tipo == "id_usuario") {
            const anuncio = await db("anuncio").select("*").where({ imovel_usuario_id_usuario: data });
            return anuncio;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function postAnuncio(anuncio) {
    try {
        const data = await db("anuncio").insert(anuncio);
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function alterarStatusAnuncio(data) {
    try {
        let statusAtual = await db("anuncio").select("status").where({ id_anuncio: data});
        statusAtual = statusAtual[0].status;
        statusAtual == 0 ? statusAtual = 1 : statusAtual = 0;
        let anuncio = await db("anuncio").update({ status: statusAtual }).where({ id_anuncio: data });
        return anuncio;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
module.exports = { getAnuncio, postAnuncio , alterarStatusAnuncio};