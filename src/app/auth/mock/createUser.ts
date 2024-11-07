export function createUser(
  email: string,
  firstName: string,
  lastName: string,
  mobileNumber: number,
  role: any
) {
  const newUser: any = {
    id: 2,
    email,
    firstName,
    lastName,
    mobileNumber,
    role: {
      id: 1,
      name: 'admin',
      permissions: [
        'users-create:any',
        'users-update:any',
        'users-delete:any',
        'users-read:any',
        'roles-create:any',
        'roles-update:any',
        'roles-delete:any',
        'roles-read:any',
        'dashboard-create:any',
        'dashboard-update:any',
        'dashboard-delete:any',
        'dashboard-read:any',
        'distribution-create:any',
        'distribution-update:any',
        'distribution-delete:any',
        'distribution-read:any',
      ],
    },
  };

  return newUser;
}
