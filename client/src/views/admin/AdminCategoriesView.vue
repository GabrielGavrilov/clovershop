<template>
    <DashboardHeaderComponent/>
    <a v-bind:href="$router.resolve({name: 'New category'}).href">
        <button>Create a new category</button>
    </a>
    <div v-if="categories !== undefined">
        <div v-if="categories.length > 0">
            <ul>
                <li v-for="category in categories">
                    <a v-bind:href="$router.resolve({name: 'Update category', params: {categoryId: category._id}}).href">
                        {{ category.categoryName }}
                    </a>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No categories</p>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';
import config from "../../../../config/index.js"
import { useRouter } from "vue-router"


export default {
    name: "AdminCategoriesView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            categories: undefined,
            server: `${config.SERVER_PROTOCOL}://${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch(`${this.server}/api/categories/`, {
            headers: {"Content-Type": "application/json"}    
        })

        this.categories = await response.json()
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
        }
    }
}
</script>