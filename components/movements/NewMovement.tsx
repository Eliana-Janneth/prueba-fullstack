'use client';

import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useModal } from '@hooks/useModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

export default function NewMovementModal() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <Button onClick={openModal} className='my-4 w-fit self-end'>
        Nuevo movimiento
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(state) => (state ? openModal() : closeModal())}
      >
        <DialogContent
          className='max-w-md mx-auto'
          onInteractOutside={(event) => event.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className='text-center'>Crear Nuevo Movimiento</DialogTitle>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='amount'>Monto</Label>
              <Input type='text' id='amount' placeholder='Monto' />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='concept'>Concepto</Label>
              <Input
                type='text'
                id='concept'
                placeholder='Concepto del movimiento'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='date'>Fecha</Label>
              <Input type='date' id='date' placeholder='Fecha del movimiento' />
            </div>
          </div>
          <div className='flex justify-center mt-4'>
            <Button variant='outline' onClick={closeModal} className='mr-2'>
              Cancelar
            </Button>
            <Button onClick={closeModal}>Guardar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
