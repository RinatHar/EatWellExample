import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { Lifestyle } from 'app/shared/model/enumerations/lifestyle.model';

export interface IUserProperties {
  id?: number;
  name?: string;
  gender?: keyof typeof Gender;
  date?: dayjs.Dayjs;
  currentWeight?: number;
  preferredWeight?: number;
  height?: number;
  lifestyle?: keyof typeof Lifestyle;
  caloriesNeeded?: number;
  createdDate?: dayjs.Dayjs;
  lastModifiedDate?: dayjs.Dayjs;
  user?: IUser | null;
}

export const defaultValue: Readonly<IUserProperties> = {};
