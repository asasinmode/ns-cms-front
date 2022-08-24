<template>
   <Dashboard v-if="isLoggedIn" />
   <Login v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useUserStore } from "./stores/user";
import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";

export default defineComponent({
   name: "App",
   components: { Login, Dashboard },
   computed: {
      ...mapState(useUserStore, ['isLoggedIn'])
   }
})
</script>

<style scoped>

</style>