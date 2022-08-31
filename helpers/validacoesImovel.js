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
}

module.exports = { validarParametrosimoveis };