<template>
	<AdminHeaderComponent/>
	<AdminSideMenuComponent/>
	<main>
	</main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeader.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenu"
import { useRouter } from "vue-router"

export default {
	name: "AdminOrderInformationView",
	components: {
		AdminHeaderComponent,
		AdminSideMenuComponent
	}
}
</script>