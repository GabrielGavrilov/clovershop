<template>
    <HeaderComponent/>
    <NotFoundComponent message="The page you are looking for does not exist!"/>
</template>

<script>
import NotFoundComponent from '@/components/NotFound.vue';
import HeaderComponent from '@/components/Header.vue';

export default {
    name: "PageNotFoundView",
    components: {
        HeaderComponent,
        NotFoundComponent
    }
}
</script>