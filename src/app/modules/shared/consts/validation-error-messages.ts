export type errorTextFn = (...args: any) => string;
export type errorTextFunctions = Record<string, errorTextFn>;

export const VALIDATORS_ERROR_MESSAGES: errorTextFunctions = {
  required: () => 'Campo Obligatorio',
  minlength: (...args) => `Carácteres mínimos: ${args[0].requiredLength}`,
  maxlength: (...args) => `Carácteres máximos: ${args[0].requiredLength}`,
  email: () => 'Email Inválido'
};
