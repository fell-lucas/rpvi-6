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

const setToken = (userToken: string) =>
  sessionStorage.setItem('token', JSON.stringify(userToken));

const getToken = () => {
  const tokenString = sessionStorage.getItem('token');
  if (!tokenString) {
    return;
  }
  const userToken = JSON.parse(tokenString);
  return userToken.token;
};

export default function App() {
  const token = getToken();
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
