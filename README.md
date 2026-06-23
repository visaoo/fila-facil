# Fila Fácil

## Integrantes

- Fillype Oliveira Amorim
- Jonathan Patrocinio dos Santos

## Projeto escolhido

Projeto 03 — Sistema de atendimento com fila de espera

## Sobre o projeto

Sistema de atendimento com fila de espera, semelhante ao funcionamento de uma clínica, banco ou setor de suporte.

O sistema permite cadastrar clientes, adicioná-los à fila respeitando prioridade, chamar o próximo cliente, cancelar atendimentos, registrar o histórico de atendimentos concluídos, e agora também **buscar** e **ordenar** o histórico por data e hora.

## Estruturas de dados implementadas

| Estrutura | Uso |
|---|---|
| Fila com prioridade | Controla a ordem de atendimento (clientes prioritários na frente) |
| Lista encadeada | Armazena o histórico de atendimentos concluídos |

## Tecnologias

- **Backend:** Python 3 + FastAPI + Uvicorn
- **Frontend:** Next.js 14 + Tailwind CSS

## Funcionalidades

- Cadastrar cliente com nome e tipo (normal ou prioritário)
- Adicionar cliente à fila de espera
- Chamar próximo cliente respeitando prioridade
- Concluir ou cancelar atendimento em andamento
- Remover cliente da fila antes de ser atendido
- Registrar atendimentos concluídos no histórico
- **[Etapa 4] Buscar cliente no histórico por nome**
- **[Etapa 4] Ordenar histórico por data/hora (mais recente ou mais antigo)**

## Como executar localmente

### Pré-requisitos

- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

A API ficará disponível em `http://localhost:8000`.  
Documentação interativa: `http://localhost:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A interface ficará disponível em `http://localhost:3000`.

## Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | `/fila` | Lista clientes na fila com posição |
| POST | `/clientes` | Cadastra novo cliente na fila |
| POST | `/fila/proximo` | Chama o próximo cliente |
| DELETE | `/fila/{id}` | Remove cliente da fila |
| POST | `/atendimentos/atual/concluir` | Conclui atendimento em andamento |
| DELETE | `/atendimentos/atual` | Cancela atendimento em andamento |
| GET | `/historico?busca=nome&ordem=asc\|desc` | Lista histórico com busca e ordenação |
