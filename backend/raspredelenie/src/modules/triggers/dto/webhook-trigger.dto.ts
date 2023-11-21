import { Transform, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TriggerData } from './trigger-data.dto';
import { TriggerInfo } from './trigger-info.dto';

class WebhookEvent {
    @ValidateNested({ each: true })
    @Type(() => TriggerData)
    public data!: TriggerData;
}

class WebhookAction {
    @Transform(({ value }) => JSON.parse(value.widget.settings.triggerInfo))
    @ValidateNested({ each: true })
    @Type(() => TriggerInfo)
    public settings: TriggerInfo;
}

export class WebhookTriggerInfo {
    @ValidateNested({ each: true })
    @Type(() => WebhookEvent)
    public event!: WebhookEvent;

    @ValidateNested({ each: true })
    @Type(() => WebhookAction)
    public action!: WebhookAction;

    public subdomain!: string;

    @Type(() => Number)
    public account_id!: string;
}
