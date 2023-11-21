export type AppAccount = {
    id: number;
    accessToken: string;
    refreshToken: string;
    subdomain: string;
    installed: boolean;
    startUsingDate: string;
    finishTrialDate: string;
    finishPaymentDate: string;
    isTrial: boolean;
    isPaid: boolean;
    isActive: boolean;
};
