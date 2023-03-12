import useAxios, { configure } from 'axios-hooks';
import classNames from 'classnames';
import { Field, Formik } from 'formik';
import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import Swal from 'sweetalert2';

import { Button, IconButton, LandingCard, ProgressBar } from '../../components';
import { ObservacaoCard } from '../../components/ObservacaoCard';

import { AcompanharRoute } from '..';
import { useSolicitacaoList } from '../../hooks';
import useUser from '../../hooks/useUser';
import {
  Observacao,
  ObservacaoList,
  Solicitacao,
  SolicitacaoStatus,
} from '../../models';
import { api, endpoints } from '../../services';
import { colorAccordingToStatus, mapEstagiario } from '../../utils';
import { errorAlert, warningAlert } from '../../utils/swal-alerts';
import { DadosEstagioTextInputs } from '../Solicitar/Steps/DadosEstagio/text-inputs';
import { EstagiarioTextInputs } from '../Solicitar/Steps/Estagiario/text-inputs';
import { InstituicaoTextInputs } from '../Solicitar/Steps/Instituicao/text-inputs';
import { UnidadeConcedenteTextInputs } from '../Solicitar/Steps/UnidadeConcedente/text-inputs';
import { initialValues } from './initial-values';
import { SkeletonLoader } from './skeleton-loader';
import { validationsObservacao } from './validation-schema';

configure({ axios: api });

