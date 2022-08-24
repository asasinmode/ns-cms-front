<template>
   <button :disabled="isProcessing" class="w-32 h-14 min-h-[3.5rem] rounded-md flexCentered glow-border glow-sm my-6
      hover:bg-neon-green/10 focus-visible:bg-neon-green/10 active:bg-neon-green/30 disabled:hover:bg-transparent"
   >
      <span v-show="!isProcessing">
         save
      </span>
      <Loading v-show="isProcessing" />
   </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "@/components/Misc/Loading.vue";

export default defineComponent({
   name: "SaveButton",
   components: { Loading },
   props: {
      isProcessing: {
         type: Boolean,
         default: false
      }
   }
})
</script>

<style scoped>

</style>