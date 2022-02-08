import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Button } from '..';

test('renders button', () => {
  render(
    <BrowserRouter>
      <Button>Button</Button>
    </BrowserRouter>
  );
  const elem = screen.getByText(/Button/i);
  expect(elem).toBeInTheDocument();
});
