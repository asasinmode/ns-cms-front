<template>
   <article class="w-full hover:bg-neon-green/10" :class="{ 'bg-neon-green/10': isExpanded }">
      <button @click="$emit('expandMe', id)" :disabled="isExpanded"
         class="w-full h-12 glow-rule after:h-[2px] after:w-full after:left-0
            after:opacity-0 hover:after:opacity-30 disabled:hover:after:opacity-0 focus-visible:bg-white/10"
         :class="{ 'after:bottom-[-2px] ': !isNew,
            'after:top-[-2px]': isNew  }"
      >
         <FontAwesomeIcon v-if="!satellite" icon="fa-solid fa-plus" size="lg" />
         <span v-else>
            {{ satellite.sideNumber }} <span class="text-white/80 ml-1">({{ satellite._id }})</span>
         </span>
      </button>
      <div v-show="isExpanded" class="flex flex-col items-center pt-4 pb-3 gap-4">
         <div class="flex flex-col md:flex-row gap-3 md:gap-10">
            <div class="flex flex-col xl:flex-row gap-3 xl:gap-10">
               <Input :id="`sideNumber${ id }`" :placeholder="'side number'" v-model="input.sideNumber.value"
                  :showError="input.sideNumber.showError" :errorText="'side number cannot be empty'"
                  @input="input.sideNumber.showError = false"
               />
               <Input :id="`manufacturer${ id }`" :placeholder="'manufacturer'" v-model="input.manufacturer.value"
                  :showError="input.manufacturer.showError" :errorText="'manufacturer cannot be empty'"
                  @input="input.manufacturer.showError = false"
               />
            </div>
            <div class="flex flex-col xl:flex-row gap-3 xl:gap-10">
               <Input :id="`softwareVersion${ id }`" :placeholder="'software version'" v-model="input.softwareVersion.value"
                  :showError="input.softwareVersion.showError" :errorText="softwareVersionInputErrorText"
                  :pattern="input.softwareVersion.pattern" @input="input.softwareVersion.showError = false"
               />
               <Input :id="`model${ id }`" :placeholder="'model'" v-model="input.model.value" />
            </div>
         </div>
         <div class="flex flex-col gap-3 max-w-lg md:flex-row md:w-full md:justify-center">
            <NumberInput :id="`vintage${ id }`" v-model="input.vintage.value" :min="minimumVintageYear" :max="new Date().getFullYear()"
               :errorText="input.vintage.errorText" :showError="input.vintage.showError" @input="input.vintage.showError = false"
            >
               vintage:
            </NumberInput>
            <NumberInput :id="`ammunitionLeft${ id }`" v-model="input.ammunitionLeft.value" :min="0"
               :errorText="'needs to be non-negative'" :showError="input.ammunitionLeft.showError" @input="input.ammunitionLeft.showError = false"
            >
               ammunition left:
            </NumberInput>
            <NumberInput :id="`altitude${ id }`" v-model="input.altitude.value" :min="0"
               :errorText="'needs to be non-negative'" :showError="input.altitude.showError" @input="input.altitude.showError = false"
            >
               altitude (km):
            </NumberInput>
         </div>
         <div class="flex flex-col gap-3 w-full max-w-xl lg:flex-row">
            <BooleanInput v-model="input.hasAI.value" :name="`hasAI${ id }`"
               class="flex-1 flexCentered"
            >
               does it have AI?
            </BooleanInput>
            <DateInput :id="`launchDate${ id }`" v-model="input.launchDate.value" :min="minimumLaunchDate" :max="new Date()"
               :errorText="'needs to be between 1970 and now'" :showError="input.launchDate.showError" @input="input.launchDate.showError = false"
               class="flex-1 flex items-center justify-center lg:justify-start"
            >
               launch date:
            </DateInput>
         </div>
         <div class="flexCentered flex-col gap-0">
            <h3 class="text-neon-red text-lg text-center" v-if="errorMessage.length > 0">
               {{ errorMessage }}
            </h3>
            <OperationButtons :isProcessing="isProcessing" @save="updateSatellite(false)" @create="updateSatellite(true)" @delete="deleteSatellite" :isNew="isNew" />
            <Timestamps v-if="satellite" :updatedAt="satellite.updatedAt" :createdAt="satellite.createdAt" />
         </div>
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
import OperationButtons from "./OperationButtons.vue"
import Timestamps from "./Timestamps.vue";
import type { ifSatellite } from "@/typings/satellite";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";

