import { StrictMode } from 'react';
import { render } from 'react-dom';
import { StoreProvider } from './contexts';
import { RootStore } from './stores';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';

const rootStore = new RootStore();

render(
  <StrictMode>
    <StoreProvider value={rootStore}>
      <App />
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root'),
);

// todo - serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
