import { concursoToNumberArray } from "@/lib/utils";

interface ConcursoCardProps {
  concurso: {
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
