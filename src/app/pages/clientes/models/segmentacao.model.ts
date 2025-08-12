export interface SegmentacaoModel {
  id: number;
  segmento: string;
  idEmpresa: number;
  fAtivo: number;
  dthCriacao: Date;
  dthAlteracao?: Date;
}
