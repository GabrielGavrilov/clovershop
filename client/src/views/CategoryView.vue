<template>
    <HeaderComponent/>
    <h2>{{ categoryName }}</h2>
    <h3>{{ categoryDescription }}</h3>
    <div v-for="product in products">
        <CategoryProductComponent 
            v-bind:productId="product._id"
            v-bind:productPicture="product.productPicture"
            v-bind:productName="product.productName"
            v-bind:productPrice="product.productPrice"
            v-bind:categoryName="categoryName"
        />
    </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue"
import CategoryProductComponent from "@/components/CategoryProductComponent.vue"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

export default {
    name: "CategoryView",
    components: {
        HeaderComponent,
        CategoryProductComponent
    },
    setup() {
        const route = useRoute()
        const products = ref()
        const categoryName = ref()
        const categoryDescription = ref()

        onMounted(async function() {
            const categoryResponse = await fetch("http://localhost:3000/category/", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({categoryName: route.params.category})
            })

            const categoryInformation = await categoryResponse.json()
            categoryName.value = categoryInformation.categoryName
            categoryDescription.value = categoryInformation.categoryDescription

            const productsResponse = await fetch("http://localhost:3000/category/products", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({categoryName: categoryName.value})
            })

            products.value = await productsResponse.json()
        })

        return {
            products,
            categoryName,
            categoryDescription
        }
    }
}
</script>