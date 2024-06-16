<template>
	<AdminHeaderComponent/>
	<AdminSideMenuComponent/>
	<main>
	</main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeaderComponent.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenuComponent"
import { useRouter } from "vue-router"

export default {
	name: "AdminOrderInformationView",
	components: {
		AdminHeaderComponent,
		AdminSideMenuComponent
	}
}
</script>