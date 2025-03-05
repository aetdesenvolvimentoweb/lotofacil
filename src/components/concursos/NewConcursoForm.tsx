"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const formSchema = z.object({
  concurso: z.string().min(1, "Número do concurso obrigatório"),
  bola1: z.string().min(1, "Bola obrigatória"),
  bola2: z.string().min(1, "Bola obrigatória"),
  bola3: z.string().min(1, "Bola obrigatória"),
  bola4: z.string().min(1, "Bola obrigatória"),
  bola5: z.string().min(1, "Bola obrigatória"),
  bola6: z.string().min(1, "Bola obrigatória"),
  bola7: z.string().min(1, "Bola obrigatória"),
  bola8: z.string().min(1, "Bola obrigatória"),
  bola9: z.string().min(1, "Bola obrigatória"),
  bola10: z.string().min(1, "Bola obrigatória"),
  bola11: z.string().min(1, "Bola obrigatória"),
  bola12: z.string().min(1, "Bola obrigatória"),
  bola13: z.string().min(1, "Bola obrigatória"),
  bola14: z.string().min(1, "Bola obrigatória"),
  bola15: z.string().min(1, "Bola obrigatória"),
});

type FormData = z.infer<typeof formSchema>;

interface NewConcursoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewConcursoForm({ open, onOpenChange }: NewConcursoFormProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      concurso: "",
      bola1: "",
      bola2: "",
      bola3: "",
      bola4: "",
      bola5: "",
      bola6: "",
      bola7: "",
      bola8: "",
      bola9: "",
      bola10: "",
      bola11: "",
      bola12: "",
      bola13: "",
      bola14: "",
      bola15: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: FormData) => {
      const response = await fetch("/api/concursos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Ocorreu um erro ao salvar o concurso");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["concursos"] });
      toast.success("Concurso adicionado com sucesso");
      form.reset();
      setSelectedNumbers([]);
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error("Erro", {
        description: error.message,
      });
    },
  });

  const onSubmit = (values: FormData) => {
    mutation.mutate(values);
  };

  const toggleNumber = (num: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      }

      if (prev.length >= 15) {
        return prev;
      }

      return [...prev, num].sort((a, b) => a - b);
    });

    if (selectedNumbers.length === 15) {
      // Update form values with selected numbers
      for (let i = 1; i <= 15; i++) {
        form.setValue(
          `bola${i}` as keyof FormData,
          selectedNumbers[i - 1].toString()
        );
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Concurso</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="concurso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número do Concurso</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <div className="mb-2">
                <FormLabel>Números Sorteados (selecione 15)</FormLabel>
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {Array.from({ length: 25 }, (_, i) => i + 1).map((num) => (
                    <div
                      key={num}
                      onClick={() => toggleNumber(num)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border transition-colors ${
                        selectedNumbers.includes(num)
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {num}
                    </div>
                  ))}
                </div>
                {selectedNumbers.length !== 15 && (
                  <p className="text-sm text-red-500 mt-2">
                    Selecione exatamente 15 números
                  </p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => (
                  <FormField
                    key={i}
                    control={form.control}
                    name={`bola${i}` as keyof FormData}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bola {i}</FormLabel>
                        <FormControl>
                          <Input placeholder={`Bola ${i}`} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Salvando...
                </>
              ) : (
                "Salvar Concurso"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
