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

module.exports = router;