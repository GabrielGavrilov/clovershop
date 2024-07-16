<template>
    <div>
        <img v-bind:src="require(`@/assets/images/uploads/${item.product.productPicture}`)">
        <div>
            <p>{{ item.product.productName }}</p>
            <p>Qty: {{ item.quantity }}</p>
            <p>${{ price(item.product.productPrice) }}</p>
            <p>${{ price(item.product.productPrice * item.quantity) }}</p>
        </div>
    </div>
</template>

<script>
import { formatPrice } from "@/common/functions.js"

export default {
    name: "CartItemComponent",
    props: ["item"],
    methods: {
        price: formatPrice
    }
}
</script>

