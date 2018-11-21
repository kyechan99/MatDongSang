
// 컬렉션을 사용하기 이전에 컬렉션이나 데이터가 존재 하는지 안전 확인
exports.databaseCheck = function() {    
    return new Promise(function (resolve, reject) {
        var food = global.database.collection('food')
        food.countDocuments({}, {}, function(err, result) {
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

exports.getFoodList = function() {
    return new Promise(function (resolve, reject) {
        var food = global.database.collection('food')
        food.find().toArray(function(err, result) {
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

exports.addFood = function(query, callback) {
    var food = global.database.collection('food')
    food.insertOne(query, function(err, result) {
        if (err) {
            callback(err, null)
            return
        }
        callback(null, result)
    })
}

exports.deleteFood = function(query, callback) {
    var food = global.database.collection('food')

    food.deleteOne(query, function(err, result) {
        if (err) {
            callback(err, null)
            return
        }

        callback(null, result)
    })
}