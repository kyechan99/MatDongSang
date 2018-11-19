
// 컬렉션을 사용하기 이전에 컬렉션이나 데이터가 존재 하는지 안전 확인
exports.databaseCheck = function() {    
    return new Promise(function (resolve, reject) {
        var videos = global.database.collection('video')
        videos.countDocuments({}, {}, function(err, result) {
            if (err) {
                reject(err)
                return
            }
            if (result > 0) { 
                resolve(result)
            }
        })
    })
}

exports.getVideo = function(query) {
    return new Promise(function (resolve, reject) {
        var videos = global.database.collection('video')
        videos.find(query).toArray(function(err, result) {
            if (err) {
                reject(err)
                return
            }
    
            if (result.length > 0)
                resolve(result)
            else
                resolve("NOT_FOUND")
        })
    })
}
exports.incViews = function(query, update) {
    return new Promise(function (resolve, reject) {
        var videos = global.database.collection('video')
        videos.updateOne(query, update, function(err, result) {
            if(err) {
                reject(err)
                return
            }
            // 데이터가 있기때문에 이 함수로 들어올 수 있었음
            // 때문에 result 검사는 하지 않음
            resolve(result)
        })
    })
}

exports.getRecommendVideo = function() {
    return new Promise(function (resolve, reject) {
        var videos = global.database.collection('videoReco')
        videos.find().toArray(function(err, result) {
            if (err) {
                reject(err)
                return
            }
    
            if (result.length > 0)
                resolve(result)
            else
                resolve("NOT_FOUND")
        })
    })
}

exports.getSortVideo = function(query) {
    return new Promise(function (resolve, reject) {
        var videos = global.database.collection('video')
        videos.find().sort(query).toArray(function(err, result) {
            if (err) {
                reject(err)
                return
            }
    
            if (result.length > 0)
                resolve(result)
            else
                resolve("NOT_FOUND")
        })
    })
}

exports.postLike = function(query) {
    return new Promise(function (resolve, reject) {
        var likes = global.database.collection('like')
        likes.insertOne(query, function(err, result) {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}
exports.delLike = function(query) {
    return new Promise(function (resolve, reject) {
        var likes = global.database.collection('like')
        likes.deleteOne(query, function(err, result) {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}