import HomeCard from '@/components/HomeCard';
import { BadgeDollarSign, ChartColumnBig, UsersRound } from 'lucide-react';

export default function Home() {
  return (
    <div className='p-6 h-full flex flex-col justify-center items-center'>
      <h1 className='text-2xl font-bold text-center'>
        SISTEMA DE GESTIÓN DE INGRESOS Y GASTOS
      </h1>
      <div className='w-full flex gap-2 mt-10 items-center justify-center '>
        <HomeCard
          title='Gestión de Movimientos'
          icon={<BadgeDollarSign className='h-6 w-6' />}
          href='/movements'
        />
        <HomeCard
          title='Gestión de Usuarios'
          icon={<UsersRound className='h-6 w-6' />}
          href='/users'
        />
        <HomeCard
          title='Reportes'
          icon={<ChartColumnBig className='h-6 w-6' />}
          href='/reports'
        />
      </div>
    </div>
  );
}
