<template>
    <HeaderComponent/>
    <h2>{{ categoryName }}</h2>
    <div v-for="product in products">
        <div>
            <div>
                <img v-bind:src="require(`@/assets/${product.productPicture}`)">
            </div>
            <div>
                <a v-bind:href="$router.resolve({name: 'Product', params: {category: categoryName, productId: product._id}}).href">
                    {{ product.productName }}
                </a>
            </div>
            <div>
                <p>
                    {{ product.productPrice }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

export default {
    name: "CategoryView",
    components: {
        HeaderComponent
    },
    setup() {
        const route = useRoute()
        let products = ref()
        const categoryName = route.params.category

        // TODO: category not found 404 page.

        onMounted(async function() {
            const response = await fetch("http://localhost:3000/category/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({categoryName: categoryName})
            })

            products.value = await response.json()
        })

        return {
            products,
            categoryName
        }
    }
}
</script>