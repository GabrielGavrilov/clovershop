<template>
    <DashboardHeaderComponent/>
    <p>{{ message }}</p>
    <form v-on:submit.prevent="updateCategory()">
        <input v-model="category.categoryName" type="text" required>
        <br>
        <input v-model="category.categoryDescription" type="text" required>
        <br>
        <button type="submit">Update</button>
    </form>
</template>

<script>
import config from "../../../../config/index.js"
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
            message: "",
            route: useRoute(),
            router: useRouter(),
            category: reactive({
                categoryId: "",
                categoryName: "",
                categoryDescription: ""
            }),
            server: `${config.SERVER_PROTOCOL}://${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch(`${this.server}/api/category/${this.route.params.categoryId}`, {
            headers: {"Content-Type": "application/json"}
        })

        const categoryInformation = await response.json()
        this.category.categoryId = this.route.params.categoryId
        this.category.categoryName = categoryInformation.categoryName
        this.category.categoryDescription = categoryInformation.categoryDescription
    },
    methods: {
        async authorizeUser() {
            const response = await fetch(`${this.server}/auth/account`, {
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

            const authResponse = await response.json()

            if(authResponse.status == 401 || authResponse.status == 400)
                this.router.push("/admin/login")
        },
        async updateCategory() {
            const response = await fetch(`${this.server}/admin/category/update`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.category)
            })

            const categoryResponse = await response.json()

            if(categoryResponse.status == 409)
                this.message = categoryResponse.message

            else
                await this.router.push("/admin/categories")
        }
    }
}
</script>
