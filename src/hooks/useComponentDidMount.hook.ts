import { useEffect } from 'react';

export const useComponentDidMount = (func: () => unknown): void => {
  useEffect(() => {
    func();
  }, []);
};
