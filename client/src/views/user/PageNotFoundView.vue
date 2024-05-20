<template>
    <HeaderComponent/>
    <NotFoundComponent message="The page you are looking for does not exist!"/>
</template>

<script>
import NotFoundComponent from '@/components/NotFoundComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
    name: "PageNotFoundView",
    components: {
        HeaderComponent,
        NotFoundComponent
    }
}
</script>