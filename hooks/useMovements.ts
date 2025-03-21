import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BALANCE, GET_MOVEMENTS } from "@hooks/query/movements";
import { CREATE_MOVEMENT } from "@hooks/mutation/movements";
import { useAlertStore } from "@hooks/useAlertStore";
import { MovementQueryData } from "@/types";

export function useMovements() {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { setAlert } = useAlertStore();

  // query to get movements
  const { data, loading, error, refetch } = useQuery<MovementQueryData>(
    GET_MOVEMENTS,
    {
      variables: { skip: Math.max((page - 1) * pageSize, 0), take: pageSize },
      fetchPolicy: "cache-and-network",
    }
  );

  // query to get the balance
  const { data: balanceData, loading: loadingBalance, error: errorBalance } = useQuery(GET_BALANCE);

  // mutation to create a new movement
  const [createMovement, { loading: creating }] = useMutation(CREATE_MOVEMENT, {
    onCompleted: async () => {
      await refetch(); 
      setAlert("Movimiento creado con éxito");
    },
    onError: () => {
      setAlert("Error al crear el movimiento", "destructive");
    },
  });

  // function to add a new movement
  const addMovement = useCallback(
    async ({ concept, amount, type, userId, date }: any) => {
      if (!concept || !amount) {
        setAlert("Todos los campos son obligatorios", "destructive");
        return;
      }

      const parsedAmount = parseFloat(amount);
      if (parsedAmount >= 100000000 || parsedAmount < 0) {
        setAlert("El monto debe estar entre 0 y 99,999,999.99", "destructive");
        return;
      }

      try {
        await createMovement({
          variables: {
            input: { concept, amount: parsedAmount, type, userId, date: date || null },
          },
        });
      } catch (err) {
        setAlert("Error al crear el movimiento", "destructive");
      }
    },
    [createMovement, setAlert]
  );

  // Pagination
  const totalMovements = data?.movementsCount || 0;
  const totalPages = Math.max(Math.ceil(totalMovements / pageSize), 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setPage((prev) => Math.min(prev + 1, totalPages));

  return {
    movements: data?.movements || [],
    balance: balanceData?.balanceTotal.balance || 0,
    loading,
    loadingBalance,
    error,
    errorBalance,
    page,
    totalPages,
    prevPage,
    nextPage,
    addMovement,
    creating,
  };
}
