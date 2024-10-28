import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface IProduct {
  id?: number;
  name?: string;
  photo?: string | null;
  calories?: number;
  protein?: number;
  fats?: number;
  carbohydrates?: number;
  createdDate?: dayjs.Dayjs;
  lastModifiedDate?: dayjs.Dayjs;
  user?: IUser | null;
}

export const defaultValue: Readonly<IProduct> = {};
