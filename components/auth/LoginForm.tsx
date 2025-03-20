'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/hooks/useAlertStore';

export default function FormLogin() {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert('');

    if (!email || !password) {
      setAlert('Todos los campos son obligatorios', 'destructive');
      setLoading(false);
      return;
    }

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setAlert('Credenciales incorrectas', 'destructive');
      } else {
        setAlert('Inicio de sesión exitoso');
        router.push('/');
      }
    } catch (err) {
      setAlert('Error al iniciar sesión, intenta nuevamente.', 'destructive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-sm mt-6 bg-white p-6 rounded-lg shadow-md'>
      <form
        onSubmit={handleSubmit}
        className='space-y-4 justify-center flex flex-col'
      >
        <div>
          <Label htmlFor='email'>Correo electrónico</Label>
          <Input
            type='email'
            id='email'
            placeholder='Ingresa tu correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor='password'>Contraseña</Label>
          <Input
            type='password'
            id='password'
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
          <Button type='submit' disabled={loading} size='sm'>
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </Button>
      </form>
    </div>
  );
}
