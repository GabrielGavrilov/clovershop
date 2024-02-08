<template>
    <DashboardHeaderComponent/>
    <h2>Dashboard</h2>
    <p>Logged in as {{ adminFullName }}</p>
</template>

<script>
import { onMounted, ref } from "vue"
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"

export default {
    name: "AdminDashboardView",
    components: {
        DashboardHeaderComponent
    },
    setup() {
        let adminFullName = ref()

        // TODO: authentication

        onMounted(async function() {
            const response = await fetch("http://localhost:3000/auth/account", {
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

            const adminInformation = await response.json()
            adminFullName.value = adminInformation.firstName + " " + adminInformation.lastName
        })

        return {
            adminFullName
        }
    }
}
</script>