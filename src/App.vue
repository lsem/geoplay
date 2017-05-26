<template>
  <div id="app">
    <div class="tools">
      <span id="status">Status: {{status}} </span>
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
  props: {
    status: Date.now() + ': i'
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
       var self = this
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
          maxCells: 20
        }
      }).then(function(response) {
        console.log('app: got response', response)
        EventBus.$emit('regionApproximated', response.data);
        self.status = "done"
      }).catch(function(error){
        console.error('app: failed approxing', error)
        self.status = "error"
      })
      self.status = "requested ..."
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
