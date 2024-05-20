<template>
    <DashboardHeaderComponent/>
    <a v-bind:href="$router.resolve({name: 'New subcategory'}).href">
        <button>Create a new Subcategory</button>
    </a>
    <div v-if="subcategories !== undefined">
        <div v-if="subcategories.length > 0">
            <ul>
                <li v-for="subcategory in subcategories">
                    <a v-bind:href="$router.resolve({name: 'Update subcategory', params: {subcategoryId: subcategory._id}}).href">
                        {{ subcategory.subcategoryName }}
                    </a>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>No subcategories</p>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import config from "../../../../config/index.js"
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';
import { useRouter } from 'vue-router';

export default {
    name: "AdminSubcategoriesView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter,
            subcategories: undefined,
            server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch(`${this.server}/api/subcategories/`, {
            headers: {"Content-Type": "application/json"}
        })

        this.subcategories = await response.json()
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
