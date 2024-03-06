<template>
    <DashboardHeaderComponent/>
    <a v-bind:href="$router.resolve({name: 'New category'}).href">
        <button>Create a new category</button>
    </a>
    <ul>
        <li v-for="category in categories">
            <a v-bind:href="$router.resolve({name: 'Update category', params: {categoryId: category._id}}).href">
                {{ category.categoryName }}
            </a>
        </li>
    </ul>
</template>

<script>
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminCategoriesView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            categories: []
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/api/categories/", {
            headers: {"Content-Type": "application/json"}    
        })

        this.categories = await response.json()
    }
}
</script>