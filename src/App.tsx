import { ReactElement, useEffect } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { darkTheme } from 'GlobalStyles';
import { DashboardLayout } from 'layouts';
import { NotificationComponent } from 'components';
import { useStore } from 'hooks';
import 'fontsource-roboto';
import './App.css';
import { WebsiteLayout } from 'layouts/WebsiteLayout/WebsiteLayout';

const App = (): ReactElement => {
  const {
    dataStore: {
      authStore: { initialLoad },
      productStore: { getProductAsync },
      taskStore: { updatePurchased },
    },
    uiStore: {
      notificationStore: { notifications },
    },
    wsClient: { client },
  } = useStore();

  useEffect(() => {
    client.onmessage = async (e) => {
      if (typeof e.data === 'string') {
        const message = JSON.parse(e.data);
        if (message.messageType === 'stock-alert') {
          await getProductAsync(message.productId);
        } else if (message.messageType === 'checkout-task-updated') {
          updatePurchased(message.taskId, message.unitsPurchased);
        }
      }
    };
  }, []);

  if (initialLoad) return <>Loading...</>;

  return (
    <MuiThemeProvider theme={darkTheme}>
      {notifications.map((n) => (
        <NotificationComponent key={n.id} notification={n} />
      ))}

      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/not-found" component={WebsiteLayout} />
          <Route path="/terms" component={DashboardLayout} />
          <Route path="/privacy-policy" component={DashboardLayout} />
          <Route path="/" component={DashboardLayout} />
        </Switch>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default observer(App);
