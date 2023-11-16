import { Injectable } from '@nestjs/common';
import { MarlboroService } from './marlboroLogger/marlboro.service';

@Injectable()
export class AppService {
    constructor(private readonly logger: MarlboroService) {}

    public ping(): string {
        const loggerContext = `${AppService.name}/${this.ping.name}`;

        try {
            this.logger.info('SERVER WORKED', loggerContext);
            return `SERVER WORKING RIGHT NOW ${Date.now()}`;
        } catch (error) {
            this.logger.error(error, loggerContext);
        }
    }
}
