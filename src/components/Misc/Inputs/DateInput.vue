<template>
   <div>
      <label :for="id" class="flex flex-col items-center w-fit relative">
         <span>
            <slot />
         </span>
         <input :id="id" type="date" required :value="parsedDate" @input="handleInput" @focusout="setValue"
            class="bg-transparent border-[1px] border-solid border-white/50 rounded-md pl-5 pr-2 h-[50px]
               hover:border-white focus:border-neon-green focus:border-2"
               :class="{ '!border-neon-red': v$.$error }"
            :min="parsedMin" :max="parsedMax" ref="input"
         >
         <span v-show="v$.$error" class="flexCentered text-center pointer-events-none text-[0.8em] text-neon-red
            absolute left-1 bottom-0 translate-y-full lg:left-full lg:translate-y-2 lg:translate-x-2"
         >
            {{ errorText }}
         </span>
      </label>
   </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import type { BaseValidation } from "@vuelidate/core";

export default defineComponent({
   name: "DateInput",
   props: {
      modelValue: {
         type: Date,
         required: true
      },
      id: {
         type: String,
         required: true
      },
      v$: {
         type: Object as PropType<BaseValidation>,
         required: true
      },
      min: Date,
      max: Date,
   },
   data(){
      return {
         inputValue: <Date | null> new Date()
      }
   },
   mounted(){
      this.inputValue = this.modelValue
   },
   methods: {
      handleInput(e: Event){
         const input = e.target as HTMLInputElement
         const value = input.valueAsDate

         this.inputValue = value
      },
      setValue(){
         if(this.inputValue === null){
            this.inputValue = this.modelValue;
            this.updateInputValue()
            return
         }

         let limitedDate = this.inputValue
         if(this.min){
            limitedDate = limitedDate < this.min ? this.min : limitedDate
         }
         if(this.max){
            limitedDate = limitedDate > this.max ? this.max : limitedDate
         }

         if(this.inputValue !== limitedDate){
            this.updateInputValue()
         }

         this.$emit('update:modelValue', limitedDate)
      },
      updateInputValue(){
         (this.$refs.input as HTMLInputElement).value = this.parsedDate
      }
   },
   computed: {
      parsedDate(){
         return this.modelValue.toISOString().split('T')[0]
      },
      parsedMin(){
         return this.min ? this.min.toISOString().split('T')[0] : ''
      },
      parsedMax(){
         return this.max ? this.max.toISOString().split('T')[0] : ''
      },
      errorText(){
         const errors = this.v$.$errors
         if(!errors.length){ return "" }

         return errors[0].$message.toString()
      }
   }
})
</script>

<style scoped>
input:focus, input:focus-visible{
   box-shadow: none;
   outline: none;
}
input[type="date"]::-webkit-calendar-picker-indicator {
   filter: invert(1);
}
</style>