<template>
	<DashboardHeaderComponent/>
</template>

<script>
	import addr from "../../../addresses.js"
	import DashboardHeaderComponent from "@/components/DashboardHeaderComponent"
	import { useRouter } from "vue-router"

	export default {
		name: "AdminOrderInformationView",
		components: {
			DashboardHeaderComponent
		}
	}
</script>