<template>
    <DashboardHeaderComponent/>
    <form v-on:submit.prevent="updateSubcategory()">
        <input v-model="subcategory.subcategoryName" type="text" required>
        <br>
        <button type="submit">Update</button>
    </form>
</template>

<script>
import DashboardHeaderComponent from "@/components/DashboardHeaderComponent.vue"
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router"

export default {
    name: "AdminUpdateSubcategoryView",
    components: {
        DashboardHeaderComponent
    },
    data() {
        return {
            route: useRoute(),
            router: useRouter(),
            subcategory: reactive({
                subcategoryId: "",
                subcategoryName: ""
            })
        }
    },
    async mounted() {
        const response = await fetch(`http://localhost:3000/api/subcategory/${this.route.params.subcategoryId}`, {
            headers: {"Content-Type": "application/json"}
        })

        const subcategoryInformation = await response.json();
        this.subcategory.subcategoryId = subcategoryInformation._id
        this.subcategory.subcategoryName = subcategoryInformation.subcategoryName
        console.log(this.subcategory)
    },
    methods: {
        async updateSubcategory() {
            const response = await fetch("http://localhost:3000/admin/subcategory/update", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.subcategory)
            })

            await this.router.push("/admin/subcategories")
        }
    }
}
</script>