import classNames from 'classnames';
import ContentLoader from 'react-content-loader';
import { FaSignOutAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

import useUser from '../../hooks/useUser';
import { UserRole } from '../../models';
import { capitalizeFirstLetter } from '../../utils';

export default function UserInfo() {
  const { user, isUserLoading } = useUser();

  return (
    <div className='text-ellipsis flex gap-2 justify-between bg-primary rounded-md px-4 p-2 text-white'>
      <div className='flex gap-2 items-center'>
        {isUserLoading ? (
          <>
            <ContentLoader className='w-16 max-h-4' foregroundColor='#d6d6d6'>
              <rect rx='5' ry='5' width='100%' height='100%' />
            </ContentLoader>
            <ContentLoader className='w-16 max-h-4' foregroundColor='#d6d6d6'>
              <rect rx='5' ry='5' width='100%' height='100%' />
            </ContentLoader>
            <ContentLoader className='w-44 max-h-4' foregroundColor='#d6d6d6'>
              <rect rx='5' ry='5' width='100%' height='100%' />
            </ContentLoader>
          </>
        ) : (
          <div className='flex justify-start gap-2 w-full'>
            <div className='rounded-lg px-2 shadow-lg bg-green-900'>
              {user?.campus.cidade}
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
              {capitalizeFirstLetter(user?.role)}
            </div>
            <p className='truncate max-w-44'>
              {user !== undefined && user.name}
            </p>
          </div>
        )}
      </div>
      <button
        data-testid='sign_out_button'
        onClick={async () => {
          const { isConfirmed } = await Swal.fire({
            icon: 'warning',
            title: 'Atenção! Deseja mesmo sair?',
            showCancelButton: true,
            confirmButtonText: 'Sair',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#009045',
            confirmButtonAriaLabel: 'confirm_sign_out_button',
            cancelButtonAriaLabel: 'cancel_sign_out_button',
          });
          if (!isConfirmed) return;
          sessionStorage.removeItem('token');
          global.location.reload();
        }}
        className='active:scale-90 hover:text-green-300'
      >
        <FaSignOutAlt />
      </button>
    </div>
  );
}
