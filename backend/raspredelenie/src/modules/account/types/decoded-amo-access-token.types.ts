export type DecodedAmoAccessTokenTypes = {
    aud: string;
    jti: string;
    iat: number;
    nbf: number;
    exp: number;
    sub: string;
    grant_type: string;
    account_id: number;
    base_domain: string;
    version: number;
    scopes: string[];
};
