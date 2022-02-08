import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import ProgressBar from './ProgressBar';

test('renders progress bar with first element active', () => {
  render(
    <BrowserRouter>
      <ProgressBar active={1} items={3} />
    </BrowserRouter>
  );
  const elem = screen.getByText(/1/i);
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveClass('text-primary');
});

test('renders progress bar hidden', () => {
  render(
    <BrowserRouter>
      <ProgressBar active={1} items={3} hide />
    </BrowserRouter>
  );
  const elem = screen.queryByText(/1/i);
  expect(elem).not.toBeInTheDocument();
});
