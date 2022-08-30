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

         sessionStorage.setItem('presidentState', JSON.stringify(this.$state))
      },
      logout(){
         this.name = ""
         this.token = ""
         this.id = ""
         this.country = ""
         this.hasButton = false

         sessionStorage.clear()
      },
      checkLocalStorage(){
         const sessionState = sessionStorage.getItem('presidentState')
         if(!sessionState){ return }

         this.$state = JSON.parse(sessionState)
      }
   }
})
