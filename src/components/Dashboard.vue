<template>
   <Header />
   <main class="w-full flex-1 overflow-x-hidden overflow-y-auto">
      <template v-if="!isLoadingSatellites">
         <Satellite v-for="satellite in satellites" :key="satellite._id" :id="satellite._id" :satellite="satellite"
            :selectedSatellite="selectedSatellite" @expandMe="selectSatellite" />
         <Satellite :selectedSatellite="selectedSatellite" :id="'new'" @expandMe="selectSatellite" />
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
      }
   },
   computed: {
      ...mapState(useUserStore, ['token'])
   }
})
</script>

<style scoped>

</style>