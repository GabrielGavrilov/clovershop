<template>
    <form v-on:submit.prevent="submit()">
        <div class="admin-form">
            <p class="bold spacing-bottom-3">General</p>
            <div class="spacing-bottom-1">
                <p>Name</p>
            </div>
            <div>
                <input class="text-input" v-model="category.categoryName" type="text" required>
            </div>
            <div class="spacing-top-1 spacing-bottom-1">
                <p>Description</p>
            </div>
            <div>
                <textarea class="text-input" v-model="category.categoryDescription" type="text" required>
                </textarea>
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
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/common/requests.js"
import { reactive } from "vue"
import { useRouter } from "vue-router"

export default {
    name: "AdminCategory",
    props: ["categoryId"],
    data() {
        return {
            router: useRouter(),
            editing: false,
            category: reactive({
                categoryName: "",
                categoryDescription: ""
            })
        }
    },
    created() {
        if(this.categoryId) {
            this.loadCategory()
        }
        else {
            const unwatch = this.$watch("categoryId", function() {
                this.loadCategory()
                unwatch()
            })
        }
    },
    methods: {
        async loadCategory() {
            if(this.categoryId !== undefined) {
                this.editing = true
                const categoryInformation = await fetchRequestToServer("GET", `/api/category/${this.$props.categoryId}`)

                this.category.categoryId = categoryInformation.data._id
                this.category.categoryName = categoryInformation.data.categoryName
                this.category.categoryDescription = categoryInformation.data.categoryDescription
            }
        },
        async submit() {   
            const response = await this.createOrUpdateCategory()

            if(response.status == 409)
                console.log(response.data.err)
            else
                await this.router.push("/admin/categories")
        },
        // this could be cleaner
        async createOrUpdateCategory() {
            if(this.editing) {
                const response = await credentialFetchRequestToServerWithBody("PUT", "/admin/category/", this.category)
                return response
            }
            else {
                const response = await credentialFetchRequestToServerWithBody("POST", "/admin/category/", this.category)
                return response
            }
        }
    }
}
</script>

<style scoped src="@/assets/styles/Admin.css">
</style>