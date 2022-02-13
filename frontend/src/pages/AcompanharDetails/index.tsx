import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAxios, { configure } from 'axios-hooks';
import { Formik } from 'formik';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Spinner from 'react-spinkit';
import Swal from 'sweetalert2';

import {
  Button,
  LandingCard,
  ProgressBar,
  RadioButton,
  RadioButtonGroup,
  TextInput,
} from '../../components';

import { AcompanharRoute } from '..';
import { Solicitacao, SolicitacaoStatus } from '../../models';
import { api, endpoints } from '../../services';
import { errorAlert, warningAlert } from '../../utils/swal-alerts';

configure({ axios: api });

export default function AcompanharDetails() {
  const { id } = useParams();
  const [approveLoading, setApproveloading] = useState(false);
  const navigate = useNavigate();

  const [{ data, loading, error }, refetch] = useAxios<Solicitacao>(
    `${endpoints.solicitacoes}/${id}`,
    { useCache: false }
  );

  console.log(data);

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
      <LandingCard>
        <div className='flex flex-1 flex-col h-full items-center justify-center'>
          <div className='flex items-end w-full mb-8'>
            <div className='w-1/3'>
              <Link to={AcompanharRoute}>
                <button
                  type='button'
                  data-testid={`acompanhamentos_${id}_back`}
                  className='text-primary text-4xl'
                >
                  <FontAwesomeIcon icon={faArrowLeft as IconProp} />
                </button>
              </Link>
            </div>
            <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
              AVALIAR SOLICITAÇÃO
            </h2>
          </div>

          {loading ? (
            <ContentLoader
              className='w-full h-full'
              speed={0.5}
              foregroundColor='#d6d6d6'
            >
              {Array.from({ length: 6 }, (_, x) => x * 350).map((y1) => {
                return [
                  <rect
                    key={`rect_${y1 + 1}`}
                    x='0'
                    y={50 + y1}
                    rx='10'
                    ry='10'
                    width='300'
                    height='40'
                  />,
                  ...Array.from({ length: 6 }, (_, x) => x * 500).map((x1) => {
                    return Array.from({ length: 4 }, (_, x) => x * 60).map(
                      (y2) => (
                        <rect
                          key={`rect_${y1 + x1 + y2}`}
                          x={x1}
                          y={120 + y2 + y1}
                          rx='10'
                          ry='10'
                          width='440'
                          height='40'
                        />
                      )
                    );
                  }),
                ];
              })}
            </ContentLoader>
          ) : error ? (
            <div className='m-auto flex flex-col items-center gap-4'>
              <h2 className='text-xl text-red-700'>
                Algo deu errado ao recuperar a solicitação.
              </h2>
              <div>
                <Button onClick={() => refetch()}>Tentar novamente</Button>
              </div>
            </div>
          ) : data !== undefined ? (
            <>
              <Formik initialValues={{}} onSubmit={() => {}}>
                <div className='grid grid-cols-12 gap-4 items-center mt-8'>
                  <h2 className='font-bold text-2xl col-span-12 border-b mt-4 w-2/3 border-gray-400'>
                    ESTAGIÁRIO
                  </h2>
                  {[
                    [
                      'Nome',
                      'nome',
                      'Nome completo',
                      '3',
                      data.estagiario.nome,
                    ],
                    ['Endereço', 'endereco', '', '3', data.estagiario.endereco],
                    ['Cidade', 'cidade', '', '3', data.estagiario.cidade],
                    [
                      'Matrícula Nº',
                      'matricula',
                      '**********',
                      '3',
                      data.estagiario.matricula,
                    ],
                    ['E-mail', 'email', '', '3', data.estagiario.email],
                    ['Bairro', 'bairro', '', '3', data.estagiario.bairro],
                    ['UF', 'uf', '', '3', data.estagiario.uf],
                    ['Curso', 'curso', '', '3', data.estagiario.curso],
                    [
                      'Telefone',
                      'telefone',
                      '( )',
                      '3',
                      data.estagiario.telefone,
                    ],
                    ['CEP', 'cep', '', '3', data.estagiario.cep],
                    ['Campus', 'campus', '', '3', data.estagiario.campus],
                    ['Semestre', 'semestre', '', '3', data.estagiario.semestre],
                  ].map(([label, name, ph, span, value]) => (
                    <TextInput
                      disabled
                      key={name}
                      value={value}
                      label={label}
                      name={`estagiario.${name}`}
                      placeholder={ph !== '' ? ph : label}
                      inputSpan={span}
                    />
                  ))}
                  <div className='col-span-6 justify-start'>
                    <RadioButtonGroup label='Estágio Obrigatório : '>
                      <RadioButton
                        field={{
                          name: 'estagiario.estagioObrigatorio',
                          value: data.estagiario.estagioObrigatorio
                            ? 'Obrigatório'
                            : '',
                        }}
                        id='estagiario.estagioObrigatorio1'
                        label='Obrigatório'
                        disabled
                      />
                      <RadioButton
                        field={{
                          name: 'estagiario.estagioObrigatorio',
                          value: !data.estagiario.estagioObrigatorio
                            ? 'Não Obrigatório'
                            : '',
                        }}
                        id='estagiario.estagioObrigatorio2'
                        label='Não Obrigatório'
                        disabled
                      />
                    </RadioButtonGroup>
                  </div>
                  <h2 className='font-bold text-2xl col-span-12 border-b mt-4 w-2/3 border-gray-400'>
                    UNIDADE CONCEDENTE / SETOR DA UNIPAMPA
                  </h2>
                  {[
                    [
                      'Razão Social',
                      'razaoSocial',
                      'Nome completo',
                      '6',
                      '',
                      data.unidadeConcedente.razaoSocial,
                    ],
                    [
                      'Telefone',
                      'telefone',
                      '( )',
                      '4',
                      '',
                      data.unidadeConcedente.telefone,
                    ],
                    [
                      'Endereço',
                      'endereco',
                      '',
                      '3',
                      '',
                      data.unidadeConcedente.endereco,
                    ],
                    [
                      'Bairro',
                      'bairro',
                      '',
                      '2',
                      '',
                      data.unidadeConcedente.bairro,
                    ],
                    ['CEP', 'cep', '', '4', '', data.unidadeConcedente.cep],
                    [
                      'Cidade',
                      'cidade',
                      '',
                      '3',
                      '',
                      data.unidadeConcedente.cidade,
                    ],
                    ['UF', 'uf', '', '2', '', data.unidadeConcedente.uf],
                    ['CNPJ', 'cnpj', '', '4', '', data.unidadeConcedente.cnpj],
                    [
                      'Nome do Supervisor de Estágio',
                      'supervisorEstagio',
                      '',
                      '5',
                      '2',
                      data.unidadeConcedente.supervisorEstagio,
                    ],
                    [
                      'Cargo',
                      'cargoSupervisor',
                      'Cargo do Supervisor de Estágio',
                      '4',
                      '',
                      data.unidadeConcedente.cargoSupervisor,
                    ],
                    [
                      'Nome do Representante Legal',
                      'representanteLegal',
                      '',
                      '5',
                      '2',
                      data.unidadeConcedente.representanteLegal,
                    ],
                    [
                      'Cargo',
                      'cargoRepresentante',
                      'Cargo do Representante Legal',
                      '4',
                      '',
                      data.unidadeConcedente.cargoRepresentante,
                    ],
                  ].map(([label, name, ph, span, labelSpan, value]) => (
                    <TextInput
                      key={name}
                      label={label}
                      value={value}
                      name={`unidadeConcedente.${name}`}
                      placeholder={ph !== '' ? ph : label}
                      inputSpan={span}
                      labelSpan={labelSpan}
                      disabled
                    />
                  ))}
                  <h2 className='font-bold text-2xl col-span-12 border-b mt-4 w-2/3 border-gray-400'>
                    INSTITUIÇÃO DE ENSINO
                  </h2>
                  {[
                    [
                      'Razão Social',
                      'razaoSocial',
                      'Nome completo',
                      '6',
                      '',
                      data.instituicao.razaoSocial,
                    ],
                    [
                      'Telefone',
                      'telefone',
                      '( )',
                      '4',
                      '',
                      data.instituicao.telefone,
                    ],
                    [
                      'Endereço',
                      'endereco',
                      '',
                      '3',
                      '',
                      data.instituicao.endereco,
                    ],
                    ['Bairro', 'bairro', '', '2', '', data.instituicao.bairro],
                    ['CEP', 'cep', '', '4', '', data.instituicao.cep],
                    ['Cidade', 'cidade', '', '3', '', data.instituicao.cidade],
                    ['UF', 'uf', '', '2', '', data.instituicao.uf],
                    ['CNPJ', 'cnpj', '', '4', '', data.instituicao.cnpj],
                    [
                      'Nome do Representante Legal',
                      'representanteLegal',
                      '',
                      '5',
                      '2',
                      data.instituicao.representanteLegal,
                    ],
                    [
                      'Cargo',
                      'cargoRepresentante',
                      'Cargo do Representante Legal',
                      '4',
                      '',
                      data.instituicao.cargoRepresentante,
                    ],
                    [
                      'Nome do Orientador de Estágio',
                      'orientadorEstagio',
                      '',
                      '5',
                      '2',
                      data.instituicao.orientadorEstagio,
                    ],
                    ['Campus', 'campus', '', '4', '', data.instituicao.campus],
                  ].map(([label, name, ph, span, labelSpan, value]) => (
                    <TextInput
                      key={name}
                      label={label}
                      value={value}
                      name={`instituicao.${name}`}
                      placeholder={ph !== '' ? ph : label}
                      inputSpan={span}
                      labelSpan={labelSpan}
                      disabled
                    />
                  ))}
                </div>
              </Formik>
              <Formik initialValues={{}} onSubmit={() => {}}>
                <div className='grid grid-cols-12 gap-4 items-start mt-8 w-full'>
                  <h2 className='font-bold text-2xl col-span-12 w-2/3 '>
                    PEDIDOS DE MUDANÇA
                  </h2>
                  <div className='col-span-3 bg-white shadow-lg rounded-lg p-4'>
                    <h2 className='text-lg'>
                      Em 12/02/2022, Interface 1 escreveu:
                    </h2>
                    <p>ta joia 👍</p>
                  </div>
                  <div className='col-span-3 bg-white shadow-lg rounded-lg p-4'>
                    <h2 className='text-lg'>
                      Em 12/02/2022, Interface 1 escreveu:
                    </h2>
                    <p className='whitespace-'>
                      ta joiaiaiaiaiaiaiaiaiaiai aiaiaiaiaiaiaiaiai
                      aiaiaiaiaiaiaiaiaiaiaiaia iaiaiaiaiaiaiaiaiaiaiaiaiaiaiaia
                      👍
                    </p>
                  </div>
                  <div className='col-span-3 bg-white shadow-lg rounded-lg p-4'>
                    <h2 className='text-lg'>
                      Em 12/02/2022, Interface 1 escreveu:
                    </h2>
                    <p>ta joia 👍</p>
                  </div>
                  <h2 className='font-bold text-xl col-span-12'>
                    Nova Requisição de Mudança
                  </h2>
                  <textarea
                    className='col-span-12 rounded-lg shadow-md'
                    name='observacoes.descricao'
                    rows={5}
                  />
                  <div className='col-span-3'>
                    <Button>Pedir Mudança</Button>
                  </div>
                  <div className='col-span-6'></div>
                  <div className='col-span-3'>
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
                  </div>
                </div>
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
