<template>
    <HeaderComponent/>
    <main>
        <div v-if="!categoryExists">
            <NotFoundComponent message="The page you are looking for does not exist!"/>
        </div>
        <div class="category-banner">
            <div class="category-banner-content">
                <div class="category-banner-title">
                    <p>{{ category.categoryName }}</p>
                </div>
                <div class="category-banner-description">
                    <p>{{ category.categoryDescription }}</p>
                </div>
            </div>
        </div>
        <div class="category-content">
            <div class="subcategory-content">
                <div>
                    <p class="subcategory-title">Subcategories</p>
                    <div class="subcategory-line"></div>
                    <ul>
                        <li @click="getProductsBySubcategory(subcategory.subcategoryName)" v-for="subcategory in subcategories">
                            {{ subcategory.subcategoryName }}
                        </li>
                    </ul>
                </div>
            </div>

            <div class="category-product-container">
                <div class="category-product-item" v-if="products.length > 0 && categoryExists" v-for="product in products">
                    <CategoryProductComponent 
                        v-bind:productId="product._id"
                        v-bind:productPicture="product.productPicture"
                        v-bind:productName="product.productName"
                        v-bind:productPrice="product.productPrice"
                        v-bind:categoryName="categoryName"
                    />
                </div>
                <div v-else-if="products.length == 0 && categoryExists">
                    <p>No products exist</p>
                </div>
            </div>

        </div>
    </main>
</template>

<script>
import { fetchRequestToServerWithBody } from "@/modules/FetchModule"
import HeaderComponent from "@/components/HeaderComponent.vue"
import CategoryProductComponent from "@/components/CategoryProductComponent.vue"
import NotFoundComponent from "@/components/NotFoundComponent.vue"
import { useRoute, useRouter } from "vue-router"

export default {
    name: "CategoryView",
    components: {
        HeaderComponent,
        CategoryProductComponent,
        NotFoundComponent
    },
    data() {
        return {
            categoryExists: true,
            route: useRoute(),
            router: useRouter(),
            category: [],
            subcategories: [],
            products: []
        }
    },
    async mounted() {
        this.category = await this.getCategoryInformation()

        if(this.category.status == 404)
            this.categoryExists = false

        else {
            this.subcategories = await this.getAllSubcategories()
            this.products = await this.getAllProductsInCategory()
        }
    },
    methods: {
        async getCategoryInformation() {
            return await fetchRequestToServerWithBody("POST", "/api/category", {categoryName: this.route.params.category});
        },
        async getAllSubcategories() {
            return await fetchRequestToServerWithBody("POST", "/api/category/subcategories", {categoryName: this.route.params.category})
        },
        async getAllProductsInCategory() {
            return await fetchRequestToServerWithBody("POST", "/api/category/products", {categoryName: this.category.categoryName})
        },
        async getProductsBySubcategory(subcategoryName) {
            this.products = await fetchRequestToServerWithBody("POST", "/api/category/subcategory/products", {
                categoryName: this.category.categoryName,
                subcategoryName: subcategoryName
            })
        }
    }
}
</script>