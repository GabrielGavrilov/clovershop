<template>
	<DashboardHeaderComponent/>
</template>

<script>
	import DashboardHeaderComponent from "@/components/AdminSideMenuComponent"
	import { useRouter } from "vue-router"

	export default {
		name: "AdminOrderInformationView",
		components: {
			DashboardHeaderComponent
		}
	}
</script>