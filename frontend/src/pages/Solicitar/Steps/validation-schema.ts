import * as yup from 'yup';

const required = 'Campo obrigatório.';
const email = 'Formato incorreto.';
const length = 'Exatamente ${length} caracteres.';
const number = 'Deve ser um número.';
const min = 'Deve ter ao menos ${min} caracteres.';

export const validationSchemaEstagiario = yup.object({
  estagiario: yup.object({
    nome: yup.string().min(2, min).required(required),
    email: yup.string().email(email).required(required),
    telefone: yup.number().typeError(number).required(required),
    endereco: yup.string().min(2, min).required(required),
    bairro: yup.string().min(2, min).required(required),
    cep: yup.number().typeError(number).required(required),
    cidade: yup.string().min(2, min).required(required),
    uf: yup.string().length(2, length).required(required),
    campus: yup.string().typeError(required).required(required),
    matricula: yup.number().typeError(number).required(required),
    curso: yup.string().min(2, min).required(required),
    semestre: yup.number().typeError(number).required(required),
  }),
});

export const validationSchemaInstituicao = yup.object({
  instituicao: yup.object({
    razaoSocial: yup.string().min(2, min).required(required),
    telefone: yup.number().typeError(number).required(required),
    endereco: yup.string().min(2, min).required(required),
    bairro: yup.string().min(2, min).required(required),
    cep: yup.number().typeError(number).required(required),
    cidade: yup.string().min(2, min).required(required),
    uf: yup.string().length(2, length).required(required),
    cnpj: yup.number().typeError(number).required(required),
    representanteLegal: yup.string().min(2, min).required(required),
    cargoRepresentante: yup.string().min(2, min).required(required),
    orientadorEstagio: yup.string().min(2, min).required(required),
    campus: yup.string().min(2, min).required(required),
  }),
});

export const validationSchemaUnidade = yup.object({
  unidadeConcedente: yup.object({
    razaoSocial: yup.string().min(2, min).required(required),
    telefone: yup.number().typeError(number).required(required),
    endereco: yup.string().min(2, min).required(required),
    bairro: yup.string().min(2, min).required(required),
    cep: yup.number().typeError(number).required(required),
    cidade: yup.string().min(2, min).required(required),
    uf: yup.string().length(2, length).required(required),
    cnpj: yup.number().typeError(number).required(required),
    supervisorEstagio: yup.string().min(2, min).required(required),
    cargoSupervisor: yup.string().min(2, min).required(required),
    representanteLegal: yup.string().min(2, min).required(required),
    cargoRepresentante: yup.string().min(2, min).required(required),
  }),
});

export const validationSchemaDadosEstagio = yup.object({
  dadosEstagio: yup.object({
    dataInicio: yup.string().required(required),
    dataFim: yup.string().required(required),
    horarioInicial: yup.string().required(required),
    horarioFinal: yup.string().required(required),
    intervalo: yup.string().required(required),
    remunerado: yup.string().min(2, min).required(required),
    valorRemuneracao: yup.string(),
    cargaHoraria: yup.string().min(1, min).required(required),
    estagioObrigatorio: yup.string().min(2, min).required(required),
  }),
});
