import { render, screen } from '@testing-library/react';
import { Field, Formik } from 'formik';
import { BrowserRouter } from 'react-router-dom';

import { RadioButton, RadioButtonGroup } from '.';

test('renders radio input', () => {
  render(
    <BrowserRouter>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <RadioButtonGroup label='Estágio Obrigatório : '>
          <Field
            component={RadioButton}
            name='estagiario.estagioObrigatorio'
            id='estagiario.estagioObrigatorio1'
            label='Obrigatório'
          />
          <Field
            component={RadioButton}
            name='estagiario.estagioObrigatorio'
            id='estagiario.estagioObrigatorio2'
            label='Não obrigatório'
          />
        </RadioButtonGroup>
      </Formik>
    </BrowserRouter>
  );
  const elem = screen.getByText(/Estágio Obrigatório/i);
  expect(elem).toBeInTheDocument();
});
