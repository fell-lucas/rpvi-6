import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Home from './Home';

test('renders progressBar hidden', () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const progressBarElement = screen.getByRole(/progressBar/i);
  expect(progressBarElement).toBeInTheDocument();
});
