import type { Cliente } from "./FilaEspera";

export interface Atendimento extends Cliente {
  chamado_em: string;
  concluido_em: string;
}

interface Props {
  atendimentos: Atendimento[];
}

export default function HistoricoAtendimentos({ atendimentos }: Props) {
  return (
    <section className="bg-white rounded-2xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Histórico de Atendimentos{" "}
        <span className="text-sm font-normal text-gray-500">
          ({atendimentos.length})
        </span>
      </h2>

      {atendimentos.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          Nenhum atendimento concluído.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {atendimentos.map((atendimento) => (
            <li
              key={`${atendimento.id}-${atendimento.concluido_em}`}
              className="py-3 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-medium text-gray-800">
                  #{atendimento.senha} - {atendimento.nome}
                </p>
                <p className="text-xs text-gray-400">
                  Concluído em{" "}
                  {new Date(atendimento.concluido_em).toLocaleString("pt-BR")}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${
                  atendimento.tipo === "prioritario"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {atendimento.tipo === "prioritario"
                  ? "Prioritário"
                  : "Normal"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
