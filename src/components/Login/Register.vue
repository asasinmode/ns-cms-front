<template>
   <div class="flex flex-col py-8 gap-3 items-center">
      <Input :id="'registerName'" :placeholder="'name*'" v-model="inputs.name.value" :helperText="'*required'"
         :showError="inputs.name.showError" :errorText="'name cannot be empty'" @input="inputs.name.showError = false"
      />
      <Input :id="'registerCountry'" :placeholder="'country*'" v-model="inputs.country.value" :helperText="'*required'"
         :showError="inputs.country.showError" :errorText="'country cannot be empty'" @input="inputs.country.showError = false"
      />
      <Input :id="'registerEmail'" :placeholder="'email*'" type="email" v-model="inputs.email.value" :helperText="'*required'"
         :showError="inputs.email.showError" :errorText="inputs.email.errorText" @input="inputs.email.showError = false"
         maxlength="255"
      />
      <Input :id="'registerPassword'" :placeholder="'password*'" type="password" v-model="inputs.password.value"
         :showError="inputs.password.showError" :errorText="passwordInputErrorText" :helperText="'*required'"
         @keydown.enter="handleLogin" @input="inputs.password.showError = false"
      />
      <BooleanInput v-model="inputs.hasButton.value" :name="`hasButton`" class="w-64 mt-2" :showEmoji="true">
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
import BottomButton from "./BottomButton.vue";
import Input from "@/components/Misc/Inputs/Input.vue";
import BooleanInput from "@/components/Misc/Inputs/BooleanInput.vue";

export default defineComponent({
   name: "Register",
   components: { BottomButton, Input, BooleanInput },
   data(){
      return {
         inputs: {
            name: {
               value: "",
               showError: false
            },
            country: {
               value: "",
               showError: false
            },
            email: {
               value: "",
               showError: false,
               errorText: "email cannot be empty"
            },
            password: {
               value: "",
               showError: false
            },
            hasButton: {
               value: false,
               showError: false
            }
         },
         isProcessing: false,
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
            const { data } = await this.$http.post('president', {
               name: this.inputs.name.value,
               country: this.inputs.country.value,
               email: this.inputs.email.value,
               password: this.inputs.password.value,
               hasButton: this.inputs.hasButton.value
            })

            this.setPresident(data.name, data.token, data._id, data.country, data.hasButton)
         } catch(e: any){
            this.error = e
            this.$nextTick(() => this.$shake(this.$refs.bottomButtonText))

            if(e.response?.data?.fields !== undefined){
               const keys = Object.keys(e.response.data.fields).filter(key => Object.keys(this.inputs).includes(key))
               
               const inputs = this.inputs
               keys.forEach(key => {
                  this.inputs[key as keyof typeof inputs].showError = true
                  if(key === 'email'){
                     this.inputs.email.errorText = e.response.data.fields.email
                  }
               })
            }
         }

         this.isProcessing = false
      },
      validateFields(){
         const isNameValid = this.inputs.name.value.length > 0
         if(!isNameValid){
            this.inputs.name.showError = true
         }
         const isCountryValid = this.inputs.country.value.length > 0
         if(!isCountryValid){
            this.inputs.country.showError = true
         }
         const isEmailValid = this.inputs.email.value.length > 0 && this.inputs.email.value.length <= 255 && (document.querySelector("#registerEmail") as HTMLInputElement).checkValidity()
         if(!isEmailValid){
            this.inputs.email.showError = true
         }
         const isPasswordValid = this.inputs.password.value.length > 0 && this.inputs.password.value.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^+_=])[A-Za-z\d@$!%*#?&^+_=]{6,}$/) !== null
         if(!isPasswordValid){
            this.inputs.password.showError = true
         }

         return isNameValid && isCountryValid && isEmailValid && isPasswordValid
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
               return this.error.response.data.general || ""
            } else if(this.error.code === "ERR_NETWORK"){
               return "no connection to server"
            }
         }

         console.error(this.error)
         return "unknown error"
      },
      emailInputErrorText(){
         const email = this.inputs.email.value
         return email.length === 0 ? "email cannot be empty" : email.length > 255 ? "email cannot be longer than 255" : "invalid email address"
      },
      passwordInputErrorText(){
         const password = this.inputs.password.value
         return password.length === 0 ? 'password cannot be empty' : 'min 6 characters, one letter, one symbol'
      }
   }
})
</script>

<style scoped>

</style>