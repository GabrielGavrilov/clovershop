<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <p>{{ message }}</p>
        <form v-on:submit.prevent="updateCategory()">
            <input v-model="category.categoryName" type="text" required>
            <br>
            <input v-model="category.categoryDescription" type="text" required>
            <br>
            <button type="submit">Update</button>
        </form>
    </main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeaderComponent.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenuComponent.vue"
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/modules/FetchModule";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    name: "AdminUpdateCategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
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

        const categoryInformation = (await fetchRequestToServer("GET", `/api/category/${this.route.params.categoryId}`)).data

        // unnecessary?
        this.category.categoryId = this.route.params.categoryId
        this.category.categoryName = categoryInformation.categoryName
        this.category.categoryDescription = categoryInformation.categoryDescription
    },
    methods: {
        async updateCategory() {
            const response = await credentialFetchRequestToServerWithBody("POST", "/admin/category/update", this.category)

            if(response.status == 409)
                this.message = response.data.err
            else
                await this.router.push("/admin/categories")
        }
    }
}
</script>
