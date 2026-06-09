class No:
    def __init__(self, dado):
        self.dado = dado
        self.proximo = None


class Fila:
    def __init__(self):
        self.inicio = None
        self.fim = None
        self.tamanho = 0

    def enfileirar(self, dado):
        novo_no = No(dado)
        if self.fim:
            self.fim.proximo = novo_no
        self.fim = novo_no
        if not self.inicio:
            self.inicio = novo_no
        self.tamanho += 1

    def desenfileirar(self):
        if self.vazia():
            return None
        dado = self.inicio.dado
        self.inicio = self.inicio.proximo
        if not self.inicio:
            self.fim = None
        self.tamanho -= 1
        return dado

    def vazia(self):
        return self.inicio is None

    def peek(self):
        if self.vazia():
            return None
        return self.inicio.dado

    def listar(self):
        elementos = []
        atual = self.inicio
        while atual:
            elementos.append(atual.dado)
            atual = atual.proximo
        return elementos

    def remover(self, identificador):
        anterior = None
        atual = self.inicio

        while atual:
            if atual.dado["id"] == identificador:
                if anterior:
                    anterior.proximo = atual.proximo
                else:
                    self.inicio = atual.proximo

                if atual is self.fim:
                    self.fim = anterior

                self.tamanho -= 1
                return atual.dado

            anterior = atual
            atual = atual.proximo

        return None
