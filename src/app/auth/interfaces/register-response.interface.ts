import { UserRegister } from "./user-register.interface";

export interface RegisterResponse {
  success: boolean;
  data:    UserRegister;
}
