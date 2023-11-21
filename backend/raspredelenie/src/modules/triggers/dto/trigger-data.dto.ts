import { Type } from 'class-transformer';

export class TriggerData {
    @Type(() => Number)
    public id!: number;

    @Type(() => Number)
    public element_type!: number;

    @Type(() => Number)
    public status_id!: number;

    @Type(() => Number)
    public pipeline_id!: number;
}
