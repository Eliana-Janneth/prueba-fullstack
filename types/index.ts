import { MovementType, Role } from "@prisma/client";

export interface Movement {
  id: string;
  concept: string;
  amount: number;
  type: MovementType;
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
  type: MovementType
  userId: string
}

export interface UpdateUser {
  input: {
    name: string;
    role: Role
    id: string;
  }

}
export interface userDataProps {
  email: string,
  connection?: string,
  password: string;
  name: string;
  phone?: string;
}

export interface AccessToken {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}