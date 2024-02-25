<template>
        <p>{{ item.product.productName }}</p>
        <p>{{ item.product.productPrice }}</p>
        <p>{{ item.quantity }}</p>
        <p>{{ item.product.productPrice * item.quantity }}</p>
</template>

<script>
export default {
    name: "CartItemComponent",
    props: ["item"]
}
</script>