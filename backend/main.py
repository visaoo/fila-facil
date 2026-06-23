from datetime import datetime
import uuid

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from structures.fila_prioridade import FilaPrioridade
from structures.lista_historico import ListaHistorico

app = FastAPI(title="Fila Fácil API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fila = FilaPrioridade()
historico = ListaHistorico()
atendimento_atual = None
contador_senha = 0


class ClienteInput(BaseModel):
    nome: str
    tipo: str  # "normal" ou "prioritario"


@app.get("/")
def root():
    return {"mensagem": "Fila Fácil API"}


@app.post("/clientes", status_code=201)
def cadastrar_cliente(cliente: ClienteInput):
    global contador_senha

    nome = cliente.nome.strip()
    if not nome:
        raise HTTPException(status_code=400, detail="O nome é obrigatório.")

    if cliente.tipo not in ("normal", "prioritario"):
        raise HTTPException(
            status_code=400,
            detail="Tipo inválido. Use 'normal' ou 'prioritario'.",
        )

    contador_senha += 1
    novo_cliente = {
        "id": str(uuid.uuid4()),
        "nome": nome,
        "tipo": cliente.tipo,
        "senha": contador_senha,
        "horario": datetime.now().isoformat(),
    }
    fila.enfileirar(novo_cliente)
    return novo_cliente


@app.get("/fila")
def listar_fila():
    clientes = [
        {**cliente, "posicao": posicao}
        for posicao, cliente in enumerate(fila.listar(), start=1)
    ]
    return {
        "fila": clientes,
        "total": fila.tamanho(),
        "atendimento_atual": atendimento_atual,
    }


@app.post("/fila/proximo")
def chamar_proximo():
    global atendimento_atual

    if atendimento_atual:
        raise HTTPException(
            status_code=409,
            detail="Conclua ou cancele o atendimento atual antes de chamar outro cliente.",
        )

    cliente = fila.desenfileirar()
    if not cliente:
        raise HTTPException(status_code=404, detail="Fila vazia.")

    atendimento_atual = {
        **cliente,
        "chamado_em": datetime.now().isoformat(),
    }
    return {
        "mensagem": "Cliente chamado com sucesso.",
        "cliente": atendimento_atual,
    }


@app.delete("/fila/{cliente_id}")
def cancelar_cliente(cliente_id: str):
    cliente = fila.remover(cliente_id)
    if not cliente:
        raise HTTPException(status_code=404, detail="Cliente não encontrado na fila.")

    return {
        "mensagem": "Cliente removido da fila.",
        "cliente": cliente,
    }


@app.post("/atendimentos/atual/concluir")
def concluir_atendimento():
    global atendimento_atual

    if not atendimento_atual:
        raise HTTPException(status_code=404, detail="Não há atendimento em andamento.")

    atendimento_concluido = {
        **atendimento_atual,
        "concluido_em": datetime.now().isoformat(),
    }
    historico.adicionar(atendimento_concluido)
    atendimento_atual = None

    return {
        "mensagem": "Atendimento concluído e registrado no histórico.",
        "atendimento": atendimento_concluido,
    }


@app.delete("/atendimentos/atual")
def cancelar_atendimento_atual():
    global atendimento_atual

    if not atendimento_atual:
        raise HTTPException(status_code=404, detail="Não há atendimento em andamento.")

    atendimento_cancelado = atendimento_atual
    atendimento_atual = None
    return {
        "mensagem": "Atendimento cancelado.",
        "cliente": atendimento_cancelado,
    }


@app.get("/historico")
def listar_historico(busca: str = "", ordem: str = "desc"):
    atendimentos = historico.listar()

    if busca.strip():
        atendimentos = [
            a for a in atendimentos
            if busca.strip().lower() in a["nome"].lower()
        ]

    reverse = ordem != "asc"
    atendimentos = sorted(atendimentos, key=lambda a: a["concluido_em"], reverse=reverse)

    return {
        "historico": atendimentos,
        "total": len(atendimentos),
    }
