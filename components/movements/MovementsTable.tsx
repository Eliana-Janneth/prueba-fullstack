'use client';

import { useQuery } from '@apollo/client';
import { GET_MOVEMENTS } from '@hooks/query/movements';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export default function MovementsTable() {
  const { data, loading, error } = useQuery(GET_MOVEMENTS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow className=''>
          <TableHead className='w-[400px]'>Concepto</TableHead>
          <TableHead>Monto</TableHead>
          <TableHead>Fecha</TableHead>
          <TableHead className=''>Usuario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.movements.map((m: any) => (
          <TableRow key={m.id}>
            <TableCell className='font-medium'>{m.concept}</TableCell>
            <TableCell>{m.amount}</TableCell>
            <TableCell>
              {new Intl.DateTimeFormat('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }).format(new Date(Number(m.date)))}
            </TableCell>
            <TableCell>{m.user.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
