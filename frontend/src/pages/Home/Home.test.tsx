import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';

test('renders home page', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const elem = screen.getByText(/Solicitar Termo de Compromisso de Estágio/i);
  expect(elem).toBeInTheDocument();
});
