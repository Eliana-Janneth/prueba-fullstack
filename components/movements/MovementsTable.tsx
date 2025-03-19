"use client";

import { useQuery, gql } from "@apollo/client";

const GET_MOVEMENTS = gql`
  query GetMovements {
    movements {
      id
      concept
      amount
      date
      user {
        name
      }
    }
  }
`;

export default function MovementsTable() {
  const { data, loading, error } = useQuery(GET_MOVEMENTS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <table className="w-full border border-gray-200">
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Monto</th>
          <th>Fecha</th>
          <th>Usuario</th>
        </tr>
      </thead>
      <tbody>
        {data.movements.map((m: any) => (
          <tr key={m.id}>
            <td>{m.concept}</td>
            <td>${m.amount}</td>
            <td>{new Date(m.date).toLocaleDateString()}</td>
            <td>{m.user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
