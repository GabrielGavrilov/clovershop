<template>
        <p>{{ item.product.productName }}</p>
        <p>${{ formatPrice(item.product.productPrice) }}</p>
        <p>{{ item.quantity }}</p>
        <p>${{ formatPrice(item.product.productPrice * item.quantity) }}</p>
</template>

<script>
export default {
    name: "CartItemComponent",
    props: ["item"],
    methods: {
        formatPrice(price) {
            const priceString = String(price)
            const formattedPrice = priceString.substring(0, priceString.length - 2) + "." + priceString.substring(priceString.length - 2)
            return formattedPrice
        }
    }
}
</script>