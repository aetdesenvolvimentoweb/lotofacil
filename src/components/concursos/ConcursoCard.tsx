import { concursoToNumberArray } from "@/lib/utils";

interface ConcursoCardProps {
  concurso: {
    id?: string;
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
  };
}

export function ConcursoCard({ concurso }: ConcursoCardProps) {
  const numbers = concursoToNumberArray(concurso);

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="mb-2">
        <h3 className="font-semibold text-lg">Concurso {concurso.concurso}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {numbers.map((number) => (
          <div
            key={number}
            className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-medium"
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
}
