<template>
    <div class="cart-item">
        <img class="cart-item-image" v-bind:src="require(`@/assets/images/${item.product.productPicture}`)">
        <div class="cart-item-information">
            <p class="cart-item-title">{{ item.product.productName }}</p>
            <p class="cart-item-quantity">Qty: {{ item.quantity }}</p>
            <p class="cart-item-price">${{ formatPrice(item.product.productPrice) }}</p>
            <!-- <p class="cart-product-price">${{ formatPrice(item.product.productPrice * item.quantity) }}</p> -->
        </div>
    </div>
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

