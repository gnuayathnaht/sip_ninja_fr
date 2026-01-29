import { Employee } from "./employee.model";

export interface Team {
    id: number;
    name?: string;
    manager?: Employee;
    assistant_manager?: Employee;
    tech_lead?: Employee;
}