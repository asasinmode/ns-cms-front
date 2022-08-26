<template>
   <fieldset class="flex flex-col">
      <legend class="mb-1 w-full text-center">
         <slot />
      </legend>
      <div class="flex flex-row rounded-sm glow-sm w-64">
         <label :for="`${ name }No`" :class="{ 'selected': !modelValue }"
            class="flexCentered flex-1 h-12 cursor-pointer hover:bg-neon-green/10"
         >
            no
            <input :id="`${ name }No`" type="radio" :name="name" :value="false" @input="$emit('update:modelValue', false)" :checked="!modelValue">
         </label>
         <label :for="`${ name }Yes`" :class="{ 'selected': modelValue }"
            class="flexCentered flex-1 h-12 cursor-pointer hover:bg-neon-green/10 relative"
         >
            yes
            <input :id="`${ name }Yes`" type="radio" :name="name" :value="true" @input="$emit('update:modelValue', true)" :checked="modelValue">
            <span v-if="showEmoji && modelValue" aria-hidden class="absolute text-lg translate-x-full translate-y-[1px]">
               😳
            </span>
         </label>
      </div>
   </fieldset>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "BooleanInput",
   props: {
      modelValue: {
         type: Boolean,
         default: false
      },
      name: {
         type: String,
         required: true
      },
      showEmoji: {
         type: Boolean,
         default: false
      }
   }
})
</script>

<style scoped>
div:focus-within{
   outline: 1.25px solid white;
}
input {
   appearance: none;
   position: absolute;
   opacity: 0;
}
label{
   width: 50%;
   height: 3rem;
}
label.selected{
   @apply bg-neon-green text-black cursor-default;
}
</style>