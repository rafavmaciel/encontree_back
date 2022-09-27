function validarParametrosGet(req, res, next) {
    if (!req.query.email && !req.query.id_usuario) {
        res.status(400).send("O email ou id de usuario é obrigatorio");
    }
}

function validarParametrosUsuario(req, res, next) {
    if(req.body.nome){
        if (req.body.nome.length < 5) {
            throw "O nome deve ter no minimo 5 caracteres"
        }
    }
    if(req.body.cpf){
        if (req.body.cpf.length != 11) {
            throw "O cpf deve ter 11 caracteres"
        }
    }
    if(req.body.telefone){
        if (req.body.telefone.length != 11) {
            throw "O telefone deve ter 11 caracteres"
        }
    }
    if(req.body.idade){
        if (req.body.idade < 18) {
            throw "A idade deve ser maior que 18"
        }
    }

}

module.exports = {validarParametrosGet,  validarParametrosUsuario};