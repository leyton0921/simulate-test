"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/login.module.css';  
import { authenticateUser } from '../controllers/login.controllers';
import Input from './input';
import Button from './button';
import "../styles/login.module.css";
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Hook para la redirección

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    const result = await authenticateUser(email, password);

    if (result) {
      const { user, token } = result;
      setMessage('Login successful');
      localStorage.setItem('token', token);
      console.log('User:', user);
      // Redirige a la página de inicio después del inicio de sesión exitoso
      router.push('/usuario');
    } else {
      setError('Login failed: Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <Input
        label="Username:"
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input} placeholder={''}      />
      <Input
        label="Password:"
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input} placeholder={''}      />
      {error && <p className={styles.error}>{error}</p>}
      <Button
        type="submit"
        label="Login"
        className={styles.button} 
        onClick={function (): void {
         console.log("Button clicked");
        } }      />
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default LoginForm;
