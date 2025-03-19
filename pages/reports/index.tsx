import { Button } from '@/components/ui/button';
import { useReports } from '@/hooks/useReports';
import { downloadCSV } from '@/utils/csvFile';
import ReportsChart from '@components/reports/ReportsChart';

export default function ReportsPage() {
  const { data, totalIncome, totalExpense, balance, loading } = useReports();

  return (
    <div className='p-6 flex flex-col'>
      <h1 className='text-2xl font-bold'>Reportes Financieros</h1>
      <p className='mt-2 text-gray-600'>Resumen de ingresos y egresos</p>

      <div className='flex gap-6 my-6 justify-between items-center'>
        <div className='flex gap-2'>
          <div className='bg-white p-4 rounded-lg shadow-md w-64'>
            <h2 className='text-md font-semibold'>Total Ingresos</h2>
            <p className='text-xl font-bold text-green-600'>
              {loading ? 'Loading...' : `$${(totalIncome ?? 0).toFixed(2)}`}
            </p>
          </div>

          <div className='bg-white p-4 rounded-lg shadow-md w-64'>
            <h2 className='text-md font-semibold'>Total Gastos</h2>
            <p className='text-xl font-bold text-red-600'>
              {loading ? 'Loading...' : `$${(totalExpense ?? 0).toFixed(2)}`}
            </p>
          </div>
        </div>
        <div className='gap-2 flex flex-col'>
          <div className='bg-white p-4 rounded-lg shadow-md flex gap-3 items-center'>
            <h2 className='text-md font-semibold'>Saldo Actual</h2>
            <p
              className={`text-xl font-bold ${
                balance >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {loading ? 'Loading...' : `$${balance.toFixed(2)}`}
            </p>
          </div>
          <Button onClick={() => downloadCSV(data, balance)}>
            Descargar Reporte CSV
          </Button>
        </div>
      </div>
      <ReportsChart data={data} />
    </div>
  );
}
