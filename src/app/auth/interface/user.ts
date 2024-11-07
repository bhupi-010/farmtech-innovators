export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  role: {
    name: string;
    id: number;
    permissons: Permissions[];
  };
}

export interface Permissions {
  id: number;
  name: string;
}
