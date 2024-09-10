
import { IUser, IUserToken } from '../interface/auth';

export const registerUser = async (name: string, email: string, password: string): Promise<{ user: IUser | null, message: string }> => {
  try {
    const response = await fetch('http://localhost:3060/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data: IUserToken | { message?: string } = await response.json();

    if (response.ok) {
      // Verifica si los campos existen en la respuesta
      if ('token' in data && 'user' in data) {
        const { user, token } = data as IUserToken;
        localStorage.setItem('token', token);
        return { user, message: 'Registration successful' };
      }
      return { user: null, message: 'Unexpected response format' };
    } else {
      return { user: null, message: (data as { message?: string }).message || 'Registration failed' };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error registering user:', errorMessage);
    return { user: null, message: 'Registration failed: ' + errorMessage };
  }
};
