import classNames from 'classnames';
import {
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
  FormikTouched,
} from 'formik';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Spinner from 'react-spinkit';
import Swal from 'sweetalert2';

import { Button, IconButton, LandingCard, ProgressBar } from '../../components';

import { AcompanharRoute, HomeRoute } from '..';
import { useFormValues, useSolicitacaoList } from '../../hooks';
import { Solicitacao } from '../../models';
import { api, endpoints } from '../../services';
import {
  mapDadosEstagio,
  mapEstagiario,
  mapUnidadeConcedente,
} from '../../utils';
import { warningAlert } from '../../utils/swal-alerts';
import DadosEstagioStep from './Steps/DadosEstagio';
import EstagiarioStep from './Steps/Estagiario';
import InstituicaoStep from './Steps/Instituicao';
import UnidadeConcedenteStep from './Steps/UnidadeConcedente';
import {
  validationSchemaDadosEstagio,
  validationSchemaEstagiario,
  validationSchemaInstituicao,
  validationSchemaUnidade,
} from './Steps/validation-schema';

export const SolicitarRoute = '/solicitar';

const steps = ['estagiario', 'unidade', 'instituicao', 'dadosEstagio'];
const validationsSchemas = [
  validationSchemaEstagiario,
  validationSchemaUnidade,
  validationSchemaInstituicao,
  validationSchemaDadosEstagio,
];

export const SolicitarPage = () => {
  const [step, setStep] = useState(0);
  const navigation = useNavigate();
  const { refetchSolicitationList } = useSolicitacaoList();

  const { initialValues } = useFormValues();

  const handleBack = () => {
    if (step === 0) {
      navigation(HomeRoute);
    }
    setStep((step) => step - 1);
  };
  const renderStep = (
    step: number,
    errors: FormikErrors<Solicitacao>,
    touched: FormikTouched<Solicitacao>,
    values: Solicitacao,
    resetForm: (values: Solicitacao) => void
  ) => {
    return [
      <EstagiarioStep
        key='estagiario_step'
        errors={errors}
        touched={touched}
        values={values}
      />,
      <UnidadeConcedenteStep
        key='unidade_step'
        errors={errors}
        touched={touched}
      />,
      <InstituicaoStep
        key='instituicao_step'
        errors={errors}
        touched={touched}
      />,
      <DadosEstagioStep
        key='dadosEstagio_step'
        errors={errors}
        touched={touched}
        values={values}
      />,
    ].map((element, index) => index === step && element);
  };
  return (
    <>
      <ProgressBar items={steps.length} active={step + 1} />
      <LandingCard>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationsSchemas[step]}
          onSubmit={(
            values: Solicitacao,
            { setSubmitting, setTouched }: FormikHelpers<Solicitacao>
          ) => {
            setSubmitting(false);
            if (step !== steps.length - 1) {
              setStep((step) => step + 1);
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
                      dadosEstagio: mapDadosEstagio(values.dadosEstagio),
                      unidadeConcedente: mapUnidadeConcedente(
                        values.unidadeConcedente
                      ),
                    })
                  );
                  refetchSolicitationList();
                  setSubmitting(false);
                  await Swal.fire({
                    icon: 'success',
                    title: 'Sucesso! Sua solicitação foi enviada.',
                    text: 'Por favor, aguarde enquanto analisamos. Retornaremos o mais rápido possível.',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#009045',
                  });
                  navigation(AcompanharRoute);
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
          {({
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            resetForm,
            setValues,
          }) => (
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
                {renderStep(step, errors, touched, values, setValues)}
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
                      ) : step !== steps.length - 1 ? (
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
};
