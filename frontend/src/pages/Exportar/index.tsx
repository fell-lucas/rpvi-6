import useAxios from 'axios-hooks';
import { useState } from 'react';
import ContentLoader from 'react-content-loader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaArrowLeft } from 'react-icons/fa';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { IconButton, LandingCard, ProgressBar } from '../../components';

import { AcompanharRoute } from '..';
import { Solicitacao } from '../../models';
import { endpoints } from '../../services';
import { Unipampa } from './ModelosTCE/Unipampa';
import { UnipampaHtml } from './ModelosTCE/Unipampa/index-html';

export const ExportarRoute = '/exportar';

const Skeleton = (
  <ContentLoader
    data-testid='loading_exportar'
    className='h-full w-full'
    foregroundColor='#d6d6d6'
  >
    <rect x='0' y='0' rx='8' ry='8' width='33%' height='40' />
    <rect x='65vh' y='0' rx='8' ry='8' width='64%' height='40' />
    <rect x='0' y='50' rx='8' ry='8' width='33%' height='45vh' />
    <rect x='65vh' y='50' rx='8' ry='8' width='64%' height='45vh' />
  </ContentLoader>
);

export const Exportar = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);

  const [{ data: solicitacao, loading }] = useAxios<Solicitacao>(
    `${endpoints.solicitacoes}/${id}`
  );

  return (
    <>
      <ProgressBar hide items={0} active={0} />
      <LandingCard>
        <div className='flex flex-1 flex-col h-full items-center justify-start'>
          <div className='flex items-end w-full mb-8'>
            <div className='w-1/3'>
              <Link to={AcompanharRoute}>
                <IconButton>
                  <FaArrowLeft />
                </IconButton>
              </Link>
            </div>
            <h2 className='font-bold text-2xl w-2/3 text-right border-b-gray-400 border-b pb-3'>
              EXPORTAR DOCUMENTO
            </h2>
          </div>
          {loading
            ? Skeleton
            : solicitacao !== undefined && (
                <>
                  <div className='flex lg:flex-row flex-col whitespace-pre-wrap gap-3'>
                    <div className='w-full lg:w-1/3'>
                      <div className='flex gap-6'>
                        <h2 className='text-xl'>Modelo em {`<HTML />`}</h2>
                        {copied && (
                          <h2 className='text-md text-primary'>Copiado!</h2>
                        )}
                      </div>
                      <CopyToClipboard
                        text={UnipampaHtml(solicitacao)}
                        onCopy={() => setCopied(true)}
                      >
                        <div className='group relative cursor-pointer text-sm rounded-lg shadow-lg'>
                          <div className='absolute w-full text-primary bg-transparent text-3xl invisible group-hover:visible text-center top-1/2'>
                            Clique para copiar
                          </div>
                          <p className='whitespace-pre-wrap p-2 bg-gray-200 group-hover:opacity-40 max-h-[55vh] overflow-auto'>
                            {UnipampaHtml(solicitacao)}
                          </p>
                        </div>
                      </CopyToClipboard>
                    </div>
                    <div className='w-full lg:w-2/3'>
                      <h2 className='text-xl'>Modelo gerado</h2>
                      <div className='max-h-[55vh] overflow-auto'>
                        <Unipampa solicitacao={solicitacao} />
                      </div>
                    </div>
                  </div>
                </>
              )}
        </div>
      </LandingCard>
    </>
  );
};
