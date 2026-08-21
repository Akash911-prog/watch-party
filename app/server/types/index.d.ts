// types/express/index.d.ts
import type { UserPayload } from "@watchparty/shared/types"; // adjust path/type name

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

export {};
