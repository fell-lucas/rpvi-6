import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if (!tokenString) {
      return;
    }
    return tokenString;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    sessionStorage.setItem('token', userToken);
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
