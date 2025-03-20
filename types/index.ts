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

export interface CreateMovement {
  concept: string;
  amount: number;
  type: "income" | "expense";
  userId: string
}

export interface UpdateUser {
  input: {
    name: string;
    role: "USER" | "ADMIN";
    id: string;
  }

}
export interface userDataProps {
  email: string,
  connection?: string,
  password: string;
  name: string;
  phone?:string;
}

export interface AccessToken {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}