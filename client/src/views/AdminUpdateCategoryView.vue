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
import addr from "../../../addresses.js"
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
            })
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch(`${addr.SERVER_ADDRESS}/api/category/${this.route.params.categoryId}`, {
            headers: {"Content-Type": "application/json"}
        })

        const categoryInformation = await response.json()
        this.category.categoryId = this.route.params.categoryId
        this.category.categoryName = categoryInformation.categoryName
        this.category.categoryDescription = categoryInformation.categoryDescription
    },
    methods: {
        async updateCategory() {
            const response = await fetch(`${addr.SERVER_ADDRESS}/admin/category/update`, {
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
        },

        async authorizeUser() {
            const response = await fetch(`${addr.SERVER_ADDRESS}/auth/account`, {
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

            const authResponse = await response.json()

            if(authResponse.status == 401 || authResponse.status == 400)
                this.router.push("/admin/login")
        }
    }
}
</script>
