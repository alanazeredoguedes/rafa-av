var express = require('express')
var routerMain  = express.Router()

/** Custom MiddleWare */
routerMain.use( (req,res,next) => {
    //console.log('I am a Router custom middleware')
    next()
})

routerMain.get('/', (req, res, next)=>{

    res.render('index.twig',{
        message: 'Teste Parametros Twig'
    })
    //next(new Error('Curstom Error'))
    //res.send('Home')
})


// Export Router
module.exports = routerMain
