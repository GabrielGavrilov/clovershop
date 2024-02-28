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
import { onMounted, ref } from "vue"

export default {
    name: "HeaderComponent",
    setup() {
        let categories = ref()

        onMounted(async function() {
            const response = await fetch("http://localhost:3000/api/categories/", {
                headers: {"Content-Type": "application/json"}
            })

            categories.value = await response.json()
        })

        return {
            categories
        }
    }
}
</script>