import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorFallback, HeaderGuri } from './components';
import {
  Acompanhar,
  AcompanharDetails,
  AcompanharRoute,
  Home,
  HomeRoute,
  Login,
  Relatorio,
  RelatorioRoute,
  SolicitarPage,
  SolicitarRoute,
} from './pages';
import { Exportar, ExportarRoute } from './pages/Exportar';

import { useToken } from './hooks';

export default function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <div className='App'>
        <div style={{ width: '100%' }}>
          <HeaderGuri isLoginPage />
        </div>
        <Login setToken={setToken} />
      </div>
    );
  }
  return (
    <BrowserRouter>
      <div className='App'>
        <div style={{ width: '100%' }}>
          <HeaderGuri />
        </div>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Routes>
            <Route path={HomeRoute} element={<Home />} />
            <Route path={SolicitarRoute} element={<SolicitarPage />} />
            <Route path={AcompanharRoute} element={<Acompanhar />} />
            <Route path={RelatorioRoute} element={<Relatorio />} />
            <Route
              path={`${AcompanharRoute}/:id`}
              element={<AcompanharDetails />}
            />
            <Route path={`${ExportarRoute}/:id`} element={<Exportar />} />
            <Route
              path='*'
              element={
                <ErrorFallback
                  error={{
                    name: '',
                    message: JSON.stringify({ statusCode: 404 }),
                  }}
                  resetErrorBoundary={() => {}}
                />
              }
            />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}
