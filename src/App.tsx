import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { Router } from './Router';
import { theme } from './theme';
import { store } from './redux/store';

export default function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <ReduxProvider store={store}>
        <Router />
      </ReduxProvider>
    </MantineProvider>
  );
}
