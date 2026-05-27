"use client";

import { useEffect, useState } from "react";
import ClienteForm from "@/components/ClienteForm";
import FilaEspera from "@/components/FilaEspera";

interface Cliente {
  id: string;
  nome: string;
  tipo: string;
  senha: number;
  horario: string;
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [chamado, setChamado] = useState<Cliente | null>(null);
  const [chamando, setChamando] = useState(false);

  async function carregarFila() {
    try {
      const res = await fetch("http://localhost:8000/fila");
      const data = await res.json();
      setClientes(data.fila);
    } catch {
      console.error("Erro ao carregar fila");
    }
  }

  async function chamarProximo() {
    setChamando(true);
    try {
      const res = await fetch("http://localhost:8000/fila/proximo", {
        method: "POST",
      });
      if (!res.ok) return;
      const data = await res.json();
      setChamado(data.cliente);
      await carregarFila();
    } finally {
      setChamando(false);
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

        {chamado && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Chamando agora</p>
              <p className="text-lg font-bold text-green-800">
                #{chamado.senha} — {chamado.nome}
              </p>
            </div>
            <button
              onClick={() => setChamado(null)}
              className="text-green-400 hover:text-green-600 text-xl font-bold"
            >
              ×
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClienteForm onClienteAdicionado={carregarFila} />
          <FilaEspera
            clientes={clientes}
            onChamarProximo={chamarProximo}
            chamando={chamando}
          />
        </div>
      </div>
    </main>
  );
}
