<template>
   <div class="relative hidden md:flexCentered w-32">
      <Button class="!h-full flex-1" @click="isExpanded = !isExpanded">
      <span>TOP SECRET</span>
   </Button>
   <article v-show="isExpanded" class="absolute w-64 h-64 z-10 right-[-2px] bottom-[-2px] translate-y-full
      bg-black glow-border glow-sm flex flex-col items-center p-2"
   >
      <h1 class="text-center">here's your button</h1>
      <div class="w-32 h-32 my-auto flex justify-center items-start pt-4">
         <button class="pushButton" tabindex="-1"></button>
      </div>
      <h3 class="text-center">you can press it</h3>
   </article>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "../Misc/Button.vue";

export default defineComponent({
   name: "TopSecret",
   components: { Button },
   data(){
      return {
         isExpanded: false
      }
   }
})
</script>

<style scoped>
.pushButton {
   --pb-color-top: hsl(0 100% 50%);
   --pb-color-side: hsl(0 100% 45%);
   --pb-color-border: hsl(0 100% 30%);
   --pb-color-plate: hsl(210, 100%, 60%);
   --pb-color-plate-accent: hsl(210, 100%, 40%)
}
.pushButton, .pushButton:before{
   transition: all 95ms cubic-bezier(0, 0, 1, 1);
}
.pushButton {
   position: relative;
   cursor: pointer;
   padding: 2em 2.5em;
   border: 2px solid var(--pb-color-border);
   border-radius: 3em;
   background: var(--pb-color-top);
   transform-style: preserve-3d;
}

.pushButton::before {
   position: absolute;
   content: "";
   width: 100%;
   height: 100%;
   inset: 0;
   background: var(--pb-color-side);
   border-radius: 2.25em 2.25em 3em 3em;
   box-shadow: 0 0 0 2px var(--pb-color-plate-accent),
      0 0.25em 0 1.2em var(--pb-color-plate),
      0 0.5em 0 1em var(--pb-color-plate),
      0 0 0 1em var(--pb-color-plate);
   transform: translate3d(0, 1.2em, -1em);
}

.pushButton:active{
   transform: translate(0, 1.2em);
   box-shadow: 0 1px 1px 0 hsl(0 0% 0% / 0), 0 4px 4px hsl(0 0% 0% / 0);
}
.pushButton:active::before {
   transform: translate3d(0, 0, -1.2em);
   box-shadow: 0 0 0 0 var(--pb-color-plate-accent),
      0 0.25em 0 1.2em var(--pb-color-plate),
      0 0.5em 0 1em var(--pb-color-plate),
      0 0 0 1em var(--pb-color-plate);
}
</style>