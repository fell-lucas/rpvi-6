import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { RadioInput } from '..';

test('renders radio input', () => {
  render(
    <BrowserRouter>
      <RadioInput label='abc' name='abc'>
        <option value='abc'>abc</option>
        <option value='123'>123</option>
      </RadioInput>
    </BrowserRouter>
  );
  const elem = screen.getByText(/abc/i);
  expect(elem).toBeInTheDocument();
});
