"use client";

import { useEffect, useState } from "react";
import ClienteForm from "@/components/ClienteForm";

interface Cliente {
  id: string;
  nome: string;
  tipo: string;
  senha: number;
  horario: string;
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  async function carregarFila() {
    try {
      const res = await fetch("http://localhost:8000/fila");
      const data = await res.json();
      setClientes(data.fila);
    } catch {
      console.error("Erro ao carregar fila");
    }
  }

  useEffect(() => {
    carregarFila();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fila Fácil</h1>
        <p className="text-gray-500 mb-8">Sistema de atendimento com fila de espera</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClienteForm onClienteAdicionado={carregarFila} />

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
        </div>
      </div>
    </main>
  );
}
