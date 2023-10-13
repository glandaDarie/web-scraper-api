<template>
    <div class="search-button">
      <button @click="search">{{ buttonText }}</button>
    </div>
</template>
  
  <script>
  export default {
    props: {
        buttonText: String
    },
    methods: {
      search() {
        alert("Search functionality will be implemented here.");
      },
    },
  };
  </script>
  
  <style scoped>
  .search-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  
  button {
    background-color: #4CAF50; 
    color: white;
    border: none; 
    border-radius: 5px; 
    padding: 10px 20px;
    cursor: pointer; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  }
  
  button:hover {
    background-color: #357577; 
  }
  </style>
  