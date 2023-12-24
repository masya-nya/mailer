export class YandexAuthDTO {
    public readonly id: string;

    public readonly email: string;

    public readonly username: string;

    public readonly photo: string;

    public readonly displayName: string;

    public readonly accessToken: string;

    public readonly refreshToken: string | null;
}
