import { IUser } from "../../user/interfaces/user";

export interface ICalification {
  calificator: IUser | null;
  calification: number;
  comment: string;
  createAt: Date;
}
