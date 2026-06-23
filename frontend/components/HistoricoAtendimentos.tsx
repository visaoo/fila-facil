"use client";

import { useState } from "react";
import type { Cliente } from "./FilaEspera";

export interface Atendimento extends Cliente {
  chamado_em: string;
  concluido_em: string;
}

interface Props {
  atendimentos: Atendimento[];
  busca: string;
  ordem: "asc" | "desc";
  onBuscaChange: (value: string) => void;
  onOrdemChange: (value: "asc" | "desc") => void;
}

export default function HistoricoAtendimentos({
  atendimentos,
  busca,
  ordem,
  onBuscaChange,
  onOrdemChange,
}: Props) {
  return (
    <section className="bg-white rounded-2xl shadow p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Histórico de Atendimentos{" "}
        <span className="text-sm font-normal text-gray-500">
          ({atendimentos.length})
        </span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          value={busca}
          onChange={(e) => onBuscaChange(e.target.value)}
          placeholder="Buscar cliente por nome..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => onOrdemChange(ordem === "desc" ? "asc" : "desc")}
          className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition shrink-0"
        >
          {ordem === "desc" ? (
            <>
              <span>Mais recentes primeiro</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Mais antigos primeiro</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
            </>
          )}
        </button>
      </div>

      {atendimentos.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-6">
          {busca.trim()
            ? `Nenhum atendimento encontrado para "${busca}".`
            : "Nenhum atendimento concluído."}
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
                {atendimento.tipo === "prioritario" ? "Prioritário" : "Normal"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
