export interface User {
  id:        number;
  name:      string;
  email:     string;
  createdAt: Date | string;
  lastLogin: Date | string;
}
