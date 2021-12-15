import { StoreContext } from 'contexts';
import { useContext } from 'react';
import { RootStore } from 'stores';

export const useStore = (): RootStore => useContext(StoreContext);
