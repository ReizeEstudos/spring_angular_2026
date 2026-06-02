import { Student } from "./Student";

export interface FollowUp{
    id: string;
    text: string;
    date: string;
    student: Student;
}