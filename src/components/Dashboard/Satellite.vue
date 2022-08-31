<template>
   <article class="w-full hover:bg-neon-green/10" :class="{ 'bg-neon-green/10': isExpanded }">
      <button @click="$emit('expandMe', id)" :disabled="isExpanded" :id="`buttonExpand${ id }`"
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
         <SatelliteForm :id="id" :initialValues="initialValues" ref="form" />
         <div class="flexCentered flex-col gap-0">
            <OperationButtons :id="id" :isLoading="isProcessing" :isNew="isNew"
               @save="updateSatellite(false)" @create="updateSatellite(true)" @delete="modal.isOpen = true"
            />
            <Timestamps v-if="satellite" :updatedAt="satellite.updatedAt" :createdAt="satellite.createdAt" />
         </div>
      </div>
      <ConfirmModal v-if="showModal"
         @confirm="deleteSatellite" @close="modal.isOpen = false" @cancel="modal.isOpen = false"
         :isLoading="isProcessing" :showError="errorMessage.length > 0"
         :closeFocusTarget="modal.closeFocusTarget"
      >
         <template v-if="errorMessage.length === 0">
            delete satellite {{ satellite?.sideNumber }}
         </template>
         <template v-else>
            {{ errorMessage }}
         </template>
      </ConfirmModal>
   </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import OperationButtons from "./Satellite/OperationButtons.vue"
import Timestamps from "./Satellite/Timestamps.vue";
import ConfirmModal from "@/components/Misc/ConfirmModal.vue";
import SatelliteForm from "./Satellite/Form.vue"
import type { ifSatellite, ifSatelliteForm } from "@/typings/satellite";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import useVuelidate from "@vuelidate/core";

export default defineComponent({
   name: "Satellite",
   components: { Timestamps, OperationButtons, ConfirmModal, SatelliteForm },
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
   setup(){
      return {
         v$: useVuelidate()
      }
   },
   data(){
      return {
         isProcessing: false,
         error: <any> undefined,
         modal: {
            isOpen: false,
            closeFocusTarget: <HTMLElement | undefined> undefined
         },
         initialValues: <Partial<ifSatelliteForm>> {}
      }
   },
   beforeMount(){
      const uselessKeys = ['createdAt', 'updatedAt', '_id']
      if(!this.isNew){
         const formKeys = Object.keys(this.satellite as ifSatellite).filter(key => !uselessKeys.includes(key))
         this.initialValues = formKeys.reduce((previous, current) => ({
            ...previous,
            [current]: (this.satellite as ifSatellite)[current as keyof typeof this.satellite]
         }), {})
         return
      }

      this.initialValues = {
         vintage: new Date().getFullYear(),
         launchDate: new Date(),
         ammunitionLeft: 3,
         altitude: 300,
         hasAI: false
      }
   },
   mounted(){
      if(!this.isNew){
         this.modal.closeFocusTarget = document.getElementById('delete' + this.id) as HTMLButtonElement
      }
   },
   methods: {
      async updateSatellite(createNew: boolean){
         this.error = undefined

         const isSatelliteValid = await this.v$.$validate()
         if(!isSatelliteValid){ return }

         const inputValues = this.$refs.form.inputValues

         this.isProcessing = true

         try {
            const body = {
               ...inputValues,
               launchDate: inputValues.launchDate.getTime()
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
            return
         } finally {
            this.isProcessing = false
         }

         if(createNew){
            this.$refs.form.resetMe()
         }
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
            return
         } finally {
            this.isProcessing = false
         }

         this.modal.isOpen = false
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
      },
      showModal(){
         return !this.isNew && this.modal.isOpen
      }
   },
   watch: {
      selectedSatellite(){
         if(this.selectedSatellite !== this.id){
            this.v$.$reset()
         }
      }
   }
})
</script>

<style scoped>
</style>