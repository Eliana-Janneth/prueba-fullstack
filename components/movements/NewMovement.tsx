'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { useModal } from '@hooks/useModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useAuth } from '@hooks/useAuth';
import { CREATE_MOVEMENT } from '@/hooks/mutation/movements';
import { useAlertStore } from '@/hooks/useAlertStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useMovements } from '@/hooks/useMovements';

export default function NewMovementModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const { userId } = useAuth();
  const { addMovement, creating } = useMovements(); 

  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('INCOME');
  const [date, setDate] = useState('');

  const handleSave = () => {
    addMovement({ concept, amount, type, userId, date });
    closeModal();
  };

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
            <DialogTitle className='text-center'>
              Crear Nuevo Movimiento
            </DialogTitle>
          </DialogHeader>
          <div className='grid gap-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='amount'>Monto</Label>
              <Input
                type='number'
                id='amount'
                placeholder='Monto'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='concept'>Concepto</Label>
              <Input
                type='text'
                id='concept'
                placeholder='Concepto del movimiento'
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='type'>Tipo de movimiento</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Selecciona un tipo de movimiento' />
                </SelectTrigger>
                <SelectContent className="bg-white">
                <SelectItem value='INCOME'>Ingreso</SelectItem>
                  <SelectItem value='EXPENSE'>Egreso</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='date'>Fecha (Opcional)</Label>
              <Input
                type='date'
                id='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className='flex justify-center mt-4'>
            <Button variant='outline' onClick={closeModal} className='mr-2'>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={creating}>
              {creating ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
