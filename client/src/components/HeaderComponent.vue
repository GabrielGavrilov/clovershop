<template>
    <ul>
        <li v-for="category in categories">
            <a v-bind:href="$router.resolve({name: 'Category', params: {category: category.categoryName}}).href">
                {{ category.categoryName }}
            </a>
        </li>
    </ul>
</template>

<script>
import addr from "../../../addresses.js"
import { onMounted, ref } from "vue"

export default {
    name: "HeaderComponent",
    data() {
        return {
            categories: []
        }
    },
    async mounted() {
        const response = await fetch(`${addr.SERVER_ADDRESS}/api/categories/`, {
            headers: {"Content-Type": "application/json"}
        })

        this.categories = await response.json()
    }
}
</script>