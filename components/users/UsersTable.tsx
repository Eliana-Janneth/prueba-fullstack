'use client';

import { useQuery } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { GET_USERS } from '@hooks/query/users';
import { Button } from '../ui/button';
import { useModal } from '@/hooks/useModal';
import EditUserModal from './EditUser';

export default function UsersTable() {
  const { data, loading, error } = useQuery(GET_USERS);
  const { isOpen, openModal, closeModal } = useModal();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
    <Table>
      <TableHeader>
        <TableRow className=''>
          <TableHead className='w-[400px]'>Nombre</TableHead>
          <TableHead>Correo</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead className=''>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.users.map((u: any) => (
          <TableRow key={u.id}>
            <TableCell className='font-medium'>{u.name}</TableCell>
            <TableCell>{u.email}</TableCell>
            <TableCell>{u.phone}</TableCell>
            <TableCell className='flex space-x-2'>
              <Button className='' variant={'outline'} onClick={openModal}>
                Editar
              </Button>
              <Button className='' variant={'outline'}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
<EditUserModal isOpen={isOpen} openModal={openModal} closeModal={closeModal}/>
        
    </>
  );
}
