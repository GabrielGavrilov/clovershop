<template>
    <DashboardHeaderComponent/>
    <main>
        <a v-bind:href="$router.resolve({name: 'New category'}).href">
            <button>Create a new category</button>
        </a>
        <div v-if="categories !== undefined">
            <div v-if="categories.length > 0">
                <ul>
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
    </main>
</template>

<script>
import { isUserAuthorized } from '@/modules/CommonModule';
import { fetchRequestToServer } from '@/modules/FetchModule';
import DashboardHeaderComponent from '@/components/AdminSideMenuComponent.vue';
import { useRouter } from "vue-router"

export default {
    name: "AdminCategoriesView",
    components: {
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

        this.categories = await fetchRequestToServer("GET", "/api/categories");
    }
}
</script>