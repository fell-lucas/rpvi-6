import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

test('renders radio input', () => {
  render(<BrowserRouter></BrowserRouter>);
  const elem = screen.getByText(/radio input/i);
  expect(elem).toBeInTheDocument();
});
