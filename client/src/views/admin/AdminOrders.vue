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
							<li v-for="order in orders">
								<div class="admin-section-item">
									<div class="flexbox">
										<p class="left">#{{ order.orderNumber }}</p>
										<p class="left">{{ order.customerEmail }}</p>
										<p class="left">${{ price(order.orderTotal) }}</p>
										<p class="left">{{ order.orderStatus }}</p>
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
						<!-- <div v-for="order in orders">
							<p>#{{ order.orderNumber }}</p>
							<p>{{ order.createdAt }}</p>
							<p>{{ order.customerEmail }}</p>
							<p>{{ order.orderStatus }}</p>
							<p>{{ order.orderTotal }}</p>
						</div> -->
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
import { credentialFetchRequestToServer } from "@/common/fetch.js"
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