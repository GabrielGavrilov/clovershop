<template>
    <DashboardHeaderComponent/>
    <p>Categories</p>
    <form v-on:submit.prevent="createCategory()">
        <input v-model="category.categoryName" type="text" placeholder="Category name" required>
        <br>
        <input v-model="category.categoryDescription" type="text" placeholder="Category description" required>
        <br>
        <button type="submit">Create category</button>
    </form>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminCategoriesView",
    components: {
        DashboardHeaderComponent
    },
    setup() {
        const router = useRouter()
        const category = reactive({
            categoryName: '',
            categoryDescription: ''
        })

        async function createCategory() {
            const response = await fetch("http://localhost:3000/admin/category/new", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(category)
            })

            // TODO: Validation

            await router.go()
        }

        return {
            category,
            createCategory
        }
    }
}
</script>