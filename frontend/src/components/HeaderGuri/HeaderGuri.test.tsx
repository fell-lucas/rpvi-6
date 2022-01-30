import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderGuri from './HeaderGuri';
import { BrowserRouter } from 'react-router-dom';

test('renders guri header', () => {
  render(
    <BrowserRouter>
      <HeaderGuri />
    </BrowserRouter>
  );
  const headerElement = screen.getByText(/Contraste/i);
  expect(headerElement).toBeInTheDocument();
});
