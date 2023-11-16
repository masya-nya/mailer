import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ImapFlow, ListResponse, ListTreeResponse, MailboxCreateResponse, MailboxRenameResponse } from 'imapflow';
import { MailerDocument } from '../mailers/mailer.model';
import MailsInfo from '../consts/mailsInfo';
import handleError from '../utils/handleError';
import { MarlboroService } from '../marlboroLogger/marlboro.service';
import { MailerService } from '../mailers/mailer.service';
import { ImapConnectionType, ImapService } from '../imap/imap.service';
import { MailsGetDto } from '../mails/dto/mails-getCounts.dto';
import { HttpStatusCode } from 'axios';
import { ListTreeWithMessagesResponse } from './types/folder-tree.types';

@Injectable()
export class MailFolderImapService {
    constructor(
        private readonly logger: MarlboroService,
        private readonly imapService: ImapService,
        private readonly mailerService: MailerService
    ) {}

    public async initImap(accountId: number, managerId: number, email: string): Promise<[ImapConnectionType, MailerDocument]> {
        const loggerContext = `${MailFolderImapService.name}/${this.initImap.name}`;

        try {
            const mailer = await this.mailerService.getByEmail({ accountId, email, managerId });
            if (!mailer) {
                throw new HttpException('This email does not exist in user with this accountId and managerId', HttpStatus.NOT_FOUND);
            }

            const imap = await this.imapService.create(mailer.email, MailsInfo[mailer.serviceName].ImapHost, mailer.accessToken);

            return [imap, mailer];
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private getFoldersWithMessages(folderTree: ListTreeWithMessagesResponse[], folderList: ListResponse[]): ListTreeWithMessagesResponse[] {
        folderTree.forEach((folder, idx) => {
            const findFolder = folderList.find((folderFromList) => folderFromList.path === folder.path);

            if (findFolder) {
                folderTree[idx]['messages'] = findFolder?.status?.messages || 0;
            }

            if (folder.folders && folder.folders.length) {
                this.getFoldersWithMessages(folder.folders, folderList);
            }
        });

        return folderTree;
    }

    public async getFolders({ accountId, managerId, email }: MailsGetDto): Promise<ListTreeWithMessagesResponse[]> {
        const loggerContext = `${MailFolderImapService.name}/${this.getFolders.name}`;

        try {
            const [imapConnection] = await this.initImap(accountId, managerId, email);

            const tree = await imapConnection.imap.listTree();
            const list = await imapConnection.imap.list({ statusQuery: { messages: true, unseen: true } });

            const filteredTree = tree.folders.filter((folder) => {
                return (
                    !!folder.subscribed &&
                    !folder.hasOwnProperty('specialUse') &&
                    folder.path !== '[Gmail]' &&
                    folder.path !== '[Gmail]/Важное'
                );
            });

            return this.getFoldersWithMessages(filteredTree, list);
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async createFolder(
        { accountId, managerId, email }: MailsGetDto,
        path: string,
        folderName: string,
        delimiter: string
    ): Promise<MailboxCreateResponse> {
        const loggerContext = `${MailFolderImapService.name}/${this.createFolder.name}`;

        try {
            const [imapConnection] = await this.initImap(accountId, managerId, email);

            const treatedPath = path ? path + delimiter + folderName : folderName;
            const list = await imapConnection.imap.list();

            if (list.some((folder) => folder.path === treatedPath)) {
                throw new HttpException('Такая папка уже существует', HttpStatus.BAD_REQUEST);
            }

            const newFolder = await imapConnection.imap.mailboxCreate(treatedPath);

            return newFolder;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    public async renameFolder(
        { accountId, managerId, email }: MailsGetDto,
        path: string,
        editedName: string,
        delimiter: string
    ): Promise<MailboxRenameResponse> {
        const loggerContext = `${MailFolderImapService.name}/${this.renameFolder.name}`;

        try {
            const [imapConnection] = await this.initImap(accountId, managerId, email);

            const foldersInPath = path.split(delimiter);

            foldersInPath[foldersInPath.length - 1] = editedName;

            const renamedMailbox = await imapConnection.imap.mailboxRename(path, foldersInPath.join(delimiter)).catch((reason) => {
                if (reason.responseText.includes('Cannot rename folder')) {
                    throw new HttpException(
                        {
                            message: ['Такая папка уже существует'],
                            error: 'Bad Request',
                            statusCode: HttpStatus.BAD_REQUEST,
                        },
                        HttpStatusCode.BadRequest
                    );
                } else {
                    throw new HttpException(
                        {
                            message: ['Возникла ошибка с переименованием папки'],
                            error: 'Bad Request',
                            statusCode: HttpStatus.BAD_REQUEST,
                        },
                        HttpStatusCode.BadRequest
                    );
                }
            });

            return renamedMailbox;
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }

    private async deepDelete(imap: ImapFlow, folder: ListTreeResponse): Promise<void> {
		for (const childFolder of folder.folders) {
			await this.deepDelete(imap, childFolder);
        }
			
		await imap.mailboxDelete(folder.path);
        //if (folder?.folders) {
            //for (const childFolder of folder.folders) {
                //await this.deepDelete(imap, childFolder);
            //}
        //}
        //if (folder?.path) {
            //await imap.mailboxDelete(folder.path);
        //}
    }

    public async deleteFolder({ accountId, managerId, email }: MailsGetDto, path: string): Promise<void> {
        const loggerContext = `${MailFolderImapService.name}/${this.deleteFolder.name}`;

        try {
            const [imapConnection] = await this.initImap(accountId, managerId, email);

            const tree = await imapConnection.imap.listTree();

            let foundFolder = tree.folders.find((folder) => folder.path.match(path));
            while (foundFolder && foundFolder.path !== path) {
                foundFolder = foundFolder.folders.find((folder) => folder.path.includes(path)) ?? null;
            }

            if (foundFolder) {
                await this.deepDelete(imapConnection.imap, foundFolder);
            }
        } catch (error) {
            this.logger.error(error, loggerContext);
            handleError(error);
        }
    }
}
