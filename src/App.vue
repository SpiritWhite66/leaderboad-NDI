<template>
  <div id="app">
    <div class="panel">
      <nav class="navbar">
        <a class="navbar-brand" href="#">
          <b-icon-trophy></b-icon-trophy>
          LeaderBoard - CodingGame Sopra Steria - NDL 2020
        </a>

        <form class="form-inline">
        <router-link tag="a" v-bind:to="path()" class="btn btn-outline-warning my-2 my-sm-0">
          STREAM MODE
        </router-link>
        </form> 
      </nav>

      <div class="container margin-top50">
        <podium></podium>
      </div>
    </div>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Podium from '@/components/Podium'

export default {
  name: 'App', 
  components: {'podium': Podium},
  data () {
    return {
      mode: 'stream'
    }
  }, 
  methods: {
    path: function () {
      return this.$router.currentRoute.path === '/stream' ? '/':'/stream'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
      background-color: #ebecf1;
}

.panel {
  margin-top:0;
  width: 100%;
  height: 400px;
  background: linear-gradient(90deg,#0c2646 0,#204065 60%,#2a5788);
  color : #fff;
}
.panel .card {
  margin-top:0;
  width: 100%;
  height: 400px;
  background-color : transparent !important;
  color : #fff;
}
.container {
  margin-top : -60px;
}
.navbar a{
  color : #fff !important;
}
.margin-top30 {
  margin-top: 30px;
}
.margin-top50 {
  margin-top: 50px;
}
</style>
