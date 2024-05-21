<template>
    <header>
        <div class="header-content">
            <div class="header-left">
                <a href="/">
                    <img class="header-site-icon" v-bind:src="require(`@/assets/images/maple-leaf.png`)">
                </a>
            </div>
            <div class="header-center">
                <ul class="header-navbar">
                    <li class="header-navbar-item" v-for="category in categories">
                        <a class="header-navbar-link" v-bind:href="$router.resolve({name: 'Category', params: {category: category.categoryName}}).href">
                            {{ category.categoryName }}
                        </a>
                    </li>
                </ul>
            </div>
            <div class="header-right">
                <a class="header-shoping-cart-link" href="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" width="30" height="30"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </a>
            </div>
        </div>
    </header>
    <div class="light-line"></div>
</template>

<script>
import config from "../../../config/index.js"
import { onMounted, ref } from "vue"

export default {
    name: "HeaderComponent",
    data() {
        return {
            categories: [],
            server: `${config.SERVER_PROTOCOL}://${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        const response = await fetch(`${this.server}/api/categories/`, {
            headers: {"Content-Type": "application/json"}
        })

        this.categories = await response.json()
    }
}
</script>