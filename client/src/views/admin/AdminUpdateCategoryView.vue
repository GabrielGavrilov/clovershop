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
import DashboardHeaderComponent from "@/components/AdminSideMenuComponent.vue"
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/modules/FetchModule";
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
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.route.push("/admin/login")

        const categoryInformation = await fetchRequestToServer("GET", `/api/category/${this.route.params.categoryId}`)

        // unnecessary?
        this.category.categoryId = this.route.params.categoryId
        this.category.categoryName = categoryInformation.categoryName
        this.category.categoryDescription = categoryInformation.categoryDescription
    },
    methods: {
        async updateCategory() {
            const categoryResponse = await credentialFetchRequestToServerWithBody("POST", "/admin/category/update", this.category)

            if(categoryResponse.status == 409)
                this.message = categoryResponse.message
            else
                await this.router.push("/admin/categories")
        }
    }
}
</script>
