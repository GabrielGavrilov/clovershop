<template>
    <DashboardHeaderComponent/>
    <a v-bind:href="$router.resolve({name: 'New subcategory'}).href">
        <button>Create a new Subcategory</button>
    </a>
    <ul>
        <li v-for="subcategory in subcategories">
            <a v-bind:href="$router.resolve({name: 'Update subcategory', params: {subcategoryId: subcategory._id}}).href">
                {{ subcategory.subcategoryName }}
            </a>
        </li>
    </ul>
</template>

<script>
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminSubcategoriesView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            subcategories: []
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/api/subcategories/", {
            headers: {"Content-Type": "application/json"}
        })

        this.subcategories = await response.json()
    }
}
</script>