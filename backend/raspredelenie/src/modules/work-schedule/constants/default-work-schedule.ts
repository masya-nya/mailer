import { DefaultDayWorkSchedule } from 'src/core/constants/week-days';
import { WorkSchedule } from '../work-schedule.model';

export const DefaultWorkSchedule: Omit<WorkSchedule, 'user' | 'account'> = {
    Mon: DefaultDayWorkSchedule,
    Tue: DefaultDayWorkSchedule,
    Wed: DefaultDayWorkSchedule,
    Thu: DefaultDayWorkSchedule,
    Fri: DefaultDayWorkSchedule,
    Sat: DefaultDayWorkSchedule,
    Sun: DefaultDayWorkSchedule,
} as const;
