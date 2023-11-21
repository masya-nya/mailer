export type ApplicationConfigSchema = {
    PORT: number;
    MONGO_CONNECT: string;
    MONGO_NAME: string;
    CLIENT_UUID: string;
    CLIENT_SECRET: string;
    REDIRECT_URI: string;
};
