import { ReactElement } from 'react';

interface P {
  active?: boolean,
}

export const Merchants = ({ active }: P): ReactElement => (
  <svg width="20px" height="18px" viewBox="0 0 20 18" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 4L10 0L0 0L0 18L20 18L20 4L10 4ZM4 16L2 16L2 14L4 14L4 16ZM4 12L2 12L2 10L4 10L4 12ZM4 8L2 8L2 6L4 6L4 8ZM4 4L2 4L2 2L4 2L4 4ZM8 16L6 16L6 14L8 14L8 16ZM8 12L6 12L6 10L8 10L8 12ZM8 8L6 8L6 6L8 6L8 8ZM8 4L6 4L6 2L8 2L8 4ZM18 16L10 16L10 14L12 14L12 12L10 12L10 10L12 10L12 8L10 8L10 6L18 6L18 16ZM16 8L14 8L14 10L16 10L16 8ZM16 12L14 12L14 14L16 14L16 12Z"
      id="Shape"
      fill={active ? '#fff' : '#565968'}
      stroke="none"
    />
  </svg>
);
