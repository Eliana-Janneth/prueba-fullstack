'use client';

import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { useAlertStore } from '@hooks/useAlertStore';
import { UPDATE_USER } from '@hooks/mutation/users';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface EditUserModalProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  userId: string;
  currentName: string;
  currentRole: string;
}

export default function EditUserModal({
  isOpen,
  openModal,
  closeModal,
  userId,
  currentName,
  currentRole,
}: EditUserModalProps) {
  const [name, setName] = useState(currentName);
  const [role, setRole] = useState(currentRole);
  const { setAlert } = useAlertStore();

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      closeModal();
      setAlert('Usuario actualizado correctamente');
    },
    onError: () => {
      setAlert('Error al actualizar el usuario', 'destructive');
    },
  });

  useEffect(() => {
    setName(currentName);
    setRole(currentRole);
  }, [currentName, currentRole]);

  const handleUpdate = async () => {
    if (!name || !role) {
      setAlert('Todos los campos son obligatorios', 'destructive');
      return;
    }

    try {
      await updateUser({
        variables: {
          input: {
            id: userId,
            name,
            role,
          },
        },
      });
    } catch (err) {
      setAlert('Error al actualizar el usuario', 'destructive');
    }
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(state) => (state ? openModal() : closeModal())}
      >
        <DialogContent
          className='max-w-md mx-auto'
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className='text-center'>Editar Usuario</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                type='text'
                id='name'
                placeholder='Nombre Usuario'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='role'>Rol</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Selecciona un rol' />
                </SelectTrigger>
                <SelectContent className='bg-white'>
                  <SelectItem value='USER'>Usuario</SelectItem>
                  <SelectItem value='ADMIN'>Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex justify-center mt-4'>
            <Button variant='outline' onClick={closeModal} className='mr-2'>
              Cancelar
            </Button>
            <Button onClick={handleUpdate} disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
