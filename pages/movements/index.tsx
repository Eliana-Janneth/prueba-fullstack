import { Button } from "@/components/ui/button";
import MovementsTable from "@components/movements/MovementsTable";

export default function MovementsPage() {
    return (
      <div className="p-6 flex flex-col">
        <h1 className="text-2xl font-bold">Ingresos y Egresos</h1>
        <p className="mt-2 text-gray-600">
          Aquí puedes gestionar todos los movimientos financieros.
        </p>
        <Button className="my-4 w-fit self-end">Nuevo movimiento</Button>
        <MovementsTable/>
      </div>
    );
  }
  