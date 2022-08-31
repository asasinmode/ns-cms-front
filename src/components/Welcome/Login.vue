<template>
   <div class="flex flex-col py-8 gap-3 items-center">
      <Input id="loginEmail" :placeholder="'email'" v-model="email"
         :v$="v$.email"
      />
      <Input id="loginPassword" :placeholder="'password'" type="password" v-model="password"
         :v$="v$.password"
         @keydown.enter="handleLogin"
      />
      <h3 class="text-neon-red text-lg" v-if="errorMessage.length > 0">
         {{ errorMessage }}
      </h3>
   </div>
   <BottomButton id="loginConfirm" @click="handleLogin" :isProcessing="isProcessing">
      <span class="pointer-events-none" ref="bottomButtonText" v-show="!isProcessing">
         sign in
      </span>
   </BottomButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import BottomButton from "./BottomButton.vue";
import Input from "@/components/Misc/Inputs/Input.vue";

export default defineComponent({
   name: "Login",
   components: { BottomButton, Input },
   setup(){
      return {
         v$: useVuelidate({ $lazy: true })
      }
   },
   data(){
      return {
         isProcessing: false,
         email: "",
         password: "",
         error: <any> undefined
      }
   },
   methods: {
      ...mapActions(useUserStore, ['setPresident']),
      async handleLogin(){
         this.error = undefined

         const areFieldsValid = await this.v$.$validate()
         if(!areFieldsValid){ return }

         this.isProcessing = true

         try {
            const { data } = await this.$http.post('presidents/login', {
               email: this.email,
               password: this.password
            })

            this.setPresident(data.name, data.token, data._id, data.country, data.hasButton)
         } catch(e){
            this.error = e
            this.$nextTick(() => this.$shake(this.$refs.bottomButtonText))
         }

         this.isProcessing = false
      },
      resetTextFields(){
         this.email = ""
         this.password = ""
      }
   },
   computed: {
      errorMessage(): string{
         if(this.error === undefined){ return "" }

         if(this.error.name === "AxiosError"){
            if(this.error.response.status === 400){
               return this.error.response.data.general || "invalid credentials"
            } else if(this.error.code === "ERR_NETWORK"){
               return "no connection to server"
            }
         }

         console.error(this.error)
         return "unknown error"
      }
   },
   validations(){
      return {
         email: {
            required: helpers.withMessage('cannot be empty', required)
         },
         password: {
            required: helpers.withMessage('cannot be empty', required)
         }
      }
   }
})
</script>

<style scoped>

</style>