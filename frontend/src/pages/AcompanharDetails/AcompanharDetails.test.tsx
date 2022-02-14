import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import AcompanharDetails from '.';

describe('acompanhar page', () => {
  test('renders acompanhar', () => {
    render(
      <BrowserRouter>
        <AcompanharDetails />
      </BrowserRouter>
    );
    const elem = screen.getByText(/AVALIAR SOLICITAÇÃO/i);
    expect(elem).toBeInTheDocument();
  });
});
