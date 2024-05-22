<template>
    <div class="cart-item">
        <img class="cart-item-image" v-bind:src="require(`@/assets/images/uploads/${item.product.productPicture}`)">
        <div class="cart-item-information">
            <p class="cart-item-title">{{ item.product.productName }}</p>
            <p class="cart-item-quantity">Qty: {{ item.quantity }}</p>
            <p class="cart-item-price">${{ price(item.product.productPrice) }}</p>
            <!-- <p class="cart-product-price">${{ formatPrice(item.product.productPrice * item.quantity) }}</p> -->
        </div>
    </div>
</template>

<script>
import { formatPrice } from "@/modules/CommonModule.js"

export default {
    name: "CartItemComponent",
    props: ["item"],
    methods: {
        price: formatPrice
    }
}
</script>

