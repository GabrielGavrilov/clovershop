<template>
    <DashboardHeaderComponent/>
    <main>
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
    </main>
</template>

<script>
import { formatPrice, isUserAuthorized } from "@/modules/CommonModule"
import DashboardHeaderComponent from "@/components/AdminSideMenuComponent.vue"
import AdminHeaderComponent from "@/components/AdminHeaderComponent.vue"
import { useRouter } from "vue-router"
import { credentialFetchRequestToServer } from "@/modules/FetchModule"

export default {
    name: "AdminDashboardView",
    components: {
        DashboardHeaderComponent,
        AdminHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            user: undefined,
            shopStatistics: undefined,
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            await this.router.push("/admin/login")

        this.shopStatistics = await credentialFetchRequestToServer("GET","/order/statistics")
        this.user = await credentialFetchRequestToServer("GET", "/auth/account")
    },
    methods: {
        price: formatPrice
    }
}
</script>