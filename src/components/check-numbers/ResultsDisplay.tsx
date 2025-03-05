"use client";

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

interface ResultsDisplayProps {
  results: ResultData | null;
  isLoading: boolean;
}

export function ResultsDisplay({ results, isLoading }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="p-8 border rounded-lg bg-white text-center">
        <p>Analisando números...</p>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Resultados da Análise</h3>
      <p className="text-sm text-gray-500 mb-4">
        Analisados {results.total} concursos
      </p>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="border rounded-lg p-2 bg-gray-50">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {results.hits15}
              </div>
              <div className="text-sm text-gray-500">
                Concursos com 15 acertos
              </div>
              <div className="text-sm font-medium mt-1">
                {results.percentages.hits15}% dos concursos
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-2 bg-gray-50">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {results.hits14}
              </div>
              <div className="text-sm text-gray-500">
                Concursos com 14 acertos
              </div>
              <div className="text-sm font-medium mt-1">
                {results.percentages.hits14}% dos concursos
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-2 bg-gray-50">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {results.hits13}
              </div>
              <div className="text-sm text-gray-500">
                Concursos com 13 acertos
              </div>
              <div className="text-sm font-medium mt-1">
                {results.percentages.hits13}% dos concursos
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-2 bg-gray-50">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {results.hits12}
              </div>
              <div className="text-sm text-gray-500">
                Concursos com 12 acertos
              </div>
              <div className="text-sm font-medium mt-1">
                {results.percentages.hits12}% dos concursos
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-2 bg-gray-50 col-span-2">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {results.hits11}
              </div>
              <div className="text-sm text-gray-500">
                Concursos com 11 acertos
              </div>
              <div className="text-sm font-medium mt-1">
                {results.percentages.hits11}% dos concursos
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
