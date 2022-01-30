/* istanbul ignore file */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HeaderGuri from './components/HeaderGuri/HeaderGuri';
import { Home, HomeRoute } from './pages';
import Estagiario, { EstagiarioRoute } from './pages/Solicitar/Estagiario';
import UnidadeConcedente, {
  UnidadeConcedenteRoute,
} from './pages/Solicitar/UnidadeConcedente';

import './index.css';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='App'>
        <div style={{ width: '100%' }}>
          <HeaderGuri />
        </div>
        <Routes>
          <Route path={HomeRoute} element={<Home />} />
          <Route path={EstagiarioRoute} element={<Estagiario />} />
          <Route
            path={UnidadeConcedenteRoute}
            element={<UnidadeConcedente />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
