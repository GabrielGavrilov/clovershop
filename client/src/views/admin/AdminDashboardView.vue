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
        <p>${{ formatPrice(shopStatistics.totalOrdersSum) }} in sales</p>
    </div>
</template>

<script>
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"
import config from "../../../../config/index.js"
import { useRouter } from "vue-router"

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
            server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        await this.authorizeUser()
        this.shopStatistics = await this.getShopStatistics()
    },
    methods: {
        async authorizeUser() {
            const response = await fetch(`${this.server}/auth/account`, {
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

            const authResponse = await response.json()

            if(authResponse.status == 401 || authResponse.status == 400)
                await this.router.push("/admin/login")

            else
                this.user = authResponse
        },
        async getShopStatistics() {
            const response = await fetch(`${this.server}/order/statistics`, {
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

            const shopStatsResponse = await response.json()
            return shopStatsResponse
        },
        formatPrice(price) {
            const priceString = String(price)
            const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
            return formattedPrice
        }
    }
}
</script>