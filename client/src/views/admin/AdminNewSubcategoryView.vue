<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin">
            <div class="admin-form-content">
                <p>{{ message }}</p>
                <div>
                    <p class="medium-text spacing-bottom-2">Create a new subcategory</p>
                    <AdminSubcategoryForm/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { reactive } from 'vue';
import { useRouter } from "vue-router"
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import AdminSubcategoryForm from "@/components/AdminSubcategoryForm.vue"
import { isUserAuthorized } from '@/modules/CommonModule';
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from '@/modules/FetchModule';

export default {
    name: "AdminNewSubcategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent,
        AdminSubcategoryForm
    },
    data() {
        return {
            message: "",
            router: useRouter(),
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