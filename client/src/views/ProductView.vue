<template>
    <HeaderComponent/>
    <main>
        <div class="product-content">
            <ProductComponent 
                v-bind:categoryName="$route.params.category"
                v-bind:productName="$route.params.product"
            />
        </div>
    </main>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import ProductComponent from '@/components/ProductComponent.vue';

export default {
    name: "ProductView",
    components: {
        HeaderComponent,
        ProductComponent
    }
}
</script>

<style>
main
{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: flex;
}
</style>