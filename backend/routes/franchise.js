var express = require('express')
var router = express.Router()
var model = require('./model/franchise')

router.get('/', function(req, res) {
    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.getFranchiseList()
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})

router.post('/', function(req, res) {  
    var name = req.body.name
    var code = req.body.name
    var query = { name:name, code:code }

    if (global.database) {
        model.addFranchise(query, function(err, result) {
            if (err) throw err
            res.send(result)
        })
    }
})

router.delete('/', function(req, res) {
    var code = req.body.name
    var query = { code:code }

    if (global.database) {
        model.deleteFranchise(query, function(err, result) {
            if (err) throw err
            res.send(result)
        })
    }
})

module.exports = router;