<template>
    <DashboardHeaderComponent/>
    <div v-if="categories !== undefined">
        <a v-bind:href="$router.resolve({name: 'New category'}).href">
            <button>Create a new category</button>
        </a>
        <ul>
            <li v-for="category in categories">
                <a v-bind:href="$router.resolve({name: 'Update category', params: {categoryId: category._id}}).href">
                    {{ category.categoryName }}
                </a>
            </li>
        </ul>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';
import { useRouter } from "vue-router"

export default {
    name: "AdminCategoriesView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            categories: undefined
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch("http://localhost:3000/api/categories/", {
            headers: {"Content-Type": "application/json"}    
        })

        this.categories = await response.json()
    },
    methods: {
        async authorizeUser() {
            const response = await fetch("http://localhost:3000/auth/account", {
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

            const authResponse = await response.json()

            if(authResponse.status == 401)
                this.router.push("/admin/login")
        }
    }
}
</script>