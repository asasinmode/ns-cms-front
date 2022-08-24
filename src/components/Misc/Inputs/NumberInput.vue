<template>
   <div class="h-20">
      <label :for="id" class="flex flex-col items-center">
         <span>
            <slot />
         </span>
         <input :id="id" :value="modelValue" @input="handleInput" @focusout="setValue"
            class="bg-transparent border-[1px] border-solid border-white/50 rounded-md h-[50px] w-16
            hover:border-white focus:border-neon-green focus:border-2 appearance-none text-center"
            v-bind="$attrs"
         >
      </label>
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
      max: Number
   },
   data(){
      return {
         inputValue: <string> "0"
      }
   },
   methods: {
      handleInput(e: Event){  // fix
         const value = (e.target as HTMLInputElement).value
         const filteredValue = value.replace(/[^0-9]/g, "")

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