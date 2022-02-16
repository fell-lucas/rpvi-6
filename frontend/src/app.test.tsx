import { render, screen } from '@testing-library/react';

import App from './app';

test('renders app on login page', () => {
  render(<App />);
  const elem = screen.getByText(/Login/i);
  expect(elem).toBeInTheDocument();
});

test('renders app with token on storage page', () => {
  sessionStorage.setItem('token', 'abc');

  render(<App />);
  const elem = screen.getByText(/Acompanhar Processo/i);
  expect(elem).toBeInTheDocument();
});
