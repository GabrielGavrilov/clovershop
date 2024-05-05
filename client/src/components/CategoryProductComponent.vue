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

<style>
.shop-item-image 
{
    height: 250px;
    width: 250px;
    background-color: #f6f6f6;
}

.shop-item-title
{
    width: 250px;
    margin-top: 1rem;
    font-weight: 700;
}

.shop-item-link
{
    color: black;
    text-decoration: none;
}

.shop-item-price
{
    width: 250px;
    margin-top: .5rem;
    margin-bottom: 2rem;
}
</style>