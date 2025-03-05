import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface Concurso {
  id: string;
  concurso: number;
  bola1: number;
  bola2: number;
  bola3: number;
  bola4: number;
  bola5: number;
  bola6: number;
  bola7: number;
  bola8: number;
  bola9: number;
  bola10: number;
  bola11: number;
  bola12: number;
  bola13: number;
  bola14: number;
  bola15: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function convertStringToNumber(value: string): number {
  return parseInt(value, 10);
}

export function concursoToNumberArray(concurso: Concurso): number[] {
  const numbers = [];

  for (let i = 1; i <= 15; i++) {
    // Verifica se o valor já é um número ou precisa ser convertido
    const value = concurso[`bola${i}` as keyof Concurso];
    numbers.push(typeof value === "number" ? value : parseInt(value, 10));
  }

  return numbers;
}
