import { render, screen } from '@testing-library/react';
import { Formik } from 'formik';
import { BrowserRouter } from 'react-router-dom';

import { SelectInput } from '.';

test('renders text input', () => {
  render(
    <BrowserRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <SelectInput
          options={[{ cidade: 'Alegrete', id: 'abc' }]}
          label='label'
          name='name'
        />
      </Formik>
    </BrowserRouter>
  );
  const elem = screen.getByText(/label/i);
  expect(elem).toBeInTheDocument();
});
