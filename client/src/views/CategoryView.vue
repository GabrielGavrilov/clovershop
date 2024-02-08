<template>
    <HeaderComponent/>
    <p>{{ categoryName }}</p>
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
        let categoryName = ref()
        const route = useRoute()

        const getBody = {
            categoryName: route.params.categoryName
        }

        onMounted(async function() {
            const response = await fetch("http://localhost:3000/category/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(getBody)
            })

            products.value = await response.json()
            categoryName.value = route.params.categoryName

            console.log(products.value)
        })

        return {
            products,
            categoryName
        }
    }
}
</script>