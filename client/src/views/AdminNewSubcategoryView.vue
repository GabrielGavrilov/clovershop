<template>
    <DashboardHeaderComponent/>
    <p>Subcategories</p>
    <p>{{ message }}</p>
    <form v-on:submit.prevent="createSubcategory()">
        <input v-model="subcategory.subcategoryName" type="text" placeholder="Subcategory name" required>
        <br>
        <select v-model="subcategory.categoryName">
            <option v-for="category in categories" v-bind:value="category.categoryName">
                {{ category.categoryName }}
            </option>
        </select>
        <br>
        <button type="submit">Create subcategory</button>
    </form>
</template>

<script>
import addr from "../../../addresses.js"
import { reactive } from 'vue';
import { useRouter } from "vue-router"
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminNewSubcategoryView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            message: "",
            router: useRouter(),
            categories: [],
            subcategory: reactive({
                subcategoryName: "",
                categoryName: ""
            })
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch(`${addr.SERVER_ADDRESS}/api/categories/`, {
            headers: {"Content-Type": "application/json"}
        })

        this.categories = await response.json()
    },
    methods: {
        async createSubcategory() {
            const response = await fetch(`${addr.SERVER_ADDRESS}/admin/subcategory/new`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.subcategory)
            })

            const subcategoryResponse = await response.json()

            if(subcategoryResponse.status == 409)
                this.message = subcategoryResponse.message

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