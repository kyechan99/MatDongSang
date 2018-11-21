# MatDongSang-Server

### Create Database
```js
> use matdongsang
```

### Auto Increment
```js
> function autoInc(id) {
	var ret = db.incCol.findAndModify({
		query:{_id:id},
		update: {$inc: {incNum:1}},
		"new":true,
		upsert:true
	});
	return ret.incNum;
}
```

### Insert User Temp Data
```js
> db.user.insertMany([
    {idx:autoInc("user"), id:"root", pw:"test", name:"test-name", email:"root@email.com", cp:"01011112222", address: ["서울", "전주"], like: [], date:new Date()},
    {idx:autoInc("user"), id:"test", pw:"test", name:"Name", email:"test@email.com", cp:"01034569873", address: ["대전"], like: [], date:new Date()},
    {idx:autoInc("user"), id:"1234", pw:"1234", name:"1234", email:"1234@email.com", cp:"01012341234", address: ["홍대", "건대", "동국대"], like: [], date:new Date()}
])
```

### Insert Video Temp  Data
```js
> db.video.insertMany([
	{ vid:"feTZMR736tM", franchise:"엽기떡볶이", views: 0. food: ["떡볶이", "우동"], date:new Date() },
	{ vid:"gNwFCLmImfE", franchise:"BHC 치킨", views: 0. food: ["치킨", "뿌링클", "BHC"], date:new Date() },
	{ vid:"W2uQN45zp8U", franchise:"피자헛", views: 0. food: ["피자", "더블퐁듀쉬림프", "쉬림프로제파스타"], date:new Date() }
])

db.video.insertOne(
	{ vid:"W2uQN45zp8U", franchise:"피자헛", food: ["피자", "더블퐁듀쉬림프", "쉬림프로제파스타"], date:new Date() }
)
```

### Insert Recommend Video Temp Data
```js
> db.videoReco.insertMany([
	{ vid:"feTZMR736tM" },
	{ vid:"gNwFCLmImfE" }
])
```

### Insert Like Temp Data
```js
> db.like.insertOne(
	{ vid:"feTZMR736tM" }
 )
```

### Insert Franchise Temp Data
```js
> db.franchise.insertMany([
	{ name: '비에이치씨(BHC)', code: '비에이치씨(BHC)' },
	{ name: '네네치킨', code: '네네치킨' },
	{ name: '교촌치킨', code: '교촌치킨' },
	{ name: '노랑통닭', code: '노랑통닭' },
	{ name: '비비큐치킨(BBQ치킨)', code: '비비큐치킨(BBQ치킨)' },
	{ name: '깐부치킨', code: '깐부치킨' },
	{ name: '호식이두마리치킨', code: '호식이두마리치킨' }
])
```

### Insert Food Temp Data
```js
> db.food.insertMany([
	{ name: '치킨', code: '치킨' },
	{ name: '피자', code: '피자' },
	{ name: '야식', code: '야식' },
	{ name: '한식', code: '한식' },
	{ name: '돈까스', code: '돈까스' },
	{ name: '중국집', code: '중국집' },
	{ name: '짜장', code: '짜장' },
	{ name: '족발', code: '족발' }
])
```