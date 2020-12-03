<template>
  <div class="hello">
    <form>
      <select class="form-control">
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </select>
      <input class="form-control" type="text" placeholder="Default input">
      <select class="form-control">
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </select>
      <div class="custom-control custom-switch">
        <input type="checkbox" class="custom-control-input" id="customSwitch1">
        <label class="custom-control-label" for="customSwitch1">Pts Bonus (+10)</label>
      </div>
      <button class="btn btn-primary" type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Match',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
