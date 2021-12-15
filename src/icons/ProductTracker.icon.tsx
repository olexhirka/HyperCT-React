import { ReactElement } from 'react';

interface P {
  active?: boolean,
}

export const ProductTracker = ({ active }: P): ReactElement => (

  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.07 2.93L15.66 4.34C17.1 5.79 18 7.79 18 10C18 14.42 14.42 18 10 18C5.58 18 2 14.42 2 10C2 5.92 5.05 2.56 9 2.07L9 4.09C6.16 4.57 4 7.03 4 10C4 13.31 6.69 16 10 16C13.31 16 16 13.31 16 10C16 8.34 15.33 6.84 14.24 5.76L12.83 7.17C13.55 7.9 14 8.9 14 10C14 12.21 12.21 14 10 14C7.79 14 6 12.21 6 10C6 8.14 7.28 6.59 9 6.14L9 8.28C8.4 8.63 8 9.26 8 10C8 11.1 8.9 12 10 12C11.1 12 12 11.1 12 10C12 9.26 11.6 8.62 11 8.28L11 0L10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 7.24 18.88 4.74 17.07 2.93Z"
      id="Path"
      fill={active ? '#fff' : '#565968'}
      stroke="none"
    />
  </svg>
);
