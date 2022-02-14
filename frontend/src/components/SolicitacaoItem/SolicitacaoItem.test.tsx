import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SolicitacaoItem from '.';
import { SolicitacaoStatus } from '../../models';

test('renders item', () => {
  render(
    <BrowserRouter>
      <SolicitacaoItem name='abc' status={SolicitacaoStatus.Approved} />
    </BrowserRouter>
  );
  const elem = screen.getByText(/abc/i);
  expect(elem).toBeInTheDocument();
});
