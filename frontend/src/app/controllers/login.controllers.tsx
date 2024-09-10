
import { IUser } from '../interface/auth';

export const authenticateUser = async (email: string, password: string): Promise<{ user: IUser; token: string } | null> => {

  try {
    // Solicita la autenticación del usuario al servidor
    const response = await fetch('http://localhost:3060/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Si la respuesta es exitosa, retorna el usuario y el token
      const { user, token } = data;
      localStorage.setItem('user', user.name);
      return { user, token };
    } else {
      // Si la respuesta no es exitosa, retorna null
      return null;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};
