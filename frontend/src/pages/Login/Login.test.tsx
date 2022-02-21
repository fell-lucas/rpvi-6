import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';

import Login from '.';
import { api, endpoints } from '../../services';

describe('login tests', () => {
  const mock = new MockAdapter(api);

  test('renders login page', async () => {
    act(() => {
      render(<Login setToken={() => {}} />);
    });
    const elem = screen.getByText(/Login/i);
    await waitFor(() => expect(elem).toBeInTheDocument());
  });

  test('submits login form', async () => {
    const mockToken = 'abc';
    mock
      .onPost(`${endpoints.auth}/signin`)
      .reply(200, { accessToken: mockToken });
    render(<Login setToken={() => {}} />);

    const submitLoginButton = screen.getByTestId('submit_login_button');

    userEvent.type(screen.getByTestId('input_email'), 'email@email.com');
    userEvent.type(screen.getByTestId('input_password'), 'StrongPassword1');
    userEvent.click(screen.getByTestId('submit_login_button'));

    await waitFor(() => expect(submitLoginButton).toBeInTheDocument());
  });

  test('submits login form but returns error', async () => {
    mock.onPost(`${endpoints.auth}/signin`).reply(500);
    render(<Login setToken={() => {}} />);

    const submitLoginButton = screen.getByTestId('submit_login_button');

    userEvent.type(screen.getByTestId('input_email'), 'email@email.com');
    userEvent.type(screen.getByTestId('input_password'), 'StrongPassword1');
    userEvent.click(screen.getByTestId('submit_login_button'));

    await waitFor(() => expect(submitLoginButton).toBeInTheDocument());
  });
});
