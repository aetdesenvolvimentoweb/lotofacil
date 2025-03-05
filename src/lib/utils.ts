import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function concursoToNumberArray(concurso: any): number[] {
  const numbers = [];

  for (let i = 1; i <= 15; i++) {
    // Verifica se o valor já é um número ou precisa ser convertido
    const value = concurso[`bola${i}`];
    numbers.push(typeof value === "number" ? value : parseInt(value, 10));
  }

  return numbers;
}
