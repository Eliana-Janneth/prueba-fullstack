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
import { useCallback, useState } from 'react';
import { Button } from '../ui/button';
import { MovementQueryData } from '@/types';

export default function MovementsTable() {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { data, loading, error } = useQuery<MovementQueryData>(GET_MOVEMENTS, {
    variables: {
      skip: (page - 1) * pageSize,
      take: pageSize,
    },
    fetchPolicy: 'cache-and-network',
  });
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalMovements = data?.movementsCount || 0;
  const totalPages = Math.ceil(totalMovements / pageSize);

  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className=''>
            <TableHead className='w-[400px]'>Concepto</TableHead>
            <TableHead>Monto</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo de Movimiento</TableHead>
            <TableHead className=''>Usuario</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.movements.map((m: any) => (
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
              <TableCell>{m.type}</TableCell>
              <TableCell>{m.user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-center gap-4 mt-4'>
        <Button onClick={prevPage} disabled={page === 1}>
          Anterior
        </Button>
        <span>
          Página {page} de {totalPages}
        </span>
        <Button onClick={nextPage} disabled={page === totalPages}>
          Siguiente
        </Button>
      </div>
    </>
  );
}
