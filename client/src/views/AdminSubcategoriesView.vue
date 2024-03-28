<template>
    <DashboardHeaderComponent/>
    <a v-bind:href="$router.resolve({name: 'New subcategory'}).href">
        <button>Create a new Subcategory</button>
    </a>
    <ul>
        <li v-for="subcategory in subcategories">
            <a v-bind:href="$router.resolve({name: 'Update subcategory', params: {subcategoryId: subcategory._id}}).href">
                {{ subcategory.subcategoryName }}
            </a>
        </li>
    </ul>
</template>

<script>
import addr from "../../../addresses.js"
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
            subcategories: []
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch(`${addr.SERVER_ADDRESS}/api/subcategories/`, {
            headers: {"Content-Type": "application/json"}
        })

        this.subcategories = await response.json()
    },
    methods: {
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
