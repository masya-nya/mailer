export const RequestMethods = {
    Get: 'get',
    Post: 'post',
    Put: 'put',
    Patch: 'patch',
    Delete: 'delete',
} as const;

export type RequestMethodsType = typeof RequestMethods;
export type RequestMethodsKeysType = keyof RequestMethodsType;
export type RequestMethodsValuesType = RequestMethodsType[RequestMethodsKeysType];
