
import MovementsTable from '@components/movements/MovementsTable';
import NewMovement from '@components/movements/NewMovement';
export default function MovementsPage() {
  return (
    <div className='p-6 flex flex-col'>
      <h1 className='text-2xl font-bold'>Ingresos y Egresos</h1>
      <p className='mt-2 text-gray-600'>
        Aquí puedes gestionar todos los movimientos financieros.
      </p>
      <NewMovement/>
      <MovementsTable />
    </div>
  );
}
