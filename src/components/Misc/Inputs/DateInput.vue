<template>
   <div>
      <label :for="id" class="flex flex-col items-center w-fit">
         <span>
            <slot />
         </span>
         <input :id="id" type="date" required :value="parsedDate" @input="handleInput" @focusout="setValue"
            class="bg-transparent border-[1px] border-solid border-white/50 rounded-md pl-5 pr-2 h-[50px]
               hover:border-white focus:border-neon-green focus:border-2"
               :class="{ '!border-neon-red': isInvalid }"
            :min="parsedMin" :max="parsedMax" ref="input"
         >
      </label>
      <span v-show="isInvalid" class="flexCentered text-center pointer-events-none text-[0.8em] text-neon-red">
         {{ errorText }}
      </span>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
      min: Date,
      max: Date,
      errorText: {
         type: String,
         default: ""
      },
      showError: {
         type: Boolean,
         default: false
      }
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
      isInvalid(){
         return this.showError || (this.min ? this.modelValue < this.min : false) || (this.max ? this.modelValue > this.max : false)
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