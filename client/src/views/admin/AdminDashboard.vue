<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        
        <div v-if="user !== undefined">
            <div class="admin-content">
                <div class="flexbox">
                    <p class="left medium-text bold">Dashboard</p>
                    <p class="right">Logged in as: {{ user.firstName }} {{ user.lastName }} ({{ user.email }})</p>
                </div>
                <div v-if="shopStatistics !== undefined" class="admin-section padding-1">
                    <p class="spacing-bottom-1">{{ shopStatistics.totalOrders }} total orders</p>
                    <p class="spacing-bottom-1">{{ shopStatistics.totalOrdersCompleted }} completed orders</p>
                    <p class="spacing-bottom-1">${{ price(shopStatistics.totalOrdersSum) }} in sales</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </main>
</template>

<script>
import { formatPrice, isUserAuthorized } from "@/common/functions.js"
import AdminSideMenuComponent from "@/components/AdminSideMenu.vue"
import AdminHeaderComponent from "@/components/AdminHeader.vue"
import { useRouter } from "vue-router"
import { credentialFetchRequestToServer } from "@/common/requests.js"

export default {
    name: "AdminDashboardView",
    components: {
        AdminSideMenuComponent,
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

        this.shopStatistics = (await credentialFetchRequestToServer("GET","/order/statistics")).data
        this.user = (await credentialFetchRequestToServer("GET", "/auth/account")).data
    },
    methods: {
        price: formatPrice
    }
}
</script>