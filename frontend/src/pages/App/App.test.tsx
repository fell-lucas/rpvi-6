import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders progressBar hidden', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const progressBarElement = screen.getByRole(/progressBar/i);
  expect(progressBarElement).toBeInTheDocument();
});
