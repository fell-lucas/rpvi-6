import { Form, Formik, FormikHelpers } from 'formik';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import * as yup from 'yup';

import { Button, LandingCard, ProgressBar, TextInput } from '../../components';

import { User } from '../../models';
import { api, endpoints } from '../../services';

interface LoginProps {
  setToken: Function;
}

const userValidation = yup.object({
  email: yup
    .string()
    .email('Formato incorreto.')
    .required('Campo obrigatório.'),
  password: yup.string().required('Campo obrigatorio.'),
});

export default function Login({ setToken }: LoginProps) {
  const initialValues = {
    email: '',
    password: '',
  } as User;

  return (
    <>
      <ProgressBar hide items={0} active={0} />
      <LandingCard items='center'>
        <div className='flex flex-col border rounded-lg shadow-lg px-8 py-6 w-1/3'>
          <div className='border-b pb-4'>
            <h2 className='font-bold text-gray-600'>Faça seu Login </h2>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={async (
              values: User,
              formikHelpers: FormikHelpers<User>
            ) => {
              try {
                const { data } = await api.post(
                  `${endpoints.auth}/signin`,
                  JSON.stringify(values)
                );
                setToken(data.accessToken);
              } catch (error) {
                console.log(error);
              }
            }}
            validationSchema={userValidation}
          >
            {({ errors, touched, handleSubmit, isSubmitting }) => (
              <Form
                className='grid grid-cols-6 col-span-6 items-center'
                onSubmit={handleSubmit}
              >
                <TextInput
                  label='E-mail'
                  name='email'
                  inputSpan='5'
                  errors={errors}
                  touched={touched}
                />
                <TextInput
                  label='Senha'
                  name='password'
                  inputSpan='5'
                  errors={errors}
                  touched={touched}
                />
                <div className='col-span-2 mt-6'>
                  <h2 className='text-sm text-primary font-bold cursor-pointer'>
                    Esqueci minha senha
                  </h2>
                </div>
                <div className='col-span-2'></div>
                <div className='col-span-2 mt-6'>
                  <Button disabled={isSubmitting} type='submit'>
                    {isSubmitting ? (
                      <Spinner
                        className='m-auto'
                        fadeIn='none'
                        color='#FFF'
                        name='double-bounce'
                      />
                    ) : (
                      'ENTRAR'
                    )}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </LandingCard>
    </>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
