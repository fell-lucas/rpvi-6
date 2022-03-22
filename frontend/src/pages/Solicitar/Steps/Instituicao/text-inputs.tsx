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
        ['Razão Social', 'razaoSocial', 'Nome completo', '3'],
        ['Telefone', 'telefone', '( )', '3'],
        ['Endereço', 'endereco', '', '3'],
        ['Bairro', 'bairro', '', '3'],
        ['CEP', 'cep', '', '3'],
        ['Cidade', 'cidade', '', '3'],
        ['UF', 'uf', '', '3'],
        ['CNPJ', 'cnpj', '', '3'],
        ['Nome do Representante Legal', 'representanteLegal', '', '3', '1'],
        ['Cargo', 'cargoRepresentante', 'Cargo do Representante Legal', '3'],
      ].map(([label, name, ph, span, labelSpan]) => (
        <TextInput
          key={name}
          disabled={true}
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
        inputSpan='3'
        labelSpan='1'
        errors={errors.instituicao}
        touched={touched.instituicao}
        options={orientadorList ?? []}
      />
      <SelectInput
        disabled={disabled}
        label={'Campus'}
        name='instituicao.campus'
        placeholder={'Campus'}
        inputSpan='3'
        errors={errors.instituicao}
        touched={touched.instituicao}
        options={campusList ?? []}
      />
    </>
  );
};
