const fs = require('fs');

/** Importa o liwc versão BR */
const liwc_br = require("../liwc/liwc_br.js");

/** Classe que limpa e tokeniza a string */
class StringReader {

    constructor(text) {
        this._text = text;
        this._tokens = [];
        this.clearString()
    }

    get tokens() {
        return this._tokens;
    }

    set tokens(value) {
        this._tokens.push(value);
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }

    clearString(){
        let frase = this._text;

        while(frase.includes('\n')){
            frase = frase.replace('\n',' ');
        }

        while (frase.includes(',')){
            frase = frase.replace(',',' ');
        }

        frase = frase.split(' ')

        frase.forEach((palavra)=>{
            if(palavra){
                this._tokens.push(palavra.toLowerCase())
            }
        })
    }

}

/** Classe que trata tokens e gera resposta */
class TokenManipulator {

    get negativo() {
        return this._negativo;
    }

    set negativo(value) {
        this._negativo = value;
    }

    get tomNegativo() {
        return this._tomNegativo;
    }

    set tomNegativo(value) {
        this._tomNegativo = value;
    }

    get tomPositivo() {
        return this._tomPositivo;
    }

    set tomPositivo(value) {
        this._tomPositivo = value;
    }

    get positivo() {
        return this._positivo;
    }

    set positivo(value) {
        this._positivo = value;
    }

    get numeroPalavras() {
        return this._numeroPalavras;
    }

    set numeroPalavras(value) {
        this._numeroPalavras = value;
    }

    get ofensivo() {
        return this._ofensivo;
    }

    set ofensivo(value) {
        this._ofensivo = value;
    }

    get tokens() {
        return this._tokens;
    }

    set tokens(value) {
        this._tokens = value;
    }

    get ansiedade() {
        return this._ansiedade;
    }

    set ansiedade(value) {
        this._ansiedade = value;
    }

    constructor(tokens) {
        this._numeroPalavras = tokens.length
        this._ofensivo = 0 // swear
        this._ansiedade = 0 // anx
        this._positivo = 0 // posemo
        this._negativo = 0 // negemo
        this._tomNegativo = 0.0
        this._tomPositivo = 0.0
        this._tokens = tokens;
        this.run()
    }

    calcularTokensPalavra(){

        this._tokens.forEach((palavra)=>{

            const analise = liwc_br.busca_individual(palavra)

            analise.forEach((value)=>{
                if(value === 'posemo') this._positivo++
                if(value === 'negemo') this._negativo++
                if(value === 'swear') this._ofensivo++
                if(value === 'anx') this._ansiedade++
            })

        })

        this._tomPositivo = ((this._positivo * 100) / this._numeroPalavras).toFixed(2)
        this._tomNegativo = ((this._negativo * 100) / this._numeroPalavras).toFixed(2)
    }

    exibirResposta(){
        let reposta = `Saída: ${this._numeroPalavras} palavras. ${this._ofensivo} Palavra ofensiva, ${this._ansiedade} palavras de ansiedade, tom geral negativo: ${this._tomNegativo}% versus ${this._tomPositivo}% positivo;`
        console.log(reposta)
    }

    run(){
        this.calcularTokensPalavra()
        this.exibirResposta()
    }

}

/** Classe que trata tokens com caracteres especiais e gera resposta */
class SpecialTokenManipulator extends TokenManipulator{

    constructor(tokens) {
        super(tokens);
    }

    calcularTokensPalavra(){

        this.tokens.forEach((palavra)=>{

            const analise = liwc_br.busca_individual(this.tratar_caracteres_especiais(palavra))

            analise.forEach((value)=>{
                if(value === 'posemo') this.positivo++
                if(value === 'negemo') this.negativo++
                if(value === 'swear') this.ofensivo++
                if(value === 'anx') this.ansiedade++
            })

        })

        this.tomPositivo = ((this.positivo * 100) / this.numeroPalavras).toFixed(2)
        this.tomNegativo = ((this.negativo * 100) / this.numeroPalavras).toFixed(2)
    }

    tratar_caracteres_especiais(palavra){
        //return  palavra.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
        return  palavra.normalize('NFD').replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
    }

}

/** Faz Leitura do Texto Proposto na tarefa */
let text = fs.readFileSync('../frases/frase.txt', 'utf-8')

/** Chamada da Classe StringReader */
let stringReader = new StringReader(text)

/** Chamada da Classe TokenManipulator */
//let tokenManipulator = new TokenManipulator(stringReader.tokens)

/** Chamada da Classe SpecialTokenManipulator */
let specialTokenManipulator = new SpecialTokenManipulator(stringReader.tokens)

























