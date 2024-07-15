<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin">
            <div class="admin-form-content">
                <p class="medium-text spacing-bottom-2">Update category</p>
                <p>{{ message }}</p>
                <div>
                    <AdminCategoryForm v-bind:categoryId="categoryId"/>
                </div>
            </div>
        </div>
        
    </main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeaderComponent.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenuComponent.vue"
import AdminCategoryForm from "@/components/AdminCategoryForm.vue";
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/modules/FetchModule";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
    name: "AdminUpdateCategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent,
        AdminCategoryForm
    },
    data() {
        return {
            message: "",
            categoryId: "",
            router: useRouter(),
            route: useRoute()
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.categoryId = this.route.params.categoryId
    }
}
</script>
