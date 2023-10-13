<template>
    <div class="url-input">
        <div class="input-container">
            <div class="search-icon">
                <i class="fas fa-search"></i> 
                <img src="@/assets/search.png" alt="Search Logo" class="logo" @click="handleLogoClick"/>
            </div>
            <input v-model="parameterUrl" placeholder="Search..." />
        </div>
    </div>
</template>
  
<script>
import validateUrl from '@/utils/urlValidator';

export default {
    methods: {
        async handleLogoClick() {
            const validator = validateUrl(this.parameterUrl)
            if(!validator.isValid) {
                return validator.error;
            }
            let data = null;
            const url = 'http://localhost:3000/scrape?url=' + this.parameterUrl;
            try {
                const response = await fetch(url);
                if (response.status === 200) {
                    data = await response.json();
                } else {
                    alert('Failed to fetch data');
                }
            } catch (error) {
                alert(`Error: ${error}`);
            }
            alert(`Data: ${JSON.stringify(data)}`);
        },
    },
};
</script>
  
<style scoped>
.url-input {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45%;
    margin: 0 auto;
    margin-top: 3rem;
}

.input-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 25px;
    padding: 5px;
    width: 100%;
}

.search-icon {
    display: flex;
    align-items: center;
    padding: 5px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
}

.logo {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}

input {
    flex: 1;
    padding: 5px;
    border: none;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
    outline: none;
}
</style>
  