from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import uuid

from structures.fila_prioridade import FilaPrioridade

app = FastAPI(title="Fila Fácil API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fila = FilaPrioridade()
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
    if cliente.tipo not in ("normal", "prioritario"):
        raise HTTPException(
            status_code=400,
            detail="Tipo inválido. Use 'normal' ou 'prioritario'.",
        )
    contador_senha += 1
    novo_cliente = {
        "id": str(uuid.uuid4()),
        "nome": cliente.nome,
        "tipo": cliente.tipo,
        "senha": contador_senha,
        "horario": datetime.now().isoformat(),
    }
    fila.enfileirar(novo_cliente)
    return novo_cliente


@app.get("/fila")
def listar_fila():
    return {"fila": fila.listar(), "total": fila.tamanho()}


@app.post("/fila/proximo")
def chamar_proximo():
    cliente = fila.desenfileirar()
    if not cliente:
        raise HTTPException(status_code=404, detail="Fila vazia.")
    return {"mensagem": "Cliente chamado com sucesso.", "cliente": cliente}
