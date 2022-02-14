import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HeaderGuri } from './components';
import {
  Acompanhar,
  AcompanharDetails,
  AcompanharRoute,
  Home,
  HomeRoute,
  Login,
  Solicitar,
  SolicitarRoute,
} from './pages';

import { useToken } from './hooks';
import { api } from './services';

api.interceptors.request.use(
  async (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${sessionStorage.getItem('token')}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
        <Routes>
          <Route path={HomeRoute} element={<Home />} />
          <Route path={SolicitarRoute} element={<Solicitar />} />
          <Route path={AcompanharRoute} element={<Acompanhar />} />
          <Route
            path={`${AcompanharRoute}/:id`}
            element={<AcompanharDetails />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
