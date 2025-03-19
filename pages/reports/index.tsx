import ReportsChart from "@components/reports/ReportsChart";

export default function ReportsPage() {
  return (
    <div className="p-6 flex flex-col">
      <h1 className="text-2xl font-bold">Reportes Financieros</h1>
      <p className="mt-2 text-gray-600">Resumen de ingresos y egresos</p>
      <ReportsChart />
    </div>
  );
}
