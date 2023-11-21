import { Injectable } from '@nestjs/common';
import { Logger } from 'src/core/logger/logger.service';
import { PopulatedDistributionSettings, TriggerPopulatedTemplateAndSettings } from '../triggers/trigger.model';
import { DistributionTypes } from 'src/core/constants/distribution-types';
import handleError from 'src/core/helpers/handleError';
import { WorkSettings } from 'src/core/types/work-settings';
import * as dayjs from 'dayjs';
import { WeekDays } from 'src/core/constants/week-days';
import { WorkSchedule } from '../work-schedule/work-schedule.model';
import { WeekDayName } from 'src/core/types/week-days.type';
import { DayWorkSchedule } from 'src/core/types/day-work-schedule';
import { UserStatuses } from '../users/constants/statuses.enum';
import { AmoRepeatEntity } from '../amo-api/types/amo-api.types';

export type GetDistributionUser = {
    distributionItem: PopulatedDistributionSettings;
    userIndex: number;
    distributionSettings: PopulatedDistributionSettings[];
};

const ONE_HOUR_IN_UNIX = 3600;

@Injectable()
export class DistributionService {
    constructor(private readonly logger: Logger) {
        this.logger.log(`${DistributionService.name} has been initialized`);
    }

    public isNowWorkTime(workTime: DayWorkSchedule): boolean {
        const nowTime = dayjs().format('HH:mm');
        if (workTime.dayBeginTime <= nowTime && workTime.dayEndTime >= nowTime) {
            return true;
        }
        return false;
    }

    public isWorkingTime(workTime: WorkSettings): boolean {
        const workWeekDays: number[] = workTime.days.map((day) => WeekDays[day]);
        const now = dayjs();
        const nowWeekDay = now.get('d');
        if (workWeekDays.includes(nowWeekDay) && this.isNowWorkTime(workTime)) {
            return true;
        }
        return false;
    }

    public getNowWeekDayName(): WeekDayName {
        const now = dayjs();
        const nowWeekDay = now.get('d');
        for (const key in WeekDays) {
            const weekKey = key as WeekDayName;
            if (WeekDays[weekKey] === nowWeekDay) {
                return weekKey;
            }
        }
    }

    public isUserWorkTime(userWorkTime: WorkSchedule): boolean {
        const nowWeekDayName = this.getNowWeekDayName();
        const nowUserWorkTime = userWorkTime[nowWeekDayName];
        if (!nowUserWorkTime) {
            return false;
        }

        if (this.isNowWorkTime(nowUserWorkTime)) {
            return true;
        }
        return false;
    }

    public validateEntityResponsible(distributions: PopulatedDistributionSettings[], entity: AmoRepeatEntity): boolean {
        const nowUnix = dayjs().unix();
        const isRepeatEntity = nowUnix - entity.created_at > ONE_HOUR_IN_UNIX;
        const isInDistribution = distributions.some((distribution) => distribution.user.userId === entity.responsible_user_id);
        if (isRepeatEntity && isInDistribution) {
            return true;
        }

        return false;
    }

    public isUserOnInDistribution(userStatus: string): boolean {
        return userStatus === UserStatuses.ForcedOn || userStatus === UserStatuses.On;
    }

    public getDistributionResult(distributions: PopulatedDistributionSettings[], index: number): GetDistributionUser {
        return { distributionItem: distributions[index], userIndex: index, distributionSettings: distributions };
    }

    public isRightUserDistribution(
        distribution: PopulatedDistributionSettings,
        isConsiderIndividualWorkTime: boolean,
        exceptedUsers: number[]
    ): boolean {
        if (this.isUserOnInDistribution(distribution.user.status) && !exceptedUsers.includes(distribution.user.userId)) {
            if (isConsiderIndividualWorkTime) {
                if (this.isUserWorkTime(distribution.user.workSchedule)) {
                    return true;
                }
            } else {
                return true;
            }
        }

        return false;
    }

    public isQueueDistributionPassedLap(
        distributions: PopulatedDistributionSettings[],
        isConsiderIndividualWorkTime: boolean,
        exceptedUsers: number[]
    ): boolean {
        const distributionIndex = distributions.findIndex((distribution) => {
            return !distribution.weight && this.isRightUserDistribution(distribution, isConsiderIndividualWorkTime, exceptedUsers);
        });

        return distributionIndex === -1;
    }

    public resetQueueDistributionLap(
        distributions: PopulatedDistributionSettings[],
        isConsiderIndividualWorkTime: boolean,
        exceptedUsers: number[]
    ): PopulatedDistributionSettings[] {
        return distributions.map((distribution) => {
            return this.isRightUserDistribution(distribution, isConsiderIndividualWorkTime, exceptedUsers)
                ? { user: distribution.user, weight: 0 }
                : distribution;
        });
    }

