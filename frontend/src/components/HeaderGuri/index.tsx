import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faAdjust, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import logo from '../../assets/guri-dtic-logo.png';

import UserInfo from './UserInfo';

interface HeaderProps {
  isLoginPage?: boolean;
}

export default function HeaderGuri({ isLoginPage = false }: HeaderProps) {
  return (
    <div className='bg-bg1 flex mt-6 p-2 px-10 items-end justify-items-stretch text-primary'>
      <img src={logo} alt='logo guri' width={886} height={109} />
      <div className='flex-grow'></div>
      <div className='flex flex-col gap-6 mb-2'>
        {!isLoginPage && <UserInfo />}

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
