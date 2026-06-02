import { FollowUp } from "./FollowUp";

export interface FollowUpInsertDTO extends Omit<FollowUp, 'id' | 'student'>{
    studentId: string;
}