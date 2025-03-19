"use client";

import { useReports } from "@hooks/useReports";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ReportsChart() {
    const { data, loading, error } = useReports();

    if (loading) return <p>Cargando datos...</p>;
    if (error) return <p>Error al cargar los datos.</p>;
  
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Movimientos Financieros</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data || []}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#4CAF50" name="Ingresos" />
            <Bar dataKey="expense" fill="#F44336" name="Egresos" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    
  );
}
