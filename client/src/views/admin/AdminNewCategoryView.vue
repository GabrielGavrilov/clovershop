<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin">
            <div class="admin-form-content">
                <p class="medium spacing-bottom-small">Create a new category</p>
                <p>{{ message }}</p>
                <AdminCategoryForm />
            </div>
        </div>
        
    </main>
</template>

<script>
import BaseStyle from "@/assets/styles/Base.css"
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import AdminCategoryForm from "@/components/AdminCategoryForm.vue"
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody } from "@/modules/FetchModule";

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

<style src="@/assets/styles/AdminMain.css">
</style>