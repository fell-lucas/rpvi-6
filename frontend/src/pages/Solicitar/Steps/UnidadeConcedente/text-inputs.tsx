import { Field, FormikErrors, FormikTouched } from 'formik';

import { SelectInput, TextInput } from '../../../../components';

import { useUnidade } from '../../../../hooks';
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
  const { unidadeList, unidadeLoading } = useUnidade();

  return (
    <>
      {!disabled && (
        <SelectInput
          disabled={disabled}
          label={'Unidade Concedente'}
          name='fake'
          placeholder={'Unidade'}
          inputSpan='3'
          options={unidadeList ?? []}
          isLoading={unidadeLoading}
        />
      )}
      <Field
        type='text'
        disabled
        name='unidadeConcedente.id'
        id='unidadeConcedente.id'
        hidden
      />
      {[
        ['Razão Social', 'razaoSocial', 'Nome completo', '3'],
        ['Telefone', 'telefone', '( )', '3'],
        ['Endereço', 'endereco', '', '3'],
        ['Bairro', 'bairro', '', '3'],
        ['CEP', 'cep', '', '3'],
        ['Cidade', 'cidade', '', '3'],
        ['UF', 'uf', '', '3'],
        ['CNPJ', 'cnpj', '', '3'],
        ['Nome do Supervisor de Estágio', 'supervisorEstagio', '', '3', '1'],
        ['Cargo', 'cargoSupervisor', 'Cargo do Supervisor de Estágio', '3'],
        ['Nome do Representante Legal', 'representanteLegal', '', '3', '1'],
        ['Cargo', 'cargoRepresentante', 'Cargo do Representante Legal', '3'],
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
