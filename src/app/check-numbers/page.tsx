"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NumberSelector } from "@/components/check-numbers/NumberSelector";
import { ResultsDisplay } from "@/components/check-numbers/ResultsDisplay";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import CheckNumbersJsonLd from "./JsonLdScript";
import { AdHorizontal, AdRectangle } from "@/components/ads";

interface ResultData {
  total: number;
  hits11: number;
  hits12: number;
  hits13: number;
  hits14: number;
  hits15: number;
  percentages: {
    hits11: number;
    hits12: number;
    hits13: number;
    hits14: number;
    hits15: number;
  };
}

export default function CheckNumbersPage() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [results, setResults] = useState<ResultData | null>(null);

  const mutation = useMutation({
    mutationFn: async (numbers: number[]) => {
      const response = await fetch("/api/check-numbers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ numbers }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(
          error.error || "Ocorreu um erro ao verificar os números"
        );
      }

      return response.json() as Promise<ResultData>;
    },
    onSuccess: (data) => {
      setResults(data);
    },
    onError: (error) => {
      toast.error("Erro", {
        description: error.message,
      });
    },
  });

  const handleCheckNumbers = () => {
    if (selectedNumbers.length < 15) {
      toast.error("Selecione pelo menos 15 números");
      return;
    }

    if (selectedNumbers.length > 20) {
      toast.error("Selecione no máximo 20 números");
      return;
    }

    mutation.mutate(selectedNumbers);
  };

  return (
    <div className="space-y-8">
      <CheckNumbersJsonLd />
      <div>
        <h1 className="text-2xl font-bold mb-4">Verificar Números</h1>
        <p className="text-gray-600 mb-6">
          Selecione entre 15 e 20 números e descubra quantas vezes eles fizeram
          11, 12, 13, 14 ou 15 pontos em concursos anteriores.
        </p>

        {/* Anúncio horizontal no topo */}
        <AdHorizontal />
      </div>

      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <NumberSelector
          onChange={setSelectedNumbers}
          minSelection={15}
          maxSelection={20}
        />
      </div>

      <Button
        onClick={handleCheckNumbers}
        disabled={
          selectedNumbers.length < 15 ||
          selectedNumbers.length > 20 ||
          mutation.isPending
        }
        className="w-full"
        size="lg"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Verificando...
          </>
        ) : (
          "Verificar Números"
        )}
      </Button>

      {results && (
        <ResultsDisplay results={results} isLoading={mutation.isPending} />
      )}

      {/* Anúncio horizontal no final */}
      <AdHorizontal />
    </div>
  );
}
