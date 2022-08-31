<template>
   <button v-if="isNew" v-show="!isLoading" :id="`create${ id }`"
      :disabled="isLoading" @click="$emit('create')"
      class="w-32 h-14 min-h-[3.5rem] rounded-md flexCentered glow-border glow-sm mb-3 mt-5
         hover:bg-neon-green/10 focus-visible:bg-neon-green/10 active:bg-neon-green/30 disabled:hover:bg-transparent"
   >
      <span>
         create
      </span>
   </button>
   <div v-else v-show="!isLoading" class="flex flex-row gap-4 mb-3 mt-5">
      <button :id="`delete${ id }`" :disabled="isLoading" @click="$emit('delete')"
         class="glow-red w-32 h-14 min-h-[3.5rem] rounded-md flexCentered glow-border glow-sm
            hover:bg-neon-red/20 focus-visible:bg-neon-red/20 active:bg-neon-red/40 disabled:hover:bg-transparent"
      >
         <span>
            delete
         </span>
      </button>
      <button :id="`save${ id }`" :disabled="isLoading" @click="$emit('save')"
         class="w-32 h-14 min-h-[3.5rem] rounded-md flexCentered glow-border glow-sm
            hover:bg-neon-green/10 focus-visible:bg-neon-green/10 active:bg-neon-green/30 disabled:hover:bg-transparent"
      >
         <span>
            save
         </span>
      </button>
   </div>
   <Loading v-show="isLoading" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Loading from "@/components/Misc/Loading.vue";

export default defineComponent({
   name: "SaveButton",
   components: { Loading },
   emits: ['create', 'delete', 'save'],
   props: {
      isLoading: {
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