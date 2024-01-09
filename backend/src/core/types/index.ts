import { Types } from 'mongoose';

export type PopulatedModel<T, U> = Omit<T, keyof U> & U;
export type ModelWithId<T> = T & { _id: Types.ObjectId }
export type StatusResponseType = { status: boolean }