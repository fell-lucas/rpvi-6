import { FormikErrors, FormikTouched } from 'formik';

import { SelectInput, TextInput } from '../../../../components';

import { useOrientador, useUser } from '../../../../hooks';
import useCampus from '../../../../hooks/useCampus';
import { Solicitacao } from '../../../../models';

interface Props {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
  disabled?: boolean;
}

export const InstituicaoTextInputs = ({
  errors,
  touched,
  disabled = false,
}: Props) => {
  const { user } = useUser();
  const { campusList } = useCampus();
  const { orientadorList } = useOrientador(user!.campus.id);
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
        ['Nome do Representante Legal', 'representanteLegal', '', '5', '2'],
        ['Cargo', 'cargoRepresentante', 'Cargo do Representante Legal', '4'],
      ].map(([label, name, ph, span, labelSpan]) => (
        <TextInput
          key={name}
          disabled={disabled}
          label={label}
          name={`instituicao.${name}`}
          placeholder={ph !== '' ? ph : label}
          inputSpan={span}
          labelSpan={labelSpan}
          errors={errors.instituicao}
          touched={touched.instituicao}
        />
      ))}
      <SelectInput
        disabled={disabled}
        label={'Orientador de Estágio'}
        name='instituicao.orientadorEstagio'
        inputSpan='5'
        labelSpan='2'
        errors={errors.instituicao}
        touched={touched.instituicao}
        options={orientadorList ?? []}
      />
      <SelectInput
        disabled={disabled}
        label={'Campus'}
        name='instituicao.campus'
        placeholder={'Campus'}
        inputSpan='4'
        errors={errors.instituicao}
        touched={touched.instituicao}
        options={campusList ?? []}
      />
    </>
  );
};
