const liwc_br = require('../liwc/liwc_br')
const fs = require('fs')

// Le o arquivo com o texto a ser analisado
const arquivoComTexto = fs.readFileSync('../frases/frase.txt', 'utf-8')

const objetoResposta = {
    numPalavras: 0,
    anx: 0,
    swear: 0,
    posemo: 0,
    negemo: 0
}

const tratamento = arquivoComTexto.normalize('NFD')
                                    .replace(/[\u0300-\u036f]/g, "")
                                    .replace(/(\r\n|\r|\n|,)/g, ' ')
                                    .replace(/,|!|\?/g, '')
                                    .split(' ')
                                    .filter(palavra => palavra != '' && palavra != '-')
                                    .map(palavra => palavra.toLowerCase())
                                    .reduce((acumulador, valorAtual, index, array) => {

                                        const analise = liwc_br.busca_individual(valorAtual)

                                        objetoResposta.numPalavras += 1
                                        objetoResposta.posemo += analise.includes('posemo') ? 1 : 0
                                        objetoResposta.negemo += analise.includes('negemo') ? 1 : 0
                                        objetoResposta.swear += analise.includes('swear') ? 1 : 0
                                        objetoResposta.anx += analise.includes('anx') ? 1 : 0

                                        return objetoResposta

                                    })

const tomPositivo = ((objetoResposta.posemo * 100) / objetoResposta.numPalavras).toFixed(2)
const tomNegativo = ((objetoResposta.negemo * 100) / objetoResposta.numPalavras).toFixed(2)

console.log(`Saída: ${objetoResposta.numPalavras} palavras. ${objetoResposta.swear} Palavra ofensiva, ${objetoResposta.anx} palavras de ansiedade, tom geral negativo: ${tomNegativo}% versus ${tomPositivo}% positivo;`)