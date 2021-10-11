#!/usr/bin/env node
const liwcFunctions = require('./funcs')
const fs = require('fs');

// Le o arquivo com o texto a ser analisado
let loadFile = fs.readFileSync('../frases/frase.txt', 'utf-8')

// Separa cada palavra do texto
let palavrasSeparadas = liwcFunctions.separarPalavras(loadFile)
//console.log(palavrasSeparadas)

// Trata(tokezina?) cada palavra do texto, deixando tudo em minúsculo e sem acento.
for (let i = 0; i < palavrasSeparadas.length; i++) {
    palavrasSeparadas[i] = liwcFunctions.tratarPalavra(palavrasSeparadas[i]);
}
//console.log(palavrasSeparadas)

const retornoAnaliseTexto = liwcFunctions.calcularTokensTexto(palavrasSeparadas)

console.log(liwcFunctions.gerarSaidaFinal(retornoAnaliseTexto))
