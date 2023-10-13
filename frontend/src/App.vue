<template>
  <h1>Web Scrapper</h1>
  <SearchBar backgroundText="Text"></SearchBar>
  <br>
  <h2><b>Results</b></h2>
</template>

<script>
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: {
    SearchBar
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
