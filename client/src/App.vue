<template>
  <div id="app">
    <div class="heading"> <h1>Youssef's Image search challenge </h1> </div>
    <gallery/>
  </div>
</template>

<script>


import gallery from '@/components/Gallery.vue';
export default {
  name: 'App',
  components: {
    gallery,
  }
}
</script>

<style>
#app {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
.heading{
  background-image: url("./assets/vue-mk-header.jpg");
height: 30vh;
position: relative;
overflow: hidden;
background-position: center center;
background-size: cover;
margin: 0;
padding: 0;
border: 0;
border: 0;
display: flex;
border-radius: 50px;
-webkit-box-align: center;
-ms-flex-align: center;
align-items: center;
-webkit-box-pack: center;
-ms-flex-pack: center;
box-sizing: inherit;
justify-content: center;
}
h1 {
  text-shadow: 2px 2px #000000;
  font-size: 10vh;
}
</style>
