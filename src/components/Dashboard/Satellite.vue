<template>
   <article class="w-full hover:bg-neon-green/10" :class="{ 'bg-neon-green/10': isExpanded }">
      <button class="w-full h-12" @click="$emit('expandMe', id)" :disabled="isExpanded">
         <FontAwesomeIcon v-if="isNew" icon="fa-solid fa-plus" size="lg" />
         <span v-else>
            {{ satellite?.sideNumber }} <span class="text-white/80 ml-1">({{ satellite?._id }})</span>
         </span>
      </button>
      <div class="flex flex-col items-center gap-4" v-show="isExpanded">
         <Input :id="`sideNumber${ id }`" :placeholder="'side number'" v-model="input.sideNumber.value"
            :showError="input.sideNumber.showError" :errorText="'side number cannot be empty'"
         />
         <Input :id="`manufacturer${ id }`" :placeholder="'manufacturer'" v-model="input.manufacturer.value"
            :showError="input.manufacturer.showError" :errorText="'manufacturer cannot be empty'"
         />
         <Input :id="`softwareVersion${ id }`" :placeholder="'software version'" v-model="input.softwareVersion.value"
            :showError="input.softwareVersion.showError" :errorText="input.softwareVersion.errorText"
            :pattern="input.softwareVersion.pattern"
         />
         <Input :id="`model${ id }`" :placeholder="'model'" v-model="input.model.value" />
         <DateInput :id="`launchDate${ id }`" v-model="input.launchDate.value" :min="minimumLaunchDate" :max="currentDate">
            launch date:
         </DateInput>
         <NumberInput :id="`vintage${ id }`" v-model="input.vintage.value" :min="minimumVintageYear" :max="currentDate.getFullYear()">
            vintage:
         </NumberInput>
         <NumberInput :id="`ammunitionLeft${ id }`" v-model="input.ammunitionLeft.value" :min="0">
            ammunition left:
         </NumberInput>
         <NumberInput :id="`altitude${ id }`" v-model="input.altitude.value" :min="0">
            altitude (km):
         </NumberInput>
         <BooleanInput v-model="input.hasAI.value" :name="`hasAI${ id }`" class="w-64">
            does it have AI?
         </BooleanInput>
         <SaveButton :isProcessing="isProcessing" />
      </div>
   </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import Button from "@/components/Misc/Button.vue"
import Input from "@/components/Misc/Inputs/Input.vue"
import BooleanInput from "@/components/Misc/Inputs/BooleanInput.vue"
import NumberInput from "@/components/Misc/Inputs/NumberInput.vue";
import DateInput from "../Misc/Inputs/DateInput.vue";
import SaveButton from "./SaveButton.vue"
import type { ifSatellite } from "@/typings/satellite";

export default defineComponent({
   name: "Satellite",
   components: { Button, Input, BooleanInput, NumberInput, DateInput, SaveButton },
   props: {
      id: {
         type: String,
         required: true,
      },
      satellite: {
         type: Object as PropType<ifSatellite>
      },
      selectedSatellite: {
         type: String,
         required: true,
      }
   },
   data(){
      return {
         minimumLaunchDate: new Date('01 Jan 1970 00:00:00 GMT'),
         minimumVintageYear: 1900,
         currentDate: new Date(),
         input: {
            sideNumber: {
               value: "",
               showError: false
            },
            manufacturer: {
               value: "",
               showError: false
            },
            model: {
               value: ""
            },
            softwareVersion: {
               value: "",
               showError: false,
               errorText: "needs to be a valid semantic version",
               pattern: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
            },
            vintage: {
               value: new Date().getFullYear(),
               showError: false,
               errorText: `needs to be between ${ this.minimumVintageYear } and ${ new Date().getFullYear() }`
            },
            launchDate: {
               value: new Date(),
               showError: false,
               errorText: `needs to be between 01.01.1970 and now`
            },
            ammunitionLeft: {
               value: 3
            },
            altitude: {
               value: 300
            },
            hasAI: {
               value: false,
            }
         },
         isProcessing: false
      }
   },
   mounted(){
      if(this.isNew){ return }
      Object.keys(this.input).forEach(key => {
         this.input[key as keyof typeof this.input].value = (this.satellite as ifSatellite)[key as keyof typeof this.satellite]
      })
   },
   methods: {
      
   },
   computed: {
      isNew(){
         return this.id === 'new'
      },
      isExpanded(){
         return this.id === this.selectedSatellite
      }
   }
})
</script>

<style scoped>
article > div > *:first-child{
   margin-top: 1rem;
}
</style>