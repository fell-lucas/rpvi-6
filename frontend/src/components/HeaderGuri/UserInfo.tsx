import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';
import Swal from 'sweetalert2';

import useUser from '../../hooks/useUser';
import { UserRole } from '../../models';

export default function UserInfo() {
  const { user, isUserLoading } = useUser();
  console.log(user);

  return (
    <div className='text-ellipsis flex gap-2 justify-between bg-primary rounded-md px-4 p-2 text-white'>
      <div className='flex gap-2 items-center'>
        {isUserLoading ? (
          <>
            <ContentLoader className='w-1/5 max-h-4' foregroundColor='#d6d6d6'>
              <rect rx='5' ry='5' width='100%' height='100%' />
            </ContentLoader>
            <ContentLoader className='w-1/5 max-h-4' foregroundColor='#d6d6d6'>
              <rect rx='5' ry='5' width='100%' height='100%' />
            </ContentLoader>
            <ContentLoader className='w-3/5 max-h-4' foregroundColor='#d6d6d6'>
              <rect rx='5' ry='5' width='100%' height='100%' />
            </ContentLoader>
          </>
        ) : (
          <div className='flex justify-start gap-2 w-full'>
            <div className='rounded-lg px-2 shadow-lg bg-green-900'>
              {user?.campus}
            </div>
            <div
              className={classNames(
                'rounded-lg px-2 shadow-lg',
                {
                  'bg-teal-700': user?.role === UserRole.ALUNO,
                },
                { 'bg-indigo-700': user?.role === UserRole.INTERFACE },
                { 'bg-lime-700': user?.role === UserRole.ORIENTADOR }
              )}
            >
              Aluno
            </div>
            <p className='truncate w-44'>{user !== undefined && user.name}</p>
          </div>
        )}
      </div>
      <button
        onClick={async () => {
          const { isConfirmed } = await Swal.fire({
            icon: 'warning',
            title: 'Atenção! Deseja mesmo sair?',
            showCancelButton: true,
            confirmButtonText: 'Sair',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#009045',
          });
          if (!isConfirmed) return;
          sessionStorage.removeItem('token');
          window.location.reload();
        }}
        className={classNames(
          'inline-block whitespace-nowrap active:scale-90 hover:text-green-300'
        )}
      >
        <FontAwesomeIcon icon={faSignOutAlt as IconProp} />
        &nbsp;Sair
      </button>
    </div>
  );
}
