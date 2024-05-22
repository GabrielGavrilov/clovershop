<template>
    <DashboardHeaderComponent/>
    <p>Categories</p>
    <p>{{ message }}</p>
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
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody } from "@/modules/FetchModule";

export default {
    name: "AdminNewCategoryView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            message: "",
            router: useRouter(),
            category: reactive({
                categoryName: '',
                categoryDescription: ''
            }),
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")
    },
    methods: {
        async createCategory() {
            const categoryResponse = await credentialFetchRequestToServerWithBody("POST", "/admin/category/new", this.category)

            if(categoryResponse.status == 409)
                this.message = categoryResponse.message
            else
                await this.router.go()
        }
    }
}
</script>