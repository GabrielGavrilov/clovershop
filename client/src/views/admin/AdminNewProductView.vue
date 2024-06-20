<template>
    <AdminHeaderComponent/>
    <AdminSideMenuComponent/>
    <main>
        <div class="admin-content">
            <p>{{ message }}</p>
            <div>
                <p class="medium spacing-bottom-small-medium">Create a new product</p>
                <form v-on:submit.prevent="createProduct($event)">
                    <div class="admin-form">
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
                    <div class="admin-form spacing-top-small-medium">
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
                            <input class="text-input" v-model="product.subcategoryName" type="text" placeholder="Subcategory name" required>
                        </div>
                    </div>
                    <div class="flexbox spacing-top-small-medium">
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
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from '@/modules/FetchModule';
import { isUserAuthorized } from '@/modules/CommonModule';

export default {
    name: "AdminNewProduct",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            message: "",
            categories: [],
            router: useRouter(),
            product: reactive({
                productName: "",
                productDescription: "",
                productPrice: "",
                productQuantity: "",
                categoryName: "",
                subcategoryName: ""
            }),
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        this.categories = (await fetchRequestToServer("GET", "/api/categories/")).data
    },
    methods: {
        async createProduct(event) {
            const formData = new FormData()

            formData.append("file", event.target[0].files[0])
            formData.append("productName", this.product.productName)
            formData.append("productDescription", this.product.productDescription)
            formData.append("productPrice", this.product.productPrice)
            formData.append("productQuantity", this.product.productQuantity)
            formData.append("categoryName", this.product.categoryName)
            formData.append("subcategoryName", this.product.subcategoryName)

            const response = await credentialFetchRequestToServerWithBody("POST", "/admin/product/new", formData)

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