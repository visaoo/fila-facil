from .fila import Fila


class FilaPrioridade:
    """
    Clientes do tipo 'prioritario' (idosos, gestantes, PCDs) são atendidos
    antes dos clientes normais, independentemente da ordem de chegada.
    """

    def __init__(self):
        self.fila_prioritaria = Fila()
        self.fila_normal = Fila()

    def enfileirar(self, cliente):
        if cliente["tipo"] == "prioritario":
            self.fila_prioritaria.enfileirar(cliente)
        else:
            self.fila_normal.enfileirar(cliente)

    def desenfileirar(self):
        if not self.fila_prioritaria.vazia():
            return self.fila_prioritaria.desenfileirar()
        return self.fila_normal.desenfileirar()

    def vazia(self):
        return self.fila_prioritaria.vazia() and self.fila_normal.vazia()

    def listar(self):
        return self.fila_prioritaria.listar() + self.fila_normal.listar()

    def tamanho(self):
        return self.fila_prioritaria.tamanho + self.fila_normal.tamanho
