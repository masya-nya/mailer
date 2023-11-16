export class MailruAuthDto {
    public readonly id: string;

    public readonly username: string;

    public readonly firstName: string;

    public readonly lastName: string;

    public readonly middleName: string;

    public readonly email: string;

    public readonly photo: string;

    public readonly accessToken: string;

    public readonly refreshToken: string | null;
}
