<template>
    <div>
        <img v-bind:src="require(`@/assets/${productPicture}`)">
    </div>
    <div>
        <a v-bind:href="$router.resolve({name: 'Product', params: {category: categoryName, product: productName}}).href">
            {{ productName }}
        </a>
    </div>
    <div>
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