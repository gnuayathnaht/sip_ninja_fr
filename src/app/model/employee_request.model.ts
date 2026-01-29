export interface EmployeeRequest {
    id?: number;
    name: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    roleId: number;
    teamId?: number;
}