<template>
    <DashboardHeaderComponent/>
    <p>Products</p>
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

export default {
    name: "AdminProducts",
    components: {
        DashboardHeaderComponent
    },
    setup() {
        let categories = ref()
        const router = useRouter()
        const product = reactive({
            productName: "",
            productDescription: "",
            productPrice: "",
            productQuantity: "",
            categoryName: "",
            subcategoryName: ""
        })

        onMounted(async function() {
            const response = await fetch("http://localhost:3000/category/", {
                headers: {"Content-Type": "application/json"}
            })

            categories.value = await response.json()
        })

        // TODO: validation

        async function createProduct(event) {
            let formData = new FormData()
            formData.append('file', event.target[0].files[0])
            formData.append("productName", product.productName)
            formData.append("productDescription", product.productDescription)
            formData.append("productPrice", product.productPrice)
            formData.append("productQuantity", product.productQuantity)
            formData.append("categoryName", product.categoryName)
            formData.append("subcategoryName", product.subcategoryName)

            const response = await fetch("http://localhost:3000/admin/product/new", {
                method: "POST",
                credentials: "include",
                body: formData
            })

            await router.go()
        }

        return {
            product,
            categories,
            createProduct
        }
    }
}
</script>