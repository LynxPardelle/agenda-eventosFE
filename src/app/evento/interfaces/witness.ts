import { IUser } from "../../user/interfaces/user";

export interface IWitness {
  witness: IUser | null;
  createAt: Date;
}
