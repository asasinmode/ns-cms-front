<template>
   <Button class="font-semibold flexCentered" :disabled="isProcessing">
      <slot />
      <Loading v-show="isProcessing" />
   </Button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "@/components/Misc/Loading.vue";
import Button from "@/components/Misc/Button.vue";

export default defineComponent({
   name: "BottomButton",
   components: { Button, Loading },
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