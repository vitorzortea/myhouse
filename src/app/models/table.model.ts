import { Model } from '../core/model';
//import { Line } from './line.model';

export class Table extends Model {
  id: string;
  createOn: Date;
  lines: [ { nome: string, pagante: 'Vitor' | 'Fernando', valor: number, data: Date, } ];
}
