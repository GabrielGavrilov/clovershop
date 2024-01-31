<template>
    <h2>Log in</h2>
    <form v-on:submit.prevent="submit()">
        <input v-model="login.email" type="email" placeholder="Email" required>
        <br>
        <input v-model="login.password" type="password" placeholder="Password" required>
        <br>
        <button type="submit">Log in</button>
    </form>
</template>

<script>
import { reactive } from 'vue';

export default {
    name: "AdminLoginView",
    setup() {
        const login = reactive({
            email: '',
            password: ''
        })

        async function submit() {
            await fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: 'include',
                body: JSON.stringify(login)
            })

            await console.log("logged in")
        }

        return {
            login,
            submit
        }
    }
}
</script>