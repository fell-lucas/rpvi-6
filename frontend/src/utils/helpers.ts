import classNames from 'classnames';

export const colSpan = (span?: string) =>
  span &&
  classNames({
    'col-span-1': span === '1',
    'col-span-2': span === '2',
    'col-span-3': span === '3',
    'col-span-4': span === '4',
    'col-span-5': span === '5',
    'col-span-6': span === '6',
    'col-span-7': span === '7',
    'col-span-8': span === '8',
    'col-span-9': span === '9',
    'col-span-10': span === '10',
    'col-span-11': span === '11',
    'col-span-12': span === '12',
  });

export const capitalizeFirstLetter = (string?: string) => {
  if (string)
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};
