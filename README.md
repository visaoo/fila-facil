# Etapa 1 Projeto — Fila Fácil

## Integrantes

- Fillype Oliveira Amorim
- Jonathan Patrocinio dos Santos

## Projeto escolhido

Projeto 03 — Sistema de atendimento com fila de espera

## Sobre o projeto

O projeto consiste no desenvolvimento de um sistema de atendimento com fila de espera, semelhante ao funcionamento de uma clínica, banco ou setor de suporte.

O sistema permitirá cadastrar clientes, adicionar clientes à fila, chamar o próximo cliente respeitando prioridade, cancelar atendimentos e registrar os atendimentos concluídos em um histórico.

O backend será desenvolvido obrigatoriamente em Python, contendo a implementação das estruturas de dados estudadas na disciplina.

## Estruturas de dados previstas

### Fila

Será utilizada para controlar a ordem dos clientes na fila de espera.

Clientes do tipo normal serão atendidos seguindo a ordem de chegada, respeitando o conceito FIFO — First In, First Out.

### Fila com prioridade

Será utilizada para garantir que clientes preferenciais sejam chamados antes dos clientes normais.

### Lista encadeada

Será utilizada para armazenar o histórico de atendimentos concluídos.

Cada atendimento realizado será registrado como um nó da lista, permitindo percorrer o histórico posteriormente.

### Tabela hash

Será implementada em uma etapa futura para permitir a localização rápida de clientes pelo número da senha.

### Ordenação e busca

Serão adicionadas conforme os novos requisitos apresentados em aula.

## Tecnologias utilizadas

### Backend

- Python + FastAPI

### Front-end

- Next.js + Tailwind CSS

## Funcionalidades principais

- Cadastrar cliente com nome e tipo de atendimento
- Adicionar cliente à fila de espera
- Chamar próximo cliente respeitando prioridade
- Exibir status atual da fila
- Registrar atendimentos concluídos em uma lista de histórico
- Cancelar atendimento e remover cliente da fila

## Instruções para execução do projeto

1. Clone o repositório:

```bash
git clone soon
