const liwc_br = require('../liwc_br.js')

module.exports = {

    separarPalavras(frase) {

        // Remover \n e \r
        let vetorFinal = []
        let palavrasSeparadas = frase.split('\n')
        for (let i = 0; i < palavrasSeparadas.length; i++) {
            palavrasSeparadas[i] = palavrasSeparadas[i].split('\r')[0]
        }

        // Separa as palavras por espaço
        for (let i = 0; i < palavrasSeparadas.length; i++) {
            palavrasSeparadas[i] = palavrasSeparadas[i].split(' ')
        }

        // Une novamentes todas as palavras separadas dentro de um único vetor
        for (let i = 0; i < palavrasSeparadas.length; i++) {

            for (let j = 0; j < palavrasSeparadas[i].length; j++) {

                if (palavrasSeparadas[i][j] != '') {
                    vetorFinal.push(palavrasSeparadas[i][j])
                }

            }

        }

        return vetorFinal

    },

    tratarPalavra(palavra) {

        const charAntes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ç', 'á', 'à', 'ã', 'â', 'Á', 'À', 'Ã', 'Â', 'é', 'è', 'ê', 'É', 'È', 'Ê', 'í', 'ì', 'î', 'Í', 'Ì', 'Î', 'ó', 'ò', 'õ', 'ô', 'Ó', 'Ò', 'Õ', 'Ô', 'ú', 'ù', 'û', 'Ú', 'Ù', 'Û', '.', ',', ';', '!', '?']
        const charDepois = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'ç', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'e', 'e', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'u', 'u', '', '', '', '', '']

        for (let i = 0; i < palavra.length; i++) {

            for (let j = 0; j < charAntes.length; j++) {

                if (palavra[i] === charAntes[j]) {
                    /**
                     * As strings em JS são imutáveis, o que significa que não se pode
                     * fazer a atribuição: palavra[i] = charDepois[j]
                     */
                    palavra = palavra.replace(palavra[i], charDepois[j])
                }

            }

        }

        return palavra

    },

    calcularTokensPalavra(palavra) {

        //const analise = liwc.fromTokens([palavra])
        const analise = liwc_br.busca_individual(palavra)

        let objetoRetorno = {
            anx: 0,
            swear: 0,
            posemo: 0,
            negemo: 0
        }

        for (let i = 0; i < analise.length; i++) {
            if(analise[i] == 'posemo') objetoRetorno.posemo++
            if(analise[i] == 'negemo') objetoRetorno.negemo++
            if(analise[i] == 'swear') objetoRetorno.swear++
            if(analise[i] == 'anx') objetoRetorno.anx++
        }

        return objetoRetorno

    },

    calcularTokensTexto(texto) {

        let objetoRetorno = {
            numPalavras: texto.length,
            anx: 0,
            swear: 0,
            posemo: 0,
            negemo: 0
        }

        for (let i = 0; i < texto.length; i++) {
            const analisePalavra = this.calcularTokensPalavra(texto[i])
            
            if(analisePalavra.anx) objetoRetorno.anx++
            if(analisePalavra.swear) objetoRetorno.swear++
            if(analisePalavra.posemo) objetoRetorno.posemo++
            if(analisePalavra.negemo) objetoRetorno.negemo++
        }

        return objetoRetorno

    },

    gerarSaidaFinal(objetoRetornoTexto) {

        const tomPositivo = ((objetoRetornoTexto.posemo * 100) / objetoRetornoTexto.numPalavras).toFixed(2)
        const tomNegativo = ((objetoRetornoTexto.negemo * 100) / objetoRetornoTexto.numPalavras).toFixed(2)

        return `Saída: ${objetoRetornoTexto.numPalavras} palavras. ${objetoRetornoTexto.swear} Palavra ofensiva, ${objetoRetornoTexto.anx} palavras de ansiedade, tom geral negativo: ${tomNegativo}% versus ${tomPositivo}% positivo;`

    }

}
