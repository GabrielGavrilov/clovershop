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
        const response = await fetch("http://localhost:3000/auth/account", {
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        const authResponse = await response.json()

        if(authResponse.status == 401)
            await this.router.push("/admin/login")

        else
            this.user = authResponse
    }
}
</script>