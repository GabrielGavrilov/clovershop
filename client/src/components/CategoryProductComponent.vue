<template>
    <div>
        <img class="category-product-image" v-bind:src="require(`@/assets/images/${productPicture}`)">
    </div>
    <div class="category-product-title">
        <a class="category-product-link" v-bind:href="$router.resolve({name: 'Product', params: {category: categoryName, product: productName}}).href">
            {{ productName }}
        </a>
    </div>
    <div class="category-product-price">
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