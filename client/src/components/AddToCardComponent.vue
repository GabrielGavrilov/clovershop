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
import addr from "../../../addresses.js"
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
            })
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

<style>
.add-to-cart-button
{
    width: 100%;
    margin-bottom: 1rem;
}

.quantity-input
{
    padding-bottom: .25rem;
    width: 10%;
}

.product-quantity
{
    padding: 14px 18px;
    background: none;
    border: 1px solid #3a3a3a;
    border-radius: 4px;
    font-size: 100%;
    width: 100%;
}

.product-button
{
    border: 1px solid #3a3a3a;
    color: #3a3a3a;
    background-color: white;
    width: 100%;
    padding: 14px 18px;
    font-size: 13px;
    text-transform: uppercase;
    border-radius:4px;
}
</style>