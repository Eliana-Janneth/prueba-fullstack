'use client';

import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAlertStore } from '@/hooks/useAlertStore';
import Link from 'next/link';
import { Label } from '../ui/label';

export default function FormLogin() {
  const router = useRouter();
  const { setAlert } = useAlertStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const error = router.query.error as string;
    if (error) {
      const message = decodeURIComponent(error);
      setAlert(message, 'destructive');
    }
  }, [router.query.error, setAlert]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert('');

    if (!email || !password) {
      setAlert('Todos los campos son obligatorios', 'destructive');
      setLoading(false);
      return;
    }

    const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl") || "/";

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl,
      });
    
      if (res?.error) {
        setAlert(decodeURIComponent(res.error), "destructive");
      } else if (res?.ok) {
        setAlert("Inicio de sesión exitoso");
        const targetPath = res.url ? new URL(res.url).pathname : callbackUrl || "/";
        router.push(targetPath);
      }
    } catch (err) {
      setAlert("Error al iniciar sesión, intenta nuevamente.", "destructive");
    }
  }
  return (
    <div className='w-full max-w-sm mt-6 bg-card p-6 rounded-lg shadow-md'>
      <h1 className='text-2xl font-bold text-center'>Iniciar Sesión</h1>
      <p className='mt-2 text-gray-600 text-center'>Accede con tu cuenta</p>
      <form
        onSubmit={handleSubmit}
        className='space-y-4 justify-center flex flex-col mt-4'
      >
        <div className='space-y-1'>
          <Label htmlFor='email'>Correo electrónico</Label>
          <Input
            type='email'
            id='email'
            placeholder='Ingresa tu correo'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className='space-y-1'>
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
      <p className='mt-4 text-sm text-center'>
        ¿No tienes cuenta?{' '}
        <Link href='/auth/register' className='text-primary hover:underline'>
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
