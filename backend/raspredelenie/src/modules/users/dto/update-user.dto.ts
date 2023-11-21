import { IsOptional, IsNotEmpty, IsEnum, IsBoolean, IsInt } from 'class-validator';
import { UserRoles } from '../constants/roles.enum';
import { UserStatuses } from '../constants/statuses.enum';

export class UpdateUserDTO {
    @IsNotEmpty()
    @IsInt()
    public accountId!: number;

    @IsNotEmpty()
    @IsInt()
    public userId!: number;

    @IsOptional()
    @IsBoolean()
    public isInclude!: boolean;

    @IsOptional()
    @IsEnum(UserStatuses)
    public status!: string;

    @IsOptional()
    @IsEnum(UserRoles)
    public role!: string;
}
