import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';
import { IProduct } from 'app/shared/model/product.model';

export interface IDailyRation {
  id?: number;
  productWeight?: number;
  createdDate?: dayjs.Dayjs;
  lastModifiedDate?: dayjs.Dayjs;
  user?: IUser | null;
  product?: IProduct | null;
}

export const defaultValue: Readonly<IDailyRation> = {};
