export const user = {
    email: 'sunilchaulagain@gmail.com',
    password: 'sunil@123',
    firstName: 'sunil',
    lastName: 'chaulagain',
    mobileNumber: '9821938307',
    role: {
        id: 2,
        name: 'user',
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
    }
}

export const admin = {
    email: 'dev@uxqode.com',
    password: 'uxqode@123',
    firstName: 'uxqode',
    lastName: 'office',
    mobileNumber: '9821938307',
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
    }
}