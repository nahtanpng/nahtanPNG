import { Button } from "@/components/admin/ui/Button";

type SubmitButtonProps = {
  pending: boolean;
  form?: string;
  children?: React.ReactNode;
};

export function SubmitButton({ pending, form, children = "Salvar" }: SubmitButtonProps) {
  return (
    <Button type="submit" variant="primary" disabled={pending} form={form}>
      {pending ? "Salvando…" : children}
    </Button>
  );
}
