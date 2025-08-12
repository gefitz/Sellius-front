import { EstadoModel } from "./estado.model";

export interface CidadeModel{
  id:number,
  cidade:string,
  estado:EstadoModel
}
