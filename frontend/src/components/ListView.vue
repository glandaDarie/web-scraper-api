<template>
    <div class="list-view">
        <ol class="numbered-list">
            <li v-for="(item, index) in data" :key="item.title" class="list-item">
                <p class="list-item-number">{{ index + 1 }}</p>
                <div class="list-item-details">
                    <h3>{{ item.title }}</h3>
                    <div class="list-item-image">
                        <img :src="item.image" alt="Image" class="thumbnail" />
                    </div>
                    <p class="description">{{ item.short_description }}</p>
                    <div class="author-info">
                        <p><b>Author:</b> {{ item.author }}</p>
                        <p><b>Profession:</b> {{ item.profession }}</p>
                    </div>
                    <div class="additional-info">
                        <p><b>Sentiment:</b> {{ item.sentiment }}</p>
                        <p><b>Words:</b> {{ item.words }}</p>
                        <a :href="item.href" target="_blank" class="read-more-link">Read More</a>
                    </div>
                </div>
            </li>
        </ol>
    </div>
</template>
  
<script>
export default {
    props: {
        data: Array
    },
};
</script>
  
<style scoped>
.list-view {
    margin: 20px 0;
    padding: 20px;
    background-color: #f5f5f5;
    border: 3px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 36%;
    height: 130%;
    overflow-y: auto;
    height: 330px;
    margin: 0 auto;
}

.numbered-list {
    list-style-type: none;
    counter-reset: item;
}

.list-item {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 10px 0;
    position: relative;
    background-color: #fff;
}

.list-item-number {
    font-size: 24px;
    font-weight: bold;
    position: absolute;
    top: 10px;
    left: -30px;
}

.list-item-details {
    padding-left: 20px;
}

.list-item-image img.thumbnail {
    max-width: 180px;
    height: auto;
}

h3 {
    font-size: 1.2rem;
    margin: 0 0 10px;
}

.description {
    margin: 0 0 10px;
}

.author-info,
.additional-info {
    display: flex;
    flex-direction: column;
    margin: 0 0 0px;
}

a {
    color: #007BFF;
    text-decoration: none;
}
</style>
  