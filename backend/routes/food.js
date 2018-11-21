var express = require('express')
var router = express.Router()
var model = require('./model/food')

router.get('/', function(req, res) {
    // 관리자가 설정한 영상들만 나옴

    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.getFoodList()
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
        model.addFood(query, function(err, result) {
            if (err) throw err
            res.send(result)
        })
    }
})

router.delete('/', function(req, res) {
    var code = req.body.name
    var query = { code:code }

    if (global.database) {
        model.deleteFood(query, function(err, result) {
            if (err) throw err
            res.send(result)
        })
    }
})

module.exports = router;