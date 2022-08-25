import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
   state: () => ({
      name: "test",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMDYzMGFlZjcwMmVhZmM0MzA0MzZmYSIsImlhdCI6MTY2MTQzOTY0MywiZXhwIjoxNjYxNTI2MDQzfQ._8i-htypgmDL2ougU_3kY6LlFeeL0kSJK4kB6jENbc4",
      id: "630630aef702eafc430436fa",
      country: "test",
      hasButton: false
   }),
   getters: {
      isLoggedIn: (state) => {
         return state.token.length > 0 && state.id.length > 0
      }
   },
   actions: {
      setPresident(name: string, token: string, id: string, country: string, hasButton: boolean){
         console.log(token, id)
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
