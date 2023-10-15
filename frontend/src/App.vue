<template>
  <h1>Web Scrapper</h1>
  <SearchBar @data-updated="updateData" backgroundText="Text"></SearchBar>
  <br>
  <h2><b>Results</b></h2>
  <div class="app-main">
    <div class="lottie-wrapper">
      <Vue3Lottie
        ref="customControl"
        :animationData="lottieSearchAnimationJSON"
        :height="200"
        :width="200"
        :loop="true"
        :direction="forward"
        :pauseOnHover="true"
        class="custom-animation"
      />
    </div>
    <ListView :data="data"></ListView>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import ListView from './components/ListView.vue';
import lottieSearchAnimationJSON from './assets/lottie-search-animation.json';

export default {
  name: 'App',
  components: {
    SearchBar, 
    ListView,
  },
  data() {
    return {
      data: [],
      lottieSearchAnimationJSON
    };
  },
  methods: {
    updateData(data) {
      this.data = data;
    },
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
  margin-top: 70px;
}

.app-main {
  display: flex;
  align-items: center;
}

.lottie-wrapper {
  position: relative;
  margin-right: 20px;
}

.custom-animation {
  position: absolute;
  top: -85px;
  left: 200px; 
}
</style>






