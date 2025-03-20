import { useQuery } from "@apollo/client";
import { GET_FINANCIAL_SUMMARY } from "./query/reports";
import { FinancialSummary } from "@/types";
import { Movement } from "@prisma/client";

export function useReports() {
  const { data, loading, error } = useQuery(GET_FINANCIAL_SUMMARY);

  if (loading) return { data: [], balance: 0, loading: true, error: null };
  if (error) return { data: [], balance: 0, loading: false, error };


  // Group transactions by month
  const groupedData: Record<string, { income: number; expense: number }> = data.movements.reduce(
    (acc: Record<string, { income: number; expense: number }>, movement: Movement) => {
      const dateObj = new Date(Number(movement.date));
      const monthKey = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, "0")}`;

      if (!acc[monthKey]) {
        acc[monthKey] = { income: 0, expense: 0 };
      }

      if (movement.type === "income") {
        acc[monthKey].income += Number(movement.amount);
      } else if (movement.type === "expense") {
        acc[monthKey].expense += Number(movement.amount);
      }

      return acc;
    },
    {}
  );

  // Convert grouped data object to an array for Recharts
  const chartData: FinancialSummary[] = Object.keys(groupedData).map((date) => ({
    date,
    income: groupedData[date].income,
    expense: groupedData[date].expense,
  }));

  // Calculate total income & expenses for the current month
  const currentMonthKey = new Date().toISOString().slice(0, 7); // YYYY-MM
  const totalIncome = groupedData[currentMonthKey]?.income || 0;
  const totalExpense = groupedData[currentMonthKey]?.expense || 0;

  // Calculate current balance (income - expenses)
  const balance = totalIncome - totalExpense;

  return { data: chartData, totalIncome, totalExpense, balance, loading, error };
}