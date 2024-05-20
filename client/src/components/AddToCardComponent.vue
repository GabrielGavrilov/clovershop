<template>
    <form v-on:submit.prevent="addItemToCart()">
        <div class="quantity-input">
            <input class="product-quantity" v-model="item.quantity" type="number" min="1" value="1">
        </div>
        <div class="add-to-cart-button">
            <button class="product-button" type="submit">Add to cart</button>
        </div>
    </form>
</template>

<script>
import config from "../../../config/index.js"
import { reactive } from 'vue'
import { useRouter } from "vue-router"

export default {
    name: "AddToCardComponent",
    props: ["productId"],
    data() {
        return {
            router: useRouter(),
            item: reactive({
                productId: this.$props.productId,
                quantity: 1
            }),
            server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    methods: {
        async addItemToCart() {
            const response = await fetch(`${addr.SERVER_ADDRESS}/cart/add`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.item)
            })

            await this.router.push("/cart")
        }
    }
}
</script>
