<template>
	<AdminHeaderComponent/>
	<AdminSideMenuComponent/>
	<main>
		<div class="admin-content">
			<div class="flexbox">
				<div class="left">
					<p class="medium-text bold">Orders</p>
				</div>
			</div>
			<div class="admin-section">
				<div v-if="orders !== undefined">
					<div v-if="orders.length > 0">
						<ul class="admin-section-ul">
							<li>
								<div class="admin-section-item flexbox">
									<p class="left admin-section-title">Number</p>
									<p class="left admin-section-title">Email</p>
									<p class="left admin-section-title">Amount</p>
									<p class="left admin-section-title">Status</p>
								</div>
								<div class="hr-line-light"></div>
							</li>
							<li v-for="order in orders">
								<div class="admin-section-item">
									<div class="flexbox">
										<a class="left admin-link" v-bind:href="$router.resolve({name: 'Order information', params: {orderId: order._id}}).href">
											#{{ order.orderNumber }}
										</a>
										<p class="left spacing-right-1">{{ order.customerEmail }}</p>
										<p class="left spacing-right-1">${{ price(order.orderTotal) }}</p>
										<p class="left spacing-right-1">{{ order.orderStatus }}</p>
									</div>
								</div>
								<div class="hr-line-light"></div>
							</li>
							<li>
								<div class="admin-section-item flexbox">
									<p class="right">{{ orderCount }} orders</p>
								</div>
							</li>
						</ul>
					</div>
					<div v-else>
						<p>No orders</p>
					</div>
				</div>
				<div v-else>
					<p>Loading...</p>
				</div>
			</div>
		</div>
	</main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeader.vue"
import AdminSideMenuComponent from "@/components/AdminSideMenu.vue"
import { isUserAuthorized, formatPrice } from "@/common/functions.js"
import { credentialFetchRequestToServer } from "@/common/requests.js"
import { useRouter } from "vue-router"

export default {
	name: "AdminOrdersView",
	components: {
		AdminHeaderComponent,
		AdminSideMenuComponent
	},
	data() {
		return {
			router: useRouter(),
			orders: undefined,
			orderCount: 0
		}
	},
	async mounted() {
		if(!await isUserAuthorized())
			this.router.push("/admin/login")

		this.orders = (await credentialFetchRequestToServer("GET", "/order/")).data
		this.orderCount = this.orders.length
	},
	methods: {
		price: formatPrice
	}
}
</script>