import { ReactElement } from 'react';

interface P {
  active?: boolean,
}

export const Dashboard = ({ active }: P): ReactElement => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
    version="1.1"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 10L8 10L8 0L0 0L0 10ZM0 18L8 18L8 12L0 12L0 18ZM10 18L18 18L18 8L10 8L10 18ZM10 0L10 6L18 6L18 0L10 0Z"
      id="Shape"
      fill={active ? '#fff' : '#565968'}
      stroke="none"
    />
  </svg>
);
