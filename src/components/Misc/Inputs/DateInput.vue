<template>
   <div class="h-20">
      <label :for="id" class="flex flex-col items-center">
         <span>
            <slot />
         </span>
         <input :id="id" type="date" :value="parsedDate" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).valueAsDate)"
            class="bg-transparent border-[1px] border-solid border-white/50 rounded-md pl-5 pr-2 h-[50px]
               hover:border-white focus:border-neon-green focus:border-2"
            v-bind="$attrs" :min="parsedMin" :max="parsedMax"
         >
      </label>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   inheritAttrs: false,
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
      max: Date
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