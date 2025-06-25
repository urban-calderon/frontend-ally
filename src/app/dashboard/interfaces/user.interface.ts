export interface User {
  id:          number;
  fullName:    string;
  email:       string;
  createdAt:   Date;
  lastLoginAt: Date | null;
}
