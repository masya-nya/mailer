import { Controller, Get, HttpCode, Patch, Query, HttpStatus, HttpException, Body, Param, ParseArrayPipe } from '@nestjs/common';
import { Endpoints } from 'src/core/constants/endpoints';
import { Logger } from 'src/core/logger/logger.service';
import { UserService } from './user.service';
import { fillDTO } from 'src/core/helpers/fill-dto';
import { ExactUserRDO } from './rdo/exact-user.rdo';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

type UserRequestQueryParams = {
    subdomain: string;
    accountId: string;
    userId?: string;
};

@ApiTags('User')
@Controller(Endpoints.Users.Base)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly logger: Logger
    ) {
        this.logger.log(`${UserController.name} has been initializes...`);
    }

    @ApiOperation({ summary: 'Получение всех пользователей принадлежащих аккаунту' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get()
    @HttpCode(HttpStatus.OK)
    public async getAllUsers(@Query() { accountId, subdomain }: UserRequestQueryParams): Promise<ExactUserRDO[]> {
        const accId = Number(accountId);
        if (!accId || !subdomain) {
            throw new HttpException('Incorrect query parameters', HttpStatus.BAD_REQUEST);
        }

        const response = await this.userService.getAccountUsers(accId, subdomain);

        return response.map((element) => fillDTO(ExactUserRDO, element));
    }

    @ApiOperation({ summary: 'Получение данных конкретного пользователя принадлежащего аккаунту' })
    @ApiResponse({ status: HttpStatus.OK })
    @Get(Endpoints.Users.Exact)
    @HttpCode(HttpStatus.OK)
    public async getUser(@Query() { accountId, userId, subdomain }: UserRequestQueryParams): Promise<ExactUserRDO> {
        const accId = Number(accountId);
        const id = Number(userId);

        if (!accId || !id || !subdomain) {
            throw new HttpException('Incorrect query parameters', HttpStatus.BAD_REQUEST);
        }

        const response = await this.userService.getUser(accId, subdomain, id);

        return fillDTO(ExactUserRDO, response);
    }

    @ApiOperation({ summary: 'Обновление пользователей принадлежащих конкретному аккаунту, возвращает массив обновленных пользователей' })
    @ApiResponse({ status: HttpStatus.OK })
    @Patch('/:accountId')
    @HttpCode(HttpStatus.OK)
    public async updateUsers(
        @Param('accountId') accountId: number,
        @Body(new ParseArrayPipe({ items: UpdateUserDTO })) updateUserDtos: UpdateUserDTO[]
    ): Promise<ExactUserRDO[]> {
        const response = await this.userService.updateUsers(updateUserDtos, accountId);

        return response.map((element) => fillDTO(ExactUserRDO, element));
    }
}
