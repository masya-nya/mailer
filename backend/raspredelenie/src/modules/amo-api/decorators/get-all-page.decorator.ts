import { Logger } from 'src/core/logger/logger.service';
import { AmoEntityType } from '../types/amo-api.types';

export type FilterItem = {
    key: string;
    fieldId: number;
    value: string | number | boolean;
};

export type InitialRequestParams = {
    page: number;
    limit: number;
};

export type RequestParamsPipelineDeals = InitialRequestParams & {
    statuses: number[];
    pipelineId: number;
};

export type RequestParams = {
    limit?: number;
    page?: number;
    // filters?: FilterItem[];
    // withEntity?: string[];
    'filter[entity_id]'?: number | number[];
    // userId?: number;
    'filter[entity_type]'?: AmoEntityType;
    with?: AmoEntityType;
};

export function GetAllPage(_target: object, _propertyName: string, propertyDescriptor: PropertyDescriptor): void {
    const logger = new Logger();
    logger.log('GetAllPage decorator init');
    const originalFn = propertyDescriptor.value;
    const defaultParams = {
        limit: 200,
        page: 1,
    };

    async function bulkRequest<T>(accountRequestParams: unknown, params: RequestParams = defaultParams): Promise<T[]> {
        const currentPage = params.page ? params.page : defaultParams.page;
        logger.info('downloading page ', currentPage);
        const response = await originalFn.apply(this, [accountRequestParams, { ...params }]);
        if (response && response.length === params.limit) {
            const next = await bulkRequest(accountRequestParams, { ...params, ...defaultParams, page: currentPage + 1 });
            return [...response, ...next];
        }
        return response;
    }

    propertyDescriptor.value = bulkRequest;
}
