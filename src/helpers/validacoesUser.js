function validarParametrosGet(req, res, next) {
    if (!req.query.email && !req.query.id_usuario) {
        res.status(400).send("O email ou id de usuario é obrigatorio");
    }
}

module.exports = {validarParametrosGet};