export default function AcompanharDetails() {
  const { id } = useParams();
  const [approveLoading, setApproveloading] = useState(false);
  const navigate = useNavigate();
  const { isAluno } = useUser();

  const [{ data, loading }] = useAxios<Solicitacao>(
    `${endpoints.solicitacoes}/${id}`,
    { useCache: false }
  );

  const [{ data: obsList }, obsRefetch] = useAxios<ObservacaoList>(
    `${endpoints.observacoes}/solicitacao/${id}`,
    { useCache: false }
  );

  const { refetchSolicitationList } = useSolicitacaoList();

  const canEdit = isAluno && data?.status === SolicitacaoStatus.ChangeRequested;

  const handleApprove = async () => {
    const { isConfirmed } = await Swal.fire(warningAlert);
    if (!isConfirmed) {
      return;
    }
    setApproveloading(true);
    const solicitacao = {
      status: SolicitacaoStatus.Approved,
    } as Solicitacao;
    try {
      await api.patch(`${endpoints.solicitacoes}/${id}`, solicitacao);
      refetchSolicitationList();
      setApproveloading(false);
      await Swal.fire({
        icon: 'success',
        title: 'Sucesso! Solicitação aprovada.',
        text: 'O TCE agora pode ser gerado.',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#009045',
      });
      navigate(AcompanharRoute);
    } catch (error) {
      setApproveloading(false);
      console.log(error);
      Swal.fire(errorAlert);
    }
  };

  return (
    <>
      <ProgressBar hide items={0} active={0} />
      <LandingCard
        className={classNames(
          'border-2',
          colorAccordingToStatus('border', data?.status)
        )}
      >
        <div className='flex flex-1 flex-col h-full items-center justify-center'>
          <div className='flex items-end w-full mb-8'>
            <div className='w-1/3'>
              <Link to={AcompanharRoute}>
                <IconButton data-testid={`acompanhamentos_${id}_back`}>
                  <FaArrowLeft />
                </IconButton>
              </Link>
            </div>
            <h2 className='inline font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
              AVALIAR SOLICITAÇÃO
            </h2>
            <h2
              className={classNames(
                'ml-8 font-bold inline text-lg text-right pb-4 whitespace-nowrap',
                colorAccordingToStatus('text', data?.status)
              )}
            >
              {SolicitacaoStatus.toString(data?.status)}
            </h2>
          </div>

          {loading ? (
            <SkeletonLoader />
          ) : data !== undefined ? (
            <>
              <Formik
                key={`edit_form_${id}`}
                enableReinitialize
                initialValues={initialValues(data)}
                onSubmit={async (values: Solicitacao, { setSubmitting }) => {
                  setSubmitting(false);
                  const { isConfirmed } = await Swal.fire(warningAlert);
                  if (!isConfirmed) {
                    return;
                  }
                  setSubmitting(true);
                  const solicitacao = {
                    ...values,
                    estagiario: mapEstagiario(values.estagiario),
                    status: SolicitacaoStatus.InReview,
                  } as Solicitacao;
                  try {
                    await api.patch(
                      `${endpoints.solicitacoes}/${id}`,
                      JSON.stringify(solicitacao)
                    );
                    refetchSolicitationList();
                    setSubmitting(false);
                    await Swal.fire({
                      icon: 'success',
                      title: 'Sucesso! Solicitação enviada para reanálise.',
                      text: 'Aguarde avaliação do Interface.',
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#009045',
                    });
                    navigate(AcompanharRoute);
                  } catch (error) {
                    setSubmitting(false);
                    console.log(error);
                    Swal.fire(errorAlert);
                  }
                }}
              >
                {({ errors, touched, handleSubmit, isSubmitting }) => (
                  <div className='grid grid-cols-12 gap-4 items-center mt-8'>
                    <h2 className='font-bold text-2xl col-span-12 border-b mt-4 w-2/3 border-gray-400'>
                      ESTAGIÁRIO
                    </h2>
                    <EstagiarioTextInputs
                      errors={errors}
                      touched={touched}
                      disabled={!canEdit}
                    />
                    <h2 className='font-bold text-2xl col-span-12 border-b mt-4 w-2/3 border-gray-400'>
                      UNIDADE CONCEDENTE / SETOR DA UNIPAMPA
                    </h2>
                    <UnidadeConcedenteTextInputs
                      errors={errors}
                      touched={touched}
                      disabled={!canEdit}
                    />
                    <h2 className='font-bold text-2xl col-span-12 border-b mt-4 w-2/3 border-gray-400'>
                      INSTITUIÇÃO DE ENSINO
                    </h2>
                    <InstituicaoTextInputs
                      errors={errors}
                      touched={touched}
                      disabled={!canEdit}
                    />
                    <h2 className='font-bold text-2xl col-span-12 border-b mt-4 w-2/3 border-gray-400'>
                      DADOS DO ESTÁGIO
                    </h2>
                    <DadosEstagioTextInputs
                      errors={errors}
                      touched={touched}
                      disabled={!canEdit}
                    />
                    <div className='col-span-12'></div>
                    <div className='col-span-9'></div>
                    {isAluno &&
                      data.status === SolicitacaoStatus.ChangeRequested && (
                        <div className='col-span-3'>
                          <Button
                            disabled={isSubmitting}
                            outlined
                            onClick={() => handleSubmit()}
                            type='submit'
                          >
                            {isSubmitting ? (
                              <Spinner
                                className='m-auto'
                                fadeIn='none'
                                color='#009045'
                                name='double-bounce'
                              />
                            ) : (
                              'Enviar para re-análise'
                            )}
                          </Button>
                        </div>
                      )}
                  </div>
                )}
              </Formik>
              <Formik
                initialValues={{ observacao: '' } as Observacao}
                validationSchema={validationsObservacao}
                onSubmit={(
                  values: Observacao,
                  { setSubmitting, resetForm }
                ) => {
                  setSubmitting(false);
                  Swal.fire(warningAlert).then(async (result) => {
                    if (result.isConfirmed) {
                      setSubmitting(true);
                      try {
                        await api.post(
                          `${endpoints.observacoes}/${id}`,
                          JSON.stringify(values)
                        );
                        resetForm();
                        refetchSolicitationList();
                        obsRefetch();
                        setSubmitting(false);
                        await Swal.fire({
                          icon: 'success',
                          title:
                            'Sucesso! Sua requisição de mudança foi enviada.',
                          text: 'Aguarde o aluno resolvê-la.',
                          confirmButtonText: 'Ok',
                          confirmButtonColor: '#009045',
                        });
                      } catch (error) {
                        setSubmitting(false);
                        console.log(error);
                        Swal.fire(errorAlert);
                      }
                    }
                  });
                }}
              >
                {({
                  isSubmitting,
                  handleSubmit,
                  errors: { observacao: obsError },
                  touched: { observacao: obsTouched },
                }) => (
                  <div className='grid grid-cols-12 gap-4 items-start mt-8 w-full'>
                    <h2 className='font-bold text-2xl col-span-12 w-2/3 '>
                      PEDIDOS DE MUDANÇA
                    </h2>
                    {obsList?.observacoes.length !== 0 ? (
                      obsList?.observacoes.map((obs) => (
                        <ObservacaoCard
                          disabled={obs.resolved}
                          key={obs.id}
                          obs={obs}
                        />
                      ))
                    ) : (
                      <div className='col-span-12 text-gray-600 text-center py-4'>
                        Nenhum pedido de mudança feito, aguarde o orientador
                        fazer a análise.
                      </div>
                    )}
                    {!isAluno ? (
                      <>
                        <h2 className='font-bold text-xl col-span-12'>
                          Nova Requisição de Mudança
                        </h2>
                        {obsError && obsTouched && (
                          <small className='text-red-600 text-md col-span-6'>
                            {obsError}
                          </small>
                        )}
                        <Field
                          rows={5}
                          className={classNames(
                            'col-span-12 rounded-lg shadow-md',
                            { 'border-red-500': obsError && obsTouched }
                          )}
                          name='observacao'
                          as='textarea'
                        />
                        <div className='col-span-3'>
                          <Button type='submit' onClick={() => handleSubmit()}>
                            {isSubmitting ? (
                              <Spinner
                                className='m-auto'
                                fadeIn='none'
                                color='#FFFFFF'
                                name='double-bounce'
                              />
                            ) : (
                              'Pedir Mudança'
                            )}
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='col-span-12'></div>
                        <div className='col-span-3'></div>
                      </>
                    )}
                    <div className='col-span-6'></div>
                    <div className='col-span-3'>
                      {data?.status !== SolicitacaoStatus.Approved ? (
                        !isAluno && (
                          <Button
                            disabled={approveLoading}
                            outlined
                            onClick={() => handleApprove()}
                          >
                            {approveLoading ? (
                              <Spinner
                                className='m-auto'
                                fadeIn='none'
                                color='#009045'
                                name='double-bounce'
                              />
                            ) : (
                              'Aprovar'
                            )}
                          </Button>
                        )
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                )}
              </Formik>
            </>
          ) : (
            <div className='m-auto flex flex-col items-center gap-4'>
              <h2 className='text-xl text-gray-500'>
                Solicitação não encontrada!
              </h2>
            </div>
          )}
        </div>
      </LandingCard>
    </>
  );
}
