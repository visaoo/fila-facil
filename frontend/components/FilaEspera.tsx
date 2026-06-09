"use client";

export interface Cliente {
  id: string;
  nome: string;
  tipo: string;
  senha: number;
  horario: string;
  posicao?: number;
}

interface Props {
  clientes: Cliente[];
  onChamarProximo: () => void;
  onCancelarCliente: (cliente: Cliente) => void;
  chamando: boolean;
  cancelandoId: string | null;
  possuiAtendimentoAtual: boolean;
}

export default function FilaEspera({
  clientes,
  onChamarProximo,
  onCancelarCliente,
  chamando,
  cancelandoId,
  possuiAtendimentoAtual,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Fila de Espera{" "}
          <span className="text-sm font-normal text-gray-500">
            ({clientes.length})
          </span>
        </h2>
        <button
          onClick={onChamarProximo}
          disabled={
            chamando || clientes.length === 0 || possuiAtendimentoAtual
          }
          className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          {chamando ? "Chamando..." : "Chamar Próximo"}
        </button>
      </div>

      {possuiAtendimentoAtual && (
        <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2 mb-4">
          Conclua ou cancele o atendimento atual para chamar o próximo.
        </p>
      )}

      {clientes.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          Nenhum cliente na fila.
        </p>
      ) : (
        <ul className="space-y-3">
          {clientes.map((cliente, indice) => (
            <li
              key={cliente.id}
              className="border border-gray-100 rounded-xl px-4 py-3 bg-gray-50"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex items-center justify-center bg-blue-100 text-blue-700 font-bold rounded-full w-9 h-9 shrink-0">
                    {cliente.posicao ?? indice + 1}º
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      #{cliente.senha} - {cliente.nome}
                    </p>
                    <p className="text-xs text-gray-400">
                      Entrada:{" "}
                      {new Date(cliente.horario).toLocaleTimeString("pt-BR")}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full shrink-0 ${
                    cliente.tipo === "prioritario"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {cliente.tipo === "prioritario" ? "Prioritário" : "Normal"}
                </span>
              </div>
              <button
                onClick={() => onCancelarCliente(cliente)}
                disabled={cancelandoId === cliente.id}
                className="mt-3 text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
              >
                {cancelandoId === cliente.id
                  ? "Cancelando..."
                  : "Cancelar e remover da fila"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
