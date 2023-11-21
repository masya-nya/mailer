export type AmoUserRights = {
    mail_access: boolean;
    catalog_access: boolean;
    files_access: boolean;
    custom_fields_rights: boolean | null;
    oper_day_reports_view_access: boolean;
    oper_day_user_tracking: boolean;
    is_admin: boolean;
    is_free: boolean;
    is_active: boolean;
    group_id: number;
    role_id: number | null;
};

export type AmoUser = {
    id: number;
    name: string;
    email: string;
    lang: string;
    rights: AmoUserRights;
    _links: {
        self: {
            href: string;
        };
    };
};

export type AmoUserWrapper = {
    _total_items: number;
    _page: number;
    _page_count: number;
    _links: {
        self: {
            href: string;
        };
    };
    _embedded: {
        users: AmoUser[];
    };
};
