<template>
   <Header />
   <main class="w-full flex-1 overflow-x-hidden overflow-y-auto">
      <template v-if="!isLoadingSatellites">
         <Satellite v-for="satellite in satellites" :key="satellite._id" :id="satellite._id" :satellite="satellite"
            :selectedSatellite="selectedSatellite" @expandMe="selectSatellite"
            @deleteMe="spliceSatellite" @updateMe="updateSatellite"
         />
         <Satellite :selectedSatellite="selectedSatellite" :id="'new'" @expandMe="selectSatellite"
            @createNew="pushSatellite"
         />
      </template>
      <Loading v-else />
   </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useUserStore } from "@/stores/user";
import Header from "./Dashboard/Header.vue";
import Satellite from "./Dashboard/Satellite.vue";
import Loading from "./Misc/Loading.vue";
import type { ifSatellite } from "@/typings/satellite";

export default defineComponent({
   name: "Dashboard",
   components: { Header, Satellite, Loading },
   data(){
      return {
         selectedSatellite: "",
         isLoadingSatellites: false,
         satellites: <ifSatellite[]> []
      }
   },
   mounted(){
      this.loadSatellites()
   },
   methods: {
      selectSatellite(id: string){
         this.selectedSatellite = id
      },
      async loadSatellites(){
         this.isLoadingSatellites = true

         this.satellites = await this.$http.get('satellites', {
            headers: {
               'Authorization': `Bearer: ${ this.token }`
            }
         }).then(res => res.data.map((satellite: any) => {
            return {
               ...satellite,
               launchDate: new Date(satellite.launchDate),
               createdAt: new Date(satellite.createdAt),
               updatedAt: new Date(satellite.updatedAt)
            }
         }))

         this.isLoadingSatellites = false
      },
      spliceSatellite(id: string){
         this.satellites.splice(this.satellites.findIndex((satellite: ifSatellite) => satellite._id === id), 1)
      },
      pushSatellite(satellite: ifSatellite){
         this.satellites.push(this.dateifySatellite(satellite))
      },
      updateSatellite(satellite: ifSatellite){
         const satelliteIndex = this.satellites.findIndex((oldSatellite: ifSatellite) => oldSatellite._id === satellite._id)
         this.satellites[satelliteIndex] = this.dateifySatellite(satellite)
      },
      dateifySatellite(satellite: ifSatellite){
         return {
            ...satellite,
            createdAt: new Date(satellite.createdAt),
            updatedAt: new Date(satellite.updatedAt),
            launchDate: new Date(satellite.launchDate)
         }
      }
   },
   computed: {
      ...mapState(useUserStore, ['token'])
   }
})
</script>

<style scoped>

</style>