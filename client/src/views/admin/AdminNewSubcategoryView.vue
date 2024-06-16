<template>
    <DashboardHeaderComponent/>
    <main>
        <p>Subcategories</p>
        <p>{{ message }}</p>
        <form v-on:submit.prevent="createSubcategory()">
            <input v-model="subcategory.subcategoryName" type="text" placeholder="Subcategory name" required>
            <br>
            <select v-model="subcategory.categoryName">
                <option v-for="category in categories" v-bind:value="category.categoryName">
                    {{ category.categoryName }}
                </option>
            </select>
            <br>
            <button type="submit">Create subcategory</button>
        </form>
    </main>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from "vue-router"
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import { isUserAuthorized } from '@/modules/CommonModule';
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from '@/modules/FetchModule';

export default {
    name: "AdminNewSubcategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            message: "",
            router: useRouter(),
            categories: [],
            subcategory: reactive({
                subcategoryName: "",
                categoryName: ""
            }),
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.categories = await fetchRequestToServer("GET", "/api/categories")
    },
    methods: {
        async createSubcategory() {
            const subcategoryResponse = await credentialFetchRequestToServerWithBody("POST", "/admin/subcategory/new", this.subcategory)

            if(subcategoryResponse.status == 409)
                this.message = subcategoryResponse.message
            else
                await this.router.go()
        }
    }
}
</script>