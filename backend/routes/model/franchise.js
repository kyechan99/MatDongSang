
// 컬렉션을 사용하기 이전에 컬렉션이나 데이터가 존재 하는지 안전 확인
exports.databaseCheck = function() {    
    return new Promise(function (resolve, reject) {
        var franchise = global.database.collection('franchise')
        franchise.countDocuments({}, {}, function(err, result) {
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

exports.getFranchiseList = function() {
    return new Promise(function (resolve, reject) {
        var franchise = global.database.collection('franchise')
        franchise.find().toArray(function(err, result) {
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