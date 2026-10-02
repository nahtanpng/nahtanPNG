"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/Button";

function ConfirmButton({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" variant="danger" disabled={pending}>
        {pending ? "Excluindo…" : "Confirmar"}
      </Button>
      <Button variant="ghost" onClick={onCancel} disabled={pending}>
        Cancelar
      </Button>
    </>
  );
}

type DeleteButtonProps = {
  action: () => Promise<void>;
  label?: string;
};

export function DeleteButton({ action, label = "Excluir" }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false);

  return (
    <form action={action} className="flex items-center gap-1.5">
      {confirming ? (
        <ConfirmButton onCancel={() => setConfirming(false)} />
      ) : (
        <Button variant="ghost" onClick={() => setConfirming(true)}>
          {label}
        </Button>
      )}
    </form>
  );
}
