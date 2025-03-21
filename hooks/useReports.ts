import { useQuery } from "@apollo/client";
import {  GET_FINANCIAL_SUMMARY } from "./query/reports";
import { FinancialSummary, MovementWithUser } from "@/types";

export function useReports() {
  const { data, loading, error } = useQuery(GET_FINANCIAL_SUMMARY);

  if (loading) return { data: [], balance: 0, loading: true, error: null, allMovements: [] };
  if (error) return { data: [], balance: 0, loading: false, error, allMovements: [] };

  const allMovements: MovementWithUser[] = data.allMovements;

  // Filtrar movimientos por el mes actual
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-11

  const currentMonthMovements = allMovements.filter((movement) => {
    const movementDate = new Date(Number(movement.date));
    return (
      movementDate.getFullYear() === currentYear &&
      movementDate.getMonth() === currentMonth
    );
  });

  // Agrupar por día (YYYY-MM-DD)
  const groupedData: Record<string, { income: number; expense: number }> =
    currentMonthMovements.reduce((acc: Record<string, { income: number; expense: number }>, movement) => {
      const dateObj = new Date(Number(movement.date));
      const dayKey = dateObj.toISOString().slice(0, 10); // YYYY-MM-DD

      if (!acc[dayKey]) {
        acc[dayKey] = { income: 0, expense: 0 };
      }

      if (movement.type === "INCOME") {
        acc[dayKey].income += Number(movement.amount);
      } else if (movement.type === "EXPENSE") {
        acc[dayKey].expense += Number(movement.amount);
      }

      return acc;
    }, {});

  // Formato para el gráfico
  const chartData: FinancialSummary[] = Object.keys(groupedData).map((date) => ({
    date,
    income: groupedData[date].income,
    expense: groupedData[date].expense,
  }));

  // Calcular totales del mes actual
  const totalIncome = chartData.reduce((sum, d) => sum + d.income, 0);
  const totalExpense = chartData.reduce((sum, d) => sum + d.expense, 0);
  const balance = totalIncome - totalExpense;

  return {
    data: chartData,
    totalIncome,
    totalExpense,
    balance,
    loading,
    error,
    allMovements,
  };
}
