function validarParametrosimoveis(req, res, next) {
    if (req.body.quantidade_quartos){
        if (req.body.quantidade_quartos < 1 || req.body.quantidade_quartos > 10) {
            throw "A quantidade de quartos deve ser maior que 0 ou menor que 10"
        }
    }
    if (req.body.quantidade_banheiros){
        if (req.body.quantidade_banheiros < 1 || req.body.quantidade_banheiros > 10) {
            throw "A quantidade de banheiros deve ser maior que 0 ou menor que 10"
        }
    }
    if (typeof req.body.garagem_vaga != "boolean") {
        throw "O campo garagem_vaga deve ser booleano"
    }
    if (req.body.rua){
        if (req.body.rua.length < 5) {
            throw "A rua deve ter no minimo 5 caracteres"
        }
    }
    if (req.body.numero){
        if (req.body.numero < 0) {
            throw "O numero deve ser maior que 0"
        }
    }
    if (req.body.bairro){
        if (req.body.bairro.length < 4) {
            throw "O bairro deve ter no minimo 4 caracteres"
        }
    }
    if (req.body.cidade){
        if (req.body.cidade.length < 4) {
            throw "A cidade deve ter no minimo 4 caracteres"
        }
    }
    if (req.body.cep){
        if (req.body.cep.length != 8) {
            throw "O cep deve ter 8 caracteres"
        }
    }

}

module.exports = { validarParametrosimoveis };