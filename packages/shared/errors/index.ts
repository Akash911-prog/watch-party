interface ErrorMap {
    NotFoundError: 404;
    ValidationError: 400;
    UnauthorizedError: 401;
    ForbiddenError: 403;
    InternalError: 500;
    ConflictError: 409;
}

// 2. Build the discriminated union from the map
export type AppError = {
    [K in keyof ErrorMap]: {
        name: K;
        code: ErrorMap[K];
        message: string;
        error: any;
        stack?: string;
    };
}[keyof ErrorMap];

// 3. Result type now uses AppError instead of the generic Error
export type Result<S, E extends AppError = AppError> = [S, null] | [null, E];

export const Ok = <T>(value: T): Result<T, never> => [value, null];

export const Err = <E extends AppError>(error: E): Result<never, E> => [
    null,
    error,
];
