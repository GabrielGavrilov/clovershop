<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="flexbox middle">
            <div class="admin-form-content">
                <p>{{ message }}</p>
                <div>
                    <p class="medium-text spacing-bottom-2">Create a new product</p>
                    <AdminProductForm/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeader.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenu.vue';
import { isUserAuthorized } from '@/common/functions.js';
import AdminProductForm from "@/components/AdminProductForm.vue"

export default {
    name: "AdminNewProduct",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent,
        AdminProductForm
    },
    data() {
        return {
            message: "",
            router: useRouter()
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")
    }
}
</script>

<style src="@/assets/styles/Admin.css">
</style>