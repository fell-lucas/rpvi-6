import { render, screen } from '@testing-library/react';

import App from './app';

test.skip('renders app', () => {
  render(<App />);
  const elem = screen.getByText(/Login/i);
  expect(elem).toBeInTheDocument();
});
