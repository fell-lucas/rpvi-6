import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SolicitacaoItem() {
  return (
    <div className='flex flex-1 bg-primary w-full rounded-xl p-2 justify-between text-white'>
      <div className='flex items-center justify-center ml-6 gap-4'>
        <FontAwesomeIcon
          icon={faUserCircle as IconDefinition}
          size='3x'
          color='lightgray'
        />
        <span className='text-lg font-bold'>ALUNO 1</span>
      </div>
      <div className='flex items-center bg-yellow-500 my-2 px-2 w-52 justify-center rounded-xl'>
        <span>IN PROGRESS</span>
      </div>
    </div>
  );
}
