'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { useModal } from '@hooks/useModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';

interface EditUserModalProps {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export default function EditUserModal( { isOpen, openModal, closeModal }: EditUserModalProps ) {

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
              <Input type='text' id='name' placeholder='Nombre Usuario' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='rol'>Rol</Label>
              <Input
                type='text'
                id='rol'
                placeholder='Rol del usuario'
              />
            </div>
          </div>
          <div className='flex justify-center mt-4'>
            <Button variant='outline' onClick={closeModal} className='mr-2'>
              Cancelar
            </Button>
            <Button onClick={closeModal}>Actualizar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
