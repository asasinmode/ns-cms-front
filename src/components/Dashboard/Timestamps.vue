<template>
   <div class="flex flex-col text-gray-300 pointer-events-none text-sm">
         <div class="flex items-center flex-col md:flex-row">
            <span class="flex justify-end flex-1 pr-1">created at:</span>
            <span class="font-semibold pl-1">{{ parsedCreated }}</span>
         </div>
         <div class="flex items-center flex-col md:flex-row">
            <span class="flex justify-end flex-1 pr-1">last updated:</span>
            <span class="font-semibold pl-1">{{ parsedUpdated }}</span>
         </div>
      </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "Timestamps",
   props: {
      createdAt: {
         type: Date,
         required: true
      },
      updatedAt: {
         type: Date,
         required: true
      }
   },
   computed: {
      parsedCreated(){
         return this.createdAt.toLocaleString()
      },
      parsedUpdated(){
         return this.updatedAt.toLocaleString()
      }
   }
})
</script>

<style scoped>

</style>