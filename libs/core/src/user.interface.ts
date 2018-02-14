import { Roles } from './roles.interface';

export interface User {
  uid: string;
  email: string;
  roles: Roles;
}
