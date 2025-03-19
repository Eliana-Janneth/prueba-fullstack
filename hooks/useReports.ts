import { useQuery } from "@apollo/client";
import { GET_FINANCIAL_SUMMARY, } from "./query/reports";

export function useReports() {
    const { data, loading, error } = useQuery(GET_FINANCIAL_SUMMARY);

    if (loading) return { data: null, loading: true, error: null };
    if (error) return { data: null, loading: false, error };
  
    // Agrupar los movimientos por fecha
    const groupedData = data.movements.reduce(
      (acc: Record<string, { income: number; expense: number }>, movement: any) => {
        const date = new Date(parseInt(movement.date)).toLocaleDateString();
  
        if (!acc[date]) {
          acc[date] = { income: 0, expense: 0 };
        }
  
        if (movement.type === "income") {
          acc[date].income += movement.amount;
        } else if (movement.type === "expense") {
          acc[date].expense += movement.amount;
        }
  
        return acc;
      },
      {}
    );
  
    // Convertir el objeto en un array de datos para Recharts
    const chartData = Object.keys(groupedData).map((date) => ({
      date,
      ingresos: groupedData[date].ingresos,
      egresos: groupedData[date].egresos,
    }));
  
    return { data: chartData, loading, error };
  }