<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="flexbox middle">
            <div class="admin-form-content">
                <p>{{ message }}</p>
                <div>
                    <p class="medium-text spacing-bottom-2">Update subcategory</p>
                    <AdminSubcategoryForm v-bind:subcategoryId="this.subcategoryId"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeader.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenu.vue"
import AdminSubcategoryForm from "@/components/AdminSubcategoryForm.vue";
import { isUserAuthorized } from "@/common/functions.js";
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/common/requests.js";
import { useRoute, useRouter } from "vue-router"

export default {
    name: "AdminUpdateSubcategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent,
        AdminSubcategoryForm
    },
    data() {
        return {
            route: useRoute(),
            router: useRouter(),
            subcategoryId: ""
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.subcategoryId = this.route.params.subcategoryId
    },
    methods: {
        async updateSubcategory() {
            const response = await credentialFetchRequestToServerWithBody("POST", "/admin/subcategory/update", this.subcategory)

            if(response.status == 409)
                this.message = response.data.err
            else
                await this.router.push("/admin/subcategories")
        }
    }
}
</script>
