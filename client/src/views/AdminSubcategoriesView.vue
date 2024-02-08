<template>
    <DashboardHeaderComponent/>
    <p>Subcategories</p>
    <form v-on:submit.prevent="createSubcategory()">
        <input v-model="subcategory.subcategoryName" type="text" placeholder="Subcategory name" required>
        <br>
        <input v-model="subcategory.categoryName" type="text" placeholder="Category name" required>
        <br>
        <button type="submit">Create subcategory</button>
    </form>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from "vue-router"
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminSubcategories",
    components: {
        DashboardHeaderComponent
    },
    setup() {
        const router = useRouter()
        const subcategory = reactive({
            subcategoryName: "",
            categoryName: ""
        })

        async function createSubcategory() {
            const response = await fetch("http://localhost:3000/admin/subcategory/new", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(subcategory)
            })

            // TODO: Validation

            await router.go()
        }

        return {
            subcategory,
            createSubcategory
        }
    }
}
</script>