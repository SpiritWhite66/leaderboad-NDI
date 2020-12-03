<template>
  <div class="leader">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-12">
                <h5>Classement</h5>
              </div>
            </div>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <thead>
                  <tr>
                      <th>Rang</th>
                      <th>Pseudo</th>
                      <th>Score</th>
                      <th>Nb Participation</th>
                      <th></th>

                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(participant, index) in classement" v-bind:class="{'table-success': index==0}">
                      <td>#{{index+1}}</td>
                      <td>{{participant.pseudo}}</td>
                      <td>{{calculatePoint(participant)}}</td>
                      <td>{{participant.details.length}}</td>
                      <td><button class="btn btn-round btn-icon btn-danger" v-on:click="participantSelected = participant"><b-icon-box-arrow-up-right></b-icon-box-arrow-up-right></button></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Match from '@/components/Match'
import Detail from '@/components/Detail'

export default {
  name: 'LeaderBoard',
  components: { 'match': Match, 'detail': Detail},
  data () {
    return {
    }
  },
  computed: {
    classement: function() {
      if (localStorage.getItem('classement')) {
        try {
          return this.orderedParticipant(JSON.parse(localStorage.getItem('classement')))
        } catch(e) {
          localStorage.removeItem('classement');
        }
      }
    },
    mapParticipant: function() {
      return this.classement.flatMap(participant => participant.pseudo);
    },


  },
  methods: {
    calculatePoint: function(participant) {
      return participant.details.length?participant.details.reduce((memo, val) => memo + val.points + (val.bonus?5:0) , 0)/participant.details.length:0;
    }, 
    orderedParticipant: function (classement) {
      return classement.slice().sort((a, b) => this.calculatePoint(b) - this.calculatePoint(a))
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
