import { ITicket } from './ticket';
import { ICalification } from './calification';
import { IWitness } from './witness';
import { IActivity } from './activity';
import { IFile } from '../../core/interfaces/file';
import { IUser } from '../../user/interfaces/user';

export interface IEvento {
  _id: string;
  logo: IFile | null;
  headerImage: IFile | null;
  description: string;
  title: string;
  subtitle: string;
  activities: IActivity[];
  califications: ICalification[];
  witness: IWitness[];
  asistents: IUser[];
  operators: IUser[];
  ticketTypes: number;
  photos: IFile[];
  date: Date;
  place: string;
  titleColor: string;
  textColor: string;
  linkColor: string;
  bgColor: string;
  tickets: ITicket[];
  createAt: Date;
  changeDate: Date;
  changeUser: IUser | null;
  changeType: string;
  ver: number;
  isDeleted: boolean;
  changeHistory: IEvento[];
}
