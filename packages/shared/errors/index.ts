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
        success?: false;
    };
}[keyof ErrorMap];

export type Result<S, E extends AppError = AppError> =
    | { ok: true; value: S; error: null }
    | { ok: false; value: null; error: E };

export const Ok = <T>(value: T): Result<T, never> => ({
    ok: true,
    value,
    error: null,
});

export const Err = <E extends AppError>(error: E): Result<never, E> => ({
    ok: false,
    value: null,
    error,
});
