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
                                    <p class="left admin-section-title">Category</p>
                                    <p class="left admin-section-title">Subcategories</p>
                                    <p class="left admin-section-title">Products</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li v-for="item in categories">
                                <div class="admin-section-item flexbox">
                                    <a class="left admin-link" v-bind:href="$router.resolve({name: 'Update category', params: {categoryId: item.category._id}}).href">
                                        {{ item.category.categoryName }}
                                    </a>
                                    <p class="left">{{ item.subcategoryCount }}</p>
                                    <p class="left">{{ item.productCount }}</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="right">{{categoryCount}} categories</p>
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
        const data = []

        for(let i = 0; i < this.categoryCount; i++) {
            const productCount = await this.getProductCount(categoryList[i].categoryName);
            const subcategoryCount = await this.getSubcategoryCount(categoryList[i].categoryName)

            const categoryInformation = {
                category: categoryList[i],
                subcategoryCount: subcategoryCount,
                productCount: productCount
            }

            data.push(categoryInformation)
        }

        this.categories = data
    },
    methods: {
        async getProductCount(categoryName) {
            return (await fetchRequestToServerWithBody("POST", "/api/category/subcategories", {
                categoryName: categoryName
            })).data.length
        },
        async getSubcategoryCount(categoryName) {
            return (await fetchRequestToServerWithBody("POST", "/api/category/products", {
                categoryName: categoryName
            })).data.length
        }
    }
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>