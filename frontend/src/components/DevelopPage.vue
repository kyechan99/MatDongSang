<template>
  <div class="dev">
    <!-- navbar -->
    <nav class="navbar-default navbar-fixed-top">
      <div class="title fixed-top">
        <p class="text-center">개발자 사이트</p>
        <div class="container">
          <div class="row">
            <div class="col-md-4">
              <a v-on:click="menu = 0" href="#">동영상 등록</a>
            </div>
            <div class="col-md-4">
              <a v-on:click="menu = 1" href="#">프랜차이즈 등록</a>
            </div>
            <div class="col-md-4">
              <a v-on:click="menu = 2" href="#">음식 등록</a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- body -->
    <div class="container">
      <!-- 동영상 등록 -->
      <div class="card" v-if="menu==0">
        <h1>동영상 등록</h1>
        <hr>
        <br>
        <form action="" method="post">
          <!-- 1 -->
          <div class="form-group">
            <h4>1. 비디오 아이디 (vid)</h4>
            <input class="form-control" type="text" name="" id="" placeholder="ex) 5NvWlAN0">
          </div>
          <!-- 2 -->
          <div class="form-group">
            <h4>2. 프랜차이즈</h4>
            <multiselect v-model="franchiseValue" tag-placeholder="Add this as new tag" placeholder="관련된 프랜차이즈 태그를 골라주세요." label="name" track-by="code" :options="franchiseOptions" :multiple="true" :taggable="true" @tag="addFranchiseTag"></multiselect>
            <!-- <pre class="language-json"><code>{{ franchiseValue  }}</code></pre> -->
          </div>
          <!-- 2 -->
          <div class="form-group">
            <h4>3. 음식</h4>
            <multiselect v-model="foodValue" tag-placeholder="Add this as new tag" placeholder="관련된 음식 태그를 골라주세요." label="name" track-by="code" :options="foodOptions" :multiple="true" :taggable="true" @tag="addFoodTag"></multiselect>
            <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
          </div>
        </form>
        <button class="btn btn-primary float-right" type="submit">
          <i class="fas fa-check"> 저장</i>
        </button>
      </div>

      <!-- 프랜차이즈 등록 -->
      <div class="card" v-else-if="menu==1">
        <h1>프랜차이즈 등록</h1>
        <p class="desc"> 이미 등록된 프랜차이즈는 아닌지 확인후 등록해주세요.</p>
        <hr>
        <br>
        <form method="post" @submit.prevent="postFranchise">
          <!-- 1 -->
          <div class="form-group">
            <h4>1. 프랜차이즈 이름</h4>
            <input v-model="franchiseName" class="form-control" type="text" name="name" id="name" placeholder="ex) 비에이치씨(BHC)">
          </div>
          <button class="btn btn-primary float-right" type="submit">
            <i class="fas fa-check"> 저장</i>
          </button>
        </form>
      </div>

      <!-- 음식 등록 -->
      <div class="card" v-else-if="menu==2">
        <h1>음식 등록</h1>
        <p class="desc"> 이미 등록된 음식은 아닌지 확인후 등록해주세요.</p>
        <hr>
        <br>
        <form method="post" @submit.prevent="postFood">
          <!-- 1 -->
          <div class="form-group">
            <h4>1. 음식 이름</h4>
            <input v-model="foodName" class="form-control" type="text" name="name" id="name" placeholder="ex) 치킨, 피자, 양식, 돈까스">
          </div>
          <button class="btn btn-primary float-right" type="submit">
            <i class="fas fa-check"> 저장</i>
          </button>
        </form>
      </div>
    </div>

    
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  created () {
    this.$http.get('/api/franchise')
    .then((response) => {
      this.franchiseOptions = response.data
    })
    this.$http.get('/api/food')
    .then((response) => {
      this.foodOptions = response.data
    })
  },
  components: { Multiselect },
  data () {
    return {
      // menu
      // 0 : 동영상 등록
      // 1 : 프랜차이즈 등록
      // 2 : 음식 등록
      menu: 0,
      franchiseValue: [
        // { name: '비에이치씨(BHC)', code: '비에이치씨(BHC)' }
      ],
      franchiseOptions: [],
      foodValue: [
        // { name: '치킨', code: '치킨' }
      ],
      foodOptions: [],
      movies: [],
      franchiseName: '',
      foodName: ''
    }
  },
  methods: {
    addFranchiseTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.franchiseOptions.push(tag)
      this.franchiseValue.push(tag)
    },
    addFoodTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      }
      this.foodOptions.push(tag)
      this.foodValue.push(tag)
    },
    postFranchise () {
      this.$http.post('../api/franchise', {name: this.franchiseName})
      .then((result) => {
      })
    },
    postFood () {
      this.$http.post('../api/food', {name: this.foodName})
      .then((result) => {
        console.log(result)
      })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.title {
    /* margin-top:15px; */
    padding-top: 15px;
    margin-bottom: 15px;
    border-style: solid;
    border-width: 0px;
    border-bottom-width: 1px;
    font-family: 'Noto Sans KR', sans-serif;
    background-color: white;
    box-shadow: 1px 1px 1px 1px #8a2c2c69;
}
.title p {
    font-size: 30px;
    font-weight: 900;
}

.title .row {
    margin: 0 5vw 0 5vw;
    padding-bottom: 5px;
    text-align: center;
}

.title a {
    font-weight: 500;
    color: black;
}

.card {
    margin: 5vw;
    margin-top: 170px;
    padding: 3vw;
}

.card h1 {
    font-family: 'Noto Sans KR', sans-serif;
}
.card h4 {
    font-family: 'Gugi', cursive;
}

.card .btn-primary {
    border: 0px;
    padding: 8px 16px 8px 16px;
    font-size: 18px;
    background: linear-gradient(141deg, #d82424 0%, #e9604e 30%, #d82424 85%);
}

.card .form-group {
    padding-top: 30px;
    padding-bottom: 30px;
}

button {
  margin-top: 50px;
}

.desc {
  margin-bottom: -8px;
}
</style>
