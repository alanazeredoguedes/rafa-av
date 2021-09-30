var express = require('express')
var routerUser  = express.Router()

routerUser.get('/', (req, res)=>{
    res.json({
        user:  'all'
    })
})

routerUser.get('/get/:id', (req, res)=>{
    res.json({
        params  : req.params,
        host    : req.hostname,
        headers : req.headers,

    })
})

routerUser.post('/body', (req,res)=>{
    res.json(req.body)
})

routerUser.get('/res', (req,res)=>{
    res.send('teste')
})

// Export Router
module.exports = routerUser
