import { FormikErrors, FormikTouched } from 'formik';

import { TextInput } from '../../../../components';

import { Solicitacao } from '../../../../models';

interface Props {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
  disabled?: boolean;
}

export const UnidadeConcedenteTextInputs = ({
  errors,
  touched,
  disabled = false,
}: Props) => {
  return (
    <>
      {[
        ['Razão Social', 'razaoSocial', 'Nome completo', '6'],
        ['Telefone', 'telefone', '( )', '4'],
        ['Endereço', 'endereco', '', '3'],
        ['Bairro', 'bairro', '', '2'],
        ['CEP', 'cep', '', '4'],
        ['Cidade', 'cidade', '', '3'],
        ['UF', 'uf', '', '2'],
        ['CNPJ', 'cnpj', '', '4'],
        ['Nome do Supervisor de Estágio', 'supervisorEstagio', '', '5', '2'],
        ['Cargo', 'cargoSupervisor', 'Cargo do Supervisor de Estágio', '4'],
        ['Nome do Representante Legal', 'representanteLegal', '', '5', '2'],
        ['Cargo', 'cargoRepresentante', 'Cargo do Representante Legal', '4'],
      ].map(([label, name, ph, span, labelSpan]) => (
        <TextInput
          key={name}
          disabled={disabled}
          label={label}
          name={`unidadeConcedente.${name}`}
          placeholder={ph !== '' ? ph : label}
          inputSpan={span}
          labelSpan={labelSpan}
          errors={errors.unidadeConcedente}
          touched={touched.unidadeConcedente}
        />
      ))}
    </>
  );
};
