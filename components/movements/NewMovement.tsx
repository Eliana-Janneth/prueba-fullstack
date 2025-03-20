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

export default function NewMovementModal() {
  const { isOpen, openModal, closeModal } = useModal();
  const { userId } = useAuth();
  const { setAlert } = useAlertStore();

  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('INCOME');
  const [date, setDate] = useState('');

  const [createMovement, { loading }] = useMutation(CREATE_MOVEMENT, {
    onCompleted: () => {
      closeModal();
      setConcept('');
      setAmount('');
      setDate('');
      setAlert('Movimiento creado con éxito');
    },
    onError: () => {
      setAlert('Error al crear el movimiento', 'destructive');
    },
  });

  const handleSave = async () => {
    if (!concept || !amount) {
      setAlert('Todos los campos son obligatorios', 'destructive');
      return;
    }
    const parsedAmount = parseFloat(amount);

    if (parsedAmount >= 100000000 || parsedAmount < 0) {
      setAlert("El monto debe estar entre 0 y 99,999,999.99", "destructive");
      return;
    }
    
    try {
      await createMovement({
        variables: {
          input: {
            concept,
            amount: parseFloat(amount),
            type: type as "INCOME" | "EXPENSE", 
            userId,
            date: date || null, 
          },
        },
      });
     
    } catch (err) {
      setAlert('Error al crear el movimiento', 'destructive');
    }
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
                <SelectContent>
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
            <Button onClick={handleSave} disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
