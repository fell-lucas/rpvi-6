import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import ProgressBar from './ProgressBar';

test('renders hidden progress bar', () => {
  render(
    <BrowserRouter>
      <ProgressBar hide active={1} items={3} />
    </BrowserRouter>
  );
  const elem = screen.getByTitle(/hiddenProgressBar/i);
  expect(elem).toHaveClass('progressItem');
});

test('renders progress bar with first element active', () => {
  render(
    <BrowserRouter>
      <ProgressBar active={1} items={3} />
    </BrowserRouter>
  );
  const elem = screen.getByText(/1/i);
  expect(elem).toBeInTheDocument();
  expect(elem).toHaveClass('progressItemActive');
});