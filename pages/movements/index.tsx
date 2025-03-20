import { useAuth } from '@hooks/useAuth';
import MovementsTable from '@components/movements/MovementsTable';
import NewMovement from '@components/movements/NewMovement';
import { useQuery } from '@apollo/client';
import { GET_BALANCE } from '@/hooks/query/movements';
export default function MovementsPage() {
  const { isLoading, isAdmin } = useAuth();
  const { data, loading, error } = useQuery(GET_BALANCE);

  if (isLoading || loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { ingresos, egresos, balance } = data.balanceTotal;

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
            ${balance.toLocaleString()}
          </span>
        </p>
        {isAdmin && <NewMovement />}
      </div>

      <MovementsTable />
    </div>
  );
}
