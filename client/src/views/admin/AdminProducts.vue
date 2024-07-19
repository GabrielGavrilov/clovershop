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
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="left admin-section-title">Product</p>
                                    <p class="left admin-section-title">Category</p>
                                    <p class="left admin-section-title">Subcategory</p>
                                    <p class="left admin-section-title">Price</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li v-for="product in products">
                                <div class="admin-section-item flexbox">
                                    <a class="admin-link left" v-bind:href="$router.resolve({name: 'Update product', params: {productId: product._id}}).href">
                                        {{ product.productName }}
                                    </a>
                                    <p class="left">{{ product.categoryName }}</p>
                                    <p class="left">{{ product.subcategoryName }}</p>
                                    <p class="left">${{ price(product.productPrice) }}</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="right">{{productCount}} products</p>
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
import { formatPrice, isUserAuthorized } from '@/common/functions.js';
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
    },
    methods: {
        price: formatPrice
    }
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>