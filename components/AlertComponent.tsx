"use client";

import { Alert, AlertTitle, AlertDescription } from "@components/ui/alert";
import { useAlertStore } from "@hooks/useAlertStore";

export default function AlertComponent() {
  const { message, type, show } = useAlertStore();

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-[60]">
      <Alert variant={type}>
        <AlertTitle>{type === "destructive" ? "Error" : "Éxito"}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  );
}
