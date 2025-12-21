export enum OrigemTabelaPreco {
  Tipo_Produto = 1,
  Grupo_Cliente = 2,
  Fornecedor = 3,
}
export function enumToArrayOrigemTabelaPreco() {
  return Object.keys(OrigemTabelaPreco)
    .filter((key) => isNaN(Number(key)))
    .map((key) => ({
      label: key.replace('_', ' '),
      value: OrigemTabelaPreco[key as keyof typeof OrigemTabelaPreco],
    }));
}
