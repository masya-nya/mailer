export type MailruProfileTypes = {
    id: string;
    displayName: string;
    username: string;
    name: { familyName: string; givenName: string; middleName: string };
    emails: { value: string }[];
    photos: { value: string }[];
    profileUrl: string;
};
