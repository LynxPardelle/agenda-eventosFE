import { IEvento } from './evento';
import { IActivity } from './activity';
import { IUser } from '../../user/interfaces/user';

export interface ITicket {
  _id: string;
  type: number;
  evento: IEvento | null;
  user: IUser | null;
  role:
    | 'asistente'
    | 'operador general'
    | 'operador de actividad'
    | 'operador de asistentes';
  activitiesAdmin: IActivity[];
  createAt: Date;
  changeDate: Date;
  changeUser: IUser | null;
  changeType: string;
  ver: number;
  isDeleted: boolean;
  changeHistory: ITicket[];
}
