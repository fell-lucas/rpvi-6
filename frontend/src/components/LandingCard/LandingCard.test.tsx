import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { LandingCard } from '..';

test('renders landing card', () => {
  render(
    <BrowserRouter>
      <LandingCard>abc</LandingCard>
    </BrowserRouter>
  );
  const elem = screen.getByText(/abc/i);
  expect(elem).toBeInTheDocument();
});
