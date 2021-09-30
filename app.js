/** ================================================================== */
/** ========================== Import Files ========================== */
/** ================================================================== */
const FileHelper = require('./src/classes/FileHelper')
const liwc = require('./src/lib/liwc.js');
const {js} = require("blade/lib/filters");
//const googleTranslate = require('google-translate')(apiKey, options);

/** ================================================================== */
/** =========================== Init Class =========================== */
/** ================================================================== */
let file_helper = new FileHelper()

/** ================================================================== */
/** ============================ Run Code ============================ */
/** ================================================================== */

let info = liwc.fromText("anxious");

let feelings = [];
for (let i in info) {
    if (info[i] === 1) {
        feelings.push(i);
    }
}

console.log(info)
console.log(feelings)



/*
let dicionario = file_helper.get_file('translate/dicionario_br.json')
dicionario = JSON.parse(dicionario);

console.log(dicionario)

*/



















/*
let referencia = file_helper.get_file('translate/dicionario_pt_br.txt')

//console.log(referencia)

while (referencia.includes('\n')){
    referencia = referencia.replace('\n',' ');
}

let referenciaArray = referencia.split(' ')
referenciaArray.pop()

let json_arr = {};

referenciaArray.forEach(function (data){
    data = data.split('\t')
    let values = []
    data.forEach(function (valores,index){
        if(index !== 0){
            values.push(valores)
        }
    })
    json_arr[data[0]] = values;
});

//json_arr.pop()

let json_string = JSON.stringify(json_arr);

//console.log(json_string)

file_helper.put_file('translate/dicionario_br.json', json_string)
*/

//
//
// let json_arr = {};

// referenciaArray.forEach(function (data){
//     data = data.split('\t')
//     json_arr[data[0]] = data[1];
// });
//
// let json_string = JSON.stringify(json_arr);
//
// console.log(json_string)

//file_helper.put_file('translate/.json', json_string)

//
// referencia_dados.pop()
//
// var json_arr = {};
// json_arr[] = referencia_dados
//
// let myJsonString = JSON.parse(referencia_dados)
//
//
// console.log(myJsonString)
//
//
// file_helper.put_file('translate/referencia.json', myJsonString)


//console.log(referenciaArray).split('\t')




// let frase = file_helper.get_file('frases/frase.txt')
// console.log(frase)
//
// while (frase.includes('\n')){
//     frase = frase.replace('\n',' ');
// }
//
// while (frase.includes(',')){
//     frase = frase.replace(',',' ');
// }
//
// let fraseArray = frase.split(' ')
//
// console.log(fraseArray)


/*let fraseArray = frase.split(' ')

console.log(fraseArray)*/


// googleTranslate.translate('My name is Alan', 'pt_br', function(err, translation) {
//     console.log(translation.translatedText);
//     // =>  Mi nombre es Brandon
// });








/*
let frase = file_helper.get_file('translate/referencia.txt')
console.log(frase)
while (frase.includes('\n')){
    frase = frase.replace('\n',' | ');
}

//frase = frase.replace(/ /g,'')

console.log(frase)*/


//arr = frase.split('|')


//console.log(arr)














/*let info = liwc.fromText("anxious");

let feelings = [];
for (let i in info) {
    if (info[i] === 1) {
        feelings.push(i);
    }
}

console.log(info)
console.log(feelings)*/

