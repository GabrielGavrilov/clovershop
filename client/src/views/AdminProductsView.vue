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
import { useRouter } from 'vue-router';
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminProductsView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            products: []
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch("http://localhost:3000/api/products/", {
            headers: {"Content-Type": "application/json"}
        })

        this.products = await response.json();
    },
    methods: {
        async authorizeUser() {
            const response = await fetch("http://localhost:3000/auth/account", {
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

            const authResponse = await response.json()

            if(authResponse.status == 401 || authResponse.status == 400)
                this.router.push("/admin/login")
        }
    }
}
</script>