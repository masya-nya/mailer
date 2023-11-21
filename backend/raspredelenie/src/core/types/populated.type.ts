export type PopulatedModel<T, U> = Omit<T, keyof U> & U;
