export interface Movement {
    id: string;
    concept: string;
    amount: number;
    type: "income" | "expense";
    date: string;
  }
  
  export interface FinancialSummary {
    date: string;
    income: number ;
    expense: number;
  }
  