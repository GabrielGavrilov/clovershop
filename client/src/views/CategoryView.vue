<template>
    <HeaderComponent/>
    <h2>{{ categoryName }}</h2>
    <div v-for="product in products">
        <div>
            <img src="placeholder.png">
            <p>
                {{ product.productName }}
            </p>
            <p>
                {{ product.productPrice }}
            </p>
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
        let products = ref()
        const route = useRoute()
        const categoryName = route.params.category

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