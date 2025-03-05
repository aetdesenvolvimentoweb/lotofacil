"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface NumberSelectorProps {
  onChange: (selectedNumbers: number[]) => void;
  minSelection?: number;
  maxSelection?: number;
}

export function NumberSelector({
  onChange,
  minSelection = 15,
  maxSelection = 20,
}: NumberSelectorProps) {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  // Usar useEffect para chamar onChange quando selectedNumbers mudar
  useEffect(() => {
    onChange(selectedNumbers);
  }, [selectedNumbers, onChange]);

  const toggleNumber = (num: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      }

      if (prev.length >= maxSelection) {
        return prev;
      }

      return [...prev, num].sort((a, b) => a - b);
    });
  };

  const clearSelection = () => {
    setSelectedNumbers([]);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">
            Selecione de {minSelection} a {maxSelection} números
          </p>
          <p className="text-sm text-gray-500">
            Selecionados: {selectedNumbers.length}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={clearSelection}
          disabled={selectedNumbers.length === 0}
        >
          Limpar
        </Button>
      </div>

      <div className="grid grid-cols-5 gap-2">
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
    </div>
  );
}
