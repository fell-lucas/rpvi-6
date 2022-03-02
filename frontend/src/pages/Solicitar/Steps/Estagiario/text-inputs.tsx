import { Field, FormikErrors, FormikTouched } from 'formik';

import {
  RadioButton,
  RadioButtonGroup,
  SelectInput,
  TextInput,
} from '../../../../components';

import useCampus from '../../../../hooks/useCampus';
import { Solicitacao } from '../../../../models';

interface Props {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
  disabled?: boolean;
}

export const EstagiarioTextInputs = ({
  errors,
  touched,
  disabled = false,
}: Props) => {
  const { campusList } = useCampus();

  return (
    <>
      {[
        ['Nome', 'nome', 'Nome completo', '3'],
        ['Endereço', 'endereco', '', '3'],
        ['Cidade', 'cidade', '', '3'],
        ['Matrícula Nº', 'matricula', '**********', '3'],
        ['E-mail', 'email', '', '3'],
        ['Bairro', 'bairro', '', '3'],
        ['UF', 'uf', '', '3'],
        ['Curso', 'curso', '', '3'],
        ['Telefone', 'telefone', '( )', '3'],
        ['CEP', 'cep', '', '3'],
      ].map(([label, name, ph, span]) => (
        <TextInput
          key={name}
          disabled={disabled}
          label={label}
          name={`estagiario.${name}`}
          placeholder={ph !== '' ? ph : label}
          inputSpan={span}
          errors={errors.estagiario}
          touched={touched.estagiario}
        />
      ))}
      <SelectInput
        disabled={disabled}
        label={'Campus'}
        name='estagiario.campus'
        placeholder={'Campus'}
        inputSpan='3'
        errors={errors.estagiario}
        touched={touched.estagiario}
        options={campusList ?? []}
      />
      <TextInput
        disabled={disabled}
        label={'Semestre'}
        name={`estagiario.semestre`}
        placeholder={'Semestre'}
        inputSpan='3'
        errors={errors.estagiario}
        touched={touched.estagiario}
      />
      <div className='col-span-6 justify-start'>
        <RadioButtonGroup
          label='Estágio Obrigatório : '
          error={errors.estagiario?.estagioObrigatorio}
          touched={touched.estagiario?.estagioObrigatorio}
        >
          <Field
            component={RadioButton}
            name='estagiario.estagioObrigatorio'
            id='estagiario.estagioObrigatorio1'
            label='Obrigatório'
            disabled={disabled}
          />
          <Field
            component={RadioButton}
            name='estagiario.estagioObrigatorio'
            id='estagiario.estagioObrigatorio2'
            label='Não obrigatório'
            disabled={disabled}
          />
        </RadioButtonGroup>
      </div>
    </>
  );
};
