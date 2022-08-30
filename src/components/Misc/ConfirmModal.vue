<template>
   <Teleport to="body">
      <div class="fixed w-[100vw] h-[100vh] inset-0 bg-black/40 flex justify-center items-start z-[100]"
         @click.self="close" @keydown.esc="close" @keydown.tab="handleTabNavigation"
      >
         <article class="bg-black glow-border glow-sm flex flex-col p-4 overflow-y-auto overflow-x-hidden relative mt-10 md:mt-24 rounded-md"
            ref="contentContainer"
            aria-role="dialog" aria-live="polite" :aria-busy="isLoading" aria-modal="true" aria-labelledby="dialogLabel"
         >
            <h1 id="dialogLabel" class="text-center font-semibold text-3xl mb-4"
               :class="{ 'text-neon-red': showError }"
            >
               <slot />
            </h1>
            <div v-show="isLoading" class="overflow-hidden flex justify-center items-center flex-1">
               <Loading />
            </div>
            <div v-if="!isLoading && !showError" class="flexCentered flex-row mt-2 gap-8">
               <Button id="modalCancelButton" @click="cancel" :disabled="isLoading" :focusOnMounted="true"
                  class="glow-border glow-sm rounded-md px-3"
               >
                  <span class="z-10 pointer-events-none">
                     cancel
                  </span>
               </Button>
               <Button id="modalConfirmButton" @click="confirm" :disabled="isLoading"
                  class="glow-border glow-sm rounded-md px-3"
               >
                  <span class="z-10 pointer-events-none">
                     confirm
                  </span>
               </Button>
            </div>
            <div v-else-if="!isLoading" class="flexCentered">
               <Button id="modalCloseButton" @click="close" :disabled="isLoading"
                  class="glow-border glow-sm rounded-md px-3" :focusOnMounted="true"
               >
                  <span class="z-10 pointer-events-none">
                     close
                  </span>
               </Button>
            </div>
         </article>
      </div>
   </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "@/components/Misc/Button.vue";
import Loading from "@/components/Misc/Loading.vue";

export default defineComponent({
   name: "ConfirmModal",
   components: { Button, Loading },
   props: {
      isLoading: {
         type: Boolean,
         default: false
      },
      closeFocusTarget: {
         type: HTMLElement
      },
      showError: {
         type: Boolean,
         default: false
      }
   },
   emits: ["close", "confirm", "cancel"],
   methods: {
      close() {
         !this.isLoading && this.$emit("close");
      },
      confirm(){
         this.$emit("confirm")
      },
      cancel(){
         this.$emit("cancel")
      },
      handleTabNavigation(e: KeyboardEvent){
         const focusables: NodeListOf<HTMLButtonElement | HTMLInputElement | HTMLSelectElement> = this.$refs.contentContainer.querySelectorAll("button")
         if(e.shiftKey && document.activeElement === focusables[0]){
            focusables[focusables.length - 1].focus()
            e.preventDefault()
            return
         }
         if(!e.shiftKey && document.activeElement === focusables[focusables.length - 1]){
            focusables[0].focus()
            e.preventDefault()
            return
         }
      }
   },
   mounted(){
      document.body.style.overflow = "hidden"
   },
   unmounted(){
      document.body.style.overflow = "unset"
      this.closeFocusTarget?.focus()
   }
})
</script>

<style scoped>
article{
   width: calc(100% - 4rem);
   max-width: calc(100% - 4rem);
   max-height: calc(100% - 8rem);
}
@media (min-width: 768px){
   article{
      width: 40rem;
      max-height: calc(100% - 12rem);
   }
}
</style>