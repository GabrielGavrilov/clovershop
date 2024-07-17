<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="flexbox middle">
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
import AdminHeaderComponent from "@/components/AdminHeader.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenu.vue"
import AdminCategoryForm from "@/components/AdminCategoryForm.vue";
import { isUserAuthorized } from "@/common/functions.js";
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
