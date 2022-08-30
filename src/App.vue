<template>
   <Dashboard v-if="isLoggedIn" />
   <WelcomeScreen v-else />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "./stores/user";
import WelcomeScreen from "@/components/WelcomeScreen.vue";
import Dashboard from "@/components/Dashboard.vue";

export default defineComponent({
   name: "App",
   components: { WelcomeScreen, Dashboard },
   methods: {
      ...mapActions(useUserStore, ['checkLocalStorage'])
   },
   computed: {
      ...mapState(useUserStore, ['isLoggedIn'])
   },
   mounted(){
      this.checkLocalStorage()
   }
})
</script>

<style scoped>

</style>