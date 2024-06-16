<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <a v-bind:href="$router.resolve({name: 'New product'}).href">
            <button>Create new product</button>
        </a>
        <div v-if="products !== undefined">
            <div v-if="products.length > 0">
                <ul>
                    <li v-for="product in products">
                        <a v-bind:href="$router.resolve({name: 'Update product', params: {productId: product._id}}).href">{{ product.productName }}</a>
                    </li>
                </ul>
            </div>
            <div v-else>
                <p>No products</p>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </main>
</template>

<script>
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import { isUserAuthorized } from '@/modules/CommonModule';
import { fetchRequestToServer } from '@/modules/FetchModule';

export default {
    name: "AdminProductsView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            router: useRouter(),
            products: undefined,
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.products = (await fetchRequestToServer("GET", "/api/products")).data
    }
}
</script>