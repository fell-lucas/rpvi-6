import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Contraste/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders progressBar hidden', () => {
  render(<App />);
  const progressBarElement = screen.getByRole(/progressBar/i);
  expect(progressBarElement).toBeInTheDocument();
});
