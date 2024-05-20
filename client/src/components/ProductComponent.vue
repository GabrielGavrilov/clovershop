<template>
    <div v-if="!productExists">
        <NotFoundComponent message="The page you are looking for does not exist!"/>
    </div>
    <div class="product-content" v-else-if="product !== undefined && productExists">
        <div class="product-picture-content">
            <img class="product-picture" v-bind:src="require(`@/assets/images/uploads/${product.productPicture}`)">
        </div>
        <div class="product-information">
            <div class="product-name">
                <p>{{ product.productName }}</p>
            </div>
            <div class="product-price">
                <p>${{ formatPrice(product.productPrice) }}</p>
            </div>
            <div class="product-stock">
                <p>{{ product.productQuantity }}</p>
            </div>
            <div>
                <form v-on:submit.prevent="addItemToCart()">
                    <div class="quantity-input">
                        <input class="product-quantity" v-model="productModel.quantity" type="number" min="1" value="1">
                    </div>
                    <div class="add-to-cart-button">
                        <button class="product-button" type="submit">Add to cart</button>
                    </div>
                </form>
            </div>
            <div class="product-description">
                <p>{{ product.productDescription }}</p>
            </div>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import config from "../../../config/index.js"
import NotFoundComponent from "./NotFoundComponent.vue"
import { reactive } from "vue"

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
            productModel: reactive({
                productId: undefined,
                quantity: 1
            }),
            server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        const response = await fetch(`${this.server}/api/product`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                categoryName: this.categoryName,
                productName: this.productName
            })
        })
        
        this.product = await response.json()
        this.productModel.productId = this.product._id

        if(this.product.status == 404)
            this.productExists = false
    },
    methods: {
        async addItemToCart() {
            const response = await fetch(`${addr.SERVER_ADDRESS}/cart/add`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.productModel)
            })

            await this.router.push("/cart")
        },
        formatPrice(price) {
            const priceString = String(price)
            const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
            return formattedPrice
        }
    }
}
</script>