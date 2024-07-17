<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin-content">
            <div class="flexbox">
                <div class="left">
                    <p class="medium-text bold">Products</p>
                </div>
                <div class="right">
                    <a v-bind:href="$router.resolve({name: 'New product'}).href">
                        <button class="btn-green">New Product</button>
                    </a>
                </div>
            </div>
            <div class="admin-section">
                <div v-if="products !== undefined">
                    <div v-if="products.length > 0">
                        <ul class="admin-section-ul">
                            <li v-for="product in products">
                                <div class="admin-section-item">
                                    <a class="admin-link" v-bind:href="$router.resolve({name: 'Update product', params: {productId: product._id}}).href">
                                        {{ product.productName }}
                                    </a>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="right">{{productCount}} records</p>
                                </div>
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
            </div>
        </div>
    </main>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeader.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenu.vue';
import { isUserAuthorized } from '@/common/functions.js';
import { fetchRequestToServer } from '@/common/requests.js';

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
            productCount: 0
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.products = (await fetchRequestToServer("GET", "/api/products")).data
        this.productCount = this.products.length
    }
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>