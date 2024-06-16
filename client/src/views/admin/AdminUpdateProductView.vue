<template>
    <DashboardHeaderComponent/>
    <main>
        <p>{{ message }}</p>
        <form v-on:submit.prevent="updateProduct()">
            <input v-model="product.productName" type="text" required>
            <br>
            <input v-model="product.productDescription" type="text" required>
            <br>
            <input v-model="product.productPrice" type="number" required>
            <br>
            <input v-model="product.productQuantity" type="number" required>
            <br>
            <button type="submit">Update</button>
        </form>
    </main>
</template>

<script>
import AdminHeaderComponent from '@/components/AdminHeaderComponent.vue';
import AdminSideMenuComponent from '@/components/AdminSideMenuComponent.vue';
import {useRoute, useRouter} from "vue-router"
import { reactive } from 'vue';
import { isUserAuthorized } from '@/modules/CommonModule';
import { credentialFetchRequestToServerWithBody, fetchRequestToServer } from '@/modules/FetchModule';

export default {
    name: "AdminUpdateProductView.vue",
    components: {
        AdminHeaderComponent,
        AdminSideMenuComponent
    },
    data() {
        return {
            message: "",
            route: useRoute(),
            router: useRouter(),
            product: reactive({
                productId: "",
                productName: "",
                productDescription: "",
                productPrice: "",
                productQuantity: ""
            }),
        }
    },
    async mounted() {
        if(!await isUserAuthorized())
            this.router.push("/admin/login")

        const productInformation = await fetchRequestToServer("GET", `/api/product/${this.route.params.productId}`)

        this.product.productId = productInformation._id
        this.product.productName = productInformation.productName
        this.product.productDescription = productInformation.productDescription
        this.product.productPrice = productInformation.productPrice
        this.product.productQuantity = productInformation.productQuantity
    },
    methods: {
        async updateProduct() {
            const productResponse = await credentialFetchRequestToServerWithBody("POST", ".admin/product/update", this.product)

            if(productResponse.status == 409)
                this.message = productResponse.message
            else
                await this.router.push("/admin/products")
        }
    }
}
</script>
