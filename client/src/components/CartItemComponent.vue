<template>
    <div class="cart-product">
        <img class="cart-product-image" v-bind:src="require(`@/assets/${item.product.productPicture}`)">
        <div class="cart-product-information">
            <p class="cart-product-title">{{ item.product.productName }}</p>
            <p class="cart-product-quantity">Qty: {{ item.quantity }}</p>
            <p class="cart-product-price">${{ formatPrice(item.product.productPrice) }}</p>
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

<style>
.cart-product 
{
    margin-top: .25rem;
    margin-bottom: .25rem;
    display: flex;
}

.cart-product-image 
{
    height: 100px;
}

.cart-product-information 
{
    margin-left: 1rem;
    width: 100%;
    display: flex;
}

.cart-product-title
{
    font-weight: 700;
    height: 100%;
    width: 66%;
    display: flex;
    align-items: center;
}

.cart-product-quantity 
{
    height: 100%;
    width: 33%;
    display: flex;
    align-items: center;
}

.cart-product-price
{
    height: 100%;
    width: 33%;
    display: flex;
    align-items: center;
}
</style>