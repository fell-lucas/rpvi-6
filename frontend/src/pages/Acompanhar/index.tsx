import { configure } from 'axios-hooks';
import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';

import {
  Button,
  IconButton,
  LandingCard,
  ProgressBar,
  SolicitacaoItem,
} from '../../components';

import { HomeRoute } from '..';
import { useSolicitacaoList } from '../../hooks';
import { api } from '../../services';

export const AcompanharRoute = '/acompanhar';

configure({ axios: api });

const SkeletonLoader = (
  <ContentLoader
    data-testid='loading_acompanhamentos'
    className='h-full w-full'
    foregroundColor='#d6d6d6'
  >
    {Array.from({ length: 10 }, (_, x) => x * 80).map((y) => (
      <rect
        key={`rect_${y}`}
        x='0'
        y={y}
        rx='8'
        ry='8'
        width='100%'
        height='60'
      />
    ))}
  </ContentLoader>
);

export default function Acompanhar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get('page'));

  const { data, loading } = useSolicitacaoList(page);

  const isValidPage = !(
    page === null ||
    isNaN(Number(page)) ||
    Number(page) < 1
  );

  useEffect(() => {
    if (!isValidPage) {
      const page = '1';
      setSearchParams({ page });
      setPage(page);
    }
  }, [page, isValidPage, setSearchParams]);

  const handlePageSelect = (incrementBy: number) => {
    setSearchParams({ page: `${Number(page) + incrementBy}` });
    setPage(`${Number(page) + incrementBy}`);
  };

  return (
    <>
      <ProgressBar hide items={0} active={0} />
      <LandingCard>
        <div className='flex flex-1 flex-col h-full items-center justify-center'>
          <div className='flex items-end w-full mb-8'>
            <div className='w-1/3'>
              <Link to={HomeRoute}>
                <IconButton>
                  <FaArrowLeft />
                </IconButton>
              </Link>
            </div>
            <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
              SOLICITAÇÕES PENDENTES
            </h2>
          </div>
          {loading ? (
            SkeletonLoader
          ) : data !== undefined && data.solicitations.length !== 0 ? (
            <div className='flex flex-col w-full h-full gap-2'>
              {data.solicitations.map((solicitacao) => (
                <SolicitacaoItem
                  key={solicitacao.id}
                  solicitacao={solicitacao}
                />
              ))}
              <div className='grid grid-cols-12 w-full'>
                {Number(page) - 1 > 0 ? (
                  <Button
                    onClick={() => handlePageSelect(-1)}
                    outlined
                    className='col-span-1'
                    data-testid='acompanhar_prev'
                  >
                    Anterior
                  </Button>
                ) : (
                  <div className='col-span-2'></div>
                )}
                <div className='col-span-9'></div>
                {data.nextPage !== undefined && (
                  <Button
                    onClick={() => handlePageSelect(1)}
                    className='col-span-1'
                    data-testid='acompanhar_next'
                  >
                    Próxima
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className='m-auto flex flex-col items-center gap-4'>
              <h2 className='text-xl text-gray-500'>
                Nenhuma solicitação encontrada!
              </h2>
            </div>
          )}
        </div>
      </LandingCard>
    </>
  );
}
