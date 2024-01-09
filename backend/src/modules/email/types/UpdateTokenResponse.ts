type EmailTokenRDO = {
    access_token: string;
    expires_in: number;
};

export type GoogleTokenResponse = {
    scope: string | string[];
    token_type: string;
    refresh_token?: string;
} & EmailTokenRDO;

export type YandexTokenResponse = {
    refresh_token: string;
    token_type: string;
} & EmailTokenRDO;

export type MailruTokenResponse = {
    error?: string;
} & EmailTokenRDO;
