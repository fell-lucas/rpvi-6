import classNames from 'classnames';
import { Field, FormikErrors, FormikTouched } from 'formik';
import ContentLoader from 'react-content-loader';

import useCampus from '../../../hooks/useCampus';
import { Campus, User } from '../../../models';
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
  options: Campus[] | User[];
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
}: InputProps) => {
  const fieldname = name.split('.')[1] ?? name;
  const errors = errorsProp?.[fieldname];
  const touched = touchedProp?.[fieldname];
  const hasError = !!errors && touched;

  const { campusLoading } = useCampus();

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
        {campusLoading ? (
          Skeleton
        ) : (
          <Field
            data-testid={`input_${name}`}
            disabled={disabled}
            name={name}
            id={name}
            className={classNames('w-full', { 'border-red-600': hasError })}
            type={name === 'password' ? 'password' : 'text'}
            placeholder={placeholder ?? label}
            component='select'
          >
            <option value=''></option>
            {options.map((option) => {
              const isCampus = (e: any): e is Campus => !!e.cidade;
              const isUser = (e: any): e is User => !!e.name;
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
              }
              return <></>;
            })}
          </Field>
        )}
      </div>
    </>
  );
};
