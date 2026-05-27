"use client";

interface Cliente {
  id: string;
  nome: string;
  tipo: string;
  senha: number;
  horario: string;
}

interface Props {
  clientes: Cliente[];
}

export default function FilaEspera({ clientes }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Fila de Espera{" "}
        <span className="text-sm font-normal text-gray-500">
          ({clientes.length})
        </span>
      </h2>

      {clientes.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">
          Nenhum cliente na fila.
        </p>
      ) : (
        <ul className="space-y-3">
          {clientes.map((cliente) => (
            <li
              key={cliente.id}
              className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3 bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-blue-600 w-8 text-center">
                  #{cliente.senha}
                </span>
                <div>
                  <p className="font-medium text-gray-800">{cliente.nome}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(cliente.horario).toLocaleTimeString("pt-BR")}
                  </p>
                </div>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  cliente.tipo === "prioritario"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {cliente.tipo === "prioritario" ? "Prioritário" : "Normal"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
