<template>
    <h2>Log in</h2>
    <p>{{ message }}</p>
    <form v-on:submit.prevent="submit()">
        <input v-model="login.email" type="email" placeholder="Email" required>
        <br>
        <input v-model="login.password" type="password" placeholder="Password" required>
        <br>
        <button type="submit">Log in</button>
    </form>
</template>

<script>
import config from "../../../../config/index.js"
import { reactive } from 'vue';
import { useRouter } from "vue-router"

export default {
    name: "AdminLoginView",
    data() {
        return {
            router: useRouter(),
            message: "",
            login: reactive({email: '', password: ''}),
            server: `${config.SERVER_PROTOCOL}://${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        const response = await fetch(`${this.server}/auth/account`, {
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        const authResponse = await response.json();

        if(authResponse.email)
            await this.router.push("/admin/dashboard")
    },
    methods: {
        async submit() {
            const response = await fetch(`${ths.server}/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.login)
            })

            const authResponse = await response.json();
            
            if(authResponse.status == 401)
                this.message = authResponse.message

            else
                await this.router.push("/admin/dashboard")
        }
    }
}
</script>