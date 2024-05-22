<template>
    <DashboardHeaderComponent/>
    <p>Products</p>
    <p>{{ message }}</p>
    <form v-on:submit.prevent="createProduct($event)">
        <input type="file" required>
        <br>
        <input v-model="product.productName" type="text" placeholder="Name" required>
        <br>
        <input v-model="product.productDescription" type="text" placeholder="Description" required>
        <br>
        <input v-model="product.productPrice" type="number" placeholder="Price" required>
        <br>
        <input v-model="product.productQuantity" type="number" placeholder="Quantity" required>
        <br>
        <select v-model="product.categoryName">
            <option v-for="category in categories" v-bind:value="category.categoryName">
                {{ category.categoryName }}
            </option>
        </select>
        <br>
        <input v-model="product.subcategoryName" type="text" placeholder="Subcategory name" required>
        <br>
        <button type="submit">Create product</button>
    </form>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from '@/modules/FetchModule';
import { isUserAuthorized } from '@/modules/CommonModule';

export default {
    name: "AdminNewProduct",
    components: {
        DashboardHeaderComponent
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

        this.categories = await fetchRequestToServer("GET", "/api/categories/")
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

            const productResponse = await credentialFetchRequestToServerWithBody("POST", "/admin/product/new", formData)

            if(productResponse.status == 409)
                this.message = productResponse.message
            else
                await this.router.go()
        }
    }
}
</script>