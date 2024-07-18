<template>
    <AdminHeaderComponent/>
    <DashboardHeaderComponent/>
    <main>
        <div class="admin-content">
            <div class="flexbox">
                <div class="left">
                    <p class="medium-text bold">Categories</p>
                </div>
                <div class="right">
                    <a v-bind:href="$router.resolve({name: 'New category'}).href">
                        <button class="btn-green">New Category</button>
                    </a>
                </div>
            </div>
            <div class="admin-section">
                <div v-if="categories !== undefined">
                    <div v-if="categories.length > 0">
                        <ul class="admin-section-ul">
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="left bold regular-text uppercase">Category</p>
                                    <p class="left bold regular-text uppercase">Subcategories</p>
                                    <p class="left bold regular-text uppercase">Products</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li v-for="i in categories">
                                <div class="admin-section-item flexbox">
                                    <a class="left admin-link" v-bind:href="$router.resolve({name: 'Update category', params: {categoryId: i.category._id}}).href">
                                        {{ i.category.categoryName }}
                                    </a>
                                    <p class="left">{{ i.subcategories }}</p>
                                    <p class="left">{{ i.products }}</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="right">{{categoryCount}} records</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>No categories</p>
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
import clovershop from '@/assets/styles/Clovershop.css'
import AdminHeaderComponent from '@/components/AdminHeader.vue';
import { isUserAuthorized } from '@/common/functions.js';
import { fetchRequestToServer, fetchRequestToServerWithBody } from '@/common/requests.js';
import DashboardHeaderComponent from '@/components/AdminSideMenu.vue';
import { useRouter } from "vue-router"

export default {
    name: "AdminCategoriesView",
    components: {
        AdminHeaderComponent,
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            categories: undefined,
            categoryCount: 0
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        const categoryList = (await fetchRequestToServer("GET", "/api/categories")).data;
        this.categoryCount = categoryList.length
        const info = []

        for(let i = 0; i < this.categoryCount; i++) {
            const subcategoryCount = await this.getNumberOfSubcategories(categoryList[i].categoryName) 
            const productCount = await this.getNumberOfProducts(categoryList[i].categoryName)

            console.log(subcategoryCount)

            const categoryInformation = {
                category: categoryList[i],
                subcategories: subcategoryCount,
                products: productCount
            }

            info.push(categoryInformation)
        }

        this.categories = info;
    },
    methods: {
        async getNumberOfSubcategories(categoryName) {
            return (await fetchRequestToServerWithBody("POST", "/api/category/subcategories", {
                categoryName: categoryName
            })).data.length
        },
        async getNumberOfProducts(categoryName) {
            return (await fetchRequestToServerWithBody("POST", "/api/category/products", {
                categoryName: categoryName
            })).data.length
        }
    }
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>