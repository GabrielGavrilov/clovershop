<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin-content">
            <div class="flexbox">
                <div>
                    <p class="medium-text bold">Subcategories</p>
                </div>
                <div class="right">
                    <a v-bind:href="$router.resolve({name: 'New subcategory'}).href">
                        <button class="btn-green">New Subcategory</button>
                    </a>
                </div>
            </div>
            <div class="admin-section">
                <div v-if="subcategories !== undefined">
                    <div v-if="subcategories.length > 0">
                        <ul class="admin-section-ul">
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="left admin-section-title">Subcategory</p>
                                    <p class="left admin-section-title">Category</p>
                                    <p class="left admin-section-title">Products</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li v-for="item in subcategories">
                                <div class="admin-section-item flexbox">
                                    <a class="admin-link left" v-bind:href="$router.resolve({name: 'Update subcategory', params: {subcategoryId: item.subcategory._id}}).href">
                                        {{ item.subcategory.subcategoryName }}
                                    </a>
                                    <p class="left">{{ item.subcategory.categoryName }}</p>
                                    <p class="left">{{ item.productCount }}</p>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="right">{{subcategoryCount}} subcategories</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <p>No subcategories</p>
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
import AdminHeaderComponent from '@/components/AdminHeader.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenu.vue';
import { isUserAuthorized } from '@/common/functions.js';
import { fetchRequestToServer, fetchRequestToServerWithBody } from '@/common/requests.js';
import { useRouter } from 'vue-router';

export default {
    name: "AdminSubcategoriesView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            router: useRouter(),
            subcategories: undefined,
            subcategoryCount: 0
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        const subcategoryList = (await fetchRequestToServer("GET", "/api/subcategories")).data
        this.subcategoryCount = subcategoryList.length
        const data = []

        for(let i = 0; i < this.subcategoryCount; i++) {
            const productCount = await this.getProductCount(subcategoryList[i].categoryName, subcategoryList[i].subcategoryName);

            const subcategoryInformation = {
                subcategory: subcategoryList[i],
                productCount: productCount
            }

            data.push(subcategoryInformation)
        }

        this.subcategories = data
    },
    methods: {
        async getProductCount(categoryName, subcategoryName) {
            return (await fetchRequestToServerWithBody("POST", "/api/category/subcategory/products", {
                categoryName: categoryName,
                subcategoryName: subcategoryName
            })).data.length
        }
    }
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>