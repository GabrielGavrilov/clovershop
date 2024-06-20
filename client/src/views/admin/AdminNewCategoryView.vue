<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin">
            <div class="admin-form-content">
                <p class="medium spacing-bottom-small">Create a new category</p>
                <p>{{ message }}</p>
                <div>
                    <form v-on:submit.prevent="createCategory()">
                        <div class="admin-form">
                            <p class="bold spacing-bottom-small-medium">General</p>
                            <div class="spacing-bottom-x-small">
                                <p>Name</p>
                            </div>
                            <div>
                                <input class="text-input" v-model="category.categoryName" type="text" required>
                            </div>
                            <div class="spacing-top-x-small spacing-bottom-x-small">
                                <p>Description</p>
                            </div>
                            <div>
                                <textarea class="text-input" v-model="category.categoryDescription" type="text" required>
                                </textarea>
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
        </div>
        
    </main>
</template>

<script>
import BaseStyle from "@/assets/styles/Base.css"
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import { isUserAuthorized } from "@/modules/CommonModule";
import { credentialFetchRequestToServerWithBody } from "@/modules/FetchModule";

export default {
    name: "AdminNewCategoryView",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            message: "",
            router: useRouter(),
            category: reactive({
                categoryName: '',
                categoryDescription: ''
            }),
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")
    },
    methods: {
        async createCategory() {
            const response = await credentialFetchRequestToServerWithBody("POST", "/admin/category/new", this.category)

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