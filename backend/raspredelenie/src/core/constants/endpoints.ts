export const Endpoints = {
    Global: 'responsible',
    Runtime: {
        Ping: 'ping',
    },
    Account: {
        Base: 'account',
        Install: 'login',
        UnInstall: 'delete',
        PaidStatus: 'status',
    },
    Users: {
        Base: 'users',
        Exact: 'exact',
    },
    DistributionTemplates: {
        Base: 'distribution-templates',
    },
    Triggers: {
        Base: 'triggers',
        Webhook: 'web-hooks',
    },
    WorkSchedules: {
        Base: 'work-schedules',
    },
    WidgetController: 'example.com',
} as const;
