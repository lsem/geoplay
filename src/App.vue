<template>
  <div id="app">
    <div class="tools">
<button type="button" class="btn btn-outline-primary btn-sm">Primary</button>
<button type="button" class="btn btn-outline-secondary btn-sm">Secondary</button>
<button type="button" class="btn btn-outline-success btn-sm">Success</button>
<button type="button" class="btn btn-outline-info btn-sm">Info</button>
<button type="button" class="btn btn-outline-warning btn-sm">Warning</button>
<button type="button" class="btn btn-sm btn-outline-danger ">Danger</button>  
<button type="button" class="btn btn-primary btn-sm">Small button</button>
<button type="button" class="btn btn-secondary btn-sm">Small button</button>    
      <!--<b-button class="toolb" :size="sm" :variant="success" href="">
        Tool 1
      </b-button>
      <b-button class="toolb" :size="sm" :variant="success" href="">
        Tool 2
      </b-button>
      <b-button class="toolb" :size="sm" :variant="success" href="">
        Tool 3
      </b-button>
      <b-button class="toolb" :size="sm" :variant="success" href="">
        Tool 4
      </b-button>-->
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios';
import EventBus from "./eventBus"

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    var self = this
    EventBus.$on('rectCreated', function(bounds) {
      self.approxRect({
        south: bounds.getSouthWest().lat(),
        west: bounds.getSouthWest().lng(),
        north: bounds.getNorthEast().lat(),
        east: bounds.getNorthEast().lng()
        })
    })
  },
  methods: {
     approxRect: function(bounds) {
      axios({
        method: 'get',
        baseURL: 'http://localhost:8000',
        url: '/approxRect',
        params: {
          south: bounds.south,
          west: bounds.west,
          north: bounds.north,
          east: bounds.east,
          minLvl: 1,
          maxLvl: 30,
          maxCells: 60
        }
      }).then(function(response) {
        console.log('app: got response', response)
        EventBus.$emit('regionApproximated', response.data);
      }).catch(function(error){
        console.error('app: failed approxing', error)
      })
    }
  }
}
</script>

<style lang="scss">
.tools {
  padding-left: 40px;
  padding-right: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(40px, auto);
}

.toolb {
  width:  130px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 50px;
}

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
