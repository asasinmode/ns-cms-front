<template>
   <div class="inputContainer flexCentered h-fit"
      :class="{ '!mb-5': helperText.length || errorText.length,
         'error': isInvalid }"
   >
      <input :id="id" placeholder=" " :value="modelValue" v-bind="$attrs" :pattern="pattern.source"
         @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      <div class="inputLabelContainer">
         <div class="leadingOutline" />
         <div class="notchedOutline">
            <label :for="id">
               {{ placeholder }}
            </label>
         </div>
         <div class="trailingOutline" />
      </div>
      <span v-if="helperText.length > 0" v-show="!isInvalid" class="flex pointer-events-none text-[0.8em] absolute left-4 bottom-0 translate-y-full text-white/50">
         {{ helperText }}
      </span>
      <span v-if="errorText.length > 0" v-show="isInvalid" class="flex pointer-events-none text-[0.8em] absolute left-4 bottom-0 translate-y-full text-neon-red">
         {{ errorText }}
      </span>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
   inheritAttrs: false,
   name: 'Input',
   props: {
      placeholder: {
         type: String,
         required: true
      },
      modelValue: {
         type: String,
         default: ""
      },
      showError: {
         type: Boolean,
         default: false
      },
      pattern: {
         type: RegExp,
         default: /./g
      },
      helperText: {
         type: String,
         default: ""
      },
      errorText: {
         type: String,
         default: ""
      },
      id: {
         type: String,
         required: true
      }
   },
   computed: {
      isInvalid(){
         return this.showError || this.modelValue.replace(this.pattern, '') !== ""
      }
   }
})
</script>

<style scoped>
.inputContainer{
   position: relative;
   background: transparent;
   cursor: text;
   max-width: 16rem;
}
input{
   display: flex;
   padding: 12px 16px 14px;
   border: none !important;
   background: transparent;
   appearance: none;
   z-index: 1;
   color: hsl(0 0% 100%);
   width: 100%;
}
input:focus, input:focus-visible{
   box-shadow: none;
   outline: none;
}
.inputLabelContainer{
   display: flex;
   position: absolute;
   right: 0;
   left: 0;
   box-sizing: border-box;
   width: 100%;
   max-width: 100%;
   height: 100%;
   text-align: left;
}
.leadingOutline{
   border-radius: 4px 0 0 4px;
   border-left: 1px solid;
   border-right: none;
   width: 12px;
}
.notchedOutline{
   flex: 0 0 auto;
   width: auto;
   max-width: calc(100% - 12px * 2);
   border-left: none;
   border-right: none;
}
.trailingOutline{
   border-radius: 0 4px 4px 0;
   border-left: none;
   border-right: 1px solid;
   flex-grow: 1;
}
.leadingOutline, .notchedOutline, .trailingOutline{
   height: 100%;
   border-top: 1px solid;
   border-bottom: 1px solid;
   border-color: hsl(0 0% 50%);
}
.inputContainer:hover :is(.leadingOutline, .notchedOutline, .trailingOutline){
   border-color: hsl(0 0% 100%);
}
label{
   color: hsl(0 0% 50%);
   display: inline-block;
   position: relative;
   max-width: 100%;
   left: 4px;
   right: initial;
   top: 50%;
   transform: translateY(-50%);
   font-size: 1rem;
   transform-origin: left top;
   line-height: 1.15rem;
   text-align: left;
   text-overflow: ellipsis;
   white-space: nowrap;
   overflow: hidden;
}
input:focus + .inputLabelContainer > div{
   border-width: 2px;
   border-color: var(--neon-green) !important;
}
input:focus + .inputLabelContainer label{
   top: 0;
   transform: translateY(-50%) scale(0.8);
   color: var(--neon-green);
}
.inputContainer.error input:focus + .inputLabelContainer > div,
.inputContainer.error :is(.leadingOutline, .notchedOutline, .trailingOutline){
   @apply !border-neon-red;
}
.inputContainer.error input:not(:placeholder-shown) + .inputLabelContainer label,
.inputContainer.error input:focus + .inputLabelContainer label{
   @apply text-neon-red;
}
input:not(:placeholder-shown) + .inputLabelContainer label{
   top: 0;
   transform: translateY(-50%) scale(0.8);
}
input:focus + .inputLabelContainer > .notchedOutline, input:not(:placeholder-shown) + .inputLabelContainer > .notchedOutline{
   border-top: none;
}
</style>