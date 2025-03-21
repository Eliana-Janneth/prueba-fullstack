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

export interface MovementInput {
  concept: string;
  amount: number;
  type: MovementType
  userId: string
  date: string
}

export interface UserUpdateInput {
  name: string;
  role: Role
  id: string
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

export interface MovementWithUser extends Movement {
  user: {
    name: string;
  };
}