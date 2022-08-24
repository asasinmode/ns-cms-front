<template>
   <article class="flex flex-col w-96 glow-sm glow-border glow-gap-horizontal">
      <div class="flex flex-row w-full glow-gap-vertical">
         <Button @click="switchMode('login')" :selected="isLogin" :disabled="isLogin" class="flex-1 font-semibold">
            login
         </Button>
         <Button @click="switchMode('register')" :selected="!isLogin" :disabled="!isLogin" class="flex-1 font-semibold">
            register
         </Button>
      </div>
      <SignIn v-if="isLogin" />
      <Register v-else />
   </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue";
import Register from "./Login/Register.vue";
import SignIn from "./Login/SignIn.vue";

export default defineComponent({
   name: "Login",
   components: { Button, Register, SignIn },
   data() {
      return {
         mode: <"login" | "register"> "login"
      }
   },
   methods: {
      switchMode(mode: "login" | "register"){
         this.mode = mode
      }
   },
   computed: {
      isLogin(){
         return this.mode === 'login'
      }
   }
})
</script>

<style scoped>
article {
   max-width: calc(100vw - 4rem);
   margin-top: 1rem;
}
@media (min-height: 608px){
   article {
      margin-top: 3rem;
   }
}
@media (min-height: 800px){
   article {
      margin-top: 12rem;
   }
}
</style>