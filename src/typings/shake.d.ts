import shake from "../plugins/shake";

declare module '@vue/runtime-core' {
   export interface ComponentCustomProperties {
      $shake: typeof shake
      $validate: (element: HTMLElement, delay: number) => boolean
   }
}