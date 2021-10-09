/** ================================================================== */
/** ========================== Import Files ========================== */
/** ================================================================== */
const FileHelper = require('./src/classes/FileHelper')
const liwc = require('./src/lib/liwc.js');
const liwc_br = require('./src/lib/liwc_br.js');
const {js} = require("blade/lib/filters");
//const googleTranslate = require('google-translate')(apiKey, options);

/** ================================================================== */
/** =========================== Init Class =========================== */
/** ================================================================== */
let file_helper = new FileHelper()

/** ================================================================== */
/** ============================ Run Code ============================ */
/** ================================================================== */

/*
let busca = liwc_br.busca_individual('nao')
console.log(busca)

*/


let frase = file_helper.get_file('frases/frase.txt')

//let frase = 'amo muito jurandina jurandina VUCUVUCU'

let fraseArray = filter_frase(frase)

let resposta = {
    numWords: fraseArray.length,
    swear: 0,
    anx: 0,
    posemo: 0,
    negemo: 0,
    notFound: 0,
    notFoundWords: {}
}

// console.log(fraseArray)

fraseArray.forEach((palavra)=> {

    let emocoes = liwc_br.busca_individual(palavra)

    // console.log(palavra)
    // console.log(emocoes)

    if(emocoes.length){

        emocoes.forEach((emocao)=>{
            if(typeof resposta[emocao] !== 'undefined'){
                resposta[emocao] += 1
            }
        })

    }else{
        resposta['notFound'] += 1
        if(typeof resposta['notFoundWords'][palavra] === 'undefined'){
            resposta['notFoundWords'][palavra] = 1
        }else{
            resposta['notFoundWords'][palavra] += 1
        }
    }

})

 console.log(resposta)





/** ================================================================== */
/** ============================ Functions =========================== */
/** ================================================================== */

function filter_frase(frase){

    while(frase.includes('\n')){
        frase = frase.replace('\n',' ');
    }

    while (frase.includes(',')){
        frase = frase.replace(',',' ');
    }
    frase = frase.split(' ')

    let array_de_palavras = []

    frase.forEach((palavra, index, array)=>{
        if(palavra){

            palavra = tratar_caracteres_especiais(palavra)

            array_de_palavras.push(palavra.toLowerCase())
        }
    })

    return array_de_palavras
}

function tratar_caracteres_especiais(palavra){

    //return  palavra.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
    return  palavra.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')

}
