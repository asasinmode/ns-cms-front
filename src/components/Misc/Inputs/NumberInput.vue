<template>
   <div class="h-20 flex-1">
      <label :for="id" class="flex flex-col items-center">
         <span>
            <slot />
         </span>
         <input :id="id" :value="inputValue" @input="handleInput" @focusout="setValue" v-bind="$attrs"
            class="bg-transparent border-[1px] border-solid border-white/50 rounded-md h-[50px] w-16
               hover:border-white focus:border-neon-green focus:border-2 appearance-none text-center"
            :class="{ '!border-neon-red': showError }"
         >
      </label>
      <span v-show="showError" class="flexCentered text-center pointer-events-none text-[0.8em] text-neon-red">
         {{ errorText }}
      </span>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   inheritAttrs: false,
   name: "NumberInput",
   props: {
      modelValue: {
         type: Number,
         required: true
      },
      id: {
         type: String,
         required: true
      },
      min: {
         type: Number,
         default: 0
      },
      errorText: {
         type: String,
         default: ""
      },
      showError: {
         type: Boolean,
         default: false
      },
      max: Number
   },
   data(){
      return {
         inputValue: <string> "0"
      }
   },
   mounted(){
      this.inputValue = this.modelValue.toString()
   },
   methods: {
      handleInput(e: Event){
         const value = (e.target as HTMLInputElement).value
         const filteredValue = value.replace(/[^0-9]/g, "")

         if(value !== filteredValue){
            (e.target as HTMLInputElement).value = filteredValue
         }

         this.inputValue = filteredValue
      },
      setValue(){
         if(this.inputValue === ""){
            this.inputValue = this.modelValue.toString()
            return
         }
         const target = parseInt(this.inputValue)

         let limitedValue = target < this.min ? this.min : target
         if(this.max !== undefined){
            limitedValue = target > this.max ? this.max : limitedValue
         }

         this.inputValue = limitedValue.toString()
         this.$emit('update:modelValue', limitedValue)
      }
   },
   watch: {
      modelValue(){
         this.inputValue = this.modelValue.toString()
      }
   }
})
</script>

<style scoped>
input:focus, input:focus-visible{
   box-shadow: none;
   outline: none;
}
input::-webkit-inner-spin-button, input::-webkit-outer-spin-button{
   appearance: none;
   margin: 0;
}
input[type=number] {
   -moz-appearance: textfield;
}
</style>