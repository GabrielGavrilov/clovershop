<template>
    <DashboardHeaderComponent/>
    <div v-if="user !== undefined">
        <h2>Dashboard</h2>
        <p>Logged in as {{ user.firstName }} {{ user.lastName }}</p>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"
import addr from "../../../addresses.js"
import { useRouter } from "vue-router"

export default {
    name: "AdminDashboardView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            user: undefined
        }
    },
    async mounted() {
        const response = await fetch(`${addr.SERVER_ADDRESS}/auth/account`, {
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        const authResponse = await response.json()

        console.log(authResponse);

        if(authResponse.status == 401 || authResponse.status == 400)
            await this.router.push("/admin/login")

        else
            this.user = authResponse
    }
}
</script>