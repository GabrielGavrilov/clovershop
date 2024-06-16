<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <p>{{ message }}</p>
        <form v-on:submit.prevent="updateSubcategory()">
            <input v-model="subcategory.subcategoryName" type="text" required>
            <br>
            <button type="submit">Update</button>
        </form>
    </main>
</template>

<script>
import AdminHeaderComponent from "@/components/AdminHeaderComponent.vue";
import AdminSideMenuComponent from "@/components/AdminSideMenuComponent.vue"
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/modules/FetchModule";
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router"

export default {
    name: "AdminUpdateSubcategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            route: useRoute(),
            router: useRouter(),
            subcategory: reactive({
                subcategoryId: "",
                subcategoryName: ""
            })
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        const subcategoryInformation = await fetchRequestToServer("GET", `/api/subcategory/${this.route.params.subcategoryId}`);

        this.subcategory.subcategoryId = subcategoryInformation._id
        this.subcategory.subcategoryName = subcategoryInformation.subcategoryName
    },
    methods: {
        async updateSubcategory() {
            const subcategoryResponse = await credentialFetchRequestToServerWithBody("POST", "/admin/subcategory/update", this.subcategory)

            if(subcategoryResponse.status == 409)
                this.message = subcategoryResponse.message
            else
                await this.router.push("/admin/subcategories")
        }
    }
}
</script>
