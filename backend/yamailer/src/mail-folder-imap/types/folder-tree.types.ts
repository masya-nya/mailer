import { ListTreeResponse } from 'imapflow';

export type ListTreeWithMessagesResponse = ListTreeResponse & {
    messages?: number;
};
