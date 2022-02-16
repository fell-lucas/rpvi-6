import { fireEvent, render, screen } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { BrowserRouter } from 'react-router-dom';

import HeaderGuri from '.';
import { UserRole } from '../../models';
import { api, endpoints } from '../../services';

const mockUser = {
  campus: 'Alegrete',
  email: 'lucasafell@gmail.com',
  name: 'Lucas',
  role: UserRole.ALUNO,
  matricula: '1901560110',
};

describe('header component', () => {
  const mock = new MockAdapter(api, { delayResponse: 50 });
  const mockToken = 'abc';
  Object.defineProperty(global, 'location', {
    value: { reload: jest.fn() },
  });
  test('renders guri header on login page', () => {
    render(
      <BrowserRouter>
        <HeaderGuri isLoginPage />
      </BrowserRouter>
    );
    const headerElement = screen.getByText(/Contraste/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders guri header in the rest of the application', () => {
    render(
      <BrowserRouter>
        <HeaderGuri />
      </BrowserRouter>
    );
    const headerElement = screen.getByText(/Contraste/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('successfully signs out', () => {
    mock.onGet(`${endpoints.auth}/active`).reply(200, mockUser);

    render(
      <BrowserRouter>
        <HeaderGuri />
      </BrowserRouter>
    );

    sessionStorage.setItem('token', mockToken);
    let token = sessionStorage.getItem('token');
    expect(token).toStrictEqual(mockToken);
    const signOutButton = screen.getByTestId('sign_out_button');
    fireEvent.click(signOutButton);
    const confirmSignOutButton = screen.getByLabelText(
      'confirm_sign_out_button'
    );
    fireEvent.click(confirmSignOutButton);
    token = sessionStorage.getItem('token');
    expect(token).toBeUndefined;
  });

  test('successfully declines signing out', () => {
    mock.onGet(`${endpoints.auth}/active`).reply(200, mockUser);

    render(
      <BrowserRouter>
        <HeaderGuri />
      </BrowserRouter>
    );

    sessionStorage.setItem('token', mockToken);
    let token = sessionStorage.getItem('token');
    expect(token).toStrictEqual(mockToken);
    const signOutButton = screen.getByTestId('sign_out_button');
    fireEvent.click(signOutButton);
    const cancelSignOutButton = screen.getByLabelText('cancel_sign_out_button');
    fireEvent.click(cancelSignOutButton);
    token = sessionStorage.getItem('token');
    expect(token).toStrictEqual(mockToken);
  });
});
