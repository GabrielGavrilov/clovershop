<template>
    <form v-on:submit.prevent="submit($event)">
        <div v-if="!this.editing" class="admin-form">
            <p class="bold spacing-bottom-small-medium">Product picture</p>
            <div>
                <input type="file" required>
            </div>
        </div>
        <div class="admin-form spacing-top-small-medium">
            <p class="bold spacing-bottom-small-medium">General</p>
            <div class="spacing-bottom-x-small">
                <p>Name</p>
            </div>
            <div>
                <input class="text-input" v-model="product.productName" type="text" required>
            </div>
            <div class="spacing-top-x-small spacing-bottom-x-small">
                <p>Description</p>
            </div>
            <div>
                <textarea class="text-input" v-model="product.productDescription" type="text" required>
                </textarea>
            </div>
            <div class="spacing-top-x-small spacing-bottom-x-small">
                <p>Price</p>
            </div>
            <div>
                <input class="text-input" v-model="product.productPrice" type="number" required>
            </div>
            <div class="spacing-top-x-small spacing-bottom-x-small">
                <p>Quantity</p>
            </div>
            <div>
                <input class="text-input" v-model="product.productQuantity" type="number" required>
            </div>
            
        </div>
        <div v-if="!this.editing" class="admin-form spacing-top-small-medium">
            <p class="bold spacing-bottom-small-medium">Attributes</p>
            <div class="spacing-bottom-x-small">
                <p>Category</p>
            </div>
            <div>
                <select class="text-input" v-model="product.categoryName">
                    <option v-for="category in categories" v-bind:value="category.categoryName">
                        {{ category.categoryName }}
                    </option>
                </select>
            </div>
            <div class="spacing-top-x-small spacing-bottom-x-small">
                <p>Subcategory</p>
            </div>
            <div>
                <input class="text-input" v-model="product.subcategoryName" type="text" required>
            </div>
        </div>
        <div class="flexbox spacing-top-small-medium">
            <div class="right">
                <button class="btn-green" type="submit">Save</button>
            </div>
        </div>
    </form>
</template>

<script>
import BaseStyle from "@/assets/styles/Base.css"
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from "@/modules/FetchModule.js"
import { reactive } from "vue"
import { useRouter } from "vue-router"

export default {
    name: "AdminProductForm",
    props: ["productId"],
    data() {
        return {
            router: useRouter(),
            editing: false,
            categories: [],
            product: reactive({
                productName: "",
                productDescription: "",
                productPrice: "",
                productQuantity: "",
                categoryName: "",
                subcategoryName: ""
            })
        }
    },
    created() {
        if(this.productId) {
            this.loadProduct()
        }
        else {
            const unwatch = this.$watch("productId", function() {
                this.loadProduct()
                unwatch()
            })
        }
    },
    async mounted() {
        this.categories = (await fetchRequestToServer("GET", "/api/categories")).data
    },
    methods: {
        async loadProduct() {
            if(this.productId !== undefined) {
                this.editing = true
                const productInformation = (await fetchRequestToServer("GET", `/api/product/${this.productId}`)).data
            
                this.product.productName = productInformation.productName
                this.product.productDescription = productInformation.productDescription
                this.product.productPrice = productInformation.productPrice
                this.product.productQuantity = productInformation.productQuantity
            }
        },
        async submit(event) {
            if(this.editing)
                this.updateProduct()
            else
                this.createProduct(event)
        },
        async createProduct(event) {
            const formData = new FormData()

            formData.append("file", event.target[0].files[0])
            formData.append("productName", this.product.productName)
            formData.append("productDescription", this.product.productDescription)
            formData.append("productPrice", this.product.productPrice)
            formData.append("productQuantity", this.product.productQuantity)
            formData.append("categoryName", this.product.categoryName)
            formData.append("subcategoryName", this.product.subcategoryName)

            const response = await credentialFetchRequestToServerWithBody("POST", "/admin/product/", formData)

            if(response.status == 409)
                console.log(response.data.err)
            else
                await this.router.push("/admin/products")
        },
        async updateProduct() {
            const response = await credentialFetchRequestToServerWithBody("PUT", "/admin/product/", this.product)
        
            if(response.status == 409)
                console.log(response.data.err)
            else
                await this.router.push("/admin/products")
        }
    }
}
</script>

<style scoped src="@/assets/styles/AdminMain.css">
</style>