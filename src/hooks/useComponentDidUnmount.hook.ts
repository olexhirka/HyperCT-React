import { useEffect } from 'react';

export const useComponentDidUnmount = (func: () => unknown): void => {
  useEffect(() => () => { func(); }, []);
};
