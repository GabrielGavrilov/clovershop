<template>
    <header>
        <div class="header-content">
            <div class="header-left">
                <img width="27" class="hamburger-icon" @click="test" v-bind:src="require(`@/assets/images/hamburger.png`)">
                <a href="/">
                    <img width="50" class="clover-icon" v-bind:src="require(`@/assets/images/clover.png`)">
                </a>
            </div>
            <div class="header-right">
                
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "AdminHeaderComponent",
    methods: {
        test() {
            var sidebar = document.querySelector(".sidebar")
            sidebar.classList.toggle("change")
            console.log(sidebar)
        }
    }
}
</script>

<style scoped src="@/assets/styles/AdminMenu.css">
</style>