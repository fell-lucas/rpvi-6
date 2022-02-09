import { fireEvent, render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, HomeRoute } from '..';
import Solicitar, { SolicitarRoute } from './Solicitar';
import EstagiarioStep from './Steps/Estagiario';
import InstituicaoStep from './Steps/Instituicao';
import UnidadeConcedenteStep from './Steps/UnidadeConcedente';

test('renders solicitacao form page', () => {
  render(
    <BrowserRouter>
      <Solicitar />
    </BrowserRouter>
  );
  const elem = screen.getByText(/ESTAGIÁRIO/i);
  expect(elem).toBeInTheDocument();
});

test('renders estagiario form page', () => {
  render(
    <BrowserRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <EstagiarioStep errors={{}} touched={{}} />
      </Formik>
    </BrowserRouter>
  );
  const elem = screen.getByText(/ESTAGIÁRIO/i);
  expect(elem).toBeInTheDocument();
});

test('renders instituicao form page', () => {
  render(
    <BrowserRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <InstituicaoStep errors={{}} touched={{}} />
      </Formik>
    </BrowserRouter>
  );
  const elem = screen.getByText(/INSTITUIÇÃO/i);
  expect(elem).toBeInTheDocument();
});

test('renders unidade form page', () => {
  render(
    <BrowserRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <UnidadeConcedenteStep errors={{}} touched={{}} />
      </Formik>
    </BrowserRouter>
  );
  const elem = screen.getByText(/UNIDADE CONCEDENTE/i);
  expect(elem).toBeInTheDocument();
});

test('presses go back button at home initial step', () => {
  render(
    <BrowserRouter>
      <Routes>
        <Route path={HomeRoute} element={<Home />} />
        <Route path={SolicitarRoute} element={<Solicitar />} />
      </Routes>
    </BrowserRouter>
  );
  const solicitarBtn = screen.getByTestId('btn_/solicitar');
  fireEvent.click(solicitarBtn);
  const backbutton = screen.getByTestId('solicitacao_back');
  fireEvent.click(backbutton);
  const homePageText = screen.getByText(
    /Solicitar Termo de Compromisso de Estágio/i
  );
  expect(homePageText).toBeInTheDocument();
});
