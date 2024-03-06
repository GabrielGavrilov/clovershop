<template>
    <DashboardHeaderComponent/>
    <form v-on:submit.prevent="updateCategory()">
        <input v-model="category.categoryName" type="text" required>
        <br>
        <input v-model="category.categoryDescription" type="text" required>
        <br>
        <button type="submit">Update</button>
    </form>
</template>

<script>
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    name: "AdminUpdateCategoryView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            route: useRoute(),
            router: useRouter(),
            category: reactive({
                categoryName: "",
                categoryDescription: ""
            })
        }
    },
    async mounted() {
        const response = await fetch(`http://localhost:3000/api/category/${this.route.params.categoryId}`, {
            headers: {"Content-Type": "application/json"}
        })

        const categoryInformation = await response.json()
        this.category.categoryName = categoryInformation.categoryName
        this.category.categoryDescription = categoryInformation.categoryDescription
    },
    methods: {
        async updateCategory() {
            const response = await fetch("http://localhost:3000/admin/category/update", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.category)
            })

            await this.router.push("/admin/categories")
        }
    }
}
</script>