export interface Error {
    name: string;
    message: string;
    code: number;
    stack?: string;
}

export type Result<S, E extends Error> = [S, null] | [null, E];

export const Ok = <T>(value: T): Result<T, never> => [value, null];
export const Err = <E extends Error>(error: E): Result<never, E> => [
    null,
    error,
];
