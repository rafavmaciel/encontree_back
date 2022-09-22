const db = require("../infraestrutura/conexao");

async function getImvovelId(data, tipo) {
    try {
        if (tipo == "id") {
            const imovel = await db("imovel").select("*").where({ id_imovel: data });
            return imovel;
        }
        if (tipo == "id_usuario") {
            const imovel = await db("imovel").select("*").where({ usuario_id_usuario: data });
            return imovel;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function postImovel(imovel) {
    try {
        const data = await db("imovel").insert(imovel);
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function deleteImovel(data, tipo) {
    try {
        if (tipo == "id_imovel") {
            const imovel = await db("imovel").delete().where({ id_imovel: data });
            return "Imovel deletado com sucesso";
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { getImvovelId, postImovel, deleteImovel };
