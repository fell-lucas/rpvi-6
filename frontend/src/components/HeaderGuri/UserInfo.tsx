import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import ContentLoader from 'react-content-loader';
import Swal from 'sweetalert2';

import useUser from '../../hooks/useUser';

export default function UserInfo() {
  const { user, isUserLoading } = useUser();

  return (
    <div className='flex gap-2 justify-around bg-primary rounded-md p-2 text-white'>
      <div className='flex gap-2 items-center'>
        {isUserLoading ? (
          <ContentLoader className='w-24 max-h-4' foregroundColor='#d6d6d6'>
            <rect
              key={`rect_userInfoText`}
              x='0'
              y='0'
              rx='8'
              ry='8'
              width='100%'
              height='100%'
            />
          </ContentLoader>
        ) : (
          <>
            <FontAwesomeIcon icon={faUserCircle as IconProp} />
            {user !== undefined && user.name}
          </>
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
        className={classNames('inline-block')}
      >
        <FontAwesomeIcon icon={faSignOutAlt as IconProp} />
        &nbsp;Sair
      </button>
    </div>
  );
}
