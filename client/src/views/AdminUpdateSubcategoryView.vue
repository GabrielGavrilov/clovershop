<template>
    <DashboardHeaderComponent/>
    <form>
        <input>
        <br>
        <button>Update</button>
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
            subcategory: reactive({
                subcategoryId: "",
                subcategoryName: ""
            })
        }
    },
    async mounted() {
        const response = await fetch(`http://localhost:3000/api/subcategory/${this.route.params.subcategoryId}`, {
            
        })
    }
}
</script>