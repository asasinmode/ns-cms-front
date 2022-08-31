<template>
   <div class="flex flex-col md:flex-row gap-3 md:gap-10">
      <div class="flex flex-col xl:flex-row gap-3 xl:gap-10">
         <Input :id="`sideNumber${ id }`" :placeholder="'side number'" v-model="inputs.sideNumber"
            :v$="v$.inputs.sideNumber"
         />
         <Input :id="`manufacturer${ id }`" :placeholder="'manufacturer'" v-model="inputs.manufacturer"
            :v$="v$.inputs.manufacturer"
         />
      </div>
      <div class="flex flex-col xl:flex-row gap-3 xl:gap-10">
         <Input :id="`softwareVersion${ id }`" :placeholder="'software version'" v-model="inputs.softwareVersion"
            :v$="v$.inputs.softwareVersion"
            :pattern="softwareVersionPattern"
         />
         <Input :id="`model${ id }`" :placeholder="'model'" v-model="inputs.model"
            :v$="v$.inputs.model"
         />
      </div>
   </div>
   <div class="flex flex-col gap-3 max-w-lg md:flex-row md:w-full md:justify-center">
      <NumberInput :id="`vintage${ id }`" v-model="inputs.vintage" :min="minimumVintageYear" :max="new Date().getFullYear()"
         :v$="v$.inputs.vintage"
      >
         vintage:
      </NumberInput>
      <NumberInput :id="`ammunitionLeft${ id }`" v-model="inputs.ammunitionLeft" :min="0"
         :v$="v$.inputs.ammunitionLeft"
      >
         ammunition left:
      </NumberInput>
      <NumberInput :id="`altitude${ id }`" v-model="inputs.altitude" :min="0"
         :v$="v$.inputs.altitude"
      >
         altitude (km):
      </NumberInput>
   </div>
   <div class="flex flex-col gap-3 w-full max-w-xl lg:flex-row mb-5 lg:mb-0">
      <BooleanInput v-model="inputs.hasAI" :name="`hasAI${ id }`"
         class="flex-1 flexCentered"
      >
         does it have AI?
      </BooleanInput>
      <DateInput :id="`launchDate${ id }`" v-model="inputs.launchDate" :min="minimumLaunchDate" :max="new Date()"
         :v$="v$.inputs.launchDate"
         class="flex-1 flex items-center justify-center lg:justify-start"
      >
         launch date:
      </DateInput>
   </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import useVuelidate from "@vuelidate/core";
import { helpers, minValue, maxValue } from "@vuelidate/validators";
import type { ifSatelliteForm } from "@/typings/satellite";
import { matchesRegex, requiredWithMessage } from "@/helpers/validation";
import Input from "@/components/Misc/Inputs/Input.vue"
import BooleanInput from "@/components/Misc/Inputs/BooleanInput.vue"
import NumberInput from "@/components/Misc/Inputs/NumberInput.vue";
import DateInput from "@/components/Misc/Inputs/DateInput.vue";

const isLaunchDateValid = (after: Date) => (value: Date) => value >= after && value <= new Date()

export default defineComponent({
   name: "SatelliteForm",
   components: { Input, BooleanInput, NumberInput, DateInput },
   props: {
      id: {
         type: String,
         required: true
      },
      initialValues: {
         type: Object as PropType<Partial<ifSatelliteForm>>,
         required: true
      }
   },
   setup(){
      return {
         v$: useVuelidate({ $lazy: true })
      }
   },
   data(){
      return {
         inputs: <ifSatelliteForm> {
            sideNumber: "",
            manufacturer: "",
            softwareVersion: "",
            model: "",
            vintage: new Date().getFullYear(),
            launchDate: new Date(),
            ammunitionLeft: 3,
            altitude: 300,
            hasAI: false
         },
         minimumLaunchDate: new Date('01 Jan 1970 00:00:00 GMT'),
         minimumVintageYear: 1900,
         softwareVersionPattern: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
      }
   },
   mounted(){
      this.resetMe()
   },
   methods: {
      resetMe(){
         Object.keys(this.inputs).forEach((input) => {
            // @ts-ignore
            const predefinedValue = this.initialValues[input]
            if(predefinedValue === undefined){
            // @ts-ignore
               this.inputs[input] = ""
               return
            }
            // @ts-ignore
            this.inputs[input] = predefinedValue
         })
         this.v$.$reset()
      }
   },
   computed: {
      inputValues(){
         return {
            sideNumber: this.inputs.sideNumber,
            manufacturer: this.inputs.manufacturer,
            softwareVersion: this.inputs.softwareVersion,
            model:this.inputs.model,
            vintage: this.inputs.vintage,
            launchDate: this.inputs.launchDate,
            ammunitionLeft: this.inputs.ammunitionLeft,
            altitude: this.inputs.altitude,
            hasAI: this.inputs.hasAI
         }
      }
   },
   validations(){
      const currentYear = new Date().getFullYear()
      return {
         inputs: {
            sideNumber: {
               required: requiredWithMessage,
            },
            manufacturer: {
               required: requiredWithMessage
            },
            model: {
               required: requiredWithMessage
            },
            softwareVersion: {
               required: requiredWithMessage,
               mustBeValid: helpers.withMessage("must be valid semver", matchesRegex(this.softwareVersionPattern))
            },
            vintage: {
               required: requiredWithMessage,
               minValue: helpers.withMessage(`min ${ this.minimumVintageYear }`, minValue(this.minimumVintageYear)),
               maxValue: helpers.withMessage(`max ${ currentYear }`, maxValue(currentYear))
            },
            launchDate: {
               required: requiredWithMessage,
               isValid: helpers.withMessage('must be between 1970 and now', isLaunchDateValid(this.minimumLaunchDate))
            },
            ammunitionLeft: {
               required: requiredWithMessage,
               minValue: helpers.withMessage('must be a positive integer', minValue(0))
            },
            altitude: {
               required: requiredWithMessage,
               minValue: helpers.withMessage('must be a positive integer', minValue(0))
            }
         }
      }
   }
})
</script>

<style scoped>

</style>