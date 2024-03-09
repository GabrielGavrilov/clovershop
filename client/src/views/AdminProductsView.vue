<template>
    <DashboardHeaderComponent/>
    <a v-bind:href="$router.resolve({name: 'New product'}).href">
        <button>Create new product</button>
    </a>
    <ul>
        <li v-for="product in products">
            <a v-bind:href="$router.resolve({name: 'Update product', params: {productId: product._id}}).href">{{ product.productName }}</a>
        </li>
    </ul>
</template>

<script>
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminProductsView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            products: []
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/api/products/", {
            headers: {"Content-Type": "application/json"}
        })

        this.products = await response.json();
    }
}
</script>