<template>
    <ul>
        <li v-for="category in categories"> {{ category.categoryName }}</li>
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