<template>
  <div class="wrapper"> 
    
    <form class="search-box" action="">
     <div class="textbar"> <input v-on:input="search($event.target.value)"  type="text" placeholder=" Search "></div>
    </form>
  <div class="gallery">
    <div class="gallery-panel"
         v-for="photo in photos"
         :key="photo.id">
        <img :src="thumbUrl(photo.url)">
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Gallery',
  data() {
    return {
      photos : [],
    };
  },
  methods: {
    thumbUrl(filename) {
      return require(`../assets/imgs/${filename}`);
    },
    search(searchVal) {
      console.log(searchVal)
      axios.get('http://localhost:3000/pics/'+searchVal )
      .then(response => (this.photos = response.data))
    }
  },
  created() {
     axios.get('http://localhost:3000/pics')
      .then(response => (this.photos = response.data))
    console.log(this.photos)
  }
};
</script>

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    grid-gap: 1rem;
    max-width: 80rem;
    margin: 5rem auto;
    padding: 0 5rem;
  }

  .gallery-panel img {
    width: 100%;
    height: 22vw;
    object-fit: cover;
    border-radius: 0.75rem;
  }

  .search-box{
    margin-top: 5vh;
    margin-bottom: -5vh;
  }
  input{ 
  width: 60vw;
  border-radius: 30px;
  border-block-start-color: black;
  border-block-end-color: black;
  font-size: 10vh;
  padding: 15px;
  }
  textarea:focus, input:focus{
    outline: none;
}


</style>
