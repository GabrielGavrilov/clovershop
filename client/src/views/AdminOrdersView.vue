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
	import addr from "../../../addresses.js"
	import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"
	import { useRouter } from "vue-router"

	export default {
		name: "AdminOrdersView",
		components: {
			DashboardHeaderComponent
		},
		data() {
			return {
				router: useRouter(),
				orders: undefined
			}
		},
		async mounted() {
			await this.authorizeUser()

			const ordersResponse = await fetch(`${addr.SERVER_ADDRESS}/order/`, {
				headers: {"Content-Type": "application/json"},
				credentials: "include"
			})

			this.orders = await ordersResponse.json()
		},
		methods: {
			async authorizeUser() {
				const response = await fetch(`${addr.SERVER_ADDRESS}/auth/account`, {
					headers: {"Content-Type": "application/json"},
					credentials: "include"
				})

				const authResponse = await response.json()

				if(authResponse.status == 401 || authResponse == 400)
					this.router.push("/admin/login")
			}
		}
	}
</script>