    public getQueueDistributionUser(
        distributions: PopulatedDistributionSettings[],
        isConsiderIndividualWorkTime: boolean,
        exceptedUsers: number[] = []
    ): GetDistributionUser | null {
        if (this.isQueueDistributionPassedLap(distributions, isConsiderIndividualWorkTime, exceptedUsers)) {
            distributions = this.resetQueueDistributionLap(distributions, isConsiderIndividualWorkTime, exceptedUsers);
        }

        const distributionIndex = distributions.findIndex((distribution) => {
            return !distribution.weight && this.isRightUserDistribution(distribution, isConsiderIndividualWorkTime, exceptedUsers);
        });

        if (distributionIndex === -1) {
            return null;
        }

        return this.getDistributionResult(distributions, distributionIndex);
    }

    public isQuantityDistributionFull(
        currentSettings: PopulatedDistributionSettings[],
        templateSettings: PopulatedDistributionSettings[]
    ): boolean {
        for (let i = 0; i < currentSettings.length; i++) {
            if (this.isUserOnInDistribution(currentSettings[i].user.status)) {
                if (currentSettings[i].weight < templateSettings[i].weight) {
                    return false;
                }
            }
        }

        return true;
    }

    public getQuantityDistributionUser(
        currentSettings: PopulatedDistributionSettings[],
        templateSettings: PopulatedDistributionSettings[]
    ): GetDistributionUser | null {
        if (this.isQuantityDistributionFull(currentSettings, templateSettings)) {
            currentSettings = currentSettings.map((distribution) => {
                return this.isUserOnInDistribution(distribution.user.status) ? { user: distribution.user, weight: 0 } : distribution;
            });
        }

        for (let i = 0; i < currentSettings.length; i++) {
            if (this.isUserOnInDistribution(currentSettings[i].user.status)) {
                if (currentSettings[i].weight < templateSettings[i].weight) {
                    return this.getDistributionResult(currentSettings, i);
                }
            }
        }

        return null;
    }

    public getTotalDistributedCount(currentSettings: PopulatedDistributionSettings[]): number {
        return currentSettings.reduce((sum, distribution) => {
            return this.isUserOnInDistribution(distribution.user.status) ? sum + distribution.weight : sum;
        }, 0);
    }

    public getMissedPercentage(templateSettings: PopulatedDistributionSettings[]): number {
        return templateSettings.reduce((sum, distribution) => {
            return !this.isUserOnInDistribution(distribution.user.status) ? sum + distribution.weight : sum;
        }, 0);
    }

    public getUserPercent(count: number, total: number): number {
        if (count === total && total === 0) return 0;

        return (count / total) * 100;
    }

    public getPercentDistributionUser(
        currentSettings: PopulatedDistributionSettings[],
        templateSettings: PopulatedDistributionSettings[]
    ): GetDistributionUser | null {
        const total = this.getTotalDistributedCount(currentSettings);
        const missedPercentage = this.getMissedPercentage(templateSettings);
        const excludedUsersCount = currentSettings.filter((value) => !this.isUserOnInDistribution(value.user.status)).length;
        const additionalPercentPerUser = excludedUsersCount ? Number((missedPercentage / excludedUsersCount).toFixed(2)) : 0;

        for (let i = 0; i < currentSettings.length; i++) {
            if (this.isUserOnInDistribution(currentSettings[i].user.status)) {
                if (!currentSettings[i].weight) {
                    return this.getDistributionResult(currentSettings, i);
                }

                const userPercent = this.getUserPercent(currentSettings[i].weight, total);
                if (userPercent <= templateSettings[i].weight + additionalPercentPerUser) {
                    return this.getDistributionResult(currentSettings, i);
                }
            }
        }

        return null;
    }

    public getUserByDistributionType(
        trigger: TriggerPopulatedTemplateAndSettings,
        exceptedUsers: number[] = []
    ): GetDistributionUser | null {
        try {
            const isConsiderIndividualWorkTime = trigger.template.isConsiderIndividualWorkTime;
            switch (trigger.distributionType) {
                case DistributionTypes.Queue:
                    return this.getQueueDistributionUser(trigger.distributionSettings, isConsiderIndividualWorkTime, exceptedUsers);
                case DistributionTypes.Quantity:
                    return this.getQuantityDistributionUser(trigger.distributionSettings, trigger.template.distributionSettings);
                case DistributionTypes.Percent:
                    return this.getPercentDistributionUser(trigger.distributionSettings, trigger.template.distributionSettings);
                default:
                    return null;
            }
        } catch (error) {
            const message = `Error while getting user to distribution from trigger`;
            this.logger.error(message, error);
            handleError(error, message);
        }
    }
}
