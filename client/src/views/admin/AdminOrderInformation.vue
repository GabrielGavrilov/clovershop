<template>
	<AdminHeaderComponent/>
	<AdminSideMenuComponent/>
	<main>
		<div class="admin">
			<div v-if="order !== undefined">
				<div class="admin-form-content">
					<p class="medium-text spacing-bottom-2">Order #{{ this.order.orderNumber }}</p>
					<div>
						<form>

						</form>
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
import { isUserAuthorized } from "@/common/functions";
import { credentialFetchRequestToServer } from "@/common/requests";
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
			order: undefined
		}
	},
	async mounted() {
		if(!await isUserAuthorized())
			this.router.push("/admin/login")

		this.order = (await credentialFetchRequestToServer("GET", `/order/${this.route.params.orderId}`)).data
		console.log(this.order)
	}
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>