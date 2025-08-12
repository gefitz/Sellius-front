export interface ProdutoTabela {
  id: number;
  nome: string;
  descricao: string;
  tipoProduto: string;
  vlUnitario: number;
  qtd: number;
  dthCriacao: Date;
  dthAlteracao: Date;
  fAtivo: number;
  fornecedor: string;
  tipoProdutoId: number;
  fornecedorId: number;
}
