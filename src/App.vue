<template>
  <div id="app">
    <div class="tools">
      <b-button class="toolb" :size="sm" :variant="success" href="">
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
      </b-button>
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
    EventBus.$on('rectCreated', function(bounds) {
      console.log('Vue: created rect with bounds: ' + JSON.stringify(bounds))
    })
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
