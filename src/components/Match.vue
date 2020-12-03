<template>
  <div class="hello">
    <form class="form-inline">
      <input list="participants" v-model="participant" class="form-control mb-2 mr-sm-2 " type="text" placeholder="Pseudo">
      <datalist id="participants">
        <option v-for='participant in participants'>{{participant}}</option>
      </datalist>
      <select v-model.number="match.points" class="form-control mb-2 mr-sm-2 ">
        <option>0</option>
        <option>10</option>
        <option>20</option>
        <option>35</option>
        <option>50</option>
      </select>
      <button class="btn btn-round btn-icon btn-primary"  v-on:click="add" :disabled="!participant"><b-icon-plus></b-icon-plus></button>
      <div class="custom-control custom-switch">
        <input v-model="participe" type="checkbox" class="custom-control-input" :id="'bonus-' + id">
        <label class="custom-control-label" :for="'bonus-' + id">Bonus</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Match',
  data () {
    return {
      id: '',
      participant: '',
      match: { points: 10, bonus: false}
    }
  },
  props: ['participants'],
  mounted () {
    this.id = this._uid
  },
  computed: {
    participe: function () {
      if(this.participants) {
        this.match.bonus = this.participants.includes(this.participant.toLowerCase().trim())
        return this.participants.includes(this.participant.toLowerCase().trim())
      }
    }
  },
  methods: {
    add: function () {
      if (this.participant !== '' && this.match.points) {
        var response = {participant: this.participant, match: this.match}
        this.$emit('add-participant', response)
      }
      this.participant = ''
      this.match = {points: 10, bonus: false}
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
