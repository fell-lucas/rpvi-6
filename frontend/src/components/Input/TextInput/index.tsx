import classNames from 'classnames';
import { Field, FormikErrors, FormikTouched } from 'formik';

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
  type?: string;
};

export const TextInput = (props: InputProps) => {
  const fieldname = props.name.split('.')[1] ?? props.name;
  const errors = props.errors?.[fieldname];
  const touched = props.touched?.[fieldname];
  const hasError = !!errors && touched;

  return (
    <>
      <label
        className={classNames(
          'pt-6',
          'flex-shrink-0',
          'text-left',
          colSpan(props.labelSpan)
        )}
        htmlFor={props.name}
      >
        {`${props.label}: `}
      </label>
      <div
        className={classNames(
          'w-full',
          'flex',
          'flex-col',
          colSpan(props.inputSpan)
        )}
      >
        <small
          className={classNames('text-left', 'text-xs', 'text-red-600', {
            'p-1': hasError,
            'p-3': !hasError,
          })}
        >
          {hasError && props.errors?.[fieldname]}
        </small>
        <Field
          data-testid={`input_${props.name}`}
          disabled={props.disabled}
          name={props.name}
          id={props.name}
          className={classNames('w-full', {
            'border-red-600': hasError,
            'bg-gray-200': props.disabled,
          })}
          type={props.type ?? props.name === 'password' ? 'password' : 'text'}
          placeholder={props.placeholder ?? props.label}
        />
      </div>
    </>
  );
};

export default TextInput;
