'use client';

import { useState } from 'react';
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
  const [selectedUser, setSelectedUser] = useState<{
    id: string;
    name: string;
    role: string;
  } | null>(null);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEdit = (user: { id: string; name: string; role: string }) => {
    setSelectedUser(user);
    openModal();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
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
              <TableCell>{u.phone || 'N/A'}</TableCell>
              <TableCell className='flex space-x-2'>
                <Button
                  variant={'outline'}
                  onClick={() => handleEdit({ id: u.id, name: u.name, role: u.role })}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedUser && (
        <EditUserModal
          isOpen={isOpen}
          openModal={openModal}
          closeModal={closeModal}
          userId={selectedUser.id}
          currentName={selectedUser.name}
          currentRole={selectedUser.role}
        />
      )}
    </>
  );
}
