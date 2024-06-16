<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <p>Categories</p>
        <p>{{ message }}</p>
        <form v-on:submit.prevent="createCategory()">
            <input v-model="category.categoryName" type="text" placeholder="Category name" required>
            <br>
            <input v-model="category.categoryDescription" type="text" placeholder="Category description" required>
            <br>
            <button type="submit">Create category</button>
        </form>
    </main>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody } from "@/modules/FetchModule";

export default {
    name: "AdminNewCategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
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
            const response = await credentialFetchRequestToServerWithBody("POST", "/admin/category/new", this.category)

            if(response.status == 409)
                this.message = response.data.err
            else
                await this.router.go()
        }
    }
}
</script>