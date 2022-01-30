import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import HeaderGuri from './HeaderGuri';

test('renders guri header', () => {
  render(
    <BrowserRouter>
      <HeaderGuri />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/Contraste/i);
  expect(headerElement).toBeInTheDocument();
});
