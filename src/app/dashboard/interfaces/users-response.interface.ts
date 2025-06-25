import { User } from "./user.interface";

export interface UsersResponse {
  success: boolean;
  users:   User[];
}
