export type CustomField = {
    id: number;
    name: string;
    code?: string;
    enums?: [
        {
            id: number;
            value: string;
        }
    ];
};
