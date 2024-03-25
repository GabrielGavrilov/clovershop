<template>
	<DashboardHeaderComponent/>
	<div v-if="orders !== undefined">
		<li v-for="order in orders">
			<a>
				{{ order._id }}
			</a>
		</li>
	</div>
	<div v-else>
		<p>Loading...</p>
	</div>
</template>

<script>
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

			const ordersResponse = await fetch("http://localhost:3000/order/", {
				headers: {"Content-Type": "application/json"},
				credentials: "include"
			})

			this.orders = await ordersResponse.json()
		},
		methods: {
			async authorizeUser() {
				const response = await fetch("http://localhost:3000/auth/account", {
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