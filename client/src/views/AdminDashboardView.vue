<template>
    <DashboardHeaderComponent/>
    <h2>Dashboard</h2>
    <p>Logged in as {{ adminFullName }}</p>
</template>

<script>
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"

// TODO: check if user is not logged in.

export default {
    name: "AdminDashboardView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            adminFullName: ""
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/auth/account", {
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        const adminInformation = await response.json()
        this.adminFullName = `${adminInformation.firstName} ${adminInformation.lastName}`
    }
}
</script>