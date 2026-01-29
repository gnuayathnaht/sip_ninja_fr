import { Role } from "./role.model";
import { Team } from "./team.model";

export interface Employee {
    id?: number;
    name: string;
    password: string;
    email: string;
    phoneNo: string;
    address: string;
    imageName: string;
    status: boolean;
    roles: Role[];
    teams: Team[]
}