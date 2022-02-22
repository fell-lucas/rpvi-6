import { FaAdjust, FaSitemap } from 'react-icons/fa';

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

        <div className='flex items-baseline gap-8'>
          <div>
            <span className='cursor-pointer text-sm'>
              <b>A-</b>
            </span>
            &nbsp;&nbsp;
            <span className='cursor-pointer'>
              <b>A</b>
            </span>
            &nbsp;&nbsp;
            <span className='cursor-pointer text-2xl'>
              <b>A+</b>
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <FaAdjust />
            <b>Contraste</b>
          </div>
          <div className='flex items-center gap-2'>
            <FaSitemap />
            <b>Mapa do Site</b>
          </div>
        </div>
      </div>
    </div>
  );
}
