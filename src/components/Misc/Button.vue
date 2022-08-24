<template>
   <button class="h-12" :class="{ 'selected': selected }">
      <slot />
   </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Button",
   props: {
      selected: {
         type: Boolean,
         default: false
      }
   }
})
</script>

<style scoped>
button:not(.selected){
   @apply hover:bg-neon-green/20 focus-visible:bg-neon-green/20 active:bg-neon-green/40 disabled:hover:bg-transparent
}
button.selected{
   @apply bg-neon-green text-black hover:!bg-neon-green
}
</style>