import { useQuery } from "@apollo/client";
import { GET_FINANCIAL_SUMMARY } from "./query/reports";
import { FinancialSummary } from "@/types";
import { Movement } from "@prisma/client";

export function useReports() {
  const { data, loading, error } = useQuery(GET_FINANCIAL_SUMMARY);

  if (loading) return { data: [], balance: 0, loading: true, error: null };
  if (error) return { data: [], balance: 0, loading: false, error };

  // Group transactions by day instead of month
  const groupedData: Record<string, { income: number; expense: number }> = data.movements.reduce(
    (acc: Record<string, { income: number; expense: number }>, movement: Movement) => {
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
    },
    {}
  );

  // Convert grouped data to array
  const chartData: FinancialSummary[] = Object.keys(groupedData).map((date) => ({
    date,
    income: groupedData[date].income,
    expense: groupedData[date].expense,
  }));

  // Calculate today's income and expense
  const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const totalIncome = groupedData[todayKey]?.income || 0;
  const totalExpense = groupedData[todayKey]?.expense || 0;

  // Calculate current balance (income - expenses)
  const balance = totalIncome - totalExpense;

  return { data: chartData, totalIncome, totalExpense, balance, loading, error };
}
