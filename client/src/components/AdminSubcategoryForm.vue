<template>
    <form v-on:submit.prevent="submit()">
        <div class="admin-form">
            <p class="bold spacing-bottom-3">General</p>
            <div class="spacing-bottom-1">
                <p>Name</p>
            </div>
            <div>
                <input class="text-input" v-model="subcategory.subcategoryName" type="text" required>
            </div>
            <div v-if="!this.editing"class="spacing-top-1 spacing-bottom-1">
                <p>Category</p>
            </div>
            <div v-if="!this.editing">
                <select class="text-input" v-model="subcategory.categoryName">
                    <option v-for="category in categories" v-bind:value="category.categoryName">
                        {{ category.categoryName }}
                    </option>
                </select>
            </div>
        </div>
        <div class="flexbox spacing-top-2">
            <div class="right">
                <button class="btn-green" type="submit">Save</button>
            </div>
        </div>
    </form>
</template>

<script>
import clovershop from "@/assets/styles/Clovershop.css"
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/modules/FetchModule";
import { reactive } from "vue";
import { useRouter } from "vue-router"

export default {
    name: "AdminSubcategoryForm",
    props: ["subcategoryId"],
    data() {
        return {
            router: useRouter(),
            categories: [],
            editing: false,
            subcategory: reactive({
                subcategoryName: "",
                categoryName: ""
            })
        }
    },
    created() {
        if(this.subcategoryId) {
            this.loadSubcategory()
        }
        else {
            const unwatch = this.$watch("subcategoryId", function() {
                this.loadSubcategory()
                unwatch()
            })
        }
    },
    async mounted() {
        this.categories = (await fetchRequestToServer("GET", "/api/categories")).data
    },
    methods: {
        async loadSubcategory() {
            if(this.subcategoryId !== undefined) {
                this.editing = true
                const subcategoryInformation = (await fetchRequestToServer("GET", `/api/subcategory/${this.subcategoryId}`)).data

                this.subcategory.subcategoryName = subcategoryInformation.subcategoryName
                this.subcategory.subcategoryDescription = subcategoryInformation.subcategoryDescription
            }
        },
        submit() {
            if(this.editing)
                this.updateSubcategory()
            else
                this.createSubcategory()
        },
        async createSubcategory() {
            const response = await credentialFetchRequestToServer("POST", "/admin/subcategory/", this.subcategory)
        
            if(response.status == 409)
                console.log(response.data.err)
            else
                await this.router.push("/admin/subcategories")
        },
        async updateSubcategory() {
            const response = await credentialFetchRequestToServerWithBody("PUT", "/admin/subcategory/", this.subcategory)
            
            if(response.status == 409)
                console.log(response.data.err)
            else
                await this.router.push("/admin/subcategories")
        }
    }
}
</script>

<style scoped src="@/assets/styles/AdminMain.css">
</style>