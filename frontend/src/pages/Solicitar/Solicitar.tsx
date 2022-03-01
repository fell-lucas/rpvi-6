import classNames from 'classnames';
import {
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
} from 'formik';
import { Component } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavigateFunction, useNavigate } from 'react-router';
import Spinner from 'react-spinkit';
import Swal from 'sweetalert2';

import { Button, IconButton, LandingCard, ProgressBar } from '../../components';

import { AcompanharRoute, HomeRoute } from '..';
import { Solicitacao } from '../../models';
import { api, endpoints } from '../../services';
import { mapEstagiario } from '../../utils';
import { warningAlert } from '../../utils/swal-alerts';
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

class SolicitarPage extends Component<Props, State> {
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
              { setSubmitting, setTouched }: FormikHelpers<Solicitacao>
            ) => {
              setSubmitting(false);
              if (this.state.step !== steps.length - 1) {
                this.setState({ step: this.state.step + 1 });
                setTouched({});
                return;
              }
              Swal.fire(warningAlert).then(async (result) => {
                if (result.isConfirmed) {
                  setSubmitting(true);
                  try {
                    await api.post(
                      endpoints.solicitacoes,
                      JSON.stringify({
                        ...values,
                        estagiario: mapEstagiario(values.estagiario),
                      })
                    );
                    setSubmitting(false);
                    await Swal.fire({
                      icon: 'success',
                      title: 'Sucesso! Sua solicitação foi enviada.',
                      text: 'Por favor, aguarde enquanto analisamos. Retornaremos o mais rápido possível.',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#009045',
                    });
                    this.props.navigation(AcompanharRoute);
                  } catch (error) {
                    setSubmitting(false);
                    console.log(error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Erro. Algo deu errado com a sua solicitação.',
                      text: 'Por favor, tente novamente. Estamos trabalhando à todo o vapor para arrumar as coisas por aqui.',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#009045',
                    });
                  }
                }
              });
            }}
          >
            {({ values, errors, touched, handleSubmit, isSubmitting }) => (
              <div className='text-center flex flex-col justify-between flex-1 h-full px-12 pt-8 gap-8'>
                <Form
                  onSubmit={handleSubmit}
                  className='flex-1 flex flex-col h-full justify-between'
                >
                  <IconButton
                    data-testid='solicitacao_back'
                    className='absolute'
                    onClick={handleBack}
                  >
                    <FaArrowLeft />
                  </IconButton>
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

const Solicitar = () => {
  const navigation = useNavigate();

  return <SolicitarPage navigation={navigation} />;
};

export default Solicitar;
