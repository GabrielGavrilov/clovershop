<template>
    <HeaderComponent/>
    <h2>{{ category.categoryName }}</h2>
    <h3>{{ category.categoryDescription }}</h3>
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
import { useRoute } from "vue-router"

export default {
    name: "CategoryView",
    components: {
        HeaderComponent,
        CategoryProductComponent
    },
    data() {
        return {
            route: useRoute(),
            products: [],
            category: []
        }
    },
    async mounted() {
        const categoryResponse = await fetch("http://localhost:3000/category/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({categoryName: this.route.params.category})
        })

        this.category = await categoryResponse.json()

        const productsResponse = await fetch("http://localhost:3000/category/products", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({categoryName: this.category.categoryName})
        })

        this.products = await productsResponse.json()
    }
}
</script>