const db = require("../infraestrutura/conexao");

async function getUserById(data, tipo) {
    try {
        if (tipo == "email") {
            const user = await db("usuario").select("*").where({ email: data });
            return user;
        }
        if (tipo == "id") {
            const user = await db("usuario").select("*").where({ id_usuario: data });
            return user;
        }
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function postUser(usuario) {
    try {
        const user = await db("usuario").insert(usuario);
        return user;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

async function deleteUser(data, tipo) {
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

module.exports = { getUserById, postUser, deleteUser };
