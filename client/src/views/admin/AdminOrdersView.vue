<template>
	<DashboardHeaderComponent/>
	<div v-if="orders !== undefined">
		<div v-if="orders.length > 0">
			<div v-for="order in orders">
				<p>#{{ order.orderNumber }}</p>
				<p>{{ order.createdAt }}</p>
				<p>{{ order.customerEmail }}</p>
				<p>{{ order.orderStatus }}</p>
				<p>{{ order.orderTotal }}</p>
			</div>
		</div>
		<div v-else>
			<p>No orders</p>
		</div>
	</div>
	<div v-else>
		<p>Loading...</p>
	</div>
</template>

<script>
import DashboardHeaderComponent from "@/components/AdminSideMenuComponent.vue"
import { isUserAuthorized } from "@/modules/CommonModule"
import { credentialFetchRequestToServer } from "@/modules/FetchModule"
import { useRouter } from "vue-router"

export default {
	name: "AdminOrdersView",
	components: {
		DashboardHeaderComponent
	},
	data() {
		return {
			router: useRouter(),
			orders: undefined,
		}
	},
	async mounted() {
		if(!await isUserAuthorized())
			this.router.push("/admin/login")

		this.orders = await credentialFetchRequestToServer("GET", "/order/")
	}
}
</script>