<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin">
            <div class="admin-form-content">
                <p>{{ message }}</p>
                <div>
                    <p class="medium-text spacing-bottom-3">Create a new product</p>
                    <AdminProductForm/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from '@/modules/FetchModule';
import { isUserAuthorized } from '@/modules/CommonModule';
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

<style src="@/assets/styles/AdminMain.css">
</style>