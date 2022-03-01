import { useNavigate } from 'react-router';

import { HomeRoute } from '../../pages';

import { Button, LandingCard, ProgressBar } from '..';

interface FallbackProps {
  error: Error;
  resetErrorBoundary: (...args: Array<unknown>) => void;
}

interface HttpError {
  statusCode: number;
  message: string;
}

interface mapIntToStr {
  [x: number]: {
    title: string;
    option: string;
    btn: string;
    action: () => any;
  };
}

export const ErrorFallback = ({
  error: { message },
  resetErrorBoundary,
}: FallbackProps) => {
  const error: HttpError = JSON.parse(message);
  const navigate = useNavigate();

  const mapCodesToMessages = {
    401: {
      title: 'Ops... Algo de errado não está certo. 😥',
      option: 'Logar novamente.',
      btn: 'Sair',
      action: () => {
        sessionStorage.removeItem('token');
        global.location.reload();
      },
    },
    404: {
      title: 'Ops... Não encontramos essa página. 😥',
      option: 'Voltar para a página inicial.',
      btn: 'Voltar',
      action: () => navigate(HomeRoute),
    },
  } as mapIntToStr;
  let title: string, option: string, btn: string, action: Function;
  try {
    const obj = mapCodesToMessages[error.statusCode];
    title = obj.title;
    option = obj.option;
    btn = obj.btn;
    action = obj.action;
  } catch (error) {
    title = 'Erro desconhecido';
    option = 'Recarregar a página';
    btn = 'Recarregar';
    action = () => {
      global.location.reload();
    };
  }
  return (
    <>
      <ProgressBar active={0} items={0} />
      <LandingCard>
        <div className='m-auto max-w-lg flex text-gray-500 flex-col items-start gap-4 border border-red-700 rounded-lg shadow-lg p-4'>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <h2 className='text-lg text-gray-500'>
            ⚡ Encontramos um problema e estamos suando para consertar tudo o
            mais rápido possível!
          </h2>
          {error.message && error.statusCode && (
            <>
              <h2 className='text-lg '>🧑‍💻 Detalhes do erro: </h2>
              <div className='bg-black text-green-400 rounded-md p-2 flex flex-col'>
                <h2>
                  {` > `}
                  <span className='text-sm text-green-300'>
                    Resposta da API:
                  </span>
                  {` ${error.message}`}
                </h2>
                <h2>
                  {` > `}
                  <span className='text-sm text-green-300'>Código:</span>
                  {` ${error.statusCode}`}
                </h2>
              </div>
            </>
          )}
          <h2 className='text-lg '>
            Enquanto isso, por favor, tente o seguinte:
          </h2>
          <h2 className='text-lg font-bold text-primary'>{option}</h2>
          <Button onClick={() => action()}>{btn}</Button>
        </div>
      </LandingCard>
    </>
  );
};
