<template>
   <div class="flex flex-col py-8 gap-3 items-center">
      <Input :id="'registerName'" :placeholder="'name*'" v-model="name" :helperText="'*required'"
         :v$="v$.name"
      />
      <Input :id="'registerCountry'" :placeholder="'country*'" v-model="country" :helperText="'*required'"
         :v$="v$.country"
      />
      <Input :id="'registerEmail'" :placeholder="'email*'" v-model="email" :helperText="'*required'"
         :v$="v$.email"
         maxlength="255"
      />
      <Input :id="'registerPassword'" :placeholder="'password*'" v-model="password" :helperText="'*required'"
         :v$="v$.password" type="password"
         @keydown.enter="handleLogin" :pattern="passwordPattern"
      />
      <BooleanInput v-model="hasButton" :name="`hasButton`" class="w-64 mt-2" :showEmoji="true">
         do you have a nuclear button?
      </BooleanInput>
      <h3 class="text-neon-red text-lg" v-if="errorMessage.length > 0">
         {{ errorMessage }}
      </h3>
   </div>
   <BottomButton id="registerConfirm" @click="handleLogin" :isProcessing="isProcessing">
      <span class="pointer-events-none" ref="bottomButtonText" v-show="!isProcessing">
         register
      </span>
   </BottomButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";
import { required, maxLength, minLength, helpers } from "@vuelidate/validators";
import BottomButton from "./BottomButton.vue";
import Input from "@/components/Misc/Inputs/Input.vue";
import BooleanInput from "@/components/Misc/Inputs/BooleanInput.vue";
import { matchesRegex, requiredWithMessage } from "@/helpers/validation";

export default defineComponent({
   name: "Register",
   components: { BottomButton, Input, BooleanInput },
   setup(){
      return {
         v$: useVuelidate({ $lazy: true })
      }
   },
   data(){
      return {
         name: "",
         country: "",
         email: "",
         password: "",
         hasButton: false,
         isProcessing: false,
         error: <any> undefined,
         emailPattern: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
         passwordPattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^+_=])[A-Za-z\d@$!%*#?&^+_=]{6,}$/
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
            const { data } = await this.$http.post('presidents', this.inputValues)

            this.setPresident(data.name, data.token, data._id, data.country, data.hasButton)
         } catch(e: any){
            this.error = e
            this.$nextTick(() => this.$shake(this.$refs.bottomButtonText))
         }

         this.isProcessing = false
      },
      resetTextFields(){
         this.name = ""
         this.country = ""
         this.email = ""
         this.password = ""
         this.hasButton = false
      }
   },
   computed: {
      errorMessage(): string{
         if(this.error === undefined){ return "" }

         if(this.error.name === "AxiosError"){
            if(this.error.response.status === 400){
               return this.error.response.data.general || ""
            } else if(this.error.code === "ERR_NETWORK"){
               return "no connection to server"
            }
         }

         console.error(this.error)
         return "unknown error"
      },
      inputValues(){
         return {
            name: this.name,
            country: this.country,
            email: this.email,
            password: this.password,
            hasButton: this.hasButton
         }
      }
   },
   validations(){
      return {
         name: {
            required: requiredWithMessage
         },
         country: {
            required: requiredWithMessage
         },
         email: {
            required: requiredWithMessage,
            maxLength: helpers.withMessage('max 255 characters', maxLength(255)),
            mustBeValid: helpers.withMessage('must be valid email', matchesRegex(this.emailPattern))
         },
         password: {
            required: requiredWithMessage,
            minLength: helpers.withMessage('min 6 characters', minLength(6)),
            mustBeSecure: helpers.withMessage('at least one letter, one symbol', matchesRegex(this.passwordPattern))
         }
      }
   }
})
</script>

<style scoped>

</style>