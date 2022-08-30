const db = require("../infraestrutura/conexao");

async function getImvovelId(data, tipo) {
    try {
        if (tipo == "id") {
            const imovel = await db("imovel").select("*").where({ id_imovel: data });
            return imovel;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function postImovel(usuario) {
    try {
        const user = await db("usuario").insert(usuario);
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function deleteImovel(data, tipo) {
    try {
        if (tipo == "email") {
            const user = await db("usuario").delete().where({ email: data });
            return "Usuario deletado com sucesso";
        }
        if (tipo == "id") {
            const user = await db("usuario").delete().where({ id_usuario: data });
            return "Usuario deletado com sucesso";
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { getImvovelId, postImovel, deleteImovel };
