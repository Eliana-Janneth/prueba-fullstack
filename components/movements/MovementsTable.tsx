'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { useMovements } from '@/hooks/useMovements';
import { formatCurrency } from '@/utils/formatCurrency';

export default function MovementsTable() {
  const { movements, loading, error, page, totalPages, prevPage, nextPage } =
    useMovements();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

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
          {movements.map((m: any) => (
            <TableRow key={m.id}>
              <TableCell className='font-medium'>{m.concept}</TableCell>
              <TableCell>{formatCurrency(m.amount)}</TableCell>
              <TableCell>
                {new Date(Number(m.date)).toISOString().split('T')[0]}
              </TableCell>

              <TableCell>
                {m.type === 'INCOME' ? 'Ingreso' : 'Egreso'}
              </TableCell>
              <TableCell>{m.user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex justify-center gap-4 mt-4 text-sm items-center'>
        <Button onClick={prevPage} disabled={page === 1} size='sm'>
          Anterior
        </Button>
        <span>
          Página {page} de {totalPages}
        </span>
        <Button onClick={nextPage} disabled={page === totalPages} size='sm'>
          Siguiente
        </Button>
      </div>
    </>
  );
}