export default defineComponent({
   name: "Satellite",
   components: { Button, Input, BooleanInput, NumberInput, DateInput, Timestamps, OperationButtons },
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
         isProcessing: false,
         error: <any> undefined,
         input: {
            sideNumber: {
               value: "",
               showError: false
            },
            manufacturer: {
               value: "",
               showError: false
            },
            softwareVersion: {
               value: "",
               showError: false,
               pattern: /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/
            },
            model: {
               value: ""
            },
            vintage: {
               value: new Date().getFullYear(),
               showError: false,
               errorText: `needs to be between 1900 and ${ new Date().getFullYear() }`
            },
            launchDate: {
               value: new Date(),
               showError: false
            },
            ammunitionLeft: {
               value: 3,
               showError: false
            },
            altitude: {
               value: 500,
               showError: false
            },
            hasAI: {
               value: false,
            }
         }
      }
   },
   beforeMount(){
      if(this.isNew){ return }
      Object.keys(this.input).forEach(key => {
         this.input[key as keyof typeof this.input].value = (this.satellite as ifSatellite)[key as keyof typeof this.satellite]
      })
   },
   methods: {
      async updateSatellite(createNew: boolean){
         this.error = undefined

         const isSatelliteValid = this.validateSatellite()
         if(!isSatelliteValid){ return }

         this.isProcessing = true

         try {
            const body = {
               ...this.inputValues,
               launchDate: this.inputValues.launchDate.getTime()
            }

            let satelliteData

            if(createNew){
               satelliteData = await this.$http.post('satellites', body, {
                  headers: { 'Authorization': `Bearer: ${ this.token }` }
               }).then(res => res.data)
            } else {
               satelliteData = await this.$http.patch(`satellites/${ this.id }`, body, {
                  headers: { 'Authorization': `Bearer: ${ this.token }` }
               }).then(res => res.data)
            }

            this.$emit(createNew ? "createNew" : "updateMe", satelliteData)
         } catch(e: any){
            this.error = e
         }

         this.isProcessing = false
      },
      async deleteSatellite(){
         this.error = undefined
         this.isProcessing = true

         try {
            await this.$http.delete(`satellites/${ this.id }`, {
               headers: { 'Authorization': `Bearer: ${ this.token }` }
            })

            this.$emit('deleteMe', this.id)
         } catch(e: any){
            this.error = e
         }

         this.isProcessing = false
      },
      validateSatellite(){
         const { sideNumber, manufacturer, softwareVersion, vintage, launchDate, ammunitionLeft, altitude } = this.inputValues

         // variable error text
         const isSoftwareVersionEmpty = softwareVersion.length === 0
         const isSoftwareVersionValid = softwareVersion.match(this.input.softwareVersion.pattern) !== null
         this.input.softwareVersion.showError = isSoftwareVersionEmpty || !isSoftwareVersionValid

         this.input.sideNumber.showError = sideNumber.length === 0
         this.input.manufacturer.showError = manufacturer.length === 0
         this.input.vintage.showError = vintage < this.minimumVintageYear || vintage > new Date().getFullYear()
         this.input.launchDate.showError = launchDate < this.minimumLaunchDate || launchDate > new Date()
         this.input.ammunitionLeft.showError = ammunitionLeft < 0
         this.input.altitude.showError = altitude < 0

         return Object.keys(this.input).reduce((previous, next) => {
            // @ts-ignore
            if(this.input[next].showError === undefined){
               return previous
            }
            // @ts-ignore
            return previous && !this.input[next].showError
         }, true)
      }
   },
   computed: {
      ...mapState(useUserStore, ['token']),
      isNew(){
         return this.id === 'new'
      },
      isExpanded(){
         return this.id === this.selectedSatellite
      },
      inputValues(){
         return {
            sideNumber: this.input.sideNumber.value,
            manufacturer: this.input.manufacturer.value,
            softwareVersion: this.input.softwareVersion.value,
            model:this.input.model.value,
            vintage: this.input.vintage.value,
            launchDate: this.input.launchDate.value,
            ammunitionLeft: this.input.ammunitionLeft.value,
            altitude: this.input.altitude.value,
            hasAI: this.input.hasAI.value
         }
      },
      softwareVersionInputErrorText(){
         return this.input.softwareVersion.value.length === 0 ? "cannot be empty" : "invalid semver format"
      },
      errorMessage(): string{
         if(this.error === undefined){
            return ""
         }

         if(this.error.name !== "AxiosError" || !this.error.response){
            console.error(this.error)
            return "unknown error has occurred"
         }

         if(this.error.code === "ERR_NETWORK"){
            return "no connection to server"
         }

         const responseStatus = this.error.response.status

         return responseStatus === 401 ? "unauthorized. try to login again"
            : responseStatus === 404 ? "not found. try to refresh page"
            : responseStatus === 500 ? "unknown error has occurred"
            : "invalid satellite data"
      }
   }
})
</script>

<style scoped>
</style>