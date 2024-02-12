import { User } from "../services/user-service.service";

export type CreateEditUser = Pick<User,'name' | 'email' | 'phone' | 'website'>