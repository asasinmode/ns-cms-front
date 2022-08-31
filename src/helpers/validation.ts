import { helpers, required } from "@vuelidate/validators"

export const matchesRegex = (pattern: RegExp) => (value: string) => pattern.test(value)

export const requiredWithMessage = helpers.withMessage('cannot be empty', required)
