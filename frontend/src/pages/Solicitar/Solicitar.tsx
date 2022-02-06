import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
} from 'formik';
import React, { Component } from 'react';
import { NavigateFunction, useNavigate } from 'react-router';
import Spinner from 'react-spinkit';
import Swal from 'sweetalert2';

import { Button, LandingCard, ProgressBar } from '../../components';

import { HomeRoute } from '..';
import { Estagiario, Solicitacao } from '../../models';
import { api, endpoints } from '../../services';
import EstagiarioStep from './Steps/Estagiario';
import { estagiarioInitialValues } from './Steps/Estagiario/initial-values';
import InstituicaoStep from './Steps/Instituicao';
import { instituicaoInitialValues } from './Steps/Instituicao/initial-values';
import UnidadeConcedenteStep from './Steps/UnidadeConcedente';
import { unidadeInitialValues } from './Steps/UnidadeConcedente/initialValues';
import {
  validationSchemaEstagiario,
  validationSchemaInstituicao,
  validationSchemaUnidade,
} from './Steps/validation-schema';

export const SolicitarRoute = '/solicitar';

type Props = {
  navigation: NavigateFunction;
};

type State = {
  step: number;
  isSubmitting: boolean;
};

const steps = ['estagiario', 'unidade', 'instituicao'];
const validationsSchemas = [
  validationSchemaEstagiario,
  validationSchemaUnidade,
  validationSchemaInstituicao,
];

const initialValues = {
  estagiario: estagiarioInitialValues,
  instituicao: instituicaoInitialValues,
  unidadeConcedente: unidadeInitialValues,
} as Solicitacao;

class Solicitar extends Component<Props, State> {
  state = {
    step: 0,
    isSubmitting: false,
  };

  render() {
    const handleBack = () => {
      if (this.state.step === 0) {
        this.props.navigation(HomeRoute);
      }
      this.setState({ step: this.state.step - 1 });
    };

    const renderStep = (
      step: number,
      errors: FormikErrors<Solicitacao>,
      touched: FormikTouched<Solicitacao>,
      values: Solicitacao
    ) => {
      return [
        <EstagiarioStep
          key='estagiario_step'
          errors={errors as FormikErrors<Solicitacao>}
          touched={touched as FormikTouched<Solicitacao>}
          values={values}
        />,
        <UnidadeConcedenteStep
          key='unidade_step'
          errors={errors as FormikErrors<Solicitacao>}
          touched={touched as FormikTouched<Solicitacao>}
        />,
        <InstituicaoStep
          key='instituicao_step'
          errors={errors as FormikErrors<Solicitacao>}
          touched={touched as FormikTouched<Solicitacao>}
        />,
      ].map((element, index) => index === step && element);
    };

    return (
      <>
        <ProgressBar items={steps.length} active={this.state.step + 1} />
        <LandingCard>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationsSchemas[this.state.step]}
            onSubmit={(
              values: Solicitacao,
              {
                setSubmitting,
                resetForm,
                setTouched,
              }: FormikHelpers<Solicitacao>
            ) => {
              setSubmitting(false);
              if (this.state.step !== steps.length - 1) {
                this.setState({ step: this.state.step + 1 });
                setTouched({});
                return;
              }
              Swal.fire({
                icon: 'warning',
                title: 'Atenção! Esta ação não poderá ser desfeita.',
                text: 'Confira os dados antes de enviar.',
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                cancelButtonText: 'Cancelar',
                confirmButtonColor: '#009045',
              }).then(async (result) => {
                if (result.isConfirmed) {
                  setSubmitting(true);
                  try {
                    const mapEstagiario = (estagiario: Estagiario) => {
                      return {
                        ...estagiario,
                        estagioObrigatorio:
                          estagiario.estagioObrigatorio === 'Obrigatório',
                      };
                    };
                    const response = await api.post(
                      endpoints.solicitacoes,
                      JSON.stringify({
                        ...values,
                        estagiario: mapEstagiario(values.estagiario),
                      }),
                      { headers: { 'Content-Type': 'application/json' } }
                    );
                    Swal.fire({
                      icon: 'success',
                      title: 'Sucesso! Sua solicitação foi enviada.',
                      text: 'Por favor, aguarde enquanto analisamos. Retornaremos o mais rápido possível.',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#009045',
                    });
                    console.log(response);
                  } catch (error) {
                    console.log(error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Erro. Algo deu errado com a sua solicitação.',
                      text: 'Por favor, tente novamente. Estamos trabalhando à todo o vapor para arrumar as coisas por aqui.',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#009045',
                    });
                  } finally {
                    resetForm();
                    setSubmitting(false);
                  }
                }
              });
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <div
                className={classNames(
                  'text-center',
                  'flex',
                  'flex-col',
                  'justify-between',
                  'flex-1',
                  'h-full',
                  'px-12',
                  'pt-8',
                  'gap-8'
                )}
              >
                <Form
                  onSubmit={handleSubmit}
                  className={classNames(
                    'flex-1',
                    'flex',
                    'flex-col',
                    'h-full',
                    'justify-between'
                  )}
                >
                  <button
                    type='button'
                    className={classNames(
                      'absolute',
                      'text-primary',
                      'text-4xl'
                    )}
                    onClick={handleBack}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  {renderStep(this.state.step, errors, touched, values)}
                  <div className={classNames('grid', 'grid-cols-6', 'mt-8')}>
                    <div className='col-span-4'></div>
                    <div className='col-span-2'>
                      <Button disabled={isSubmitting} type='submit'>
                        {isSubmitting ? (
                          <Spinner
                            className='m-auto'
                            fadeIn='none'
                            color='#FFF'
                            name='double-bounce'
                          />
                        ) : this.state.step !== steps.length - 1 ? (
                          'Próximo'
                        ) : (
                          'Enviar'
                        )}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            )}
          </Formik>
        </LandingCard>
      </>
    );
  }
}

export default () => {
  const navigation = useNavigate();

  return <Solicitar navigation={navigation}></Solicitar>;
};
