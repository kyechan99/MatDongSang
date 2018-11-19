<template>
  <div class="movies">
    <!-- navbar -->
    <nav class="navbar-default navbar-fixed-top">
      <div class="title fixed-top">
        <p class="text-center">개발자 사이트</p>
        <div class="container">
          <div class="row">
            <div class="col-md-4">동영상 등록</div>
            <div class="col-md-4">프랜차이즈 등록</div>
            <div class="col-md-4">음식 등록</div>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- body -->
    <div class="container">
      <div class="card">
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
            <multiselect v-model="franchiseValue" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="franchiseOptions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
            <!-- <pre class="language-json"><code>{{ franchiseValue  }}</code></pre> -->
          </div>
          <!-- 2 -->
          <div class="form-group">
            <h4>3. 음식</h4>
            <multiselect v-model="foodValue" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="code" :options="foodOptions" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
            <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
          </div>
        </form>

        <br>
        <br>
        <br>

        <button class="btn btn-primary float-right" type="submit">
          <i class="fas fa-check"> 저장</i>
        </button>
      </div>
    </div>

    
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  created () {
    this.$http.get('/api/movies')
    .then((response) => {
      this.movies = response.data
    })
  },
  components: { Multiselect },
  name: 'hello',
  data () {
    return {
      franchiseValue: [
        { name: '비에이치씨(BHC)', code: '비에이치씨(BHC)' }
      ],
      franchiseOptions: [
        { name: '비에이치씨(BHC)', code: '비에이치씨(BHC)' },
        { name: '네네치킨', code: '네네치킨' },
        { name: '교촌치킨', code: '교촌치킨' },
        { name: '노랑통닭', code: '노랑통닭' },
        { name: '비비큐치킨(BBQ치킨)', code: '비비큐치킨(BBQ치킨)' },
        { name: '깐부치킨', code: '깐부치킨' },
        { name: '호식이두마리치킨', code: '호식이두마리치킨' }
      ],
      foodValue: [
        { name: '치킨', code: '치킨' }
      ],
      foodOptions: [
        { name: '치킨', code: '치킨' },
        { name: '피자', code: '피자' },
        { name: '야식', code: '야식' },
        { name: '한식', code: '한식' },
        { name: '돈까스', code: '돈까스' },
        { name: '중국집', code: '중국집' },
        { name: '짜장', code: '짜장' },
        { name: '족발', code: '족발' }
      ],
      movies: []
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
</style>
