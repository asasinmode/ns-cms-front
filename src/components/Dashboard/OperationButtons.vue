<template>
   <button v-if="isNew" :id="`create${ id }`"
      :disabled="isDisabled" @click="$emit('create')"
      class="w-32 h-14 min-h-[3.5rem] rounded-md flexCentered glow-border glow-sm mb-3 mt-5
         hover:bg-neon-green/10 focus-visible:bg-neon-green/10 active:bg-neon-green/30 disabled:hover:bg-transparent"
   >
      <span>
         create
      </span>
   </button>
   <div v-else class="flex flex-row gap-4 mb-3 mt-5">
      <button :id="`delete${ id }`" :disabled="isDisabled" @click="$emit('delete')"
         class="glow-red w-32 h-14 min-h-[3.5rem] rounded-md flexCentered glow-border glow-sm
            hover:bg-neon-red/20 focus-visible:bg-neon-red/20 active:bg-neon-red/40 disabled:hover:bg-transparent"
      >
         <span>
            delete
         </span>
      </button>
      <button :id="`save${ id }`" :disabled="isDisabled" @click="$emit('save')"
         class="w-32 h-14 min-h-[3.5rem] rounded-md flexCentered glow-border glow-sm
            hover:bg-neon-green/10 focus-visible:bg-neon-green/10 active:bg-neon-green/30 disabled:hover:bg-transparent"
      >
         <span>
            save
         </span>
      </button>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
   name: "SaveButton",
   emits: ['create', 'delete', 'save'],
   props: {
      isDisabled: {
         type: Boolean,
         default: false
      },
      isNew: {
         type: Boolean,
         default: false
      },
      id: {
         type: String,
         required: true
      }
   }
})
</script>

<style scoped>
.glow-red{
   --gw-glow-color: var(--neon-red);
   --gw-border-color: var(--neon-red);
}
</style>