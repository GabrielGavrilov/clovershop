<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="flexbox middle">
            <div class="admin-form-content">
                <p class="medium-text spacing-bottom-2">Create a new category</p>
                <p>{{ message }}</p>
                <AdminCategoryForm />
            </div>
        </div>
        
    </main>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeader.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenu.vue';
import AdminCategoryForm from "@/components/AdminCategoryForm.vue"
import { isUserAuthorized } from "@/common/functions.js";

export default {
    name: "AdminNewCategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent,
        AdminCategoryForm
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