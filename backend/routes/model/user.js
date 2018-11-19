
// 컬렉션을 사용하기 이전에 컬렉션이나 데이터가 존재 하는지 안전 확인
exports.databaseCheck = function() {    
    return new Promise(function (resolve, reject) {
        var users = global.database.collection('user')
        users.countDocuments({}, {}, function(err, result) {
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

exports.getUser = function(query) {
    return new Promise(function (resolve, reject) {
        var users = global.database.collection('user')
        users.find(query, { projection: { pw: 0 } }).toArray(function(err, result) {
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


exports.login = function(query) {
    return new Promise(function (resolve, reject) {
        var users = global.database.collection('user')
        users.find(query).toArray(function(err, result) {
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


// 회원가입
exports.addUser = function(query, callback) {
    var users = global.database.collection('user')
    users.insertOne(query, function(err, result) {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, result)
    })
}


exports.deleteUser = function(query, callback) {
    var users = global.database.collection('user')

    users.deleteOne(query, function(err, result) {
        if (err) {
            callback(err, null)
            return
        }

        callback(null, result)
    })
}

// 회원 정보 수정
exports.updateProfile = function(query, update, callback) {
    var users = global.database.collection('user')
    users.updateOne(query, update, function(err, result) {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, result)
    })
}
