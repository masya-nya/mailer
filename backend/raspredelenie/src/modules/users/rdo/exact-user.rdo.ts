import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { DefaultWorkSchedule } from 'src/modules/work-schedule/constants/default-work-schedule';
import { ExactWorkSchedule } from './exact-work-schedule';

export class ExactUserRDO {
    @ApiProperty({ example: '652e3d40f588aef32c20ee03', description: 'User mongo id' })
    @Expose({ name: '_id' })
    @Type(() => String)
    public id: string;

    @ApiProperty({ example: 76110, description: 'User amo id' })
    @Expose()
    public userId!: number;

    @ApiProperty({ example: 'Test', description: 'User name' })
    @Expose()
    public userName!: string;

    @ApiProperty({ example: true, description: 'Is include in distribution' })
    @Expose()
    public isInclude!: boolean;

    @ApiProperty({ example: 'on', description: 'User status' })
    @Expose()
    public status!: string;

    @ApiProperty({ example: 'user', description: 'User role' })
    @Expose()
    public role!: string;

    @ApiProperty({ example: 493006, description: 'Group id' })
    @Expose()
    public groupId!: number;

    @ApiProperty({ example: 'group_493006', description: 'Group name' })
    @Expose()
    public group!: string;

    @ApiProperty({ example: true, description: 'Is user active' })
    @Expose()
    public isActive!: boolean;

    @ApiProperty({ example: DefaultWorkSchedule, description: 'User work schedule' })
    @Expose()
    @Type(() => ExactWorkSchedule)
    public workSchedule!: ExactWorkSchedule;
}
