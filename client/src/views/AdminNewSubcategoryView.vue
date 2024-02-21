<template>
    <DashboardHeaderComponent/>
    <p>Subcategories</p>
    <form v-on:submit.prevent="createSubcategory()">
        <input v-model="subcategory.subcategoryName" type="text" placeholder="Subcategory name" required>
        <br>
        <select v-model="subcategory.categoryName">
            <option v-for="category in categories" v-bind:value="category.categoryName">
                {{ category.categoryName }}
            </option>
        </select>
        <br>
        <button type="submit">Create subcategory</button>
    </form>
</template>

<script>
import { reactive } from 'vue';
import { useRouter } from "vue-router"
import DashboardHeaderComponent from '@/components/DashboardHeaderComponent.vue';

export default {
    name: "AdminNewSubcategoryView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            router: useRouter(),
            categories: [],
            subcategory: reactive({
                subcategoryName: "",
                categoryName: ""
            })
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/category/", {
            headers: {"Content-Type": "application/json"}
        })

        this.categories = await response.json()
    },
    methods: {
        async createSubcategory() {
            const response = await fetch("http://localhost:3000/admin/subcategory/new", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.subcategory)
            })

            await this.router.go()
        }
    }
}
</script>