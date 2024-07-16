<template>
    <div v-if="!productExists">
        <NotFoundComponent message="The page you are looking for does not exist!"/>
    </div>
    <div v-else-if="product !== undefined && productExists">
        <div>
            <img v-bind:src="require(`@/assets/images/uploads/${product.productPicture}`)">
        </div>
        <div>
            <div>
                <p>{{ product.productName }}</p>
            </div>
            <div>
                <p>${{ price(product.productPrice) }}</p>
            </div>
            <div>
                <p>{{ product.productQuantity }}</p>
            </div>
            <div>
                <form v-on:submit.prevent="addItemToCart()">
                    <div>
                        <input v-model="productModel.quantity" type="number" min="1" value="1">
                    </div>
                    <div>
                        <button type="submit">Add to cart</button>
                    </div>
                </form>
            </div>
            <div>
                <p>{{ product.productDescription }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import { credentialFetchRequestToServerWithBody, fetchRequestToServerWithBody } from "@/common/fetch.js"
import { formatPrice } from "@/common/functions.js"
import NotFoundComponent from "./NotFound.vue"
import { reactive } from "vue"
import { useRouter } from "vue-router"

export default {
    name: "ProductComponent",
    props: ["categoryName", "productName"],
    components: {
        NotFoundComponent
    },
    data() {
        return {
            productExists: true,
            product: undefined,
            router: useRouter(),
            productModel: reactive({
                productId: undefined,
                quantity: 1
            })
        }
    },
    async mounted() {
        const response = await fetchRequestToServerWithBody("POST", "/api/product", {
            categoryName: this.categoryName,
            productName: this.productName
        })

        this.product = response.data
        this.productModel.productId = response.data._id

        if(this.product.status == 404)
            this.productExists = false
    },
    methods: {
        async addItemToCart() {
            await credentialFetchRequestToServerWithBody("POST", "/cart/add", this.productModel);
            await this.router.push("/cart")
        },
        price: formatPrice
    }
}
</script>