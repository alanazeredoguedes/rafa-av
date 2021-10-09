const fs = require('fs');

let referenciaPath = './src/lib/translate/referencia.json'
let idiomaPath = './src/lib/translate/dicionario_br.json'

const referencia = JSON.parse( fs.readFileSync( referenciaPath, 'utf8') );

const idioma = JSON.parse( fs.readFileSync( idiomaPath, 'utf8') );

function busca_individual(busca){

    let data = []

    for (let key in idioma) {
        let key_tratada = tratar_caracteres_especiais(key)
        if(key_tratada === busca ){
            //console.log(key)
            data = idioma[key]
        }
    }

    let sentimentos = []

    if(data){
        data.forEach((element) => {
            sentimentos.push(referencia[element])
            //sentimentos.push(referencia[element+'*'])
        });
    }

    return sentimentos
}

function tratar_caracteres_especiais(palavra){

    return  palavra.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')

}

module.exports = {
    busca_individual: busca_individual,
};

//console.log( busca_individual('merda') )
