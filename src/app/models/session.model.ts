import { Model } from '../core/model';

export class Session extends Model {
  id: string;
  createOn: Date;
  inicio: Date;
  final: Date;
  description: string;
  table: string;
  pago: boolean;
}
