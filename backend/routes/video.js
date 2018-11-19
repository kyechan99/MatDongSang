var express = require('express')
var router = express.Router()
var model = require('./model/video')

router.get('/recommend', function(req, res) {
    // 관리자가 설정한 영상들만 나옴

    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.getRecommendVideo()
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})

router.get('/newest', function(req, res) {
    // 개발자가 등록한 시간 순으로 나옴
    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.getSortVideo({date:-1})
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})

router.get('/hot', function(req, res) {
    // 맛동상 내 플레이 수 순으로 나옴
    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.getSortVideo({views:-1})
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})

// 좋아요 눌렀을떄,
router.post('/likes', function(req, res) {
    var id = req.body.id
    var vid = req.body.vid
    var query = { id:id, vid:vid }

    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.postLike(query)
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})

// 좋아요 해제했을떄,
router.delete('/likes', function(req, res) {
    var id = req.body.id
    var vid = req.body.vid
    var query = { id:id, vid:vid }

    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.delLike(query)
        }).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})

router.get('/search/:vid', function(req, res) {
    if (global.database) {
        
    }
})

// 동영상 정보 가져오기
// ($GET) /v/asdfasdfasdf (youtube code)
router.get('/:vid', function(req, res) {
    var vid = req.params.vid
    var query = { vid: vid }

    if (global.database) {
        model.databaseCheck().then(function(result) {
            return model.getVideo(query)
        }).then(function(result) {
            res.send(result)
            var update = {$set: {views: (result[0].views + 1) } }
            return model.incViews(query, update)
        }).catch(function(err) {
            if (err) throw err
        }).then(function(result) {
            console.log(result)
        }).catch(function(err) {
            if (err) throw err
        })
    }
})


module.exports = router;