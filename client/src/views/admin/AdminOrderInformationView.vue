<template>
	<DashboardHeaderComponent/>
</template>

<script>
	import config from "../../../../config/index.js"
	import DashboardHeaderComponent from "@/components/DashboardHeaderComponent"
	import { useRouter } from "vue-router"

	export default {
		name: "AdminOrderInformationView",
		components: {
			DashboardHeaderComponent
		},
		data() {
			return {
				server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
			}
		}
	}
</script>