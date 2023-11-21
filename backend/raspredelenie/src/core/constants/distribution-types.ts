export const DistributionTypes = { Queue: 'queue', Quantity: 'quantity', Percent: 'percent', Conversion: 'conversion' } as const;
export const AllDistributionTypes = [
    DistributionTypes.Queue,
    DistributionTypes.Quantity,
    DistributionTypes.Percent,
    DistributionTypes.Conversion,
] as const;
export type DistributionTypesType = (typeof DistributionTypes)[keyof typeof DistributionTypes];
