<template>
    <header>
        <div class="header-content">
            <div class="header-left">
                <a href="/">
                    <img width="50" v-bind:src="require(`@/assets/images/clover.png`)">
                </a>
            </div>
            <div class="header-right">
                <a href="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true" width="30" height="30"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </a>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: "AdminHeaderComponent"
}
</script>