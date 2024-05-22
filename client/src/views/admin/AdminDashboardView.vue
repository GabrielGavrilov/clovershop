<template>
    <DashboardHeaderComponent/>
    <div v-if="user !== undefined">
        <h2>Dashboard</h2>
        <p>Logged in as {{ user.firstName }} {{ user.lastName }}</p>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
    <div v-if="shopStatistics !== undefined">
        <p>{{ shopStatistics.totalOrders }} orders</p>
        <p>{{ shopStatistics.totalOrdersCompleted }} completed orders</p>
        <p>${{ price(shopStatistics.totalOrdersSum) }} in sales</p>
    </div>
</template>

<script>
import { formatPrice, isUserAuthorized } from "@/modules/CommonModule"
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"
import { useRouter } from "vue-router"
import { credentialFetchRequestToServer } from "@/modules/FetchModule"

export default {
    name: "AdminDashboardView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            user: undefined,
            shopStatistics: undefined,
        }
    },
    async mounted() {

        // undefined loading because user is not definded after authorization

        if(!await isUserAuthorized())
            await this.router.push("/admin/login")

        this.shopStatistics = await credentialFetchRequestToServer("GET","/order/statistics")
    },
    methods: {
        price: formatPrice
    }
}
</script>