<template>
  <h1>Web Scrapper</h1>
  <SearchBar @data-updated="updateData" backgroundText="Text"></SearchBar>
  <br>
  <h2><b>Results</b></h2>
  <ListView :data="data"></ListView>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import ListView from './components/ListView.vue';

export default {
  name: 'App',
  components: {
    SearchBar, 
    ListView
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    updateData(data) {
      this.data = data;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
