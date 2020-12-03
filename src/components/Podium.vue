<template>
    <div class="podium">
        <h5> PODIUM </h5>
        <div class="row margin-top30">
            <div class="col-sm-4" v-for="(participant, index) in podium">
                <h5><img :src="getImg(index+1)"></h5>
                <p>{{participant.pseudo}}</p>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  name: 'Podium',
  data () {
    return {
    }
  },
  computed: {
    podium: function() {
        if (localStorage.getItem('classement')) {
            try {
                console.log('test')
                return this.orderedParticipant(JSON.parse(localStorage.getItem('classement'))).slice(0,3)
            } catch(e) {
                console.log(e)
                localStorage.removeItem('classement');
            }
        }
    }
  },
  methods: {
    calculatePoint: function(participant) {
      return participant.details.length?participant.details.reduce((memo, val) => memo + val.points + (val.bonus?5:0) , 0)/participant.details.length:0;
    }, 
    orderedParticipant: function (classement) {
      return classement.slice().sort((a, b) => this.calculatePoint(b) - this.calculatePoint(a))
    }, 
    getImg: function (index) {
        return require('../assets/img/'+index+'.png')
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
