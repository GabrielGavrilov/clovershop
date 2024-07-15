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
                            <li v-for="category in categories">
                                <div class="admin-section-item flexbox">
                                    <a class="left" v-bind:href="$router.resolve({name: 'Update category', params: {categoryId: category._id}}).href">
                                        {{ category.categoryName }}
                                    </a>
                                </div>
                                <div class="hr-line-light"></div>
                            </li>
                            <li>
                                <div class="admin-section-item flexbox">
                                    <p class="right">{{amountOfRecords}} records</p>
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
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import { isUserAuthorized } from '@/modules/CommonModule';
import { fetchRequestToServer, fetchRequestToServerWithBody } from '@/modules/FetchModule';
import DashboardHeaderComponent from '@/components/AdminSideMenuComponent.vue';
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
            amountOfRecords: 0
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.categories = (await fetchRequestToServer("GET", "/api/categories")).data;
        console.log(this.categories)
        this.amountOfRecords = this.categories.length
    }
}
</script>

<style scoped src="@/assets/styles/AdminMain.css">
</style>