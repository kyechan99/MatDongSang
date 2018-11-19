var express = require('express')
var router = express.Router()
var model = require('./model/user')

// 로그인
// ($POST) /user/auth
//  - SEND : id, pw
router.post('/auth', function(req, res) {
    var id = req.body.id
    var pw = req.body.pw
    var query = { id: id, pw: pw }

    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.login(query)
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})


// 회원가입
// ($POST) /user
//  - SEND : id, pw, name, email, cp
router.post('/', function(req, res) {
    var id = req.body.id
    var pw = req.body.pw
    var name = req.body.name
    var email = req.body.email
    var cp = req.body.cp
    var query = { id:id, pw:pw, name:name, email:email, cp:cp }

    
    if (global.database) {
        model.addUser(query, function(err, result) {
            if (err) throw err
            res.send(result)
        })
    }
})


// 회원 정보 수정
// ($POST) /user
//  - SEND : id, pw, update(변경점)
router.put('/', function(req, res) {
    var id = req.body.id
    var pw = req.body.pw

    console.log(req.body)

    // var repw = req.body.repw
    // var query = { id:id, pw:pw }
    // var update = { $set: { pw:repw }}

    // if (global.database) {
    //     model.updateProfile(query, update, function(err, result) {
    //         if (err) throw err

    //         // result 형태
    //         // https://docs.mongodb.com/manual/reference/command/update/#update-command-output
    //         res.send(result)
    //     })
    // }
})

// 회원 탈퇴
router.delete('/', function(req, res) {
    var id = req.body.id
    var pw = req.body.pw
    var query = { id: id, pw: pw }

    if (global.database) {
        model.deleteUser(query, function(err, result) {
            if (err) throw err
            res.send(result)
        })
    }
})


// 유저 정보 가져오기
router.get('/:id', function(req, res) {
    var id = req.params.id
    var query = { id: id }

    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.getUser(query)
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})

module.exports = router;