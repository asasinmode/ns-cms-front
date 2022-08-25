<template>
   <header class="w-full h-14 glow-rule border-t-0 border-x-0 mb-[2px] glow-gap-vertical
      after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full
      flex flex-row"
   >
      <div class="px-4 flex items-center justify-start min-w-[3.5rem] max-w-[5rem] md:max-w-[10rem]">
         <span class="text-ellipsis whitespace-nowrap inline-block overflow-hidden">
            {{ country }}
         </span>
      </div>
      <div class="flex-1 flexCentered">
         <h3 class="text-lg text-center">{{ name }} <span class="text-white/80 ml-1 text-base hidden md:inline-block">({{ id }})</span></h3>
      </div>
      <TopSecret v-if="hasButton" />
      <Button class="w-14 min-w-[3.5rem] !h-full" title="logout" @click="logout">
         <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" class="pointer-events-none" title="logout" size="lg" />
      </Button>
   </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import Button from "../Misc/Button.vue";
import TopSecret from "./TopSecret.vue";

export default defineComponent({
   name: "Header",
   components: { Button, TopSecret },
   methods: {
      ...mapActions(useUserStore, ["logout"])
   },
   computed: {
      ...mapState(useUserStore, ["name", "country", "id", 'hasButton'])
   }
})
</script>

<style scoped>
.font-top-secret{
   font-family: 'Top Secret', sans-serif;
}
</style>