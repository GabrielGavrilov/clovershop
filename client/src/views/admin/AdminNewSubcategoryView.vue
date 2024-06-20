<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin-content">
            <p>{{ message }}</p>
            <div>
                <p class="medium spacing-bottom-small">Create a new subcategory</p>
                <form v-on:submit.prevent="createSubcategory()">
                    <div class="admin-form">
                        <p class="bold spacing-bottom-small-medium">General</p>
                        <div class="spacing-bottom-x-small">
                            <p>Name</p>
                        </div>
                        <div>
                            <input class="text-input" v-model="subcategory.subcategoryName" type="text" required>
                        </div>
                        <div class="spacing-top-x-small spacing-bottom-x-small">
                            <p>Category</p>
                        </div>
                        <div>
                            <select class="text-input" v-model="subcategory.categoryName">
                                <option v-for="category in categories" v-bind:value="category.categoryName">
                                    {{ category.categoryName }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="flexbox spacing-top-small">
                        <div class="right">
                            <button class="btn-green" type="submit">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import BaseStyle from "@/assets/styles/Base.css"
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

        this.categories = (await fetchRequestToServer("GET", "/api/categories")).data
    },
    methods: {
        async createSubcategory() {
            const response = await credentialFetchRequestToServerWithBody("POST", "/admin/subcategory/new", this.subcategory)

            if(response.status == 409)
                this.message = response.data.err
            else
                await this.router.go()
        }
    }
}
</script>

<style scoped src="@/assets/styles/AdminMain.css">
</style>