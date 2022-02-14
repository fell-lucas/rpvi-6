import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faAdjust,
  faPowerOff,
  faSitemap,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import logo from '../../assets/guri-dtic-logo.png';

interface HeaderProps {
  isLoginPage?: boolean;
}

export default function HeaderGuri({ isLoginPage = false }: HeaderProps) {
  return (
    <div className='bg-bg1 flex mt-6 p-2 px-10 items-end justify-items-stretch text-primary'>
      <img src={logo} alt='logo guri' width={886} height={109} />
      <div className='flex-grow'></div>
      <div className='flex flex-col gap-6 mb-2'>
        <div
          className={classNames(
            'flex justify-evenly bg-primary rounded-2xl p-2 text-white',
            { flex: !isLoginPage },
            { hidden: isLoginPage }
          )}
        >
          <span>00:00:00</span>
          <div className={classNames('inline-block', 'border-x-2', 'px-3')}>
            <FontAwesomeIcon icon={faUser as IconProp} />
            &nbsp;****************
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem('token');
              window.location.reload();
            }}
            className={classNames('inline-block')}
          >
            <FontAwesomeIcon icon={faPowerOff as IconProp} />
            &nbsp;Sair
          </button>
        </div>

        <div className={classNames('flex', 'items-baseline', 'gap-8')}>
          <div>
            <span className={classNames('cursor-pointer', 'text-sm')}>
              <b>A-</b>
            </span>
            &nbsp;&nbsp;
            <span className={classNames('cursor-pointer')}>
              <b>A</b>
            </span>
            &nbsp;&nbsp;
            <span className={classNames('cursor-pointer', 'text-2xl')}>
              <b>A+</b>
            </span>
          </div>
          <div className={classNames('inline-block')}>
            <FontAwesomeIcon icon={faAdjust as IconProp} />
            &nbsp;<b>Contraste</b>
          </div>
          <div className={classNames('inline-block')}>
            <FontAwesomeIcon icon={faSitemap as IconProp} />
            &nbsp;<b>Mapa do Site</b>
          </div>
        </div>
      </div>
    </div>
  );
}
