class NoHistorico:
    def __init__(self, dado):
        self.dado = dado
        self.proximo = None


class ListaHistorico:
    def __init__(self):
        self.inicio = None
        self.fim = None
        self.tamanho = 0

    def adicionar(self, atendimento):
        novo_no = NoHistorico(atendimento)

        if self.fim:
            self.fim.proximo = novo_no
        else:
            self.inicio = novo_no

        self.fim = novo_no
        self.tamanho += 1

    def listar(self):
        atendimentos = []
        atual = self.inicio

        while atual:
            atendimentos.append(atual.dado)
            atual = atual.proximo

        return atendimentos
