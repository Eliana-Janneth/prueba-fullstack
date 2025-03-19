export interface Movement {
  id: string;
  concept: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  user: User;
}

export interface FinancialSummary {
  date: string;
  income: number;
  expense: number;
}

interface User {
  name: string;
}


export interface MovementQueryData {
  movements: Movement[];
  movementsCount: number;
}
