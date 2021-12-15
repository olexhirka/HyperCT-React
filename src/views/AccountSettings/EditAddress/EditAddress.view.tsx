import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useComponentDidMount, useComponentDidUnmount, useStore } from 'hooks';
import { observer } from 'mobx-react-lite';
import { EditAddressForm } from './EditAddressForm.component';

const EditAddress = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  const {
    dataStore: { addressStore },
  } = useStore();
  const { removeSelected, selectedAddress, getAddressAsync } = addressStore;

  useComponentDidMount(() => getAddressAsync(id));

  useComponentDidUnmount(removeSelected);

  if (!selectedAddress) return <div />;

  return <EditAddressForm address={selectedAddress.asJSON} />;
};

export default observer(EditAddress);
