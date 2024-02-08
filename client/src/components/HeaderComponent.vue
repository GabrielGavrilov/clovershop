<template>
    <ul>
        <li v-for="category in categories">
            <router-link v-bind:to="`/${category.categoryName}`">
                {{ category.categoryName }}
            </router-link>
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
            const response = await fetch("http://localhost:3000/category/", {
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