<template>
    <DashboardHeaderComponent/>
    <p>{{ message }}</p>
    <form v-on:submit.prevent="updateSubcategory()">
        <input v-model="subcategory.subcategoryName" type="text" required>
        <br>
        <button type="submit">Update</button>
    </form>
</template>

<script>
import addr from "../../../addresses.js"
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router"

export default {
    name: "AdminUpdateSubcategoryView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            route: useRoute(),
            router: useRouter(),
            subcategory: reactive({
                subcategoryId: "",
                subcategoryName: ""
            })
        }
    },
    async mounted() {
        await this.authorizeUser()

        const response = await fetch(`${addr.SERVER_ADDRESS}/api/subcategory/${this.route.params.subcategoryId}`, {
            headers: {"Content-Type": "application/json"}
        })

        const subcategoryInformation = await response.json();
        this.subcategory.subcategoryId = subcategoryInformation._id
        this.subcategory.subcategoryName = subcategoryInformation.subcategoryName
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
        },
        async updateSubcategory() {
            const response = await fetch(`${addr.SERVER_ADDRESS}/admin/subcategory/update`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.subcategory)
            })

            const subcategoryResponse = await response.json()

            if(subcategoryResponse.status == 409)
                this.message = subcategoryResponse.message

            else
                await this.router.push("/admin/subcategories")
        }
    }
}
</script>
