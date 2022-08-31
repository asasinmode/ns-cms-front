export interface ifSatelliteForm {
   sideNumber: string
   manufacturer: string
   model: string
   softwareVersion: string
   vintage: number
   launchDate: Date
   ammunitionLeft: number
   altitude: number
   hasAI: boolean
}

export interface ifSatellite extends ifSatelliteForm {
   _id: string
   createdAt: Date
   updatedAt: Date
}