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
          <FilaEspera clientes={clientes} />
        </div>
      </div>
    </main>
  );
}
