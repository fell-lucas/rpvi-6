import classNames from 'classnames';
import { Field, FormikErrors, FormikTouched, useFormikContext } from 'formik';
import ContentLoader from 'react-content-loader';

import { unidadeInitialValues } from '../../../pages/Solicitar/Steps/UnidadeConcedente/initialValues';

import { useUnidade } from '../../../hooks';
import { Campus, UnidadeConcedente, User } from '../../../models';
import { colSpan } from '../../../utils/helpers';

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  start?: boolean;
  inputSpan?: string;
  labelSpan?: string;
  errors?: FormikErrors<{ [x: string]: string }>;
  touched?: FormikTouched<{ [x: string]: string }>;
  disabled?: boolean;
  options: Campus[] | User[] | string[] | UnidadeConcedente[];
  isLoading?: boolean;
};

const Skeleton = (
  <ContentLoader
    data-testid='loading_campus'
    className='w-full h-10'
    foregroundColor='#d6d6d6'
  >
    <rect x='0' y='0' rx='0' ry='0' width='100%' height='50' />
  </ContentLoader>
);

export const SelectInput = ({
  name,
  errors: errorsProp,
  touched: touchedProp,
  label,
  options,
  disabled,
  inputSpan,
  labelSpan,
  placeholder,
  isLoading = false,
}: InputProps) => {
  const fieldname = name.split('.')[1] ?? name;
  const errors = errorsProp?.[fieldname];
  const touched = touchedProp?.[fieldname];
  const hasError = !!errors && touched;

  const isUnidade = (e: any): e is UnidadeConcedente => !!e.razaoSocial;

  const { setSelected } = useUnidade();
  const { setFieldValue } = useFormikContext();

  return (
    <>
      <label
        className={classNames(
          'pt-6',
          'flex-shrink-0',
          'text-left',
          colSpan(labelSpan)
        )}
        htmlFor={name}
      >
        {`${label}: `}
      </label>
      <div
        className={classNames('w-full', 'flex', 'flex-col', colSpan(inputSpan))}
      >
        <small
          className={classNames('text-left', 'text-xs', 'text-red-600', {
            'p-1': hasError,
            'p-3': !hasError,
          })}
        >
          {hasError && errorsProp?.[fieldname]}
        </small>
        {isLoading ? (
          Skeleton
        ) : (
          <Field
            data-testid={`input_${name}`}
            disabled={disabled}
            name={name}
            id={name}
            className={classNames('w-full', {
              'border-red-600': hasError,
              'bg-gray-200': disabled,
            })}
            type={name === 'password' ? 'password' : 'text'}
            placeholder={placeholder ?? label}
            component='select'
            onChange={(event: any) => {
              const optionValue =
                event.target.options[event.target.options.selectedIndex].value;
              if (event.target.id === 'fake') {
                const unidadeId = optionValue;
                let unidade = setSelected(unidadeId);
                if (unidade === undefined) {
                  unidade = unidadeInitialValues;
                }
                setFieldValue('unidadeConcedente.id', unidade.id);
                setFieldValue(
                  'unidadeConcedente.razaoSocial',
                  unidade.razaoSocial
                );

                setFieldValue('unidadeConcedente.telefone', unidade.telefone);
                setFieldValue('unidadeConcedente.endereco', unidade.endereco);
                setFieldValue('unidadeConcedente.bairro', unidade.bairro);
                setFieldValue('unidadeConcedente.cep', unidade.cep);
                setFieldValue('unidadeConcedente.cidade', unidade.cidade);
                setFieldValue('unidadeConcedente.uf', unidade.uf);
                setFieldValue('unidadeConcedente.cnpj', unidade.cnpj);
                setFieldValue(
                  'unidadeConcedente.supervisorEstagio',
                  unidade.supervisorEstagio
                );
                setFieldValue(
                  'unidadeConcedente.cargoSupervisor',
                  unidade.cargoSupervisor
                );
                setFieldValue(
                  'unidadeConcedente.representanteLegal',
                  unidade.representanteLegal
                );
                setFieldValue(
                  'unidadeConcedente.cargoRepresentante',
                  unidade.cargoRepresentante
                );
              } else {
                setFieldValue(name, optionValue);
              }
            }}
          >
            <option value=''></option>
            {options.map((option) => {
              const isCampus = (e: any): e is Campus => !!e.cidade;
              const isUser = (e: any): e is User => !!e.name;
              const isString = (e: any): e is string => !!e;

              if (isUnidade(option)) {
                return (
                  <option key={option.id} value={option.id}>
                    {`${option.razaoSocial} - ${option.cnpj}`}
                  </option>
                );
              }
              if (isCampus(option)) {
                return (
                  <option key={option.id} value={option.id}>
                    {option.cidade}
                  </option>
                );
              } else if (isUser(option)) {
                return (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                );
              } else if (isString(option)) {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              }
              return <></>;
            })}
          </Field>
        )}
      </div>
    </>
  );
};
