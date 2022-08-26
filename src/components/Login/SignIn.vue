<template>
   <div class="flex flex-col py-8 gap-3 items-center">
      <Input id="signInEmail" :placeholder="'email'" v-model="inputs.email.value"
         :showError="inputs.email.showError" :errorText="'email cannot be empty'" @input="inputs.email.showError = false"
      />
      <Input id="signInPassword" :placeholder="'password'" type="password" v-model="inputs.password.value"
         :showError="inputs.password.showError" :errorText="'password cannot be empty'"
         @keydown.enter="handleLogin" @input="inputs.password.showError = false"
      />
      <h3 class="text-neon-red text-lg" v-if="errorMessage.length > 0">
         {{ errorMessage }}
      </h3>
   </div>
   <BottomButton id="signInConfirm" @click="handleLogin" :isProcessing="isProcessing">
      <span class="pointer-events-none" ref="bottomButtonText" v-show="!isProcessing">
         sign in
      </span>
   </BottomButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import BottomButton from "./BottomButton.vue";
import Input from "@/components/Misc/Inputs/Input.vue";

export default defineComponent({
   name: "SignIn",
   components: { BottomButton, Input },
   data(){
      return {
         isProcessing: false,
         inputs: {
            email: {
               value: "",
               showError: false
            },
            password: {
               value: "",
               showError: false
            }
         },
         error: <any> undefined
      }
   },
   methods: {
      ...mapActions(useUserStore, ['setPresident']),
      async handleLogin(){
         this.error = undefined

         const areFieldsValid = this.validateFields()
         if(!areFieldsValid){ return }

         this.isProcessing = true

         try {
            const { data } = await this.$http.post('president/login', {
               email: this.inputs.email.value,
               password: this.inputs.password.value
            })

            this.setPresident(data.name, data.token, data._id, data.country, data.hasButton)
         } catch(e){
            this.error = e
            this.$nextTick(() => this.$shake(this.$refs.bottomButtonText))
         }

         this.isProcessing = false
      },
      validateFields(){
         const isEmailValid = this.inputs.email.value.length > 0
         if(!isEmailValid){
            this.inputs.email.showError = true
         }
         const isPasswordValid = this.inputs.password.value.length > 0
         if(!isPasswordValid){
            this.inputs.password.showError = true
         }

         return isEmailValid && isPasswordValid
      },
      resetTextFields(){
         Object.keys(this.inputs).forEach(key => {
            this.inputs[key as keyof typeof this.inputs].value = ""
            this.inputs[key as keyof typeof this.inputs].showError = false
         })
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
   }
})
</script>

<style scoped>

</style>