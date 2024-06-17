<template>
    <AdminHeaderComponent/>
    <DashboardHeaderComponent/>
    <main>
        <div class="admin-content">
            <div class="flexbox">
                <div class="left">
                    <p class="medium bold">Categories</p>
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
                        <ul class="admin-section-item">
                            <li v-for="category in categories">
                                <a v-bind:href="$router.resolve({name: 'Update category', params: {categoryId: category._id}}).href">
                                    {{ category.categoryName }}
                                </a>
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
import BaseStyle from '@/assets/styles/Base.css'
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import { isUserAuthorized } from '@/modules/CommonModule';
import { fetchRequestToServer } from '@/modules/FetchModule';
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
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.categories = (await fetchRequestToServer("GET", "/api/categories")).data;
    }
}
</script>

<style src="@/assets/styles/AdminMain.css">
</style>