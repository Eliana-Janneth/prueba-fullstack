import { useModal } from "@/hooks/useModal";
import UsersTable from "@components/users/UsersTable";

export default function UsersPage() {
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <p className="mt-2 text-gray-600">Aquí puedes administrar usuarios.</p>

        <UsersTable/>
      </div>
    );
  }
  