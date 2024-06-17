<template>
    <header>
        <div>
            <div>
                <a href="/">
                    <img v-bind:src="require(`@/assets/images/clover.png`)">
                </a>
            </div>
            <div>
                <ul>
                    <li v-for="category in categories">
                        <a v-bind:href="$router.resolve({name: 'Category', params: {category: category.categoryName}}).href">
                            {{ category.categoryName }}
                        </a>
                    </li>
                </ul>
            </div>
            <div>
                <a href="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" width="30" height="30"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </a>
            </div>
        </div>
    </header>
</template>

<script>
import { fetchRequestToServer } from "@/modules/FetchModule"
import { onMounted, ref } from "vue"

export default {
    name: "HeaderComponent",
    data() {
        return {
            categories: [],
        }
    },
    async mounted() {
        this.categories = (await fetchRequestToServer("GET", "/api/categories")).data
    }
}
</script>