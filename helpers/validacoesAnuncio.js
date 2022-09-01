function validarParametrosAnuncio(req, res, next) {
    const { status, aceita_animal,restricao_sexo,restricao_fumante,valor_aluguel } = req.body;
    if (typeof status != "number") {
        throw "O campo status deve ser um número";
    }
    if (typeof aceita_animal != "string") {
        throw "O campo aceita_animal deve ser uma string";
    }
    if (aceita_animal != "nao" && aceita_animal != "pequeno-porte" && aceita_animal != "grande-porte" && aceita_animal != "aceita") {
        throw "O campo aceita_animal deve ser uma das opções: nao, pequeno-porte, grande-porte, aceita";
    }
    if (typeof restricao_sexo != "string") {
        throw "O campo restricao_sexo deve ser uma string";
    }
    if (restricao_sexo != "nao-possui" && restricao_sexo != "apenas-mulher" && restricao_sexo != "apenas-homem") {
        throw "O campo restricao_sexo deve ser uma das opções: nao-possui, apenas-mulher, apenas-homem";
    }
    if (typeof restricao_fumante != "string") {
        throw "O campo restricao_fumante deve ser uma string";
    }
    if (restricao_fumante != "aceita-fumante" && restricao_fumante != "nao-aceita-fumante") {
        throw "O campo restricao_fumante deve ser uma das opções: aceita-fumante, nao-aceita-fumante";
    }
    if (typeof valor_aluguel != "number") {
        throw "O campo valor_aluguel deve ser um número";
    }
    if(valor_aluguel < 0){
        throw "O campo valor_aluguel deve ser um número positivo";
    }
}
module.exports = {validarParametrosAnuncio};