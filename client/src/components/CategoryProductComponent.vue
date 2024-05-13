<template>
    <div>
        <img class="shop-item-image" v-bind:src="require(`@/assets/${productPicture}`)">
    </div>
    <div class="shop-item-title">
        <a class="shop-item-link" v-bind:href="$router.resolve({name: 'Product', params: {category: categoryName, product: productName}}).href">
            {{ productName }}
        </a>
    </div>
    <div class="shop-item-price">
        <p>${{ productPrice }}</p>
    </div>
</template>

<script>

export default {
    name: "CategoryProductComponent",
    props: [
        "productId",
        "productPicture",
        "productName",
        "productPrice",
        "categoryName"
    ]
}
</script>