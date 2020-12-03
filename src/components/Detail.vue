<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-md-10">
          <h5 class="card-category">Détails</h5>
          <h4 class="card-title">{{value?value.pseudo:'-'}}</h4>
        </div>
        <div class="col-md-2">
          <div class="btn-group-toggle text-right" data-toggle="buttons">
            <label  class="btn btn-round btn-icon  active">
              <input type="checkbox" v-model="hidden" checked autocomplete="off"> <b-icon-box-arrow-in-up-right></b-icon-box-arrow-in-up-right>
            </label>
          </div>
        </div>
      </div>
    </div>
      <div class="card-body" v-if="!hidden">
        <div class="details" >
          <table class="table" v-if="value">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Points</th>
                <th scope="col">Bonus</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody class="ascenseur">
              <tr v-for="(detail, index) in value.details">
                <th scope="row">{{index}}</th>
                <td>{{detail.points}}</td>
                <td>{{detail.bonus ? 'Oui':'Non'}}</td>
                <td><button class="btn btn-round btn-icon btn-danger" v-on:click="deleteMatch"><b-icon-trash></b-icon-trash></button></td>
              </tr>
            </tbody>
          </table>
          <p v-else>Aucune données</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'details',
  props: ['value'],
  data () {
    return {
      hidden: false,
    }
  },
  methods: {
    deleteMatch: function(match){
      this.value.details.splice(this.value.details.indexOf(match));
      this.$emit('delete')
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
.ascenseur {
  display: inline-block;
  height:150px;
  overflow:auto;
  scrollbar-width: none;
}
.ascenseur::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
}

tbody {
    display:block;
    overflow:auto;
}
thead, tbody tr {
    display:table;
    width:100%;
    table-layout:fixed;/* even columns width , fix width of table too*/
}


</style>
