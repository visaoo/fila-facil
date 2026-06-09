"use client";

import { useCallback, useEffect, useState } from "react";
import ClienteForm from "@/components/ClienteForm";
import FilaEspera, { Cliente } from "@/components/FilaEspera";
import HistoricoAtendimentos, {
  Atendimento,
} from "@/components/HistoricoAtendimentos";

const API_URL = "http://localhost:8000";

interface AtendimentoAtual extends Cliente {
  chamado_em: string;
}

export default function Home() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [atendimentoAtual, setAtendimentoAtual] =
    useState<AtendimentoAtual | null>(null);
  const [historico, setHistorico] = useState<Atendimento[]>([]);
  const [chamando, setChamando] = useState(false);
  const [finalizando, setFinalizando] = useState(false);
  const [cancelandoId, setCancelandoId] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  const carregarDados = useCallback(async () => {
    try {
      const [resFila, resHistorico] = await Promise.all([
        fetch(`${API_URL}/fila`),
        fetch(`${API_URL}/historico`),
      ]);

      if (!resFila.ok || !resHistorico.ok) {
        throw new Error();
      }

      const [dadosFila, dadosHistorico] = await Promise.all([
        resFila.json(),
        resHistorico.json(),
      ]);

      setClientes(dadosFila.fila);
      setAtendimentoAtual(dadosFila.atendimento_atual);
      setHistorico(dadosHistorico.historico);
      setErro("");
    } catch {
      setErro("Não foi possível carregar os dados do servidor.");
    }
  }, []);

  async function chamarProximo() {
    setChamando(true);
    setErro("");
    try {
      const res = await fetch(`${API_URL}/fila/proximo`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail);
      }
      await carregarDados();
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao chamar o cliente.",
      );
    } finally {
      setChamando(false);
    }
  }

  async function concluirAtendimento() {
    setFinalizando(true);
    setErro("");
    try {
      const res = await fetch(`${API_URL}/atendimentos/atual/concluir`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail);
      }
      await carregarDados();
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao concluir atendimento.",
      );
    } finally {
      setFinalizando(false);
    }
  }

  async function cancelarCliente(cliente: Cliente) {
    const confirmado = window.confirm(
      `Remover ${cliente.nome} da fila de espera?`,
    );
    if (!confirmado) return;

    setCancelandoId(cliente.id);
    setErro("");
    try {
      const res = await fetch(`${API_URL}/fila/${cliente.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail);
      }
      await carregarDados();
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao cancelar cliente.",
      );
    } finally {
      setCancelandoId(null);
    }
  }

  async function cancelarAtendimentoAtual() {
    if (!atendimentoAtual) return;

    const confirmado = window.confirm(
      `Cancelar o atendimento de ${atendimentoAtual.nome}?`,
    );
    if (!confirmado) return;

    setFinalizando(true);
    setErro("");
    try {
      const res = await fetch(`${API_URL}/atendimentos/atual`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail);
      }
      await carregarDados();
    } catch (error) {
      setErro(
        error instanceof Error ? error.message : "Erro ao cancelar atendimento.",
      );
    } finally {
      setFinalizando(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fila Fácil</h1>
        <p className="text-gray-500 mb-8">
          Sistema de atendimento com fila de espera
        </p>

        {erro && (
          <p className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {erro}
          </p>
        )}

        {atendimentoAtual && (
          <section className="mb-6 bg-green-50 border border-green-200 rounded-2xl px-6 py-4">
            <p className="text-sm text-green-600 font-medium">
              Atendimento atual
            </p>
            <p className="text-lg font-bold text-green-800 mt-1">
              #{atendimentoAtual.senha} - {atendimentoAtual.nome}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={concluirAtendimento}
                disabled={finalizando}
                className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {finalizando ? "Processando..." : "Concluir atendimento"}
              </button>
              <button
                onClick={cancelarAtendimentoAtual}
                disabled={finalizando}
                className="border border-red-300 text-red-600 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 disabled:opacity-50"
              >
                Cancelar atendimento
              </button>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <ClienteForm onClienteAdicionado={carregarDados} />
          <FilaEspera
            clientes={clientes}
            onChamarProximo={chamarProximo}
            onCancelarCliente={cancelarCliente}
            chamando={chamando}
            cancelandoId={cancelandoId}
            possuiAtendimentoAtual={Boolean(atendimentoAtual)}
          />
        </div>

        <HistoricoAtendimentos atendimentos={historico} />
      </div>
    </main>
  );
}
