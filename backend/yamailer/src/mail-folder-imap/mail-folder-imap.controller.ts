import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { MailFolderImapService } from './mail-folder-imap.service';
import { MailsGetDto } from '../mails/dto/mails-getCounts.dto';
import { MailboxCreateResponse, MailboxRenameResponse } from 'imapflow';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FolderCreateDto } from './dto/folder-create.dto';
import { FolderRenameDto } from './dto/folder-rename.dto';
import { FolderDeleteDto } from './dto/folder-delete.dto';
import { Endpoints } from '../consts/endpoints';
import { ListTreeWithMessagesResponse } from './types/folder-tree.types';

@ApiTags('Работа с папками писем IMAP')
@Controller(Endpoints.MailService.FolderImap)
export class MailFolderImapController {
    constructor(private readonly mailFolderImapService: MailFolderImapService) {}

    @ApiOperation({ summary: 'Получение папок' })
    @Get()
    public async getFolders(@Query() mailerInfo: MailsGetDto): Promise<ListTreeWithMessagesResponse[]> {
        return await this.mailFolderImapService.getFolders(mailerInfo);
    }

    @ApiOperation({ summary: 'Создание папки' })
    @Post()
    public async createFolder(@Query() mailerInfo: MailsGetDto, @Body() folderInfo: FolderCreateDto): Promise<MailboxCreateResponse> {
        return await this.mailFolderImapService.createFolder(mailerInfo, folderInfo.path, folderInfo.name, folderInfo.delimiter);
    }

    @ApiOperation({ summary: 'Изменение имени папки' })
    @Patch()
    public async renameFolder(@Query() mailerInfo: MailsGetDto, @Body() folderInfo: FolderRenameDto): Promise<MailboxRenameResponse> {
        return await this.mailFolderImapService.renameFolder(mailerInfo, folderInfo.path, folderInfo.name, folderInfo.delimiter);
    }

    @ApiOperation({ summary: 'Удаление папки' })
    @Delete()
    public async deleteFolder(@Query() mailerInfo: MailsGetDto, @Body() folderInfo: FolderDeleteDto): Promise<boolean> {
        await this.mailFolderImapService.deleteFolder(mailerInfo, folderInfo.path);
        return true;
    }
}
