import { useAuth } from '@hooks/useAuth';
import MovementsTable from '@components/movements/MovementsTable';
import NewMovement from '@components/movements/NewMovement';
import { useMovements } from '@/hooks/useMovements';
import { formatCurrency } from '@/utils/formatCurrency';
export default function MovementsPage() {
  const { isLoading, isAdmin } = useAuth();
  const { balance, loadingBalance, errorBalance } = useMovements();

  if (isLoading || loadingBalance) return <p>Cargando...</p>;
  if (errorBalance) return <p>Error: {errorBalance.message}</p>;

  return (
    <div className='p-2 flex flex-col'>
      <h1 className='text-2xl font-bold'>Ingresos y Egresos</h1>
      <p className='mt-2 text-gray-600'>
        Aquí puedes gestionar todos los movimientos financieros.
      </p>
      <div className='justify-between flex items-center'>
        <p>
          Balance Total:{' '}
          <span
            className={`font-bold ${
              balance >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {formatCurrency(balance)}
          </span>
        </p>
        {isAdmin && <NewMovement />}
      </div>

      <MovementsTable />
    </div>
  );
}
