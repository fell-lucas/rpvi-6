import { Field, FormikErrors, FormikTouched } from 'formik';

import { RadioButton, RadioButtonGroup, SelectInput, TextInput } from '../../../../components';

import { Solicitacao } from '../../../../models';

interface Props {
  errors: FormikErrors<Solicitacao>;
  touched: FormikTouched<Solicitacao>;
  disabled?: boolean;
}

export const DadosEstagioTextInputs = ({
  errors,
  touched,
  disabled = false,
}: Props) => {
  return (
    <>
      {[
        ['Data de Início', 'dataInicio', '', '3'],
        ['Data de Fim', 'dataFim', '', '3'],
        ['Horario de Início', 'horarioInicial', '', '3'],
        ['Horario de Fim', 'horarioFinal', '', '3'],
        ['Intervalo', 'intervalo', '', '3'],
        ['Remuneracao', 'valorRemuneracao', 'Valor em reais', '3'],
      ].map(([label, name, ph, span, labelSpan]) => (
        <TextInput
          key={name}
          disabled={disabled}
          label={label}
          name={`dadosEstagio.${name}`}
          placeholder={ph !== '' ? ph : label}
          inputSpan={span}
          labelSpan={labelSpan}
          errors={errors.dadosEstagio}
          touched={touched.dadosEstagio}
        />
      ))}
      <SelectInput
        disabled={disabled}
        label={'Carga Horária'}
        name='dadosEstagio.cargaHoraria'
        placeholder={'Carga Horária'}
        inputSpan='3'
        errors={errors.dadosEstagio}
        touched={touched.dadosEstagio}
        options={['2','4','8']}
      />
      <div className='col-span-12 justify-start'>
        <RadioButtonGroup
          label='Estágio remunerado : '
          error={errors.dadosEstagio?.estagioRemunerado}
          touched={touched.dadosEstagio?.estagioRemunerado}
        >
          <Field
            component={RadioButton}
            name='dadosEstagio.remunerado'
            id='dadosEstagio.remunerado1'
            label='Remunerado'
            disabled={disabled}
          />
          <Field
            component={RadioButton}
            name='dadosEstagio.remunerado'
            id='dadosEstagio.remunerado2'
            label='Não remunerado'
            disabled={disabled}
          />
        </RadioButtonGroup>
      </div>
      <div className='col-span-12 justify-start'>
        <RadioButtonGroup
          label='Estágio Obrigatório : '
          error={errors.dadosEstagio?.estagioObrigatorio}
          touched={touched.dadosEstagio?.estagioObrigatorio}
        >
          <Field
            component={RadioButton}
            name='dadosEstagio.estagioObrigatorio'
            id='dadosEstagio.estagioObrigatorio1'
            label='Obrigatório'
            disabled={disabled}
          />
          <Field
            component={RadioButton}
            name='dadosEstagio.estagioObrigatorio'
            id='dadosEstagio.estagioObrigatorio2'
            label='Não obrigatório'
            disabled={disabled}
          />
        </RadioButtonGroup>
      </div>
    </>
  );
};
