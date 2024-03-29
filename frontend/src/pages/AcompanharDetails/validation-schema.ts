import * as yup from 'yup';

const min = 'Deve ter ao menos ${min} caracteres.';
const required = 'Campo obrigatório.';

export const validationsObservacao = yup.object({
  observacao: yup.string().min(10, min).required(required),
});
