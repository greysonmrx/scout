export default {
  REQUIRED: 'Este campo é obrigatório',
  NUMBER: 'Este campo precisa ser um número',
  MIN: (minValue: number): string => `Este campo precisa ser maior ou igual a ${minValue}`,
  MAX: (maxValue: number): string => `Este campo precisa ser menor ou igual a ${maxValue}`,
};
