import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Error al registrar usuario');
      }

      router.push('/auth/login');
    } catch (err) {
      setError('Hubo un problema al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='grid gap-4 w-96 bg-card p-6 rounded-lg shadow'
      >
        <h1 className='text-2xl font-bold text-center'>Registro de Usuario</h1>
        <p className='text-center text-gray-600'>
          Completa el formulario para registrarte.
        </p>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Nombre</Label>
          <Input
            type='text'
            id='name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>Correo electrónico</Label>
          <Input
            type='email'
            id='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='phone'>Teléfono</Label>
          <Input
            type='text'
            id='phone'
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Contraseña</Label>
          <Input
            type='password'
            id='password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className='text-red-500'>{error}</p>}

        <Button type='submit' disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </Button>
        <p className='mt-4 text-sm text-center'>
          ¿Ya estás registrado? {''}
          <Link href='/auth/login' className='text-primary hover:underline'>
            Inicia Sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}
