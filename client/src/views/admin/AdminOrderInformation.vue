<template>
	<AdminHeaderComponent/>
	<AdminSideMenuComponent/>
	<main>
		<div class="flexbox middle">
			<div v-if="order !== undefined" class="admin-form-content">
				<p class="medium-text spacing-bottom-2">Order #{{ this.order.orderNumber }}</p>
				<div>
					<div class="admin-form spacing-bottom-2">
						<p class="bold spacing-bottom-3">Items</p>
						<div v-for="item in items">
							<div class="flexbox spacing-top-2 spacing-bottom-2">
								<p class="left">{{ item.product.productName }}</p>
								<p class="middle">${{ price(item.product.productPrice) }} x {{ item.quantity }}</p>
								<p class="right">${{ price(item.product.productPrice * item.quantity) }}</p>
							</div>
						</div>
					</div>
					<div class="admin-form spacing-bottom-2">
						<p class="bold spacing-bottom-3">Customer information</p>
						<div class="spacing-bottom-1">
							<p>Full Name</p>
						</div>
						<div>
							<input class="text-input" disabled v-bind:value="order.customerFirstName + ' ' + order.customerLastName">
						</div>
						<div class="spacing-top-1 spacing-bottom-1">
							<p>Email</p>
						</div>
						<div>
							<input class="text-input" disabled v-bind:value="order.customerEmail">
						</div>						
					</div>
					<div class="admin-form">
						<p class="bold spacing-bottom-3">Shipping address</p>
						<div class="spacing-bottom-1">
							<p>Address</p>
						</div>
						<div>
							<input class="text-input" disabled v-bind:value="order.customerAddress">
						</div>
						<div class="spacing-top-1 spacing-bottom-1">
							<p>City and Province</p>
						</div>
						<div>
							<input class="text-input" disabled v-bind:value="order.customerCity + ', ' + order.customerProvince">
						</div>
						<div class="spacing-top-1 spacing-bottom-1">
							<p>Postal Code</p>
						</div>
						<div>
							<input class="text-input" disabled v-bind:value="order.customerPostalCode">
						</div>
					</div>
				</div>
			</div>
			<div v-else>
				<p>Loading...</p>
			</div>
		</div>
	</main>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { isUserAuthorized, formatPrice } from "@/common/functions";
import { credentialFetchRequestToServer, fetchRequestToServer } from "@/common/requests";
import AdminHeaderComponent from "@/components/AdminHeader.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenu"
import { useRoute, useRouter } from "vue-router"

export default {
	name: "AdminOrderInformationView",
	components: {
		AdminHeaderComponent,
		AdminSideMenuComponent
	},
	data() {
		return {
			router: useRouter(),
			route: useRoute(),
			order: undefined,
			items: []
		}
	},
	async mounted() {
		if(!await isUserAuthorized())
			this.router.push("/admin/login")

		const orderRequest = await credentialFetchRequestToServer("GET", `/order/${this.route.params.orderId}`)
		this.order = orderRequest.data
		const orderProducts = this.order.orderProducts

		for(let i = 0; i < orderProducts.length; i++) {
			const product = await this.getProductInformation(orderProducts[i].productId)
			const quantity = orderProducts[i].quantity;
		
			const orderItem = {
				product: product,
				quantity: quantity
			}
		
			this.items.push(orderItem)	
		}
	},
	methods: {
		async getProductInformation(productId) {
			return (await fetchRequestToServer("GET", `/api/product/${productId}`)).data
		},
		price: formatPrice
	}
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>