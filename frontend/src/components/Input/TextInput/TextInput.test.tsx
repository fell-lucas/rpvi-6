import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import TextInput from '.';

test('renders text input', () => {
  render(
    <BrowserRouter>
      <TextInput label='abc' name='abc' />
    </BrowserRouter>
  );
  const elem = screen.getByText(/abc/i);
  expect(elem).toBeInTheDocument();
});

test('renders start text input', () => {
  render(
    <BrowserRouter>
      <TextInput start label='abc' name='abc' />
    </BrowserRouter>
  );
  const elem = screen.getByText(/abc/i);
  expect(elem).toBeInTheDocument();
});
