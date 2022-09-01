const { faker } = require("@faker-js/faker");
const fakerBr = require("faker-br");
const db = require("../infraestrutura/conexao");

function fakerUser() {
    const listaIds = [];
    for (let i = 0; i < 100; i++) {
        const usuario = {
            nome: faker.name.findName(),
            email: faker.internet.email(),
            sexo: faker.name.gender(true),
            descricao_usuario: faker.lorem.paragraph(),
            telefone: faker.phone.number("###########"),
            cpf: fakerBr.br.cpf(),
            idade: faker.date.birthdate({ min: 18, max: 100, mode: "age" }).getDate(),
        };
        if (usuario.sexo == "male") {
            usuario.sexo = 0;
        } else {
            usuario.sexo = 1;
        }

        db("usuario")
            .insert(usuario)
            .then((res) => {
                //console.log( 'resposta: ' + res[0])
                fakeImoveis(res[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    //console.log(listaIds)
}

function fakeImoveis(id) {
    for (let i = 0; i < 3; i++) {
        const imovel = {
            rua: faker.address.streetName(),
            bairro: faker.address.cityName(),
            numero: faker.address.buildingNumber(),
            cidade: faker.address.city(),
            estado: faker.address.stateAbbr(),
            cep: faker.address.zipCode(),
            quantidade_quartos: faker.random.numeric(1),
            quantidade_banheiros: faker.random.numeric(1),
            garagem_vaga: faker.datatype.boolean(),
            tipo_imovel: faker.random.alpha(7),
            usuario_id_usuario: id,
        };

        db("imovel")
            .insert(imovel)
            .then((res) => {
                if (i==2) {
                fakeAnuncios(res[0], id);
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }
}

function fakeAnuncios(id_imovel, id_usuario) {
    console.log(id_imovel, id_usuario);
    const anuncio = {
        status: faker.datatype.boolean(),
        aceita_animal: faker.helpers.arrayElements(["nao", "pequeno-porte", "grande-porte", "aceita"]),
        descricao_anuncio: faker.lorem.paragraph(),
        restricao_sexo: faker.helpers.arrayElements(["nao-possui", "apenas-mulher", "apenas-homem"]),
        restricao_fumante: faker.helpers.arrayElements(["aceita-fumante", "nao-aceita-fumante"]),
        valor_aluguel: faker.random.numeric(5),
        imovel_id_imovel: id_imovel,
        imovel_usuario_id_usuario: id_usuario,
    };
    db("anuncio")
        .insert(anuncio)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err.sqlMessage);
        });
}

module.exports = { fakerUser, fakeImoveis, fakeAnuncios };
