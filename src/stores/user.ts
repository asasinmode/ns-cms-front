import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
   state: () => ({
      name: "",
      token: "",
      id: "",
      country: "",
      hasButton: false
   }),
   getters: {
      isLoggedIn: (state) => {
         return state.token.length > 0 && state.id.length > 0
      }
   },
   actions: {
      setPresident(name: string, token: string, id: string, country: string, hasButton: boolean){
         this.name = name
         this.token = token
         this.id = id
         this.country = country
         this.hasButton = hasButton
      },
      logout(){
         this.name = ""
         this.token = ""
         this.id = ""
         this.country = ""
         this.hasButton = false
      }
   }
})
