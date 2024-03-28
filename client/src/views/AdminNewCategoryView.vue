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
import addr from "../../../addresses.js"
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

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
            })
        }
    },
    async mounted() {
        await this.authorizeUser()
    },
    methods: {
        async createCategory() {
            const response = await fetch(`${addr.SERVER_ADDRESS}/admin/category/new`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.category)
            })

            const categoryResponse = await response.json()

            if(categoryResponse.status == 409)
                this.message = categoryResponse.message

            else
                await this.router.go()
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