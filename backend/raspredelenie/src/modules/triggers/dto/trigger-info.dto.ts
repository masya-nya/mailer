import { Type } from 'class-transformer';

export class TriggerInfo {
    @Type(() => String)
    public triggerUuid!: string;

    @Type(() => String)
    public templateId!: string;
}
