"use client";

import { useState } from "react";

interface Props {
  onClienteAdicionado: () => void;
}

export default function ClienteForm({ onClienteAdicionado }: Props) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro("O nome é obrigatório.");
      return;
    }
    setLoading(true);
    setErro("");
    try {
      const res = await fetch("http://localhost:8000/clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nome.trim(), tipo }),
      });
      if (!res.ok) throw new Error();
      setNome("");
      setTipo("normal");
      onClienteAdicionado();
    } catch {
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow p-6 space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Cadastrar Cliente</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome do cliente"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Atendimento
        </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="normal">Normal</option>
          <option value="prioritario">Prioritário (idoso, gestante, PCD)</option>
        </select>
      </div>

      {erro && <p className="text-sm text-red-500">{erro}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? "Cadastrando..." : "Entrar na Fila"}
      </button>
    </form>
  );
}
