import { ApiProperty } from '@nestjs/swagger';

export class AccountUninstallDto {
    @ApiProperty({ example: 'asda12a', description: 'Уникальный UUID виджета' })
    readonly client_uuid: string;

    @ApiProperty({ example: '35870912', description: 'Уникальный ID аккаунта' })
    readonly account_id: string;
}
