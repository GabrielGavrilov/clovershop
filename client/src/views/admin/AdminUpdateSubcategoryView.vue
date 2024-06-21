<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin">
            <div class="admin-form-content">
                <p>{{ message }}</p>
                <div>
                    <p class="medium spacing-bottom-small">Create a new subcategory</p>
                    <AdminSubcategoryForm v-bind:subcategoryId="this.subcategoryId"/>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeaderComponent.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenuComponent.vue"
import AdminSubcategoryForm from "@/components/AdminSubcategoryForm.vue";
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/modules/FetchModule";
import { reactive } from "vue";
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
