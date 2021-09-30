/** ================================================================== */
/** ========================== Import Files ========================== */
/** ================================================================== */
const FileHelper = require('./src/classes/FileHelper')
const liwc = require('./src/lib/liwc.js');
//const googleTranslate = require('google-translate')(apiKey, options);

/** ================================================================== */
/** =========================== Init Class =========================== */
/** ================================================================== */
let file_helper = new FileHelper()

/** ================================================================== */
/** ============================ Run Code ============================ */
/** ================================================================== */

let frase = file_helper.get_file('frases/frase.txt')
console.log(frase)

while (frase.includes('\n')){
    frase = frase.replace('\n',' ');
}

while (frase.includes(',')){
    frase = frase.replace(',',' ');
}

let fraseArray = frase.split(' ')

console.log(fraseArray)


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

