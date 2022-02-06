import * as yup from 'yup';

yup.setLocale({
  string: {},
});

const required = 'Campo obrigatório.';

export const validationSchemaEstagiario = yup.object({
  estagiario: yup.object({
    nome: yup.string().required(required),
    email: yup.string().required(required),
    telefone: yup.string().required(required),
    endereco: yup.string().required(required),
    bairro: yup.string().required(required),
    cep: yup.string().required(required),
    cidade: yup.string().required(required),
    uf: yup.string().required(required),
    campus: yup.string().required(required),
    matricula: yup.string().required(required),
    curso: yup.string().required(required),
    semestre: yup.string().required(required),
    estagioObrigatorio: yup.string().required(required),
  }),
});

export const validationSchemaInstituicao = yup.object({
  instituicao: yup.object({
    razaoSocial: yup.string().required(required),
    telefone: yup.string().required(required),
    endereco: yup.string().required(required),
    bairro: yup.string().required(required),
    cep: yup.string().required(required),
    cidade: yup.string().required(required),
    uf: yup.string().required(required),
    cnpj: yup.string().required(required),
    representanteLegal: yup.string().required(required),
    cargoRepresentante: yup.string().required(required),
    orientadorEstagio: yup.string().required(required),
    campus: yup.string().required(required),
  }),
});

export const validationSchemaUnidade = yup.object({
  unidadeConcedente: yup.object({
    razaoSocial: yup.string().required(required),
    telefone: yup.string().required(required),
    endereco: yup.string().required(required),
    bairro: yup.string().required(required),
    cep: yup.string().required(required),
    cidade: yup.string().required(required),
    uf: yup.string().required(required),
    cnpj: yup.string().required(required),
    supervisorEstagio: yup.string().required(required),
    cargoSupervisor: yup.string().required(required),
    representanteLegal: yup.string().required(required),
    cargoRepresentante: yup.string().required(required),
  }),
});
