<template>
    <h2>Dashboard</h2>
    <p>Logged in as {{ adminFullName }}</p>
</template>

<script>
import { onMounted, ref } from "vue"

export default {
    name: "AdminDashboardView",
    setup() {
        const adminFullName = ref("NULL")

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