<template>
  <div class="leader">
    <div class="row">
      <div class="col-sm-6">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-10">
                <h5 class="card-category">Match</h5>
                <h4 class="card-title">Ajouter</h4>

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
            <match @add-participant="addMatch" v-bind:participants="mapParticipant"></match>
            <match @add-participant="addMatch" v-bind:participants="mapParticipant"></match>
            <match @add-participant="addMatch" v-bind:participants="mapParticipant"></match>
            <match @add-participant="addMatch" v-bind:participants="mapParticipant"></match>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <detail v-model="participantSelected" v-on:delete="persist" ></detail>
      </div>
    </div>
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
                  <tr v-for="(participant, index) in orderedParticipant" v-bind:class="{'table-success': index==0}">
                      <td>#{{index+1}}</td>
                      <td>{{participant.pseudo}}</td>
                      <td>{{calculatePoint(participant)}}</td>
                      <td>{{participant.details.length}}</td>
                      <td><button class="btn btn-round btn-icon btn-primary" v-on:click="participantSelected = participant"><b-icon-box-arrow-up-right></b-icon-box-arrow-up-right></button></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card w-100">
        <div class="card-body">
          <h5 class="card-title">Purger</h5>
          <p class="card-text align-left">Attention cette action purge l'ensemble des données présentes dans l'application ! <br> Voulez-vous purger ? </p>
          <button class="btn btn-primary" v-on:click="purger">PURGER</button>
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
      hidden: false,
      participantSelected: '',
      classement: []
    }
  },
  mounted() {
    if (localStorage.getItem('classement')) {
      try {
        this.classement = JSON.parse(localStorage.getItem('classement'))
      } catch(e) {
        localStorage.removeItem('classement');
      }
    }
  },
  computed: {
    mapParticipant: function() {
      if(this.classement && this.classement.length) {
        return this.classement.flatMap(participant => participant.pseudo);
      }
    },

    orderedParticipant: function () {
      if(this.classement && this.classement.length) {
        return this.classement.slice().sort((a, b) => this.calculatePoint(b) - this.calculatePoint(a))
      }
    }
  },
  methods: {
    persist() {
      const parsed = JSON.stringify(this.classement);
      localStorage.setItem('classement', parsed);
    },
    calculatePoint: function(participant) {
      return participant.details.length?participant.details.reduce((memo, val) => memo + val.points + (val.bonus?5:0) , 0)/participant.details.length:0;
    },
    addMatch: function(match) {
      var participantFound = this.classement.find(participant => participant.pseudo.toLowerCase().trim() == match.participant.toLowerCase().trim());
      if(participantFound) {
        participantFound.details.push(match.match);
      } else {
        this.classement.push(createParticipant(match.participant, match.match))
      }
      this.persist()
    }, 
    purger: function() {
      this.participantSelected=''
      this.classement = []
      localStorage.removeItem('classement')
    }

  }
}

function createParticipant(pseudo, match) {
  var participant = {};
  participant.pseudo = pseudo.toLowerCase();
  participant.details = [match];
  return participant;
};

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
