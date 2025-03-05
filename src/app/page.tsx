"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ConcursoCard } from "@/components/concursos/ConcursoCard";
import { NewConcursoForm } from "@/components/concursos/NewConcursoForm";
import { Loader2, Plus } from "lucide-react";
import { Pagination } from "@/components/ui/pagination";
import HomeJsonLd from "./JsonLdScript";
import { AdHorizontal, AdRectangle } from "@/components/ads";

interface Concurso {
  id: string;
  concurso: string;
  bola1: string;
  bola2: string;
  bola3: string;
  bola4: string;
  bola5: string;
  bola6: string;
  bola7: string;
  bola8: string;
  bola9: string;
  bola10: string;
  bola11: string;
  bola12: string;
  bola13: string;
  bola14: string;
  bola15: string;
}

interface ConcursosResponse {
  concursos: Concurso[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [openNewConcursoForm, setOpenNewConcursoForm] = useState(false);

  const { data, isLoading, isError } = useQuery<ConcursosResponse>({
    queryKey: ["concursos", page],
    queryFn: async () => {
      const response = await fetch(`/api/concursos?page=${page}&pageSize=100`);
      if (!response.ok) {
        throw new Error("Falha ao buscar concursos");
      }
      return response.json();
    },
  });

  return (
    <div className="space-y-6">
      <HomeJsonLd />
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resultados Lotofácil</h1>
        <Button onClick={() => setOpenNewConcursoForm(true)}>
          <Plus className="mr-2 h-4 w-4" /> Novo Resultado
        </Button>
      </div>

      <NewConcursoForm
        open={openNewConcursoForm}
        onOpenChange={setOpenNewConcursoForm}
      />

      {/* Anúncio horizontal após o título */}
      <AdHorizontal />

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        </div>
      ) : isError ? (
        <div className="py-12 text-center">
          <p className="text-red-500">Erro ao carregar os resultados</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data?.concursos.map((concurso) => (
              <ConcursoCard key={concurso.id} concurso={concurso} />
            ))}
          </div>

          {/* Anúncio retangular após os resultados */}
          <div className="my-8">
            <AdRectangle />
          </div>

          {data && data.totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}

          {/* Anúncio horizontal no final */}
          <AdHorizontal />
        </>
      )}
    </div>
  );
}
